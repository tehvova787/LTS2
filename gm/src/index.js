import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { io } from 'socket.io-client';
import { renderMarketplaceUI } from './marketplace';

// Game state
let currentUser = null;
let otherPlayers = {};
let voxels = {};
let parcels = {};
let selectedColor = '#ff0000';
let flyMode = false;
let thirdPersonView = false;
let userWalletAddress = null;
let marketplaceUI = null;

// User interface elements
const coordinatesElement = document.getElementById('coordinates');
const usernameElement = document.getElementById('username');
const onlinePlayersElement = document.getElementById('online-players');
const colorOptions = document.querySelectorAll('.color-option');

// Setup color picker
colorOptions.forEach(option => {
  option.addEventListener('click', () => {
    colorOptions.forEach(o => o.classList.remove('selected'));
    option.classList.add('selected');
    selectedColor = option.dataset.color;
  });
});

// Three.js setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Sky blue background

// Setup lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 20, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Setup renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.getElementById('game-container').appendChild(renderer.domElement);

// Setup camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

// Setup controls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enabled = false;

const pointerLockControls = new PointerLockControls(camera, document.body);
scene.add(pointerLockControls.getObject());

// Add ground plane
const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555,
  roughness: 0.8,
  metalness: 0.2,
  side: THREE.DoubleSide
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Create grid helper
const gridHelper = new THREE.GridHelper(1000, 1000);
scene.add(gridHelper);

// Player character representation
const createPlayerModel = (color = 0xff0000) => {
  const group = new THREE.Group();
  
  // Body
  const bodyGeometry = new THREE.BoxGeometry(1, 1.5, 1);
  const bodyMaterial = new THREE.MeshStandardMaterial({ color });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 0.75;
  body.castShadow = true;
  group.add(body);
  
  // Head
  const headGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
  const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffdead });
  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.position.y = 1.8;
  head.castShadow = true;
  group.add(head);
  
  return group;
};

// Create current player model
const playerModel = createPlayerModel();
scene.add(playerModel);

// Initialize marketplace UI
marketplaceUI = renderMarketplaceUI(document.getElementById('game-container'), userWalletAddress);

// Handle teleport events from marketplace
document.addEventListener('teleportToParcel', (event) => {
  const { x, y, z } = event.detail;
  
  // Teleport player to the parcel
  if (pointerLockControls.isLocked) {
    pointerLockControls.unlock();
  }
  
  setTimeout(() => {
    // Set position directly
    pointerLockControls.getObject().position.set(x, y, z);
    playerModel.position.set(x, y - 1, z);
    
    // Lock controls again after teleport
    if (!thirdPersonView) {
      setTimeout(() => pointerLockControls.lock(), 500);
    }
  }, 300);
});

// Socket.io connection
const socket = io();

// Function to create a parcel visualization
function createParcelVisualization(parcel) {
  const width = parcel.width;
  const height = parcel.height;
  const depth = parcel.depth;
  
  // Create a wireframe box for the parcel
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshBasicMaterial({
    color: parcel.owner ? 0xff8800 : 0x00ff00,
    wireframe: true,
    transparent: true,
    opacity: 0.3
  });
  
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(
    parcel.x + width / 2,
    parcel.y + height / 2,
    parcel.z + depth / 2
  );
  
  // Add a text label with the parcel name
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 256;
  canvas.height = 64;
  context.fillStyle = '#ffffff';
  context.font = '24px Arial';
  context.fillText(parcel.name, 10, 40);
  
  const texture = new THREE.CanvasTexture(canvas);
  const labelMaterial = new THREE.SpriteMaterial({ map: texture });
  const label = new THREE.Sprite(labelMaterial);
  label.position.set(0, height / 2 + 2, 0);
  label.scale.set(5, 1.25, 1);
  
  mesh.add(label);
  mesh.userData.parcel = parcel;
  
  return mesh;
}

// Handle connection to the server
socket.on('connect', () => {
  console.log('Connected to the server');
  
  // Fetch parcels data
  fetch('/api/parcels')
    .then(response => response.json())
    .then(data => {
      // Store parcels
      parcels = data;
      
      // Visualize parcels
      Object.values(parcels).forEach(parcel => {
        const parcelMesh = createParcelVisualization(parcel);
        scene.add(parcelMesh);
      });
    })
    .catch(error => console.error('Error fetching parcels:', error));
});

