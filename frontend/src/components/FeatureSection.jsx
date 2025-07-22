import React from 'react';
import './FeatureSection.css';
//import { BiChevronDownCircle } from 'react-icons/bi';
import {Droplet,CircleCheck,Columns2} from 'lucide-react'
import { MdBorderColor } from 'react-icons/md';

const FeatureSection = () => {
  return (
    <>
    <div className="feature-section">
      <div className="feature-item">
        <span className="icon checkmark"><CircleCheck style={{color:'green'}}/></span>
        <span className="text">ATS-friendly professionally designed resumes</span>
      </div>
      <div className="separator"></div>
      <div className="feature-item">
        <span className="icon leaf"><Droplet style={{color:'green'}}/></span>
        <span className="text">Change the font, color and background combinations</span>
        <a href="#" className="browse-link">Browse Resume Templates →</a>
      </div>
      <div className="separator"></div>
      <div className="feature-item">
        <span className="icon columns"><Columns2 style={{color:'green'}}/></span>
        <span className="text">Two-column, single-column, and multi-page layouts</span>
      </div>
    </div>
    
    </>
  );
};

export default FeatureSection;