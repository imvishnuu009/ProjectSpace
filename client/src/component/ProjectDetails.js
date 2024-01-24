import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';

import axios from 'axios';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [currentUserName, setCurrentUserName] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getproject/${projectId}`);
        setProjectData(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
        // Handle errors appropriately
      }
    };

    const fetchUserName = async () => {
      try {
        const storedUserData = localStorage.getItem('userData');
        const { username } = JSON.parse(storedUserData);
        setCurrentUserName(username);
      } catch (error) {
        console.error('Error fetching username:', error);
        // Handle errors appropriately, e.g., set a default username
      }
    };

    fetchProjectDetails();
    fetchUserName();
  }, [projectId]);
  const download = async () => {
    try {
      const response = await fetch(`http://localhost:3001/downloadProject/${projectId}`, {
        responseType: 'blob' // Key: Specify blob response type
      });
  
      if (!response.ok) { // Check for server-side errors
        throw new Error(`Server error: ${response.status}`);
      }
  
      const blob = await response.blob();
      const fileName = response.headers.get('Content-Disposition')?.split('filename=')[1];
      saveAs(blob, fileName);
    } catch (error) {
      console.error("Error downloading project file:", error);
      alert("Failed to download the project file. Please try again.");
    }
  };
  
  
  const deleteproject = async () => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this project?"); // Use window.confirm for clarity
      if (confirmDelete) {
        const response = await axios.delete(`http://localhost:3001/projectDelete/${projectId}`); // Use DELETE method
  
        if (response.status === 201) {
          alert("Project deleted successfully!");
          setProjectData(null); // Clear project data after deletion
          navigate("/viewProjects")// Redirect to home page (adjust the path as needed)
        } else {
          alert("Failed to delete project. Please try again.");
          // Handle specific errors if needed, based on response.data
        }
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("An error occurred while deleting the project. Please try again.");
    }
  };
  

  return (
    <div className="container" style={{ marginTop: "6rem" }}>
      {projectData ? (
        <div className="card"style={{border:"2px outset #86A7FC"}}> {/* Assuming you're using Bootstrap */}
          <div className="card-header" style={{
            backgroundImage: `./images/${projectData.tags[0]}.png`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
            <h1>Project details:</h1>
          </div>
          <div className="card-body">
            <h2 className='my'>{projectData.title}</h2>
            <p><strong>About the project:</strong> {projectData.description}</p>
            <p>
              <strong>Tags:</strong> {projectData.tags.map((tag) => (
                <span key={tag} className="badge badge-primary" style={{ color: "black" }}>{tag}</span>
              ))}
            </p>

            <p><strong>Author:</strong> {projectData.author === currentUserName ? 'You' : projectData.author}</p>
            <button className="btn btn-primary"onClick={download}> Download the code </button>
            <button className="btn btn-danger mx-5" onClick={deleteproject}>Delete the project</button>
          </div>
          </div>
          

          ) : (
          <p>Loading project details...</p>
      )}
      
        </div>
      );
};

      export default ProjectDetails;
