import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useXR } from '@react-three/xr';
import { useMetaverseStore } from '../stores/metaverseStore';
import Terrain from './world/Terrain';
import Player from './entities/Player';
import NPCs from './entities/NPCs';
import WorldObjects from './world/WorldObjects';
import RailwayWorld from './world/RailwayWorld';

const MetaverseScene: React.FC = () => {
  const { camera } = useThree();
  const { playerPosition, updatePlayerPosition, fetchWorldChunks, worldChunks } = useMetaverseStore();
  const lastUpdateTime = useRef(0);
  const { isPresenting } = useXR();

  // Fetch world data when player position changes
  useEffect(() => {
    const fetchData = async () => {
      await fetchWorldChunks(playerPosition);
    };

    fetchData();
  }, [playerPosition, fetchWorldChunks]);

  // Update player position and camera
  useFrame(({ clock }) => {
    // Only update every 100ms to reduce load on server
    const currentTime = clock.getElapsedTime();
    if (currentTime - lastUpdateTime.current > 0.1) {
      // Example: In a real application, this would sync with controls
      // const newPosition = { x: playerPosition.x, y: playerPosition.y, z: playerPosition.z };
      // updatePlayerPosition(newPosition);
      
      lastUpdateTime.current = currentTime;
    }

    // Update camera to follow player only when not in VR mode
    if (!isPresenting) {
      camera.position.x = playerPosition.x;
      camera.position.z = playerPosition.z + 10;
      camera.position.y = playerPosition.y + 5;
      camera.lookAt(playerPosition.x, playerPosition.y, playerPosition.z);
    }
  });
  
  // VR-specific setup and adaptations
  useEffect(() => {
    if (isPresenting) {
      // When entering VR, position the player at camera height
      if (camera) {
        updatePlayerPosition({
          x: playerPosition.x,
          y: camera.position.y - 1.6, // Adjust for approximate avatar height
          z: playerPosition.z
        });
      }
    }
  }, [isPresenting, camera]);

  return (
    <>
      {/* Railway Metaverse World */}
      <RailwayWorld />
      
      {/* Standard World Components */}
      <Terrain chunks={worldChunks} />
      <WorldObjects />
      
      {/* Entities */}
      <Player />
      <NPCs />
      
      {/* Origin Helper (hide in VR for better immersion) */}
      {!isPresenting && (
        <>
          <axesHelper args={[5]} />
          <gridHelper args={[100, 100]} />
        </>
      )}
    </>
  );
};

export default MetaverseScene; 