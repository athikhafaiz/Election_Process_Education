import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

// Initialize the Gen AI SDK. It automatically picks up GEMINI_API_KEY from env.
const ai = new GoogleGenAI({})

export async function POST(req: Request) {
  try {
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
2. If the user asks about ANY topic outside of elections or voting (e.g., coding, general knowledge, sports, giving opinions on specific political parties or politicians), politely decline and remind them you are VoteMitra, focused only on election education.
3. Keep answers concise, structured (use bullet points if needed), and highly relevant.
4. Do NOT express political opinions. Maintain strict neutrality.`

    // Ensure we have an API key, otherwise mock it for development if not provided
    if (!process.env.GEMINI_API_KEY) {
       console.warn("No GEMINI_API_KEY found, returning mock response for testing.");
       return NextResponse.json({ reply: `[Mock Response] This is a fallback because no GEMINI_API_KEY is set in the environment. You asked: "${message}". Context: ${persona}` })
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.2, // Low temperature for more factual, less creative responses
      }
    })

    return NextResponse.json({ reply: response.text })
  } catch (error) {
    console.error('Error generating response:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
