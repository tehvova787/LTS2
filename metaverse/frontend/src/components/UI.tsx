import React, { useState } from 'react';
import { useMetaverseStore } from '../stores/metaverseStore';
import './ui.css';
import ChatWindow from './ui/ChatWindow';
import NPCDialog from './ui/NPCDialog';
import Inventory from './ui/Inventory';
import TrainClickGame from './ui/TrainClickGame';
import CosmicPuzzleQuest from './ui/CosmicPuzzleQuest';
import CryptoTrainTycoon from './ui/CryptoTrainTycoon';
import RailwayControls from './ui/RailwayControls';

const UI: React.FC = () => {
  const { 
    activeNPC, 
    npcDialog, 
    closeNPCDialog,
    playerPosition
  } = useMetaverseStore();
  
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const [activeGame, setActiveGame] = useState<'train' | 'cosmic' | 'tycoon'>('train');
  const [showRailwayControls, setShowRailwayControls] = useState(false);

  // Toggle inventory visibility
  const toggleInventory = () => {
    setInventoryOpen(!inventoryOpen);
    
    // Close other UI elements when opening inventory
    if (!inventoryOpen) {
      setGameOpen(false);
      setShowRailwayControls(false);
    }
  };
  
  // Toggle game visibility
  const toggleGame = (game: 'train' | 'cosmic' | 'tycoon' = 'train') => {
    setActiveGame(game);
    setGameOpen(!gameOpen);
    
    // Close other UI elements when opening games
    if (!gameOpen) {
      setInventoryOpen(false);
      setShowRailwayControls(false);
    }
  };
  
  // Toggle railway controls visibility
  const toggleRailwayControls = () => {
    setShowRailwayControls(!showRailwayControls);
    
    // Close other UI elements when opening railway controls
    if (!showRailwayControls) {
      setInventoryOpen(false);
      setGameOpen(false);
    }
  };
  
  return (
    <div className="ui-container">
      {/* Chat Window */}
      <ChatWindow />
      
      {/* HUD Buttons */}
      <div className="hud-buttons">
        <button onClick={toggleInventory} className="hud-button inventory-button">
          Inventory
        </button>
        
        <button onClick={() => toggleGame('train')} className="hud-button game-button">
          Train Game
        </button>
        
        <button onClick={() => toggleGame('cosmic')} className="hud-button game-button">
          Cosmic Quest
        </button>
        
        <button onClick={() => toggleGame('tycoon')} className="hud-button game-button">
          Train Tycoon
        </button>
        
        <button onClick={toggleRailwayControls} className="hud-button railway-button">
          {showRailwayControls ? 'Hide Railway' : 'Railway Controls'}
        </button>
      </div>

      {/* Inventory (conditionally rendered) */}
      <div className={`overlay-panel inventory-panel ${inventoryOpen ? 'open' : ''}`}>
        {inventoryOpen && (
          <Inventory />
        )}
      </div>
      
      {/* Mini Games (conditionally rendered) */}
      <div className={`overlay-panel game-panel ${gameOpen ? 'open' : ''}`}>
        {gameOpen && (
          <div className="game-container">
            <div className="game-header">
              <h2>{activeGame === 'train' ? 'Train Clicker Game' : activeGame === 'cosmic' ? 'Cosmic Puzzle Quest' : 'Crypto Train Tycoon'}</h2>
              <button onClick={() => setGameOpen(false)} className="close-button">×</button>
            </div>
            
            <div className="game-content">
              {activeGame === 'train' && <TrainClickGame />}
              {activeGame === 'cosmic' && <CosmicPuzzleQuest />}
              {activeGame === 'tycoon' && <CryptoTrainTycoon />}
            </div>
          </div>
        )}
      </div>
      
      {/* Railway Controls Panel (conditionally rendered) */}
      {showRailwayControls && (
        <RailwayControls playerPosition={playerPosition} />
      )}

      {/* NPC Dialog (conditionally rendered) */}
      {activeNPC && npcDialog && (
        <NPCDialog 
          npc={activeNPC}
          dialog={npcDialog}
          onClose={closeNPCDialog}
        />
      )}
    </div>
  );
};

export default UI; 