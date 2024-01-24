import React from 'react';

export default function Projects() {
  let mystyles = {
    width: '18rem',
  };
  let constyles={
    
    border:"2px outset #86A7FC"
  }

  return (
    <div className="container my-5" style={constyles}>
      <h1>Projects based on topics</h1>
      <div className="row my-5">
        <div className="col-md-4 mb-3"> {/* Add the mb-3 class for bottom margin */}
          <div className="card" style={mystyles}>
            <img src="./images/artificial-intelligence.jpg" className="card-img-top" alt="ai" />
            <div className="card-body">
              <h5 className="card-title">Artificial Intelligence</h5>
              <p className="card-text">Checkout the projects uploaded by various users.</p>
              <a href="/" className="btn btn-primary">
                View
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card" style={mystyles}>
            <img src="./images/machine-learning.png" className="card-img-top" alt="ai" />
            <div className="card-body">
              <h5 className="card-title">Machine Learning</h5>
              <p className="card-text">Checkout the projects uploaded by various users.</p>
              <a href="/" className="btn btn-primary">
                View
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card" style={mystyles}>
            <img src="./images/fullstack.png" className="card-img-top" alt="ai" />
            <div className="card-body">
              <h5 className="card-title">Full Stack Development</h5>
              <p className="card-text">Checkout the projects uploaded by various users.</p>
              <a href="/" className="btn btn-primary">
                View
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-md-4 mb-3"> {/* Add the mb-3 class for bottom margin */}
          <div className="card" style={mystyles}>
            <img src="./images/mernstack.png" className="card-img-top" alt="ai" />
            <div className="card-body">
              <h5 className="card-title">M.E.R.N stack</h5>
              <p className="card-text">Checkout the projects uploaded by various users.</p>
              <a href="/" className="btn btn-primary">
                View
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card" style={mystyles}>
            <img src="./images/appdev.jpg" className="card-img-top" alt="ai" />
            <div className="card-body">
              <h5 className="card-title">App Development</h5>
              <p className="card-text">Checkout the projects uploaded by various users.</p>
              <a href="/" className="btn btn-primary">
                View
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card" style={mystyles}>
            <img src="./images/datascience.jpg" className="card-img-top" alt="ai" />
            <div className="card-body">
              <h5 className="card-title">Data Science</h5>
              <p className="card-text">Checkout the projects uploaded by various users.</p>
              <a href="/" className="btn btn-primary">
                View
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
