import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Make sure to import the CSS file

const LoginPage = () => {
  const [isNewUser, setIsNewUser] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (isNewUser) {
      try {
        const response = await fetch(`https://wl-shop.onrender.com/api/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_number: phoneNumber,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to register user:', errorText);
          alert('Failed to register user.');
          return;
        }

        const data = await response.json();
        console.log('Response Status:', response.status);
        console.log('Response Data:', data);

        if (response.status === 409) {
          alert('A user with this email or phone number already exists.');
          return;
        }

        // Store the access token in local storage
        localStorage.setItem('accessToken', data.access_token);
        const access_token =localStorage.getItem('accessToken');
        console.log('Access token set:', localStorage.getItem('accessToken')); 
        console.log('New User Login:', firstName, lastName, email, phoneNumber);
        navigate('/home');
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while registering the user.');
      }
    } else {
      // Handle existing user login
      console.log('Existing User Login:', email);
      navigate('/home');
    }
  };

  return (
    <div className="login-container">
      <div className="background-blur"></div>
      <div className="login-card">
        <div className="icon-container">
          <img src="images/login.svg" alt="Walmart Logo" className="walmart-logo" />
        </div>
        <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <h2>Login</h2>
          
          {isNewUser && (
            <>
              <div className="form-group">
                <input
                  type="text"
                  id="firstName"
                  placeholder='First Name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="lastName"
                  placeholder='Last Name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <div className="form-group">
            <input
              type="tel"
              id="phone"
              placeholder='Phone Number'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Submit</button>
          <div className="new-user-toggle">
            <label className="toggle">
              <input
                type="checkbox"
                checked={isNewUser}
                onChange={() => setIsNewUser(!isNewUser)}
              />
              <span className="slider round"></span>
            </label>
            <span>Are you a new user?</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;