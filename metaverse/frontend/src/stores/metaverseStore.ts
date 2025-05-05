import { create } from 'zustand';
import { Vector3 } from 'three';

// Types
export interface User {
  id: string;
  username: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: number;
  avatar: {
    model: string;
    skin_color: string;
    hair_style: string;
    hair_color: string;
    outfit: string;
  };
}

export interface NPC {
  id: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: number;
  state: string;
  name: string;
  occupation: string;
  mood: string;
  appearance: {
    hair_color: string;
    eye_color: string;
    skin_tone: string;
    height: string;
    build: string;
    age: number;
    distinctive_feature: string;
  };
}

export interface ChatMessage {
  sender: string;
  text: string;
  timestamp: number;
}

export interface DialogOption {
  text: string;
  action: string;
}

export interface NPCDialog {
  npcId: string;
  text: string;
  options: DialogOption[];
}

export interface WorldChunk {
  position: {
    x: number;
    y: number;
    z: number;
  };
  size: number;
  heightmap: number[][];
  vegetation: VegetationObject[];
  structures: StructureObject[];
}

// Define types for vegetation and structures to replace any
export interface VegetationObject {
  type: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  scale: {
    x: number;
    y: number;
    z: number;
  };
  rotation: number;
}

export interface StructureObject {
  type: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  scale: {
    x: number;
    y: number;
    z: number;
  };
  rotation: number;
  properties?: Record<string, unknown>;
}

export interface GameReward {
  type: 'ticket' | 'nft' | 'token';
  code: string;
  timestamp: number;
  message: string;
}

interface MetaverseState {
  // Connection state
  isConnected: boolean;
  socket: WebSocket | null;
  connectionError: string | null;
  initialize: () => Promise<void>;
  disconnect: () => void;
  
  // Player state
  userId: string | null;
  userInfo: User | null;
  playerPosition: { x: number, y: number, z: number };
  updatePlayerPosition: (position: { x: number, y: number, z: number }) => void;
  
  // World state
  worldChunks: WorldChunk[];
  fetchWorldChunks: (position: { x: number, y: number, z: number }) => Promise<void>;
  
  // NPCs
  npcs: NPC[];
  activeNPC: NPC | null;
  npcDialog: NPCDialog | null;
  interactWithNPC: (npcId: string) => Promise<void>;
  sendNPCDialogResponse: (optionIndex: number) => Promise<void>;
  closeNPCDialog: () => void;
  
  // Chat
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => Promise<void>;
  
  // Games and rewards
  gameRewards: GameReward[];
  addGameReward: (reward: GameReward) => void;
  
  // Error handling
  hasError: boolean;
  error: string | null;
  clearError: () => void;
  setError: (error: string) => void;
}

// API URL
const API_URL = 'http://localhost:8000';
const WS_URL = 'ws://localhost:8000/ws';

// Default world data for fallback
const DEFAULT_WORLD_CHUNKS: WorldChunk[] = [
  {
    position: { x: 0, y: 0, z: 0 },
    size: 100,
    heightmap: [[0, 0], [0, 0]],
    vegetation: [],
    structures: []
  }
];

