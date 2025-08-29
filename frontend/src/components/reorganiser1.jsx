// src/reorganiser1.jsx

import React, { useState, useCallback, memo, useRef } from 'react';
import { X, Mail, Phone, MapPin, Download, Printer } from 'lucide-react';
import './reorganiser1.css';

const EditableInput = memo(({ value, onChange, placeholder, multiline = false, className }) => {
  const handleChange = useCallback((e) => {
    onChange(e.target.value);
  }, [onChange]);

  return multiline ? (
    <textarea
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={`editable-input ${className || ''}`}
      rows={3}
      aria-label={placeholder}
    />
  ) : (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={`editable-input ${className || ''}`}
      aria-label={placeholder}
    />
  );
});

EditableInput.displayName = 'EditableInput';

const CVTemplate = ({ onClose, onNext }) => {
  const cvTemplateRef = useRef(null);

  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const [experiences, setExperiences] = useState([
    { id: `exp-${Date.now()}`, jobTitle: '', company: '', dates: '', responsibilities: [''] }
  ]);
  const [education, setEducation] = useState([
    { id: `edu-${Date.now()}`, degree: '', institution: '', year: '', details: ['', ''] }
  ]);
  const [profile, setProfile] = useState('');
  const [skills, setSkills] = useState([
    { id: `skill-${Date.now()}`, category: '', skillsList: '' }
  ]);
  const [achievements, setAchievements] = useState([
    { id: `achievement-${Date.now()}`, achievement: '' }
  ]);

  const updateExperience = useCallback((index, field, value) => {
    setExperiences(prev => {
      const newExperiences = [...prev];
      newExperiences[index] = { ...newExperiences[index], [field]: value };
      return newExperiences;
    });
  }, []);

  const updateExperienceResponsibility = useCallback((expIndex, respIndex, value) => {
    setExperiences(prev => {
      const newExperiences = [...prev];
      const newResponsibilities = [...newExperiences[expIndex].responsibilities];
      newResponsibilities[respIndex] = value;
      newExperiences[expIndex] = { ...newExperiences[expIndex], responsibilities: newResponsibilities };
      return newExperiences;
    });
  }, []);

  const addExperience = useCallback(() => {
    setExperiences(prev => [
      ...prev,
      { id: `exp-${Date.now()}-${Math.random()}`, jobTitle: '', company: '', dates: '', responsibilities: [''] }
    ]);
  }, []);

  const removeExperience = useCallback((index) => {
    setExperiences(prev => prev.filter((_, i) => i !== index));
  }, []);

  const updateEducation = useCallback((index, field, value) => {
    setEducation(prev => {
      const newEducation = [...prev];
      newEducation[index] = { ...newEducation[index], [field]: value };
      return newEducation;
    });
  }, []);

  const updateEducationDetail = useCallback((eduIndex, detailIndex, value) => {
    setEducation(prev => {
      const newEducation = [...prev];
      const newDetails = [...newEducation[eduIndex].details];
      newDetails[detailIndex] = value;
      newEducation[eduIndex] = { ...newEducation[eduIndex], details: newDetails };
      return newEducation;
    });
  }, []);

  const addEducation = useCallback(() => {
    setEducation(prev => [
      ...prev,
      { id: `edu-${Date.now()}-${Math.random()}`, degree: '', institution: '', year: '', details: ['', ''] }
    ]);
  }, []);

  const removeEducation = useCallback((index) => {
    setEducation(prev => prev.filter((_, i) => i !== index));
  }, []);

  const updateSkill = useCallback((index, field, value) => {
    setSkills(prev => {
      const newSkills = [...prev];
      newSkills[index] = { ...newSkills[index], [field]: value };
      return newSkills;
    });
  }, []);

  const addSkill = useCallback(() => {
    setSkills(prev => [
      ...prev,
      { id: `skill-${Date.now()}-${Math.random()}`, category: '', skillsList: '' }
    ]);
  }, []);

  const removeSkill = useCallback((index) => {
    setSkills(prev => prev.filter((_, i) => i !== index));
  }, []);

  const updateAchievement = useCallback((index, value) => {
    setAchievements(prev => {
      const newAchievements = [...prev];
      newAchievements[index] = { ...newAchievements[index], achievement: value };
      return newAchievements;
    });
  }, []);

  const addAchievement = useCallback(() => {
    setAchievements(prev => [
      ...prev,
      { id: `achievement-${Date.now()}-${Math.random()}`, achievement: '' }
    ]);
  }, []);

  const removeAchievement = useCallback((index) => {
    setAchievements(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleImageUpload = useCallback((event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target?.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleNext = useCallback(() => {
    if (onNext) {
      const data = {
        name,
        title,
        profile,
        contact: {
          phone,
          email,
          address: city,
        },
        experiences,
        education,
        skills,
        achievements,
        profileImage,
      };
      onNext(data);
    }
  }, [onNext, name, title, profile, phone, email, city, experiences, education, skills, achievements, profileImage]);

  return (
    <>
      <div className="modal">
        <div className="template-container">
          {onClose && (
            <button onClick={onClose} className="close-button no-print">
              <X size={24} />
            </button>
          )}

          <div id="cv-template-to-print" ref={cvTemplateRef} className="cv-content">
            <div className="cv-header">
              <div className="profile-and-name">
                <div className="image-container" onClick={() => document.getElementById('imageUpload')?.click()}>
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="profile-image"
                    />
                  ) : (
                    <div className="image-placeholder">
                      Click to add photo
                    </div>
                  )}
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                <div className="name-and-contact">
                  <div className="name-container">
                    <EditableInput
                      value={name}
                      onChange={setName}
                      placeholder="Your Full Name"
                      className="name-input"
                    />
                    <EditableInput
                      value={title}
                      onChange={setTitle}
                      placeholder="Job Title"
                      className="title-input"
                    />
                  </div>
                  <div className="contact-info">
                    <div className="contact-item">
                      <Mail size={16} color="#4F46E5" />
                      <EditableInput
                        value={email}
                        onChange={setEmail}
                        placeholder="email@example.com"
                        className="email-input"
                      />
                    </div>
                    <div className="contact-item">
                      <Phone size={16} color="#4F46E5" />
                      <EditableInput
                        value={phone}
                        onChange={setPhone}
                        placeholder="Phone"
                        className="phone-input"
                      />
                    </div>
                    <div className="contact-item">
                      <MapPin size={16} color="#4F46E5" />
                      <EditableInput
                        value={city}
                        onChange={setCity}
                        placeholder="City"
                        className="city-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="columns">
              <div className="column">
                <div className="section">
                  <h2 className="section-title">Professional Experience</h2>
                  <div className="section-content">
                    {experiences.map((exp, index) => (
                      <div key={exp.id} className="experience-item">
                        <EditableInput
                          value={exp.jobTitle}
                          onChange={(value) => updateExperience(index, 'jobTitle', value)}
                          placeholder="Job Title"
                          className="job-title"
                        />
                        <EditableInput
                          value={exp.company}
                          onChange={(value) => updateExperience(index, 'company', value)}
                          placeholder="Company Name"
                          className="company"
                        />
                        <EditableInput
                          value={exp.dates}
                          onChange={(value) => updateExperience(index, 'dates', value)}
                          placeholder="Dates (e.g., Jan 2020 - Dec 2022)"
                          className="dates"
                        />
                        <ul className="responsibility-list">
                          {exp.responsibilities.map((resp, respIndex) => (
                            <li key={`${exp.id}-resp-${respIndex}`}>
                              <EditableInput
                                value={resp}
                                onChange={(value) => updateExperienceResponsibility(index, respIndex, value)}
                                placeholder="Key responsibility or achievement"
                                className="responsibility"
                              />
                            </li>
                          ))}
                        </ul>
                        {experiences.length > 1 && (
                          <button onClick={() => removeExperience(index)} className="remove-button no-print">
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button onClick={addExperience} className="add-button no-print">
                      + Add Experience
                    </button>
                  </div>
                </div>

                <div className="section">
                  <h2 className="section-title">Achievements</h2>
                  <div className="section-content">
                    <div className="achievements-section">
                      <ul className="achievements-list">
                        {achievements.map((achievement, index) => (
                          <li key={achievement.id}>
                            <EditableInput
                              value={achievement.achievement}
                              onChange={(value) => updateAchievement(index, value)}
                              placeholder={
                                index === 0 ? "Quantified achievement with metrics (e.g., Increased sales by 20%)" :
                                index === 1 ? "Award or recognition received (e.g., Employee of the Year 2023)" :
                                "Impact generated for the company (e.g., Led a team that reduced operational costs)"
                              }
                              className="achievement"
                            />
                            {achievements.length > 1 && (
                              <button onClick={() => removeAchievement(index)} className="remove-button achievement-remove no-print">
                                Remove
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                      <button onClick={addAchievement} className="add-button no-print">
                        + Add Achievement
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="column">
                <div className="section">
                  <h2 className="section-title">Education</h2>
                  <div className="section-content">
                    {education.map((edu, index) => (
                      <div key={edu.id} className="education-item">
                        <EditableInput
                          value={edu.degree}
                          onChange={(value) => updateEducation(index, 'degree', value)}
                          placeholder="Degree"
                          className="degree"
                        />
                        <EditableInput
                          value={edu.institution}
                          onChange={(value) => updateEducation(index, 'institution', value)}
                          placeholder="Institution"
                          className="institution"
                        />
                        <EditableInput
                          value={edu.year}
                          onChange={(value) => updateEducation(index, 'year', value)}
                          placeholder="Year"
                          className="year"
                        />
                        <ul className="detail-list">
                          {edu.details.map((detail, detIndex) => (
                            <li key={`${edu.id}-detail-${detIndex}`}>
                              <EditableInput
                                value={detail}
                                onChange={(value) => updateEducationDetail(index, detIndex, value)}
                                placeholder={detIndex === 0 ? "Thesis or specialization" : "Academic project"}
                                className="detail"
                              />
                            </li>
                          ))}
                        </ul>
                        {education.length > 1 && (
                          <button onClick={() => removeEducation(index)} className="remove-button no-print">
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button onClick={addEducation} className="add-button no-print">
                      + Add Education
                    </button>
                  </div>
                </div>

                <div className="section">
                  <h2 className="section-title">Professional Profile</h2>
                  <div className="section-content">
                    <div className="profile-section">
                      <EditableInput
                        value={profile}
                        onChange={setProfile}
                        placeholder="Describe your professional profile, areas of expertise, and what makes you unique..."
                        multiline={true}
                        className="profile"
                      />
                    </div>
                  </div>
                </div>

                <div className="section">
                  <h2 className="section-title">Skills</h2>
                  <div className="section-content">
                    <div className="skills-section">
                      {skills.map((skill, index) => (
                        <div key={skill.id} className="skill-item">
                          <EditableInput
                            value={skill.category}
                            onChange={(value) => updateSkill(index, 'category', value)}
                            placeholder="Skill Category (e.g., Programming Languages, Tools)"
                            className="skill-category"
                          />
                          <EditableInput
                            value={skill.skillsList}
                            onChange={(value) => updateSkill(index, 'skillsList', value)}
                            placeholder="List your skills (e.g., JavaScript, React, Node.js)"
                            multiline={true}
                            className="skills-list"
                          />
                          {skills.length > 1 && (
                            <button onClick={() => removeSkill(index)} className="remove-button no-print">
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button onClick={addSkill} className="add-button no-print">
                        + Add Skill Category
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="action-buttons no-print">
            <button
              onClick={handleNext}
              className="next-button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CVTemplate;