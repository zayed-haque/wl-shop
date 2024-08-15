import React from 'react';
import Cart from './components/Cart';
import Billing from './components/Billing';
import AddItem from './components/AddItem';
import { CartProvider } from './components/CartContext';
import './App.css';
import LoginPage from './Pages/LoginPage';
import ProductList from './components/ProductList';
import HomePage from './Pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (

    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/productlist" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={<Cart />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/add-item" element={<AddItem />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>


  );
}

export default App;