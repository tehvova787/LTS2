import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface MetaverseBackgroundProps {
  speed?: number
  color?: string
  secondaryColor?: string
}

export default function MetaverseBackground({
  speed = 1,
  color = '#4169e1',
  secondaryColor = '#ffd700'
}: MetaverseBackgroundProps) {
  const particlesRef = useRef<THREE.Group>(null)
  
  // Create a simple background effect
  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.1 * speed
      particlesRef.current.rotation.x += delta * 0.05 * speed
    }
  })
  
  return (
    <group>
      {/* Background particles */}
      <group ref={particlesRef}>
        {Array.from({ length: 20 }).map((_, i) => {
          const x = (Math.random() - 0.5) * 30
          const y = (Math.random() - 0.5) * 30
          const z = (Math.random() - 0.5) * 30
          const size = Math.random() * 0.3 + 0.1
          return (
            <mesh key={i} position={[x, y, z]} scale={size}>
              <sphereGeometry args={[1, 8, 8]} />
              <meshBasicMaterial 
                color={i % 2 === 0 ? color : secondaryColor} 
                transparent 
                opacity={0.7} 
              />
            </mesh>
          )
        })}
      </group>
      
      {/* Background ambient light */}
      <ambientLight intensity={0.2} />
    </group>
  )
} 