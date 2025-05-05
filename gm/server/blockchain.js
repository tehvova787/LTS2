const Web3 = require('web3');
require('dotenv').config();

// Check if Ethereum provider is available
let web3;
if (process.env.ETHEREUM_PROVIDER_URL) {
  web3 = new Web3(process.env.ETHEREUM_PROVIDER_URL);
} else {
  console.log('No Ethereum provider URL found in environment variables. Blockchain features disabled.');
}

// Simple ABI for an ERC-721 NFT contract for land parcels
const landParcelABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
    ],
    "name": "ownerOf",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
      { "internalType": "string", "name": "uri", "type": "string" }
    ],
    "name": "mintLandParcel",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
    "name": "tokenURI",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  }
];

class BlockchainManager {
  constructor() {
    this.web3 = web3;
    this.landContract = null;
    
    if (this.web3 && process.env.LAND_CONTRACT_ADDRESS) {
      this.landContract = new this.web3.eth.Contract(
        landParcelABI,
        process.env.LAND_CONTRACT_ADDRESS
      );
    }
  }
  
  // Check if a user owns a specific land parcel
  async isOwnerOfParcel(userAddress, parcelId) {
    if (!this.landContract) {
      console.log('Land contract not initialized');
      return false;
    }
    
    try {
      const owner = await this.landContract.methods.ownerOf(parcelId).call();
      return owner.toLowerCase() === userAddress.toLowerCase();
    } catch (error) {
      console.error('Error checking parcel ownership:', error);
      return false;
    }
  }
  
  // Mint a new land parcel NFT
  async mintParcel(toAddress, parcelId, metadata) {
    if (!this.landContract) {
      console.log('Land contract not initialized');
      return null;
    }
    
    try {
      const metadataURI = `ipfs://${metadata.ipfsHash}`;
      
      // In a real app, this would require a transaction from an admin account
      // This is just a placeholder for the actual minting process
      console.log(`Minting parcel #${parcelId} to ${toAddress} with URI ${metadataURI}`);
      
      // This is just for demonstration - in a real implementation, you would use the actual contract method
      return {
        success: true,
        transactionHash: '0x' + Array(64).fill('0').map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
        parcelId
      };
    } catch (error) {
      console.error('Error minting parcel:', error);
      return { success: false, error: error.message };
    }
  }
  
  // Get metadata URI for a specific land parcel
  async getParcelMetadata(parcelId) {
    if (!this.landContract) {
      console.log('Land contract not initialized');
      return null;
    }
    
    try {
      const uri = await this.landContract.methods.tokenURI(parcelId).call();
      return uri;
    } catch (error) {
      console.error('Error getting parcel metadata:', error);
      return null;
    }
  }
}

module.exports = new BlockchainManager(); 