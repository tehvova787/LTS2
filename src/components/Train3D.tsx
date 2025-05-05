import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { useXR, Interactive } from '@react-three/xr'
import * as THREE from 'three'

// Custom StarGeometry class
class StarGeometry extends THREE.BufferGeometry {
  constructor(radius = 1, depth = 0.2, points = 5) {
    super()
    
    const vertices = []
    const indices = []
    
    // Create vertices for the star
    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points
      const r = i % 2 === 0 ? radius : radius * 0.5
      const x = Math.cos(angle) * r
      const y = Math.sin(angle) * r
      
      // Top vertices
      vertices.push(x, y, depth/2)
      // Bottom vertices
      vertices.push(x, y, -depth/2)
    }
    
    // Create indices for the faces
    for (let i = 0; i < points * 2; i++) {
      const next = (i + 1) % (points * 2)
      // Top face
      indices.push(i * 2, next * 2, points * 4)
      // Bottom face
      indices.push(i * 2 + 1, next * 2 + 1, points * 4 + 1)
      // Side faces
      indices.push(i * 2, next * 2, i * 2 + 1)
      indices.push(next * 2, next * 2 + 1, i * 2 + 1)
    }
    
    // Add center vertices
    vertices.push(0, 0, depth/2) // Top center
    vertices.push(0, 0, -depth/2) // Bottom center
    
    this.setIndex(indices)
    this.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    this.computeVertexNormals()
  }
}

// Register StarGeometry with React Three Fiber
extend({ StarGeometry })

// Add type declarations for the custom geometry
declare module '@react-three/fiber' {
  interface ThreeElements {
    starGeometry: JSX.IntrinsicElements['bufferGeometry']
  }
}

interface Train3DProps {
  speed?: number
  vrInteractive?: boolean
}

