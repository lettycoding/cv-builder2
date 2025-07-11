import React from 'react';
import './FeatureSection.css';
import { BiChevronDownCircle } from 'react-icons/bi';
import CustomIcon from './icons/CustomIcon';

const FeatureSection = () => {
  return (
    <>
    <div className="feature-section">
      <div className="feature-item">
        <span className="icon checkmark"><CustomIcon /></span>
        <span className="text">ATS-friendly professionally designed resumes</span>
      </div>
      <div className="separator"></div>
      <div className="feature-item">
        <span className="icon leaf">🍃</span>
        <span className="text">Change the font, color and background combinations</span>
        <a href="#" className="browse-link">Browse Resume Templates →</a>
      </div>
      <div className="separator"></div>
      <div className="feature-item">
        <span className="icon columns">⏤⏤</span>
        <span className="text">Two-column, single-column, and multi-page layouts</span>
      </div>
    </div>
    
    </>
  );
};

export default FeatureSection;