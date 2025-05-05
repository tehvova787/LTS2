from typing import List, Dict, Any, Optional, Union
from datetime import datetime
from pydantic import BaseModel, Field
import random
import math
import time

# Base models for railway components
class Position(BaseModel):
    x: float = 0.0
    y: float = 0.0
    z: float = 0.0

class TrainAppearance(BaseModel):
    model_type: str
    livery: str
    condition: str = "good"
    custom_features: List[str] = []

class StationFeatures(BaseModel):
    platforms: int
    has_roof: bool = True
    has_waiting_area: bool = True
    has_ticket_office: bool = True
    has_information_desk: bool = True
    has_retail: bool = False
    has_food_services: bool = False
    accessibility_features: List[str] = []
    historical_significance: Optional[str] = None

class TrackProperties(BaseModel):
    gauge: float = 1435.0  # Standard gauge in mm
    electrified: bool = False
    max_speed: float = 160.0  # km/h
    condition: str = "good"
    last_maintenance: Optional[datetime] = None

# Main railway components
class Train(BaseModel):
    id: str
    name: str
    type: str  # passenger, freight, maintenance, etc.
    position: Position
    rotation: float = 0.0
    speed: float = 0.0
    max_speed: float = 120.0  # km/h
    acceleration: float = 0.8  # m/s²
    braking: float = 1.2  # m/s²
    length: float  # meters
    appearance: TrainAppearance
    current_station_id: Optional[str] = None
    next_station_id: Optional[str] = None
    status: str = "stopped"  # moving, stopped, loading, maintenance
    passengers: int = 0
    max_passengers: int = 100
    last_updated: float = Field(default_factory=time.time)
    
    def update_position(self, delta_time: float, tracks: List['Track']) -> None:
        """Update train position based on speed and time delta"""
        if self.status != "moving":
            return
        
        # Simple movement update
        distance = self.speed * delta_time
        
        # Movement direction based on rotation
        dx = math.sin(self.rotation) * distance
        dz = math.cos(self.rotation) * distance
        
        self.position.x += dx
        self.position.z += dz
        self.last_updated = time.time()
    
    def start_journey(self, destination_id: str) -> None:
        """Start a journey to the specified station"""
        self.next_station_id = destination_id
        self.status = "moving"
    
    def arrive_at_station(self, station_id: str) -> None:
        """Handle train arrival at a station"""
        self.current_station_id = station_id
        self.next_station_id = None
        self.status = "stopped"
        self.speed = 0.0

class Station(BaseModel):
    id: str
    name: str
    type: str  # terminal, local, freight, etc.
    position: Position
    rotation: float = 0.0
    features: StationFeatures
    connected_stations: List[str] = []
    active_trains: List[str] = []
    passenger_capacity: int = 500
    current_passengers: int = 0
    
    def add_train(self, train_id: str) -> None:
        """Register a train arrival at this station"""
        if train_id not in self.active_trains:
            self.active_trains.append(train_id)
    
    def remove_train(self, train_id: str) -> None:
        """Register a train departure from this station"""
        if train_id in self.active_trains:
            self.active_trains.remove(train_id)
    
    def update_passenger_count(self, change: int) -> int:
        """Update passenger count and return the new total"""
        self.current_passengers = max(0, min(
            self.passenger_capacity, 
            self.current_passengers + change
        ))
        return self.current_passengers

class Track(BaseModel):
    id: str
    start_station_id: str
    end_station_id: str
    start_position: Position
    end_position: Position
    length: float  # meters
    properties: TrackProperties
    active_trains: List[str] = []
    
    def add_train(self, train_id: str) -> None:
        """Register a train on this track"""
        if train_id not in self.active_trains:
            self.active_trains.append(train_id)
    
    def remove_train(self, train_id: str) -> None:
        """Remove a train from this track"""
        if train_id in self.active_trains:
            self.active_trains.remove(train_id)
    
    def is_occupied(self) -> bool:
        """Check if track has any active trains"""
        return len(self.active_trains) > 0

class RailwaySignal(BaseModel):
    id: str
    position: Position
    status: str = "green"  # green, yellow, red
    controlled_track_id: str
    
    def set_status(self, new_status: str) -> None:
        """Update signal status"""
        valid_statuses = ["green", "yellow", "red"]
        if new_status not in valid_statuses:
            raise ValueError(f"Invalid status: {new_status}. Must be one of {valid_statuses}")
        self.status = new_status

