import React from 'react';
import { useLocation } from 'react-router-dom';

const CheckoutForm = ({ totalAmount }) => {
  const location = useLocation();
  const { totalPrice } = location.state || {};

  console.log('CheckoutForm Component Rendered');
  console.log('Total Price in CheckoutForm:', totalPrice);

  const handlePayment = async () => {
    const options = {
      key: 'your-razorpay-key-here', // Replace with your Razorpay key
      amount: totalAmount * 100, // Razorpay works with paise, so multiply by 100
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Test Transaction',
      handler: function (response) {
        console.log(response);
        // Handle the payment success here
      },
      prefill: {
        name: 'Your Name',
        email: 'your-email@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Your Address',
      },
      theme: {
        color: '#F37254',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <div>
        <h1>Checkout</h1>
        <p>Total Price: ₹{totalPrice ? totalPrice.toFixed(2) : 'N/A'}</p>
        <button onClick={handlePayment}>Pay with Razorpay</button>
      </div>
    </>
  );
};

export default CheckoutForm;