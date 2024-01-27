// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import Profile from './component/Profile';
import Fakehome from './component/Fakehome';
import ViewProjects from './component/ViewProjects'; // Import ViewProjects component
import ProjectDetails from './component/ProjectDetails';
import ProjectsUpload from './component/ProjectsUpload'; // Import ProjectUpload component
import Uploadsuccess from './component/Uploadsuccess';
import SearchFeed from './component/SearchFeed';
import Otherprofile from './component/otherprofile';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userData, setUserData] = useState({ username: '', token: '' });

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="container mt-5">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Home setUserData={setUserData} />
              ) : (
                <Fakehome setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/profile"
            element={<Profile username={userData.username} token={userData.token} setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/viewProjects" element={<ViewProjects />} />
          <Route path="/project/:projectId" element={<ProjectDetails />} />
          <Route path="/projectUpload" element={<ProjectsUpload />} />
          <Route path="/upload-success" element={<Uploadsuccess/>}/>
          <Route path='/search' element={<SearchFeed/>}/>
          <Route path='/profile/:userId' element={<Otherprofile/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
