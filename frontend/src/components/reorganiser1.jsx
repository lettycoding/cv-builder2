import React, { useState, useCallback, memo, useRef } from 'react';
import { X, GripVertical, Mail, Phone, MapPin, Download, Printer, Linkedin, Upload } from 'lucide-react';
import html2pdf from 'html2pdf.js';
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

const LinkedInImportModal = ({ isOpen, onClose, onImport }) => {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const parseLinkedInProfile = async (url) => {
    setIsLoading(true);
    setError('');
    
    // Simulate a network request to a LinkedIn API
    try {
      // In a real application, you'd call a backend service here
      // that handles the LinkedIn API integration.
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock data to simulate a successful API response
      const mockProfile = {
        name: 'John Doe',
        title: 'Senior Full Stack Developer',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        city: 'New York, USA',
        profile: 'Passionate Full Stack Developer with over 5 years of experience in building modern web applications. Expertise in React, Node.js, and cloud technologies.',
        experiences: [
          {
            id: `exp-${Date.now()}`,
            jobTitle: 'Senior Full Stack Developer',
            company: 'TechCorp Solutions',
            dates: 'Jan 2022 - Present',
            responsibilities: [
              'Developed React applications with TypeScript',
              'Architected and deployed Node.js APIs',
              'Mentored a team of 3 junior developers'
            ]
          },
          {
            id: `exp-${Date.now() + 1}`,
            jobTitle: 'Web Developer',
            company: 'StartupTech',
            dates: 'Mar 2019 - Dec 2021',
            responsibilities: [
              'Developed front-end with React and Vue.js',
              'Integrated REST and GraphQL APIs',
              'Optimized web performance'
            ]
          }
        ],
        education: [
          {
            id: `edu-${Date.now()}`,
            degree: 'Master of Science in Computer Science',
            institution: 'University of New York',
            year: '2019',
            details: [
              'Specialization in web development',
              'Final project on AI applied to the web'
            ]
          }
        ],
        skills: {
          languages: 'JavaScript, TypeScript, Python, Java',
          frameworks: 'React, Node.js, Express, Vue.js, Django',
          tools: 'Git, Docker, AWS, MongoDB, PostgreSQL',
          softSkills: 'Leadership, Communication, Problem-solving, Teamwork'
        },
        achievements: [
          'Increased application performance by 40%',
          'Certified AWS Solutions Architect',
          'Finalist in the TechChallenge 2023 hackathon'
        ]
      };
      
      onImport(mockProfile);
      onClose();
    } catch (err) {
      setError('Error importing LinkedIn profile. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = () => {
    if (!linkedinUrl.trim()) {
      setError('Please enter a valid LinkedIn URL');
      return;
    }
    
    if (!linkedinUrl.includes('linkedin.com')) {
      setError('Please enter a valid LinkedIn URL');
      return;
    }
    
    parseLinkedInProfile(linkedinUrl);
  };

  if (!isOpen) return null;

  return (
    <div className="linkedin-modal-overlay">
      <div className="linkedin-modal">
        <button onClick={onClose} className="close-button">
          <X size={24} />
        </button>
        
        <div className="linkedin-modal-content">
          <div className="linkedin-icon-container">
            <Linkedin size={48} color="#0077B5" />
          </div>
          
          <h2 className="linkedin-modal-title">Import from LinkedIn</h2>
          <p className="linkedin-modal-description">
            Enter your LinkedIn profile URL to automatically fill your CV
          </p>
          
          <div className="linkedin-input-container">
            <input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://www.linkedin.com/in/your-profile"
              className="linkedin-input"
              disabled={isLoading}
            />
          </div>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className="linkedin-modal-buttons">
            <button 
              onClick={onClose} 
              className="cancel-button"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              onClick={handleImport} 
              className="import-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  Importing...
                </>
              ) : (
                <>
                  <Upload size={16} />
                  Import
                </>
              )}
            </button>
          </div>
          
          <div className="linkedin-disclaimer">
            <small>
              Note: This feature is in demo mode. In a production environment,
              it would require the LinkedIn API or special permissions.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

const CVSectionOrganizer1 = ({ onClose }) => {
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
  const [showLinkedInImport, setShowLinkedInImport] = useState(false);
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
  const [skills, setSkills] = useState({
    allSkills: ''
  });
  const [achievements, setAchievements] = useState(['', '', '']);

  // New function to handle data imported from LinkedIn
  const handleLinkedInImport = useCallback((profileData) => {
    setName(profileData.name || '');
    setTitle(profileData.title || '');
    setEmail(profileData.email || '');
    setPhone(profileData.phone || '');
    setCity(profileData.city || '');
    setProfile(profileData.profile || '');
    
    // Set experiences, handling potential empty responsibilities
    if (profileData.experiences) {
      setExperiences(profileData.experiences.map(exp => ({ 
        ...exp, 
        responsibilities: exp.responsibilities && exp.responsibilities.length > 0 ? exp.responsibilities : [''] 
      })));
    }
    
    // Set education
    if (profileData.education) {
      setEducation(profileData.education);
    }
    
    // Set skills, joining them into a single string
    if (profileData.skills) {
      setSkills({ allSkills: Object.values(profileData.skills).join(', ') });
    }
    
    // Set achievements
    if (profileData.achievements) {
      setAchievements(profileData.achievements);
    }
    
    // Automatically switch to the template view after import
    setShowTemplate(true);
  }, []);

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

  const updateSkill = useCallback((value) => {
    setSkills({ allSkills: value });
  }, []);

  const updateAchievement = useCallback((index, value) => {
    setAchievements(prev => {
      const newAchievements = [...prev];
      newAchievements[index] = value;
      return newAchievements;
    });
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
      // Find the achievements section and hide it if all its children are empty
      const achievementSection = element.querySelector('.achievements-section');
      if (achievementSection) {
        const achievementInputs = achievementSection.querySelectorAll('.achievement');
        const hasContent = Array.from(achievementInputs).some(input => input.value.trim() !== '');
        if (!hasContent) {
          achievementSection.style.display = 'none';
        }
      }

      const opt = {
        margin: 0.5,
        filename: `CV_${name || 'MyCV'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      
      html2pdf().from(element).set(opt).save().then(() => {
        // Restore visibility after download
        if (achievementSection) {
          achievementSection.style.display = '';
        }
      });
    }
  }, [name, cvTemplateRef]);

  const printCV = useCallback(() => {
    const element = cvTemplateRef.current;
    if (element) {
      // Hide action buttons for printing
      const actionButtons = element.querySelector('.action-buttons');
      if (actionButtons) actionButtons.style.display = 'none';

      // Find the achievements section and hide it if all its children are empty
      const achievementSection = element.querySelector('.achievements-section');
      if (achievementSection) {
        const achievementInputs = achievementSection.querySelectorAll('.achievement');
        const hasContent = Array.from(achievementInputs).some(input => input.value.trim() !== '');
        if (!hasContent) {
          achievementSection.style.display = 'none';
        }
      }

      const printWindow = window.open('', '_blank');
      if (!printWindow) return;

      const content = `
        <html>
          <head>
            <title>CV - ${name || 'My CV'}</title>
            <style>
              body {
                font-family: 'Georgia', serif;
                margin: 0;
                padding: 20px;
                line-height: 1.6;
                color: #333;
                background-color: white;
              }
              .cv-content {
                width: 8.5in;
                height: 11in;
                margin: 0 auto;
                box-sizing: border-box;
                padding: 0;
              }
              .cv-header {
                padding: 10px 0 20px 0;
                border-bottom: 2px solid #4F46E5;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 20px;
              }
              .profile-image {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                object-fit: cover;
                border: 2px solid #4F46E5;
              }
              .name-container {
                flex-grow: 1;
              }
              .name-input {
                font-size: 28px;
                font-weight: bold;
                margin: 0 0 5px 0;
                color: #1F2937;
              }
              .title-input {
                font-size: 16px;
                color: #6B7280;
              }
              .contact-info {
                font-size: 14px;
                color: #6B7280;
                text-align: right;
              }
              .contact-item {
                display: block;
              }
              .columns {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 30px;
              }
              .column {
                display: flex;
                flex-direction: column;
                gap: 20px;
              }
              .section {
                break-inside: avoid;
                margin: 0;
              }
              .section-title {
                font-size: 18px;
                font-weight: bold;
                color: #4F46E5;
                margin-bottom: 10px;
                border-bottom: 1px solid #E5E7EB;
                padding-bottom: 5px;
              }
              .section-content ul {
                margin: 0;
                padding-left: 20px;
              }
              .section-content li {
                margin-bottom: 5px;
              }
              .experience-item, .education-item, .project-item {
                margin-bottom: 15px;
                padding: 10px;
                background-color: #F9FAFB;
                border-radius: 6px;
                break-inside: avoid;
              }
              .job-title, .degree {
                font-weight: bold;
                font-size: 14px;
                margin: 0 0 3px 0;
              }
              .company, .institution {
                font-style: italic;
                font-size: 13px;
                margin: 0 0 5px 0;
              }
              .responsibility-list li, .detail-list li, .achievements-list li {
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            ${element.innerHTML}
          </body>
        </html>
      `;

      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.focus();

      setTimeout(() => {
        printWindow.print();
        printWindow.close();
        // Restore visibility after printing
        if (actionButtons) actionButtons.style.display = '';
        if (achievementSection) achievementSection.style.display = '';
      }, 500);
    }
  }, [name, cvTemplateRef]);

  // Updated renderSection to dynamically render achievements
  const renderSection = useCallback((section) => {
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
                        placeholder="Responsibility"
                        className="responsibility"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <button onClick={addExperience} className="add-button">
              + Add Experience
            </button>
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
              </div>
            ))}
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
          </div>
        );

      case 'Skills':
        return (
          <div className="skills-section">
            <EditableInput
              value={skills.allSkills}
              onChange={(value) => updateSkill(value)}
              placeholder="Write down your skills here..."
              multiline={true}
              className="skill-single"
            />
          </div>
        );

      case 'Achievements':
        // Display a list of editable inputs for achievements, including empty ones
        return (
          <div className="achievements-section">
            <ul className="achievements-list">
              {achievements.map((achievement, index) => (
                <li key={`achievement-${index}`}>
                  <EditableInput
                    value={achievement}
                    onChange={(value) => updateAchievement(index, value)}
                    placeholder={
                      index === 0 ? "Quantified achievement with metrics (e.g., Increased sales by 20%)" :
                      index === 1 ? "Award or recognition received (e.g., Employee of the Year 2023)" :
                      "Impact generated for the company (e.g., Led a team that reduced operational costs)"
                    }
                    className="achievement"
                  />
                </li>
              ))}
            </ul>
          </div>
        );

      default:
        return <div>Section not recognized</div>;
    }
  }, [experiences, education, profile, skills, achievements, updateExperience, updateExperienceResponsibility, updateEducation, updateEducationDetail, updateSkill, updateAchievement, addExperience]);

  const renderTemplate = () => {
    const leftSections = getColumnSections('left');
    const rightSections = getColumnSections('right');

    return (
      <div className="template-container">
        <button 
          onClick={() => setShowTemplate(false)}
          className="close-button"
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
                  <div 
                    className="image-placeholder"
                  >
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

        <div className="action-buttons">
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
    <div className="modal">
      
      <LinkedInImportModal 
        isOpen={showLinkedInImport}
        onClose={() => setShowLinkedInImport(false)}
        onImport={handleLinkedInImport}
      />
      
      {showTemplate ? renderTemplate() : (
        <div className="organizer-container">
          <button onClick={onClose} className="close-button">
            <X size={24} />
          </button>

          <h2 className="organizer-title">
            Drag and drop to rearrange CV sections
          </h2>

          <div className="linkedin-import-section">
            <button 
              onClick={() => setShowLinkedInImport(true)}
              className="linkedin-import-button"
            >
              <Linkedin size={20} />
              Import from LinkedIn
            </button>
            
            <div className="import-divider">
              <span>or create manually</span>
            </div>
          </div>

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
  );
};

export default CVSectionOrganizer1;
