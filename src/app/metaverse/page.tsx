'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import WebXRController from '@/components/WebXRController'
import Link from 'next/link'

export default function MetaversePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isWebXRSupported, setIsWebXRSupported] = useState(false)
  const [isInVR, setIsInVR] = useState(false)
  const [loadingText, setLoadingText] = useState('Загрузка метавселенной')
  const [loadError, setLoadError] = useState<string | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [connectionAttempts, setConnectionAttempts] = useState(0)
  const maxRetries = 3
  const [showIntegrations, setShowIntegrations] = useState(false)

  useEffect(() => {
    // Check if running on mobile device
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    
    // Check WebXR support
    if (navigator.xr) {
      navigator.xr.isSessionSupported('immersive-vr')
        .then(supported => setIsWebXRSupported(supported))
        .catch(() => setIsWebXRSupported(false))
    }

    // Update loading progress animation
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval)
          return prev
        }
        return prev + 5
      })
    }, 200)

    // Set loading to false after a short delay
    const timer = setTimeout(() => {
      if (!loadError) {
        setIsLoading(false)
        setLoadingProgress(100)
      }
    }, 3000)

    // Setup message listener for communication from iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.data) {
        const { type, error } = event.data
        
        switch (type) {
          case 'webxr-ready':
            console.log('Metaverse WebXR is ready')
            setIsWebXRSupported(true)
            break
            
          case 'webxr-not-supported':
          case 'webxr-not-available':
            console.log('Metaverse WebXR is not supported')
            setIsWebXRSupported(false)
            break
            
          case 'webxr-error':
            console.error('Metaverse WebXR error:', error)
            break
            
          case 'webxr-session-ended':
            setIsInVR(false)
            break
            
          case 'metaverse-error':
            console.error('Metaverse error:', error)
            if (isLoading) {
              setLoadError(`Ошибка загрузки: ${error}`)
            }
            break
            
          case 'metaverse-fallback-loaded':
            // Fallback loaded, which means there was an issue
            console.warn('Metaverse fallback loaded')
            setLoadingText('Метавселенная загружена в резервном режиме')
            setIsLoading(false)
            break
            
          default:
            // Ignore unknown message types
        }
      }
    }

    window.addEventListener('message', handleMessage)
    
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
      window.removeEventListener('message', handleMessage)
    }
  }, [isLoading, loadError])

  // Handle iframe load errors
  const handleIframeError = () => {
    console.error('Failed to load metaverse iframe')
    
    if (connectionAttempts < maxRetries) {
      setConnectionAttempts(prev => prev + 1)
      setLoadingText(`Переподключение к метавселенной (попытка ${connectionAttempts + 1}/${maxRetries})`)
      
      // Reload the iframe with a delay
      setTimeout(() => {
        if (iframeRef.current) {
          const src = iframeRef.current.src
          iframeRef.current.src = ''
          setTimeout(() => {
            if (iframeRef.current) iframeRef.current.src = src
          }, 500)
        }
      }, 1000)
    } else {
      setLoadError('Не удалось загрузить метавселенную. Пожалуйста, попробуйте позже.')
    }
  }

  // VR session handlers
  const handleVRSessionStart = () => {
    setIsInVR(true)
    console.log('VR session started')
  }

  const handleVRSessionEnd = () => {
    setIsInVR(false)
    console.log('VR session ended')
  }

  // Handle retry after error
  const handleRetry = () => {
    setLoadError(null)
    setIsLoading(true)
    setLoadingProgress(0)
    setConnectionAttempts(0)
    
    // Force iframe reload
    if (iframeRef.current) {
      const src = iframeRef.current.src
      iframeRef.current.src = ''
      setTimeout(() => {
        if (iframeRef.current) iframeRef.current.src = src
      }, 500)
    }
    
    // Set loading to false after a delay
    setTimeout(() => {
      if (!loadError) {
        setIsLoading(false)
        setLoadingProgress(100)
      }
    }, 3000)
  }

  // Toggle integrations panel
  const toggleIntegrations = () => {
    setShowIntegrations(prev => !prev);
  }

  if (isLoading || loadError) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-space-gradient stars">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg mx-auto"
        >
          <h1 className="text-4xl font-bold mb-6 text-gradient">{loadError ? 'Ошибка' : loadingText}</h1>
          
          {loadError ? (
            <>
              <p className="text-red-400 mb-6">{loadError}</p>
              <button 
                onClick={handleRetry}
                className="px-6 py-3 bg-gradient-to-r from-turquoise to-neon-pink rounded-full text-white font-medium text-lg hover:opacity-90 transition-opacity"
              >
                Попробовать снова
              </button>
            </>
          ) : (
            <>
              <div className="relative w-64 h-8 bg-space-dark/50 rounded-full overflow-hidden mx-auto">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-turquoise to-neon-pink"
                />
              </div>
              <p className="text-turquoise mt-4">Подготовка виртуального пространства...</p>
            </>
          )}
        </motion.div>
      </div>
    )
  }

  return (
    <div className="metaverse-container w-full h-screen flex flex-col relative">
      {/* Header with controls */}
      <div className="metaverse-header absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gradient">TON Метавселенная</h1>
        <div className="controls flex gap-3">
          <button
            onClick={toggleIntegrations}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-white"
          >
            Интеграции
          </button>
          <div id="vr-button-container" className="vr-button-wrapper"></div>
          <button 
            onClick={() => window.history.back()} 
            className="px-4 py-2 bg-space-dark rounded-lg hover:bg-space-dark/80 transition-colors text-white"
          >
            Вернуться
          </button>
        </div>
      </div>

      {/* Integrations panel */}
      {showIntegrations && (
        <div className="absolute top-20 right-4 z-10 bg-black/80 p-4 rounded-lg w-72 backdrop-blur-sm border border-purple-500/30">
          <h3 className="text-xl font-bold text-white mb-3">Интеграции</h3>
          <div className="flex flex-col gap-2">
            <Link 
              href="/metaverse/ttc002"
              className="p-3 bg-purple-600/50 hover:bg-purple-600/80 rounded-lg transition-colors flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                TTC
              </div>
              <div>
                <p className="text-white font-medium">TTC_002</p>
                <p className="text-gray-300 text-sm">Метаверсенная интеграция</p>
              </div>
            </Link>
            
            {/* Add more integrations here in the future */}
          </div>
        </div>
      )}

      {/* WebXR Controller */}
      {isWebXRSupported && (
        <WebXRController 
          containerId="vr-button-container" 
          onSessionStart={handleVRSessionStart}
          onSessionEnd={handleVRSessionEnd}
        />
      )}

      {/* Full screen iframe for the metaverse */}
      <iframe 
        ref={iframeRef}
        src="/api/metaverse-proxy" 
        className="w-full h-full border-0" 
        allow="xr-spatial-tracking; camera; microphone; accelerometer; gyroscope; magnetometer" 
        allowFullScreen
        onError={handleIframeError}
        title="TON Метавселенная - Виртуальное пространство"
      />

      {/* Mobile compatibility notice */}
      {isMobile && !isWebXRSupported && (
        <div className="absolute bottom-4 left-4 right-4 bg-space-dark/90 p-4 rounded-lg text-white text-sm">
          <p>Для полного погружения в метавселенную используйте совместимое VR-устройство или настольный браузер.</p>
        </div>
      )}
      
      {/* VR mode indicators */}
      {isInVR && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white text-2xl font-bold opacity-0">
          <p>В режиме VR</p>
        </div>
      )}
    </div>
  )
} 