# Railway world chunk for client synchronization
class RailwayWorldChunk(BaseModel):
    position: Position
    size: float
    trains: List[Train] = []
    stations: List[Station] = []
    tracks: List[Track] = []
    signals: List[RailwaySignal] = []

# Railway system manager
class RailwaySystem:
    def __init__(self):
        self.trains: Dict[str, Train] = {}
        self.stations: Dict[str, Station] = {}
        self.tracks: Dict[str, Track] = {}
        self.signals: Dict[str, RailwaySignal] = {}
        self.last_update_time = time.time()
    
    def add_train(self, train: Train) -> None:
        """Add a train to the system"""
        self.trains[train.id] = train
    
    def add_station(self, station: Station) -> None:
        """Add a station to the system"""
        self.stations[station.id] = station
    
    def add_track(self, track: Track) -> None:
        """Add a track to the system"""
        self.tracks[track.id] = track
    
    def add_signal(self, signal: RailwaySignal) -> None:
        """Add a signal to the system"""
        self.signals[signal.id] = signal
    
    def get_train(self, train_id: str) -> Optional[Train]:
        """Get a train by ID"""
        return self.trains.get(train_id)
    
    def get_station(self, station_id: str) -> Optional[Station]:
        """Get a station by ID"""
        return self.stations.get(station_id)
    
    def get_track(self, track_id: str) -> Optional[Track]:
        """Get a track by ID"""
        return self.tracks.get(track_id)
    
    def get_signal(self, signal_id: str) -> Optional[RailwaySignal]:
        """Get a signal by ID"""
        return self.signals.get(signal_id)
    
    def update(self) -> None:
        """Update all railway system components"""
        current_time = time.time()
        delta_time = current_time - self.last_update_time
        
        # Update trains
        for train_id, train in self.trains.items():
            train.update_position(delta_time, list(self.tracks.values()))
            
            # Check if train has arrived at destination
            if train.status == "moving" and train.next_station_id:
                next_station = self.stations.get(train.next_station_id)
                if next_station:
                    # Simple distance check for arrival
                    dx = train.position.x - next_station.position.x
                    dz = train.position.z - next_station.position.z
                    distance = math.sqrt(dx*dx + dz*dz)
                    
                    if distance < 10:  # Arbitrary arrival threshold
                        train.arrive_at_station(train.next_station_id)
                        next_station.add_train(train_id)
        
        self.last_update_time = current_time
    
    def get_world_chunk(self, position: Position, view_distance: float) -> RailwayWorldChunk:
        """Get all railway components within the specified view distance"""
        chunk = RailwayWorldChunk(
            position=position,
            size=view_distance * 2
        )
        
        for train_id, train in self.trains.items():
            dx = train.position.x - position.x
            dz = train.position.z - position.z
            distance = math.sqrt(dx*dx + dz*dz)
            
            if distance <= view_distance:
                chunk.trains.append(train)
        
        for station_id, station in self.stations.items():
            dx = station.position.x - position.x
            dz = station.position.z - position.z
            distance = math.sqrt(dx*dx + dz*dz)
            
            if distance <= view_distance:
                chunk.stations.append(station)
        
        for track_id, track in self.tracks.items():
            # Check if either endpoint is within view distance
            start_dx = track.start_position.x - position.x
            start_dz = track.start_position.z - position.z
            start_distance = math.sqrt(start_dx*start_dx + start_dz*start_dz)
            
            end_dx = track.end_position.x - position.x
            end_dz = track.end_position.z - position.z
            end_distance = math.sqrt(end_dx*end_dx + end_dz*end_dz)
            
            if start_distance <= view_distance or end_distance <= view_distance:
                chunk.tracks.append(track)
        
        for signal_id, signal in self.signals.items():
            dx = signal.position.x - position.x
            dz = signal.position.z - position.z
            distance = math.sqrt(dx*dx + dz*dz)
            
            if distance <= view_distance:
                chunk.signals.append(signal)
        
        return chunk

    def create_demo_railway_system(self) -> None:
        """Create a demo railway system with sample data"""
        # Create stations
        central_station = Station(
            id="station1",
            name="Central Station",
            type="terminal",
            position=Position(x=0, y=0, z=0),
            rotation=0,
            features=StationFeatures(
                platforms=10,
                has_retail=True,
                has_food_services=True,
                accessibility_features=["elevators", "ramps", "tactile_pavings"]
            ),
            connected_stations=["station2", "station3"]
        )
        
        harbor_station = Station(
            id="station2",
            name="Harbor Station",
            type="historical",
            position=Position(x=200, y=0, z=200),
            rotation=math.pi / 4,
            features=StationFeatures(
                platforms=5,
                historical_significance="Built in 1890, architectural landmark",
                accessibility_features=["ramps"]
            ),
            connected_stations=["station1"]
        )
        
        industrial_hub = Station(
            id="station3",
            name="Industrial Hub",
            type="freight",
            position=Position(x=-200, y=0, z=200),
            rotation=-math.pi / 4,
            features=StationFeatures(
                platforms=8,
                has_waiting_area=False,
                has_ticket_office=False
            ),
            connected_stations=["station1"]
        )
        
        self.add_station(central_station)
        self.add_station(harbor_station)
        self.add_station(industrial_hub)
        
        # Create tracks
        track1 = Track(
            id="track1",
            start_station_id="station1",
            end_station_id="station2",
            start_position=Position(x=0, y=0, z=0),
            end_position=Position(x=200, y=0, z=200),
            length=282.8,  # sqrt(200^2 + 200^2)
            properties=TrackProperties(
                electrified=True,
                max_speed=120.0
            )
        )
        
        track2 = Track(
            id="track2",
            start_station_id="station1",
            end_station_id="station3",
            start_position=Position(x=0, y=0, z=0),
            end_position=Position(x=-200, y=0, z=200),
            length=282.8,
            properties=TrackProperties(
                electrified=False,
                max_speed=80.0
            )
        )
        
        track3 = Track(
            id="track3",
            start_station_id="station2",
            end_station_id="station3",
            start_position=Position(x=200, y=0, z=200),
            end_position=Position(x=-200, y=0, z=200),
            length=400.0,
            properties=TrackProperties(
                electrified=False,
                max_speed=60.0,
                condition="worn"
            )
        )
        
        self.add_track(track1)
        self.add_track(track2)
        self.add_track(track3)
        
        # Create trains
        passenger_train = Train(
            id="train1",
            name="Express 1",
            type="passenger",
            position=Position(x=50, y=0, z=50),
            rotation=0,
            speed=0.0,
            max_speed=120.0,
            length=160.0,
            appearance=TrainAppearance(
                model_type="electric_passenger",
                livery="blue_white"
            ),
            status="stopped",
            passengers=120,
            max_passengers=500
        )
        
        historical_train = Train(
            id="train2",
            name="Heritage Express",
            type="passenger",
            position=Position(x=-50, y=0, z=-50),
            rotation=math.pi,
            speed=0.0,
            max_speed=80.0,
            length=120.0,
            appearance=TrainAppearance(
                model_type="steam_historical",
                livery="black_red",
                custom_features=["brass_fittings", "wooden_interior"]
            ),
            status="stopped",
            passengers=80,
            max_passengers=200
        )
        
        freight_train = Train(
            id="train3",
            name="Cargo 5",
            type="freight",
            position=Position(x=-100, y=0, z=100),
            rotation=math.pi / 2,
            speed=0.0,
            max_speed=60.0,
            length=450.0,
            appearance=TrainAppearance(
                model_type="diesel_freight",
                livery="yellow_black"
            ),
            status="stopped",
            passengers=0,
            max_passengers=0
        )
        
        self.add_train(passenger_train)
        self.add_train(historical_train)
        self.add_train(freight_train)
        
        # Create signals
        self.add_signal(RailwaySignal(
            id="signal1",
            position=Position(x=100, y=5, z=100),
            status="green",
            controlled_track_id="track1"
        ))
        
        self.add_signal(RailwaySignal(
            id="signal2",
            position=Position(x=-100, y=5, z=100),
            status="green",
            controlled_track_id="track2"
        ))
        
        self.add_signal(RailwaySignal(
            id="signal3",
            position=Position(x=0, y=5, z=200),
            status="red",
            controlled_track_id="track3"
        ))

# Create global instance
railway_system = RailwaySystem() 