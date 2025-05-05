const axios = require('axios');
const Web3 = require('web3');
const parcelManager = require('./parcelManager');
const blockchain = require('./blockchain');
require('dotenv').config();

/**
 * MetaverseIntegration class handles connecting the Voxel World to external metaverse platforms
 * It provides functionality for:
 * 1. Cross-platform identity verification
 * 2. Asset portability between metaverses
 * 3. Shared events and experiences
 * 4. Economy bridging
 */
class MetaverseIntegration {
  constructor() {
    this.connectedMetaverses = [];
    this.metaverseGateways = {
      decentraland: process.env.DECENTRALAND_GATEWAY || 'https://api.decentraland.org',
      sandbox: process.env.SANDBOX_GATEWAY || 'https://api.sandbox.game',
      otherverse: process.env.OTHERVERSE_GATEWAY || 'https://api.otherverse.io'
    };

    // Initialize the connection to the metaverse bridge if available
    this.bridgeUrl = process.env.METAVERSE_BRIDGE_URL;
    this.bridgeApiKey = process.env.METAVERSE_BRIDGE_API_KEY;
    
    this.initialized = false;
  }

  /**
   * Initialize connections to supported metaverses
   */
  async initialize() {
    console.log('Initializing metaverse integrations...');
    
    try {
      // Connect to bridge service if configured
      if (this.bridgeUrl && this.bridgeApiKey) {
        const response = await axios.post(`${this.bridgeUrl}/connect`, {
          apiKey: this.bridgeApiKey,
          serviceName: 'Voxel World',
          serviceEndpoint: process.env.SERVICE_ENDPOINT || `http://localhost:${process.env.PORT || 8080}`
        });
        
        if (response.data.success) {
          this.connectedMetaverses = response.data.connectedMetaverses || [];
          console.log(`Connected to metaverse bridge with ${this.connectedMetaverses.length} metaverses.`);
          this.initialized = true;
        } else {
          console.error('Failed to connect to metaverse bridge:', response.data.error);
        }
      } else {
        console.log('No metaverse bridge configured. Metaverse features will be limited.');
      }
    } catch (error) {
      console.error('Error initializing metaverse integration:', error);
    }
  }

  /**
   * Verify a user's identity across different metaverse platforms
   * @param {string} userAddress - The user's blockchain address
   * @param {string} signature - The signed message to verify identity
   * @returns {Promise<Object>} Information about the user's metaverse identities
   */
  async verifyMetaverseIdentity(userAddress, signature) {
    if (!this.initialized) {
      return { success: false, error: 'Metaverse integration not initialized' };
    }
    
    try {
      const response = await axios.post(`${this.bridgeUrl}/verify-identity`, {
        userAddress,
        signature,
        apiKey: this.bridgeApiKey
      });
      
      return response.data;
    } catch (error) {
      console.error('Error verifying metaverse identity:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Import a user's assets from connected metaverses
   * @param {string} userAddress - The user's blockchain address
   * @returns {Promise<Object>} The imported assets information
   */
  async importUserAssets(userAddress) {
    if (!this.initialized) {
      return { success: false, error: 'Metaverse integration not initialized' };
    }
    
    try {
      const response = await axios.get(`${this.bridgeUrl}/assets/${userAddress}`, {
        headers: { 'X-API-Key': this.bridgeApiKey }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error importing user assets:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Export a voxel creation to other metaverses
   * @param {Object} voxelData - The voxel data to export
   * @param {string} userAddress - The creator's address
   * @param {string[]} targetMetaverses - List of metaverses to export to
   * @returns {Promise<Object>} The export results
   */
  async exportVoxelCreation(voxelData, userAddress, targetMetaverses) {
    if (!this.initialized) {
      return { success: false, error: 'Metaverse integration not initialized' };
    }
    
    try {
      const response = await axios.post(`${this.bridgeUrl}/export`, {
        voxelData,
        userAddress,
        targetMetaverses,
        apiKey: this.bridgeApiKey
      });
      
      return response.data;
    } catch (error) {
      console.error('Error exporting voxel creation:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Broadcast an event to connected metaverses
   * @param {string} eventType - Type of event to broadcast
   * @param {Object} eventData - Event data to broadcast
   * @returns {Promise<Object>} The broadcast results
   */
  async broadcastEvent(eventType, eventData) {
    if (!this.initialized) {
      return { success: false, error: 'Metaverse integration not initialized' };
    }
    
    try {
      const response = await axios.post(`${this.bridgeUrl}/broadcast`, {
        eventType,
        eventData,
        apiKey: this.bridgeApiKey
      });
      
      return response.data;
    } catch (error) {
      console.error('Error broadcasting event to metaverses:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get current events happening in connected metaverses
   * @returns {Promise<Object>} Events from connected metaverses
   */
  async getMetaverseEvents() {
    if (!this.initialized) {
      return { success: false, error: 'Metaverse integration not initialized' };
    }
    
    try {
      const response = await axios.get(`${this.bridgeUrl}/events`, {
        headers: { 'X-API-Key': this.bridgeApiKey }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error getting metaverse events:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new MetaverseIntegration(); 