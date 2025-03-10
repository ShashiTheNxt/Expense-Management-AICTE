import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [loginSuccess, setLoginSuccess] = useState(false); // Login success state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    // Simulate an API call with a 2-second delay
    setTimeout(() => {
      setIsLoading(false); // Stop loading
      setLoginSuccess(true); // Set login success to true

      // Redirect to Home page after 2 seconds
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    }, 2000);
  };

  return (
    <div className="login-container">
      {/* Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src="/Bc.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Login Box */}
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Display login success message */}
        {loginSuccess && (
          <div className="login-success-message">
            Login Successful! Redirecting to Home...
          </div>
        )}

        {/* Already have an account? Signup */}
        <div className="already-registered">
          <span>Don't have an account? </span>
          <a href="/signup">Signup</a>
        </div>
      </div>
    </div>
  );
};

export default Login;