// Handle initial data from the server
socket.on('init', (data) => {
  // Set current user
  currentUser = data.users[socket.id];
  usernameElement.textContent = currentUser.username;
  
  // Add other connected players
  Object.keys(data.users).forEach(id => {
    if (id !== socket.id) {
      addOtherPlayer(id, data.users[id]);
    }
  });
  
  // Update online players count
  updateOnlinePlayersCount();
  
  // Add existing voxels from the world
  Object.values(data.worldData.buildings).forEach(voxelData => {
    addVoxel(voxelData.position, voxelData.color);
  });
});

// Handle new player joining
socket.on('userJoined', (userData) => {
  addOtherPlayer(userData.id, userData);
  updateOnlinePlayersCount();
});

// Handle player movement
socket.on('userMoved', (data) => {
  if (otherPlayers[data.id]) {
    const player = otherPlayers[data.id];
    player.position.set(data.position.x, data.position.y, data.position.z);
    player.rotation.y = data.rotation.y;
  }
});

// Handle player disconnection
socket.on('userLeft', (id) => {
  removePlayer(id);
  updateOnlinePlayersCount();
});

// Handle new voxel built by any player
socket.on('voxelBuilt', (voxelData) => {
  addVoxel(voxelData.position, voxelData.color);
});

// Handle voxel removal
socket.on('voxelRemoved', (data) => {
  removeVoxel(data.position);
});

// Handle build permission denied
socket.on('buildDenied', (data) => {
  console.warn(`Building denied at ${data.position.x}, ${data.position.y}, ${data.position.z}: ${data.reason}`);
  // Show a notification to the user
  alert(`Cannot build here: ${data.reason}`);
});

// Add other player to the scene
function addOtherPlayer(id, userData) {
  const playerColor = Math.random() * 0xffffff;
  const player = createPlayerModel(playerColor);
  player.position.copy(userData.position);
  scene.add(player);
  otherPlayers[id] = player;
}

// Remove player from the scene
function removePlayer(id) {
  if (otherPlayers[id]) {
    scene.remove(otherPlayers[id]);
    delete otherPlayers[id];
  }
}

// Update the count of online players
function updateOnlinePlayersCount() {
  const count = Object.keys(otherPlayers).length + 1; // +1 for current user
  onlinePlayersElement.textContent = `Players online: ${count}`;
}

// Add a voxel to the scene
function addVoxel(position, color) {
  const key = `${position.x},${position.y},${position.z}`;
  
  if (!voxels[key]) {
    const voxelGeometry = new THREE.BoxGeometry(1, 1, 1);
    const voxelMaterial = new THREE.MeshStandardMaterial({ color });
    const voxel = new THREE.Mesh(voxelGeometry, voxelMaterial);
    
    voxel.position.set(position.x, position.y, position.z);
    voxel.castShadow = true;
    voxel.receiveShadow = true;
    
    scene.add(voxel);
    voxels[key] = voxel;
  }
}

// Remove a voxel from the scene
function removeVoxel(position) {
  const key = `${position.x},${position.y},${position.z}`;
  
  if (voxels[key]) {
    scene.remove(voxels[key]);
    delete voxels[key];
  }
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Handle click to place or remove voxels
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
  // Normalize mouse coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
  
  // Cast a ray and check for intersections
  const intersects = raycaster.intersectObjects(scene.children, false);
  
  if (intersects.length > 0) {
    const intersect = intersects[0];
    
    // Left click to place voxel
    if (event.button === 0) {
      const position = intersect.point.add(intersect.face.normal.multiplyScalar(0.5));
      position.x = Math.floor(position.x) + 0.5;
      position.y = Math.floor(position.y) + 0.5;
      position.z = Math.floor(position.z) + 0.5;
      
      socket.emit('buildVoxel', {
        position: { x: position.x, y: position.y, z: position.z },
        color: selectedColor,
        userAddress: userWalletAddress || 'guest'
      });
    } 
    // Right click to remove voxel
    else if (event.button === 2) {
      const object = intersect.object;
      
      // Only allow removing voxels, not the ground or players
      if (object !== ground && !Object.values(otherPlayers).includes(object) && object !== playerModel) {
        const position = object.position.clone();
        socket.emit('removeVoxel', { position });
      }
    }
  }
});

// Prevent context menu on right click
document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

// Movement controls
const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
  space: false,
  shift: false
};

