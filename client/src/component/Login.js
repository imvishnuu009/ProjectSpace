import React, { useState } from 'react';
import axios from 'axios';

export default function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password ) {
      alert('Please fill in all required fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
    });
    
    const { token } = response.data;
    
    
    
      // If login is successful, you can handle the response accordingly
      console.log(response.data);
  
      // Set authentication status or perform any other actions
      props.onLoginSuccess(response.data);
    } catch (error) {
      // Handle login failure
      if (error.response && error.response.status === 401) {
        // Unauthorized (wrong credentials)
        alert('Incorrect username or password. Please try again.');
      } else {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        // You can display an error message or take other actions as needed
      }
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-3">
          <label htmlFor="exampleInputUsername" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputUsername"
            aria-describedby="usernameHelp"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div id="emailHelp" className="form-text">
            Enter your username to login.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
