import React from 'react'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface LoadingFallbackProps {
  message?: string
  position?: [number, number, number]
}

export default function LoadingFallback({ 
  message = 'Loading...', 
  position = [0, 0, 0] 
}: LoadingFallbackProps) {
  return (
    <group position={position}>
      {/* Simple loading indicator */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#4169e1" wireframe />
      </mesh>
      
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {message}
      </Text>
      
      <pointLight position={[0, 2, 2]} intensity={0.5} />
    </group>
  )
} 