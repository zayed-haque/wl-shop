import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from './components/CartContext';
import { AuthProvider } from './components/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
      <AuthProvider><App /></AuthProvider>
      
  </CartProvider>
);
reportWebVitals();

