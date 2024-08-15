import React, { useContext, useState } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { CartContext } from './CartContext';
import CartItems from './CartItems';
import OrderSummary from './OrderSummary';

import AddItem from './AddItem';
import './Cart.css';

function Cart() {
  const navigate = useNavigate();
  const { items, addItemToCart, setItems } = useContext(CartContext);

  const [shippingCost, setShippingCost] = useState(0);
  // setItems(useCart());
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
      // Process the captured image file as needed
      console.log('Captured image:', file);
    }
  };

  return (
    <div className="cart-container">
      <h1>My Cart</h1>
      <button className="add-item-button" onClick={() => navigate('/add-item')}>Add Item</button>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        id="cameraInput"
        style={{ display: 'none' }}
        onChange={handleCapture}
      />
      <CartItems items={items} updateQuantity={updateQuantity} removeItem={removeItem} />
      <div className="cart-summary">
        <OrderSummary items={items} shippingCost={shippingCost} />
      </div>

      <Routes>
        <Route path="/add-item" element={<AddItem />} />
      </Routes>
    </div>
  );
}

export default Cart;
