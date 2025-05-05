import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, Quaternion, Matrix4, Box3Helper, Box3 } from 'three';
import { AssetManager, RailwayAssetIntegration } from './AssetManager';
import { useMetaverseStore } from '../../stores/metaverseStore';
import { Text } from '@react-three/drei';

// Types for our railway world
interface TrainModel {
  id: string;
  type: string;
  position: Vector3;
  rotation: number;
  speed: number;
  nextStation: string;
  status: 'moving' | 'stopped' | 'loading' | 'maintenance';
  passengers: number;
  model: any;
}

interface StationModel {
  id: string;
  name: string;
  type: string;
  position: Vector3;
  rotation: number;
  platforms: number;
  features: string[];
  connectedStations: string[];
  model: any;
}

interface TrackSection {
  id: string;
  startPoint: Vector3;
  endPoint: Vector3;
  type: string;
  model: any;
}

// Railway world component
const RailwayWorld: React.FC = () => {
  const assetManager = useRef<AssetManager>(AssetManager.getInstance());
  const railwayAssets = useRef<RailwayAssetIntegration>(new RailwayAssetIntegration());
  const { camera } = useThree();
  const { playerPosition, worldChunks } = useMetaverseStore();
  
  // State for railway objects
  const [trains, setTrains] = useState<TrainModel[]>([]);
  const [stations, setStations] = useState<StationModel[]>([]);
  const [tracks, setTracks] = useState<TrackSection[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [useFallbackAssets, setUseFallbackAssets] = useState<boolean>(false);
  
  // Setup railway assets when component mounts
  useEffect(() => {
    const initializeRailwayWorld = async () => {
      console.log('Initializing Railway World...');
      setIsLoading(true);
      setLoadingError(null);
      
      try {
        // Try preloading essential assets first
        await assetManager.current.preloadEssentialAssets();
        
        // First attempt to load models with normal flow
        const stationModels = await loadStationModels();
        
        // Check if any stations were loaded - if none, use fallbacks
        if (stationModels.length === 0 || stationModels.every(station => station.model === null)) {
          console.warn('No station models loaded successfully. Using fallback assets.');
          setUseFallbackAssets(true);
          setStations(generateFallbackStations());
        } else {
          setStations(stationModels);
        }
        
        // Try to load trains
        const trainModels = await loadTrainModels();
        if (trainModels.length === 0 || trainModels.every(train => train.model === null)) {
          console.warn('No train models loaded successfully. Using fallback trains.');
          setTrains(generateFallbackTrains());
        } else {
          setTrains(trainModels);
        }
        
        // Try to load tracks
        const trackSections = await loadTrackSections();
        if (trackSections.length === 0 || trackSections.every(track => track.model === null)) {
          console.warn('No track models loaded successfully. Using fallback tracks.');
          setTracks(generateFallbackTracks());
        } else {
          setTracks(trackSections);
        }
        
        setIsLoading(false);
        console.log('Railway World initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Railway World:', error);
        setLoadingError("Failed to load railway assets. Using fallback objects.");
        setUseFallbackAssets(true);
        
        // Set minimal fallback objects instead of showing nothing
        setStations(generateFallbackStations());
        setTrains(generateFallbackTrains());
        setTracks(generateFallbackTracks());
        
        setIsLoading(false);
      }
    };
    
    initializeRailwayWorld();
    
    // Cleanup function
    return () => {
      // Unload non-priority assets when component unmounts
      const activeAssets = [
        ...trains.map(train => `/assets/models/trains/${train.type}.glb`),
        ...stations.map(station => `/assets/models/stations/${station.type}.glb`)
      ];
      
      assetManager.current.unloadUnusedAssets(activeAssets);
    };
  }, []);
  
  // Update trains and camera-dependent LOD levels each frame
  useFrame(({ clock }) => {
    if (isLoading) return;
    
    const time = clock.getElapsedTime();
    
    // Update train positions based on their speed
    setTrains(prevTrains => 
      prevTrains.map(train => {
        if (train.status === 'moving') {
          // Simple circular movement for demo
          const radius = 100;
          const newX = Math.cos(time * 0.1 * train.speed) * radius;
          const newZ = Math.sin(time * 0.1 * train.speed) * radius;
          
          return {
            ...train,
            position: new Vector3(newX, 0, newZ),
            rotation: Math.atan2(newZ, newX) + Math.PI / 2
          };
        }
        return train;
      })
    );
  });
  
  // Generate fallback stations
  const generateFallbackStations = (): StationModel[] => {
    return [
      {
        id: 'station1',
        name: 'Central Station',
        type: 'MainTerminals',
        position: new Vector3(0, 0, 0),
        rotation: 0,
        platforms: 10,
        features: ['Shopping Mall', 'Food Court', 'Information Center'],
        connectedStations: ['station2', 'station3'],
        model: null
      },
      {
        id: 'station2',
        name: 'Harbor Station',
        type: 'HistoricalTerminal',
        position: new Vector3(200, 0, 200),
        rotation: Math.PI / 4,
        platforms: 5,
        features: ['Museum', 'Cafe', 'Viewing Platform'],
        connectedStations: ['station1'],
        model: null
      }
    ];
  };
  
  // Generate fallback trains
  const generateFallbackTrains = (): TrainModel[] => {
    return [
      {
        id: 'train1',
        type: 'electric_passenger',
        position: new Vector3(50, 0, 50),
        rotation: 0,
        speed: 1.0,
        nextStation: 'station2',
        status: 'moving' as const,
        passengers: 120,
        model: null
      },
      {
        id: 'train2',
        type: 'steam_historical',
        position: new Vector3(-50, 0, -50),
        rotation: Math.PI,
        speed: 0.7,
        nextStation: 'station1',
        status: 'moving' as const,
        passengers: 80,
        model: null
      }
    ];
  };
  
  // Generate fallback tracks
  const generateFallbackTracks = (): TrackSection[] => {
    return [
      {
        id: 'track1',
        startPoint: new Vector3(0, 0, 0),
        endPoint: new Vector3(200, 0, 200),
        type: 'standard',
        model: null
      },
      {
        id: 'track2',
        startPoint: new Vector3(0, 0, 0),
        endPoint: new Vector3(-200, 0, 200),
        type: 'standard',
        model: null
      }
    ];
  };
  
  // Load station models helper function
  const loadStationModels = async (): Promise<StationModel[]> => {
    // Sample station data
    const stationData = [
      {
        id: 'station1',
        name: 'Central Station',
        type: 'MainTerminals',
        position: new Vector3(0, 0, 0),
        rotation: 0,
        platforms: 10,
        features: ['Shopping Mall', 'Food Court', 'Information Center'],
        connectedStations: ['station2', 'station3']
      },
      {
        id: 'station2',
        name: 'Harbor Station',
        type: 'HistoricalTerminal',
        position: new Vector3(200, 0, 200),
        rotation: Math.PI / 4,
        platforms: 5,
        features: ['Museum', 'Cafe', 'Viewing Platform'],
        connectedStations: ['station1']
      },
      {
        id: 'station3',
        name: 'Industrial Hub',
        type: 'CargoTerminal',
        position: new Vector3(-200, 0, 200),
        rotation: -Math.PI / 4,
        platforms: 8,
        features: ['Warehouse', 'Logistics Center', 'Maintenance Depot'],
        connectedStations: ['station1']
      }
    ];
    
    // Load each station model
    const stationsWithModels = await Promise.all(
      stationData.map(async station => {
        try {
          const model = await railwayAssets.current.loadStationModel(station.type);
          return { ...station, model };
        } catch (error) {
          console.error(`Failed to load station model for ${station.name}:`, error);
          return { ...station, model: null };
        }
      })
    );
    
    return stationsWithModels;
  };
  
  // Load train models helper function
  const loadTrainModels = async (): Promise<TrainModel[]> => {
    // Sample train data
    const trainData = [
      {
        id: 'train1',
        type: 'electric_passenger',
        position: new Vector3(50, 0, 50),
        rotation: 0,
        speed: 1.0,
        nextStation: 'station2',
        status: 'moving' as const,
        passengers: 120
      },
      {
        id: 'train2',
        type: 'steam_historical',
        position: new Vector3(-50, 0, -50),
        rotation: Math.PI,
        speed: 0.7,
        nextStation: 'station1',
        status: 'moving' as const,
        passengers: 80
      },
      {
        id: 'train3',
        type: 'diesel_freight',
        position: new Vector3(-100, 0, 100),
        rotation: Math.PI / 2,
        speed: 0.5,
        nextStation: 'station3',
        status: 'stopped' as const,
        passengers: 0
      }
    ];
    
    // Load each train model with LOD level 0 (highest detail)
    const trainsWithModels = await Promise.all(
      trainData.map(async train => {
        try {
          const model = await railwayAssets.current.loadTrainModel(train.type, 0);
          return { ...train, model };
        } catch (error) {
          console.error(`Failed to load train model for ${train.type}:`, error);
          return { ...train, model: null };
        }
      })
    );
    
    return trainsWithModels;
  };
  
  // Load track sections helper function
  const loadTrackSections = async (): Promise<TrackSection[]> => {
    // Sample track data
    const trackData = [
      {
        id: 'track1',
        startPoint: new Vector3(0, 0, 0),
        endPoint: new Vector3(200, 0, 200),
        type: 'standard'
      },
      {
        id: 'track2',
        startPoint: new Vector3(0, 0, 0),
        endPoint: new Vector3(-200, 0, 200),
        type: 'standard'
      },
      {
        id: 'track3',
        startPoint: new Vector3(200, 0, 200),
        endPoint: new Vector3(-200, 0, 200),
        type: 'bridge'
      }
    ];
    
    // Load each track section model
    const tracksWithModels = await Promise.all(
      trackData.map(async track => {
        try {
          const model = await railwayAssets.current.loadTrackSection(track.type);
          return { ...track, model };
        } catch (error) {
          console.error(`Failed to load track model for ${track.type}:`, error);
          return { ...track, model: null };
        }
      })
    );
    
    return tracksWithModels;
  };
  
  // Create a placeholder model for missing assets (for development)
  const createPlaceholder = (type: string, scale: Vector3, name: string = '') => (
    <group>
      <mesh>
        <boxGeometry args={[scale.x, scale.y, scale.z]} />
        <meshStandardMaterial color="#4a72b0" wireframe={false} />
      </mesh>
      <Text
        position={[0, scale.y + 1, 0]}
        fontSize={2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {name || type}
      </Text>
    </group>
  );
  
  // Helper for matrix transformation
  const createTransformMatrix = (position: Vector3, rotationY: number): Matrix4 => {
    const matrix = new Matrix4();
    const quaternion = new Quaternion();
    quaternion.setFromAxisAngle(new Vector3(0, 1, 0), rotationY);
    matrix.compose(position, quaternion, new Vector3(1, 1, 1));
    return matrix;
  };
  
  if (isLoading) {
    return (
      <group>
        <mesh position={[0, 10, 0]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="blue" />
        </mesh>
        <Text
          position={[0, 12, 0]}
          fontSize={2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          Loading Metaverse...
        </Text>
      </group>
    );
  }
  
  return (
    <group>
      {/* Display error message if there was a problem loading assets */}
      {loadingError && (
        <group position={[0, 20, 0]}>
          <Text
            position={[0, 0, 0]}
            fontSize={5}
            color="#ff0000"
            anchorX="center"
            anchorY="middle"
          >
            {loadingError}
          </Text>
        </group>
      )}
      
      {/* Basic environment to ensure we always show something */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="#3a7c5f" />
      </mesh>
      
      {/* Add some basic structures that don't require assets */}
      <group>
        <mesh position={[0, 5, 0]} castShadow receiveShadow>
          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color="#406090" />
        </mesh>
        
        <mesh position={[20, 2, 20]} castShadow receiveShadow>
          <cylinderGeometry args={[5, 5, 4, 32]} />
          <meshStandardMaterial color="#904060" />
        </mesh>
        
        <mesh position={[-20, 2, -20]} castShadow receiveShadow>
          <torusGeometry args={[5, 1, 16, 32]} />
          <meshStandardMaterial color="#609040" />
        </mesh>
        
        {/* Добавим еще несколько базовых объектов для более интересного мира */}
        <mesh position={[0, 1, -30]} castShadow receiveShadow>
          <dodecahedronGeometry args={[4, 0]} />
          <meshStandardMaterial color="#7040a0" />
        </mesh>
        
        <mesh position={[-40, 3, 15]} castShadow receiveShadow>
          <coneGeometry args={[3, 8, 16]} />
          <meshStandardMaterial color="#a04060" />
        </mesh>
        
        <mesh position={[40, 0.5, -15]} castShadow receiveShadow>
          <sphereGeometry args={[4, 32, 32]} />
          <meshStandardMaterial color="#60a040" emissive="#60a040" emissiveIntensity={0.2} />
        </mesh>
        
        {/* Добавим дороги и пути */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
          <planeGeometry args={[10, 100]} />
          <meshStandardMaterial color="#555555" />
        </mesh>
        
        <mesh rotation={[-Math.PI / 2, Math.PI / 2, 0]} position={[0, 0.05, 0]}>
          <planeGeometry args={[10, 100]} />
          <meshStandardMaterial color="#555555" />
        </mesh>
      </group>
      
      {/* Render Stations */}
      {stations.map(station => (
        <group key={station.id} position={station.position} rotation={[0, station.rotation, 0]}>
          {station.model ? (
            <primitive object={station.model.scene.clone()} />
          ) : (
            createPlaceholder(`Station`, new Vector3(20, 10, 20), station.name)
          )}
        </group>
      ))}
      
      {/* Render Trains */}
      {trains.map(train => (
        <group
          key={train.id}
          position={train.position}
          rotation={[0, train.rotation, 0]}
        >
          {train.model ? (
            <primitive object={train.model.scene.clone()} />
          ) : (
            createPlaceholder(`Train`, new Vector3(10, 3, 20), train.type)
          )}
        </group>
      ))}
      
      {/* Render Tracks */}
      {tracks.map(track => {
        // Calculate track orientation and scale
        const direction = new Vector3().subVectors(track.endPoint, track.startPoint);
        const length = direction.length();
        const center = new Vector3().addVectors(track.startPoint, track.endPoint).multiplyScalar(0.5);
        const angle = Math.atan2(direction.x, direction.z);
        
        return (
          <group
            key={track.id}
            position={center}
            rotation={[0, angle, 0]}
          >
            {track.model ? (
              <primitive 
                object={track.model.scene.clone()} 
                scale={[1, 1, length / 10]} // Assuming track model is 10 units long
              />
            ) : (
              <mesh receiveShadow>
                <boxGeometry args={[2, 0.1, length]} />
                <meshStandardMaterial color="gray" />
              </mesh>
            )}
          </group>
        );
      })}
      
      {/* Ambient Environment - lighting is crucial for visibility */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[50, 50, 25]} intensity={1.5} castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      <hemisphereLight args={['#b1e1ff', '#333333', 0.8]} />
    </group>
  );
};

export default RailwayWorld; 