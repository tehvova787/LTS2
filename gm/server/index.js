const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const parcelManager = require('./parcelManager');
const blockchain = require('./blockchain');
const metaverseIntegration = require('./metaverseIntegration');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// Initialize world with parcels
parcelManager.createInitialParcels();

// Initialize metaverse integration
metaverseIntegration.initialize().then(() => {
  console.log('Metaverse integration initialized');
}).catch(err => {
  console.error('Failed to initialize metaverse integration:', err);
});

// API Routes
const apiRouter = express.Router();

// Get all parcels
apiRouter.get('/parcels', (req, res) => {
  const parcels = parcelManager.getAllParcels();
  res.json(parcels);
});

// Get parcel by ID
apiRouter.get('/parcels/:id', (req, res) => {
  const parcel = parcelManager.getParcelById(req.params.id);
  
  if (!parcel) {
    return res.status(404).json({ error: 'Parcel not found' });
  }
  
  res.json(parcel);
});

// Get parcels by owner
apiRouter.get('/parcels/owner/:address', (req, res) => {
  const parcels = parcelManager.getParcelsByOwner(req.params.address);
  res.json(parcels);
});

// Update parcel details (requires authentication in real app)
apiRouter.put('/parcels/:id', (req, res) => {
  try {
    const parcel = parcelManager.updateParcel(req.params.id, req.body);
    res.json(parcel);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Purchase a parcel
apiRouter.post('/parcels/:id/purchase', (req, res) => {
  try {
    const { buyerAddress } = req.body;
    const parcelId = req.params.id;
    
    if (!buyerAddress) {
      return res.status(400).json({ success: false, error: 'Buyer address is required' });
    }
    
    const parcel = parcelManager.getParcelById(parcelId);
    
    if (!parcel) {
      return res.status(404).json({ success: false, error: 'Parcel not found' });
    }
    
    if (!parcel.forSale) {
      return res.status(400).json({ success: false, error: 'Parcel is not for sale' });
    }
    
    // In a real app, you would verify payment on the blockchain
    // For demo, we'll just transfer ownership directly
    const updatedParcel = parcelManager.transferParcel(parcelId, buyerAddress);
    
    // Broadcast parcel update to all connected users
    io.emit('parcelUpdated', updatedParcel);
    
    res.json({ 
      success: true, 
      message: `Successfully purchased parcel #${parcelId}`,
      parcel: updatedParcel
    });
  } catch (error) {
    console.error('Error purchasing parcel:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Check if a user can build at coordinates
apiRouter.get('/can-build', (req, res) => {
  const { address, x, y, z } = req.query;
  
  if (!address || x === undefined || y === undefined || z === undefined) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }
  
  const canBuild = parcelManager.canUserBuildAt(address, parseInt(x), parseInt(y), parseInt(z));
  res.json({ canBuild });
});

// Metaverse Integration API Routes
apiRouter.post('/metaverse/verify-identity', async (req, res) => {
  const { userAddress, signature } = req.body;
  
  if (!userAddress || !signature) {
    return res.status(400).json({ success: false, error: 'User address and signature are required' });
  }
  
  try {
    const result = await metaverseIntegration.verifyMetaverseIdentity(userAddress, signature);
    res.json(result);
  } catch (error) {
    console.error('Error verifying metaverse identity:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.get('/metaverse/assets/:userAddress', async (req, res) => {
  try {
    const result = await metaverseIntegration.importUserAssets(req.params.userAddress);
    res.json(result);
  } catch (error) {
    console.error('Error importing user assets:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.post('/metaverse/export', async (req, res) => {
  const { voxelData, userAddress, targetMetaverses } = req.body;
  
  if (!voxelData || !userAddress) {
    return res.status(400).json({ success: false, error: 'Voxel data and user address are required' });
  }
  
  try {
    const result = await metaverseIntegration.exportVoxelCreation(
      voxelData, 
      userAddress, 
      targetMetaverses || []
    );
    res.json(result);
  } catch (error) {
    console.error('Error exporting voxel creation:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.get('/metaverse/events', async (req, res) => {
  try {
    const events = await metaverseIntegration.getMetaverseEvents();
    res.json(events);
  } catch (error) {
    console.error('Error getting metaverse events:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Mount API routes
app.use('/api', apiRouter);

// Store connected users and their positions
const connectedUsers = {};
// Store world data - in a real implementation, this would be in a database
const worldData = {
  parcels: parcelManager.getAllParcels(),
  buildings: {}
};

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  // Add user to the connected users list
  connectedUsers[socket.id] = {
    id: socket.id,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    username: `Guest_${Math.floor(Math.random() * 1000)}`
  };
  
  // Send initial world state to the new user
  socket.emit('init', {
    users: connectedUsers,
    worldData: worldData
  });
  
  // Broadcast to other users that a new user joined
  socket.broadcast.emit('userJoined', connectedUsers[socket.id]);
  
  // Handle user movement updates
  socket.on('updatePosition', (data) => {
    if (connectedUsers[socket.id]) {
      connectedUsers[socket.id].position = data.position;
      connectedUsers[socket.id].rotation = data.rotation;
      
      // Broadcast the updated position to all other users
      socket.broadcast.emit('userMoved', {
        id: socket.id,
        position: data.position,
        rotation: data.rotation
      });
    }
  });
  
  // Handle user building/editing
  socket.on('buildVoxel', (data) => {
    const { position, color } = data;
    const key = `${position.x},${position.y},${position.z}`;
    
    // Check if user has permission to build here
    // In a real app, you would check against blockchain ownership
    // For now, we'll just check if the position is within a parcel
    const userAddress = data.userAddress || 'guest';
    const canBuild = parcelManager.canUserBuildAt(userAddress, position.x, position.y, position.z);
    
    if (canBuild || userAddress === 'guest') {
      // Store the voxel data
      if (!worldData.buildings[key]) {
        worldData.buildings[key] = {
          position,
          color,
          owner: socket.id
        };
        
        // Broadcast the new voxel to all users
        io.emit('voxelBuilt', worldData.buildings[key]);
      }
    } else {
      // Send permission denied message to the user
      socket.emit('buildDenied', { position, reason: 'You do not own this land' });
    }
  });
  
  // Handle removing voxels
  socket.on('removeVoxel', (data) => {
    const { position } = data;
    const key = `${position.x},${position.y},${position.z}`;
    
    if (worldData.buildings[key]) {
      // In a real app, check if user has permission to remove
      delete worldData.buildings[key];
      io.emit('voxelRemoved', { position });
    }
  });
  
  // Handle metaverse identity registration
  socket.on('registerMetaverseIdentity', async (data) => {
    const { userAddress, signature } = data;
    
    if (userAddress && signature) {
      const result = await metaverseIntegration.verifyMetaverseIdentity(userAddress, signature);
      
      if (result.success && connectedUsers[socket.id]) {
        // Update user with metaverse identity information
        connectedUsers[socket.id].metaverseIdentity = result.identities;
        connectedUsers[socket.id].userAddress = userAddress;
        
        // Notify user of successful metaverse identity verification
        socket.emit('metaverseIdentityVerified', result);
        
        // Broadcast metaverse avatar update if available
        if (result.avatarUrl) {
          socket.broadcast.emit('userAvatarUpdated', {
            id: socket.id,
            avatarUrl: result.avatarUrl
          });
        }
      } else {
        socket.emit('metaverseIdentityError', { error: result.error || 'Verification failed' });
      }
    }
  });
  
  // Handle importing assets from connected metaverses
  socket.on('importMetaverseAssets', async (data) => {
    const { userAddress } = data;
    
    if (userAddress) {
      const result = await metaverseIntegration.importUserAssets(userAddress);
      
      socket.emit('metaverseAssetsImported', result);
    }
  });
  
  // Handle exporting voxel creations to other metaverses
  socket.on('exportToMetaverse', async (data) => {
    const { voxelData, userAddress, targetMetaverses } = data;
    
    if (voxelData && userAddress) {
      const result = await metaverseIntegration.exportVoxelCreation(
        voxelData, 
        userAddress, 
        targetMetaverses || []
      );
      
      socket.emit('metaverseExportResult', result);
    }
  });
  
  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    
    // Broadcast to all users that someone disconnected
    io.emit('userLeft', socket.id);
    
    // Remove user from connected users
    delete connectedUsers[socket.id];
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 