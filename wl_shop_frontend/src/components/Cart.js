import React, { useContext } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { CartContext } from './CartContext';
import CartItems from './CartItems';
import OrderSummary from './OrderSummary';
import AddItem from './AddItem';
import './Cart.css';

function Cart() {
  const navigate = useNavigate();
  const { items, addItemToCart, removeItem } = useContext(CartContext);

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
      <CartItems />
      <div className="cart-summary">
        <OrderSummary items={items} />
      </div>

      <Routes>
        <Route path="/add-item" element={<AddItem />} />
      </Routes>
    </div>
  );
}

export default Cart;