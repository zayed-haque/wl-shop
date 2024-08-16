import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import { Button } from 'react-bootstrap';

function Billing() {
  const navigate = useNavigate();
  const { totalPrice } = useContext(CartContext);
  const [userDetails, setUserDetails] = useState({ name: 'Sandeepan', email: 'sandeepan782@gmail.com', phone: '8101596976' });

  useEffect(() => {
    // Mock API call to fetch user details
    const fetchUserDetails = async () => {
      // Replace with actual API call
      const response = await fetch('/api/user-details');
      const data = await response.json();
      setUserDetails(data);
    };

    fetchUserDetails();
  }, []);

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
      <div className="e-bill">
        <h2>E-Bill</h2>
        <p><strong>Name:</strong> {userDetails.name}</p>
        <p><strong>Email:</strong> {userDetails.email}</p>
        <p><strong>Phone:</strong> {userDetails.phone}</p>
        <p><strong>Total Price:</strong> ${totalPrice}</p>
      </div>
      <Button variant="primary" onClick={handleCheckout}>Proceed to Checkout</Button>
    </div>
  );
}

export default Billing;