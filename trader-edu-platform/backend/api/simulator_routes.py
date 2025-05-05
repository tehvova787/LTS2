from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from pydantic import BaseModel
from datetime import datetime, timedelta
import numpy as np
import pandas as pd
import json

from models.database import TradeSimulation, User
from ai_core.ai_model import AICore

# Initialize router
router = APIRouter()

# Initialize AI core
ai_core = AICore()

# Pydantic models for request/response
class SimulationCreate(BaseModel):
    user_id: int
    strategy_name: str
    initial_capital: float
    market_conditions: Dict[str, Any]

class SimulationResponse(BaseModel):
    id: int
    user_id: int
    strategy_name: str
    start_date: datetime
    end_date: datetime
    initial_capital: float
    final_capital: float
    profit_loss: float
    created_at: datetime
    
    class Config:
        orm_mode = True

class TradeStrategyAnalysis(BaseModel):
    strategy_data: Dict[str, Any]

class StrategyAnalysisResponse(BaseModel):
    risk_level: float
    success_probability: float
    recommendations: List[str]

# Helper functions
def generate_market_data(days=30, volatility=0.02):
    """Generate synthetic market data for simulation"""
    np.random.seed(42)  # For reproducibility
    
    # Generate dates
    base_date = datetime.now() - timedelta(days=days)
    dates = [base_date + timedelta(days=i) for i in range(days)]
    
    # Generate prices
    price = 100
    prices = [price]
    
    for _ in range(1, days):
        change = np.random.normal(0, volatility)
        price *= (1 + change)
        prices.append(price)
    
    # Create dataframe
    df = pd.DataFrame({
        'date': dates,
        'price': prices
    })
    
    # Add technical indicators
    df['sma_5'] = df['price'].rolling(5).mean()
    df['sma_20'] = df['price'].rolling(20).mean()
    
    return df.dropna().to_dict('records')

def simulate_strategy(strategy_name, initial_capital, market_data):
    """Run simulation based on strategy"""
    capital = initial_capital
    position = 0
    
    for i, data in enumerate(market_data):
        if i == 0:
            continue
            
        # Simple strategy implementation
        if strategy_name == "moving_average_crossover":
            if data['sma_5'] > data['sma_20'] and position == 0:
                # Buy signal
                position = capital / data['price']
                capital = 0
            elif data['sma_5'] < data['sma_20'] and position > 0:
                # Sell signal
                capital = position * data['price']
                position = 0
                
    # Calculate final position value
    if position > 0:
        capital = position * market_data[-1]['price']
        
    return capital

# Routes
@router.post("/run", response_model=SimulationResponse)
async def run_simulation(
    simulation: SimulationCreate, 
    db: Session = Depends(lambda: Session())
):
    # Check if user exists
    user = db.query(User).filter(User.id == simulation.user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Generate market data or use provided conditions
    market_data = simulation.market_conditions.get('data')
    if not market_data:
        volatility = simulation.market_conditions.get('volatility', 0.02)
        days = simulation.market_conditions.get('days', 30)
        market_data = generate_market_data(days, volatility)
    
    # Run simulation
    start_date = datetime.strptime(market_data[0]['date'], '%Y-%m-%dT%H:%M:%S') if isinstance(market_data[0]['date'], str) else market_data[0]['date']
    end_date = datetime.strptime(market_data[-1]['date'], '%Y-%m-%dT%H:%M:%S') if isinstance(market_data[-1]['date'], str) else market_data[-1]['date']
    
    final_capital = simulate_strategy(
        simulation.strategy_name,
        simulation.initial_capital,
        market_data
    )
    
    profit_loss = final_capital - simulation.initial_capital
    
    # Save simulation results
    db_simulation = TradeSimulation(
        user_id=simulation.user_id,
        strategy_name=simulation.strategy_name,
        start_date=start_date,
        end_date=end_date,
        initial_capital=simulation.initial_capital,
        final_capital=final_capital,
        profit_loss=profit_loss
    )
    
    db.add(db_simulation)
    db.commit()
    db.refresh(db_simulation)
    
    return db_simulation

@router.get("/user/{user_id}", response_model=List[SimulationResponse])
async def get_user_simulations(user_id: int, db: Session = Depends(lambda: Session())):
    # Check if user exists
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    simulations = db.query(TradeSimulation).filter(
        TradeSimulation.user_id == user_id
    ).order_by(TradeSimulation.created_at.desc()).all()
    
    return simulations

@router.post("/analyze-strategy", response_model=StrategyAnalysisResponse)
async def analyze_strategy(strategy: TradeStrategyAnalysis):
    """Analyze a trading strategy using AI"""
    analysis = await ai_core.analyze_trading_strategy(strategy.strategy_data)
    return analysis

@router.get("/market-data")
async def get_market_data(days: int = 30, volatility: float = 0.02):
    """Generate synthetic market data for simulations"""
    market_data = generate_market_data(days, volatility)
    return market_data 