'use client'

import React from 'react'
import { MapPin } from 'lucide-react'

export default function PollingBoothFinder() {
  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden mt-8">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
        <h2 className="text-xl font-bold flex items-center gap-2 text-zinc-900 dark:text-white">
          <MapPin size={22} className="text-red-600" />
          Find Your Polling Station
        </h2>
        <p className="text-sm text-zinc-500 mt-1">Locate your designated booth on the map (Powered by Google Maps)</p>
      </div>
      <div className="aspect-video w-full bg-zinc-100 dark:bg-zinc-800">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/search?key=YOUR_MAPS_API_KEY&q=Polling+Booths+in+Delhi"
          title="Polling Booth Finder Map"
          aria-label="Google Map showing polling stations"
        ></iframe>
      </div>
      <div className="p-4 text-xs text-zinc-400 text-center italic">
        Note: Actual booth location depends on your constituency. Check NVSP.in for exact details.
      </div>
    </div>
  )
}
