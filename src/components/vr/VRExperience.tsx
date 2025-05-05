import { useState, useRef, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, Loader } from '@react-three/drei'
import VRSystem, { VRComfortSettings, defaultVRComfortSettings } from './VRSystem'
import VRTeleportation from './VRTeleportation'
import VRComfortControls from './VRComfortControls'
import VRControllerModel from './VRControllerModel'
import VRUI from './VRUI'
import * as THREE from 'three'

interface VRExperienceProps {
  children: React.ReactNode
  disableDefaultLighting?: boolean
  defaultEnvironment?: string
}

// Main VR experience wrapper component
export default function VRExperience({
  children,
  disableDefaultLighting = false,
  defaultEnvironment = 'sunset',
}: VRExperienceProps) {
  const [isLoading, setIsLoading] = useState(true)
  
  // Handle loading state
  useEffect(() => {
    // Simulate resource loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    
    return () => clearTimeout(loadingTimer)
  }, [])
  
  return (
    <>
      <Canvas 
        camera={{ 
          position: [0, 1.6, 3], 
          fov: 75, 
          near: 0.1, 
          far: 1000 
        }}
        shadows
        dpr={[1, 1.5]} // Dynamic pixel ratio for performance
        gl={{ 
          antialias: true,
          alpha: false,
          physicallyCorrectLights: true,
          outputEncoding: THREE.sRGBEncoding,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0
        }}
      >
        {/* VR system wrapper */}
        <VRSystem>
          {/* VR-specific camera and scene setup */}
          <VRSceneSetup disableDefaultLighting={disableDefaultLighting} />
          
          {/* Default environment unless disabled */}
          {defaultEnvironment && <Environment preset={defaultEnvironment} background={false} />}
          
          {/* Teleportation system */}
          <VRTeleportation />
          
          {/* VR comfort features */}
          <VRComfortControls />
          
          {/* Render controller models */}
          <VRControllerModel hand="left" />
          <VRControllerModel hand="right" />
          
          {/* VR UI system */}
          <VRUI />
          
          {/* Render actual scene content (children) */}
          {children}
        </VRSystem>
      </Canvas>
      
      {/* Loading indicator */}
      <Loader 
        containerStyles={{
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
        }}
        innerStyles={{
          backgroundColor: '#111827',
          border: '2px solid #00F0FF',
        }}
        barStyles={{
          backgroundColor: '#00F0FF',
        }}
        dataStyles={{
          color: '#FFFFFF',
          fontFamily: 'var(--font-orbitron)',
          fontSize: '1rem',
        }}
        dataInterpolation={(p) => `Loading VR Experience... ${p.toFixed(0)}%`}
        initialState={(active) => active}
      />
    </>
  )
}

// Handle VR-specific scene setup
function VRSceneSetup({ disableDefaultLighting = false }) {
  const { scene, camera } = useThree()
  
  // Set up VR scene optimizations and defaults
  useEffect(() => {
    // Configure scene for VR performance
    scene.matrixAutoUpdate = false
    
    // Set background color
    scene.background = new THREE.Color('#000000')
    
    // Ensure camera is at eye level for standing experience
    camera.position.y = 1.6
    
    // Set up fog for better depth perception in VR
    scene.fog = new THREE.FogExp2('#000000', 0.025)
    
    // Make sure shadow and lighting settings are optimal for VR
    if (!disableDefaultLighting) {
      const hemiLight = new THREE.HemisphereLight('#c2d9ff', '#749ea8', 0.6)
      scene.add(hemiLight)
      
      const dirLight = new THREE.DirectionalLight('#ffffff', 1)
      dirLight.position.set(5, 5, 5)
      dirLight.castShadow = true
      dirLight.shadow.mapSize.width = 1024
      dirLight.shadow.mapSize.height = 1024
      dirLight.shadow.camera.far = 50
      dirLight.shadow.camera.left = -10
      dirLight.shadow.camera.right = 10
      dirLight.shadow.camera.top = 10
      dirLight.shadow.camera.bottom = -10
      dirLight.shadow.bias = -0.0001
      scene.add(dirLight)
    }
    
    return () => {
      // Clean up lights when component unmounts
      if (!disableDefaultLighting) {
        scene.remove(...scene.children.filter(child => 
          child instanceof THREE.HemisphereLight || 
          child instanceof THREE.DirectionalLight
        ))
      }
    }
  }, [scene, camera, disableDefaultLighting])
  
  return null
} 