import React, { useMemo } from 'react';
import { Vector3 } from 'three';
import { WorldChunk } from '../../stores/metaverseStore';

interface TerrainProps {
  chunks: WorldChunk[];
}

const Terrain: React.FC<TerrainProps> = ({ chunks }) => {
  // Generate terrain meshes based on the chunks data
  const terrainMeshes = useMemo(() => {
    return chunks.map((chunk, index) => {
      // In a real implementation, this would use the heightmap data
      // to generate a detailed terrain mesh
      return (
        <mesh 
          key={index}
          position={[chunk.position.x, chunk.position.y, chunk.position.z]}
          receiveShadow
        >
          {/* Simple placeholder - in reality you would use the heightmap */}
          <boxGeometry args={[chunk.size, 1, chunk.size]} />
          <meshStandardMaterial color="#3d8c40" />
        </mesh>
      );
    });
  }, [chunks]);

  // Generate vegetation based on the chunks data
  const vegetation = useMemo(() => {
    const vegetationElements: JSX.Element[] = [];
    
    chunks.forEach((chunk, chunkIndex) => {
      chunk.vegetation.forEach((item, index) => {
        const position = item.position;
        
        // Determine the type of vegetation and render accordingly
        const vegetationType = item.type;
        let color = '#2d6a30'; // Default green
        let sizeX = 0.5;
        let sizeY = 1;
        let sizeZ = 0.5;
        
        switch (vegetationType) {
          case 'tree':
            color = '#1e4d2b';
            sizeX = 1;
            sizeY = 5;
            sizeZ = 1;
            break;
          case 'bush':
            color = '#3a7d3a';
            sizeX = 1;
            sizeY = 1;
            sizeZ = 1;
            break;
          case 'flower':
            color = '#e55ea2';
            sizeX = 0.2;
            sizeY = 0.3;
            sizeZ = 0.2;
            break;
          case 'grass':
            color = '#5c9e5c';
            sizeX = 0.1;
            sizeY = 0.5;
            sizeZ = 0.1;
            break;
        }
        
        // Simple placeholder for vegetation
        vegetationElements.push(
          <mesh
            key={`veg-${chunkIndex}-${index}`}
            position={[position.x, position.y + sizeY/2, position.z]}
            rotation={[0, Math.random() * Math.PI * 2, 0]}
          >
            <boxGeometry args={[sizeX, sizeY, sizeZ]} />
            <meshStandardMaterial color={color} />
          </mesh>
        );
      });
    });
    
    return vegetationElements;
  }, [chunks]);

  // Generate structures based on the chunks data
  const structures = useMemo(() => {
    const structureElements: JSX.Element[] = [];
    
    chunks.forEach((chunk, chunkIndex) => {
      chunk.structures.forEach((structure, index) => {
        const position = structure.position;
        
        // Determine the type of structure and render accordingly
        const structureType = structure.type;
        let color = '#8d8d8d'; // Default gray
        let sizeX = 3;
        let sizeY = 3;
        let sizeZ = 3;
        
        switch (structureType) {
          case 'house':
            color = '#a86032';
            sizeX = 4;
            sizeY = 3;
            sizeZ = 4;
            break;
          case 'tower':
            color = '#6c6c6c';
            sizeX = 2;
            sizeY = 8;
            sizeZ = 2;
            break;
          case 'ruins':
            color = '#a8a8a8';
            sizeX = 5;
            sizeY = 1;
            sizeZ = 5;
            break;
          case 'camp':
            color = '#8b4513';
            sizeX = 3;
            sizeY = 1;
            sizeZ = 3;
            break;
        }
        
        // Simple placeholder for structure
        structureElements.push(
          <mesh
            key={`struct-${chunkIndex}-${index}`}
            position={[position.x, position.y + sizeY/2, position.z]}
            rotation={[0, (structure.properties?.rotation || 0) * Math.PI/180, 0]}
          >
            <boxGeometry args={[sizeX, sizeY, sizeZ]} />
            <meshStandardMaterial color={color} />
          </mesh>
        );
      });
    });
    
    return structureElements;
  }, [chunks]);

  return (
    <group>
      {terrainMeshes}
      {vegetation}
      {structures}
    </group>
  );
};

export default Terrain; 