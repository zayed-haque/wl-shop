import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Make sure to import the CSS file
import { AuthContext } from '../components/AuthContext.js';

const LoginPage = () => {
  const { setAccessToken } = useContext(AuthContext);
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
        setAccessToken(data.access_token);
        console.log('Access token set:', localStorage.getItem('accessToken')); 
        console.log('New User Login:', firstName, lastName, email, phoneNumber);
        navigate('/home');
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while registering the user.');
      }
    } else {
      try {
        const response = await fetch(`https://wl-shop.onrender.com/api/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
          }),
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to login user:', errorText);
          alert('Failed to login user.');
          return;
        }
  
        const data = await response.json();
        console.log('Response Status:', response.status);
        console.log('Response Data:', data);
  
        if (data.message !== 'Login successful') {
          alert('Login failed. Please check your credentials.');
          return;
        }
  
        // Store the access token in local storage
        localStorage.setItem('accessToken', data.access_token);
        setAccessToken(data.access_token);
        console.log('Access token set:', localStorage.getItem('accessToken')); 
        console.log('Existing User Login:', data.user.first_name, data.user.last_name, data.user.email, data.user.phone_number);
        navigate('/home');
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while logging in the user.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="background-blur"></div>
      <div className="login-card">
        <div className="icon-container">
          <img src="images/login.svg" alt="Logo" className="logo" />
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