import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Train3D() {
  const trainRef = useRef<THREE.Group>(null)
  const wheelsRef = useRef<THREE.Group[]>([])
  const smokeRef = useRef<THREE.Group>(null)

  // Animation loop
  useFrame((state, delta) => {
    if (trainRef.current) {
      // Make the train move along the tracks
      trainRef.current.position.z = (state.clock.getElapsedTime() * 2) % 40 - 20

      // Rotate the wheels
      wheelsRef.current.forEach(wheel => {
        wheel.rotation.x += delta * 5
      })

      // Animate smoke
      if (smokeRef.current) {
        smokeRef.current.rotation.y += delta
        smokeRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 + 2
      }
    }
  })

  return (
    <group ref={trainRef} position={[0, 0, 0]}>
      {/* Locomotive Body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 1, 2]} />
        <meshStandardMaterial color="#4169e1" />
      </mesh>

      {/* Cabin */}
      <mesh position={[0, 1, -0.5]}>
        <boxGeometry args={[0.8, 0.6, 0.8]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>

      {/* Chimney */}
      <mesh position={[0, 1.5, 0.5]}>
        <cylinderGeometry args={[0.1, 0.15, 0.4]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>

      {/* Wheels */}
      {[[-0.6, 0], [0.6, 0], [-0.6, -1], [0.6, -1]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]} ref={el => el && (wheelsRef.current[i] = el)}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
            <meshStandardMaterial color="#2a2a2a" />
          </mesh>
        </group>
      ))}

      {/* Smoke */}
      <group ref={smokeRef} position={[0, 2, 0.5]}>
        {[0, 1, 2].map((y) => (
          <mesh key={y} position={[0, y * 0.3, 0]}>
            <sphereGeometry args={[0.2 - y * 0.05]} />
            <meshStandardMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.6 - y * 0.15}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
} 