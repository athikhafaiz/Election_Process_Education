import { NextResponse } from 'next/server'
import { VertexAI, HarmCategory, HarmBlockThreshold } from '@google-cloud/vertexai'
import { LRUCache } from 'lru-cache'

// Rate limiter: 10 requests per minute per IP
const rateLimit = new LRUCache({
  max: 500,
  ttl: 60 * 1000,
})

// Initialize Vertex AI
const vertexAI = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT || 'promptwars-494412',
  location: 'us-central1'
})

const generativeModel = vertexAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
})

export async function POST(req: Request) {
  try {
    // Basic Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || 'anonymous'
    const tokenCount = (rateLimit.get(ip) as number) || 0
    if (tokenCount >= 15) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }
    rateLimit.set(ip, tokenCount + 1)

    const body = await req.json()
    const { message, persona } = body

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    let personaContext = ''
    switch (persona) {
      case 'first_time_voter':
        personaContext = 'The user is a first-time voter in India. Explain things very simply, avoid heavy jargon, and emphasize the importance of registering to vote.'
        break
      case 'nri_voter':
        personaContext = 'The user is an NRI (Non-Resident Indian). Focus on the specific rules for overseas electors filling Form 6A and how they need to be physically present at the polling booth with their original passport.'
        break
      case 'senior_citizen':
        personaContext = 'The user is a senior citizen or PwD. Highlight accessibility features, postal ballot facilities (Form 12D), and queue preferences at polling stations.'
        break
      default:
        personaContext = 'The user is a general voter in India. Provide clear, concise, and accurate information regarding the Indian electoral process.'
    }

    const systemInstruction = `You are VoteMitra, an official, helpful, and highly knowledgeable AI assistant dedicated to educating citizens about the Indian Election Process.
Your primary goal is to provide accurate, unbiased, and easy-to-understand information based on Election Commission of India (ECI) guidelines.

Context for this interaction: ${personaContext}

Rules:
1. ONLY answer questions related to the Indian election process, voting rights, candidate nomination, voter registration, ECI rules, etc.
2. If the user asks about ANY topic outside of elections or voting, politely decline.
3. Maintain strict neutrality.`

    const result = await generativeModel.generateContent({
      contents: [{ role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Query: ${message}` }] }],
      generationConfig: {
        temperature: 0.1, // Even lower for maximum accuracy
      }
    })

    const response = result.response
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text || "I am sorry, I could not generate a response."

    return NextResponse.json({ reply: text })
  } catch (error) {
    console.error('Error generating response:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
