import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ViewProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const storedUserData = localStorage.getItem('userData'); // Retrieve token from local storage
        const { username, token } = JSON.parse(storedUserData);
        console.log('Fetching projects...');
        console.log(token)
        const response = await axios.get('http://localhost:3001/getprojects', {
          headers: { Authorization: `Bearer ${token}` }, // Add token to request header
          'x-username': username,
        });
        
        console.log('Projects fetched successfully:', response.data);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        console.log(error)
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  return (
    <div className='container' style={{ marginTop: '6rem' }}>
      <h1>View your projects</h1>
      {isLoading && <p>Loading projects...</p>}
      {error && <p>Error fetching projects: {error.message}</p>}
      {projects.length > 0 && (
        <div >
          {projects.map((project) => (
            <div key={project._id} className="card my-4">
            <h5 className="card-header">{project.title}</h5>
            <div className="card-body">
              <p>{project.description}</p>
              <button onClick={()=>{navigate(`/project/${project._id}`)}}>View Details</button>
            </div>
          </div>
          ))}
        </div>
      )}
      {projects.length === 0 && !isLoading && !error && <p>No projects found.</p>}
    </div>
  );
  
}
