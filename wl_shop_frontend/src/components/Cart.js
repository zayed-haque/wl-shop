import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItems from './CartItems';
import OrderSummary from './OrderSummary';
import { CartContext } from '../CartContext';
import './Cart.css';

function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity } = useContext(CartContext);

  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Captured image:', file);
      // You can handle the captured image file here
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
      <CartItems items={items} updateQuantity={updateQuantity} />
      <div className="cart-summary">
        <OrderSummary items={items} />
      </div>
    </div>
  );
}

export default Cart;