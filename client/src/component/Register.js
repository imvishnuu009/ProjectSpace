import React, { useState } from 'react';
import axios from 'axios';

export default function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [univName, setUnivName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !univName || !username || !password || !confirmPassword) {
      alert('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
  
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
  
    try {
      // Send a POST request to the register endpoint
      const response = await axios.post('http://localhost:3001/register', {
        Name: name,
        Email: email,
        univName: univName,
        username,
        password,
      });
  
      // If registration is successful, store user data in local storage
      const userData = {
        username: response.data.username,
        token: response.data.token,
      };
  
      // Save user data to local storage
      localStorage.setItem('userData', JSON.stringify(userData));
      
      // Call the correct prop name: onRegistrationSuccess
      props.onRegistrationSuccess(response.data);
  
      // Update state to reflect authentication status
      props.setIsAuthenticated(true);
  
      // You can also redirect to another page or perform any other actions
      console.log(response.data);
    } catch (error) {
      // Handle registration failure
      if (error.response && error.response.status === 400) {
        // Username already exists, show an alert
        alert('Username already exists. Please choose a different username.');
      } else {
        // Other errors, log to console
        console.error('Registration failed:', error.response ? error.response.data : error.message);
      }
    }
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 my-3">
            <label htmlFor="exampleInputName" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              aria-describedby="nameHelp"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputUniversity" className="form-label">University Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputUniversity"
              aria-describedby="universityHelp"
              value={univName}
              onChange={(e) => setUnivName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputUsername" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputUsername"
              aria-describedby="usernameHelp"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <div id="usernameHelp" className="form-text">Enter your username to login.</div>
          </div>
           <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">Re-enter Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordMatchError(false); // Reset error on input change
              }}
              required
            />
          </div>
          {passwordMatchError && (
            <div className="alert alert-danger" role="alert">
              Passwords do not match!
            </div>
          )}
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
}
