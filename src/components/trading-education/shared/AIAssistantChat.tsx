'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export default function AIAssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I\'m your AI Trading Assistant. How can I help you with your trading education today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  
  // Sample questions for quick selection
  const sampleQuestions = [
    'What is a support level?',
    'How do I calculate position size?',
    'Explain candlestick patterns',
    'What is risk management?'
  ];

  const handleSend = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInputValue('');
    
    // Simulate AI response (would be API call in real implementation)
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        sender: 'ai',
        text: getAIResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleSampleQuestion = (question: string) => {
    setInputValue(question);
  };

  // Mock AI response generator
  const getAIResponse = (userMessage: string): string => {
    const userMessageLower = userMessage.toLowerCase();
    
    if (userMessageLower.includes('support') || userMessageLower.includes('resistance')) {
      return "Support and resistance are key price levels where a market has previously had difficulty moving beyond. Support is a level where price tends to find, well, support, and bounce upward. Resistance is a level where price tends to meet resistance and bounce downward. These levels are important because they indicate trader and investor psychology.";
    }
    
    if (userMessageLower.includes('position size') || userMessageLower.includes('sizing')) {
      return "Position sizing is determining how much of an asset to buy or sell. The proper position size depends on your account size, risk tolerance, and the specific trade setup. A common rule is risking no more than 1-2% of your account on any single trade. The formula is: Position Size = (Account Size × Risk Percentage) ÷ Risk per Share.";
    }
    
    if (userMessageLower.includes('candlestick')) {
      return "Candlestick patterns are visual representations of price movements. Each candlestick shows the open, high, low, and close prices. Common patterns include Doji, Hammer, Engulfing patterns, and Morning/Evening Stars. These patterns can signal potential market reversals or continuations when interpreted correctly.";
    }
    
    if (userMessageLower.includes('risk management')) {
      return "Risk management in trading involves strategies to control potential losses. Key principles include: 1) Only risk a small percentage of your capital per trade (typically 1-2%), 2) Always use stop-loss orders, 3) Maintain a favorable risk-to-reward ratio (at least 1:2), 4) Diversify your trades, and 5) Never risk more than you can afford to lose.";
    }
    
    return "That's a great question about trading. I'd be happy to help you understand this concept better. Would you like me to provide some specific examples or point you to relevant lessons in your current courses?";
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-2xl">🤖</span>
      </motion.button>
      
      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-900 rounded-xl overflow-hidden w-full max-w-lg max-h-[80vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-4 border-b border-gray-700 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center mr-3">
                    <span className="text-xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="font-bold">AI Trading Assistant</h3>
                    <p className="text-sm text-gray-300">Always here to help</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 rounded-full bg-gray-800 bg-opacity-50 flex items-center justify-center hover:bg-opacity-70"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-xl p-3 ${
                        message.sender === 'user' 
                          ? 'bg-blue-600 rounded-tr-none' 
                          : 'bg-gray-800 border border-gray-700 rounded-tl-none'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1 text-right">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Quick Questions */}
              <div className="p-3 border-t border-gray-800">
                <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {sampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSampleQuestion(question)}
                      className="bg-gray-800 hover:bg-gray-700 text-sm rounded-full px-3 py-1"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Input */}
              <div className="p-3 border-t border-gray-800 flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSend()}
                  placeholder="Ask anything about trading..."
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSend}
                  disabled={inputValue.trim() === ''}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-full h-10 w-10 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 