import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './AddItem.css';

function AddItem({ addItemToCart }) {
  const [barcode, setBarcode] = useState('');
  const [itemDetails, setItemDetails] = useState({ name: '', price: '', quantity: 1 });
  const [scanning, setScanning] = useState(false);
  const navigate = useNavigate();
  const scannerRef = useRef(null);

  useEffect(() => {
    if (scanning && !scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: 250 },
        false
      );

      scannerRef.current.render(
        (decodedText) => {
          setBarcode(decodedText);
          setScanning(false);
          scannerRef.current.clear();
          scannerRef.current = null;
          handleBarcodeScanned(decodedText);
        },
        (error) => {
          console.warn(error);
        }
      );
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    };
  }, [scanning]);

  const handleBarcodeScanned = async (barcode) => {
    // Simulate fetching product details based on barcode
    // Replace this with actual API call
    const productDetails = await fetchProductDetails(barcode);
    setItemDetails({ ...productDetails, quantity: 1 });
  };

  const fetchProductDetails = async (barcode) => {
    // Simulate an API call to fetch product details
    // Replace this with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ name: 'Sample Item', price: 100 });
      }, 1000);
    });
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
      <h1>Scan Barcode</h1>
      <button onClick={() => setScanning(true)}>Scan Barcode</button>
      {scanning && <div id="reader" style={{ width: '300px', height: '300px' }}></div>}
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