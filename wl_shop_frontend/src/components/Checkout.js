import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const location = useLocation();
  const { totalPrice } = location.state || {};

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  console.log('Checkout Component Rendered');
  console.log('Total Price:', totalPrice);

  return (
    <div>
      <CheckoutForm totalAmount={totalPrice} />
    </div>
  );
};

export default Checkout;