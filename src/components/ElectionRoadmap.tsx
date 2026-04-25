'use client'

import React from 'react'

const PHASES = [
  {
    id: 1,
    title: 'Voter Registration',
    description: 'Ensure your name is on the electoral roll. You can apply online via the NVSP portal.',
    date: 'Continuous process (Deadline varies by election)',
  },
  {
    id: 2,
    title: 'Election Notification',
    description: 'The Election Commission of India (ECI) announces the election schedule and dates.',
    date: 'Usually 45-60 days before polling',
  },
  {
    id: 3,
    title: 'Candidate Nomination',
    description: 'Political parties and independent candidates file their nomination papers.',
    date: 'After notification',
  },
  {
    id: 4,
    title: 'Campaigning',
    description: 'Candidates campaign. This period ends 48 hours before polling begins.',
    date: 'Ends 48 hours before polling',
  },
  {
    id: 5,
    title: 'Polling Day',
    description: 'Voters cast their votes at designated polling stations using EVMs.',
    date: 'Election Day',
  },
  {
    id: 6,
    title: 'Counting & Results',
    description: 'Votes are counted under the supervision of Returning Officers and results are declared.',
    date: 'Typically 2-3 days after final phase of polling',
  },
]

export default function ElectionRoadmap() {
  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">Election Process Roadmap</h2>
      <div className="relative border-l-2 border-zinc-200 dark:border-zinc-700 ml-3 md:ml-4">
        {PHASES.map((phase, index) => (
          <div key={phase.id} className="mb-8 ml-6 group">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white dark:ring-zinc-900 dark:bg-blue-900">
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">{phase.id}</span>
            </span>
            <h3 className="flex items-center mb-1 text-lg font-semibold text-zinc-900 dark:text-white">
              {phase.title}
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-zinc-400 dark:text-zinc-500">
              {phase.date}
            </time>
            <p className="mb-4 text-base font-normal text-zinc-600 dark:text-zinc-300">
              {phase.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
