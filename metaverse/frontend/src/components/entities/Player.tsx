import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useMetaverseStore } from '../../stores/metaverseStore';

const Player: React.FC = () => {
  const { playerPosition, updatePlayerPosition } = useMetaverseStore();
  const meshRef = useRef<THREE.Mesh>(null);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const speed = 0.5;
      let newPosition = { ...playerPosition };

      switch (event.key) {
        case 'w':
        case 'ArrowUp':
          newPosition.z -= speed;
          break;
        case 's':
        case 'ArrowDown':
          newPosition.z += speed;
          break;
        case 'a':
        case 'ArrowLeft':
          newPosition.x -= speed;
          break;
        case 'd':
        case 'ArrowRight':
          newPosition.x += speed;
          break;
        case ' ': // Space for jump
          newPosition.y += speed;
          break;
        case 'Shift': // Shift for down
          newPosition.y -= speed;
          break;
        default:
          return; // Exit if the key doesn't do anything
      }

      updatePlayerPosition(newPosition);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playerPosition, updatePlayerPosition]);

  // Update mesh position to match player position
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
    }
  });

  return (
    <mesh 
      ref={meshRef}
      position={[playerPosition.x, playerPosition.y, playerPosition.z]}
      castShadow
    >
      {/* Player avatar - simple placeholder */}
      <capsuleGeometry args={[0.5, 1.5, 4, 8]} />
      <meshStandardMaterial color="#3399ff" />
    </mesh>
  );
};

export default Player; 