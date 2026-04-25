import React from 'react'
import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
      <p className="text-zinc-500 font-medium animate-pulse">Loading VoteMitra Experience...</p>
    </div>
  )
}
