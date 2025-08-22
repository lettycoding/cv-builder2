import React, { useState } from 'react';
import './Login.css';
import { Flame, PiggyBank, Hand } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader'; // Import the Loader component

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true); // Show loader

    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      setMessage(response.data.message);
      // Store the token and redirect to Connexion.jsx
      localStorage.setItem('token', response.data.token);
      
      // Small delay to show success message before redirect
      setTimeout(() => {
        navigate('/connexion');
      }, 1000);
      
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login');
      setIsLoading(false); // Hide loader on error
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo">Îµ-cv</div>
        <h2>Create a resume you are proud of</h2>
        <ul className="features-list">
          <li><PiggyBank className="icon" /> Save time with hassle-free templates</li>
          <li><Hand className="icon" /> Beat the competition using actionable, contextual advice</li>
          <li><Flame className="icon" /> Highlight key achievements with memorable visuals</li>
        </ul>
        <p>Get inspired by 1800+ Free Resume Examples and Templates</p>
      </div>
      <div className="login-right">
        <h2>Sign in to your account</h2>
        <div className="social-buttons">
          <button className="social-btn linkedin">LinkedIn</button>
          <button className="social-btn google">Google</button>
          <button className="social-btn facebook">Facebook</button>
        </div>
        <p>or use your email</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading} // Disable input during loading
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading} // Disable input during loading
          />
          <button 
            type="submit" 
            className="sign-in-btn"
            disabled={isLoading} // Disable button during loading
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        {/* Show loader when loading */}
        {isLoading && (
          <div className="loader-container">
            <Loader />
          </div>
        )}
        
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <div className="links">
          <a href="#">Forgot your password?</a>
          <p>First time here? <Link to="/account">Create an account</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;