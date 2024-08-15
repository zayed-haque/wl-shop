import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/productlist');
  };

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
            <button className="btn btn-light" onClick={handleSearchClick}>
            <img src='wl-shop/wl_shop_frontend/images/search.png' alt="" style={{ width: '24px', height: '24px' }} />
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="col">
            <button className="btn btn-light" onClick={handleScannerClick}>
            <img src='/Users/sandeepanghosh/Downloads/walmart-clone/wl-shop/wl_shop_frontend/images/barcode-scan.png' alt="" style={{ width: '24px', height: '24px' }} />
              <i className="fas fa-barcode"></i>
            </button>
          </div>
          <div className="col">
            <button className="btn btn-light" onClick={handleCartClick}>
            <img src='/Users/sandeepanghosh/Downloads/walmart-clone/wl-shop/wl_shop_frontend/images/grocery-store.png' alt="" style={{ width: '24px', height: '24px' }} />
              <i className="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;