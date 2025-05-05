'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface DeviceContextType {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isIOS: boolean
  isAndroid: boolean
  isSafari: boolean
  isChrome: boolean
  isFirefox: boolean
  isIE: boolean
  isEdge: boolean
}

const DeviceContext = createContext<DeviceContextType | null>(null)

export const DeviceDetectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceContextType>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isIOS: false,
    isAndroid: false,
    isSafari: false,
    isChrome: false,
    isFirefox: false,
    isIE: false,
    isEdge: false
  })

  useEffect(() => {
    const detect = () => {
      if (typeof window === 'undefined') return

      const userAgent = navigator.userAgent
      
      // Check device type
      const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) && window.innerWidth < 768
      const isTablet = /iPad|Android|webOS/i.test(userAgent) && window.innerWidth >= 768 && window.innerWidth < 1024
      const isDesktop = !isMobile && !isTablet

      // Check OS
      const isIOS = /iPad|iPhone|iPod/i.test(userAgent)
      const isAndroid = /Android/i.test(userAgent)

      // Check browser
      const isSafari = /Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)
      const isChrome = /Chrome/i.test(userAgent)
      const isFirefox = /Firefox/i.test(userAgent)
      const isIE = /Trident/i.test(userAgent)
      const isEdge = /Edge/i.test(userAgent)

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        isIOS,
        isAndroid,
        isSafari,
        isChrome,
        isFirefox,
        isIE,
        isEdge
      })
    }

    detect()

    // Add window resize listener to detect device type changes
    window.addEventListener('resize', detect)
    return () => window.removeEventListener('resize', detect)
  }, [])

  return (
    <DeviceContext.Provider value={deviceInfo}>
      {children}
    </DeviceContext.Provider>
  )
}

export const useDeviceDetect = () => useContext(DeviceContext) 