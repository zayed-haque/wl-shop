import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function AddItem({ addItemToCart }) {
  const [barcode, setBarcode] = useState('');
  const [itemDetails, setItemDetails] = useState({ name: '', price: '', quantity: 1 });
  const history = useHistory();

  const handleBarcodeScan = (e) => {
    // Simulate barcode scanning
    const scannedBarcode = '1234567890'; // Replace with actual barcode scanning logic
    setBarcode(scannedBarcode);
    // Fetch item details based on barcode (simulated here)
    setItemDetails({ name: 'Sample Item', price: 100, quantity: 1 });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemDetails({ ...itemDetails, [name]: value });
  };

  const handleAddItem = () => {
    addItemToCart(itemDetails);
    history.push('/cart');
  };

  return (
    <div>
      <h1>Scan Barcode</h1>
      <button onClick={handleBarcodeScan}>Scan Barcode</button>
      {barcode && (
        <div>
          <h2>Item Details</h2>
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={itemDetails.name}
            onChange={handleInputChange}
            readOnly
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={itemDetails.price}
            onChange={handleInputChange}
            readOnly
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={itemDetails.quantity}
            onChange={handleInputChange}
          />
          <button onClick={handleAddItem}>Add to Cart</button>
        </div>
      )}
    </div>
  );
}

export default AddItem;