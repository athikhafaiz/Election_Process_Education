'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, User, Bot, Loader2 } from 'lucide-react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Namaste! I am VoteMitra. I can help you understand the Indian election process. Please select your profile context above and ask me anything!' }
  ])
  const [input, setInput] = useState('')
  const [persona, setPersona] = useState('first_time_voter')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, persona })
      })

      if (!response.ok) {
        throw new Error('Failed to fetch response')
      }

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (error) {
      console.error(error)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col w-full h-[600px] bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      {/* Header & Persona Selector */}
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex justify-between items-center">
        <h2 className="font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
          <Bot size={20} className="text-blue-600" />
          VoteMitra Assistant
        </h2>
        <select
          value={persona}
          onChange={(e) => setPersona(e.target.value)}
          className="text-sm bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Select Voter Persona"
        >
          <option value="first_time_voter">First-time Voter</option>
          <option value="nri_voter">NRI / Overseas Voter</option>
          <option value="senior_citizen">Senior Citizen / PwD</option>
          <option value="general_voter">General Voter</option>
        </select>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 flex items-start gap-3 ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-bl-none'}`}>
              {msg.role === 'assistant' && <Bot size={18} className="mt-1 shrink-0 opacity-70" />}
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl rounded-bl-none px-4 py-3 text-zinc-500">
              <Loader2 size={18} className="animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="flex relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about voter ID, polling booths, dates..."
            className="w-full bg-zinc-100 dark:bg-zinc-800 border-transparent rounded-full px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900 dark:text-zinc-100"
            aria-label="Message input"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-600 text-white disabled:bg-zinc-400 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  )
}
