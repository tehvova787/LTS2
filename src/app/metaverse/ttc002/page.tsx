'use client'

import { useState, useEffect } from 'react'
import TTC002MetaverseConnector from '@/components/TTC002MetaverseConnector'
import dynamic from 'next/dynamic'

// Dynamically import WebXRController to avoid SSR issues
const WebXRController = dynamic(
  () => import('@/components/WebXRController'),
  { ssr: false }
)

export default function TTC002MetaversePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate assets loading
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="relative w-full h-screen bg-black">
      <header className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">TTC_002 Metaverse Integration</h1>
        <div className="flex space-x-4">
          <a 
            href="/metaverse" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Back to Metaverse
          </a>
          <a 
            href="/" 
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Home
          </a>
        </div>
      </header>

      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-xl">Loading TTC_002 Metaverse...</p>
          </div>
        </div>
      ) : (
        <main className="h-full w-full">
          {/* WebXR Controller for VR support */}
          <WebXRController 
            containerId="ttc002-metaverse-container" 
            onSessionStart={() => console.log('VR session started')}
            onSessionEnd={() => console.log('VR session ended')}
          />
          
          <div id="ttc002-metaverse-container" className="w-full h-full">
            <TTC002MetaverseConnector showControls={true} />
          </div>
        </main>
      )}
    </div>
  )
} 