import React from 'react';
import { NPC, NPCDialog as NPCDialogType } from '../../stores/metaverseStore';

interface NPCDialogProps {
  npc: NPC;
  dialog: NPCDialogType;
  onClose: () => void;
}

const NPCDialog: React.FC<NPCDialogProps> = ({ npc, dialog, onClose }) => {
  const handleOptionClick = (optionIndex: number) => {
    // This would typically call a function from your store to send the response
    // For example: sendNPCDialogResponse(optionIndex);
    console.log(`Selected option ${optionIndex}: ${dialog.options[optionIndex].text}`);
  };

  return (
    <div className="npc-dialog">
      <div className="npc-dialog-header">
        {npc.name}, {npc.occupation}
      </div>
      
      <div className="npc-dialog-text">
        {dialog.text}
      </div>
      
      <div className="npc-dialog-options">
        {dialog.options.map((option, index) => (
          <div 
            key={index} 
            className="npc-dialog-option"
            onClick={() => handleOptionClick(index)}
          >
            {option.text}
          </div>
        ))}
      </div>
      
      <button 
        onClick={onClose}
        style={{
          marginTop: '15px',
          padding: '5px 10px',
          background: 'var(--primary-color)',
          border: 'none',
          borderRadius: '3px',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        Close
      </button>
    </div>
  );
};

export default NPCDialog; 