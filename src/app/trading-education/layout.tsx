import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Trading Education Platform',
  description: 'Learn trading with our personalized AI ecosystem that adapts to your skill level and learning style',
};

export default function TradingEducationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { name: 'Dashboard', href: '/trading-education/dashboard' },
    { name: 'Courses', href: '/trading-education/courses' },
    { name: 'Analytics', href: '/trading-education/analytics' },
    { name: 'Practice', href: '/trading-education/practice' },
    { name: 'Profile', href: '/trading-education/profile' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <header className="border-b border-gray-800 sticky top-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Link href="/trading-education">
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">🚀</span>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  AI Trading Education
                </h1>
              </div>
            </Link>
          </div>
          <nav className="flex items-center gap-1 md:gap-2">
            {navItems.map((item) => (
              <Link href={item.href} key={item.href}>
                <div
                  className="px-3 py-2 rounded-md hover:bg-gray-800 text-sm md:text-base font-medium"
                >
                  {item.name}
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </header>
      
      <main>{children}</main>
      
      <footer className="border-t border-gray-800 py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">AI Trading Education</h3>
            <p className="text-gray-400 text-sm">
              Learn trading with our personalized AI ecosystem that adapts to your skill level and learning style.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 text-sm">
              Have questions? Our AI assistant is available 24/7 to help you.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors duration-200">
              Chat with AI Assistant
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} AI Trading Education. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 