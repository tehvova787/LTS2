import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useMetaverseStore, GameReward } from '../../stores/metaverseStore';
import './CosmicPuzzleQuest.css';

interface PuzzleTile {
  id: number;
  symbol: string;
  flipped: boolean;
  matched: boolean;
}

interface Reward {
  message: string;
  code: string;
  type: 'ticket' | 'nft' | 'token';
}

const COSMIC_SYMBOLS = ['🌌', '🚀', '🌠', '⭐', '🌙', '🪐', '🌍', '🌞'];

const CosmicPuzzleQuest: React.FC = () => {
  const [tiles, setTiles] = useState<PuzzleTile[]>([]);
  const [moves, setMoves] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [starRating, setStarRating] = useState(3);
  const [flippedTiles, setFlippedTiles] = useState<number[]>([]);
  const [currentReward, setCurrentReward] = useState<Reward | null>(null);
  const [rewardCodes, setRewardCodes] = useState({
    ticket: '',
    nft: '',
    token: ''
  });
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Get metaverse store functions
  const { gameRewards, addGameReward } = useMetaverseStore();

  // Initialize game
  const initGame = useCallback(() => {
    // Reset game state
    setMoves(0);
    setTimeElapsed(0);
    setGameCompleted(false);
    setStarRating(3);
    setFlippedTiles([]);
    setCurrentReward(null);
    
    // Create puzzle tiles
    const symbolPairs = [...COSMIC_SYMBOLS, ...COSMIC_SYMBOLS];
    const shuffledSymbols = symbolPairs.sort(() => Math.random() - 0.5);
    
    const newTiles = shuffledSymbols.map((symbol, index) => ({
      id: index,
      symbol,
      flipped: false,
      matched: false
    }));
    
    setTiles(newTiles);
    
    // Generate reward codes
    setRewardCodes({
      ticket: generateRandomCode(),
      nft: generateRandomCode(),
      token: generateRandomCode()
    });
    
    // Start timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setTimeElapsed(prev => {
        // Update star rating based on time
        if (prev === 59) setStarRating(prev => Math.max(1, prev - 1));
        if (prev === 119) setStarRating(prev => Math.max(1, prev - 1));
        return prev + 1;
      });
    }, 1000);
    
    setGameActive(true);
  }, []);

  // Initialize on mount
  useEffect(() => {
    initGame();
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [initGame]);

  // Generate random code for rewards
  const generateRandomCode = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for(let i = 0; i < 11; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  };

  // Get random reward based on star rating
  const getRandomReward = (): Reward => {
    // Better rewards for higher star ratings
    let rewardTypes: Array<'ticket' | 'nft' | 'token'>;
    
    if (starRating === 3) {
      rewardTypes = ['nft', 'nft', 'token', 'token', 'ticket'];
    } else if (starRating === 2) {
      rewardTypes = ['nft', 'token', 'token', 'ticket', 'ticket'];
    } else {
      rewardTypes = ['token', 'token', 'ticket', 'ticket', 'ticket'];
    }
    
    const selectedType = rewardTypes[Math.floor(Math.random() * rewardTypes.length)];
    
    const messages = {
      ticket: "Вы получили скидку на приобретение билета",
      nft: "Вы получили космическое НФТ",
      token: "Вы получили космический токен"
    };
    
    return {
      message: messages[selectedType],
      code: rewardCodes[selectedType],
      type: selectedType
    };
  };

  // Handle tile click
  const handleTileClick = (id: number) => {
    // Ignore clicks if game not active
    if (!gameActive) return;
    
    // Ignore clicks on already matched or flipped tiles
    const clickedTile = tiles.find(tile => tile.id === id);
    if (!clickedTile || clickedTile.matched || clickedTile.flipped) return;
    
    // Ignore if two tiles are already flipped
    if (flippedTiles.length >= 2) return;
    
    // Flip the tile
    const updatedTiles = tiles.map(tile => 
      tile.id === id ? { ...tile, flipped: true } : tile
    );
    
    setTiles(updatedTiles);
    setFlippedTiles([...flippedTiles, id]);
    
    // Check for match if two tiles are flipped
    if (flippedTiles.length === 1) {
      setMoves(moves + 1);
      
      const firstTileId = flippedTiles[0];
      const firstTile = tiles.find(tile => tile.id === firstTileId);
      const secondTile = clickedTile;
      
      if (firstTile && firstTile.symbol === secondTile.symbol) {
        // Match found
        setTimeout(() => {
          const matchedTiles = tiles.map(tile => 
            (tile.id === firstTileId || tile.id === id) 
              ? { ...tile, matched: true } 
              : tile
          );
          
          setTiles(matchedTiles);
          setFlippedTiles([]);
          
          // Check if game completed
          if (matchedTiles.every(tile => tile.matched)) {
            handleGameCompleted();
          }
        }, 500);
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          const resetTiles = tiles.map(tile => 
            (tile.id === firstTileId || tile.id === id)
              ? { ...tile, flipped: false }
              : tile
          );
          
          setTiles(resetTiles);
          setFlippedTiles([]);
          
          // Update star rating after certain moves
          if (moves === 14) setStarRating(prev => Math.max(1, prev - 1));
          if (moves === 24) setStarRating(prev => Math.max(1, prev - 1));
        }, 1000);
      }
    }
  };

  // Handle game completion
  const handleGameCompleted = () => {
    setGameActive(false);
    setGameCompleted(true);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    const reward = getRandomReward();
    setCurrentReward(reward);
    
    // Save the reward to the metaverse store
    const gameReward: GameReward = {
      type: reward.type,
      code: reward.code,
      timestamp: Date.now(),
      message: reward.message
    };
    
    addGameReward(gameReward);
  };

  // Format time display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="cosmic-game-container">
      <h3 className="cosmic-game-title">Космическая головоломка</h3>
      
      <div className="game-stats">
        <div className="time-counter">Время: {formatTime(timeElapsed)}</div>
        <div className="moves-counter">Ходы: {moves}</div>
      </div>
      
      <div className="star-rating">
        {[1, 2, 3].map(star => (
          <span 
            key={star} 
            className={`star ${star <= starRating ? 'filled' : ''}`}
          >
            ★
          </span>
        ))}
      </div>
      
      <div className="puzzle-container">
        {tiles.map(tile => (
          <div 
            key={tile.id}
            className={`puzzle-tile ${tile.flipped ? 'flipped' : ''} ${tile.matched ? 'matched' : ''}`}
            onClick={() => handleTileClick(tile.id)}
          >
            <div className="puzzle-tile-front"></div>
            <div className="puzzle-tile-back">
              <span className="cosmic-symbol">{tile.symbol}</span>
            </div>
          </div>
        ))}
      </div>
      
      {currentReward && (
        <div className="reward-message">
          <h3>{currentReward.message}</h3>
          <p>Ваш код: <strong>{currentReward.code}</strong></p>
        </div>
      )}
      
      <div className="game-controls">
        <button 
          className="cosmic-button"
          onClick={initGame}
        >
          Новая игра
        </button>
      </div>
      
      <div className="game-instructions">
        <p>Переворачивайте плитки и находите пары космических символов. Собирайте звезды за быстрое прохождение!</p>
      </div>
      
      {gameRewards.length > 0 && (
        <div className="rewards-history">
          <h4>История полученных наград:</h4>
          <ul>
            {gameRewards.map((reward, index) => (
              <li key={index}>
                <strong>{reward.type === 'ticket' ? 'Билет' : reward.type === 'nft' ? 'НФТ' : 'Токен'}</strong>: {reward.code}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CosmicPuzzleQuest; 