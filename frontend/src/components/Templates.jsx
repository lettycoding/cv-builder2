// src/components/Templates.jsx

import React from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import './CVPage.css';
import { useState } from 'react';
import profilePic from '../assets/profile.jpeg';

const CVPage = ({ resumeData = {}, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    name = '',
    title = '',
    profile = '',
    contact = {},
    education = [],
    skills = [],
    languages = [],
    hobbies = [],
    profileImage = profilePic
  } = resumeData;

  const updateField = (path, value) => {
    // Placeholder function for editing
  };

  const updateArrayItem = (arrayPath, index, value) => {
    // Placeholder function for editing
  };

  const addArrayItem = (arrayPath, defaultValue) => {
    // Placeholder function for editing
  };

  const removeArrayItem = (arrayPath, index) => {
    // Placeholder function for editing
  };

  const EditableText = ({ value, onChange, className = "", multiline = false }) => {
    if (!isEditing) {
      return multiline ? (
        <p className={className}>{value}</p>
      ) : (
        <span className={className}>{value}</span>
      );
    }

    return multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${className} border border-gray-300 rounded p-1 w-full resize-none`}
        rows={3}
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${className} border border-gray-300 rounded px-1`}
      />
    );
  };
  
  const handleDownloadPDF = async () => {
    const input = document.getElementById('cv-content');
    if (!input) {
      console.error('CV content element not found!');
      return;
    }

    const elementsToHide = document.querySelectorAll('.no-print');
    elementsToHide.forEach(el => el.style.display = 'none');

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${name || 'resume'}.pdf`);

    elementsToHide.forEach(el => el.style.display = 'block');
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="action-buttons no-print">
        <button onClick={onBack} className="back-button">Go Back</button>
        <button onClick={handleDownloadPDF} className="download-button">Download as PDF</button>
      </div>
      
      <div className="cv-container" id="cv-content">
        <div className="sidebar">
          <div className="profile-image-container">
            <div className="profil-image bg-gray-300 flex items-center justify-center text-gray-600">
              {profileImage && <img src={profileImage} alt="Profile" className="profil-image" />}
            </div>
          </div>

          <div className="profil-section">
            <h3 className="text1">PROFILE</h3>
            <EditableText
              value={profile}
              onChange={(value) => updateField('profile', value)}
              className="text"
              multiline={true}
            />
          </div>

          <div className="contact-section">
            <h3 className="text">CONTACT ME</h3>
            {/* FIX: Replaced <p> with <div> to prevent nesting error */}
            <div className="text">
              📞 <EditableText
                value={contact.phone}
                onChange={(value) => updateField('contact.phone', value)}
                className="text"
              />
            </div>
            <div className="text">
              ✉️ <EditableText
                value={contact.email}
                onChange={(value) => updateField('contact.email', value)}
                className="text"
              />
            </div>
            <div className="text">
              🏠 <EditableText
                value={contact.address}
                onChange={(value) => updateField('contact.address', value)}
                className="text"
                multiline={true}
              />
            </div>
          </div>
        </div>

        <div className="right-column-container">
          <div className="header-contain">
            <div className="header-name">
              <h1>
                <EditableText
                  value={name}
                  onChange={(value) => updateField('name', value)}
                />
              </h1>
              <p>
                <EditableText
                  value={title}
                  onChange={(value) => updateField('title', value)}
                />
              </p>
            </div>
          </div>

          <div className="main-content">
            <div className="section">
              <h3 >EDUCATION</h3>
              <ul>
                {education.map((edu, index) => (
                  <li key={index}>
                    <strong>
                      <EditableText
                        value={edu.institution}
                        onChange={(value) => updateArrayItem('education', index, { ...edu, institution: value })}
                      />
                    </strong>
                    <br /><br />
                    <EditableText
                      value={edu.degree}
                      onChange={(value) => updateArrayItem('education', index, { ...edu, degree: value })}
                    /> {' '}
                    <EditableText
                      value={edu.year}
                      onChange={(value) => updateArrayItem('education', index, { ...edu, year: value })}
                    />
                    {isEditing && (
                      <button
                        onClick={() => removeArrayItem('education', index)}
                        className="ml-2 text-red-600 hover:text-red-800 text-sm"
                      >
                        ✗ Remove
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              {isEditing && (
                <button
                  onClick={() => addArrayItem('education', { school: 'New School', degree: 'New Degree', date: 'Date' })}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Add Education
                </button>
              )}
            </div>

            <div className="section">
              <h3>SKILLS</h3>
              <ul>
                {/* FIX: Correctly access skills properties */}
                {skills.map((skill, index) => (
                  <li key={index}>
                    <strong><EditableText value={skill.category} onChange={(value) => updateArrayItem('skills', index, { ...skill, category: value })} />: </strong>
                    <EditableText
                      value={skill.skillsList}
                      onChange={(value) => updateArrayItem('skills', index, { ...skill, skillsList: value })}
                    />
                    {isEditing && (
                      <button
                        onClick={() => removeArrayItem('skills', index)}
                        className="ml-2 text-red-600 hover:text-red-800 text-sm"
                      >
                        ✗
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              {isEditing && (
                <button
                  onClick={() => addArrayItem('skills', { category: 'New Category', skillsList: 'New Skill' })}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Add Skill
                </button>
              )}
            </div>

            <div className="section">
              <h3>LANGUAGE</h3>
              <ul>
                {languages && languages.map((language, index) => (
                  <li key={index}>
                    <EditableText
                      value={language}
                      onChange={(value) => updateArrayItem('languages', index, value)}
                    />
                    {isEditing && (
                      <button
                        onClick={() => removeArrayItem('languages', index)}
                        className="ml-2 text-red-600 hover:text-red-800 text-sm"
                      >
                        ✗
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              {isEditing && (
                <button
                  onClick={() => addArrayItem('languages', 'New Language')}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Add Language
                </button>
              )}
            </div>

            <div className="section">
              <h3>HOBBIES</h3>
              <ul>
                {hobbies && hobbies.map((hobby, index) => (
                  <li key={index}>
                    <EditableText
                      value={hobby}
                      onChange={(value) => updateArrayItem('hobbies', index, value)}
                    />
                    {isEditing && (
                      <button
                        onClick={() => removeArrayItem('hobbies', index)}
                        className="ml-2 text-red-600 hover:text-red-800 text-sm"
                      >
                        ✗
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              {isEditing && (
                <button
                  onClick={() => addArrayItem('hobbies', 'New Hobby')}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Add Hobby
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVPage;