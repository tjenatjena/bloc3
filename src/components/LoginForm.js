// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLogin, onLogout, isLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
  
      if (response.status === 200) {
        onLogin(); // Pas besoin de passer le nom d'utilisateur ici
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/logout');
      onLogout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>{`Vous êtes connecté en tant que ${username}`}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
