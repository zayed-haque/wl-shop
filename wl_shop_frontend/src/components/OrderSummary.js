import React from 'react';

function OrderSummary({ items }) {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <p>Total: ${total ? total.toFixed(2) : '0.00'}</p>
    </div>
  );
}

export default OrderSummary;