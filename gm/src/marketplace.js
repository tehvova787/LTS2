// Land Parcel Marketplace

/**
 * Fetch all parcels available for sale
 * @returns {Promise<Array>} List of parcels for sale
 */
export async function getParcelsForSale() {
  try {
    const response = await fetch('/api/parcels');
    const allParcels = await response.json();
    
    // Filter only parcels that are for sale
    return Object.values(allParcels).filter(parcel => parcel.forSale);
  } catch (error) {
    console.error('Error fetching parcels for sale:', error);
    return [];
  }
}

/**
 * Fetch parcels owned by a specific address
 * @param {string} address - Ethereum address of the owner
 * @returns {Promise<Array>} List of owned parcels
 */
export async function getParcelsByOwner(address) {
  try {
    const response = await fetch(`/api/parcels/owner/${address}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching owned parcels:', error);
    return [];
  }
}

/**
 * Purchase a parcel of land
 * @param {number} parcelId - ID of the parcel to purchase
 * @param {string} buyerAddress - Ethereum address of the buyer
 * @returns {Promise<Object>} Transaction result
 */
export async function purchaseParcel(parcelId, buyerAddress) {
  try {
    // In a real implementation, this would involve a blockchain transaction
    // For now, we'll just simulate the purchase with a server API call
    const response = await fetch(`/api/parcels/${parcelId}/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        buyerAddress
      })
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error purchasing parcel:', error);
    return { success: false, error: error.message };
  }
}

/**
 * List a parcel for sale
 * @param {number} parcelId - ID of the parcel to list
 * @param {number} price - Price in ETH
 * @param {string} ownerAddress - Ethereum address of the owner
 * @returns {Promise<Object>} Transaction result
 */
