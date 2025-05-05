import React from 'react';
import { useMetaverseStore } from '../../stores/metaverseStore';

const Inventory: React.FC = () => {
  // This would typically come from your store
  const inventoryItems = [
    { id: 'item1', name: 'Health Potion', description: 'Restores health', quantity: 3 },
    { id: 'item2', name: 'Magic Scroll', description: 'Contains a spell', quantity: 1 },
    { id: 'item3', name: 'Gold Coin', description: 'Currency', quantity: 25 },
  ];

  const handleUseItem = (itemId: string) => {
    console.log(`Using item ${itemId}`);
    // This would typically call a function from your store
    // For example: useItem(itemId);
  };

  const handleDropItem = (itemId: string) => {
    console.log(`Dropping item ${itemId}`);
    // This would typically call a function from your store
    // For example: dropItem(itemId);
  };

  return (
    <div className="inventory">
      <h3>Inventory</h3>
      
      <div className="inventory-items">
        {inventoryItems.length === 0 ? (
          <div className="empty-inventory">Your inventory is empty</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="item-name">{item.name}</div>
                    <div className="item-description">{item.description}</div>
                  </td>
                  <td>{item.quantity}</td>
                  <td>
                    <button 
                      onClick={() => handleUseItem(item.id)}
                      style={{ marginRight: '5px' }}
                    >
                      Use
                    </button>
                    <button 
                      onClick={() => handleDropItem(item.id)}
                    >
                      Drop
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Inventory; 