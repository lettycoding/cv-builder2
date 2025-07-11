import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UploadResume.css';

const UploadResume = () => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="upload-resume-container">
      <div className="progress-bar">
        <span className="step active">1</span>
        <span className="step active">2</span>
        <span className="step">3</span>
      </div>
      <button className="login-btn"><Link to="/login">Login</Link></button>
      <div className="content">
        <div className="background-shapes"></div>
        <h2>Upload Your Existing Resume</h2>
        <p>Please upload your resume file to get started.</p>
        <div className="upload-area">
          <label htmlFor="resume-upload" className="upload-label">
            {fileName ? fileName : 'Choose a file...'}
          </label>
          <input
            id="resume-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>
        <button className="next-btn">Next</button>
      </div>
    </div>
  );
};

export default UploadResume;