import { useState, useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text, Billboard } from '@react-three/drei'
import * as THREE from 'three'

interface VRUIProps {
  showMenu?: boolean
  onMenuItemSelected?: (item: string) => void
}

export default function VRUI({ 
  showMenu = false,
  onMenuItemSelected
}: VRUIProps) {
  const [visible, setVisible] = useState(showMenu)
  const menuRef = useRef<THREE.Group>(null)
  const { camera } = useThree()
  
  // Update visibility based on prop changes
  useEffect(() => {
    setVisible(showMenu)
  }, [showMenu])
  
  // Update menu position to follow user at a fixed distance
  useFrame(() => {
    if (menuRef.current && visible) {
      // Position menu at a comfortable reading distance
      const idealDistance = 2
      const currentPosition = new THREE.Vector3()
      
      // Get current camera direction
      const cameraDirection = new THREE.Vector3(0, 0, -1)
      cameraDirection.applyQuaternion(camera.quaternion)
      
      // Position the menu in front of the camera at the ideal distance
      currentPosition.copy(camera.position).add(
        cameraDirection.multiplyScalar(idealDistance)
      )
      
      // Add slight offset to eye level
      currentPosition.y -= 0.3
      
      // Update menu position
      menuRef.current.position.copy(currentPosition)
    }
  })
  
  // Menu items for demonstration
  const menuItems = [
    'Settings',
    'Movement Mode',
    'Comfort Options',
    'Graphics Quality',
    'Return to Desktop'
  ]
  
  // Handle menu item selection
  const handleMenuItemClick = (item: string) => {
    if (onMenuItemSelected) {
      onMenuItemSelected(item)
    }
  }
  
  if (!visible) return null
  
  return (
    <group ref={menuRef}>
      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        {/* Main panel */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.6, 1.2, 0.05]} />
          <meshStandardMaterial 
            color="#111827" 
            transparent 
            opacity={0.8}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>
        
        {/* Title */}
        <Text
          position={[0, 0.45, 0.03]}
          fontSize={0.12}
          color="#00F0FF"
          font="/fonts/Orbitron-Medium.ttf"
          anchorX="center"
          anchorY="middle"
        >
          VR MENU
        </Text>
        
        {/* Menu items */}
        <group position={[0, 0.1, 0.03]}>
          {menuItems.map((item, index) => (
            <MenuItem 
              key={item}
              label={item}
              position={[0, -index * 0.15, 0]}
              onClick={() => handleMenuItemClick(item)}
            />
          ))}
        </group>
      </Billboard>
    </group>
  )
}

// Individual menu item component
interface MenuItemProps {
  label: string
  position: [number, number, number]
  onClick: () => void
}

function MenuItem({ label, position, onClick }: MenuItemProps) {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null)
  
  // Highlight effect on hover
  useEffect(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial
      if (material) {
        material.color.set(hovered ? '#1E40AF' : '#1E293B')
        material.emissive.set(hovered ? '#60A5FA' : '#000000')
      }
    }
  }, [hovered])
  
  return (
    <group position={position}>
      {/* Button background */}
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <planeGeometry args={[1.4, 0.12]} />
        <meshStandardMaterial 
          color={hovered ? '#1E40AF' : '#1E293B'}
          emissive={hovered ? '#60A5FA' : '#000000'}
          emissiveIntensity={0.5}
          roughness={0.6}
          metalness={0.4}
        />
      </mesh>
      
      {/* Button text */}
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.07}
        color="#FFFFFF"
        font="/fonts/Inter-Medium.ttf"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  )
} 