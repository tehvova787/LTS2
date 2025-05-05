import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { tonConnector, TokenData } from '@/services/tonConnector';

// Types for trading
type TradeSide = 'buy' | 'sell';
type PriceChartPeriod = '1h' | '24h' | '7d' | '30d' | 'all';

// Mock price chart data
const generateChartData = (period: PriceChartPeriod) => {
  const points = period === '1h' ? 60 : 
                 period === '24h' ? 24 : 
                 period === '7d' ? 7 : 
                 period === '30d' ? 30 : 100;
                 
  const basePrice = 0.025;
  const volatility = period === '1h' ? 0.001 : 
                     period === '24h' ? 0.003 : 
                     period === '7d' ? 0.005 : 
                     period === '30d' ? 0.01 : 0.02;
  
  return Array.from({ length: points }, (_, i) => {
    const randomFactor = 1 + (Math.random() - 0.5) * volatility;
    return {
      time: i,
      price: basePrice * randomFactor * (1 + i / points * 0.1) // slight uptrend
    };
  });
};

// Order book entry type
interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

// Order history entry type
interface OrderHistoryEntry {
  id: string;
  type: 'buy' | 'sell';
  price: number;
  amount: number;
  total: number;
  time: Date;
  status: 'completed' | 'pending' | 'cancelled';
}

// Generate mock order book data
const generateOrderBook = (): { bids: OrderBookEntry[], asks: OrderBookEntry[] } => {
  const basePrice = 0.025;
  const bids: OrderBookEntry[] = [];
  const asks: OrderBookEntry[] = [];
  
  // Generate bids (buy orders) below current price
  for (let i = 0; i < 10; i++) {
    const price = basePrice * (1 - (i + 1) * 0.002);
    const amount = Math.round(Math.random() * 10000) / 100;
    bids.push({
      price,
      amount,
      total: price * amount
    });
  }
  
  // Generate asks (sell orders) above current price
  for (let i = 0; i < 10; i++) {
    const price = basePrice * (1 + (i + 1) * 0.002);
    const amount = Math.round(Math.random() * 10000) / 100;
    asks.push({
      price,
      amount,
      total: price * amount
    });
  }
  
  return { bids, asks };
};

// Generate mock order history
const generateOrderHistory = (): OrderHistoryEntry[] => {
  const history: OrderHistoryEntry[] = [];
  const basePrice = 0.025;
  
  for (let i = 0; i < 10; i++) {
    const type = Math.random() > 0.5 ? 'buy' : 'sell';
    const priceVariation = (Math.random() - 0.5) * 0.005;
    const amount = Math.round(Math.random() * 5000) / 100;
    const price = basePrice + priceVariation;
    
    history.push({
      id: `ord-${Date.now() - i * 100000 + Math.round(Math.random() * 1000)}`,
      type,
      price,
      amount,
      total: price * amount,
      time: new Date(Date.now() - i * 3600000 * (1 + Math.random())),
      status: Math.random() > 0.2 ? 'completed' : Math.random() > 0.5 ? 'pending' : 'cancelled'
    });
  }
  
  return history.sort((a, b) => b.time.getTime() - a.time.getTime());
};

