import React, { useState } from 'react';
import './CreateAcc.css';
import { Flame, PiggyBank, Hand } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // Changed from useHistory
import axios from 'axios';

const Account = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Changed from history

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      setMessage(response.data.message);
      // Redirect to Connexion.jsx page
      navigate('/connexion'); // <-- change here
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo">ε-cv</div>
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
        </div>
        <p>or use your email</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="sign-in-btn">Create Account</button>
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <div className="links">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Account;
