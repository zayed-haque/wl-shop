import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Make sure to import the CSS file

// Mock function to check if user exists
const checkUserExists = (email, phoneNumber) => {
  // Replace this with actual logic to check user existence
  const existingUsers = [
    { email: 'sandeepan782@gmail.com.com', phoneNumber: '8101596976' },
    // Add more existing users here
  ];
  return existingUsers.some(user => user.email === email || user.phoneNumber === phoneNumber);
};

const LoginPage = () => {
  const [isNewUser, setIsNewUser] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (isNewUser) {
      if (checkUserExists(email, phoneNumber)) {
        alert('A user with this email or phone number already exists.');
        return;
      }
      // Handle new user login
      console.log('New User Login:', firstName, lastName, email, phoneNumber);
    } else {
      // Handle existing user login
      console.log('Existing User Login:', email);
    }
    navigate('/cart');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <h2>Login</h2>
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="newUser"
            className="check-loginuser"
            checked={isNewUser}
            onChange={() => setIsNewUser(!isNewUser)}
          />
          <label htmlFor="newUser">Are you a new user?</label>
        </div>
        {isNewUser && (
          <>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;