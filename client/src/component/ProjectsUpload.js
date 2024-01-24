import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';


export default function ProjectsUpload() {
  const [userData, setUserData] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    // Fetch user data from local storage
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
      const { username, token } = JSON.parse(storedUserData);

      // Make a request to your backend to get the user details
      const fetchUserData = async () => {
        try {
          // Save the token to use in future requests
          // Also, include it in the Authorization header with the "Bearer " prefix
          const userProfileResponse = await axios.get('http://localhost:3001/getUserProfile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUserData(userProfileResponse.data);
          console.log(userProfileResponse);
        } catch (error) {
          console.error('Error fetching user data', error);
        }
      };

      fetchUserData();
    }
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Fetch user data from local storage
      const storedUserData = localStorage.getItem('userData');
      if (!storedUserData) {
        // Handle the case where user data is not available
        console.error('User data not found');
        return;
      }
  
      const { username, token } = JSON.parse(storedUserData);
  
      // Other form fields
      const projectTitle = document.getElementById('projectTitle').value;
      const projectDescription = document.getElementById('projectDescription').value;
      const projectFile = document.getElementById('formFileLg').files[0];
      // Check file size
      if (projectFile.size > 5 * 1024 * 1024) { // 5MB in bytes
        alert('File size cannot exceed 5MB. Please select a smaller file.');
        return;
      }

  
      if (!projectTitle || !projectDescription || !projectFile) {
        // Handle the case where required fields are not filled
        console.error('Please fill in all required fields');
        alert("Please make sure to fill out all of the fields.");
        return;
      }
  
      // Tags
      const tags = selectedTags;
  
      // Create form data to send as a POST request
      const formData = new FormData();
      formData.append('title', projectTitle);
      formData.append('description', projectDescription);
      formData.append('universityname', userData.univName);
      formData.append('author', userData.username); // Author is the name of the user
      formData.append('tags', JSON.stringify(tags));
      formData.append('email', userData.email); // Email is fetched from user data
      formData.append('file', projectFile);
  
      // Send POST request to the backend
      const response = await axios.post('http://localhost:3001/projectUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log(response.data.message); // Log the server response message
      alert(response.data.message)
      navigate("/upload-success")
    } catch (error) {
      console.error('Error in project submission', error);
      alert(error)
    }
  };
  

  const handleTagSelection = (e) => {
    const selectedCheckbox = e.target.value;

    // Toggle the selection of the clicked checkbox
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(selectedCheckbox)) {
        // If the checkbox is already selected, remove it
        return prevSelectedTags.filter((tag) => tag !== selectedCheckbox);
      } else {
        // If the checkbox is not selected, add it
        return [...prevSelectedTags, selectedCheckbox];
      }
    });
  };

  return (
    <div className="container my-5">
      <div className="container " style={{ marginTop: "6rem", border: "2px outset #86A7FC" }}>
        <h1>Upload your project</h1>
        <form onSubmit={handleSubmit} className='container my-3'>
          {/* Other form fields */}
          <div className="mb-3">
            <label htmlFor="projectTitle" className="form-label">
              Project Title
            </label>
            <input type="text" className="form-control" id="projectTitle" required />
          </div>
          <div className="mb-3">
            <label htmlFor="projectDescription" className="form-label">
              Project Description
            </label>
            <textarea className="form-control" id="projectDescription" rows="3" required></textarea>
          </div>

          <div className="mb-3" >
            <label className="form-label">Project Tags:</label>
            <div >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="artificial-intelligence"
                  id="tagCheckbox1"
                  onChange={handleTagSelection}
                />
                <label className="form-check-label" htmlFor="tagCheckbox1">
                  Artificial Intelligence
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="machine-learning"
                  id="tagCheckbox2"
                  onChange={handleTagSelection}
                />
                <label className="form-check-label" htmlFor="tagCheckbox2">
                  Machine Learning
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="full-stack-development"
                  id="tagCheckbox3"
                  onChange={handleTagSelection}
                />
                <label className="form-check-label" htmlFor="tagCheckbox3">
                  Full Stack Development
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="mern-stack-development"
                  id="tagCheckbox4"
                  onChange={handleTagSelection}
                />
                <label className="form-check-label" htmlFor="tagCheckbox4">
                  M.E.R.N Stack Development
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="mobile-app-development"
                  id="tagCheckbox5"
                  onChange={handleTagSelection}
                />
                <label className="form-check-label" htmlFor="tagCheckbox5">
                  Mobile App Development
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="data-science"
                  id="tagCheckbox6"
                  onChange={handleTagSelection}
                />
                <label className="form-check-label" htmlFor="tagCheckbox6">
                  Data Science
                </label>
              </div>

            </div>
          </div>

          {selectedTags.length > 0 && (
            <div className="mb-3">
              <label className="form-label">Selected Tags:</label>
              <div>
                {selectedTags.map((tag) => (
                  <span key={tag} className="badge bg-primary me-2">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <label htmlFor="formFileLg" class="form-label"><h5>Project related file</h5>if you have multiple folders then please upload a zip file</label>
            <input className="form-control form-control-lg" id="formFileLg" type="file" />
          </div>
          <button type="submit" className="btn btn-primary my-5" onClick={handleSubmit}>
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}
