import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useController } from '@react-three/xr'
import * as THREE from 'three'

interface VRControllerModelProps {
  hand: 'left' | 'right'
}

export default function VRControllerModel({ hand }: VRControllerModelProps) {
  const controller = useController(hand)
  const groupRef = useRef<THREE.Group>(null)
  
  // Set up glow material for grip button
  const glowMaterial = new THREE.MeshStandardMaterial({
    color: '#00f0ff',
    emissive: '#00f0ff',
    emissiveIntensity: 0.5,
    roughness: 0.3,
    metalness: 0.7,
  })
  
  // Track pressed buttons with refs to avoid re-renders
  const triggerPressed = useRef(false)
  const gripPressed = useRef(false)
  const thumbstickPressed = useRef(false)
  
  // Update button states and visual feedback
  useFrame(() => {
    if (!controller || !groupRef.current) return
    
    // Get gamepad if available
    const gamepad = controller.inputSource?.gamepad
    if (!gamepad) return
    
    // Update button press states
    triggerPressed.current = gamepad.buttons[0]?.pressed || false
    gripPressed.current = gamepad.buttons[1]?.pressed || false
    thumbstickPressed.current = gamepad.buttons[3]?.pressed || false
    
    // Apply visual feedback for pressed buttons
    const parts = groupRef.current.children
    
    // Controller parts by index (assuming the order defined in the JSX below)
    // 0: body, 1: trigger, 2: grip, 3: thumbstick
    if (parts[1]) { // Trigger
      const trigger = parts[1] as THREE.Mesh
      if (trigger.material instanceof THREE.MeshStandardMaterial) {
        trigger.material.color.set(triggerPressed.current ? '#60a5fa' : '#334155')
        trigger.material.emissive.set(triggerPressed.current ? '#60a5fa' : '#000000')
        trigger.material.emissiveIntensity = triggerPressed.current ? 0.5 : 0
      }
    }
    
    if (parts[2]) { // Grip
      const grip = parts[2] as THREE.Mesh
      if (grip.material instanceof THREE.MeshStandardMaterial) {
        grip.material.color.set(gripPressed.current ? '#60a5fa' : '#334155')
        grip.material.emissive.set(gripPressed.current ? '#60a5fa' : '#000000')
        grip.material.emissiveIntensity = gripPressed.current ? 0.5 : 0
      }
    }
    
    if (parts[3]) { // Thumbstick
      const thumbstick = parts[3] as THREE.Mesh
      if (thumbstick.material instanceof THREE.MeshStandardMaterial) {
        thumbstick.material.color.set(thumbstickPressed.current ? '#60a5fa' : '#1e293b')
        thumbstick.material.emissive.set(thumbstickPressed.current ? '#60a5fa' : '#000000')
        thumbstick.material.emissiveIntensity = thumbstickPressed.current ? 0.5 : 0
        
        // Apply thumbstick tilt based on axes values
        if (gamepad.axes.length >= 2) {
          const xAxis = gamepad.axes[0]
          const yAxis = gamepad.axes[1]
          
          // Tilt thumbstick based on input axes
          thumbstick.rotation.x = yAxis * 0.3 // Pitch forward/backward
          thumbstick.rotation.z = -xAxis * 0.3 // Roll left/right
        }
      }
    }
  })
  
  // Don't render anything if controller is not available
  if (!controller) return null
  
  // Determine handedness-specific adjustments
  const handednessAdjustment = hand === 'left' ? -1 : 1
  
  return (
    <group ref={groupRef}>
      {/* Controller body */}
      <mesh position={[0, 0, -0.05]}>
        <cylinderGeometry args={[0.025, 0.035, 0.12, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.8} />
      </mesh>
      
      {/* Trigger */}
      <mesh position={[0, -0.01, 0.02]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.02, 0.05, 0.04]} />
        <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.6} />
      </mesh>
      
      {/* Grip */}
      <mesh position={[handednessAdjustment * 0.025, -0.03, -0.03]} rotation={[0, 0, handednessAdjustment * 0.5]}>
        <boxGeometry args={[0.015, 0.055, 0.03]} />
        <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.6} />
      </mesh>
      
      {/* Thumbstick */}
      <mesh position={[handednessAdjustment * 0.025, 0.02, 0.02]}>
        <sphereGeometry args={[0.01, 16, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
        
        {/* Thumbstick stem */}
        <mesh position={[0, 0.01, 0]}>
          <cylinderGeometry args={[0.002, 0.002, 0.02, 8]} />
          <meshStandardMaterial color="#475569" roughness={0.3} metalness={0.8} />
        </mesh>
      </mesh>
      
      {/* Decorative line for hand orientation */}
      <mesh position={[0, 0, 0.08]} rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.001, 0.001, 0.1, 4]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
    </group>
  )
} 