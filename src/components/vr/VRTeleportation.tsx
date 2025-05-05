import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useController, Interactive } from '@react-three/xr'
import * as THREE from 'three'

interface VRTeleportationProps {
  floorPlanes?: THREE.Mesh[] // Optional list of meshes to use as teleportation surfaces
}

export default function VRTeleportation({ floorPlanes = [] }: VRTeleportationProps) {
  const [hoverPoint, setHoverPoint] = useState<THREE.Vector3 | null>(null)
  const [targetPoint, setTargetPoint] = useState<THREE.Vector3 | null>(null)
  const rightController = useController('right')
  const teleportationRay = useRef<THREE.Raycaster>(new THREE.Raycaster())
  const teleportMarker = useRef<THREE.Mesh>(null)
  
  // Direction & origin vectors for the raycaster
  const rayDir = useRef(new THREE.Vector3(0, -1, 0))
  const rayOrigin = useRef(new THREE.Vector3())
  
  // Minimum distance to teleport
  const minTeleportDistance = 0.5
  
  // Handle teleportation logic in animation frame
  useFrame((state) => {
    // Only process teleportation when right controller is available
    if (rightController) {
      const controller = rightController.controller
      
      // Get controller position & orientation
      controller.getWorldPosition(rayOrigin.current)
      controller.getWorldDirection(rayDir.current)
      rayDir.current.multiplyScalar(-1) // Flip direction to point forward
      
      // Aim the ray slightly downward for more natural pointing
      rayDir.current.y -= 0.5
      rayDir.current.normalize()
      
      // Update raycaster
      teleportationRay.current.set(rayOrigin.current, rayDir.current)
      
      // Find valid intersection points with floor planes or default floor
      let intersections: THREE.Intersection[] = []
      
      if (floorPlanes && floorPlanes.length > 0) {
        intersections = teleportationRay.current.intersectObjects(floorPlanes, false)
      } else {
        // If no floor planes provided, use a default ground plane at y=0
        const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
        const targetPoint = new THREE.Vector3()
        
        if (teleportationRay.current.ray.intersectPlane(groundPlane, targetPoint)) {
          intersections.push({
            distance: rayOrigin.current.distanceTo(targetPoint),
            point: targetPoint,
            object: null as any,
            uv: null as any,
            instanceId: null,
            face: null as any,
          })
        }
      }
      
      // Update hover point if valid intersection found
      if (intersections.length > 0) {
        const point = intersections[0].point
        
        // Only set hover point if it's a valid location
        if (point) {
          setHoverPoint(point.clone())
          
          // Update the teleport marker position
          if (teleportMarker.current) {
            teleportMarker.current.position.copy(point)
            teleportMarker.current.visible = true
          }
        } else {
          // Hide marker if no valid point
          if (teleportMarker.current) {
            teleportMarker.current.visible = false
          }
          setHoverPoint(null)
        }
      } else {
        // Hide marker if no intersection
        if (teleportMarker.current) {
          teleportMarker.current.visible = false
        }
        setHoverPoint(null)
      }
      
      // Process teleportation trigger from controller
      // This would typically be mapped to a button press or gesture
      // For this example, we'll check if the primary button is pressed
      if (rightController.inputSource.gamepad?.buttons[0]?.pressed && hoverPoint) {
        setTargetPoint(hoverPoint.clone())
      }
    }
    
    // Apply teleportation if there's a target point
    if (targetPoint && state.camera) {
      // Calculate XZ offset (maintaining Y height)
      const camPosition = new THREE.Vector3()
      state.camera.getWorldPosition(camPosition)
      
      // Teleport the camera rig to the target point
      // In a typical setup, this would move the player/rig, not the camera directly
      state.camera.position.x += targetPoint.x - camPosition.x
      state.camera.position.z += targetPoint.z - camPosition.z
      
      // Reset target point after teleporting
      setTargetPoint(null)
    }
  })
  
  return (
    <>
      {/* Teleportation marker */}
      <mesh 
        ref={teleportMarker} 
        visible={false} 
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.15, 0.2, 32]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.6} />
      </mesh>
    </>
  )
} 