import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';

const AddItem = ({ addItemToCart }) => {
  const [scanning, setScanning] = useState(false);
  const [barcode, setBarcode] = useState(null);
  const [itemDetails, setItemDetails] = useState({});
  const scannerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (scanning) {
      // Initialize the scanner
      scannerRef.current = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: 250 },
        false
      );
      scannerRef.current.render(handleBarcodeScanned);
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    };
  }, [scanning]);

  const handleBarcodeScanned = async (decodedText, decodedResult) => {
    // Simulate fetching product details based on barcode
    // Replace this with actual API call
    const productDetails = await fetchProductDetails(decodedText);
    setItemDetails({ ...productDetails, quantity: 1 });
    setBarcode(decodedText);
    setScanning(false); // Stop scanning after barcode is detected
  };

  const fetchProductDetails = async (barcode) => {
    // Simulate an API call to fetch product details
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
      <div>
        <h1>Scan Barcode</h1>
        <div id="reader" style={{ width: '100%' }}></div>
        {!scanning && <button onClick={() => setScanning(true)}>Start Scanning</button>}
        {barcode && <p>Scanned QR Code: {barcode}</p>}
      </div>
      {barcode && (
        <div>
          <h2>Item Details</h2>
          <div>
            <label htmlFor="name">Item Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={itemDetails.name || ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="price">Item Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={itemDetails.price || ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={itemDetails.quantity || ''}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={handleAddItem}>Add to Cart</button>
        </div>
      )}
    </div>
  );
};

export default AddItem;