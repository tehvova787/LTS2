# AI-Powered Metaverse

This project implements a mini-metaverse with AI-powered NPCs, procedural world generation, and real-time interactions.

## Features

- **Procedural World Generation**: Dynamic terrain created using noise algorithms
- **AI-Driven NPCs**: NPCs with personalities, memory, and behavior systems
- **Real-Time Physics**: Collision detection and physics simulation
- **Multiplayer Interaction**: Connect and interact with other users
- **Avatar Customization**: Personalize your in-world representation

## Architecture

The project is built with the following components:

1. **Core Metaverse System**: Central coordination of world state
2. **AI System**: NPC behavior, dialogue, and memory management
3. **Physics Engine**: Handles collisions and physical simulations
4. **World Engine**: Procedural generation and world state management
5. **Network Manager**: Communication between server and clients

## Technologies Used

- **Backend**:
  - Python with FastAPI for the API server
  - WebSockets for real-time communication
  - SQLite for data persistence
  - TensorFlow for AI systems

- **Frontend** (to be implemented):
  - Three.js for 3D rendering
  - React for UI components

## Getting Started

### Prerequisites

- Python 3.8+
- Pip package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ai-metaverse.git
cd ai-metaverse
```

1. Set up the environment and install dependencies:

```bash
python run.py --setup
```

### Running the Server

Start the metaverse server:

```bash
python run.py
```

The server will be available at `http://localhost:8000`.

## API Endpoints

- `GET /api/status` - Get server status
- `GET /api/user/{user_id}` - Get user information
- `GET /api/npc/{npc_id}` - Get NPC information
- `GET /api/npcs/nearby` - Get NPCs near a position
- `GET /api/world/chunks` - Get world chunks around a position
- `GET /api/world/objects` - Get objects near a position

## WebSocket Interface

Connect to `/ws` to establish a real-time connection with the metaverse. The WebSocket accepts the following message types:

- `movement`: Update user position
- `interaction`: Interact with objects or NPCs
- `chat`: Send chat messages

## Project Structure

```javascript
metaverse/
├── backend/
│   ├── app/
│   │   ├── ai/           # AI system for NPCs
│   │   ├── core/         # Core metaverse components
│   │   ├── database/     # Database interfaces
│   │   ├── models/       # Data models
│   │   └── main.py       # Application entry point
├── frontend/             # Frontend code (to be implemented)
├── run.py                # Runner script
└── requirements.txt      # Python dependencies
```

## Future Enhancements

1. **Quest System**: Implement missions and objectives
1. **Economy System**: Virtual currency and trading
1. **Weather Effects**: Dynamic weather patterns
1. **Day/Night Cycle**: Time-based lighting changes
1. **Enhanced AI**: More sophisticated NPC behaviors and interactions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

This license also applies to the Railway Extensions.

## Railway Extensions Features

A comprehensive virtual world focused on railway systems, trains, and infrastructure. This metaverse provides an immersive experience where users can explore train stations, interact with trains, and experience the railway network in a virtual environment.

### Railway World

- Realistic 3D environment with stations, trains, and tracks
- Level of Detail (LOD) system for optimal performance
- Asset management system with caching for faster loading
- Railway physics simulation for realistic train movement

### Train System

- Multiple types of trains (passenger, freight, historical)
- Train movement with realistic physics
- Train scheduling and routing
- Interactive controls for train operation

### Station System

- Different types of stations (terminals, historical, freight)
- Station features (retail, services, platforms)
- Passenger simulation
- Realistic station design with historical accuracy

### Track and Signaling

- Track network connecting stations
- Signal system with operational logic
- Track properties (electrified, gauge, condition)
- Support for various track geometries

### User Interface

- Train and station information panels
- Interactive train controls
- Nearby railway elements detection
- Railway management system

## Railway Setup

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+ for backend

### Installation Steps

1. Clone the repository and navigate to the metaverse directory:

```bash
cd metaverse
```

1. Install frontend dependencies:

```bash
cd frontend
npm install
```

1. Install backend dependencies:

```bash
cd ../backend
pip install -r ../requirements.txt
```

### Running the Development Environment

1. Start the backend server:

```bash
cd backend
python -m uvicorn app.main:app --reload
```

1. Start the frontend development server:

```bash
cd frontend
npm run dev
```

1. Access the application at `http://localhost:3000`

## System Architecture

### Frontend Components

- React with TypeScript
- Three.js/React Three Fiber for 3D rendering
- Zustand for state management
- WebSocket for real-time communication

### Backend Components

- FastAPI for REST endpoints and WebSocket support
- Pydantic for data validation
- SQLite database for persistent storage
- Python for simulation logic

## Railway Components

### Asset Management

The asset management system handles loading, caching, and optimizing 3D models and textures. It implements:

- Level of Detail (LOD) for optimizing model complexity based on distance
- Asset caching for improved performance
- Priority-based loading for essential assets
- Automatic memory management

### Railway Physics

The railway physics system simulates realistic train movement with:

- Acceleration and braking
- Track geometry effects
- Speed limits based on track type
- Signal system integration

### Station Logic

Stations manage:

- Train arrivals and departures
- Passenger boarding and alighting
- Service scheduling
- Station features and amenities

## Contributing to Railway Extensions

Contributions are welcome! Please feel free to submit a Pull Request.
