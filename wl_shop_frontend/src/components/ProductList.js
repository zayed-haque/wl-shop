import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router-dom for navigation

function ProductList({ show, handleClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchTerm(query);

    if (query.length > 0) {
      try {
        const response = await fetch(`https://0dmrp3hs-5000.inc1.devtunnels.ms/api/1/products/search?q=${query}`);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setProducts([]);
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
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
          <div className=''> <Button onClick={handleOpenBarcodePage}>Open Barcode Page</Button>
          <Button className="mx-3 my-3" onClick={handleCartPage}>GotoCart</Button></div>
         
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ProductList;