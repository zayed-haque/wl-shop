import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QrReader from 'react-qr-barcode-scanner';

function AddItem({ addItemToCart }) {
  const [barcode, setBarcode] = useState('');
  const [itemDetails, setItemDetails] = useState({ name: '', price: '', quantity: 1 });
  const [data, setData] = useState('No result');
  const navigate = useNavigate();

  const handleScan = (result) => {
    if (result) {
      setData(result.text);
      setBarcode(result.text);
      // Fetch item details based on barcode (simulated here)
      setItemDetails({ name: 'Sample Item', price: 100, quantity: 1 });
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemDetails({ ...itemDetails, [name]: value });
  };

  const handleAddItem = () => {
    addItemToCart(itemDetails);
    navigate('/cart');
  };

  return (
    <div>
      <div>
        <h1>Scan Barcode</h1>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
          facingMode="environment"  // This selects the back camera on mobile devices.
        />

        <p>{data}</p>
      </div>
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
          <button onClick={handleAddItem}>Add Item</button>
        </div>
      )}
    </div>
  );
}

export default AddItem;