import React, { useState, useCallback, memo, useRef } from 'react';
import { X, GripVertical, Mail, Phone, MapPin, Download, Printer, Bot } from 'lucide-react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

const AIHelpButton = memo(({ sectionType, onAIHelp, sectionContent }) => {
  const [showAIInput, setShowAIInput] = useState(false);
  const [aiQuery, setAIQuery] = useState('');
  const [aiResponse, setAIResponse] = useState('');
  const [isAILoading, setIsAILoading] = useState(false);

  const handleAIHelp = useCallback(async () => {
    if (!aiQuery.trim()) return;

    setIsAILoading(true);

    try {
      // Ensure sectionContent is a valid object
      const content = sectionContent || {};
      const prompt = `For a CV ${sectionType} section, perform the following: ${aiQuery}. Current content: ${JSON.stringify(content)}`;

      console.log('Sending prompt to backend:', prompt); // Debug log

      // Send POST request to backend
      const response = await axios.post('http://localhost:5000/api/ai/ask', { prompt });

      const aiResult = response.data.answer || 'No response received';
      console.log('AI Response:', aiResult); // Debug log
      setAIResponse(aiResult);
    } catch (error) {
      console.error('AI help error:', error.message, error.response?.data); // Enhanced error logging
      alert('Failed to fetch AI response. Please check your connection or try again later.');
    } finally {
      setIsAILoading(false);
    }
  }, [aiQuery, sectionType, sectionContent]);

  const handleApplyResponse = useCallback(() => {
    if (aiResponse) {
      console.log('Applying AI response:', aiResponse, 'to section:', sectionType); // Debug log
      onAIHelp(aiResponse, sectionType);
      setAIResponse('');
      setShowAIInput(false);
      setAIQuery('');
    }
  }, [aiResponse, onAIHelp, sectionType]);

  const getPlaceholder = () => {
    switch (sectionType) {
      case 'experience':
        return 'e.g., Correct spelling errors in my responsibilities or Write a new responsibility';
      case 'education':
        return 'e.g., Format my education details or Correct spelling errors';
      case 'profile':
        return 'e.g., Improve my profile summary or Correct spelling errors';
      case 'skills':
        return 'e.g., Suggest skills for my field or Correct spelling errors';
      case 'achievements':
        return 'e.g., Write a quantified achievement or Correct spelling errors';
      default:
        return 'Ask AI for help with this section';
    }
  };

  return (
    <div className="ai-help-section no-print">
      {!showAIInput ? (
        <button
          onClick={() => setShowAIInput(true)}
          className="ai-help-button no-print"
          type="button"
        >
          <Bot size={16} />
          Ask AI for help
        </button>
      ) : (
        <div className="ai-input-container no-print">
          <input
            type="text"
            value={aiQuery}
            onChange={(e) => setAIQuery(e.target.value)}
            placeholder={getPlaceholder()}
            className="ai-input"
            onKeyPress={(e) => e.key === 'Enter' && handleAIHelp()}
          />
          {aiResponse && (
            <textarea
              value={aiResponse}
              readOnly
              placeholder="AI response will appear here"
              className="ai-response-textarea"
              rows={4}
            />
          )}
          <div className="ai-buttons">
            <button
              onClick={handleAIHelp}
              className="ai-submit-button"
              disabled={isAILoading || !aiQuery.trim()}
              type="button"
            >
              {isAILoading ? '...' : 'Ask'}
            </button>
            {aiResponse && (
              <button
                onClick={handleApplyResponse}
                className="ai-apply-button"
                type="button"
              >
                Apply
              </button>
            )}
            <button
              onClick={() => {
                setShowAIInput(false);
                setAIQuery('');
                setAIResponse('');
              }}
              className="ai-cancel-button"
              type="button"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

AIHelpButton.displayName = 'AIHelpButton';

const EditableInput = memo(({ value, onChange, placeholder, multiline = false, className }) => {
  const handleChange = useCallback((e) => {
    onChange(e.target.value);
  }, [onChange]);

  const InputComponent = multiline ? 'textarea' : 'input';
  const inputProps = multiline
    ? { rows: 3 }
    : { type: 'text' };

  return (
    <InputComponent
      {...inputProps}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={`editable-input ${className || ''}`}
      aria-label={placeholder}
    />
  );
});

EditableInput.displayName = 'EditableInput';

const CVSectionOrganizer2 = ({ onClose }) => {
  const [sections, setSections] = useState([
    { id: 1, name: 'Professional Exp.', fullName: 'Professional Experience', column: 'left' },
    { id: 2, name: 'Education', fullName: 'Education', column: 'right' },
    { id: 4, name: 'Professional Profile', fullName: 'Professional Profile', column: 'right' },
    { id: 5, name: 'Achievements', fullName: 'Achievements', column: 'left' },
    { id: 6, name: 'Skills', fullName: 'Skills', column: 'right' }
  ]);

  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [showTemplate, setShowTemplate] = useState(false);
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

  const handleDragStart = useCallback((e, section) => {
    setDraggedItem(section);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e, column) => {
    e.preventDefault();
    setDragOverColumn(column);
  }, []);

  const handleDrop = useCallback((e, targetColumn) => {
    e.preventDefault();
    if (!draggedItem) return;

    setSections(prev =>
      prev.map(section =>
        section.id === draggedItem.id
          ? { ...section, column: targetColumn }
          : section
      )
    );

    setDraggedItem(null);
    setDragOverColumn(null);
  }, [draggedItem]);

  const getColumnSections = useCallback((column) => {
    return sections.filter(section => section.column === column);
  }, [sections]);

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

  const handleAIHelp = useCallback((aiContent, sectionType) => {
    console.log('Handling AI content:', aiContent, 'for section:', sectionType); // Debug log
    try {
      switch (sectionType) {
        case 'experience':
          if (experiences.length > 0) {
            setExperiences(prev => {
              const newExp = [...prev];
              if (newExp[0].responsibilities[0] === '') {
                newExp[0].responsibilities[0] = aiContent;
              } else {
                newExp[0].responsibilities.push(aiContent);
              }
              return newExp;
            });
          }
          break;
        case 'education':
          if (education.length > 0) {
            const parts = aiContent.split(' - ');
            if (parts.length >= 2) {
              setEducation(prev => {
                const newEdu = [...prev];
                newEdu[0] = {
                  ...newEdu[0],
                  degree: parts[0] || newEdu[0].degree,
                  institution: parts[1] || newEdu[0].institution,
                  year: parts[2] || newEdu[0].year
                };
                return newEdu;
              });
            } else {
              setEducation(prev => {
                const newEdu = [...prev];
                newEdu[0].details[0] = aiContent;
                return newEdu;
              });
            }
          }
          break;
        case 'profile':
          setProfile(aiContent);
          break;
        case 'skills':
          if (skills.length > 0) {
            setSkills(prev => {
              const newSkills = [...prev];
              newSkills[0] = {
                ...newSkills[0],
                category: 'Technical Skills',
                skillsList: aiContent
              };
              return newSkills;
            });
          }
          break;
        case 'achievements':
          if (achievements.length > 0) {
            setAchievements(prev => {
              const newAchievements = [...prev];
              newAchievements[0] = {
                ...newAchievements[0],
                achievement: aiContent
              };
              return newAchievements;
            });
          }
          break;
        default:
          console.warn('Unknown section type:', sectionType);
      }
    } catch (error) {
      console.error('Error in handleAIHelp:', error);
    }
  }, [experiences, education, profile, skills, achievements]);

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

  const downloadCV = useCallback(() => {
    const element = cvTemplateRef.current;
    if (element) {
      // Clone the element to avoid modifying the original DOM
      const clonedElement = element.cloneNode(true);
      // Remove all elements with the no-print class
      const noPrintElements = clonedElement.querySelectorAll('.no-print');
      noPrintElements.forEach(el => el.remove());

      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5], // top, left, bottom, right in inches
        filename: `${name.replace(/\s+/g, '_') || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      html2pdf().from(clonedElement).set(opt).save();
    }
  }, [name]);

  const printCV = useCallback(() => {
    window.print();
  }, []);

  const getSectionContent = useCallback((sectionName) => {
    switch (sectionName) {
      case 'Professional Experience':
        return experiences[0] || {};
      case 'Education':
        return education[0] || {};
      case 'Professional Profile':
        return { profile };
      case 'Skills':
        return skills[0] || {};
      case 'Achievements':
        return achievements[0] || {};
      default:
        return {};
    }
  }, [experiences, education, profile, skills, achievements]);

  const renderSection = useCallback((section) => {
    const sectionContent = getSectionContent(section.fullName);
    switch (section.fullName) {
      case 'Professional Experience':
        return (
          <div>
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
                  {exp.responsibilities.slice(0, 1).map((resp, respIndex) => (
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
            <AIHelpButton sectionType="experience" onAIHelp={handleAIHelp} sectionContent={sectionContent} />
          </div>
        );

      case 'Education':
        return (
          <div>
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
            <AIHelpButton sectionType="education" onAIHelp={handleAIHelp} sectionContent={sectionContent} />
          </div>
        );

      case 'Professional Profile':
        return (
          <div className="profile-section">
            <EditableInput
              value={profile}
              onChange={setProfile}
              placeholder="Describe your professional profile, areas of expertise, and what makes you unique..."
              multiline={true}
              className="profile"
            />
            <AIHelpButton sectionType="profile" onAIHelp={handleAIHelp} sectionContent={sectionContent} />
          </div>
        );

      case 'Skills':
        return (
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
            <AIHelpButton sectionType="skills" onAIHelp={handleAIHelp} sectionContent={sectionContent} />
          </div>
        );

      case 'Achievements':
        return (
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
            <AIHelpButton sectionType="achievements" onAIHelp={handleAIHelp} sectionContent={sectionContent} />
          </div>
        );

      default:
        return <div>Section not recognized</div>;
    }
  }, [experiences, education, profile, skills, achievements, updateExperience, updateExperienceResponsibility, updateEducation, updateEducationDetail, updateSkill, updateAchievement, addExperience, addEducation, addSkill, addAchievement, removeExperience, removeEducation, removeSkill, removeAchievement, getSectionContent]);

  const renderTemplate = () => {
    const leftSections = getColumnSections('left');
    const rightSections = getColumnSections('right');

    return (
      <div className="template-container">
        <button
          onClick={() => setShowTemplate(false)}
          className="close-button no-print"
        >
          <X size={24} />
        </button>

        <div id="cv-template-to-print" ref={cvTemplateRef} className="cv-content">
          <div className="cv-header">
            <div className="profile-and-name">
              <div className="image-container" onClick={() => document.getElementById('imageUpload')?.click()}>
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile Photo"
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
              {leftSections.map((section) => (
                <div key={section.id} className="section">
                  <h2 className="section-title">{section.fullName}</h2>
                  <div className="section-content">
                    {renderSection(section)}
                  </div>
                </div>
              ))}
            </div>

            <div className="column">
              {rightSections.map((section) => (
                <div key={section.id} className="section">
                  <h2 className="section-title">{section.fullName}</h2>
                  <div className="section-content">
                    {renderSection(section)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="action-buttons no-print">
          <button
            onClick={() => setShowTemplate(false)}
            className="return-button"
          >
            ← Return to Organizer
          </button>
          <button
            onClick={downloadCV}
            className="download-button"
          >
            <Download size={16} />
            Download PDF
          </button>
          <button
            onClick={printCV}
            className="print-button"
          >
            <Printer size={16} />
            Print
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <style jsx>{`
        :root {
          --primary-color: #4F46E5;
          --secondary-color: #10B981;
          --text-color: #374151;
          --light-gray: #F9FAFB;
          --medium-gray: #E5E7EB;
          --dark-gray: #6B7280;
          --font-family-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          --font-family-serif: 'Georgia', serif;
        }

        @media print {
          .no-print {
            display: none !important;
          }
          .modal {
            position: static;
            width: auto;
            height: auto;
            background-color: transparent;
            display: block;
          }
          .template-container {
            box-shadow: none;
            padding: 0;
            max-height: none;
            overflow: visible;
            border-radius: 0;
          }
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .organizer-container, .template-container {
          background-color: white;
          border-radius: 16px;
          padding: 32px;
          max-width: 90vw;
          position: relative;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .organizer-container {
          width: 520px;
        }

        .template-container {
          width: 900px;
          max-height: 90vh;
          overflow: auto;
        }

        .close-button {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: var(--dark-gray);
          transition: color 0.2s ease;
        }
        .close-button:hover {
          color: var(--text-color);
        }

        .organizer-title {
          font-size: 24px;
          font-weight: 600;
          color: var(--text-color);
          text-align: center;
          margin: 0 0 32px 0;
          line-height: 1.3;
        }

        .page-indicator {
          text-align: center;
          color: var(--dark-gray);
          font-size: 14px;
          margin-bottom: 24px;
        }

        .content-area {
          background-color: var(--light-gray);
          border-radius: 8px;
          padding: 20px;
          min-height: 400px;
        }

        .header-section {
          background-color: #C7D2FE;
          border-radius: 6px;
          padding: 12px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--primary-color);
          font-size: 14px;
          font-weight: 500;
        }

        .header-icon {
          width: 16px;
          height: 16px;
          background-color: var(--primary-color);
          border-radius: 2px;
        }

        .columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .column {
          min-height: 300px;
          border-radius: 6px;
          padding: 4px;
        }
        .column.drag-over {
          background-color: #EEF2FF;
        }

        .section-item {
          background-color: #E0E7FF;
          border-radius: 6px;
          padding: 12px;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: grab;
          color: var(--primary-color);
          font-size: 14px;
          font-weight: 500;
        }
        .section-item.opacity-50 {
          opacity: 0.5;
        }

        .continue-button-container {
          display: flex;
          justify-content: center;
          margin-top: 24px;
        }

        .continue-button {
          background-color: var(--secondary-color);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 16px 32px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          transform: translateY(0);
          min-width: 200px;
        }
        .continue-button:hover {
          background-color: #059669;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
        }

        .cv-content {
          font-family: var(--font-family-serif);
          line-height: 1.6;
          color: var(--text-color);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cv-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          border-bottom: 2px solid var(--primary-color);
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        .profile-and-name {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          width: 100%;
        }
        .name-and-contact {
          display: flex;
          flex-direction: column;
          gap: 15px;
          flex-grow: 1;
        }
        .image-container {
          position: relative;
          cursor: pointer;
        }
        .profile-image {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 3px solid var(--primary-color);
          object-fit: cover;
        }
        .image-placeholder {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background-color: #F3F4F6;
          border: 2px dashed #D1D5DB;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          font-size: 12px;
          color: #6B7280;
          text-align: center;
          padding: 10px;
        }
        .image-placeholder:hover {
          background-color: #E5E7EB;
          border-color: var(--primary-color);
        }
        .hidden {
          display: none;
        }
        .name-container {
          text-align: left;
        }
        .name-input {
          font-size: 32px;
          font-weight: bold;
          color: #1F2937;
        }
        .title-input {
          font-size: 18px;
          color: var(--dark-gray);
          margin-top: 5px;
        }
        .contact-info {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 25px;
          font-size: 14px;
          color: var(--dark-gray);
          margin-top: 15px;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        .contact-item .editable-input {
          min-width: 120px;
          font-size: 14px;
        }

        .section {
          margin: 0;
        }
        .section-title {
          font-size: 20px;
          font-weight: bold;
          color: var(--primary-color);
          margin-bottom: 15px;
          border-bottom: 1px solid var(--medium-gray);
          padding-bottom: 5px;
        }
        .section-content {
          color: var(--dark-gray);
          font-size: 14px;
        }
        .action-buttons {
          text-align: center;
          margin-top: 30px;
          padding: 20px;
          background-color: #F3F4F6;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          gap: 15px;
        }
        .return-button, .download-button, .print-button {
          border: none;
          border-radius: 8px;
          padding: 12px 24px;
          font-size: 14px;
          cursor: pointer;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
        }
        .return-button {
          background-color: #6B7280;
          color: white;
        }
        .return-button:hover {
          background-color: #4B5563;
        }
        .download-button {
          background-color: var(--secondary-color);
          color: white;
        }
        .download-button:hover {
          background-color: #059669;
        }
        .print-button {
          background-color: var(--primary-color);
          color: white;
        }
        .print-button:hover {
          background-color: #4338CA;
        }

        .ai-help-section {
          margin-top: 15px;
          padding-top: 10px;
          border-top: 1px solid #E5E7EB;
        }

        .ai-help-button {
          background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          font-weight: 500;
        }
        .ai-help-button:hover {
          transform: translateY(-1px);
        }

        .ai-input-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 5px;
        }

        .ai-input {
          flex: 1;
          border: 1px solid #8B5CF6;
          border-radius: 4px;
          padding: 6px 8px;
          font-size: 12px;
          outline: none;
          background-color: #FAFAFA;
        }
        .ai-input:focus {
          border-color: #7C3AED;
          box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.1);
        }

        .ai-response-textarea {
          border: 1px solid #8B5CF6;
          border-radius: 4px;
          padding: 6px 8px;
          font-size: 12px;
          background-color: #F3F4F6;
          resize: none;
          width: 100%;
          color: #374151;
        }

        .ai-buttons {
          display: flex;
          gap: 4px;
        }

        .ai-submit-button, .ai-apply-button, .ai-cancel-button {
          border: none;
          border-radius: 4px;
          padding: 6px 12px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ai-submit-button {
          background-color: #8B5CF6;
          color: white;
        }
        .ai-submit-button:hover:not(:disabled) {
          background-color: #7C3AED;
        }
        .ai-submit-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .ai-apply-button {
          background-color: #10B981;
          color: white;
        }
        .ai-apply-button:hover {
          background-color: #059669;
        }

        .ai-cancel-button {
          background-color: #EF4444;
          color: white;
        }
        .ai-cancel-button:hover {
          background-color: #DC2626;
        }

        .editable-input {
          border: 1px solid transparent;
          border-radius: 4px;
          padding: 4px 8px;
          background-color: transparent;
          font-size: inherit;
          font-family: inherit;
          color: inherit;
          width: 100%;
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        .editable-input:focus {
          border-color: var(--primary-color);
          background-color: var(--light-gray);
        }
        .editable-input::placeholder {
          color: #9CA3AF;
          opacity: 1;
        }

        .add-button {
          background-color: var(--primary-color);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 8px 16px;
          font-size: 14px;
          cursor: pointer;
          margin-top: 10px;
          transition: background-color 0.2s ease;
        }
        .add-button:hover {
          background-color: #4338CA;
        }

        .remove-button {
          background-color: #EF4444;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 12px;
          cursor: pointer;
          margin-top: 8px;
          transition: background-color 0.2s ease;
        }
        .remove-button:hover {
          background-color: #DC2626;
        }

        .achievement-remove {
          margin-left: 8px;
          margin-top: 4px;
        }

        .experience-item, .education-item, .profile-section, .skills-section, .achievements-section {
          margin-bottom: 20px;
          padding: 15px;
          background-color: var(--light-gray);
          border-radius: 8px;
        }

        .skill-item {
          margin-bottom: 15px;
          padding: 10px;
          background-color: white;
          border-radius: 6px;
          border: 1px solid var(--medium-gray);
        }

        .job-title, .degree {
          font-weight: bold;
          font-size: 16px;
        }
        .company, .institution {
          font-style: italic;
          font-size: 14px;
        }

        .responsibility-list, .detail-list, .achievements-list {
          list-style-type: disc;
          padding-left: 20px;
          margin: 10px 0 0 0;
        }
        .responsibility-list li, .detail-list li, .achievements-list li {
          margin-bottom: 5px;
          position: relative;
        }
        .responsibility, .detail, .achievement {
          font-size: 14px;
        }
        .skills-section .editable-input {
          font-size: 14px;
        }
        .profile {
          font-size: 14px;
        }
        .skill-category {
          font-weight: bold;
          margin-bottom: 5px;
        }
        .skills-list {
          border: 1px solid var(--medium-gray);
          padding: 10px;
          background-color: white;
          border-radius: 4px;
        }
      `}</style>
      <div className="modal">
        {showTemplate ? renderTemplate() : (
          <div className="organizer-container">
            <button onClick={onClose} className="close-button">
              <X size={24} />
            </button>

            <h2 className="organizer-title">
              Drag and drop to rearrange CV sections
            </h2>

            <div className="page-indicator">Page 1 of 1</div>

            <div className="content-area">
              <div className="header-section">
                <div className="header-icon"></div>
                Header
              </div>

              <div className="columns">
                <div
                  className={`column ${dragOverColumn === 'left' ? 'drag-over' : ''}`}
                  onDragOver={(e) => handleDragOver(e, 'left')}
                  onDrop={(e) => handleDrop(e, 'left')}
                >
                  {getColumnSections('left').map((section) => (
                    <div
                      key={section.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, section)}
                      className={`section-item ${draggedItem?.id === section.id ? 'opacity-50' : ''}`}
                      onDragEnd={() => setDraggedItem(null)}
                      role="button"
                      aria-grabbed={draggedItem?.id === section.id}
                      aria-label={`Move section ${section.name}`}
                    >
                      <GripVertical size={16} color="#6B7280" />
                      {section.name}
                    </div>
                  ))}
                </div>

                <div
                  className={`column ${dragOverColumn === 'right' ? 'drag-over' : ''}`}
                  onDragOver={(e) => handleDragOver(e, 'right')}
                  onDrop={(e) => handleDrop(e, 'right')}
                >
                  {getColumnSections('right').map((section) => (
                    <div
                      key={section.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, section)}
                      className={`section-item ${draggedItem?.id === section.id ? 'opacity-50' : ''}`}
                      onDragEnd={() => setDraggedItem(null)}
                      role="button"
                      aria-grabbed={draggedItem?.id === section.id}
                      aria-label={`Move section ${section.name}`}
                    >
                      <GripVertical size={16} color="#6B7280" />
                      {section.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="continue-button-container">
              <button
                onClick={() => setShowTemplate(true)}
                className="continue-button"
              >
                Continue to Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CVSectionOrganizer2;