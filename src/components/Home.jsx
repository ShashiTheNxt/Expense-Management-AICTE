import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src="/Bc.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/about">About the Project</Link>
        </div>
      </nav>

      {/* Project Title */}
      <div className="project-title">
        <h1>Personal Finance Manager</h1>
        <p>Manage your expenses with ease and efficiency.</p>
      </div>
    </div>
  );
};

export default Home;
