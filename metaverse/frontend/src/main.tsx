import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

// Global error handler
const handleError = (error: Error) => {
  console.error('Application error:', error);
  // Display a simple fallback UI for critical errors
  document.body.innerHTML = `
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; background-color: #121212; color: white; text-align: center; padding: 20px;">
      <h1 style="margin-bottom: 20px; color: #59c2ff;">TON Metaverse</h1>
      <p style="margin-bottom: 30px; max-width: 500px;">An error occurred while loading the metaverse. Please try refreshing the page.</p>
      <button 
        style="padding: 12px 25px; background-color: #4a72b0; border: none; border-radius: 5px; color: white; cursor: pointer;" 
        onclick="window.location.reload()">
        Reload Application
      </button>
    </div>
  `;
};

try {
  // Create root element if it doesn't exist
  let rootElement = document.getElementById('root');
  if (!rootElement) {
    rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);
  }

  // Mount the application
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  handleError(error as Error);
} 