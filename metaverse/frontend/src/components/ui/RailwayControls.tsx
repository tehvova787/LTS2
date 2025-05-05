import React, { useState, useEffect, useRef } from 'react';
import { Vector3 } from 'three';

// Types for railway controls
interface Train {
  id: string;
  name: string;
  type: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  speed: number;
  max_speed: number;
  status: string;
  next_station_id?: string;
  current_station_id?: string;
}

interface StationFeatures {
  platforms: number;
  has_retail: boolean;
  has_food_services: boolean;
  connected_stations?: string[];
}

interface Station {
  id: string;
  name: string;
  type: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  features: StationFeatures;
}

interface Signal {
  id: string;
  status: string;
  controlled_track_id: string;
}

interface RailwayControlsProps {
  playerPosition: { x: number, y: number, z: number };
}

const RailwayControls: React.FC<RailwayControlsProps> = ({ playerPosition }) => {
  const [trains, setTrains] = useState<Train[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [signals, setSignals] = useState<Signal[]>([]);
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [nearbyElements, setNearbyElements] = useState<{
    trains: Train[];
    stations: Station[];
    signals: Signal[];
  }>({
    trains: [],
    stations: [],
    signals: []
  });
  
  // Use a ref to store the websocket to fix null issues
  const websocketRef = useRef<WebSocket | null>(null);

  // Fetch all railway data on mount
  useEffect(() => {
    const fetchRailwayData = async () => {
      try {
        // Fetch trains
        const trainsResponse = await fetch('/api/railway/trains');
        const trainsData = await trainsResponse.json();
        setTrains(trainsData.trains);

        // Fetch stations
        const stationsResponse = await fetch('/api/railway/stations');
        const stationsData = await stationsResponse.json();
        setStations(stationsData.stations);

        // Set up WebSocket for real-time updates
        setupWebSocket();
      } catch (error) {
        console.error('Error fetching railway data:', error);
      }
    };

    fetchRailwayData();

    // Cleanup WebSocket on unmount
    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, []);

  // WebSocket for real-time updates
  const setupWebSocket = () => {
    websocketRef.current = new WebSocket(`ws://${window.location.hostname}:8000/ws/railway`);

    if (websocketRef.current) {
      websocketRef.current.onopen = () => {
        console.log('Connected to railway system');
        // Send initial position
        if (websocketRef.current) {
          websocketRef.current.send(JSON.stringify({
            type: 'position_update',
            data: {
              x: playerPosition.x,
              y: playerPosition.y,
              z: playerPosition.z,
              view_distance: 500
            }
          }));
        }
      };

      websocketRef.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        
        if (message.type === 'railway_update') {
          // Update trains and signals in real-time
          if (message.data.trains) {
            setTrains(message.data.trains);
          }
          
          if (message.data.signals) {
            setSignals(message.data.signals);
          }
          
          // Update nearby elements
          const nearby = {
            trains: message.data.trains || [],
            stations: message.data.stations || [],
            signals: message.data.signals || []
          };
          
          setNearbyElements(nearby);
        }
        
        if (message.type === 'train_update' && message.data) {
          // Update a specific train
          const updatedTrain = message.data;
          setTrains(prevTrains => 
            prevTrains.map(train => 
              train.id === updatedTrain.id ? updatedTrain : train
            )
          );
        }
        
        if (message.type === 'error') {
          console.error('Railway system error:', message.data.message);
        }
      };

      websocketRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      websocketRef.current.onclose = () => {
        console.log('Disconnected from railway system');
        // Try to reconnect after a delay
        setTimeout(setupWebSocket, 5000);
      };
    }
  };

  // Update player position in WebSocket
  useEffect(() => {
    if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
      websocketRef.current.send(JSON.stringify({
        type: 'position_update',
        data: {
          x: playerPosition.x,
          y: playerPosition.y,
          z: playerPosition.z,
          view_distance: 500
        }
      }));
    }
  }, [playerPosition]);

  // Handle train selection
  const handleTrainSelect = (trainId: string) => {
    setSelectedTrain(trainId);
    setSelectedStation(null); // Clear station selection
  };

  // Handle station selection
  const handleStationSelect = (stationId: string) => {
    setSelectedStation(stationId);
    setSelectedTrain(null); // Clear train selection
  };

  // Control train movement
  const controlTrain = async (action: string, trainId: string, targetStationId?: string, speed?: number) => {
    if (!websocketRef.current || websocketRef.current.readyState !== WebSocket.OPEN) {
      console.error('WebSocket not connected');
      return;
    }

    // Send command through WebSocket
    websocketRef.current.send(JSON.stringify({
      type: 'train_control',
      data: {
        train_id: trainId,
        action,
        target_station_id: targetStationId,
        speed
      }
    }));
  };

  // Control signal
  const controlSignal = async (signalId: string, status: string) => {
    try {
      const response = await fetch('/api/railway/signal-control', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          signal_id: signalId,
          status
        })
      });

      const data = await response.json();
      console.log('Signal control response:', data);
    } catch (error) {
      console.error('Error controlling signal:', error);
    }
  };

  // Calculate distance between player and an element
  const calculateDistance = (elementPos: { x: number, y: number, z: number }) => {
    const dx = playerPosition.x - elementPos.x;
    const dy = playerPosition.y - elementPos.y;
    const dz = playerPosition.z - elementPos.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  };

  // Get the currently selected train
  const getSelectedTrain = () => {
    if (!selectedTrain) return null;
    return trains.find(train => train.id === selectedTrain) || null;
  };

  // Get the currently selected station
  const getSelectedStation = () => {
    if (!selectedStation) return null;
    return stations.find(station => station.id === selectedStation) || null;
  };

  // Train detail panel
  const renderTrainDetails = () => {
    const train = getSelectedTrain();
    if (!train) return null;

    return (
      <div className="railway-detail-panel">
        <h3>{train.name}</h3>
        <p>Type: {train.type}</p>
        <p>Status: {train.status}</p>
        <p>Speed: {train.speed.toFixed(1)} km/h</p>
        <p>Max Speed: {train.max_speed} km/h</p>
        
        {train.current_station_id && (
          <p>Current Station: {stations.find(s => s.id === train.current_station_id)?.name || 'Unknown'}</p>
        )}
        
        {train.next_station_id && (
          <p>Destination: {stations.find(s => s.id === train.next_station_id)?.name || 'Unknown'}</p>
        )}
        
        <div className="railway-controls">
          <button 
            onClick={() => controlTrain('accelerate', train.id)}
            disabled={train.speed >= train.max_speed}
          >
            Accelerate
          </button>
          
          <button 
            onClick={() => controlTrain('decelerate', train.id)}
            disabled={train.speed <= 0}
          >
            Decelerate
          </button>
          
          <button 
            onClick={() => controlTrain('stop', train.id)}
            disabled={train.status === 'stopped'}
          >
            Emergency Stop
          </button>
        </div>
        
        {train.status === 'stopped' && (
          <div className="start-journey">
            <h4>Start Journey To:</h4>
            <div className="station-list">
              {stations.map(station => (
                <button
                  key={station.id}
                  onClick={() => controlTrain('start', train.id, station.id)}
                  disabled={station.id === train.current_station_id}
                >
                  {station.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Station detail panel
  const renderStationDetails = () => {
    const station = getSelectedStation();
    if (!station) return null;

    // Find trains at this station
    const trainsAtStation = trains.filter(train => 
      train.current_station_id === station.id
    );

    return (
      <div className="railway-detail-panel">
        <h3>{station.name}</h3>
        <p>Type: {station.type}</p>
        <p>Platforms: {station.features.platforms}</p>
        
        {station.features.has_retail && <p>Has Retail: Yes</p>}
        {station.features.has_food_services && <p>Has Food Services: Yes</p>}
        
        <h4>Trains at Station:</h4>
        {trainsAtStation.length > 0 ? (
          <ul className="station-trains">
            {trainsAtStation.map(train => (
              <li key={train.id} onClick={() => handleTrainSelect(train.id)}>
                {train.name} ({train.type})
              </li>
            ))}
          </ul>
        ) : (
          <p>No trains currently at this station</p>
        )}
        
        <h4>Connected Stations:</h4>
        <div className="connected-stations">
          {station.features.connected_stations?.map((connectedId: string) => {
            const connectedStation = stations.find(s => s.id === connectedId);
            return connectedStation ? (
              <button
                key={connectedId}
                onClick={() => handleStationSelect(connectedId)}
              >
                {connectedStation.name}
              </button>
            ) : null;
          })}
        </div>
      </div>
    );
  };

  // Nearby elements panel
  const renderNearbyElements = () => {
    // Sort by distance
    const sortedTrains = [...nearbyElements.trains]
      .map(train => ({
        ...train,
        distance: calculateDistance(train.position)
      }))
      .sort((a, b) => a.distance - b.distance);

    const sortedStations = [...nearbyElements.stations]
      .map(station => ({
        ...station,
        distance: calculateDistance(station.position)
      }))
      .sort((a, b) => a.distance - b.distance);

    // Only show nearest elements
    const nearestTrains = sortedTrains.slice(0, 3);
    const nearestStations = sortedStations.slice(0, 3);

    return (
      <div className="nearby-elements">
        <h3>Nearby Trains</h3>
        {nearestTrains.length > 0 ? (
          <ul>
            {nearestTrains.map(train => (
              <li 
                key={train.id}
                onClick={() => handleTrainSelect(train.id)}
                className={selectedTrain === train.id ? 'selected' : ''}
              >
                {train.name} ({Math.round(train.distance)}m)
              </li>
            ))}
          </ul>
        ) : (
          <p>No trains nearby</p>
        )}
        
        <h3>Nearby Stations</h3>
        {nearestStations.length > 0 ? (
          <ul>
            {nearestStations.map(station => (
              <li 
                key={station.id}
                onClick={() => handleStationSelect(station.id)}
                className={selectedStation === station.id ? 'selected' : ''}
              >
                {station.name} ({Math.round(station.distance)}m)
              </li>
            ))}
          </ul>
        ) : (
          <p>No stations nearby</p>
        )}
      </div>
    );
  };

  return (
    <div className="railway-controls-container">
      <div className="railway-sidebar">
        {renderNearbyElements()}
      </div>
      
      <div className="railway-main-panel">
        {selectedTrain ? renderTrainDetails() : 
         selectedStation ? renderStationDetails() : 
         <div className="railway-welcome">
           <h2>Railway Metaverse Control Panel</h2>
           <p>Select a train or station from the sidebar to interact with it.</p>
         </div>
        }
      </div>
      
      <style>
        {`
        .railway-controls-container {
          display: flex;
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: rgba(0, 0, 0, 0.7);
          border-radius: 8px;
          color: white;
          max-width: 800px;
          max-height: 400px;
          overflow: hidden;
        }
        
        .railway-sidebar {
          width: 200px;
          padding: 15px;
          border-right: 1px solid rgba(255, 255, 255, 0.2);
          overflow-y: auto;
        }
        
        .railway-main-panel {
          flex: 1;
          padding: 15px;
          overflow-y: auto;
        }
        
        .railway-detail-panel h3 {
          margin-top: 0;
          color: #4a9df8;
        }
        
        .railway-controls {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }
        
        button {
          background: #2a547c;
          border: none;
          color: white;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        button:hover {
          background: #3a6ca0;
        }
        
        button:disabled {
          background: #2a3a4a;
          color: #aaa;
          cursor: not-allowed;
        }
        
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        li {
          padding: 8px 10px;
          margin-bottom: 5px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        li:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        li.selected {
          background: rgba(74, 157, 248, 0.3);
        }
        
        .station-list, .connected-stations {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 10px;
        }
        
        .station-trains li {
          background: rgba(50, 50, 50, 0.5);
        }
        `}
      </style>
    </div>
  );
};

export default RailwayControls; 