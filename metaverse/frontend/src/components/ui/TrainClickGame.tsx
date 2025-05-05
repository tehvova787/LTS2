import React, { useState, useEffect, useRef } from 'react';
import { useMetaverseStore, GameReward } from '../../stores/metaverseStore';
import './TrainClickGame.css';

interface Reward {
  message: string;
  code: string;
  type: 'ticket' | 'nft' | 'token';
}

const TrainClickGame: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [firstWinThreshold, setFirstWinThreshold] = useState(0);
  const [secondWinThreshold, setSecondWinThreshold] = useState(0);
  const [wins, setWins] = useState(0);
  const [rewardCodes, setRewardCodes] = useState({
    ticket: '',
    nft: '',
    token: ''
  });
  const [currentReward, setCurrentReward] = useState<Reward | null>(null);
  const trainRef = useRef<HTMLDivElement>(null);

  // Get metaverse store functions
  const { userInfo, gameRewards, addGameReward } = useMetaverseStore();

  useEffect(() => {
    // Initialize game thresholds and codes
    setFirstWinThreshold(getRandomInt(1, 17));
    setSecondWinThreshold(getRandomInt(37, 1781));
    
    // Generate reward codes
    setRewardCodes({
      ticket: generateRandomCode(),
      nft: generateRandomCode(),
      token: generateRandomCode()
    });
  }, []);

  const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateRandomCode = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for(let i = 0; i < 11; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  };

  const getRandomReward = (): Reward => {
    const rewardTypes: Array<'ticket' | 'nft' | 'token'> = ['ticket', 'nft', 'token'];
    const selectedType = rewardTypes[Math.floor(Math.random() * rewardTypes.length)];
    
    const messages = {
      ticket: "Вы получили скидку на приобретение билета",
      nft: "Вы получили памятное НФТ",
      token: "Вы получили один токен"
    };
    
    return {
      message: messages[selectedType],
      code: rewardCodes[selectedType],
      type: selectedType
    };
  };

  const handleClick = () => {
    setClickCount(prev => prev + 1);
    animateDoors();

    // Check win conditions
    if(clickCount + 1 === firstWinThreshold || 
      (wins === 1 && clickCount + 1 === secondWinThreshold)) {
      setWins(prev => prev + 1);
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
    }
  };

  const animateDoors = () => {
    if (trainRef.current) {
      const doors = trainRef.current.querySelectorAll('.door');
      doors.forEach(door => {
        door.classList.remove('closed');
        setTimeout(() => door.classList.add('closed'), 500);
      });
    }
  };

  return (
    <div className="train-game-container">
      <h3 className="train-game-title">Метавселенная: Игра "Кликни по поезду"</h3>
      
      <div className="game-container">
        <div id="train" ref={trainRef} onClick={handleClick}>
          <div className="locomotive">
            <div className="door closed"></div>
          </div>
          <div className="wagon">
            <div className="door closed"></div>
          </div>
          <div className="wagon">
            <div className="door closed"></div>
          </div>
        </div>

        <div id="message-display">
          {currentReward && (
            <div className="reward-message">
              <h3>{currentReward.message}</h3>
              <p>Ваш код: <strong>{currentReward.code}</strong></p>
            </div>
          )}
        </div>
        
        <div className="click-counter">
          Количество кликов: {clickCount}
        </div>
      </div>

      <div className="game-instructions">
        <p>Кликайте по поезду, чтобы получить призы. Двери будут открываться и закрываться при каждом клике!</p>
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

export default TrainClickGame; 