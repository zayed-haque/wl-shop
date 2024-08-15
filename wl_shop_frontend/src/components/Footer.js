import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import ProductList from './ProductList'; 

function Footer() {
  const [showProductList, setShowProductList] = useState(false);
  const navigate = useNavigate();

  const handleShowProductList = () => setShowProductList(true);
  const handleCloseProductList = () => setShowProductList(false);

  const handleScannerClick = () => {
    navigate('/add-item');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <footer className="app-footer bg-light fixed-bottom">
      <div className="container">
        <div className="row text-center">
          <div className="col">
            <button className="btn btn-light" onClick={handleShowProductList}>
              <img src='/images/search.png' alt="" style={{ width: '24px', height: '24px' }} />
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="col">
            <button className="btn btn-light" onClick={handleScannerClick}>
              <img src='/images/barcode-scan.png' alt="" style={{ width: '24px', height: '24px' }} />
              <i className="fas fa-barcode"></i>
            </button>
          </div>
          <div className="col">
            <button className="btn btn-light" onClick={handleCartClick}>
              <img src='/images/grocery-store.png' alt="" style={{ width: '24px', height: '24px' }} />
              <i className="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      </div>
      <ProductList show={showProductList} handleClose={handleCloseProductList} /> 
    </footer>
  );
}

export default Footer;