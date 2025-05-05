const blockchain = require('./blockchain');

// In-memory database for parcels (in a production app, use a real database)
const parcels = {};
let parcelIdCounter = 1;

/**
 * Parcel Manager handles the creation, retrieval, and management of land parcels
 */
class ParcelManager {
  constructor() {
    this.parcels = parcels;
  }

  /**
   * Create a new parcel
   * @param {Object} parcelData - Parcel data
   * @returns {Object} Created parcel
   */
  createParcel(parcelData) {
    const parcelId = parcelIdCounter++;
    
    const newParcel = {
      id: parcelId,
      name: parcelData.name || `Parcel ${parcelId}`,
      x: parcelData.x,
      y: parcelData.y,
      z: parcelData.z,
      width: parcelData.width,
      height: parcelData.height,
      depth: parcelData.depth,
      owner: parcelData.owner || null,
      price: parcelData.price || 0,
      forSale: parcelData.forSale || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    parcels[parcelId] = newParcel;
    return newParcel;
  }

  /**
   * Get all parcels
   * @returns {Object} All parcels
   */
  getAllParcels() {
    return parcels;
  }

  /**
   * Get parcel by ID
   * @param {number} parcelId - Parcel ID
   * @returns {Object} Parcel
   */
  getParcelById(parcelId) {
    return parcels[parcelId];
  }

  /**
   * Get parcels by owner address
   * @param {string} ownerAddress - Owner's Ethereum address
   * @returns {Array} Array of parcels
   */
  getParcelsByOwner(ownerAddress) {
    return Object.values(parcels).filter(
      parcel => parcel.owner && parcel.owner.toLowerCase() === ownerAddress.toLowerCase()
    );
  }

  /**
   * Update parcel details
   * @param {number} parcelId - Parcel ID
   * @param {Object} updates - Updates to apply
   * @returns {Object} Updated parcel
   */
  updateParcel(parcelId, updates) {
    if (!parcels[parcelId]) {
      throw new Error(`Parcel ${parcelId} not found`);
    }
    
    // Prevent updating certain fields
    const safeUpdates = { ...updates };
    delete safeUpdates.id;
    delete safeUpdates.createdAt;
    
    // Apply updates
    parcels[parcelId] = {
      ...parcels[parcelId],
      ...safeUpdates,
      updatedAt: new Date().toISOString()
    };
    
    return parcels[parcelId];
  }

  /**
   * Transfer parcel ownership
   * @param {number} parcelId - Parcel ID
   * @param {string} newOwner - New owner's Ethereum address
   * @returns {Object} Updated parcel
   */
  transferParcel(parcelId, newOwner) {
    if (!parcels[parcelId]) {
      throw new Error(`Parcel ${parcelId} not found`);
    }
    
    parcels[parcelId] = {
      ...parcels[parcelId],
      owner: newOwner,
      forSale: false,
      updatedAt: new Date().toISOString()
    };
    
    return parcels[parcelId];
  }

  /**
   * Check if coordinates are within a parcel
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @param {number} z - Z coordinate
   * @returns {Object|null} Parcel or null if not in a parcel
   */
  getParcelAtCoordinates(x, y, z) {
    return Object.values(parcels).find(parcel => {
      return (
        x >= parcel.x && x < parcel.x + parcel.width &&
        y >= parcel.y && y < parcel.y + parcel.height &&
        z >= parcel.z && z < parcel.z + parcel.depth
      );
    }) || null;
  }

  /**
   * Check if a user can build at coordinates
   * @param {string} userAddress - User's Ethereum address
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @param {number} z - Z coordinate
   * @returns {boolean} Whether user can build
   */
  canUserBuildAt(userAddress, x, y, z) {
    const parcel = this.getParcelAtCoordinates(x, y, z);
    
    // If not in a parcel or no owner, can't build
    if (!parcel || !parcel.owner) {
      return false;
    }
    
    // If user is the owner, can build
    return parcel.owner.toLowerCase() === userAddress.toLowerCase();
  }

  /**
   * Create initial parcels for the world
   */
  createInitialParcels() {
    // Create a central plaza
    this.createParcel({
      name: "Central Plaza",
      x: -20,
      y: 0,
      z: -20,
      width: 40,
      height: 20,
      depth: 40,
      owner: null // Public area
    });
    
    // Create some parcels for sale
    for (let i = 0; i < 10; i++) {
      this.createParcel({
        name: `Parcel #${i+1}`,
        x: -100 + (i * 20),
        y: 0,
        z: 30,
        width: 15,
        height: 30,
        depth: 15,
        price: 0.1 + (i * 0.05),
        forSale: true
      });
    }
  }
}

module.exports = new ParcelManager(); 