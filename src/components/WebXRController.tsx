'use client'

import React, { useEffect, useRef } from 'react'

interface WebXRControllerProps {
  containerId: string
  onSessionStart?: () => void
  onSessionEnd?: () => void
}

/**
 * A controller component that helps manage WebXR VR sessions for iframes
 */
const WebXRController: React.FC<WebXRControllerProps> = ({
  containerId,
  onSessionStart,
  onSessionEnd
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const isVRActive = useRef<boolean>(false)

  useEffect(() => {
    // Create custom VR button for iframe control
    const createVRButton = () => {
      const container = document.getElementById(containerId)
      if (!container) return
      
      // If button already exists, don't create another
      if (buttonRef.current) return
      
      // Create VR button
      const button = document.createElement('button')
      buttonRef.current = button
      button.classList.add('vr-button')
      button.style.cssText = `
        background-color: rgba(0, 0, 0, 0.7);
        border: 2px solid #5ee7df;
        color: white;
        font-family: sans-serif;
        font-size: 13px;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      `
      button.innerHTML = 'Войти в VR'
      
      // Hover effects
      button.onmouseenter = () => {
        button.style.backgroundColor = 'rgba(0, 0, 0, 0.9)'
        button.style.transform = 'scale(1.05)'
      }
      button.onmouseleave = () => {
        button.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
        button.style.transform = 'scale(1)'
      }
      
      // Click handler to start VR session
      button.onclick = () => {
        if (isVRActive.current) {
          // If already in VR, do nothing
          return
        }
        
        // Get the iframe
        iframeRef.current = document.querySelector('iframe') as HTMLIFrameElement
        if (!iframeRef.current) {
          console.error('Cannot find iframe for VR')
          return
        }
        
        try {
          // Update button state
          button.disabled = true
          button.style.opacity = '0.7'
          button.innerHTML = 'Загрузка VR...'
          
          // Set timeout to reset button if VR fails to start
          const resetTimeout = setTimeout(() => {
            button.disabled = false
            button.style.opacity = '1'
            button.innerHTML = 'Войти в VR'
          }, 5000)
          
          // Step 1: Make iframe fullscreen
          iframeRef.current.requestFullscreen().then(() => {
            clearTimeout(resetTimeout)
            
            // Step 2: Send message to iframe to enter VR
            iframeRef.current?.contentWindow?.postMessage({ type: 'enter-vr' }, '*')
            
            // Update button
            button.innerHTML = 'Активен VR'
            button.disabled = true
            isVRActive.current = true
            
            // Notify parent that session started
            if (onSessionStart) onSessionStart()
          }).catch(err => {
            clearTimeout(resetTimeout)
            console.error('Error requesting fullscreen:', err)
            
            // Reset button
            button.disabled = false
            button.style.opacity = '1'
            button.innerHTML = 'Войти в VR'
          })
        } catch (error) {
          console.error('Failed to enter VR mode:', error)
          
          // Reset button
          button.disabled = false
          button.style.opacity = '1'
          button.innerHTML = 'Войти в VR'
        }
      }
      
      container.appendChild(button)
    }
    
    // Listen for messages from iframe
    const handleMessage = (event: MessageEvent) => {
      // Ignore messages that aren't from our iframe
      const iframe = document.querySelector('iframe') as HTMLIFrameElement
      if (iframe && event.source !== iframe.contentWindow) {
        return
      }
      
      if (event.data?.type === 'webxr-ready') {
        // WebXR is ready in the iframe, create the button
        createVRButton()
      } else if (event.data?.type === 'webxr-session-ended') {
        // VR session ended
        if (onSessionEnd) onSessionEnd()
        
        // Update button state
        if (buttonRef.current) {
          buttonRef.current.disabled = false
          buttonRef.current.style.opacity = '1'
          buttonRef.current.innerHTML = 'Войти в VR'
        }
        
        isVRActive.current = false
        
        // Exit fullscreen if needed
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(err => {
            console.error('Error exiting fullscreen:', err)
          })
        }
      } else if (event.data?.type === 'webxr-error') {
        // Handle WebXR error
        console.error('WebXR error from iframe:', event.data.error)
        
        // Reset button state
        if (buttonRef.current) {
          buttonRef.current.disabled = false
          buttonRef.current.style.opacity = '1'
          buttonRef.current.innerHTML = 'Войти в VR'
        }
        
        isVRActive.current = false
      }
    }
    
    window.addEventListener('message', handleMessage)
    
    // Check WebXR support on load
    if (navigator.xr) {
      navigator.xr.isSessionSupported('immersive-vr')
        .then(supported => {
          if (supported) {
            // WebXR is supported in parent, create button
            createVRButton()
          }
        })
        .catch(err => console.error('WebXR session check failed:', err))
    }
    
    // Cleanup function
    return () => {
      window.removeEventListener('message', handleMessage)
      
      // Remove the button if it exists
      if (buttonRef.current && buttonRef.current.parentNode) {
        buttonRef.current.parentNode.removeChild(buttonRef.current)
      }
    }
  }, [containerId, onSessionStart, onSessionEnd])
  
  return null
}

export default WebXRController 