import React, { useState, useEffect, useRef, useContext } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { FaBarcode, FaSearch } from 'react-icons/fa';
import './AddItem.css'; // We'll create this CSS file for custom styles

const AddItem = () => {
  const { addItemToCart } = useContext(CartContext);
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

  const handleBarcodeScanned = async (decodedText) => {
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
        price: parseFloat(data.price) || 0,
        description: data.description,
        image_url: data.image_url
      };
    } catch (error) {
      console.error('Error fetching product details:', error);
      return { name: 'Unknown Product', price: 0, description: '', image_url: '' };
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemDetails({ ...itemDetails, [name]: name === 'price' ? parseFloat(value) || 0 : value });
  };

  const handleAddItem = () => {
    if (addItemToCart && itemDetails.name && itemDetails.price >= 0) {
      addItemToCart(itemDetails);
      setIsModalOpen(false);
      navigate('/cart');
    } else {
      alert('Invalid item details. Please ensure name and price are valid.');
    }
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
    <Container className="add-item-container">
      <h1 className="text-center mb-4">Add Item to Cart</h1>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Scan Barcode</Card.Title>
              <div id="reader" className="mb-3"></div>
              <Button 
                variant="primary" 
                onClick={() => setScanning(!scanning)}
                className="w-100"
              >
                <FaBarcode className="me-2" />
                {scanning ? 'Stop Scanning' : 'Start Scanning'}
              </Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>Manual Input</Card.Title>
              <Form onSubmit={(e) => { e.preventDefault(); handleManualInput(); }}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter Item Name or Barcode"
                    value={manualBarcode}
                    onChange={(e) => setManualBarcode(e.target.value)}
                  />
                </Form.Group>
                <Button variant="secondary" type="submit" className="w-100">
                  <FaSearch className="me-2" />
                  Search Item
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Item Details"
        className="item-details-modal"
        overlayClassName="item-details-overlay"
      >
        <h2>Item Details</h2>
        <img src={itemDetails.image_url} alt={itemDetails.name} className="item-image" />
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={itemDetails.name || ''}
              onChange={handleInputChange}
              readOnly
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={itemDetails.price || ''}
              onChange={handleInputChange}
              readOnly
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={itemDetails.quantity || 1}
              onChange={handleInputChange}
              min="1"
            />
          </Form.Group>
          <Button variant="primary" onClick={handleAddItem} className="me-2">Add to Cart</Button>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
        </Form>
      </Modal>
    </Container>
  );
};

export default AddItem;