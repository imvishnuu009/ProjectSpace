import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const fetchUserData = async (token, setUserData) => {
  try {
    const userProfileResponse = await axios.get('http://localhost:3001/getUserProfile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUserData(userProfileResponse.data);
  } catch (error) {
    console.error('Error fetching user data', error);
  }
};

export default function Profile({ setIsAuthenticated }) {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
      const { token } = JSON.parse(storedUserData);

      try {
        await axios.get('http://localhost:3001/logout', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        localStorage.removeItem('userData');
        setUserData(null);
        setIsAuthenticated(false);
        navigate('/');
        window.location.reload(true);
        alert('Logout successful');
      } catch (error) {
        console.error('Error during logout:', error);
        alert('Logout failed');
      }
    }
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
      const { token } = JSON.parse(storedUserData);

      fetchUserData(token, setUserData);
    }
  }, []);

 // ... previous code
return (
  <div className="container "style={{marginTop:"6rem"}}>
    <div className="card p-4 text-left bg-light">
      <h1 className="card-title mb-4">Profile</h1>
      {userData ? (
        <div className="card-body">
          <div className="row">
            <div className="col-md-10">
              <ul className="list-group list-group-flush ">
                <li className="list-group-item">Name: {userData.Name}</li>
                <li className="list-group-item">Email: {userData.Email}</li>
                <li className="list-group-item">University Name: {userData.univName}</li>
                <li className="list-group-item">Username: {userData.username}</li>
              </ul>
            </div>
          </div>
          <button type="button" className="btn btn-primary mx-5 mt-3" onClick={handleLogout}>
            Log out
          </button>
        </div>
      ) : (
        <div className="card-body text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading user data...</span>
          </div>
        </div>
      )}
    </div>
  </div>
);

}