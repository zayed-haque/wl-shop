import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="walmart-icon">
          <img src="images/walmart.png" alt="Walmart" />
        </div>

          <div>
          <button className="icon-button user-icon">
            <img src="images/profile-user.svg" alt="User" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;