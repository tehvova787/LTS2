'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiService } from '../../services/aiService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function GlobalAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! Я ваш AI-ассистент по вопросам криптовалют, трейдинга и блокчейна. Чем могу помочь?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);

  // Sample questions for quick selection
  const sampleQuestions = [
    'Что такое стейкинг?',
    'Как начать торговать на бирже?',
    'Что такое блокчейн?',
    'Какие стратегии трейдинга существуют?',
    'Как работают смарт-контракты?',
  ];

  // Handle sending a message
  const handleSend = async () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    try {
      // Get AI response
      const response = await aiService.sendMessage(inputValue);
      
      // Add AI response
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: 'Извините, произошла ошибка при обработке вашего запроса. Пожалуйста, попробуйте еще раз.',
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle sample question click
  const handleSampleQuestion = (question: string) => {
    setInputValue(question);
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Chat Button */}
      <motion.button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Открыть чат с AI-ассистентом"
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
                    <h3 className="font-bold text-white">AI-ассистент</h3>
                    <p className="text-sm text-gray-300">Всегда готов помочь</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 rounded-full bg-gray-800 bg-opacity-50 flex items-center justify-center hover:bg-opacity-70 text-white"
                  aria-label="Закрыть чат"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-950">
                <div className="space-y-4">
                  {messages.map(message => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-xl p-3 ${
                          message.sender === 'user' 
                            ? 'bg-blue-600 text-white rounded-tr-none' 
                            : 'bg-gray-800 border border-gray-700 text-white rounded-tl-none'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1 text-right">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-800 border border-gray-700 rounded-xl rounded-tl-none p-3">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Quick Questions */}
              <div className="p-3 border-t border-gray-800 bg-gray-900">
                <p className="text-xs text-gray-400 mb-2">Быстрые вопросы:</p>
                <div className="flex flex-wrap gap-2">
                  {sampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSampleQuestion(question)}
                      className="bg-gray-800 hover:bg-gray-700 text-sm rounded-full px-3 py-1 text-white"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Input */}
              <div className="p-3 flex gap-2 border-t border-gray-800 bg-gray-900">
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Задайте вопрос о криптовалютах..."
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500 text-white"
                />
                <button
                  onClick={handleSend}
                  disabled={inputValue.trim() === ''}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-full h-10 w-10 flex items-center justify-center text-white"
                  aria-label="Отправить сообщение"
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