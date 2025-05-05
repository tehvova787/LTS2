import React, { useState, useRef, useEffect } from 'react';
import { useMetaverseStore } from '../../stores/metaverseStore';
import type { ChatMessage } from '../../stores/metaverseStore';

const ChatWindow: React.FC = () => {
  const { chatMessages, sendChatMessage } = useMetaverseStore();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendChatMessage(message);
      setMessage('');
    }
  };

  // Format timestamp to readable time
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {chatMessages.map((msg, index) => (
          <div key={index} className="chat-message">
            <span className="chat-time">{formatTime(msg.timestamp)}</span>
            <span className="chat-sender">{msg.sender}:</span>
            <span className="chat-text">{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="chat-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatWindow; 