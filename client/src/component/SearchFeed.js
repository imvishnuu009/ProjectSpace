import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function SearchFeed() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate=useNavigate();
  const styles = {
    marginTop: '6rem',
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
    setIsLoading(true);
    setError(null);
    fetchSearchResults()
  };

  const fetchSearchResults = async () => {
    try {
      const response = await fetch('http://localhost:3001/search?searchQuery=' + searchQuery);
      const data = await response.json();
      setSearchResults(data);
      console.log(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }
  // Define a separate function for navigation
const handleViewAccount = (result) => {
  navigate(`/profile/${result._id}`); // replace with your actual profile route
};

// Update ResultCard component
const ResultCard = ({ result }) => {
  return (
    <div className="card">
      <div className="card-body">
        {result.username ? (
          <>
            <p>Username: {result.username}</p>
            {result._id && ( // conditionally render button if ID exists
              <button className="btn btn-primary" onClick={() => handleViewAccount(result)}>
                View Profile
              </button>
            )}
          </>
        ) : (
          <>
            <p>Title: {result.title}</p>
            <p>Author: {result.author}</p>
          </>
        )}
      </div>
    </div>
  );
};


  return (
    <div className="container" style={styles}>
      <form className="d-flex mt-3" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search for accounts, projects, and tags"
          aria-label="Search"
          name="search"
          onChange={handleSearch}
        />
        <button className="btn btn-success" onClick={handleSearch}>Search</button>
      </form>
      {isLoading && <p>Loading search results...</p>}
      {error && <p>Error fetching results: {error.message}</p>}
      {!isLoading && !error && (
        <div>
          <h4 className="my-3">Search Results:</h4>
          {searchResults.length > 0 ? (
            <React.Fragment>
              <h5>Accounts:</h5>
              <div className="list-group">
                {searchResults.filter((result) => result.username).map((account) => (
                  <ResultCard key={account._id} result={account} />
                ))}
              </div>
              <h5>Projects:</h5>
              <div className="list-group">
                {searchResults.filter((result) => result.title).map((project) => (
                  <ResultCard key={project._id} result={project} />
                ))}
              </div>
            </React.Fragment>
          ) : (
            <p>Sorry, no matches found.</p>
          )}
        </div>
      )}
    </div>
  );
}
