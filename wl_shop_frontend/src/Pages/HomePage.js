import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header'; // Corrected import path
import Content from '../components/Content'; // Corrected import path
import Footer from '../components/Footer'; 
import './HomePage.css'; 

function HomePage() {
  return (
    <div className="home">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default HomePage;