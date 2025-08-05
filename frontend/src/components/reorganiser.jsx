import React, { useState } from 'react';
import { X, GripVertical, Mail, Phone, MapPin, Camera, Download, Printer } from 'lucide-react';

const CVSectionOrganizer = () => {
  const [sections, setSections] = useState([
    { id: 1, name: 'Expérience Profes...', fullName: 'Expérience Professionnelle', column: 'left' },
    { id: 2, name: 'Formation', fullName: 'Formation', column: 'right' },
    { id: 3, name: 'Projets Open Source', fullName: 'Projets Open Source', column: 'left' },
    { id: 4, name: 'Profil Profes...', fullName: 'Profil Professionnel', column: 'right' },
    { id: 5, name: 'Réussites', fullName: 'Réussites', column: 'left' },
    { id: 6, name: 'Compétences', fullName: 'Compétences', column: 'right' }
  ]);

  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [showTemplate, setShowTemplate] = useState(false);
  const [cvData, setCvData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    city: '',
    profileImage: null,
    experiences: [
      { jobTitle: '', company: '', dates: '', responsibilities: ['', '', ''] }
    ],
    education: [
      { degree: '', institution: '', year: '', details: ['', ''] }
    ],
    profile: '',
    skills: {
      languages: '',
      frameworks: '',
      tools: '',
      softSkills: ''
    },
    projects: [
      { name: '', description: '', technologies: '', contribution: '' }
    ],
    achievements: ['', '', '']
  });

  const handleDragStart = (e, section) => {
    setDraggedItem(section);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, column) => {
    e.preventDefault();
    setDragOverColumn(column);
  };

  const handleDrop = (e, targetColumn) => {
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
  };

  const getColumnSections = (column) => {
    return sections.filter(section => section.column === column);
  };

  const handleContinueEdit = () => {
    setShowTemplate(true);
  };

  const updateCvData = (field, value, index = null, subField = null) => {
    setCvData(prev => {
      const newData = { ...prev };
      
      if (index !== null && subField) {
        if (Array.isArray(newData[field][index][subField])) {
          const subIndex = arguments[4]; // 5th argument for array index
          newData[field][index][subField][subIndex] = value;
        } else {
          newData[field][index][subField] = value;
        }
      } else if (index !== null) {
        if (Array.isArray(newData[field])) {
          newData[field][index] = value;
        }
      } else if (field.includes('.')) {
        const [mainField, subField] = field.split('.');
        newData[mainField][subField] = value;
      } else {
        newData[field] = value;
      }
      
      return newData;
    });
  };

  const addExperience = () => {
    setCvData(prev => ({
      ...prev,
      experiences: [...prev.experiences, { jobTitle: '', company: '', dates: '', responsibilities: ['', '', ''] }]
    }));
  };

  const addProject = () => {
    setCvData(prev => ({
      ...prev,
      projects: [...prev.projects, { name: '', description: '', technologies: '', contribution: '' }]
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCvData(prev => ({
          ...prev,
          profileImage: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadCV = () => {
    const element = document.createElement('a');
    const cvContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>CV - ${cvData.name || 'Mon CV'}</title>
          <style>
            body { 
              font-family: Georgia, serif; 
              margin: 0; 
              padding: 20px; 
              line-height: 1.6; 
              color: #374151;
            }
            .header { 
              text-align: center; 
              border-bottom: 2px solid #4F46E5; 
              padding-bottom: 20px; 
              margin-bottom: 30px; 
            }
            .profile-section {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 30px;
              margin-bottom: 20px;
            }
            .profile-image {
              width: 120px;
              height: 120px;
              border-radius: 50%;
              object-fit: cover;
              border: 3px solid #4F46E5;
            }
            .profile-info {
              text-align: center;
            }
            .name { 
              font-size: 32px; 
              font-weight: bold; 
              margin: 0 0 8px 0; 
              color: #1F2937; 
            }
            .contact-info { 
              font-size: 16px; 
              color: #6B7280; 
              margin: 0; 
            }
            .columns { 
              display: grid; 
              grid-template-columns: 1fr 1fr; 
              gap: 40px; 
            }
            .section { 
              margin-bottom: 30px; 
            }
            .section-title { 
              font-size: 20px; 
              font-weight: bold; 
              color: #4F46E5; 
              margin-bottom: 15px; 
              border-bottom: 1px solid #E5E7EB; 
              padding-bottom: 5px; 
            }
            .section-content { 
              color: #6B7280; 
              font-size: 14px; 
            }
            .experience-item, .project-item, .education-item {
              margin-bottom: 15px;
              padding: 15px;
              background-color: #F9FAFB;
              border-radius: 8px;
            }
            .job-title, .project-name, .degree {
              font-weight: bold;
              margin-bottom: 5px;
            }
            .company, .institution {
              font-style: italic;
              margin-bottom: 5px;
            }
            ul { margin: 10px 0; padding-left: 20px; }
            li { margin-bottom: 5px; }
            @media print {
              body { font-size: 12px; }
              .columns { gap: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="profile-section">
              ${cvData.profileImage ? `<img src="${cvData.profileImage}" alt="Photo de profil" class="profile-image" />` : ''}
              <div class="profile-info">
                <h1 class="name">${cvData.name || '[Votre Nom]'}</h1>
                <div class="contact-info">
                  ${cvData.title || '[Titre du poste]'} • 
                  ${cvData.email || '[Email]'} • 
                  ${cvData.phone || '[Téléphone]'} • 
                  ${cvData.city || '[Ville]'}
                </div>
              </div>
            </div>
          </div>
          
          <div class="columns">
            <div class="left-column">
              ${getColumnSections('left').map(section => `
                <div class="section">
                  <h2 class="section-title">${section.fullName}</h2>
                  <div class="section-content">
                    ${generateSectionHTML(section)}
                  </div>
                </div>
              `).join('')}
            </div>
            
            <div class="right-column">
              ${getColumnSections('right').map(section => `
                <div class="section">
                  <h2 class="section-title">${section.fullName}</h2>
                  <div class="section-content">
                    ${generateSectionHTML(section)}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </body>
      </html>
    `;
    
    const file = new Blob([cvContent], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = `CV_${cvData.name || 'MonCV'}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generateSectionHTML = (section) => {
    switch (section.fullName) {
      case 'Expérience Professionnelle':
        return cvData.experiences.map(exp => `
          <div class="experience-item">
            <div class="job-title">${exp.jobTitle || '[Titre du poste]'}</div>
            <div class="company">${exp.company || '[Entreprise]'} • ${exp.dates || '[Dates]'}</div>
            <ul>
              ${exp.responsibilities.filter(r => r.trim()).map(resp => `<li>${resp}</li>`).join('')}
            </ul>
          </div>
        `).join('');
      
      case 'Formation':
        return cvData.education.map(edu => `
          <div class="education-item">
            <div class="degree">${edu.degree || '[Diplôme]'}</div>
            <div class="institution">${edu.institution || '[Institution]'} • ${edu.year || '[Année]'}</div>
            <ul>
              ${edu.details.filter(d => d.trim()).map(detail => `<li>${detail}</li>`).join('')}
            </ul>
          </div>
        `).join('');
      
      case 'Profil Professionnel':
        return `<p>${cvData.profile || '[Description du profil professionnel]'}</p>`;
      
      case 'Compétences':
        return `
          <div><strong>Langages:</strong> ${cvData.skills.languages || '[Langages]'}</div>
          <div><strong>Frameworks:</strong> ${cvData.skills.frameworks || '[Frameworks]'}</div>
          <div><strong>Outils:</strong> ${cvData.skills.tools || '[Outils]'}</div>
          <div><strong>Soft Skills:</strong> ${cvData.skills.softSkills || '[Soft Skills]'}</div>
        `;
      
      case 'Projets Open Source':
        return cvData.projects.map(project => `
          <div class="project-item">
            <div class="project-name">${project.name || '[Nom du projet]'}</div>
            <ul>
              <li>${project.description || '[Description]'}</li>
              <li><strong>Technologies:</strong> ${project.technologies || '[Technologies]'}</li>
              <li><strong>Contribution:</strong> ${project.contribution || '[Contribution]'}</li>
            </ul>
          </div>
        `).join('');
      
      case 'Réussites':
        return `<ul>${cvData.achievements.filter(a => a.trim()).map(achievement => `<li>${achievement}</li>`).join('')}</ul>`;
      
      default:
        return '<p>Section non reconnue</p>';
    }
  };

  const printCV = () => {
    const printWindow = window.open('', '_blank');
    const cvContent = generateSectionHTML;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>CV - ${cvData.name || 'Mon CV'}</title>
          <style>
            body { 
              font-family: Georgia, serif; 
              margin: 0; 
              padding: 20px; 
              line-height: 1.6; 
              color: #374151;
            }
            .header { 
              text-align: center; 
              border-bottom: 2px solid #4F46E5; 
              padding-bottom: 20px; 
              margin-bottom: 30px; 
            }
            .profile-section {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 30px;
              margin-bottom: 20px;
            }
            .profile-image {
              width: 120px;
              height: 120px;
              border-radius: 50%;
              object-fit: cover;
              border: 3px solid #4F46E5;
            }
            .name { 
              font-size: 28px; 
              font-weight: bold; 
              margin: 0 0 8px 0; 
              color: #1F2937; 
            }
            .contact-info { 
              font-size: 14px; 
              color: #6B7280; 
              margin: 0; 
            }
            .columns { 
              display: grid; 
              grid-template-columns: 1fr 1fr; 
              gap: 30px; 
            }
            .section { 
              margin-bottom: 25px; 
              break-inside: avoid;
            }
            .section-title { 
              font-size: 18px; 
              font-weight: bold; 
              color: #4F46E5; 
              margin-bottom: 12px; 
              border-bottom: 1px solid #E5E7EB; 
              padding-bottom: 3px; 
            }
            .experience-item, .project-item, .education-item {
              margin-bottom: 12px;
              padding: 10px;
              background-color: #F9FAFB;
              border-radius: 6px;
              break-inside: avoid;
            }
            .job-title, .project-name, .degree {
              font-weight: bold;
              margin-bottom: 3px;
              font-size: 13px;
            }
            .company, .institution {
              font-style: italic;
              margin-bottom: 3px;
              font-size: 12px;
            }
            ul { margin: 8px 0; padding-left: 16px; }
            li { margin-bottom: 3px; font-size: 12px; }
            @media print {
              body { font-size: 11px; }
              .columns { gap: 20px; }
              .section { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="profile-section">
              ${cvData.profileImage ? `<img src="${cvData.profileImage}" alt="Photo de profil" class="profile-image" />` : ''}
              <div>
                <h1 class="name">${cvData.name || '[Votre Nom]'}</h1>
                <div class="contact-info">
                  ${cvData.title || '[Titre du poste]'} • 
                  ${cvData.email || '[Email]'} • 
                  ${cvData.phone || '[Téléphone]'} • 
                  ${cvData.city || '[Ville]'}
                </div>
              </div>
            </div>
          </div>
          
          <div class="columns">
            <div class="left-column">
              ${getColumnSections('left').map(section => `
                <div class="section">
                  <h2 class="section-title">${section.fullName}</h2>
                  <div class="section-content">
                    ${generateSectionHTML(section)}
                  </div>
                </div>
              `).join('')}
            </div>
            
            <div class="right-column">
              ${getColumnSections('right').map(section => `
                <div class="section">
                  <h2 class="section-title">${section.fullName}</h2>
                  <div class="section-content">
                    ${generateSectionHTML(section)}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const renderTemplate = () => {
    const leftSections = getColumnSections('left');
    const rightSections = getColumnSections('right');

    const EditableInput = ({ value, onChange, placeholder, style = {}, multiline = false }) => {
      const baseStyle = {
        border: '1px solid transparent',
        borderRadius: '4px',
        padding: '4px 8px',
        backgroundColor: 'transparent',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        color: 'inherit',
        width: '100%',
        outline: 'none',
        transition: 'all 0.2s ease',
        ...style
      };

      const focusStyle = {
        ...baseStyle,
        borderColor: '#4F46E5',
        backgroundColor: '#F9FAFB'
      };

      if (multiline) {
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            style={baseStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => Object.assign(e.target.style, baseStyle)}
            rows={3}
          />
        );
      }

      return (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={baseStyle}
          onFocus={(e) => Object.assign(e.target.style, focusStyle)}
          onBlur={(e) => Object.assign(e.target.style, baseStyle)}
        />
      );
    };

    const renderSection = (section, isLeft) => {
      switch (section.fullName) {
        case 'Expérience Professionnelle':
          return (
            <div>
              {cvData.experiences.map((exp, index) => (
                <div key={index} style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#F9FAFB', borderRadius: '8px' }}>
                  <EditableInput
                    value={exp.jobTitle}
                    onChange={(value) => updateCvData('experiences', value, index, 'jobTitle')}
                    placeholder="Titre du poste"
                    style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '5px' }}
                  />
                  <EditableInput
                    value={exp.company}
                    onChange={(value) => updateCvData('experiences', value, index, 'company')}
                    placeholder="Nom de l'entreprise"
                    style={{ fontStyle: 'italic', marginBottom: '5px' }}
                  />
                  <EditableInput
                    value={exp.dates}
                    onChange={(value) => updateCvData('experiences', value, index, 'dates')}
                    placeholder="Dates (ex: Jan 2020 - Déc 2022)"
                    style={{ fontSize: '14px', marginBottom: '10px' }}
                  />
                  {exp.responsibilities.map((resp, respIndex) => (
                    <div key={respIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                      <span style={{ marginRight: '8px' }}>•</span>
                      <EditableInput
                        value={resp}
                        onChange={(value) => updateCvData('experiences', value, index, 'responsibilities', respIndex)}
                        placeholder={`Responsabilité ${respIndex + 1}`}
                        style={{ fontSize: '14px' }}
                      />
                    </div>
                  ))}
                </div>
              ))}
              <button
                onClick={addExperience}
                style={{
                  backgroundColor: '#4F46E5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              >
                + Ajouter une expérience
              </button>
            </div>
          );

        case 'Formation':
          return (
            <div>
              {cvData.education.map((edu, index) => (
                <div key={index} style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#F9FAFB', borderRadius: '8px' }}>
                  <EditableInput
                    value={edu.degree}
                    onChange={(value) => updateCvData('education', value, index, 'degree')}
                    placeholder="Diplôme"
                    style={{ fontWeight: 'bold', marginBottom: '5px' }}
                  />
                  <EditableInput
                    value={edu.institution}
                    onChange={(value) => updateCvData('education', value, index, 'institution')}
                    placeholder="Institution"
                    style={{ fontStyle: 'italic', marginBottom: '5px' }}
                  />
                  <EditableInput
                    value={edu.year}
                    onChange={(value) => updateCvData('education', value, index, 'year')}
                    placeholder="Année"
                    style={{ fontSize: '14px', marginBottom: '10px' }}
                  />
                  {edu.details.map((detail, detIndex) => (
                    <div key={detIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                      <span style={{ marginRight: '8px' }}>•</span>
                      <EditableInput
                        value={detail}
                        onChange={(value) => updateCvData('education', value, index, 'details', detIndex)}
                        placeholder={detIndex === 0 ? "Mention ou spécialisation" : "Projet académique"}
                        style={{ fontSize: '14px' }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );

        case 'Profil Professionnel':
          return (
            <div style={{ padding: '15px', backgroundColor: '#F9FAFB', borderRadius: '8px' }}>
              <EditableInput
                value={cvData.profile}
                onChange={(value) => updateCvData('profile', value)}
                placeholder="Décrivez votre profil professionnel, vos domaines d'expertise et ce qui vous différencie..."
                multiline={true}
                style={{ fontSize: '14px' }}
              />
            </div>
          );

        case 'Compétences':
          return (
            <div style={{ padding: '15px', backgroundColor: '#F9FAFB', borderRadius: '8px' }}>
              <div style={{ marginBottom: '10px' }}>
                <strong style={{ display: 'block', marginBottom: '5px' }}>Langages:</strong>
                <EditableInput
                  value={cvData.skills.languages}
                  onChange={(value) => updateCvData('skills.languages', value)}
                  placeholder="JavaScript, Python, Java..."
                  style={{ fontSize: '14px' }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <strong style={{ display: 'block', marginBottom: '5px' }}>Frameworks:</strong>
                <EditableInput
                  value={cvData.skills.frameworks}
                  onChange={(value) => updateCvData('skills.frameworks', value)}
                  placeholder="React, Angular, Django..."
                  style={{ fontSize: '14px' }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <strong style={{ display: 'block', marginBottom: '5px' }}>Outils:</strong>
                <EditableInput
                  value={cvData.skills.tools}
                  onChange={(value) => updateCvData('skills.tools', value)}
                  placeholder="Git, Docker, AWS..."
                  style={{ fontSize: '14px' }}
                />
              </div>
              <div>
                <strong style={{ display: 'block', marginBottom: '5px' }}>Soft Skills:</strong>
                <EditableInput
                  value={cvData.skills.softSkills}
                  onChange={(value) => updateCvData('skills.softSkills', value)}
                  placeholder="Leadership, Communication, Résolution de problèmes..."
                  style={{ fontSize: '14px' }}
                />
              </div>
            </div>
          );

        case 'Projets Open Source':
          return (
            <div>
              {cvData.projects.map((project, index) => (
                <div key={index} style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#F9FAFB', borderRadius: '8px' }}>
                  <EditableInput
                    value={project.name}
                    onChange={(value) => updateCvData('projects', value, index, 'name')}
                    placeholder="Nom du projet"
                    style={{ fontWeight: 'bold', marginBottom: '5px' }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <span style={{ marginRight: '8px' }}>•</span>
                    <EditableInput
                      value={project.description}
                      onChange={(value) => updateCvData('projects', value, index, 'description')}
                      placeholder="Description du projet"
                      style={{ fontSize: '14px' }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <span style={{ marginRight: '8px' }}>•</span>
                    <EditableInput
                      value={project.technologies}
                      onChange={(value) => updateCvData('projects', value, index, 'technologies')}
                      placeholder="Technologies utilisées"
                      style={{ fontSize: '14px' }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '8px' }}>•</span>
                    <EditableInput
                      value={project.contribution}
                      onChange={(value) => updateCvData('projects', value, index, 'contribution')}
                      placeholder="Votre contribution"
                      style={{ fontSize: '14px' }}
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={addProject}
                style={{
                  backgroundColor: '#4F46E5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              >
                + Ajouter un projet
              </button>
            </div>
          );

        case 'Réussites':
          return (
            <div style={{ padding: '15px', backgroundColor: '#F9FAFB', borderRadius: '8px' }}>
              {cvData.achievements.map((achievement, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ marginRight: '8px' }}>•</span>
                  <EditableInput
                    value={achievement}
                    onChange={(value) => updateCvData('achievements', value, index)}
                    placeholder={index === 0 ? "Réussite quantifiée avec métriques" : index === 1 ? "Prix ou reconnaissance reçue" : "Impact généré pour l'entreprise"}
                    style={{ fontSize: '14px' }}
                  />
                </div>
              ))}
            </div>
          );

        default:
          return <div>Section non reconnue</div>;
      }
    };

    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '32px',
        width: '900px',
        maxWidth: '95vw',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        {/* Close button */}
        <button 
          onClick={() => setShowTemplate(false)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            color: '#6B7280',
            zIndex: 10
          }}
        >
          <X size={24} />
        </button>

        {/* CV Template */}
        <div style={{
          fontFamily: 'Georgia, serif',
          lineHeight: '1.6',
          color: '#374151'
        }}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            borderBottom: '2px solid #4F46E5',
            paddingBottom: '20px',
            marginBottom: '30px'
          }}>
            {/* Profile Section with Image */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '30px',
              marginBottom: '20px',
              flexWrap: 'wrap'
            }}>
              {/* Profile Image */}
              <div style={{ position: 'relative' }}>
                {cvData.profileImage ? (
                  <img
                    src={cvData.profileImage}
                    alt="Photo de profil"
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid #4F46E5'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    backgroundColor: '#F3F4F6',
                    border: '2px dashed #D1D5DB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => document.getElementById('imageUpload').click()}
                  >
                    <Camera size={32} color="#9CA3AF" />
                  </div>
                )}
                
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                
                <button
                  onClick={() => document.getElementById('imageUpload').click()}
                  style={{
                    position: 'absolute',
                    bottom: '5px',
                    right: '5px',
                    backgroundColor: '#4F46E5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  <Camera size={16} />
                </button>
              </div>

              {/* Name and Title */}
              <div style={{ textAlign: 'center' }}>
                <EditableInput
                  value={cvData.name}
                  onChange={(value) => updateCvData('name', value)}
                  placeholder="Votre Nom Complet"
                  style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    margin: '0 0 8px 0',
                    color: '#1F2937',
                    textAlign: 'center',
                    border: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '30px',
              flexWrap: 'wrap',
              fontSize: '16px',
              color: '#6B7280',
              alignItems: 'center'
            }}>
              <EditableInput
                value={cvData.title}
                onChange={(value) => updateCvData('title', value)}
                placeholder="Titre du poste"
                style={{ border: 'none', textAlign: 'center', minWidth: '150px', fontWeight: '500' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} color="#4F46E5" />
                <EditableInput
                  value={cvData.email}
                  onChange={(value) => updateCvData('email', value)}
                  placeholder="email@exemple.com"
                  style={{ border: 'none', textAlign: 'center', minWidth: '200px' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} color="#4F46E5" />
                <EditableInput
                  value={cvData.phone}
                  onChange={(value) => updateCvData('phone', value)}
                  placeholder="Téléphone"
                  style={{ border: 'none', textAlign: 'center', minWidth: '120px' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="#4F46E5" />
                <EditableInput
                  value={cvData.city}
                  onChange={(value) => updateCvData('city', value)}
                  placeholder="Ville"
                  style={{ border: 'none', textAlign: 'center', minWidth: '100px' }}
                />
              </div>
            </div>
          </div>

          {/* Two column layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px'
          }}>
            {/* Left column */}
            <div>
              {leftSections.map((section, index) => (
                <div key={section.id} style={{ marginBottom: '30px' }}>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#4F46E5',
                    marginBottom: '15px',
                    borderBottom: '1px solid #E5E7EB',
                    paddingBottom: '5px'
                  }}>
                    {section.fullName}
                  </h2>
                  <div style={{ color: '#6B7280', fontSize: '14px' }}>
                    {renderSection(section, true)}
                  </div>
                </div>
              ))}
            </div>

            {/* Right column */}
            <div>
              {rightSections.map((section, index) => (
                <div key={section.id} style={{ marginBottom: '30px' }}>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#4F46E5',
                    marginBottom: '15px',
                    borderBottom: '1px solid #E5E7EB',
                    paddingBottom: '5px'
                  }}>
                    {section.fullName}
                  </h2>
                  <div style={{ color: '#6B7280', fontSize: '14px' }}>
                    {renderSection(section, false)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{
            textAlign: 'center',
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#F3F4F6',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'center',
            gap: '15px'
          }}>
            <button
              onClick={() => setShowTemplate(false)}
              style={{
                backgroundColor: '#6B7280',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              ← Retour à l'organisation
            </button>
            <button
              onClick={downloadCV}
              style={{
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Download size={16} />
              Télécharger HTML
            </button>
            <button
              onClick={printCV}
              style={{
                backgroundColor: '#10B981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Printer size={16} />
              Imprimer
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      zIndex: 1000
    }}>
      {showTemplate ? renderTemplate() : (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '32px',
        width: '520px',
        maxWidth: '90vw',
        position: 'relative',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        {/* Close button */}
        <button style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          color: '#6B7280'
        }}>
          <X size={24} />
        </button>

        {/* Title */}
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#374151',
          textAlign: 'center',
          margin: '0 0 32px 0',
          lineHeight: '1.3'
        }}>
          Maintenez et faites glisser les boites pour réorganiser les sections
        </h2>

        {/* Page indicator */}
        <div style={{
          textAlign: 'center',
          color: '#6B7280',
          fontSize: '14px',
          marginBottom: '24px'
        }}>
          Page 1 sur 1
        </div>

        {/* Main content area */}
        <div style={{
          backgroundColor: '#F9FAFB',
          borderRadius: '8px',
          padding: '20px',
          minHeight: '400px'
        }}>
          {/* Header section */}
          <div style={{
            backgroundColor: '#C7D2FE',
            borderRadius: '6px',
            padding: '12px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#4F46E5',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            <div style={{
              width: '16px',
              height: '16px',
              backgroundColor: '#6366F1',
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: 'white',
                borderRadius: '1px'
              }}></div>
            </div>
            En-tête
          </div>

          {/* Two column layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px'
          }}>
            {/* Left column */}
            <div 
              style={{
                minHeight: '300px',
                backgroundColor: dragOverColumn === 'left' ? '#EEF2FF' : 'transparent',
                borderRadius: '6px',
                padding: '4px'
              }}
              onDragOver={(e) => handleDragOver(e, 'left')}
              onDrop={(e) => handleDrop(e, 'left')}
            >
              {getColumnSections('left').map((section) => (
                <div
                  key={section.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, section)}
                  style={{
                    backgroundColor: '#E0E7FF',
                    borderRadius: '6px',
                    padding: '12px',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'grab',
                    color: '#4F46E5',
                    fontSize: '14px',
                    fontWeight: '500',
                    opacity: draggedItem?.id === section.id ? 0.5 : 1
                  }}
                  onDragEnd={() => setDraggedItem(null)}
                >
                  <GripVertical size={16} color="#6B7280" />
                  {section.name}
                </div>
              ))}
            </div>

            {/* Right column */}
            <div 
              style={{
                minHeight: '300px',
                backgroundColor: dragOverColumn === 'right' ? '#EEF2FF' : 'transparent',
                borderRadius: '6px',
                padding: '4px'
              }}
              onDragOver={(e) => handleDragOver(e, 'right')}
              onDrop={(e) => handleDrop(e, 'right')}
            >
              {getColumnSections('right').map((section) => (
                <div
                  key={section.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, section)}
                  style={{
                    backgroundColor: '#E0E7FF',
                    borderRadius: '6px',
                    padding: '12px',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'grab',
                    color: '#4F46E5',
                    fontSize: '14px',
                    fontWeight: '500',
                    opacity: draggedItem?.id === section.id ? 0.5 : 1
                  }}
                  onDragEnd={() => setDraggedItem(null)}
                >
                  <GripVertical size={16} color="#6B7280" />
                  {section.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Continue button */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '24px'
        }}>
          <button 
            onClick={handleContinueEdit}
            style={{
              backgroundColor: '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '16px 32px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              transform: 'translateY(0)',
              minWidth: '200px'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#059669';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#10B981';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
            }}
          >
            Continuer à éditer
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default CVSectionOrganizer;