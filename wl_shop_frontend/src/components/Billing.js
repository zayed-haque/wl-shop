import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import { Button } from 'react-bootstrap';

function Billing() {
  const navigate = useNavigate();
  const { totalPrice } = useContext(CartContext);

  const handleCheckout = () => {
    navigate('/checkout', { state: { totalPrice } });
  };

  return (
    <div className="billing-container">
      <Button
        style={{ backgroundColor: 'transparent', border: 'none', padding: 0 }}
        variant="link"
        onClick={() => navigate('/cart')}
        className="back-button"
      >
        <img src="images/back.svg" alt="back-button" />
      </Button>
      <h1>Billing Information</h1>
      <p>Total Price: ${totalPrice}</p>

      <form>
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Address" />
        <input type="text" placeholder="City" />
        <input type="text" placeholder="Zip Code" />
        <input type="text" placeholder="Card Number" />
        <input type="text" placeholder="Expiry Date" />
        <input type="text" placeholder="CVV" />
        <button type="button" onClick={handleCheckout}>Complete Purchase</button>
      </form>
      <br></br>
    </div>
  );
}

export default Billing;