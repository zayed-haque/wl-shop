import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './RazorpayStyle.css';

const Checkout = () => {
  const location = useLocation();
  const { totalPrice } = location.state || {};
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePayment = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    if (window.confirm("Are you sure you want to close the form?")) {
      setShowModal(false);
      console.log("Checkout form closed by the user");
    } else {
      console.log("Complete the Payment");
    }
  };

  const handleSuccess = () => {
    setShowModal(false);
    alert("Payment successful! Payment ID: " + Math.random().toString(36).substr(2, 9));
  };

  return (
    <div>
      <button 
        className="rzp-button" 
        onClick={handlePayment}
      >
        Pay ₹{totalPrice}
      </button>

      {showModal && (
        <div className="rzp-overlay">
          <div className="rzp-modal">
            <div className="rzp-header">
              <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" className="rzp-logo" />
              <button className="rzp-close" onClick={handleCloseModal}>&times;</button>
            </div>
            <div className="rzp-content">
              <div className="rzp-summary">
                <h2>Order Summary</h2>
                <div className="rzp-summary-row">
                  <span>Order #1234</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>
              <div className="rzp-payment-options">
                <button 
                  className={`rzp-option ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <i className="fas fa-credit-card"></i>
                  <span>Card</span>
                </button>
                <button 
                  className={`rzp-option ${paymentMethod === 'netbanking' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('netbanking')}
                >
                  <i className="fas fa-university"></i>
                  <span>Netbanking</span>
                </button>
                <button 
                  className={`rzp-option ${paymentMethod === 'upi' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <i className="fas fa-mobile-alt"></i>
                  <span>UPI</span>
                </button>
                <button 
                  className={`rzp-option ${paymentMethod === 'wallet' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('wallet')}
                >
                  <i className="fas fa-wallet"></i>
                  <span>Wallet</span>
                </button>
              </div>
              <div className="rzp-payment-form">
                {paymentMethod === 'card' && (
                  <>
                    <input type="text" placeholder="Card number" className="rzp-input" />
                    <div className="rzp-input-group">
                      <input type="text" placeholder="MM / YY" className="rzp-input" />
                      <input type="text" placeholder="CVV" className="rzp-input" />
                    </div>
                    <input type="text" placeholder="Name on card" className="rzp-input" />
                  </>
                )}
                {paymentMethod === 'netbanking' && (
                  <select className="rzp-select">
                    <option>Choose your bank</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>State Bank of India</option>
                    <option>Axis Bank</option>
                  </select>
                )}
                {paymentMethod === 'upi' && (
                  <input type="text" placeholder="Enter UPI ID" className="rzp-input" />
                )}
                {paymentMethod === 'wallet' && (
                  <select className="rzp-select">
                    <option>Choose your wallet</option>
                    <option>Paytm</option>
                    <option>PhonePe</option>
                    <option>Amazon Pay</option>
                  </select>
                )}
              </div>
              <button className="rzp-pay-button" onClick={handleSuccess}>Pay ₹{totalPrice}</button>
            </div>
            <div className="rzp-footer">
              <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" className="rzp-powered-by" />
              <span>Secured by Razorpay</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;