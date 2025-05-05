import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Interactive, useXR } from '@react-three/xr'
import * as THREE from 'three'

interface VRGrabbableProps {
  children: React.ReactNode
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
  onGrab?: () => void
  onRelease?: () => void
}

export default function VRGrabbable({
  children,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  onGrab,
  onRelease
}: VRGrabbableProps) {
  const [isGrabbed, setIsGrabbed] = useState(false)
  const [activeController, setActiveController] = useState<THREE.Object3D | null>(null)
  const objectRef = useRef<THREE.Group>(null)
  
  // Store initial offset between controller and object
  const grabOffset = useRef<THREE.Vector3>(new THREE.Vector3())
  const grabRotation = useRef<THREE.Quaternion>(new THREE.Quaternion())
  
  // Handle grabbable object's update logic
  useFrame(() => {
    if (isGrabbed && objectRef.current && activeController) {
      // Apply controller movement to the grabbed object
      // This keeps the object locked to the controller but maintaining the initial grab offset
      const controllerWorldPos = new THREE.Vector3()
      const controllerWorldQuat = new THREE.Quaternion()
      
      activeController.getWorldPosition(controllerWorldPos)
      activeController.getWorldQuaternion(controllerWorldQuat)
      
      // Apply the grab offset to maintain relative position
      const targetPosition = controllerWorldPos.clone().add(
        grabOffset.current.clone().applyQuaternion(controllerWorldQuat)
      )
      
      // Apply the grab rotation to maintain relative rotation
      const targetRotation = controllerWorldQuat.clone().multiply(grabRotation.current)
      
      // Update object position and rotation
      objectRef.current.position.copy(targetPosition)
      objectRef.current.quaternion.copy(targetRotation)
    }
  })
  
  // Handle grab start
  const handleSelect = (event: { controller: THREE.Object3D }) => {
    if (!isGrabbed) {
      setIsGrabbed(true)
      setActiveController(event.controller)
      
      if (objectRef.current && event.controller) {
        // Calculate and store the initial offset between controller and object
        const controllerWorldPos = new THREE.Vector3()
        const controllerWorldQuat = new THREE.Quaternion()
        const objectWorldPos = new THREE.Vector3()
        const objectWorldQuat = new THREE.Quaternion()
        
        event.controller.getWorldPosition(controllerWorldPos)
        event.controller.getWorldQuaternion(controllerWorldQuat)
        
        objectRef.current.getWorldPosition(objectWorldPos)
        objectRef.current.getWorldQuaternion(objectWorldQuat)
        
        // The offset is in the controller's local space
        grabOffset.current.copy(objectWorldPos).sub(controllerWorldPos)
        
        // We need to invert the controller's quaternion to get the local space offset
        const invControllerQuat = controllerWorldQuat.clone().invert()
        grabOffset.current.applyQuaternion(invControllerQuat)
        
        // Calculate relative rotation
        grabRotation.current.copy(invControllerQuat).multiply(objectWorldQuat)
      }
      
      // Call user callback if provided
      if (onGrab) onGrab()
    }
  }
  
  // Handle grab release
  const handleRelease = () => {
    if (isGrabbed) {
      setIsGrabbed(false)
      setActiveController(null)
      
      // Call user callback if provided
      if (onRelease) onRelease()
    }
  }
  
  // Handle squeeze (grip button) as alternative grab method
  const handleSqueeze = (event: { controller: THREE.Object3D }) => {
    handleSelect(event)
  }
  
  return (
    <Interactive 
      onSelect={handleSelect}
      onSelectEnd={handleRelease}
      onSqueeze={handleSqueeze}
      onSqueezeEnd={handleRelease}
    >
      <group 
        ref={objectRef}
        position={position as [number, number, number]}
        rotation={rotation as [number, number, number]}
        scale={typeof scale === 'number' ? [scale, scale, scale] : scale}
      >
        {children}
      </group>
    </Interactive>
  )
} 