export async function listParcelForSale(parcelId, price, ownerAddress) {
  try {
    // In a real implementation, this would involve a blockchain transaction
    // For now, we'll just simulate the listing with a server API call
    const response = await fetch(`/api/parcels/${parcelId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        forSale: true,
        price
      })
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error listing parcel for sale:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Cancel a parcel sale listing
 * @param {number} parcelId - ID of the parcel to delist
 * @param {string} ownerAddress - Ethereum address of the owner
 * @returns {Promise<Object>} Transaction result
 */
export async function cancelParcelSale(parcelId, ownerAddress) {
  try {
    // In a real implementation, this would involve a blockchain transaction
    // For now, we'll just simulate the cancellation with a server API call
    const response = await fetch(`/api/parcels/${parcelId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        forSale: false
      })
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error cancelling parcel sale:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Create a simple UI for the marketplace
 * @param {Element} containerElement - DOM element to render the marketplace UI
 * @param {string} walletAddress - Connected wallet address
 */
export function renderMarketplaceUI(containerElement, walletAddress) {
  if (!containerElement) return;
  
  // Create marketplace elements
  const marketplaceContainer = document.createElement('div');
  marketplaceContainer.className = 'marketplace-container';
  marketplaceContainer.style.cssText = `
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    max-height: 80vh;
    overflow-y: auto;
    font-family: Arial, sans-serif;
    z-index: 1000;
    display: none;
  `;
  
  // Create toggle button
  const toggleButton = document.createElement('button');
  toggleButton.textContent = 'Marketplace';
  toggleButton.style.cssText = `
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    z-index: 1001;
  `;
  
  // Toggle marketplace visibility
  toggleButton.addEventListener('click', () => {
    const isVisible = marketplaceContainer.style.display === 'block';
    marketplaceContainer.style.display = isVisible ? 'none' : 'block';
    
    if (!isVisible) {
      // Refresh the marketplace content when showing
      updateMarketplaceContent();
    }
  });
  
  // Add header
  const header = document.createElement('h2');
  header.textContent = 'Land Marketplace';
  marketplaceContainer.appendChild(header);
  
  // Add tabs
  const tabsContainer = document.createElement('div');
  tabsContainer.className = 'marketplace-tabs';
  tabsContainer.style.cssText = `
    display: flex;
    margin-bottom: 15px;
  `;
  
  const forSaleTab = document.createElement('div');
  forSaleTab.textContent = 'For Sale';
  forSaleTab.className = 'marketplace-tab active';
  forSaleTab.style.cssText = `
    flex: 1;
    text-align: center;
    padding: 10px;
    background-color: #555;
    cursor: pointer;
    border-radius: 5px 0 0 5px;
  `;
  
  const myParcelsTab = document.createElement('div');
  myParcelsTab.textContent = 'My Parcels';
  myParcelsTab.className = 'marketplace-tab';
  myParcelsTab.style.cssText = `
    flex: 1;
    text-align: center;
    padding: 10px;
    background-color: #333;
    cursor: pointer;
    border-radius: 0 5px 5px 0;
  `;
  
  tabsContainer.appendChild(forSaleTab);
  tabsContainer.appendChild(myParcelsTab);
  marketplaceContainer.appendChild(tabsContainer);
  
  // Content container
  const contentContainer = document.createElement('div');
  contentContainer.className = 'marketplace-content';
  marketplaceContainer.appendChild(contentContainer);
  
  // Add elements to the container
  containerElement.appendChild(toggleButton);
  containerElement.appendChild(marketplaceContainer);
  
  // Handle tab switching
  let activeTab = 'forSale';
  
  forSaleTab.addEventListener('click', () => {
    if (activeTab !== 'forSale') {
      activeTab = 'forSale';
      forSaleTab.style.backgroundColor = '#555';
      myParcelsTab.style.backgroundColor = '#333';
      updateMarketplaceContent();
    }
  });
  
  myParcelsTab.addEventListener('click', () => {
    if (activeTab !== 'myParcels') {
      activeTab = 'myParcels';
      myParcelsTab.style.backgroundColor = '#555';
      forSaleTab.style.backgroundColor = '#333';
      updateMarketplaceContent();
    }
  });
  
  // Function to update marketplace content based on active tab
  async function updateMarketplaceContent() {
    // Clear current content
    contentContainer.innerHTML = '';
    
    if (activeTab === 'forSale') {
      // Show loading indicator
      contentContainer.innerHTML = '<p>Loading parcels for sale...</p>';
      
      // Fetch parcels for sale
      const parcelsForSale = await getParcelsForSale();
      
      // Clear loading indicator
      contentContainer.innerHTML = '';
      
      if (parcelsForSale.length === 0) {
        contentContainer.innerHTML = '<p>No parcels available for sale.</p>';
        return;
      }
      
      // Create listing for each parcel
      parcelsForSale.forEach(parcel => {
        const parcelCard = createParcelCard(parcel, 'buy');
        contentContainer.appendChild(parcelCard);
      });
    } else if (activeTab === 'myParcels') {
      if (!walletAddress) {
        contentContainer.innerHTML = '<p>Please connect your wallet to view your parcels.</p>';
        return;
      }
      
      // Show loading indicator
      contentContainer.innerHTML = '<p>Loading your parcels...</p>';
      
      // Fetch owned parcels
      const ownedParcels = await getParcelsByOwner(walletAddress);
      
      // Clear loading indicator
      contentContainer.innerHTML = '';
      
      if (ownedParcels.length === 0) {
        contentContainer.innerHTML = '<p>You don\'t own any parcels yet.</p>';
        return;
      }
      
      // Create listing for each owned parcel
      ownedParcels.forEach(parcel => {
        const parcelCard = createParcelCard(parcel, 'manage');
        contentContainer.appendChild(parcelCard);
      });
    }
  }
  
  // Create a card for a parcel
  function createParcelCard(parcel, mode) {
    const card = document.createElement('div');
    card.className = 'parcel-card';
    card.style.cssText = `
      background-color: #444;
      margin-bottom: 15px;
      padding: 15px;
      border-radius: 5px;
    `;
    
    // Parcel name
    const name = document.createElement('h3');
    name.textContent = parcel.name;
    name.style.margin = '0 0 10px 0';
    
    // Parcel details
    const details = document.createElement('p');
    details.innerHTML = `
      Size: ${parcel.width}x${parcel.height}x${parcel.depth}<br>
      Location: (${parcel.x}, ${parcel.y}, ${parcel.z})
    `;
    details.style.fontSize = '0.9em';
    details.style.margin = '0 0 10px 0';
    
    // Price
    const price = document.createElement('p');
    price.innerHTML = `<strong>Price: ${parcel.price} ETH</strong>`;
    price.style.fontSize = '1.1em';
    price.style.margin = '0 0 15px 0';
    
    // Actions
    const actions = document.createElement('div');
    actions.style.display = 'flex';
    actions.style.justifyContent = 'space-between';
    
    if (mode === 'buy') {
      // Buy button
      const buyButton = document.createElement('button');
      buyButton.textContent = 'Buy Parcel';
      buyButton.style.cssText = `
        background-color: #4CAF50;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 5px;
        cursor: pointer;
        flex-grow: 1;
      `;
      
      buyButton.addEventListener('click', async () => {
        if (!walletAddress) {
          alert('Please connect your wallet to purchase a parcel.');
          return;
        }
        
        // Confirm purchase
        if (confirm(`Are you sure you want to purchase "${parcel.name}" for ${parcel.price} ETH?`)) {
          try {
            // In a real app, this would trigger a blockchain transaction
            const result = await purchaseParcel(parcel.id, walletAddress);
            
            if (result.success) {
              alert(`Successfully purchased "${parcel.name}"!`);
              updateMarketplaceContent();
            } else {
              alert(`Failed to purchase: ${result.error}`);
            }
          } catch (error) {
            alert(`Transaction failed: ${error.message}`);
          }
        }
      });
      
      actions.appendChild(buyButton);
    } else if (mode === 'manage') {
      if (parcel.forSale) {
        // Cancel sale button
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel Sale';
        cancelButton.style.cssText = `
          background-color: #f44336;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 5px;
          cursor: pointer;
          flex-grow: 1;
        `;
        
        cancelButton.addEventListener('click', async () => {
          if (confirm(`Are you sure you want to cancel the sale of "${parcel.name}"?`)) {
            try {
              const result = await cancelParcelSale(parcel.id, walletAddress);
              
              if (result.success) {
                alert(`Sale cancelled for "${parcel.name}"`);
                updateMarketplaceContent();
              } else {
                alert(`Failed to cancel sale: ${result.error}`);
              }
            } catch (error) {
              alert(`Operation failed: ${error.message}`);
            }
          }
        });
        
        actions.appendChild(cancelButton);
      } else {
        // List for sale button
        const listButton = document.createElement('button');
        listButton.textContent = 'List for Sale';
        listButton.style.cssText = `
          background-color: #2196F3;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 5px;
          cursor: pointer;
          flex-grow: 1;
        `;
        
        listButton.addEventListener('click', async () => {
          const priceStr = prompt('Enter the price in ETH:');
          if (priceStr === null) return;
          
          const price = parseFloat(priceStr);
          if (isNaN(price) || price <= 0) {
            alert('Please enter a valid price.');
            return;
          }
          
          try {
            const result = await listParcelForSale(parcel.id, price, walletAddress);
            
            if (result.success) {
              alert(`"${parcel.name}" listed for sale at ${price} ETH`);
              updateMarketplaceContent();
            } else {
              alert(`Failed to list for sale: ${result.error}`);
            }
          } catch (error) {
            alert(`Operation failed: ${error.message}`);
          }
        });
        
        actions.appendChild(listButton);
      }
      
      // Teleport button
      const teleportButton = document.createElement('button');
      teleportButton.textContent = 'Teleport';
      teleportButton.style.cssText = `
        background-color: #9C27B0;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 5px;
        cursor: pointer;
        margin-left: 10px;
      `;
      
      teleportButton.addEventListener('click', () => {
        // Trigger teleport to parcel
        const event = new CustomEvent('teleportToParcel', {
          detail: {
            x: parcel.x + parcel.width / 2,
            y: parcel.y + 2, // Position slightly above ground
            z: parcel.z + parcel.depth / 2
          }
        });
        
        document.dispatchEvent(event);
        
        // Hide marketplace after teleporting
        marketplaceContainer.style.display = 'none';
      });
      
      actions.appendChild(teleportButton);
    }
    
    // Add elements to card
    card.appendChild(name);
    card.appendChild(details);
    card.appendChild(price);
    card.appendChild(actions);
    
    return card;
  }
  
  // Initial content update
  updateMarketplaceContent();
  
  return {
    updateWalletAddress: (newAddress) => {
      walletAddress = newAddress;
      if (marketplaceContainer.style.display === 'block') {
        updateMarketplaceContent();
      }
    }
  };
} 