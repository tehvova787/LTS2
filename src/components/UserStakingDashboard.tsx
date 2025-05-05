import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { tonConnector, UserStakingProfile, TokenData } from '@/services/tonConnector';

// Define achievement card component
const AchievementCard = ({ title, description, icon, unlocked }: { 
  title: string; 
  description: string; 
  icon: string;
  unlocked: boolean;
}) => {
  return (
    <div className={`rounded-xl p-4 ${unlocked ? 'bg-gradient-to-br from-blue-800 to-indigo-900' : 'bg-gray-800/50'}`}>
      <div className="flex items-center mb-2">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${unlocked ? 'bg-green-500/20' : 'bg-gray-700/30'}`}>
          <span className={`text-xl ${unlocked ? 'text-green-400' : 'text-gray-400'}`}>{icon}</span>
        </div>
        <h4 className={`font-semibold ${unlocked ? 'text-white' : 'text-gray-400'}`}>{title}</h4>
      </div>
      <p className={`text-sm ${unlocked ? 'text-blue-100' : 'text-gray-500'}`}>{description}</p>
    </div>
  );
};

// Define leaderboard item component
const LeaderboardItem = ({ position, name, amount, isCurrentUser }: {
  position: number;
  name: string;
  amount: number;
  isCurrentUser: boolean;
}) => {
  return (
    <div className={`flex items-center justify-between py-3 px-4 rounded-lg ${isCurrentUser ? 'bg-green-500/20' : 'bg-blue-900/20'}`}>
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3
          ${position === 1 ? 'bg-yellow-500/30' : position === 2 ? 'bg-gray-400/30' : position === 3 ? 'bg-amber-700/30' : 'bg-blue-800/30'}`}>
          <span className={`font-bold ${position === 1 ? 'text-yellow-500' : position === 2 ? 'text-gray-400' : position === 3 ? 'text-amber-700' : 'text-blue-400'}`}>
            {position}
          </span>
        </div>
        <span className={`font-medium ${isCurrentUser ? 'text-green-300' : 'text-white'}`}>
          {name}
          {isCurrentUser && <span className="ml-2 text-xs text-green-400">(Вы)</span>}
        </span>
      </div>
      <span className="font-bold text-white">{amount} TON</span>
    </div>
  );
};

