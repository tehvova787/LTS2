'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ExchangePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">Биржевая торговля</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Начните свой путь в мире криптотрейдинга с нашей платформой
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8"
          >
            <h2 className="text-2xl font-semibold mb-4">Руководство по биржам</h2>
            <p className="text-gray-300 mb-6">
              Подробные инструкции по работе с популярными криптобиржами
            </p>
            <Link href="/exchange/guide" legacyBehavior>
              <motion.a
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition-all block text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Руководство по биржам
              </motion.a>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8"
          >
            <h2 className="text-2xl font-semibold mb-4">Торговый симулятор</h2>
            <p className="text-gray-300 mb-6">
              Практикуйте торговлю в безопасной среде без риска потери средств
            </p>
            <Link href="/trading/simulator" legacyBehavior>
              <motion.a
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-all block text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Попробовать симулятор
              </motion.a>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-semibold mb-8">Почему стоит начать с нами?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Безопасность</h3>
              <p className="text-gray-300">
                Тренируйтесь без риска потери реальных средств
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Обучение</h3>
              <p className="text-gray-300">
                Подробные руководства и обучающие материалы
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Практика</h3>
              <p className="text-gray-300">
                Реальные рыночные условия в симуляторе
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 