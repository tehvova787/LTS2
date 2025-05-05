import { TextureLoader, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Asset Management System
export class AssetManager {
  private static instance: AssetManager;
  private modelCache: Map<string, any>;
  private textureCache: Map<string, any>;
  private gltfLoader: GLTFLoader;
  private textureLoader: TextureLoader;
  private loadingPromises: Map<string, Promise<any>>;
  private failedAssets: Set<string>; // Track failed assets
  private assetsDirectoryExists: boolean = false;

  // LOD system settings
  private lodLevels = {
    levels: [100, 500, 1000], // Distance thresholds
    polyReduction: [1.0, 0.5, 0.25] // Polygon reduction at each level
  };

  // Cache settings
  private cacheSize = 1024; // MB
  private useCompression = true;
  private priorityAssets = [
    "MainStation",
    "CommonTrainModels",
    "FrequentProps"
  ];

  private constructor() {
    this.modelCache = new Map();
    this.textureCache = new Map();
    this.loadingPromises = new Map();
    this.failedAssets = new Set();
    this.gltfLoader = new GLTFLoader();
    this.textureLoader = new TextureLoader();
    
    console.log('AssetManager initialized');
    this.checkAssetsDirectory();
  }

  // Check if assets directory exists
  private async checkAssetsDirectory(): Promise<void> {
    try {
      // Try to fetch a test file or directory listing
      const response = await fetch('/assets/test-asset.txt');
      this.assetsDirectoryExists = response.ok;
    } catch (error) {
      console.warn('Assets directory does not exist or is not accessible:', error);
      this.assetsDirectoryExists = false;
    }
    
    if (!this.assetsDirectoryExists) {
      console.warn('Assets directory is not accessible. Using fallback assets.');
    }
  }

  public static getInstance(): AssetManager {
    if (!AssetManager.instance) {
      AssetManager.instance = new AssetManager();
    }
    return AssetManager.instance;
  }

  // Preload essential assets for our railway metaverse
  public async preloadEssentialAssets(): Promise<void> {
    console.log('Preloading essential assets...');
    
    // Skip asset loading if directory doesn't exist
    if (!this.assetsDirectoryExists) {
      console.warn('Assets directory not accessible, using fallback assets');
      return Promise.resolve();
    }
    
    try {
      // First, try to ensure assets directory exists and is accessible
      const testPath = '/assets/test-asset.txt';
      await fetch(testPath)
        .catch(() => {
          console.warn('Assets directory test failed, using fallback assets');
          this.assetsDirectoryExists = false;
          return Promise.resolve(null);
        });
      
      // If directory check failed, don't attempt to load assets
      if (!this.assetsDirectoryExists) {
        return Promise.resolve();
      }
      
      const assetPromises = this.priorityAssets.map(assetName => 
        this.loadModel(`/assets/models/${assetName.toLowerCase()}.glb`)
          .catch(error => {
            console.warn(`Failed to preload essential asset: ${assetName}`, error);
            // Continue loading even if one asset fails
            return null;
          })
      );
      
      const results = await Promise.all(assetPromises);
      const loadedCount = results.filter(result => result !== null).length;
      console.log(`Essential assets preloaded successfully: ${loadedCount}/${this.priorityAssets.length}`);
      
      if (loadedCount < this.priorityAssets.length) {
        console.warn('Some essential assets failed to load. Using placeholder geometry.');
      }
    } catch (error) {
      console.error('Failed to preload essential assets:', error);
      console.warn('Using fallback placeholder assets instead');
      // Don't throw - we'll use fallbacks
    }
  }

  // Load a 3D model with caching
  public async loadModel(path: string): Promise<any> {
    // Skip loading if assets directory doesn't exist
    if (!this.assetsDirectoryExists) {
      return null;
    }
    
    // Check if this asset previously failed to load
    if (this.failedAssets.has(path)) {
      console.warn(`Skipping previously failed asset: ${path}`);
      return null;
    }
    
    // Check if the model is already cached
    if (this.modelCache.has(path)) {
      return this.modelCache.get(path);
    }
    
    // Check if the model is already being loaded
    if (this.loadingPromises.has(path)) {
      return this.loadingPromises.get(path);
    }
    
    // Add timeout to prevent hanging loads
    const loadPromiseWithTimeout = new Promise((resolve, reject) => {
      // Set a timeout for loading
      const timeout = setTimeout(() => {
        console.warn(`Loading timeout for model ${path}`);
        this.failedAssets.add(path);
        this.loadingPromises.delete(path);
        reject(new Error(`Timeout loading model: ${path}`));
      }, 10000); // 10 second timeout
      
      // Load the model
      this.gltfLoader.load(
        path,
        (gltf) => {
          clearTimeout(timeout);
          this.modelCache.set(path, gltf);
          resolve(gltf);
          this.loadingPromises.delete(path);
        },
        (xhr) => {
          const progress = (xhr.loaded / xhr.total) * 100;
          console.log(`Loading model ${path}: ${progress.toFixed(2)}%`);
        },
        (error) => {
          clearTimeout(timeout);
          console.error(`Error loading model ${path}:`, error);
          this.failedAssets.add(path); // Track failed asset
          this.loadingPromises.delete(path);
          reject(error);
        }
      );
    });
    
    this.loadingPromises.set(path, loadPromiseWithTimeout);
    return loadPromiseWithTimeout;
  }

  // Load a texture with caching
  public async loadTexture(path: string): Promise<any> {
    // Check if this asset previously failed to load
    if (this.failedAssets.has(path)) {
      console.warn(`Skipping previously failed asset: ${path}`);
      return null;
    }
    
    // Check if the texture is already cached
    if (this.textureCache.has(path)) {
      return this.textureCache.get(path);
    }
    
    // Load the texture
    const loadPromise = new Promise((resolve, reject) => {
      this.textureLoader.load(
        path,
        (texture) => {
          this.textureCache.set(path, texture);
          resolve(texture);
        },
        (xhr) => {
          const progress = (xhr.loaded / xhr.total) * 100;
          console.log(`Loading texture ${path}: ${progress.toFixed(2)}%`);
        },
        (error) => {
          console.error(`Error loading texture ${path}:`, error);
          this.failedAssets.add(path); // Track failed asset
          reject(error);
        }
      );
    });
    
    return loadPromise;
  }

  // Setup LOD (Level of Detail) system for a model
  public setupLODSystem(model: any, position: Vector3, cameraPosition: Vector3): number {
    const distance = position.distanceTo(cameraPosition);
    
    // Determine LOD level based on distance
    let lodLevel = 0;
    for (let i = 0; i < this.lodLevels.levels.length; i++) {
      if (distance > this.lodLevels.levels[i]) {
        lodLevel = i + 1;
      }
    }
    
    return lodLevel;
  }

  // Unload unused assets to free memory
  public unloadUnusedAssets(activeAssets: string[]): void {
    // Remove models that are not in the active assets list
    this.modelCache.forEach((value, key) => {
      if (!activeAssets.includes(key) && !this.isPriorityAsset(key)) {
        this.modelCache.delete(key);
      }
    });
    
    // Remove textures that are not in the active assets list
    this.textureCache.forEach((value, key) => {
      if (!activeAssets.includes(key) && !this.isPriorityAsset(key)) {
        this.textureCache.delete(key);
      }
    });
    
    console.log('Unused assets unloaded');
  }

  // Check if an asset is a priority asset
  private isPriorityAsset(path: string): boolean {
    return this.priorityAssets.some(asset => path.includes(asset.toLowerCase()));
  }

  // Get failed assets count
  public getFailedAssetsCount(): number {
    return this.failedAssets.size;
  }

  // Clear tracked failed assets to allow retry
  public clearFailedAssets(): void {
    this.failedAssets.clear();
    console.log('Failed assets cleared, will retry loading on next request');
  }

  // Optimize model for rendering based on settings
  public optimizeModel(model: any, settings: {
    maxTextureSize?: number,
    targetPolyCount?: number,
    generateLODs?: boolean,
    textureCompression?: string,
    normalMapCompression?: string
  }): any {
    // In a real implementation, this would apply the optimization settings
    // For now, we'll just return the model as is
    return model;
  }

  // Get the current cache size in MB
  public getCacheSize(): number {
    return this.modelCache.size + this.textureCache.size;
  }
}

// Asset integration class for railway metaverse
export class RailwayAssetIntegration {
  private assetManager: AssetManager;

  constructor() {
    this.assetManager = AssetManager.getInstance();
  }

  // Setup LOD system specifically for railway assets
  public setupRailwayLODSystem(): void {
    // This would be implemented with specific railway asset needs
    console.log('Railway LOD system set up');
  }

  // Cache railway-specific assets
  public cacheRailwayAssets(): void {
    const priorityRailAssets = [
      "MainStation",
      "CommonTrainModels",
      "FrequentProps",
      "TrackSections",
      "SignalingEquipment"
    ];
    
    console.log('Railway assets cached');
  }

  // Load a specific train model with appropriate LOD
  public async loadTrainModel(trainType: string, detailLevel: number): Promise<any> {
    try {
      const path = `/assets/models/trains/${trainType}_LOD${detailLevel}.glb`;
      return await this.assetManager.loadModel(path);
    } catch (error) {
      console.warn(`Failed to load train model: ${trainType}. Using fallback.`, error);
      return null;
    }
  }

  // Load a station model
  public async loadStationModel(stationType: string): Promise<any> {
    try {
      const path = `/assets/models/stations/${stationType}.glb`;
      return await this.assetManager.loadModel(path);
    } catch (error) {
      console.warn(`Failed to load station model: ${stationType}. Using fallback.`, error);
      return null;
    }
  }

  // Load track sections
  public async loadTrackSection(sectionType: string): Promise<any> {
    try {
      const path = `/assets/models/tracks/${sectionType}.glb`;
      return await this.assetManager.loadModel(path);
    } catch (error) {
      console.warn(`Failed to load track section: ${sectionType}. Using fallback.`, error);
      return null;
    }
  }
}

export default AssetManager; 