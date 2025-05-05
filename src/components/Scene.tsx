import React, { useState, useEffect, useRef } from 'react'
import { Environment, OrbitControls, Stars, Cloud, Sky } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useXR } from '@react-three/xr'
import VRControllerModel from './vr/VRControllerModel'
import VRTeleportation from './vr/VRTeleportation'

export default function Scene() {
  const { camera } = useThree()
  const directionalLightRef = useRef<THREE.DirectionalLight>(null)
  const groundRef = useRef<THREE.Mesh>(null)
  const { isPresenting } = useXR()

  useEffect(() => {
    console.log('Scene component loaded, configuring camera')
    // Only modify camera when not in VR mode
    if (!isPresenting) {
      camera.position.set(0, 2, 5)
      camera.lookAt(0, 0, 0)
      
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.fov = 40
        camera.near = 0.1
        camera.far = 1000
        camera.updateProjectionMatrix()
      }
    }
  }, [camera, isPresenting])
  
  useFrame(({ clock }) => {
    if (!isPresenting) {
      try {
        // Only animate camera when not in VR
        const t = clock.getElapsedTime() * 0.1
        camera.position.x = Math.sin(t) * 0.5
        camera.position.y = 2 + Math.sin(t * 0.3) * 0.2
        camera.position.z = 5 + Math.cos(t * 0.2) * 0.3
        camera.lookAt(0, 0.5, 0)
      } catch (error) {
        console.error('Error in camera animation:', error)
      }
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} color="#b1c5e0" />
      
      {!isPresenting && (
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.1}
          minPolarAngle={Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          minAzimuthAngle={-Math.PI / 4}
          rotateSpeed={0.3}
        />
      )}
      
      <Sky 
        distance={300000} 
        sunPosition={[1, 0.1, 0]} 
        inclination={0.52} 
        azimuth={0.25} 
        turbidity={8}
        rayleigh={1}
        mieCoefficient={0.005}
        mieDirectionalG={0.7}
      />
      
      <Environment preset="sunset" />
      
      <directionalLight 
        ref={directionalLightRef}
        position={[10, 10, 5]} 
        intensity={1.2} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
        color="#ffecc7"
      >
        <orthographicCamera 
          attach="shadow-camera" 
          args={[-10, 10, 10, -10, 0.1, 30]} 
        />
      </directionalLight>
      
      <hemisphereLight args={['#c2d9ff', '#749ea8', 0.7]} />
      
      <fog attach="fog" args={['#bfd2ff', 20, 60]} />
      
      <Stars radius={100} depth={50} count={1500} factor={4} saturation={0.4} fade speed={0.2} />
      
      <Cloud 
        position={[0, 25, -20]}
        opacity={0.3}
        speed={0.02}
        segments={20}
        color="#fff"
      />
      
      <mesh 
        ref={groundRef}
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.5, 0]} 
        receiveShadow
      >
        <planeGeometry args={[1000, 1000, 32, 32]} />
        <meshStandardMaterial 
          color="#3e5153" 
          roughness={1}
          metalness={0.1}
        />
      </mesh>

      {isPresenting && (
        <>
          <VRTeleportation floorPlanes={groundRef.current ? [groundRef.current] : []} />
          
          <VRControllerModel hand="left" />
          <VRControllerModel hand="right" />
        </>
      )}
    </>
  )
} 