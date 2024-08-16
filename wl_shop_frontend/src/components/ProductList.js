import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import StoreMap from './StoreMap'; // Import the StoreMap component

function ProductList({ show, handleClose, searchTerm }) {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [showStoreMap, setShowStoreMap] = useState(false); // State for store map pop-up
  const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product
  const [productLocation, setProductLocation] = useState(null);
  const navigate = useNavigate();
  const storedQuery = searchTerm;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://wl-shop.onrender.com/api/2/products/search?q=${storedQuery}`);
        const data = await response.json();
        if (data.products.length > 0) {
          setProducts(data.products);
          setShowAlert(false);
        } else {
          setProducts([]);
          setShowAlert(true);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchProducts();
  }, [storedQuery]);

  const handleQuantityChange = (productId, quantity) => {
    setQuantities({
      ...quantities,
      [productId]: quantity,
    });
  };

  const getAccessToken = () => {
    const token = localStorage.getItem('accessToken');
    console.log('Access token retrieved:', token);
    return token;
  };

  const handleAddToCart = async (product, quantity) => {
    const payload = {
      product_id: product.id,
      quantity: quantity,
    };

    const token = getAccessToken();
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch('https://wl-shop.onrender.com/api/cart/add', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response status:', response.status);
        console.error('Response body:', errorText);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Item added to cart:', data);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handleOpenBarcodePage = () => {
    navigate('/add-item');
  };

  const handleCartPage = () => {
    navigate('/cart');
  };
  const handleLocateClick = async (product) => {
    try {
      const response = await fetch(`https://wl-shop.onrender.com/api/stores/2/inventory`);
      const data = await response.json();
      const productData = data.find(item => item.product_id === product.id);
      if (productData) {
        setProductLocation({ name: product.name, section: productData.section });
        setSelectedProduct(product);
        setShowStoreMap(true);
      } else {
        console.error('Product not found in inventory');
      }
    } catch (error) {
      console.error('Error fetching product location:', error);
    }
  };

  const handleCloseStoreMap = () => {
    setShowStoreMap(false);
    setSelectedProduct(null);
    setProductLocation(null);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false} dialogClassName="half-modal">
        <Modal.Header closeButton>
          <Modal.Title>Product List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='product-list-container'>
            {showAlert && <Alert variant="warning">No products found</Alert>}
            <div>
              {products.length > 0 ? (
                products.map((product) => (
                  <Card className='my-3' key={product.id}>
                    {product.image_url && <Card.Img variant="top" src={product.image_url} />}
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>{product.description}</Card.Text>
                      <Card.Text>Price: Rs{product.price}</Card.Text>
                      <Form.Group controlId={`quantity-${product.id}`}>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                          type="number"
                          min="1"
                          value={quantities[product.id] || 1}
                          onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                        />
                      </Form.Group>
                      <Button
                        className="mt-2"
                        onClick={() => handleAddToCart(product, quantities[product.id] || 1)}
                      >
                        <b>Add to Cart  </b>
                        <img src = "images/add-shopping-cart.svg" alt="Add to Cart" />
                      </Button>
                      <Button
                        className="mt-2 mx-3"
                        variant="info"
                        style={{ color: 'white' , backgroundColor: '#31AA00'}}
                        onClick={() => handleLocateClick(product)}
                      >
                        <b>Locate  </b>
                        <img src = "images/locate.svg" alt="locate" />
                      </Button>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                !showAlert && <p>No products found</p>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {selectedProduct && (
        <StoreMap
          show={showStoreMap}
          handleClose={handleCloseStoreMap}
          product={selectedProduct}
          location={productLocation}
        />
      )}
    </>
  );
}

export default ProductList;