'use client'
import React from 'react';
import { AnimatedWrapper } from '@/components/AnimatedWrapper';

export default function Analytics() {
  return (
    <AnimatedWrapper>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Trading Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/10 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
            <p>Coming soon...</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Market Analysis</h2>
            <p>Coming soon...</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Trading Insights</h2>
            <p>Coming soon...</p>
          </div>
        </div>
      </div>
    </AnimatedWrapper>
  );
} 