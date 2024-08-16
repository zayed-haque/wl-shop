import React from 'react';
import './Content.css';

function Content() {
  const categories = [
    { name: 'Groceries', image: '/images/grocery.svg', color: '#E7F0DC' },
    { name: 'Electronics', image: '/images/electronics.svg', color: '#E7F0DC' },
    { name: 'Fashion', image: '/images/fashion.svg', color: '#E7F0DC' },
    { name: 'Toys', image: '/images/toys.svg', color: '#E7F0DC' },
    { name: 'Sports & Outdoors', image: '/images/sports.svg', color: '#E7F0DC' },
  ];

  return (
    <main className="app-content">
      <div className="welcome-box">
        <h2>Welcome to our first</h2>
        <h1>WALMART E-CART</h1>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search Products" />
        <button><img src="/images/searchbar.svg" alt="Search" /></button>
      </div>
      <div className="categories-section">
        <h3>Suggested Product Categories</h3>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div className="category-card" key={index} style={{backgroundColor: category.color}}>
              <img src={category.image} alt={category.name} />
              <h4>{category.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Content;