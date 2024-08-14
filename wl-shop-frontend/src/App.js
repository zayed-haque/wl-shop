import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Cart from './Cart';
import BarcodeScanner from './BarcodeScanner';
import ItemAdder from './ItemAdder';

function App() {
  const [cart, setCart] = useState([]);
  const [scannedItem, setScannedItem] = useState(null);

  const handleAddItem = (item) => {
      setCart([...cart, item]);
      setScannedItem(null); // Reset scanned item
  };

  const handleRemoveItem = (index) => {
      setCart(cart.filter((_, i) => i !== index));
  };

  const handleScanItem = (item) => {
      setScannedItem(item);
  };

  return (
      <div className="App">
          <h1>Walmart Self Checkout</h1>
          <Cart cart={cart} onRemoveItem={handleRemoveItem} />
          <BarcodeScanner onScanItem={handleScanItem} />
          {scannedItem && <ItemAdder item={scannedItem} onAddItem={handleAddItem} />}
      </div>
  );
}

export default App;
