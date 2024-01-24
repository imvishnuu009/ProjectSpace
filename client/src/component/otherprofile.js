import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Otherprofile() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = new URLSearchParams(window.location.search).get('_id'); // Get user ID from URL parameter
    setIsLoading(true);
    fetchUserData(userId)
      .then((userData) => {
        setUserData(userData);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []); // Only run effect on initial render

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/getprofile/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  return (
    <div className="container" style={{ marginTop: '6rem' }}>
      <div className="card p-4 text-left bg-light">
        <h1 className="card-title mb-4">Profile</h1>
        {isLoading ? (
          <div className="card-body text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading user data...</span>
            </div>
          </div>
        ) : userData ? (
          <div className="card-body">
            <div className="row">
              <div className="col-md-10">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Name: {userData.Name}</li>
                  <li className="list-group-item">Email: {userData.Email}</li>
                  {/* Update the displayed information based on your needs and data structure */}
                  <li className="list-group-item">University Name: {userData.univName}</li>
                  <li className="list-group-item">Username: {userData.username}</li>
                  {/* Include other relevant information for the specific user profile */}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="card-body text-center">
            <p>User not found</p>
          </div>
        )}
      </div>
    </div>
  );
}
