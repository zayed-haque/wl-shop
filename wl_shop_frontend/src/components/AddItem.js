import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import Modal from 'react-modal';

const AddItem = ({ addItemToCart }) => {
  const [scanning, setScanning] = useState(false);
  const [barcode, setBarcode] = useState(null);
  const [manualBarcode, setManualBarcode] = useState('');
  const [itemDetails, setItemDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scannerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (scanning) {
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
    const productDetails = await fetchProductDetails(decodedText);
    setItemDetails({ ...productDetails, quantity: 1 });
    setBarcode(decodedText);
    setScanning(false); 
    setIsModalOpen(true); 
  };

  const fetchProductDetails = async (barcode) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${barcode}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return {
        name: data.name,
        price: data.price,
        description: data.description,
        image_url: data.image_url
      };
    } catch (error) {
      console.error('Error fetching product details:', error);
      return {};
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemDetails({ ...itemDetails, [name]: value });
  };

  const handleAddItem = () => {
    addItemToCart(itemDetails);
    setIsModalOpen(false);
    navigate('/cart');
  };

  const handleReturnToApp = () => {
    navigate('/');
  };

  const handleManualInput = async () => {
    if (!manualBarcode) {
      alert("Please Enter Item Name or Barcode");
      return;
    }
    const productDetails = await fetchProductDetails(manualBarcode);
    setItemDetails({ ...productDetails, quantity: 1 });
    setBarcode(manualBarcode);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1>Add items</h1>
      <div id="reader" style={{ width: '100%' }}></div>
      {!scanning && <button onClick={() => setScanning(true)}>Scan Barcode</button>}
      {barcode && <p>Scanned QR Code: {barcode}</p>}

      <div>
        <h2>Or Search Item</h2>
        <input
          type="text"
          placeholder="Enter Item or Barcode"
          value={manualBarcode}
          onChange={(e) => setManualBarcode(e.target.value)}
        />
        <button onClick={handleManualInput}>Search</button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Item Details"
        style={{
          content: {
            width: '300px',
            height: 'auto',
            margin: 'auto',
            padding: '20px',
            borderRadius: '10px',
          },
        }}
      >
        <h2>Item Details</h2>
        <p>Scanned QR Code: {barcode}</p>
        <img src={itemDetails.image_url} alt={itemDetails.name} style={{ width: '100%' }} />
        <div>
          <label htmlFor="name">Item Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={itemDetails.name || ''}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="price">Item Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={itemDetails.price || ''}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={itemDetails.quantity || ''}
            min="1"
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleAddItem}>Add to Cart</button>
        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
      </Modal>
      <button onClick={handleReturnToApp}>Return to App</button>
    </div>
  );
};

export default AddItem;