// PriceChart component
const PriceChart = ({ period }: { period: PriceChartPeriod }) => {
  const chartData = generateChartData(period);
  const maxPrice = Math.max(...chartData.map(d => d.price));
  const minPrice = Math.min(...chartData.map(d => d.price));
  const range = maxPrice - minPrice;
  
  return (
    <div className="bg-blue-900/30 rounded-xl p-4 h-64">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-semibold">Цена TrainCoin</h3>
        <div className="text-right">
          <p className="text-sm text-white font-semibold">${chartData[chartData.length - 1].price.toFixed(5)}</p>
          <p className="text-xs text-green-400">+5.34%</p>
        </div>
      </div>
      
      <div className="relative h-40">
        {/* Price labels */}
        <div className="absolute top-0 right-0 text-xs text-blue-300">${maxPrice.toFixed(5)}</div>
        <div className="absolute bottom-0 right-0 text-xs text-blue-300">${minPrice.toFixed(5)}</div>
        
        {/* Chart */}
        <svg width="100%" height="100%" className="overflow-visible">
          {/* Chart line */}
          <path
            d={chartData.map((point, i) => {
              const x = (i / (chartData.length - 1)) * 100;
              const y = 100 - ((point.price - minPrice) / range) * 100;
              return `${i === 0 ? 'M' : 'L'} ${x}% ${y}%`;
            }).join(' ')}
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
          />
          
          {/* Area fill */}
          <path
            d={`
              ${chartData.map((point, i) => {
                const x = (i / (chartData.length - 1)) * 100;
                const y = 100 - ((point.price - minPrice) / range) * 100;
                return `${i === 0 ? 'M' : 'L'} ${x}% ${y}%`;
              }).join(' ')}
              L 100% 100%
              L 0% 100%
              Z
            `}
            fill="url(#chartGradient)"
            opacity="0.2"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="1" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

// OrderBook component
const OrderBook = () => {
  const { bids, asks } = generateOrderBook();
  
  return (
    <div className="bg-blue-900/30 rounded-xl p-4">
      <h3 className="text-white font-semibold mb-3">Книга ордеров</h3>
      
      <div className="grid grid-cols-3 text-xs text-blue-300 mb-2">
        <div>Цена (USD)</div>
        <div className="text-right">Объем (TRC)</div>
        <div className="text-right">Всего (USD)</div>
      </div>
      
      {/* Asks (sell orders) */}
      <div className="space-y-1 mb-3">
        {asks.map((ask, i) => (
          <div key={`ask-${i}`} className="grid grid-cols-3 text-xs">
            <div className="text-red-400">${ask.price.toFixed(5)}</div>
            <div className="text-right text-blue-200">{ask.amount.toFixed(2)}</div>
            <div className="text-right text-blue-200">${ask.total.toFixed(2)}</div>
          </div>
        ))}
      </div>
      
      {/* Current price */}
      <div className="text-center py-2 mb-3 bg-blue-800/50 rounded-lg">
        <span className="text-white font-semibold">$0.025000</span>
      </div>
      
      {/* Bids (buy orders) */}
      <div className="space-y-1">
        {bids.map((bid, i) => (
          <div key={`bid-${i}`} className="grid grid-cols-3 text-xs">
            <div className="text-green-400">${bid.price.toFixed(5)}</div>
            <div className="text-right text-blue-200">{bid.amount.toFixed(2)}</div>
            <div className="text-right text-blue-200">${bid.total.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Trade history component
const TradeHistory = () => {
  const orderHistory = generateOrderHistory();
  
  return (
    <div className="bg-blue-900/30 rounded-xl p-4">
      <h3 className="text-white font-semibold mb-3">История торгов</h3>
      
      <div className="grid grid-cols-4 text-xs text-blue-300 mb-2">
        <div>Цена (USD)</div>
        <div className="text-right">Объем (TRC)</div>
        <div className="text-right">Всего (USD)</div>
        <div className="text-right">Время</div>
      </div>
      
      <div className="space-y-1">
        {orderHistory.map((order) => (
          <div key={order.id} className="grid grid-cols-4 text-xs">
            <div className={order.type === 'buy' ? 'text-green-400' : 'text-red-400'}>
              ${order.price.toFixed(5)}
            </div>
            <div className="text-right text-blue-200">{order.amount.toFixed(2)}</div>
            <div className="text-right text-blue-200">${order.total.toFixed(2)}</div>
            <div className="text-right text-blue-200">
              {order.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main DEX component
const DexTrading = () => {
  const [tradeSide, setTradeSide] = useState<TradeSide>('buy');
  const [amount, setAmount] = useState<string>('');
  const [price, setPrice] = useState<string>('0.025');
  const [chartPeriod, setChartPeriod] = useState<PriceChartPeriod>('24h');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  
  // Connect to wallet and load token data
  useEffect(() => {
    const connectWallet = async () => {
      const connected = await tonConnector.connect();
      setIsConnected(connected);
      
      if (connected) {
        try {
          const data = await tonConnector.getTokenBalance();
          setTokenData(data);
        } catch (error) {
          console.error("Failed to load token data:", error);
        }
      }
    };
    
    connectWallet();
  }, []);
  
  // Calculate total cost
  const calculateTotal = () => {
    const amountValue = parseFloat(amount) || 0;
    const priceValue = parseFloat(price) || 0;
    return (amountValue * priceValue).toFixed(2);
  };
  
  // Handle trade submission
  const handleTrade = () => {
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }
    
    const amountValue = parseFloat(amount);
    if (!amountValue || amountValue <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    
    // In a real app, this would call a smart contract function
    alert(`${tradeSide === 'buy' ? 'Buying' : 'Selling'} ${amount} TRC at $${price} per token`);
  };
  
  return (
    <div className="bg-blue-950/50 backdrop-blur-md rounded-xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">TrainCoin DEX</h2>
        
        {isConnected ? (
          <div className="flex items-center">
            <div className="mr-4 text-right">
              <p className="text-sm text-blue-200">Баланс:</p>
              <p className="text-white font-semibold">{tokenData?.balance.toFixed(2) || 0} TRC</p>
            </div>
            <button
              onClick={() => tonConnector.disconnect()}
              className="px-4 py-2 rounded-lg bg-blue-800/50 text-blue-200 text-sm hover:bg-blue-700/50 transition-all"
            >
              Отключить
            </button>
          </div>
        ) : (
          <button
            onClick={() => tonConnector.connect().then(connected => setIsConnected(connected))}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white text-sm font-semibold"
          >
            Подключить кошелек
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left column - Chart and trade form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart periods */}
          <div className="flex bg-blue-900/20 rounded-lg p-1">
            {(['1h', '24h', '7d', '30d', 'all'] as PriceChartPeriod[]).map(period => (
              <button
                key={period}
                className={`flex-1 py-1 rounded-md text-sm font-medium ${
                  chartPeriod === period 
                    ? 'bg-blue-700 text-white' 
                    : 'text-blue-200 hover:bg-blue-800/50'
                }`}
                onClick={() => setChartPeriod(period)}
              >
                {period}
              </button>
            ))}
          </div>
          
          {/* Price chart */}
          <PriceChart period={chartPeriod} />
          
          {/* Trade form */}
          <div className="bg-blue-900/30 rounded-xl p-5">
            <div className="flex mb-4">
              <button
                className={`flex-1 py-2 font-semibold rounded-l-lg ${
                  tradeSide === 'buy'
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-800/70 text-blue-200'
                }`}
                onClick={() => setTradeSide('buy')}
              >
                Покупка
              </button>
              <button
                className={`flex-1 py-2 font-semibold rounded-r-lg ${
                  tradeSide === 'sell'
                    ? 'bg-red-500 text-white'
                    : 'bg-blue-800/70 text-blue-200'
                }`}
                onClick={() => setTradeSide('sell')}
              >
                Продажа
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-blue-200 text-sm mb-1">Цена (USD)</label>
                <div className="relative">
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-blue-950 border border-blue-700 rounded-lg px-3 py-2 text-white"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 text-sm">
                    USD
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-blue-200 text-sm mb-1">Количество</label>
                <div className="relative">
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-blue-950 border border-blue-700 rounded-lg px-3 py-2 text-white"
                    placeholder="0.0"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 text-sm">
                    TRC
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-blue-200 text-sm mb-1">Всего</label>
                <div className="relative">
                  <input
                    type="text"
                    value={calculateTotal()}
                    readOnly
                    className="w-full bg-blue-950 border border-blue-700 rounded-lg px-3 py-2 text-white"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 text-sm">
                    USD
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleTrade}
                className={`w-full py-3 rounded-lg font-bold ${
                  tradeSide === 'buy'
                    ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white'
                    : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                }`}
              >
                {tradeSide === 'buy' ? 'Купить TrainCoin' : 'Продать TrainCoin'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Right column - Order book and trade history */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OrderBook />
            <TradeHistory />
          </div>
          
          {/* User order history */}
          <div className="bg-blue-900/30 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3">Мои ордера</h3>
            
            {isConnected ? (
              <>
                <div className="grid grid-cols-5 text-xs text-blue-300 mb-2">
                  <div>Тип</div>
                  <div className="text-right">Цена</div>
                  <div className="text-right">Объем</div>
                  <div className="text-right">Статус</div>
                  <div className="text-right">Действие</div>
                </div>
                
                <div className="space-y-2">
                  {generateOrderHistory().slice(0, 5).map((order) => (
                    <div key={order.id} className="grid grid-cols-5 text-xs bg-blue-800/30 rounded-lg p-2">
                      <div className={order.type === 'buy' ? 'text-green-400' : 'text-red-400'}>
                        {order.type === 'buy' ? 'Покупка' : 'Продажа'}
                      </div>
                      <div className="text-right text-white">${order.price.toFixed(5)}</div>
                      <div className="text-right text-white">{order.amount.toFixed(2)} TRC</div>
                      <div className="text-right">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {order.status === 'completed' ? 'Исполнен' :
                           order.status === 'pending' ? 'В ожидании' : 'Отменен'}
                        </span>
                      </div>
                      <div className="text-right">
                        {order.status === 'pending' && (
                          <button className="text-blue-400 hover:text-blue-300">
                            Отменить
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-blue-300 text-sm">Подключите кошелек, чтобы увидеть ваши ордера</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DexTrading; 