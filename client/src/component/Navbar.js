
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function N({ isAuthenticated }) {
  const [searchquery, setsearchquery] = useState('');

  const handleAlert = () => {
    alert("Please log in or register to access this feature.");
  };

  return (
    <div id="sidebar-wrapper">
      <ul className="sidebar-nav">
        <li>
          <NavLink to="/" className="nav-link" activeClassName="active" exact={true}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="nav-link" activeClassName="active" exact={true}>
            About
          </NavLink>
        </li>
        <li>
          {isAuthenticated ? (
            <>
              <NavLink to="/projectUpload" className="nav-link" activeClassName="active">
                Upload project
              </NavLink>
              <NavLink to="/viewProjects" className="nav-link" activeClassName="active">
                View projects
              </NavLink>
            </>
          ) : (
            <span className="nav-link" onClick={handleAlert}>
              My projects
            </span>
          )}
        </li>
        <li>
          <NavLink to="/profile" className="nav-link" activeClassName="active" exact={true}>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/search" className="nav-link" activeClassName="active" exact={true}>
            Search
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
