import React, { useState } from 'react';
import { X, GripVertical, Mail, Phone, MapPin, Camera, Download, Printer } from 'lucide-react';
import './reorganiser.css';

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
    skills: [
      { category: 'Langages', items: '' },
      { category: 'Frameworks', items: '' },
      { category: 'Outils', items: '' },
      { category: 'Soft Skills', items: '' }
    ],
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

  const updateCvData = (field, value, index = null, subField = null, subIndex = null) => {
    setCvData(prev => {
      const newData = { ...prev };
      
      if (index !== null && subField && subIndex !== null) {
        if (Array.isArray(newData[field][index][subField])) {
          newData[field][index][subField][subIndex] = value;
        }
      } else if (index !== null && subField) {
        if (Array.isArray(newData[field][index][subField])) {
          newData[field][index][subField] = value;
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

  const addEducation = () => {
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, { degree: '', institution: '', year: '', details: ['', ''] }]
    }));
  };

  const addSkill = () => {
    setCvData(prev => ({
      ...prev,
      skills: [...prev.skills, { category: '', items: '' }]
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
        return cvData.skills.map(skill => 
          skill.category && skill.items ? `<div><strong>${skill.category}:</strong> ${skill.items}</div>` : ''
        ).join('');
      
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

  const printCV = () => {
    const printWindow = window.open('', '_blank');
    
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

  const EditableInput = ({ value, onChange, placeholder, className = '', multiline = false }) => {
    if (multiline) {
      return (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`editable-input ${className}`}
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
        className={`editable-input ${className}`}
      />
    );
  };

  const renderSection = (section) => {
    switch (section.fullName) {
      case 'Expérience Professionnelle':
        return (
          <div>
            {cvData.experiences.map((exp, index) => (
              <div key={index} className="form-section">
                <EditableInput
                  value={exp.jobTitle}
                  onChange={(value) => updateCvData('experiences', value, index, 'jobTitle')}
                  placeholder="Titre du poste"
                  className="bold-input"
                />
                <EditableInput
                  value={exp.company}
                  onChange={(value) => updateCvData('experiences', value, index, 'company')}
                  placeholder="Nom de l'entreprise"
                  className="italic-input"
                />
                <EditableInput
                  value={exp.dates}
                  onChange={(value) => updateCvData('experiences', value, index, 'dates')}
                  placeholder="Dates (ex: Jan 2020 - Déc 2022)"
                />
                {exp.responsibilities.map((resp, respIndex) => (
                  <div key={respIndex} className="bullet-item">
                    <span className="bullet">•</span>
                    <EditableInput
                      value={resp}
                      onChange={(value) => updateCvData('experiences', value, index, 'responsibilities', respIndex)}
                      placeholder={`Responsabilité ${respIndex + 1}`}
                    />
                  </div>
                ))}
              </div>
            ))}
            <button onClick={addExperience} className="add-button">
              + Ajouter une expérience
            </button>
          </div>
        );

      case 'Formation':
        return (
          <div>
            {cvData.education.map((edu, index) => (
              <div key={index} className="form-section">
                <EditableInput
                  value={edu.degree}
                  onChange={(value) => updateCvData('education', value, index, 'degree')}
                  placeholder="Diplôme"
                  className="bold-input"
                />
                <EditableInput
                  value={edu.institution}
                  onChange={(value) => updateCvData('education', value, index, 'institution')}
                  placeholder="Institution"
                  className="italic-input"
                />
                <EditableInput
                  value={edu.year}
                  onChange={(value) => updateCvData('education', value, index, 'year')}
                  placeholder="Année"
                />
                {edu.details.map((detail, detIndex) => (
                  <div key={detIndex} className="bullet-item">
                    <span className="bullet">•</span>
                    <EditableInput
                      value={detail}
                      onChange={(value) => updateCvData('education', value, index, 'details', detIndex)}
                      placeholder={detIndex === 0 ? "Mention ou spécialisation" : "Projet académique"}
                    />
                  </div>
                ))}
              </div>
            ))}
            <button onClick={addEducation} className="add-button">
              + Ajouter une formation
            </button>
          </div>
        );

      case 'Profil Professionnel':
        return (
          <div className="form-section">
            <EditableInput
              value={cvData.profile}
              onChange={(value) => updateCvData('profile', value)}
              placeholder="Décrivez votre profil professionnel, vos domaines d'expertise et ce qui vous différencie..."
              multiline={true}
            />
          </div>
        );

      case 'Compétences':
        return (
          <div className="form-section">
            {cvData.skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <EditableInput
                  value={skill.category}
                  onChange={(value) => updateCvData('skills', value, index, 'category')}
                  placeholder="Catégorie (ex: Langages)"
                  className="skill-category"
                />
                <EditableInput
                  value={skill.items}
                  onChange={(value) => updateCvData('skills', value, index, 'items')}
                  placeholder="Compétences (ex: JavaScript, Python, Java...)"
                />
              </div>
            ))}
            <button onClick={addSkill} className="add-button">
              + Ajouter une catégorie
            </button>
          </div>
        );

      case 'Projets Open Source':
        return (
          <div>
            {cvData.projects.map((project, index) => (
              <div key={index} className="form-section">
                <EditableInput
                  value={project.name}
                  onChange={(value) => updateCvData('projects', value, index, 'name')}
                  placeholder="Nom du projet"
                  className="bold-input"
                />
                <div className="bullet-item">
                  <span className="bullet">•</span>
                  <EditableInput
                    value={project.description}
                    onChange={(value) => updateCvData('projects', value, index, 'description')}
                    placeholder="Description du projet"
                  />
                </div>
                <div className="bullet-item">
                  <span className="bullet">•</span>
                  <EditableInput
                    value={project.technologies}
                    onChange={(value) => updateCvData('projects', value, index, 'technologies')}
                    placeholder="Technologies utilisées"
                  />
                </div>
                <div className="bullet-item">
                  <span className="bullet">•</span>
                  <EditableInput
                    value={project.contribution}
                    onChange={(value) => updateCvData('projects', value, index, 'contribution')}
                    placeholder="Votre contribution"
                  />
                </div>
              </div>
            ))}
            <button onClick={addProject} className="add-button">
              + Ajouter un projet
            </button>
          </div>
        );

      case 'Réussites':
        return (
          <div className="form-section">
            {cvData.achievements.map((achievement, index) => (
              <div key={index} className="bullet-item">
                <span className="bullet">•</span>
                <EditableInput
                  value={achievement}
                  onChange={(value) => updateCvData('achievements', value, index)}
                  placeholder={index === 0 ? "Réussite quantifiée avec métriques" : index === 1 ? "Prix ou reconnaissance reçue" : "Impact généré pour l'entreprise"}
                />
              </div>
            ))}
          </div>
        );

      default:
        return <div>Section non reconnue</div>;
    }
  };

  const renderTemplate = () => {
    const leftSections = getColumnSections('left');
    const rightSections = getColumnSections('right');

    return (
      <div className="modal-overlay">
        <div className="template-container">
          <button 
            onClick={() => setShowTemplate(false)}
            className="close-button"
          >
            <X size={24} />
          </button>

          <div className="cv-template">
            <div className="cv-header">
              <div className="profile-section">
                <div className="profile-image-container">
                  {cvData.profileImage ? (
                    <img
                      src={cvData.profileImage}
                      alt="Photo de profil"
                      className="profile-image"
                    />
                  ) : (
                    <div className="profile-placeholder" onClick={() => document.getElementById('imageUpload').click()}>
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
                    className="upload-button"
                  >
                    <Camera size={16} />
                  </button>
                </div>

                <div className="profile-info">
                  <EditableInput
                    value={cvData.name}
                    onChange={(value) => updateCvData('name', value)}
                    placeholder="Votre Nom Complet"
                    className="name-input"
                  />
                </div>
              </div>

              <div className="contact-section">
                <EditableInput
                  value={cvData.title}
                  onChange={(value) => updateCvData('title', value)}
                  placeholder="Titre du poste"
                  className="title-input"
                />
                <div className="contact-item">
                  <Mail size={16} color="#4F46E5" />
                  <EditableInput
                    value={cvData.email}
                    onChange={(value) => updateCvData('email', value)}
                    placeholder="email@exemple.com"
                  />
                </div>
                <div className="contact-item">
                  <Phone size={16} color="#4F46E5" />
                  <EditableInput
                    value={cvData.phone}
                    onChange={(value) => updateCvData('phone', value)}
                    placeholder="Téléphone"
                  />
                </div>
                <div className="contact-item">
                  <MapPin size={16} color="#4F46E5" />
                  <EditableInput
                    value={cvData.city}
                    onChange={(value) => updateCvData('city', value)}
                    placeholder="Ville"
                  />
                </div>
              </div>
            </div>

            <div className="cv-columns">
              <div className="cv-column">
                {leftSections.map((section) => (
                  <div key={section.id} className="cv-section">
                    <h2 className="section-title">{section.fullName}</h2>
                    <div className="section-content">
                      {renderSection(section)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="cv-column">
                {rightSections.map((section) => (
                  <div key={section.id} className="cv-section">
                    <h2 className="section-title">{section.fullName}</h2>
                    <div className="section-content">
                      {renderSection(section)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="action-buttons">
              <button
                onClick={() => setShowTemplate(false)}
                className="back-button"
              >
                ← Retour à l'organisation
              </button>
              <button
                onClick={downloadCV}
                className="download-button"
              >
                <Download size={16} />
                Télécharger HTML
              </button>
              <button
                onClick={printCV}
                className="print-button"
              >
                <Printer size={16} />
                Imprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="modal-overlay">
      {showTemplate ? renderTemplate() : (
      <div className="organizer-container">
        <button className="close-button">
          <X size={24} />
        </button>

        <h2 className="organizer-title">
          Maintenez et faites glisser les boites pour réorganiser les sections
        </h2>

        <div className="page-indicator">
          Page 1 sur 1
        </div>

        <div className="main-content">
          <div className="header-section">
            <div className="header-icon">
              <div className="icon-inner"></div>
            </div>
            En-tête
          </div>

          <div className="columns-layout">
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
                  className={`section-item ${draggedItem?.id === section.id ? 'dragging' : ''}`}
                  onDragEnd={() => setDraggedItem(null)}
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
                  className={`section-item ${draggedItem?.id === section.id ? 'dragging' : ''}`}
                  onDragEnd={() => setDraggedItem(null)}
                >
                  <GripVertical size={16} color="#6B7280" />
                  {section.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="continue-section">
          <button 
            onClick={handleContinueEdit}
            className="continue-button"
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