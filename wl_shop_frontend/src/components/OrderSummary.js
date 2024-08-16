import React from 'react';
import { useNavigate } from 'react-router-dom';

function OrderSummary({ items }) {
  const navigate = useNavigate();
  
  const total = items.reduce((sum, item) => {
    const itemPrice = parseFloat(item.price) || 0;
    const itemQuantity = parseInt(item.quantity) || 0;
    return sum + (itemPrice * itemQuantity);
  }, 0);

  const handleCheckout = () => {
    console.log('Checkout button clicked'); 
    navigate('/checkout');
  };

  return (
    <div className="order-summary">
      <div className="summary-row total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
}

export default OrderSummary;