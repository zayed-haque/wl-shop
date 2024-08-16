import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { CartContext } from './CartContext';
import { Button } from 'react-bootstrap'; // Add this line
import CartItems from './CartItems';
import OrderSummary from './OrderSummary';
import AddItem from './AddItem';
import Billing from './Billing';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cart.css';
import Footer from './Footer';

function Cart() {
  const navigate = useNavigate();
  const { items, addItemToCart, setItems } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const [shippingCost, setShippingCost] = useState(0);

  const fetchCartData = async () => {
    const token = localStorage.getItem('accessToken');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch('https://wl-shop.onrender.com/api/cart', {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response status:', response.status);
        console.error('Response body:', errorText);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Fetched cart data:', data); // Log the entire response

      // Check if the items array contains the product name
      if (data.items && data.items.length > 0) {
        data.items.forEach(item => {
          console.log('Product name:', item.name); // Log each product name
        });
      }
      const formattedItems = data.items.map(item => ({
        id: item.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      }));

      setItems(formattedItems);
      console.log(data.items); // Update the CartContext with fetched data
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [items]);

  // const handleCartPage = () => {
  //   fetchCartData();
  //   navigate('/cart');
  // };

  const updateQuantity = (id, newQuantity) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Captured image:', file);
    }
  };

  const handleBilling = () => {
    navigate('/billing', { state: { totalPrice } });
  };

  return (
    <><div className="cart-container">
      <Button variant="link" onClick={() => navigate('/home')} className="back-button">
        <img src="images/back.svg" alt="back-button" />
      </Button>
      <h1>My Cart</h1>
      <button className="add-item-button" onClick={() => navigate('/add-item')}>Add Item</button>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        id="cameraInput"
        style={{ display: 'none' }}
        onChange={handleCapture} />
      <CartItems items={items} updateQuantity={updateQuantity} removeItem={removeItem} />
      <div className="cart-summary">
        <OrderSummary items={items} shippingCost={shippingCost} />
      </div>
      <Routes>
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/billing" element={<Billing />} />
      </Routes>
    </div>
    <Footer />
    </>
  );
}

export default Cart;