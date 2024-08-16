import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Content from '../components/Content';
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