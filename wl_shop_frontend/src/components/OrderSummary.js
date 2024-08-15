import React from 'react';
import { useNavigate } from 'react-router-dom';

function OrderSummary({ items, shippingCost }) {
  const navigate = useNavigate();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;

  const handleCheckout = () => {
    console.log('Checkout button clicked'); 
    navigate('/billing');
  };

  return (
    <div className="order-summary">
      <div className="summary-row total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default OrderSummary;