import React, { useState, useEffect, useRef } from 'react';
import { useMetaverseStore, GameReward } from '../../stores/metaverseStore';
import './CryptoTrainTycoon.css';

interface Resource {
  crypto: number;
  energy: number;
  miners: number;
  trains: Train[];
}

interface Train {
  id: number;
  level: number;
  type: 'cargo' | 'express' | 'mining' | 'luxury';
  capacity: number;
  speed: number;
  bonuses: {
    mining?: number;
    reputation?: number;
  };
}

interface Prices {
  miner: number;
  trainTypes: {
    cargo: number;
    express: number;
    mining: number;
    luxury: number;
  };
  upgrade: number;
}

interface Stats {
  level: number;
  experience: number;
  reputation: number;
}

interface Reward {
  message: string;
  code: string;
  type: 'ticket' | 'nft' | 'token';
}

const CryptoTrainTycoon: React.FC = () => {
  // Game state
  const [resources, setResources] = useState<Resource>({
    crypto: 0,
    energy: 100,
    miners: 0,
    trains: []
  });
  
  const [prices, setPrices] = useState<Prices>({
    miner: 10,
    trainTypes: {
      cargo: 100,
      express: 200,
      mining: 300,
      luxury: 500
    },
    upgrade: 50
  });
  
  const [stats, setStats] = useState<Stats>({
    level: 1,
    experience: 0,
    reputation: 0
  });
  
  const [currentReward, setCurrentReward] = useState<Reward | null>(null);
  const [rewardCodes, setRewardCodes] = useState({
    ticket: '',
    nft: '',
    token: ''
  });
  
  const [showTrainSelector, setShowTrainSelector] = useState(false);
  const [showMissionPanel, setShowMissionPanel] = useState(false);
  const [availableMissions, setAvailableMissions] = useState<string[]>([]);
  const [cryptoMarketValues, setCryptoMarketValues] = useState([100, 105, 95, 110, 90, 115, 85, 120]);
  const [selectedMiner, setSelectedMiner] = useState<number | null>(null);
  
  // Game loop ref
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  
  // Metaverse store
  const { gameRewards, addGameReward } = useMetaverseStore();
  
  // Initialize game
  useEffect(() => {
    // Generate reward codes
    setRewardCodes({
      ticket: generateRandomCode(),
      nft: generateRandomCode(),
      token: generateRandomCode()
    });
    
    // Generate missions
    generateMissions();
    
    // Start game loop
    startGameLoop();
    
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, []);
  
  // Generate random code
  const generateRandomCode = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for(let i = 0; i < 11; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  };
  
  // Generate missions
  const generateMissions = () => {
    const missions = [
      'Перевезите 50 единиц криптовалюты в ближайший город',
      'Увеличьте добычу на 25% за 2 минуты',
      'Купите 3 новых поезда',
      'Достигните уровня 3',
      'Заработайте 1000 единиц криптовалюты'
    ];
    
    // Randomly select 3 missions
    const selected = [];
    while (selected.length < 3 && missions.length > 0) {
      const randomIndex = Math.floor(Math.random() * missions.length);
      selected.push(missions[randomIndex]);
      missions.splice(randomIndex, 1);
    }
    
    setAvailableMissions(selected);
  };
  
  // Start game loop
  const startGameLoop = () => {
    gameLoopRef.current = setInterval(() => {
      updateResources();
      updateMarket();
      checkLevelUp();
    }, 1000);
  };
  
  // Update resources
  const updateResources = () => {
    setResources(prev => {
      const minerProduction = prev.miners * 0.1;
      
      // Calculate train bonuses
      let trainBonus = 0;
      prev.trains.forEach(train => {
        const baseProduction = train.level * 0.5 * train.speed;
        trainBonus += train.type === 'mining' 
          ? baseProduction * (1 + (train.bonuses.mining || 0)) 
          : baseProduction;
      });
      
      // Calculate reputation gain from luxury trains
      let reputationGain = 0;
      prev.trains.forEach(train => {
        if (train.type === 'luxury') {
          reputationGain += train.bonuses.reputation || 0;
        }
      });
      
      // Update stats with reputation
      if (reputationGain > 0) {
        setStats(prev => ({
          ...prev,
          reputation: prev.reputation + reputationGain
        }));
      }
      
      return {
        ...prev,
        crypto: prev.crypto + minerProduction + trainBonus,
        energy: Math.max(0, prev.energy - 0.2 * prev.miners)
      };
    });
  };
  
  // Update market
  const updateMarket = () => {
    setCryptoMarketValues(prev => {
      return prev.map(value => {
        // Random market fluctuation between -5% and +5%
        const change = value * (Math.random() * 0.1 - 0.05);
        return Math.max(50, Math.min(150, value + change));
      });
    });
  };
  
  // Check level up
  const checkLevelUp = () => {
    setStats(prev => {
      if (prev.experience >= prev.level * 100) {
        const newLevel = prev.level + 1;
        
        // Generate reward on level up
        if (newLevel > prev.level) {
          const reward = getRandomReward();
          setCurrentReward(reward);
          
          const gameReward: GameReward = {
            type: reward.type,
            code: reward.code,
            timestamp: Date.now(),
            message: reward.message
          };
          
          addGameReward(gameReward);
        }
        
        return {
          ...prev,
          level: newLevel,
          experience: prev.experience - (prev.level * 100)
        };
      }
      return prev;
    });
  };
  
  // Get random reward
  const getRandomReward = (): Reward => {
    const rewardTypes: Array<'ticket' | 'nft' | 'token'> = [
      'ticket', 'nft', 'token', 'token', 'nft'
    ];
    
    // Higher level increases chance of better rewards
    if (stats.level >= 3) {
      rewardTypes.push('nft', 'token');
    }
    if (stats.level >= 5) {
      rewardTypes.push('nft', 'nft');
    }
    
    const selectedType = rewardTypes[Math.floor(Math.random() * rewardTypes.length)];
    
    const messages = {
      ticket: "Вы получили скидку на приобретение билета",
      nft: "Вы получили железнодорожное НФТ",
      token: "Вы получили криптовалютный токен"
    };
    
    return {
      message: messages[selectedType],
      code: rewardCodes[selectedType],
      type: selectedType
    };
  };
  
  // Buy miner
  const buyMiner = () => {
    if (resources.crypto >= prices.miner) {
      setResources(prev => ({
        ...prev,
        crypto: prev.crypto - prices.miner,
        miners: prev.miners + 1
      }));
      
      setPrices(prev => ({
        ...prev,
        miner: Math.floor(prev.miner * 1.2)
      }));
      
      setStats(prev => ({
        ...prev,
        experience: prev.experience + 5
      }));
    }
  };
  
  // Buy train
  const buyTrain = (type: 'cargo' | 'express' | 'mining' | 'luxury') => {
    const price = prices.trainTypes[type];
    
    if (resources.crypto >= price) {
      const newTrain: Train = {
        id: Date.now(),
        level: 1,
        type,
        capacity: type === 'cargo' ? 20 : type === 'express' ? 10 : type === 'mining' ? 15 : 5,
        speed: type === 'cargo' ? 1 : type === 'express' ? 2 : type === 'mining' ? 1.5 : 3,
        bonuses: {
          mining: type === 'mining' ? 0.2 : 0,
          reputation: type === 'luxury' ? 0.5 : 0
        }
      };
      
      setResources(prev => ({
        ...prev,
        crypto: prev.crypto - price,
        trains: [...prev.trains, newTrain]
      }));
      
      setPrices(prev => ({
        ...prev,
        trainTypes: {
          ...prev.trainTypes,
          [type]: Math.floor(prev.trainTypes[type] * 1.1)
        }
      }));
      
      setStats(prev => ({
        ...prev,
        experience: prev.experience + 20
      }));
      
      setShowTrainSelector(false);
    }
  };
  
  // Upgrade miner
  const upgradeMiner = (index: number) => {
    if (resources.crypto >= prices.upgrade && index < resources.miners) {
      setResources(prev => ({
        ...prev,
        crypto: prev.crypto - prices.upgrade
      }));
      
      setPrices(prev => ({
        ...prev,
        upgrade: Math.floor(prev.upgrade * 1.1)
      }));
      
      setStats(prev => ({
        ...prev,
        experience: prev.experience + 10
      }));
      
      setSelectedMiner(null);
    }
  };
  
  // Mine crypto
  const mineCrypto = () => {
    const amount = 1 + (0.5 * stats.level);
    
    setResources(prev => ({
      ...prev,
      crypto: prev.crypto + amount,
      energy: Math.max(0, prev.energy - 1)
    }));
    
    setStats(prev => ({
      ...prev,
      experience: prev.experience + 1
    }));
  };
  
  // Recharge energy
  const rechargeEnergy = () => {
    if (resources.crypto >= 10) {
      setResources(prev => ({
        ...prev,
        crypto: prev.crypto - 10,
        energy: Math.min(100, prev.energy + 25)
      }));
    }
  };
  
  // Format number
  const formatNumber = (num: number): string => {
    return Math.floor(num).toLocaleString();
  };
  
  return (
    <div className="tycoon-game-container">
      <h3 className="tycoon-game-title">Crypto Train Tycoon</h3>
      
      <div className="tycoon-header">
        <div className="resource-panel">
          <div className="resource">
            <span>💰 Крипто:</span>
            <span className="resource-value">{formatNumber(resources.crypto)}</span>
          </div>
          <div className="resource">
            <span>⚡ Энергия:</span>
            <span className="resource-value">{formatNumber(resources.energy)}</span>
          </div>
          <div className="resource">
            <span>⛏️ Майнеры:</span>
            <span className="resource-value">{resources.miners}</span>
          </div>
          <div className="resource">
            <span>🚂 Поезда:</span>
            <span className="resource-value">{resources.trains.length}</span>
          </div>
        </div>
        
        <div className="stats-panel">
          <div className="stat">
            <span>📈 Уровень:</span>
            <span className="stat-value">{stats.level}</span>
          </div>
          <div className="stat">
            <span>⭐ Опыт:</span>
            <span className="stat-value">
              {formatNumber(stats.experience)}/{stats.level * 100}
            </span>
          </div>
          <div className="stat">
            <span>🏆 Репутация:</span>
            <span className="stat-value">{formatNumber(stats.reputation)}</span>
          </div>
        </div>
      </div>
      
      <div className="tycoon-main-area">
        <div className="tycoon-panel mining-panel">
          <h4>Майнинг Станция</h4>
          
          <div className="miners-grid">
            {Array.from({ length: resources.miners }).map((_, index) => (
              <div 
                key={index} 
                className={`miner ${selectedMiner === index ? 'selected' : ''}`}
                onClick={() => setSelectedMiner(index)}
              >
                ⛏️
              </div>
            ))}
          </div>
          
          <div className="panel-actions">
            <button onClick={buyMiner}>
              Купить майнер ({formatNumber(prices.miner)} крипто)
            </button>
            
            {selectedMiner !== null && (
              <button onClick={() => upgradeMiner(selectedMiner)}>
                Улучшить майнер ({formatNumber(prices.upgrade)} крипто)
              </button>
            )}
          </div>
        </div>
        
        <div className="tycoon-panel train-panel">
          <h4>Железнодорожная Сеть</h4>
          
          <div className="trains-container">
            {resources.trains.map((train, index) => (
              <div key={train.id} className={`train train-${train.type}`}>
                <div className="train-icon">
                  {train.type === 'cargo' ? '🚂' : 
                   train.type === 'express' ? '🚄' :
                   train.type === 'mining' ? '⛏️🚂' : '✨🚂'}
                </div>
                <div className="train-info">
                  <div>{train.type === 'cargo' ? 'Грузовой' : 
                         train.type === 'express' ? 'Экспресс' :
                         train.type === 'mining' ? 'Майнинг' : 'Люкс'} поезд</div>
                  <div>Уровень: {train.level}</div>
                  <div>Скорость: {train.speed}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="panel-actions">
            <button onClick={() => setShowTrainSelector(!showTrainSelector)}>
              {showTrainSelector ? 'Закрыть' : 'Купить поезд'}
            </button>
            
            {showTrainSelector && (
              <div className="train-selector">
                <div className="train-option" onClick={() => buyTrain('cargo')}>
                  <div>🚂 Грузовой ({formatNumber(prices.trainTypes.cargo)} крипто)</div>
                  <div>Вместимость: 20, Скорость: 1</div>
                </div>
                <div className="train-option" onClick={() => buyTrain('express')}>
                  <div>🚄 Экспресс ({formatNumber(prices.trainTypes.express)} крипто)</div>
                  <div>Вместимость: 10, Скорость: 2</div>
                </div>
                <div className="train-option" onClick={() => buyTrain('mining')}>
                  <div>⛏️🚂 Майнинг ({formatNumber(prices.trainTypes.mining)} крипто)</div>
                  <div>Вместимость: 15, Скорость: 1.5, Бонус к майнингу: +20%</div>
                </div>
                <div className="train-option" onClick={() => buyTrain('luxury')}>
                  <div>✨🚂 Люкс ({formatNumber(prices.trainTypes.luxury)} крипто)</div>
                  <div>Вместимость: 5, Скорость: 3, Бонус к репутации: +0.5</div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="tycoon-panel market-panel">
          <h4>Крипто Рынок</h4>
          
          <div className="market-chart">
            {cryptoMarketValues.map((value, index) => (
              <div 
                key={index} 
                className="chart-bar" 
                style={{ height: `${value / 2}px` }}
              ></div>
            ))}
          </div>
          
          <div className="market-stats">
            <div>Текущая стоимость: {formatNumber(cryptoMarketValues[cryptoMarketValues.length - 1])}</div>
            <div>Тренд: {cryptoMarketValues[cryptoMarketValues.length - 1] > cryptoMarketValues[cryptoMarketValues.length - 2] ? '📈 Рост' : '📉 Падение'}</div>
          </div>
        </div>
      </div>
      
      <div className="tycoon-mission-area">
        <button onClick={() => setShowMissionPanel(!showMissionPanel)}>
          {showMissionPanel ? 'Скрыть задания' : 'Показать задания'}
        </button>
        
        {showMissionPanel && (
          <div className="missions-panel">
            <h4>Доступные задания:</h4>
            <ul>
              {availableMissions.map((mission, index) => (
                <li key={index}>{mission}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="tycoon-action-area">
        <button 
          className="action-button mine-button" 
          onClick={mineCrypto}
          disabled={resources.energy <= 0}
        >
          Майнить крипто
        </button>
        
        <button 
          className="action-button recharge-button" 
          onClick={rechargeEnergy}
          disabled={resources.crypto < 10}
        >
          Пополнить энергию (10 крипто)
        </button>
      </div>
      
      {currentReward && (
        <div className="reward-popup">
          <h3>{currentReward.message}</h3>
          <p>Ваш код: <strong>{currentReward.code}</strong></p>
          <button onClick={() => setCurrentReward(null)}>Закрыть</button>
        </div>
      )}
      
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

export default CryptoTrainTycoon; 