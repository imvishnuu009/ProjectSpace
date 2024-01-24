import React, { useState,useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import './fakehome.css'
export default function Fakehome({ setIsAuthenticated }) {
  const [isLoginActive, setLoginActive] = useState(true);

  // In Fakehome.js
const handleRegistrationSuccess = (userData) => {
  setIsAuthenticated(true);
  // Save user data to local storage
  localStorage.setItem('userData', JSON.stringify(userData)); // Replace with actual user data
  alert(`Successfully registered, Welcome to UniprojectHub,${userData.username}`);
};

const handleLoginSuccess = (userData) => {
  setIsAuthenticated(true);
  // Save user data to local storage
  localStorage.setItem('userData', JSON.stringify(userData));
  alert(`Login Success!, Welcome back ${userData.username}!`);
};
// In Fakehome.js, inside the component
useEffect(() => {
  const storedUserData = localStorage.getItem('userData');
  if (storedUserData) {
    // If user data is found, set isAuthenticated to true
    setIsAuthenticated(true);
  }
}, []);


  const activateLogin = () => {
    setLoginActive(true);
  };

  const activateRegister = () => {
    setLoginActive(false);
  };

  return (
    <div className="container" style={{ marginTop: "6rem" }}>
      <div className="row" >
        <div className="col-md-6 " >
          <h1 className='my-4'>UniprojectHub</h1>
          <h3 className='my-5'>Join us for an exciting journey</h3>
        </div>
        <div className="col-md">
          <button onClick={activateLogin} className="btn btn-primary">Login</button>
          {isLoginActive && <Login onLoginSuccess={handleLoginSuccess} />}
        </div>
        <div className="col-md">
          <button onClick={activateRegister} className="btn btn-primary">Register</button>
          {!isLoginActive && <Register onRegistrationSuccess={handleRegistrationSuccess} />}
        </div>
      </div>
    </div>
  );
}
