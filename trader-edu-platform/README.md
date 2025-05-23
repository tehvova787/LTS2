# AI-Powered Trader Education Platform

An advanced educational platform for traders using AI to deliver personalized learning experiences and trading simulations.

## Features

- **AI-Generated Learning Content**: Personalized educational content based on user skill level
- **Real-time Trading Simulator**: Practice trading strategies in a realistic simulated environment
- **Progress Tracking**: Monitor learning progress with detailed analytics
- **AI Strategy Analysis**: Get AI-powered feedback on trading strategies
- **Personalized Recommendations**: Receive custom course recommendations based on your progress

## Tech Stack

### Backend

- Python (FastAPI)
- PostgreSQL
- Redis
- TensorFlow & Transformers (AI models)
- WebSockets for real-time data

### Frontend

- React
- Material-UI
- Chart.js

### Deployment

- Docker
- Docker Compose

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js (for frontend development)
- Python 3.9+ (for backend development)

### Standard Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/trader-edu-platform.git
cd trader-edu-platform
```

2. Start the application using Docker Compose:

```bash
docker-compose up -d
```

The application will be available at:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000](http://localhost:8000)
- API Documentation: [http://localhost:8000/docs](http://localhost:8000/docs)

### Development Setup

#### Backend

```bash
cd backend
pip install -r ../requirements.txt
uvicorn main:app --reload
```

#### Frontend

```bash
cd frontend
npm install
npm start
```

## Project Structure

```bash
trader-edu-platform/
├── backend/
│   ├── api/              # API routes
│   ├── models/           # Database models
│   ├── ai_core/          # AI models and logic
│   ├── database/         # Database connection and migrations
│   └── utils/            # Utility functions
├── frontend/
│   ├── public/           # Static files
│   └── src/
│       ├── components/   # React components
│       ├── pages/        # Page components
│       ├── context/      # React context
│       └── assets/       # Images and styles
└── docker-compose.yml    # Docker configuration
```

## API Documentation

The API documentation is automatically generated using FastAPI's Swagger UI. After starting the backend server, visit:

```bash
http://localhost:8000/docs
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- TensorFlow and Transformers for AI capabilities
- FastAPI for the efficient backend
- React and Material-UI for the responsive frontend  
 