import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './GetStarted.css';

const GetStarted = () => {
  const navigate = useNavigate();

  const handleYesClick = () => {
    navigate('/upload-resume');
  };

  return (
    <div className="get-started-container">
      <div className="progress-bar">
        <span className="step active">1</span>
        <span className="step">2</span>
        <span className="step">3</span>
      </div>
      <button className="login-btn"><Link to="/login">Login</Link></button>
      <div className="content">
        <div className="background-shapes"></div>
        <img src="https://via.placeholder.com/100" alt="Profile" className="profile-pic" />
        <h2>Do you have an existing resume to use as a starting point?</h2>
        <div className="buttons">
          <button className="yes-btn" onClick={handleYesClick}>Yes</button>
          <button className="no-btn">No</button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;