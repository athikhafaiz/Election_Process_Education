import ChatInterface from '@/components/ChatInterface'
import ElectionRoadmap from '@/components/ElectionRoadmap'
import PollingBoothFinder from '@/components/PollingBoothFinder'
import { Bot } from 'lucide-react'

export const metadata = {
  title: 'VoteMitra - Indian Election Education',
  description: 'Learn about the Indian electoral process with VoteMitra, your AI assistant.',
}

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      <header className="bg-blue-600 text-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <Bot size={28} />
          <h1 className="text-2xl font-bold tracking-tight">VoteMitra</h1>
          <span className="ml-auto text-sm font-medium bg-blue-700 px-3 py-1 rounded-full">
            PromptWars Hackathon
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white sm:text-4xl">
            Demystifying the Election Process
          </h2>
          <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Whether you are a first-time voter, an NRI, or a senior citizen, VoteMitra is here to guide you through your democratic rights and the electoral process in India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <section aria-labelledby="roadmap-heading">
            <h2 id="roadmap-heading" className="sr-only">Election Roadmap</h2>
            <ElectionRoadmap />
          </section>

          <section aria-labelledby="chat-heading">
            <h2 id="chat-heading" className="sr-only">VoteMitra Assistant</h2>
            <ChatInterface />
          </section>
        </div>

        <section aria-labelledby="maps-heading" className="mt-12">
          <h2 id="maps-heading" className="sr-only">Polling Booth Finder</h2>
          <PollingBoothFinder />
        </section>
      </main>

      <footer className="bg-zinc-900 text-zinc-400 py-6 text-center text-sm">
        <p>Built with Next.js, Tailwind CSS, and Google Gemini. For educational purposes only.</p>
      </footer>
    </div>
  )
}
