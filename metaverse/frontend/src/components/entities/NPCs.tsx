import React, { useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useMetaverseStore } from '../../stores/metaverseStore';
import './NPCs.css'; // Import CSS file

const NPCs: React.FC = () => {
  const { npcs, playerPosition, interactWithNPC } = useMetaverseStore();

  // Fetch nearby NPCs when player position changes
  useEffect(() => {
    const fetchNearbyNPCs = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/npcs/nearby?x=${playerPosition.x}&y=${playerPosition.y}&z=${playerPosition.z}&radius=50`
        );
        
        if (response.ok) {
          const data = await response.json();
          // This would typically update the store with nearby NPCs
          // But in this example, we're not implementing that fully
          console.log('Nearby NPCs:', data.npcs);
        }
      } catch (error) {
        console.error('Error fetching nearby NPCs:', error);
      }
    };

    // Only fetch every few seconds to avoid spamming
    const interval = setInterval(fetchNearbyNPCs, 5000);
    return () => clearInterval(interval);
  }, [playerPosition]);

  // Handle clicking on an NPC
  const handleNPCClick = (npcId: string) => {
    interactWithNPC(npcId);
  };

  return (
    <group>
      {npcs.map((npc) => (
        <group key={npc.id} position={[npc.position.x, npc.position.y, npc.position.z]}>
          {/* NPC body */}
          <mesh 
            castShadow
            onClick={() => handleNPCClick(npc.id)}
          >
            <capsuleGeometry args={[0.5, 1.5, 4, 8]} />
            {/* Different colors based on NPC type */}
            <meshStandardMaterial 
              color={npc.mood === 'happy' ? '#4CAF50' : 
                    npc.mood === 'angry' ? '#F44336' : 
                    npc.mood === 'sad' ? '#2196F3' : 
                    '#9E9E9E'} 
            />
          </mesh>
          
          {/* NPC name label */}
          <Html
            position={[0, 2.5, 0]}
            center
            distanceFactor={10}
            transform
          >
            <div className="npc-label">
              {npc.name}
              <br />
              <small>{npc.occupation}</small>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
};

export default NPCs; 