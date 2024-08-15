import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
function Header() {
    const navigate = useNavigate();
    const handleUserClick = () => {
            navigate('/cart');
    };
  return (
    <header className="app-header">
      <div className="walmart-icon">W</div>
      <div className="user-icon">
      {/* <button className="btn btn-light" onClick={handleUserClick}> */}
            <img src='/images/profile-user.png' alt="" style={{ width: '20px', height: '20px' }} />
              <i className="fas fa-user"></i>
            {/* </button> */}
      </div>
    </header>
  );
}

export default Header;