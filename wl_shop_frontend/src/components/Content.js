import React from 'react';
import './Content.css'; 

function Content() {
  return (
    <main className="app-content">
      <div className="welcome-box">
      <p className='intro'>Welcome to our first</p>
      WALMART E-CART</div>
      <div className="suggested-products">
        <h2>Suggested Product Category</h2>
        <div className="product-grid">
          <div className="product-item"></div>
          <div className="product-item"></div>
          <div className="product-item"></div>
          <div className="product-item"></div>
        </div>
      </div>
    </main>
  );
}

export default Content;