export default function Train3D({ speed = 1, vrInteractive = true }: Train3DProps) {
  const trainRef = useRef<THREE.Group>(null)
  const wheelsRef = useRef<THREE.Group[]>([])
  const pistonRef = useRef<THREE.Group>(null)
  const smokeRef = useRef<THREE.Group>(null)
  const { isPresenting } = useXR()
  
  // VR interaction state
  const initialPosition = useRef(new THREE.Vector3(0, 0, 0))
  const [isGrabbed, setIsGrabbed] = useState(false)
  
  // Keep track of the initial position when component mounts
  useEffect(() => {
    if (trainRef.current) {
      initialPosition.current.copy(trainRef.current.position)
    }
  }, [])
  
  // Create steam plumes with different sizes and opacities
  const steamPlumes = useMemo(() => {
    return Array(7).fill(null).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 0.2,
        i * 0.3,
        (Math.random() - 0.5) * 0.2
      ],
      scale: 0.45 - i * 0.06,
      opacity: 0.6 - i * 0.08
    }))
  }, [])

  // Handle model size for VR
  useEffect(() => {
    if (isPresenting && trainRef.current) {
      // Make the train smaller in VR for better perspective
      trainRef.current.scale.set(0.5, 0.5, 0.5)
    } else if (trainRef.current) {
      // Reset to normal scale when not in VR
      trainRef.current.scale.set(1, 1, 1)
    }
  }, [isPresenting])

  // Animation loop with improved physics
  useFrame((state, delta: number) => {
    if (trainRef.current) {
      // Only animate if not being grabbed in VR
      if (!isGrabbed) {
        // Realistic train motion with smooth acceleration and mild swaying
        const time = state.clock.getElapsedTime()
        const trainMovementSpeed = speed * 1.2
        
        // Position the train with slight vertical movement to simulate track imperfections
        trainRef.current.position.z = (time * trainMovementSpeed) % 40 - 20
        trainRef.current.position.y = Math.sin(time * 3) * 0.02 - 0.15
        trainRef.current.rotation.z = Math.sin(time * 2) * 0.005 // Subtle side-to-side sway
      }
      
      // Wheel animations always continue even when grabbed
      // Realistic wheel rotation based on train speed
      const wheelRotationSpeed = delta * 3 * speed * (1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05)
      wheelsRef.current.forEach((wheel: THREE.Group) => {
        wheel.rotation.x += wheelRotationSpeed
      })

      // Animate pistons with proper physics
      if (pistonRef.current) {
        // Locomotive rod movement synchronized with wheel rotation
        const mainWheelPos = Math.sin(state.clock.getElapsedTime() * 3 * speed)
        pistonRef.current.position.z = mainWheelPos * 0.15
        pistonRef.current.rotation.x = mainWheelPos * 0.1
      }

      // Dynamic smoke effects based on speed and slight wind variation
      if (smokeRef.current) {
        smokeRef.current.rotation.y += delta * 0.2
        smokeRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05 + 2.3
        smokeRef.current.position.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.03
        
        // Steam intensity related to speed and slight puffing effect
        const steamIntensity = Math.min(1.0, 0.5 + speed * 0.08) * (0.9 + Math.sin(state.clock.getElapsedTime() * 5) * 0.1)
        smokeRef.current.scale.set(steamIntensity, steamIntensity, steamIntensity)
      }
    }
  })

  // VR interaction handlers
  const handleSelect = (e: { intersection: THREE.Intersection; controller: THREE.Object3D }) => {
    setIsGrabbed(true)
  }
  
  const handleRelease = () => {
    setIsGrabbed(false)
    
    // Reset to initial position when released
    if (trainRef.current) {
      trainRef.current.position.copy(initialPosition.current)
    }
  }
  
  const handleMove = (e: { intersection: THREE.Intersection; controller: THREE.Object3D }) => {
    if (isGrabbed && trainRef.current) {
      // Move the train with the controller when grabbed
      trainRef.current.position.copy(e.controller.position)
    }
  }
  
  // Wrap the train model in an Interactive component when in VR mode
  const TrainModel = () => (
    <group ref={trainRef} position={[0, 0, 0]}>
      {/* Detailed Locomotive Frame */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.25, 0.25, 2.5]} />
        <meshStandardMaterial 
          color="#2c3e50" 
          metalness={0.8} 
          roughness={0.4}
          envMapIntensity={1.2}
        />
      </mesh>
      
      {/* Boiler - More Cylindrical and Authentic */}
      <mesh position={[0, 0.95, 0.6]} rotation={[Math.PI/2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.45, 0.45, 1.6, 32]} />
        <meshStandardMaterial 
          color="#1e3a8a" 
          metalness={0.7} 
          roughness={0.3}
          envMapIntensity={1}
        />
      </mesh>
      
      {/* Boiler Front Cover */}
      <mesh position={[0, 0.95, 1.4]} rotation={[Math.PI/2, 0, 0]} castShadow receiveShadow>
        <circleGeometry args={[0.45, 32]} />
        <meshStandardMaterial 
          color="#1e3a8a" 
          metalness={0.7} 
          roughness={0.3}
        />
      </mesh>
      
      {/* Boiler Back Cover (at cab) */}
      <mesh position={[0, 0.95, -0.2]} rotation={[-Math.PI/2, 0, 0]} castShadow receiveShadow>
        <circleGeometry args={[0.45, 32]} />
        <meshStandardMaterial 
          color="#1e3a8a" 
          metalness={0.7} 
          roughness={0.3}
        />
      </mesh>

      {/* Boiler Bands - More of them and Properly Placed */}
      {[-0.1, 0.2, 0.5, 0.8, 1.1].map((z, i) => (
        <mesh key={`band-${i}`} position={[0, 0.95, z]} rotation={[Math.PI/2, 0, 0]} castShadow receiveShadow>
          <torusGeometry args={[0.46, 0.025, 16, 32]} />
          <meshStandardMaterial 
            color="#0f172a" 
            metalness={0.8} 
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Rivets on Boiler - More Detail */}
      {[...Array(12)].map((_, i) => (
        <group key={`rivet-row-${i}`}>
          {[...Array(8)].map((_, j) => {
            const angle = (j / 8) * Math.PI * 2
            const z = -0.1 + i * 0.15
            return (
              <mesh 
                key={`rivet-${i}-${j}`} 
                position={[
                  Math.cos(angle) * 0.45, 
                  0.95 + Math.sin(angle) * 0.45, 
                  z
                ]} 
                castShadow
              >
                <sphereGeometry args={[0.018, 6, 6]} />
                <meshStandardMaterial 
                  color="#4a5568" 
                  metalness={0.9} 
                  roughness={0.3}
                />
              </mesh>
            )
          })}
        </group>
      ))}

      {/* Enhanced Cabin with Windows and Details */}
      <mesh position={[0, 1.15, -0.8]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.9, 0.8]} />
        <meshStandardMaterial 
          color="#1e3a8a" 
          metalness={0.7} 
          roughness={0.3}
        />
      </mesh>

      {/* Cabin Roof with Overhang */}
      <mesh position={[0, 1.65, -0.8]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.12, 0.95]} />
        <meshStandardMaterial 
          color="#0f172a" 
          metalness={0.6} 
          roughness={0.4}
        />
      </mesh>

      {/* Back Wall of Cabin */}
      <mesh position={[0, 1.15, -1.21]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.9, 0.04]} />
        <meshStandardMaterial 
          color="#0f172a" 
          metalness={0.7} 
          roughness={0.3}
        />
      </mesh>

      {/* Cabin Windows - More Detailed */}
      <mesh position={[0, 1.2, -1.24]} castShadow>
        <boxGeometry args={[0.65, 0.45, 0.03]} />
        <meshStandardMaterial 
          color="#93c5fd" 
          metalness={0.9} 
          roughness={0.1}
          transparent
          opacity={0.8}
          envMapIntensity={2}
        />
      </mesh>

      {/* Side Windows */}
      {[-1, 1].map((x, i) => (
        <mesh key={`side-window-${i}`} position={[x * 0.56, 1.2, -0.8]} rotation={[0, Math.PI/2, 0]} castShadow>
          <boxGeometry args={[0.5, 0.45, 0.03]} />
          <meshStandardMaterial 
            color="#93c5fd" 
            metalness={0.9} 
            roughness={0.1}
            transparent
            opacity={0.8}
            envMapIntensity={2}
          />
        </mesh>
      ))}

      {/* Window Frames */}
      <mesh position={[0, 1.2, -1.23]} castShadow>
        <boxGeometry args={[0.7, 0.5, 0.01]} />
        <meshStandardMaterial 
          color="#4b5563" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>

      {[-1, 1].map((x, i) => (
        <mesh key={`window-frame-${i}`} position={[x * 0.555, 1.2, -0.8]} rotation={[0, Math.PI/2, 0]} castShadow>
          <boxGeometry args={[0.55, 0.5, 0.01]} />
          <meshStandardMaterial 
            color="#4b5563" 
            metalness={0.8} 
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Chimney with Detailed Top */}
      <mesh position={[0, 1.5, 1.0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.15, 0.6, 16]} />
        <meshStandardMaterial 
          color="#0f172a" 
          metalness={0.8} 
          roughness={0.3}
        />
      </mesh>

      <mesh position={[0, 1.81, 1.0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.14, 0.08, 0.06, 16]} />
        <meshStandardMaterial 
          color="#0f172a" 
          metalness={0.8} 
          roughness={0.3}
        />
      </mesh>

      {/* Dome (Steam Collector) */}
      <mesh position={[0, 1.5, 0.5]} castShadow receiveShadow>
        <sphereGeometry args={[0.15, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial 
          color="#be123c" 
          metalness={0.7} 
          roughness={0.3}
        />
      </mesh>

      <mesh position={[0, 1.65, 0.5]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.1, 16]} />
        <meshStandardMaterial 
          color="#0f172a" 
          metalness={0.8} 
          roughness={0.3}
        />
      </mesh>

      {/* Safety Valves */}
      <mesh position={[0, 1.5, 0.2]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.15, 0.15]} />
        <meshStandardMaterial 
          color="#0f172a" 
          metalness={0.8} 
          roughness={0.3}
        />
      </mesh>

      {[0.05, -0.05].map((x, i) => (
        <mesh key={`valve-${i}`} position={[x, 1.65, 0.2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.15, 8]} />
          <meshStandardMaterial 
            color="#475569" 
            metalness={0.9} 
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Detailed Front Headlights */}
      {[-0.3, 0.3].map((x, i) => (
        <group key={`headlight-${i}`} position={[x, 0.65, 1.51]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.1, 0.12, 0.1, 16]} />
            <meshStandardMaterial 
              color="#1e293b" 
              metalness={0.8} 
              roughness={0.3}
            />
          </mesh>
          <mesh position={[0, 0, 0.05]} castShadow>
            <circleGeometry args={[0.09, 16]} />
            <meshStandardMaterial 
              color="#fef9c3" 
              emissive="#fef08a"
              emissiveIntensity={2}
            />
          </mesh>
          <pointLight 
            position={[0, 0, 0.15]} 
            intensity={0.8} 
            distance={10} 
            color="#fef9c3" 
          />
        </group>
      ))}

      {/* Realistic Cowcatcher */}
      <group position={[0, 0.05, 1.5]}>
        {[...Array(7)].map((_, i) => {
          const width = 1.2 - i * 0.15
          return (
            <mesh key={`cowcatcher-bar-${i}`} position={[0, i * 0.06, i * 0.12]} rotation={[Math.PI/5, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[width, 0.04, 0.05]} />
              <meshStandardMaterial 
                color="#475569" 
                metalness={0.7} 
                roughness={0.3}
              />
            </mesh>
          )
        })}
        {[...Array(6)].map((_, i) => {
          const x = -0.5 + i * 0.2
          return (
            <mesh key={`cowcatcher-vert-${i}`} position={[x, 0.15, 0]} rotation={[Math.PI/5, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.04, 0.5, 0.04]} />
              <meshStandardMaterial 
                color="#475569" 
                metalness={0.7} 
                roughness={0.3}
              />
            </mesh>
          )
        })}
      </group>

      {/* Buffers at Front */}
      {[-0.45, 0.45].map((x, i) => (
        <group key={`buffer-${i}`} position={[x, 0.35, 1.3]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.06, 0.06, 0.12, 12]} />
            <meshStandardMaterial 
              color="#0f172a" 
              metalness={0.8} 
              roughness={0.3}
            />
          </mesh>
          <mesh position={[0, 0, 0.1]} castShadow receiveShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.05, 12]} />
            <meshStandardMaterial 
              color="#0f172a" 
              metalness={0.8} 
              roughness={0.3}
            />
          </mesh>
        </group>
      ))}

      {/* Detailed Running Gear - Wheels and Connecting Rods */}
      <group ref={pistonRef} position={[0, 0, 0]}>
        {/* Drive Rods - Left Side */}
        <mesh position={[0.67, 0.0, 0.4]} castShadow receiveShadow>
          <boxGeometry args={[0.05, 0.07, 1.2]} />
          <meshStandardMaterial 
            color="#475569" 
            metalness={0.9} 
            roughness={0.2}
          />
        </mesh>
        
        {/* Drive Rods - Right Side */}
        <mesh position={[-0.67, 0.0, 0.4]} castShadow receiveShadow>
          <boxGeometry args={[0.05, 0.07, 1.2]} />
          <meshStandardMaterial 
            color="#475569" 
            metalness={0.9} 
            roughness={0.2}
          />
        </mesh>

        {/* Piston Assemblies */}
        {[-0.67, 0.67].map((x, i) => (
          <group key={`piston-${i}`} position={[x, 0.15, 1.1]}>
            <mesh rotation={[0, Math.PI/2, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.07, 0.07, 0.35, 12]} />
              <meshStandardMaterial 
                color="#64748b" 
                metalness={0.9} 
                roughness={0.2}
              />
            </mesh>
            <mesh position={[0, 0, -0.2]} castShadow receiveShadow>
              <boxGeometry args={[0.15, 0.15, 0.2]} />
              <meshStandardMaterial 
                color="#334155" 
                metalness={0.8} 
                roughness={0.2}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Highly Detailed Wheels */}
      {/* Drive Wheels - Larger Main Wheels */}
      {[
        [-0.65, -0.1, -0.4], [0.65, -0.1, -0.4], // Rear drive wheels
        [-0.65, -0.1, 0.4], [0.65, -0.1, 0.4],   // Front drive wheels
      ].map(([x, y, z], i) => (
        <group key={`wheel-${i}`} position={[x, y, z]} ref={(el: THREE.Group | null) => { if (el) wheelsRef.current[i] = el }}>
          <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.12, 32]} />
            <meshStandardMaterial 
              color="#1e293b" 
              metalness={0.85} 
              roughness={0.2}
            />
          </mesh>
          <mesh castShadow receiveShadow>
            <torusGeometry args={[0.4, 0.04, 16, 48]} />
            <meshStandardMaterial 
              color="#475569" 
              metalness={0.75} 
              roughness={0.25}
            />
          </mesh>
          
          {/* Wheel center hub */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.15, 16]} />
            <meshStandardMaterial 
              color="#64748b" 
              metalness={0.9} 
              roughness={0.2}
            />
          </mesh>
          
          {/* Wheel spokes */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, j) => (
            <mesh key={j} rotation={[0, 0, angle * Math.PI / 180]} castShadow receiveShadow>
              <boxGeometry args={[0.035, 0.76, 0.025]} />
              <meshStandardMaterial 
                color="#64748b" 
                metalness={0.8} 
                roughness={0.3}
              />
            </mesh>
          ))}
          
          {/* Counterweight */}
          <mesh rotation={[0, 0, Math.PI/6]} position={[0, -0.19, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.25, 0.15, 0.11]} />
            <meshStandardMaterial 
              color="#334155" 
              metalness={0.85} 
              roughness={0.25}
            />
          </mesh>
        </group>
      ))}

      {/* Smaller Front Wheels */}
      {[[-0.65, -0.1, 0.9], [0.65, -0.1, 0.9]].map(([x, y, z], i) => (
        <group key={`wheel-small-${i}`} position={[x, y, z]} ref={(el: THREE.Group | null) => { if (el) wheelsRef.current[i+4] = el }}>
          <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 0.1, 24]} />
            <meshStandardMaterial 
              color="#1e293b" 
              metalness={0.85} 
              roughness={0.2}
            />
          </mesh>
          <mesh castShadow receiveShadow>
            <torusGeometry args={[0.28, 0.03, 16, 36]} />
            <meshStandardMaterial 
              color="#475569" 
              metalness={0.75} 
              roughness={0.25}
            />
          </mesh>
          
          {/* Wheel spokes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, j) => (
            <mesh key={j} rotation={[0, 0, angle * Math.PI / 180]} castShadow receiveShadow>
              <boxGeometry args={[0.025, 0.54, 0.02]} />
              <meshStandardMaterial 
                color="#64748b" 
                metalness={0.8} 
                roughness={0.3}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Bell */}
      <mesh position={[0, 1.55, 0.0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.13, 0.15, 16, 1, true]} />
        <meshStandardMaterial 
          color="#eab308" 
          metalness={0.9} 
          roughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>
      <mesh position={[0, 1.48, 0.0]} castShadow receiveShadow>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial 
          color="#eab308" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Bell Support */}
      <mesh position={[0, 1.6, 0.0]} castShadow receiveShadow>
        <boxGeometry args={[0.15, 0.04, 0.15]} />
        <meshStandardMaterial 
          color="#0f172a" 
          metalness={0.8} 
          roughness={0.3}
        />
      </mesh>

      {/* Engineer in Cabin (Silhouette) */}
      <mesh position={[0, 1.2, -0.9]} castShadow>
        <boxGeometry args={[0.3, 0.5, 0.1]} />
        <meshStandardMaterial 
          color="#0f172a" 
          metalness={0.1} 
          roughness={0.9}
        />
      </mesh>
      <mesh position={[0, 1.5, -0.9]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color="#0f172a" 
          metalness={0.1} 
          roughness={0.9}
        />
      </mesh>

      {/* Realistic Steam Smoke Effect */}
      <group ref={smokeRef} position={[0, 1.9, 1.0]}>
        {/* Dynamic particles for steam effect */}
        <Sparkles 
          count={40 * speed} 
          scale={[0.7, 1.0, 0.7]} 
          size={6} 
          speed={0.4 * speed} 
          noise={0.2}
          color="#e2e8f0" 
        />
        
        {/* Volumetric steam plumes */}
        {steamPlumes.map((plume, i) => (
          <mesh key={i} position={plume.position as [number, number, number]}>
            <sphereGeometry args={[plume.scale]} />
            <meshStandardMaterial 
              color="#f1f5f9" 
              transparent 
              opacity={plume.opacity * Math.min(1, speed / 1.5)}
              fog={true}
            />
          </mesh>
        ))}
      </group>

      {/* Company Logo/Emblem on Side of Cabin */}
      <mesh position={[0.56, 1.2, -0.5]} rotation={[0, -Math.PI/2, 0]} castShadow>
        <circleGeometry args={[0.18, 24]} />
        <meshStandardMaterial 
          color="#1e40af" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      <mesh position={[-0.56, 1.2, -0.5]} rotation={[0, Math.PI/2, 0]} castShadow>
        <circleGeometry args={[0.18, 24]} />
        <meshStandardMaterial 
          color="#1e40af" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Logo detail - star symbol */}
      {[0.56, -0.56].map((x, i) => {
        const rotation = x > 0 ? -Math.PI/2 : Math.PI/2
        return (
          <mesh key={`logo-${i}`} position={[x, 1.2, -0.495]} rotation={[0, rotation, 0]} castShadow>
            {/** @ts-expect-error: Custom geometry 'starGeometry' is not typed in R3F */}
            <starGeometry args={[0.13, 0.05, 5]} />
            <meshStandardMaterial 
              color="#fbbf24" 
              metalness={1} 
              roughness={0.1}
              emissive="#fbbf24"
              emissiveIntensity={0.2}
            />
          </mesh>
        )
      })}
      
      {/* Cabin Controls - Throttle and Brake Levers */}
      <mesh position={[0.4, 1.1, -0.8]} rotation={[0, 0, Math.PI/6]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.03]} />
        <meshStandardMaterial 
          color="#94a3b8" 
          metalness={0.9} 
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0.28, 1.1, -0.8]} rotation={[0, 0, -Math.PI/8]} castShadow>
        <boxGeometry args={[0.03, 0.3, 0.03]} />
        <meshStandardMaterial 
          color="#94a3b8" 
          metalness={0.9} 
          roughness={0.2}
        />
      </mesh>
    </group>
  )

  // Return the actual component JSX
  return vrInteractive && isPresenting ? (
    <Interactive onSelect={handleSelect} onSelectEnd={handleRelease} onMove={handleMove}>
      <TrainModel />
    </Interactive>
  ) : (
    <TrainModel />
  )
} 