// Main dashboard component
const UserStakingDashboard = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userProfile, setUserProfile] = useState<UserStakingProfile | null>(null);
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Hardcoded achievements data - in a real app, this would come from the backend
  const achievementsData = [
    { id: 'first_stake', title: 'Первый стейк', description: 'Сделайте свой первый стейк TrainCoin', icon: '🚂' },
    { id: 'level_up', title: 'Повышение', description: 'Достигните уровня "Машинист"', icon: '📈' },
    { id: 'referral_master', title: 'Приглашайте друзей', description: 'Пригласите 3 друзей на платформу', icon: '👥' },
    { id: 'diamond_hands', title: 'Бриллиантовые руки', description: 'Удерживайте стейк более 30 дней', icon: '💎' },
    { id: 'big_investor', title: 'Крупный инвестор', description: 'Сделайте стейк на сумму более 5000 TON', icon: '💰' },
    { id: 'lucky_winner', title: 'Счастливчик', description: 'Выиграйте в еженедельной лотерее', icon: '🍀' },
  ];

  // Leaderboard data (mock)
  const leaderboardData = [
    { position: 1, name: 'whale_holder.ton', amount: 500000 },
    { position: 2, name: 'crypto_master.ton', amount: 250000 },
    { position: 3, name: 'diamond_hands.ton', amount: 100000 },
    { position: 4, name: 'your_name.ton', amount: 50000, isCurrentUser: true },
    { position: 5, name: 'lucky_investor.ton', amount: 25000 },
  ];

  const stakingData = useMemo(() => [
    {
      id: 1,
      name: 'Basic Staking',
      apy: 12.5,
      minAmount: 100,
      maxAmount: 1000,
      lockPeriod: 30,
      description: 'Basic staking plan with moderate returns'
    },
    {
      id: 2,
      name: 'Premium Staking',
      apy: 15.0,
      minAmount: 1000,
      maxAmount: 5000,
      lockPeriod: 60,
      description: 'Premium staking plan with higher returns'
    },
    {
      id: 3,
      name: 'VIP Staking',
      apy: 18.0,
      minAmount: 5000,
      maxAmount: 10000,
      lockPeriod: 90,
      description: 'VIP staking plan with maximum returns'
    }
  ], []);

  // Connect to wallet and load data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const connected = await tonConnector.connect();
        setIsConnected(connected);
        
        if (connected) {
          const profile = await tonConnector.getStakingProfile();
          const token = await tonConnector.getTokenBalance();
          
          setUserProfile(profile);
          setTokenData(token);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Handle disconnect
  const handleDisconnect = () => {
    tonConnector.disconnect();
    setIsConnected(false);
    setUserProfile(null);
    setTokenData(null);
  };

  // Handle staking action
  const handleStakeAction = () => {
    // In a real app, this would open a staking modal
    console.log("Opening staking modal");
  };

  // Handle rewards claim
  const handleClaimRewards = async () => {
    if (!userProfile) return;
    
    try {
      const success = await tonConnector.claimRewards();
      if (success) {
        // In a real app, we would refresh the user profile data
        alert("Rewards claimed successfully!");
      }
    } catch (error) {
      console.error("Failed to claim rewards:", error);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-200">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  // Not connected state
  if (!isConnected || !userProfile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-blue-900/30 backdrop-blur-md rounded-xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Подключите кошелек</h2>
          <p className="text-blue-100 mb-6">
            Подключите свой TON кошелек, чтобы получить доступ к личному кабинету стейкинга
          </p>
          <button
            onClick={() => tonConnector.connect().then(connected => setIsConnected(connected))}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold"
          >
            Подключить кошелек
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-950/50 backdrop-blur-md rounded-xl p-6 shadow-xl">
      {/* Dashboard header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
              <span className="text-green-400 text-xl">🚆</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Личный вагон</h2>
          </div>
          <p className="text-blue-200">
            Адрес: {tonConnector.getWalletAddress()?.substring(0, 8)}...{tonConnector.getWalletAddress()?.substring(40)}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={handleDisconnect}
            className="px-4 py-2 rounded-lg bg-blue-800/50 text-blue-200 text-sm hover:bg-blue-700/50 transition-all"
          >
            Отключить кошелек
          </button>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex overflow-x-auto mb-6 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg mr-2 whitespace-nowrap ${activeTab === 'overview' ? 'bg-blue-700 text-white' : 'bg-blue-900/30 text-blue-200 hover:bg-blue-800/30'}`}
        >
          Обзор
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className={`px-4 py-2 rounded-lg mr-2 whitespace-nowrap ${activeTab === 'achievements' ? 'bg-blue-700 text-white' : 'bg-blue-900/30 text-blue-200 hover:bg-blue-800/30'}`}
        >
          Достижения
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`px-4 py-2 rounded-lg mr-2 whitespace-nowrap ${activeTab === 'leaderboard' ? 'bg-blue-700 text-white' : 'bg-blue-900/30 text-blue-200 hover:bg-blue-800/30'}`}
        >
          Рейтинг
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-lg mr-2 whitespace-nowrap ${activeTab === 'history' ? 'bg-blue-700 text-white' : 'bg-blue-900/30 text-blue-200 hover:bg-blue-800/30'}`}
        >
          История
        </button>
        <button
          onClick={() => setActiveTab('referral')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === 'referral' ? 'bg-blue-700 text-white' : 'bg-blue-900/30 text-blue-200 hover:bg-blue-800/30'}`}
        >
          Реферальная программа
        </button>
      </div>

      {/* Tab content */}
      <div className="bg-blue-900/20 rounded-xl p-6">
        {/* Overview tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-800/30 rounded-xl p-5">
                <p className="text-blue-200 mb-1">Ваш уровень</p>
                <h3 className="text-2xl font-bold text-white mb-2">{userProfile.stakingTier}</h3>
                <div className="flex items-center">
                  <div className="flex-grow h-2 bg-blue-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-teal-500" style={{ width: '65%' }}></div>
                  </div>
                  <span className="text-xs text-blue-300 ml-2">65%</span>
                </div>
                <p className="text-xs text-blue-300 mt-2">Осталось 500 TON до уровня "Начальник"</p>
              </div>
              
              <div className="bg-blue-800/30 rounded-xl p-5">
                <p className="text-blue-200 mb-1">Стейкинг</p>
                <h3 className="text-2xl font-bold text-white mb-2">{userProfile.totalStaked} TON</h3>
                <p className="text-sm text-blue-300">Доходность: 12% APY</p>
                <button
                  onClick={handleStakeAction}
                  className="mt-4 w-full py-1.5 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white text-sm font-semibold"
                >
                  Управление стейкингом
                </button>
              </div>
              
              <div className="bg-blue-800/30 rounded-xl p-5">
                <p className="text-blue-200 mb-1">Награда</p>
                <h3 className="text-2xl font-bold text-white mb-2">{userProfile.currentRewards} TON</h3>
                <p className="text-sm text-blue-300">≈ {(userProfile.currentRewards * (tokenData?.price || 0)).toFixed(2)} USD</p>
                <button
                  onClick={handleClaimRewards}
                  className="mt-4 w-full py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold"
                >
                  Получить награду
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Ваш прогресс</h3>
                <div className="bg-blue-800/30 rounded-xl p-5">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-blue-200">Дней в стейкинге</span>
                        <span className="text-white font-semibold">32</span>
                      </div>
                      <div className="h-2 bg-blue-900 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '32%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-blue-200">Приглашенные друзья</span>
                        <span className="text-white font-semibold">{userProfile.referralCount}/10</span>
                      </div>
                      <div className="h-2 bg-blue-900 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500" style={{ width: `${(userProfile.referralCount / 10) * 100}%` }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-blue-200">Достижения</span>
                        <span className="text-white font-semibold">{userProfile.achievements.length}/{achievementsData.length}</span>
                      </div>
                      <div className="h-2 bg-blue-900 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500" style={{ width: `${(userProfile.achievements.length / achievementsData.length) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-4">TrainCoin</h3>
                <div className="bg-blue-800/30 rounded-xl p-5">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-blue-200">Баланс</p>
                      <h4 className="text-xl font-bold text-white">{tokenData?.balance || 0} TRC</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-200">Стоимость</p>
                      <h4 className="text-xl font-bold text-white">${tokenData?.price || 0}</h4>
                      <p className={`text-xs ${tokenData?.priceChange24h && tokenData.priceChange24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {tokenData?.priceChange24h && tokenData.priceChange24h > 0 ? '+' : ''}{tokenData?.priceChange24h || 0}% (24ч)
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Link 
                      href="/exchange"
                      className="py-2 rounded-lg bg-blue-700/50 text-white text-sm font-semibold text-center hover:bg-blue-700 transition-all"
                    >
                      Купить TRC
                    </Link>
                    <Link 
                      href="/exchange/sell"
                      className="py-2 rounded-lg bg-blue-900/50 text-white text-sm font-semibold text-center hover:bg-blue-800 transition-all"
                    >
                      Продать TRC
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Achievements tab */}
        {activeTab === 'achievements' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Ваши достижения</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievementsData.map(achievement => (
                <AchievementCard
                  key={achievement.id}
                  title={achievement.title}
                  description={achievement.description}
                  icon={achievement.icon}
                  unlocked={userProfile.achievements.includes(achievement.id)}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Leaderboard tab */}
        {activeTab === 'leaderboard' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Рейтинг стейкеров</h3>
            <div className="space-y-2">
              {leaderboardData.map(item => (
                <LeaderboardItem
                  key={item.position}
                  position={item.position}
                  name={item.name}
                  amount={item.amount}
                  isCurrentUser={!!item.isCurrentUser}
                />
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="/leaderboard" className="text-teal-400 hover:text-teal-300 text-sm">
                Посмотреть полный рейтинг →
              </Link>
            </div>
          </div>
        )}
        
        {/* History tab */}
        {activeTab === 'history' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-6">История стейкинга</h3>
            {userProfile.stakingHistory.length > 0 ? (
              <div className="space-y-4">
                {userProfile.stakingHistory.map((history, index) => (
                  <div key={index} className="bg-blue-800/30 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">{history.tier}</span>
                      <span className={`text-sm px-2 py-0.5 rounded ${history.isActive ? 'bg-green-500/20 text-green-400' : 'bg-blue-600/20 text-blue-300'}`}>
                        {history.isActive ? 'Активный' : 'Завершен'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-blue-200 mb-2">
                      <span>Сумма: {history.amount} TON</span>
                      <span>Награда: {history.reward} TON</span>
                    </div>
                    <div className="text-xs text-blue-300">
                      Дата: {new Date(history.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-blue-300">У вас пока нет истории стейкинга</p>
              </div>
            )}
          </div>
        )}
        
        {/* Referral tab */}
        {activeTab === 'referral' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Реферальная программа</h3>
            <div className="bg-blue-800/30 rounded-xl p-5 mb-6">
              <p className="text-blue-200 mb-4">
                Приглашайте друзей в Lucky Train и получайте 10% от их наград за стейкинг!
              </p>
              <div className="mb-4">
                <p className="text-sm text-blue-300 mb-2">Ваша реферальная ссылка:</p>
                <div className="flex">
                  <input
                    type="text"
                    value={tonConnector.getReferralLink()}
                    readOnly
                    className="flex-grow bg-blue-950 border border-blue-700 rounded-l-lg px-3 py-2 text-white"
                  />
                  <button className="bg-blue-700 hover:bg-blue-600 text-white px-4 rounded-r-lg">
                    Копировать
                  </button>
                </div>
              </div>
              <div>
                <p className="text-blue-200 mb-2">Ваши рефералы: <span className="text-white font-semibold">{userProfile.referralCount}</span></p>
                <p className="text-blue-200">Заработано с рефералов: <span className="text-white font-semibold">15.75 TON</span></p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-blue-800/30 rounded-xl p-5">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl">👥</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Пригласите 3 друзей</h4>
                <p className="text-sm text-blue-200 mb-3">Пригласите трех друзей и получите эксклюзивный NFT "Проводник"</p>
                <div className="h-2 bg-blue-900 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: `${Math.min(userProfile.referralCount / 3, 1) * 100}%` }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-blue-300">{userProfile.referralCount}/3</span>
                  <span className="text-xs text-blue-300">{Math.min(userProfile.referralCount / 3, 1) * 100}%</span>
                </div>
              </div>
              
              <div className="bg-blue-800/30 rounded-xl p-5">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl">🏆</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Лидер по рефералам</h4>
                <p className="text-sm text-blue-200 mb-4">Войдите в топ-10 пользователей по количеству рефералов и получите 500 TRC</p>
                <Link href="/leaderboard/referral" className="text-teal-400 hover:text-teal-300 text-sm">
                  Посмотреть рейтинг рефералов →
                </Link>
              </div>
              
              <div className="bg-blue-800/30 rounded-xl p-5">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl">📱</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Поделиться в Telegram</h4>
                <p className="text-sm text-blue-200 mb-3">Поделитесь своей реферальной ссылкой в Telegram</p>
                <button className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold">
                  Поделиться
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStakingDashboard; 