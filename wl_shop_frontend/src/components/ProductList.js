import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router-dom for navigation

function ProductList({ show, handleClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchTerm(query);

    if (query.length > 0) {
      try {
        const response = await fetch(`https://wl-shop.onrender.com/api/2/products/search?q=${query}`);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setProducts([]);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities({
      ...quantities,
      [productId]: quantity,
    });
  };

  const getAccessToken = () => {
    const token = localStorage.getItem('accessToken');
    console.log('Access token retrieved:', token); // Verify token is retrieved
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

  return (
    <Modal show={show} onHide={handleClose} animation={false} dialogClassName="half-modal">
      <Modal.Header closeButton>
        <Modal.Title>Product List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='product-list-container'>
          <input className="search-bar" type="text" placeholder="Search products" onChange={handleSearch} value={searchTerm} />
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
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
          <div className=''> 
            <Button onClick={handleOpenBarcodePage}>Open Barcode Page</Button>
            <Button className="mx-3 my-3" onClick={handleCartPage}>GotoCart</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ProductList;