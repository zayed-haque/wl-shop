import React, { useState } from 'react';
import './Content.css';
import ProductList from './ProductList';

function Content() {
  const [showProductList, setShowProductList] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const categories = [
    { name: 'Groceries', image: '/images/grocery.svg', color: '#0081C9' },
    { name: 'Electronics', image: '/images/electronics.svg', color: '#0081C9' },
    { name: 'Fashion', image: '/images/fashion.svg', color: '#0081C9' },
    // { name: 'Toys', image: '/images/toys.svg', color: '#0081C9' },
    { name: 'Sports & Outdoors', image: '/images/sports.svg', color: '#0081C9' }
    // { name: 'Sports & Outdoors', image: '/images/sports.svg', color: '#0081C9' },
    // { name: 'Sports & Outdoors', image: '/images/sports.svg', color: '#0081C9' },
  ];
  const handleShowProductList = () => {
    console.log('Searched query:', searchTerm);
    setShowProductList(true);
  };
  const handleCloseProductList = () => setShowProductList(false);
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  return (
    <main className="app-content">
      <div className="welcome-box">
        <img src="/images/home.png" alt="" />
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search Products" 
           value={searchTerm} 
           onChange={handleSearchChange}
        />
        <button onClick={handleShowProductList}><img src="/images/searchbar.svg" alt="Search" /></button>
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
      <ProductList show={showProductList} handleClose={handleCloseProductList}
      searchTerm={searchTerm}  /> 
    </main>
  );
}

export default Content;