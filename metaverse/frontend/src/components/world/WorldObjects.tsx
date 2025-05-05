import React, { useEffect, useState } from 'react';
import { useMetaverseStore } from '../../stores/metaverseStore';

interface WorldObject {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  properties: any;
}

const WorldObjects: React.FC = () => {
  const { playerPosition } = useMetaverseStore();
  const [objects, setObjects] = useState<WorldObject[]>([]);

  // Fetch objects when player position changes
  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/world/objects?x=${playerPosition.x}&y=${playerPosition.y}&z=${playerPosition.z}&radius=50`
        );
        
        if (response.ok) {
          const data = await response.json();
          setObjects(data.objects);
        }
      } catch (error) {
        console.error('Error fetching world objects:', error);
      }
    };

    // Only fetch every few seconds to avoid spamming
    const interval = setInterval(fetchObjects, 5000);
    return () => clearInterval(interval);
  }, [playerPosition]);

  // Render different objects based on their type
  return (
    <group>
      {objects.map((object) => {
        // Render different objects based on their type
        switch (object.type) {
          case 'chest':
            return (
              <mesh
                key={object.id}
                position={[object.position.x, object.position.y, object.position.z]}
                castShadow
              >
                <boxGeometry args={[1, 0.5, 0.7]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
            );
            
          case 'crystal':
            return (
              <mesh
                key={object.id}
                position={[object.position.x, object.position.y, object.position.z]}
                castShadow
              >
                <octahedronGeometry args={[0.5]} />
                <meshStandardMaterial 
                  color="#00FFFF"
                  emissive="#00FFFF"
                  emissiveIntensity={0.5}
                  transparent={true}
                  opacity={0.8}
                />
              </mesh>
            );
            
          case 'campfire':
            return (
              <group
                key={object.id}
                position={[object.position.x, object.position.y, object.position.z]}
              >
                {/* Base */}
                <mesh position={[0, 0, 0]} castShadow>
                  <cylinderGeometry args={[1, 1.2, 0.2, 16]} />
                  <meshStandardMaterial color="#666666" />
                </mesh>
                
                {/* Fire */}
                <mesh position={[0, 0.3, 0]}>
                  <coneGeometry args={[0.7, 1, 16]} />
                  <meshStandardMaterial 
                    color="#FF4500"
                    emissive="#FF4500"
                    emissiveIntensity={0.8}
                  />
                </mesh>
              </group>
            );
            
          default:
            // Generic object
            return (
              <mesh
                key={object.id}
                position={[object.position.x, object.position.y, object.position.z]}
                castShadow
              >
                <sphereGeometry args={[0.5]} />
                <meshStandardMaterial color="#AAAAAA" />
              </mesh>
            );
        }
      })}
    </group>
  );
};

export default WorldObjects; 