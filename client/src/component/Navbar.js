// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
export default function Navbar({ isAuthenticated }) {
  const [searchquery, setsearchquery] = useState('');
 

 
  const handleAlert = () => {
    alert("Please log in or register to access this feature.");
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/"><h4>UniprojectHub</h4></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">UniprojectHub</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link" activeClassName="active" exact={true}>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/about" className="nav-link" activeClassName="active" exact={true}>
                    About
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  {/*
                    Use handleAlert if the user is not authenticated
                    Otherwise, render the dropdown as usual
                  */}
                  {isAuthenticated ? (
                    <>
                      <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        My projects
                      </a>
                      <ul className="dropdown-menu">
                        <li><NavLink to="/projectUpload" className="dropdown-item" activeClassName="active">Upload project</NavLink></li>
                        <li><NavLink to="/viewProjects" className="dropdown-item" activeClassName="active">View projects</NavLink></li>
                      </ul>
                    </>
                  ) : (
                    // If the user is not authenticated, show an alert
                    <a className="nav-link" href="/" onClick={handleAlert}>
                      My projects
                    </a>
                  )}
                </li>
                <li className="nav-item">
                  <NavLink to="/profile" className="nav-link" activeClassName="active" exact={true}>
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/search" className="nav-link" activeClassName="active" exact={true}>
                    Search
                  </NavLink>
                </li>
              </ul>
             
              
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
