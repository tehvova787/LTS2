// Metaverse Web Integration Test Script

// Function to test iframe messaging
function testIframeMessaging() {
  console.log('Testing metaverse iframe integration...');
  
  // Check if we're in an iframe
  const isIframe = window.self !== window.top;
  console.log('Running in iframe:', isIframe);
  
  // Check WebXR support
  if (navigator.xr) {
    navigator.xr.isSessionSupported('immersive-vr')
      .then(supported => {
        console.log('WebXR immersive-vr supported:', supported);
        
        // Send test message to parent if in iframe
        if (isIframe) {
          console.log('Sending test message to parent window');
          window.parent.postMessage({
            type: 'metaverse-test',
            status: 'success',
            webxrSupported: supported
          }, '*');
        }
      })
      .catch(err => {
        console.error('Error checking WebXR support:', err);
        
        if (isIframe) {
          window.parent.postMessage({
            type: 'metaverse-test',
            status: 'error',
            error: err.message
          }, '*');
        }
      });
  } else {
    console.warn('WebXR API not available in this browser');
    
    if (isIframe) {
      window.parent.postMessage({
        type: 'metaverse-test',
        status: 'error',
        error: 'WebXR API not available'
      }, '*');
    }
  }
  
  // Listen for messages from parent window
  window.addEventListener('message', (event) => {
    console.log('Received message from parent:', event.data);
    
    // If we get an enter-vr message, simulate a response
    if (event.data?.type === 'enter-vr') {
      console.log('Received enter-vr command, simulating response');
      
      // Simulate VR session start/end
      window.parent.postMessage({ type: 'webxr-ready' }, '*');
      
      // After 2 seconds, simulate session end
      setTimeout(() => {
        window.parent.postMessage({ type: 'webxr-session-ended' }, '*');
      }, 2000);
    }
  });
}

// Run test when the script is loaded
testIframeMessaging();

// Export for debug console access
window.testMetaverseIntegration = testIframeMessaging; 