// Create store
export const useMetaverseStore = create<MetaverseState>((set, get) => ({
  // Connection state
  isConnected: false,
  socket: null,
  connectionError: null,
  
  // Error state
  hasError: false,
  error: null,
  
  initialize: async () => {
    try {
      // Reset error state
      set({ hasError: false, error: null, connectionError: null });
      
      // Create WebSocket connection
      const socket = new WebSocket(WS_URL);
      
      socket.onopen = () => {
        console.log('Connected to metaverse server');
        set({ isConnected: true, socket });
      };
      
      socket.onclose = (event) => {
        console.log(`Disconnected from metaverse server: ${event.code} ${event.reason}`);
        
        // Set a friendly error message based on close code
        let errorMessage = "Disconnected from metaverse server.";
        if (event.code === 1006) {
          errorMessage = "Connection to metaverse server closed unexpectedly. Please check if the server is running.";
        }
        
        set({ 
          isConnected: false, 
          socket: null,
          connectionError: errorMessage
        });
      };
      
      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        set({ 
          connectionError: "Failed to establish connection to metaverse server. Please check if the server is running." 
        });
      };
      
      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          handleSocketMessage(message, set, get);
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };
      
      // Generate temporary user ID if not available
      const userId = localStorage.getItem('metaverse_user_id') || `user_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('metaverse_user_id', userId);
      
      set({ userId });
      
      // Fetch initial world data
      try {
        await get().fetchWorldChunks(get().playerPosition);
      } catch (err) {
        console.warn('Failed to fetch initial world data, using default world:', err);
        set({ worldChunks: DEFAULT_WORLD_CHUNKS });
      }
      
      // Load saved game rewards from localStorage
      try {
        const savedRewards = localStorage.getItem('metaverse_game_rewards');
        if (savedRewards) {
          const gameRewards = JSON.parse(savedRewards);
          set({ gameRewards });
        }
      } catch (error) {
        console.error('Failed to load saved game rewards:', error);
      }
    } catch (error) {
      console.error('Failed to initialize metaverse:', error);
      set({ 
        hasError: true, 
        error: "Failed to initialize the metaverse. Please try again later." 
      });
      throw error;
    }
  },
  
  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.close();
    }
    set({ isConnected: false, socket: null });
  },
  
  // Player state
  userId: null,
  userInfo: null,
  playerPosition: { x: 0, y: 0, z: 0 },
  
  updatePlayerPosition: (position) => {
    const { socket, isConnected } = get();
    
    set({ playerPosition: position });
    
    // Send position update to server
    if (socket && isConnected) {
      try {
        socket.send(JSON.stringify({
          type: 'movement',
          data: {
            ...position,
            rotation: 0 // Add rotation if needed
          }
        }));
      } catch (error) {
        console.error('Error sending position update:', error);
      }
    }
  },
  
  // World state
  worldChunks: [],
  
  fetchWorldChunks: async (position) => {
    try {
      const response = await fetch(
        `${API_URL}/api/world/chunks?x=${position.x}&y=${position.y}&z=${position.z}&view_distance=2`,
        { signal: AbortSignal.timeout(5000) } // 5 second timeout
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch world chunks: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      set({ worldChunks: data.chunks });
    } catch (error) {
      console.error('Error fetching world chunks:', error);
      
      // If there are no chunks loaded yet, use default chunks
      if (get().worldChunks.length === 0) {
        set({ worldChunks: DEFAULT_WORLD_CHUNKS });
      }
      
      // Only throw if this wasn't a timeout
      if (!(error instanceof DOMException && error.name === 'TimeoutError')) {
        throw error;
      }
    }
  },
  
  // NPCs
  npcs: [],
  activeNPC: null,
  npcDialog: null,
  
  interactWithNPC: async (npcId) => {
    const { socket, isConnected, npcs } = get();
    
    // Find the NPC in our current list
    const npc = npcs.find(n => n.id === npcId);
    if (!npc) return;
    
    set({ activeNPC: npc });
    
    // Send interaction request to server
    if (socket && isConnected) {
      try {
        socket.send(JSON.stringify({
          type: 'interaction',
          data: {
            target_id: npcId,
            interaction_type: 'greet',
            user_name: get().userInfo?.username || 'Traveler'
          }
        }));
      } catch (error) {
        console.error('Error sending NPC interaction:', error);
        get().setError("Failed to interact with NPC. Please try again.");
      }
    }
  },
  
  sendNPCDialogResponse: async (optionIndex) => {
    const { socket, isConnected, npcDialog, activeNPC } = get();
    
    if (!npcDialog || !activeNPC || optionIndex >= npcDialog.options.length) return;
    
    const selectedOption = npcDialog.options[optionIndex];
    
    // Send dialog response to server
    if (socket && isConnected) {
      try {
        socket.send(JSON.stringify({
          type: 'interaction',
          data: {
            target_id: activeNPC.id,
            interaction_type: 'ask',
            question: selectedOption.text
          }
        }));
      } catch (error) {
        console.error('Error sending dialog response:', error);
        get().setError("Failed to send response. Please try again.");
      }
    }
  },
  
  closeNPCDialog: () => {
    set({ npcDialog: null, activeNPC: null });
  },
  
  // Chat
  chatMessages: [],
  
  sendChatMessage: async (text) => {
    const { socket, isConnected, chatMessages } = get();
    
    if (!text.trim()) return;
    
    // Add message to local chat
    const newMessage = {
      sender: get().userInfo?.username || 'You',
      text,
      timestamp: Date.now()
    };
    
    set({ chatMessages: [...chatMessages, newMessage] });
    
    // Send to server
    if (socket && isConnected) {
      try {
        socket.send(JSON.stringify({
          type: 'chat',
          data: {
            message: text,
            target_id: null // null means broadcast to nearby users
          }
        }));
      } catch (error) {
        console.error('Error sending chat message:', error);
        get().setError("Failed to send message. Please try again.");
      }
    }
  },
  
  // Games and rewards
  gameRewards: [],
  
  addGameReward: (reward) => {
    const { gameRewards, socket, isConnected } = get();
    const updatedRewards = [...gameRewards, reward];
    
    // Update state
    set({ gameRewards: updatedRewards });
    
    // Save to localStorage
    try {
      localStorage.setItem('metaverse_game_rewards', JSON.stringify(updatedRewards));
    } catch (error) {
      console.error('Failed to save game rewards:', error);
    }
    
    // Notify server about the reward (if connected)
    if (socket && isConnected) {
      try {
        socket.send(JSON.stringify({
          type: 'game_reward',
          data: {
            reward_type: reward.type,
            reward_code: reward.code,
            timestamp: reward.timestamp
          }
        }));
      } catch (error) {
        console.error('Error sending reward notification:', error);
      }
    }
  },
  
  // Error handling
  clearError: () => {
    set({ hasError: false, error: null });
  },
  
  setError: (error) => {
    set({ hasError: true, error });
    // Auto-clear minor errors after 5 seconds
    setTimeout(() => {
      // Only clear if it's still the same error
      if (get().error === error) {
        get().clearError();
      }
    }, 5000);
  }
}));

// Helper function to handle socket messages
function handleSocketMessage(message: { type: string; data: unknown }, set: any, get: any) {
  try {
    const { type, data } = message;
    
    switch (type) {
      case 'user_state':
        // Update user info
        set({ userInfo: data });
        break;
        
      case 'chat':
        // Add received chat message
        const newChatMessage = {
          sender: data.username,
          text: data.message,
          timestamp: Date.now()
        };
        set({ chatMessages: [...get().chatMessages, newChatMessage] });
        break;
        
      case 'chat_response':
        // Handle NPC chat response
        if (get().activeNPC && data.from === get().activeNPC.id) {
          set({
            npcDialog: {
              npcId: data.from,
              text: data.message,
              options: [
                { text: 'Tell me about yourself', action: 'ask_self' },
                { text: 'What do you do here?', action: 'ask_occupation' },
                { text: 'Goodbye', action: 'farewell' }
              ]
            }
          });
        }
        break;
        
      case 'npc_state':
        // Update NPC state
        const updatedNpcs = get().npcs.map((npc: NPC) => 
          npc.id === data.id ? { ...npc, ...data } : npc
        );
        
        // If it's a new NPC, add it to the list
        if (!get().npcs.find((npc: NPC) => npc.id === data.id)) {
          updatedNpcs.push(data);
        }
        
        set({ npcs: updatedNpcs });
        
        // If this is the active NPC, update it
        if (get().activeNPC && get().activeNPC.id === data.id) {
          set({ activeNPC: data });
        }
        break;
        
      case 'npcs_nearby':
        // Set all nearby NPCs
        set({ npcs: data.npcs });
        break;
        
      case 'game_reward_ack':
        // Server acknowledged the reward
        console.log('Reward acknowledged by server:', data);
        break;
        
      case 'error':
        // Handle server error
        console.error('Server error:', data);
        get().setError(data.message || "An error occurred");
        break;
    }
  } catch (error) {
    console.error('Error handling socket message:', error);
  }
} 