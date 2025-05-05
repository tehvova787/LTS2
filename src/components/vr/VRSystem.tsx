import { useEffect, useState, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { XR, Controllers, Hands, VRButton } from '@react-three/xr'
import { Interactive } from '@react-three/xr'
import * as THREE from 'three'

interface VRSystemProps {
  children: React.ReactNode
}

// VR Comfort settings interface
export interface VRComfortSettings {
  movementSpeed: number
  turnSpeed: number
  snapTurnEnabled: boolean
  snapTurnDegrees: number
  vignetteEnabled: boolean
  vignetteIntensity: number
  heightOffset: number
}

// Default comfort settings
export const defaultVRComfortSettings: VRComfortSettings = {
  movementSpeed: 1.0,
  turnSpeed: 1.0,
  snapTurnEnabled: true,
  snapTurnDegrees: 45,
  vignetteEnabled: true,
  vignetteIntensity: 0.5,
  heightOffset: 0.0,
}

export default function VRSystem({ children }: VRSystemProps) {
  const [isVRSupported, setIsVRSupported] = useState(false)
  const [isInVR, setIsInVR] = useState(false)
  const [comfortSettings, setComfortSettings] = useState<VRComfortSettings>(defaultVRComfortSettings)
  const { camera } = useThree()

  // Check if VR is supported
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.xr) {
      navigator.xr.isSessionSupported('immersive-vr')
        .then((supported) => {
          setIsVRSupported(supported)
        })
        .catch((error) => {
          console.error('Error checking VR support:', error)
          setIsVRSupported(false)
        })
    }
  }, [])

  // Handle VR session state changes
  const handleSessionStart = () => {
    setIsInVR(true)
    // Apply any initial VR camera settings
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.near = 0.01
      camera.far = 1000
      camera.updateProjectionMatrix()
    }
  }

  const handleSessionEnd = () => {
    setIsInVR(false)
    // Reset camera settings if needed
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.near = 0.1
      camera.far = 1000
      camera.updateProjectionMatrix()
    }
  }

  // Update comfort settings
  const updateComfortSettings = (newSettings: Partial<VRComfortSettings>) => {
    setComfortSettings({
      ...comfortSettings,
      ...newSettings
    })
  }

  return (
    <>
      {/* Add VR Button to the DOM - this will show a "Enter VR" button */}
      <VRButton 
        className="vr-button"
        sessionInit={{
          optionalFeatures: ['local-floor', 'hand-tracking']
        }} 
      />
      
      {/* XR provides the VR context */}
      <XR 
        onSessionStart={handleSessionStart}
        onSessionEnd={handleSessionEnd}
      >
        {/* VR Controllers */}
        <Controllers 
          rayMaterial={{ color: '#00f0ff' }}
        />
        
        {/* Hand tracking when available */}
        <Hands />
        
        {/* Render all children in VR context */}
        {children}
        
        {/* Additional VR-specific UI or interactions can be added here */}
        {isInVR && <VRInteractionSystem comfortSettings={comfortSettings} />}
      </XR>
    </>
  )
}

// VR Interaction system for teleportation, grabbing, etc.
function VRInteractionSystem({ comfortSettings }: { comfortSettings: VRComfortSettings }) {
  const { camera } = useThree()
  const lastSnapTurn = useRef(0)

  // Handle controller input and movement
  useFrame((state, delta) => {
    // Controller input handling goes here
    
    // Apply comfort features like vignette during movement (would be implemented in a shader)
  })

  return (
    <group>
      {/* Teleportation markers and interactive elements would go here */}
    </group>
  )
} 