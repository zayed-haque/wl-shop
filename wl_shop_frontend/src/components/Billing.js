import React from 'react';
import { useNavigate } from 'react-router-dom';

function Billing() {
  const navigate = useNavigate();

  return (
    <div className="billing-container">
      <h1>Billing Information</h1>
      {/* Add your billing form here */}
      <form>
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Address" />
        <input type="text" placeholder="City" />
        <input type="text" placeholder="Zip Code" />
        <input type="text" placeholder="Card Number" />
        <input type="text" placeholder="Expiry Date" />
        <input type="text" placeholder="CVV" />
        <button type="submit">Complete Purchase</button>
      </form>
      <br></br>
      <button onClick={() => navigate('/cart')}>Back to Cart</button>
    </div>
  );
}

export default Billing;