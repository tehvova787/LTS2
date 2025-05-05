import { Environment, OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

export default function Scene() {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 2, 5)
  }, [camera])

  return (
    <>
      <OrbitControls enableZoom={false} />
      <Environment preset="sunset" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <fog attach="fog" args={['#ffffff', 0, 40]} />
      
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Railway tracks */}
      <group position={[0, -0.4, 0]}>
        <mesh position={[-0.8, 0, 0]}>
          <boxGeometry args={[0.2, 0.1, 100]} />
          <meshStandardMaterial color="#4a4a4a" />
        </mesh>
        <mesh position={[0.8, 0, 0]}>
          <boxGeometry args={[0.2, 0.1, 100]} />
          <meshStandardMaterial color="#4a4a4a" />
        </mesh>
        {/* Railroad ties */}
        {Array.from({ length: 50 }).map((_, i) => (
          <mesh key={i} position={[0, -0.05, i * 2 - 25]}>
            <boxGeometry args={[2, 0.1, 0.3]} />
            <meshStandardMaterial color="#8b4513" />
          </mesh>
        ))}
      </group>
    </>
  )
} 