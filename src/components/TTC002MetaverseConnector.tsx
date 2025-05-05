'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { XR, VRButton, Controllers, Hands } from '@react-three/xr'
import { Environment, useGLTF, Sky, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { VRExperience } from './vr'
import TTC002LauncherService from '@/services/ttc002LauncherService'

interface TTC002MetaverseConnectorProps {
  showControls?: boolean
  applicationPath?: string
}

/**
 * Component that integrates TTC_002 application with the metaverse
 * This acts as a bridge between the standalone application and the metaverse environment
 */
const TTC002MetaverseConnector: React.FC<TTC002MetaverseConnectorProps> = ({
  showControls = true,
  applicationPath = '/TTC_002/TTC_002_Showcase.exe'
}) => {
  const [isConnected, setIsConnected] = useState(false)
  const [metaverseData, setMetaverseData] = useState<any>(null)
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 1.6, z: 0 })
  const [isAppRunning, setIsAppRunning] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const launcherRef = useRef<TTC002LauncherService | null>(null)
  
  // Initialize the launcher service
  useEffect(() => {
    launcherRef.current = TTC002LauncherService.getInstance();
    
    // Set up event listeners
    const handleAppClosed = () => {
      setIsAppRunning(false);
    };
    
    launcherRef.current.on('application-closed', handleAppClosed);
    
    // Check if app is already running
    setIsAppRunning(launcherRef.current.isRunning());
    
    return () => {
      if (launcherRef.current) {
        launcherRef.current.off('application-closed', handleAppClosed);
      }
    };
  }, []);
  
  // Connect to the metaverse WebSocket
  useEffect(() => {
    // Check if WebSocket is already connected
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) return
    
    // Initialize WebSocket connection
    const ws = new WebSocket('ws://localhost:8000/ws/railway')
    wsRef.current = ws
    
    // Handle WebSocket events
    ws.onopen = () => {
      console.log('Connected to metaverse')
      setIsConnected(true)
      
      // Send initial position to the metaverse
      ws.send(JSON.stringify({
        type: 'position_update',
        data: {
          x: lastPosition.x,
          y: lastPosition.y,
          z: lastPosition.z,
          view_distance: 500.0
        }
      }))
    }
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        setMetaverseData(data)
        
        // Handle different message types
        if (data.type === 'railway_update') {
          // Update the railway system visualization
          console.log('Received railway update:', data.data)
          
          // If the app is running, send the update to it
          if (isAppRunning && launcherRef.current) {
            launcherRef.current.sendToApplication('metaverse-railway-update', data.data);
          }
        } else if (data.type === 'train_update') {
          // Update specific train visualization
          console.log('Received train update:', data.data)
          
          // If the app is running, send the update to it
          if (isAppRunning && launcherRef.current) {
            launcherRef.current.sendToApplication('metaverse-train-update', data.data);
          }
        } else if (data.type === 'error') {
          console.error('Metaverse error:', data.data.message)
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error)
      }
    }
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
      setIsConnected(false)
    }
    
    ws.onclose = () => {
      console.log('Disconnected from metaverse')
      setIsConnected(false)
    }
    
    // Clean up WebSocket connection
    return () => {
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close()
      }
    }
  }, [lastPosition, isAppRunning])
  
  // Handle position updates to send to the metaverse
  const handlePositionUpdate = (position: { x: number, y: number, z: number }) => {
    setLastPosition(position)
    
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'position_update',
        data: {
          x: position.x,
          y: position.y,
          z: position.z,
          view_distance: 500.0
        }
      }))
    }
  }
  
  // Handle train control in the metaverse
  const handleTrainControl = (trainId: string, action: string, targetStationId?: string, speed?: number) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'train_control',
        data: {
          train_id: trainId,
          action: action,
          target_station_id: targetStationId,
          speed: speed
        }
      }))
    }
  }
  
  // Launch the TTC_002 application
  const launchApplication = async () => {
    if (launcherRef.current) {
      const params: Record<string, string> = {
        position: JSON.stringify(lastPosition),
        mode: 'metaverse'
      };
      
      const success = await launcherRef.current.launchApplication(params);
      if (success) {
        setIsAppRunning(true);
      }
    }
  }
  
  return (
    <div className="w-full h-full relative">
      {/* Status indicators */}
      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
        <div className={`px-3 py-1 rounded-full text-sm 
          ${isConnected ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          {isConnected ? 'Connected to Metaverse' : 'Disconnected'}
        </div>
        <div className={`px-3 py-1 rounded-full text-sm 
          ${isAppRunning ? 'bg-green-500' : 'bg-yellow-500'} text-white`}>
          {isAppRunning ? 'TTC_002 Running' : 'TTC_002 Not Running'}
        </div>
      </div>
      
      {/* TTC_002 VR Experience */}
      <VRExperience disableDefaultLighting={false} defaultEnvironment="sunset">
        {/* Main scene content */}
        <Scene 
          metaverseData={metaverseData} 
          onPositionUpdate={handlePositionUpdate}
          onTrainControl={handleTrainControl}
        />
      </VRExperience>
      
      {/* Control panel shown when not in VR mode */}
      {showControls && (
        <div className="absolute bottom-4 left-4 z-10 bg-black/70 p-4 rounded-lg text-white">
          <h3 className="text-lg font-bold mb-2">TTC_002 Metaverse Controls</h3>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => handlePositionUpdate({ x: 0, y: 1.6, z: 0 })}
              className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded"
            >
              Reset Position
            </button>
            <button 
              onClick={launchApplication}
              className={`${isAppRunning ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'} px-3 py-1.5 rounded`}
              disabled={isAppRunning}
            >
              {isAppRunning ? 'TTC_002 Running' : 'Launch TTC_002'}
            </button>
            
            {metaverseData?.type === 'railway_update' && metaverseData.data.trains?.length > 0 && (
              <button 
                onClick={() => {
                  const train = metaverseData.data.trains[0];
                  handleTrainControl(train.id, 'start', metaverseData.data.stations?.[0]?.id);
                }}
                className="col-span-2 bg-yellow-600 hover:bg-yellow-700 px-3 py-1.5 rounded"
              >
                Start Train Journey
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Scene component to render the 3D content
function Scene({ 
  metaverseData, 
  onPositionUpdate, 
  onTrainControl 
}: { 
  metaverseData: any,
  onPositionUpdate: (position: { x: number, y: number, z: number }) => void,
  onTrainControl: (trainId: string, action: string, targetStationId?: string, speed?: number) => void
}) {
  // Create refs for train models
  const trainModels = useRef<{ [key: string]: THREE.Group }>({})
  
  // Update position when camera moves
  useEffect(() => {
    const interval = setInterval(() => {
      // This would typically be driven by actual camera movement
      // For demo purposes, we'll just update with a random offset to the last position
      onPositionUpdate({
        x: (Math.random() - 0.5) * 0.1,
        y: 1.6,
        z: (Math.random() - 0.5) * 0.1
      })
    }, 5000)
    
    return () => clearInterval(interval)
  }, [onPositionUpdate])
  
  // Update train positions based on metaverse data
  useEffect(() => {
    if (metaverseData?.type === 'railway_update') {
      const { trains } = metaverseData.data
      
      // Update train models or create new ones
      trains?.forEach((train: any) => {
        // Handle train model updates here
        console.log(`Train ${train.id} at position:`, train.position)
      })
    }
  }, [metaverseData])
  
  return (
    <>
      {/* Ground plane for teleportation */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]} 
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#303030" />
      </mesh>
      
      {/* Station model placeholder */}
      <mesh position={[10, 0, 10]} castShadow receiveShadow>
        <boxGeometry args={[5, 3, 5]} />
        <meshStandardMaterial color="#4B5563" />
      </mesh>
      
      {/* Train track placeholder */}
      <mesh position={[0, 0.1, 0]} rotation={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[30, 0.1, 2]} />
        <meshStandardMaterial color="#1F2937" />
      </mesh>
      
      {/* TTC_002 model placeholder */}
      <mesh position={[0, 1, 5]} castShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#3B82F6" />
      </mesh>
      
      {/* Add lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      
      {/* Sky and environment */}
      <Sky />
    </>
  )
}

export default TTC002MetaverseConnector 