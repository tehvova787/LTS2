/**
 * Service for launching and communicating with the TTC_002 application
 */

interface TTC002Event {
  type: string;
  data: any;
}

class TTC002LauncherService {
  private static instance: TTC002LauncherService;
  private eventListeners: Map<string, ((data: any) => void)[]>;
  private isApplicationRunning: boolean = false;
  private applicationPath: string = '/TTC_002/TTC_002_Showcase.exe';
  
  private constructor() {
    this.eventListeners = new Map();
    
    // Listen for messages from the application (if running in an iframe)
    window.addEventListener('message', this.handleMessage);
  }
  
  /**
   * Get the singleton instance
   */
  public static getInstance(): TTC002LauncherService {
    if (!TTC002LauncherService.instance) {
      TTC002LauncherService.instance = new TTC002LauncherService();
    }
    return TTC002LauncherService.instance;
  }
  
  /**
   * Launch the TTC_002 application
   * @param params Optional parameters to pass to the application
   * @returns Promise that resolves when the application is launched
   */
  public launchApplication(params: Record<string, string> = {}): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        // Convert params to URL parameters
        const queryParams = new URLSearchParams(params).toString();
        const fullPath = `${this.applicationPath}${queryParams ? '?' + queryParams : ''}`;
        
        // Open the application in a new window
        const appWindow = window.open(fullPath, '_blank');
        
        if (appWindow) {
          this.isApplicationRunning = true;
          resolve(true);
          
          // Listen for the window being closed
          const checkWindowClosed = setInterval(() => {
            if (appWindow.closed) {
              this.isApplicationRunning = false;
              clearInterval(checkWindowClosed);
              this.emit('application-closed', {});
            }
          }, 1000);
        } else {
          console.error('Failed to open TTC_002 application');
          resolve(false);
        }
      } catch (error) {
        console.error('Error launching TTC_002 application:', error);
        resolve(false);
      }
    });
  }
  
  /**
   * Check if the application is running
   */
  public isRunning(): boolean {
    return this.isApplicationRunning;
  }
  
  /**
   * Send data to the application
   * @param eventType Event type
   * @param data Event data
   */
  public sendToApplication(eventType: string, data: any): void {
    if (!this.isApplicationRunning) {
      console.warn('Cannot send data: TTC_002 application is not running');
      return;
    }
    
    // Try to communicate via postMessage (if in iframe)
    try {
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage({ type: eventType, data }, '*');
        }
      });
    } catch (error) {
      console.error('Error sending data to TTC_002 application:', error);
    }
  }
  
  /**
   * Register an event listener
   * @param eventType Event type to listen for
   * @param callback Callback function
   */
  public on(eventType: string, callback: (data: any) => void): void {
    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, []);
    }
    
    this.eventListeners.get(eventType)?.push(callback);
  }
  
  /**
   * Remove an event listener
   * @param eventType Event type
   * @param callback Callback function to remove
   */
  public off(eventType: string, callback: (data: any) => void): void {
    const listeners = this.eventListeners.get(eventType);
    if (!listeners) return;
    
    const index = listeners.indexOf(callback);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  }
  
  /**
   * Emit an event to all registered listeners
   * @param eventType Event type
   * @param data Event data
   */
  private emit(eventType: string, data: any): void {
    const listeners = this.eventListeners.get(eventType);
    if (!listeners) return;
    
    listeners.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in TTC_002 event listener for ${eventType}:`, error);
      }
    });
  }
  
  /**
   * Handle messages from the application
   */
  private handleMessage = (event: MessageEvent): void => {
    try {
      const { type, data } = event.data as TTC002Event;
      if (type && data) {
        this.emit(type, data);
      }
    } catch (error) {
      // Ignore messages that aren't in the expected format
    }
  }
  
  /**
   * Clean up event listeners
   */
  public cleanup(): void {
    window.removeEventListener('message', this.handleMessage);
  }
}

export default TTC002LauncherService; 