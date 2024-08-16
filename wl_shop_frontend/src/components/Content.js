import React from 'react';
import './Content.css';

function Content() {
  const categories = [
    { name: 'Groceries', image: '/images/grocery.svg', color: '#0081C9' },
    { name: 'Electronics', image: '/images/electronics.svg', color: '#0081C9' },
    { name: 'Fashion', image: '/images/fashion.svg', color: '#0081C9' },
    // { name: 'Toys', image: '/images/toys.svg', color: '#0081C9' },
    { name: 'Sports & Outdoors', image: '/images/sports.svg', color: '#0081C9' }
    // { name: 'Sports & Outdoors', image: '/images/sports.svg', color: '#0081C9' },
    // { name: 'Sports & Outdoors', image: '/images/sports.svg', color: '#0081C9' },
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
        <h3>Product Categories</h3>
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