document.addEventListener('keydown', (event) => {
  switch (event.key.toLowerCase()) {
    case 'w': keys.w = true; break;
    case 'a': keys.a = true; break;
    case 's': keys.s = true; break;
    case 'd': keys.d = true; break;
    case ' ': keys.space = true; break;
    case 'shift': keys.shift = true; break;
    case 'f': 
      flyMode = !flyMode;
      break;
    case 'c':
      thirdPersonView = !thirdPersonView;
      if (thirdPersonView) {
        camera.position.set(0, 4, 5);
        orbitControls.enabled = true;
        pointerLockControls.unlock();
      } else {
        camera.position.set(0, 2, 0);
        orbitControls.enabled = false;
        pointerLockControls.lock();
      }
      break;
    case 'm':
      // Connect wallet (mock implementation)
      connectWallet();
      break;
    case 'p':
      // Toggle marketplace visibility (alternative to clicking the button)
      document.querySelector('.marketplace-container')?.classList.toggle('visible');
      break;
  }
});

document.addEventListener('keyup', (event) => {
  switch (event.key.toLowerCase()) {
    case 'w': keys.w = false; break;
    case 'a': keys.a = false; break;
    case 's': keys.s = false; break;
    case 'd': keys.d = false; break;
    case ' ': keys.space = false; break;
    case 'shift': keys.shift = false; break;
  }
});

// Mock function to simulate connecting a wallet
function connectWallet() {
  if (window.ethereum) {
    console.log('Connecting to Ethereum wallet...');
    
    window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(accounts => {
        userWalletAddress = accounts[0];
        console.log('Connected wallet address:', userWalletAddress);
        
        // Update UI
        usernameElement.textContent = `${currentUser.username} (${userWalletAddress.substring(0, 6)}...${userWalletAddress.substring(userWalletAddress.length - 4)})`;
        
        // Update marketplace UI with wallet address
        if (marketplaceUI) {
          marketplaceUI.updateWalletAddress(userWalletAddress);
        }
      })
      .catch(error => {
        console.error('Error connecting to wallet:', error);
      });
  } else {
    // Mock wallet for testing
    userWalletAddress = '0x' + Math.random().toString(16).substring(2, 42);
    console.log('Mock wallet connected:', userWalletAddress);
    
    // Update UI
    usernameElement.textContent = `${currentUser.username} (${userWalletAddress.substring(0, 6)}...${userWalletAddress.substring(userWalletAddress.length - 4)})`;
    
    // Update marketplace UI with wallet address
    if (marketplaceUI) {
      marketplaceUI.updateWalletAddress(userWalletAddress);
    }
  }
}

// Lock controls when clicking on the canvas
renderer.domElement.addEventListener('click', () => {
  if (!thirdPersonView) {
    pointerLockControls.lock();
  }
});

// Movement speed
const SPEED = 0.1;
const RUN_MULTIPLIER = 2.0;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  // Handle movement
  if (pointerLockControls.isLocked) {
    const speedMultiplier = keys.shift ? RUN_MULTIPLIER : 1.0;
    
    if (keys.w) pointerLockControls.moveForward(SPEED * speedMultiplier);
    if (keys.s) pointerLockControls.moveForward(-SPEED * speedMultiplier);
    if (keys.a) pointerLockControls.moveRight(-SPEED * speedMultiplier);
    if (keys.d) pointerLockControls.moveRight(SPEED * speedMultiplier);
    
    if (flyMode) {
      if (keys.space) {
        pointerLockControls.getObject().position.y += SPEED * speedMultiplier;
      }
    }
    
    // Update player position
    const position = pointerLockControls.getObject().position;
    playerModel.position.copy(position);
    playerModel.position.y -= 1; // Adjust for camera height
    
    // Update coordinates display
    coordinatesElement.textContent = `Position: ${Math.floor(position.x)}, ${Math.floor(position.y)}, ${Math.floor(position.z)}`;
    
    // Send position update to server
    socket.emit('updatePosition', {
      position: {
        x: position.x,
        y: position.y,
        z: position.z
      },
      rotation: {
        y: camera.rotation.y
      }
    });
  }
  
  // Update orbit controls if in third person view
  if (thirdPersonView) {
    orbitControls.update();
    
    // Keep the orbit controls centered on the player
    orbitControls.target.copy(playerModel.position);
    orbitControls.target.y += 1; // Look at the player's head
  }
  
  renderer.render(scene, camera);
}

// Start the animation loop
animate(); 