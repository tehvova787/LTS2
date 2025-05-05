import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface HolographicDisplayProps {
  position?: [number, number, number]
}

export default function HolographicDisplay({ position = [0, 0, 0] }: HolographicDisplayProps) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime()
      groupRef.current.rotation.y = time * 0.5
      groupRef.current.position.y = position[1] + Math.sin(time * 2) * 0.1
    }
  })
  
  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#4169e1" 
          emissive="#4169e1"
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
        />
      </mesh>
      <pointLight intensity={1} distance={3} color="#4169e1" />
    </group>
  )
} 