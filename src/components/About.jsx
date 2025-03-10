import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      {/* Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src="/Bc.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </nav>

      {/* About Content */}
      <div className="about-content">
        <h1>About the Project</h1>

        {/* Two Boxes */}
        <div className="box-container">
          {/* Box 1: Project Overview */}
          <div className="project-box">
            <h2>Project Overview</h2>
            <p>
              The <strong>Personal Finance Manager</strong> is a platform designed to help users manage their expenses efficiently. With features like expense tracking, real-time updates, and visualization, users can take control of their finances with ease.
            </p>
          </div>

          {/* Box 2: Project Structure */}
          <div className="project-box">
            <h2>Project Structure</h2>
            <ul>
              <li>
                <strong>Frontend (React.js)</strong>:
                <ul>
                  <li>Home Page: Displays the dashboard with expense tracking and visualization.</li>
                  <li>Login Page: User authentication for secure access.</li>
                  <li>Signup Page: New user registration.</li>
                  <li>About Page: Details about the project and its features.</li>
                </ul>
              </li>
              <li>
                <strong>Backend (Node.js + Express.js)</strong>:
                <ul>
                  <li>API Endpoints: Handle CRUD operations for expenses.</li>
                  <li>Authentication: Secure user login and signup.</li>
                  <li>Database: MongoDB for storing user and expense data.</li>
                </ul>
              </li>
              <li>
                <strong>Real-Time Updates</strong>:
                <ul>
                  <li>Changes to expenses are instantly reflected across all devices.</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;