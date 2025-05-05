import { useEffect, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { useXR } from '@react-three/xr'
import * as THREE from 'three'
import { VRComfortSettings, defaultVRComfortSettings } from './VRSystem'

interface VRComfortControlsProps {
  settings?: Partial<VRComfortSettings>
  onSettingsChange?: (settings: VRComfortSettings) => void
}

// Create a vignette shader material for comfort during movement
const createVignetteMaterial = (intensity: number) => {
  return new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      intensity: { value: intensity },
      color: { value: new THREE.Color('#000000') }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float intensity;
      uniform vec3 color;
      varying vec2 vUv;
      
      void main() {
        vec2 uv = vUv - 0.5;
        float vignetteAmount = 1.0 - length(uv * 2.0);
        vignetteAmount = smoothstep(0.0, 1.0, vignetteAmount);
        
        // Modify the strength based on intensity parameter
        float opacity = (1.0 - vignetteAmount) * intensity;
        
        gl_FragColor = vec4(color, opacity);
      }
    `
  })
}

export default function VRComfortControls({
  settings = {},
  onSettingsChange
}: VRComfortControlsProps) {
  // Combine default settings with provided settings
  const [comfortSettings, setComfortSettings] = useState<VRComfortSettings>({
    ...defaultVRComfortSettings,
    ...settings
  })
  
  const { scene, camera } = useThree()
  const { isPresenting } = useXR()
  
  // Vignette mesh reference
  const [vignetteMesh, setVignetteMesh] = useState<THREE.Mesh | null>(null)
  
  // Initialize comfort features when in VR mode
  useEffect(() => {
    if (isPresenting) {
      // Create vignette effect that stays in front of the camera
      const geometry = new THREE.PlaneGeometry(2, 2)
      const material = createVignetteMaterial(comfortSettings.vignetteEnabled ? comfortSettings.vignetteIntensity : 0)
      
      const mesh = new THREE.Mesh(geometry, material)
      mesh.name = 'vr-comfort-vignette'
      mesh.renderOrder = 100 // Ensure it renders on top
      
      // Position it close to the camera but not too close (to avoid z-fighting)
      mesh.position.z = -0.1
      
      // Add the vignette to the camera
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.add(mesh)
      }
      
      // Store the mesh for later updates
      setVignetteMesh(mesh)
      
      return () => {
        // Clean up when unmounting
        if (camera instanceof THREE.PerspectiveCamera) {
          camera.remove(mesh)
        }
      }
    }
  }, [isPresenting, camera])
  
  // Update settings when they change
  useEffect(() => {
    // Update the combined settings
    const newSettings = {
      ...comfortSettings,
      ...settings
    }
    
    setComfortSettings(newSettings)
    
    // Notify parent component of changes
    if (onSettingsChange) {
      onSettingsChange(newSettings)
    }
    
    // Update vignette intensity if mesh exists
    if (vignetteMesh) {
      const material = vignetteMesh.material as THREE.ShaderMaterial
      if (material && material.uniforms) {
        material.uniforms.intensity.value = 
          newSettings.vignetteEnabled ? newSettings.vignetteIntensity : 0
      }
    }
  }, [settings, onSettingsChange])
  
  // Apply snap turning
  const snapTurn = (direction: 'left' | 'right') => {
    if (!isPresenting || !comfortSettings.snapTurnEnabled) return
    
    // Calculate rotation amount
    const rotationAmount = (direction === 'left' ? 1 : -1) * 
      THREE.MathUtils.degToRad(comfortSettings.snapTurnDegrees)
    
    // Apply rotation to the camera rig or player
    // This depends on how your VR camera rig is set up
    // For this example, we'll directly modify the camera's parent (the rig)
    if (camera.parent) {
      camera.parent.rotateY(rotationAmount)
    }
  }
  
  // Apply movement speed multiplier
  // This would be used by other systems that handle movement
  const getMovementSpeed = () => {
    return comfortSettings.movementSpeed
  }
  
  // Adjust height offset - helpful for accommodating different user heights
  useEffect(() => {
    if (isPresenting && camera.parent) {
      // Apply height offset to the camera rig
      camera.parent.position.y = comfortSettings.heightOffset
    }
  }, [isPresenting, comfortSettings.heightOffset, camera])
  
  // Component doesn't render anything directly, it just manages comfort features
  return null
} 