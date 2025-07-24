import React, { useRef, useState } from 'react';

const initialData = {
  name: 'Your Name',
  title: 'Your Title',
  email: 'your.email@example.com',
  phone: '+1 (555) 123-4567',
  location: 'City, State',
  summary: 'A short professional summary that highlights your key achievements and career objectives.',
  experience: [
    {
      company: 'Company Name',
      role: 'Job Title',
      duration: '2022 - Present',
      description: 'Describe your responsibilities and achievements here.'
    }
  ],
  education: [
    {
      school: 'University Name',
      degree: 'Bachelor of Science in Computer Science',
      year: '2020'
    }
  ],
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL']
};

// --- SHARED STYLES ---
const sectionTitleStyle = {
  fontWeight: 700,
  fontSize: 15,
  color: '#222', // black instead of green
  borderBottom: '2px solid #e9ecef',
  paddingBottom: 4,
  marginBottom: 10,
  marginTop: 18,
  letterSpacing: 1,
  textTransform: 'uppercase'
};
const sectionTitleStyleBlue = {
  ...sectionTitleStyle,
  color: '#4a90e2'
};
const sectionTitleStyleWhite = {
  ...sectionTitleStyle,
  color: '#fff',
  borderBottom: '2px solid #fff',
  marginTop: 18
};
const sectionTextStyle = {
  fontSize: 13,
  color: '#555',
  marginBottom: 8,
  lineHeight: 1.5,
  wordBreak: 'break-word',
  whiteSpace: 'pre-line'
};
const sectionTextStyleWhite = {
  ...sectionTextStyle,
  color: '#fff'
};
const iconStyle = {
  marginRight: 6
};

// --- PROFILE PHOTO COMPONENT ---
const ProfilePhoto = ({ photo, name, color, borderColor }) => (
  photo ? (
    <img
      src={photo}
      alt="Profile"
      style={{
        width: 90,
        height: 90,
        borderRadius: '50%',
        objectFit: 'cover',
        border: `3px solid ${borderColor || '#e9ecef'}`,
        boxShadow: '0 2px 8px #0001'
      }}
    />
  ) : (
    <div style={{
      width: 90,
      height: 90,
      borderRadius: '50%',
      background: '#eee',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: color || '#bbb',
      fontSize: 32,
      border: `3px solid ${borderColor || '#e9ecef'}`,
      boxShadow: '0 2px 8px #0001',
      fontWeight: 700,
      textTransform: 'uppercase'
    }}>
      {name && name.trim() !== '' ? (
        name.split(' ').map(n => n[0]).join('').slice(0, 2)
      ) : (
        <span role="img" aria-label="profile">👤</span>
      )}
    </div>
  )
);

// --- TEMPLATE PREVIEWS ---
const AleenaPreview = ({ resume, photo }) => (
  <div style={{
    width: 700,
    height: 1000,
    background: '#f8f9fa',
    borderRadius: 14,
    overflow: 'hidden',
    fontFamily: "'Segoe UI', Arial, sans-serif",
    display: 'flex',
    boxShadow: '0 6px 24px rgba(0,0,0,0.10)'
  }}>
    <div style={{
      width: '33%',
      background: 'linear-gradient(180deg, #f7cac9 0%, #ffe5d9 100%)',
      padding: 32,
      color: '#333',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <ProfilePhoto photo={photo} name={resume.name} color="#f7cac9" borderColor="#e9ecef" />
      <div style={sectionTitleStyle}>ABOUT ME</div>
      <div style={sectionTextStyle}>{resume.summary}</div>
      <div style={sectionTitleStyle}>CONTACT</div>
      <div style={sectionTextStyle}><span style={iconStyle}>✉️</span> {resume.email}</div>
      <div style={sectionTextStyle}><span style={iconStyle}>📞</span> {resume.phone}</div>
      <div style={sectionTextStyle}><span style={iconStyle}>📍</span> {resume.location}</div>
      <div style={sectionTitleStyle}>SKILLS</div>
      <ul style={{ paddingLeft: 18, margin: 0 }}>
        {resume.skills.map((skill, idx) => (
          <li key={idx} style={sectionTextStyle}>{skill}</li>
        ))}
      </ul>
    </div>
    <div style={{
      width: '67%',
      padding: 36,
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    }}>
      <div style={{
        fontSize: 32,
        fontWeight: 700,
        color: '#4a4a4a',
        marginBottom: 4,
        letterSpacing: 1
      }}>{resume.name}</div>
      <div style={{
        fontSize: 18,
        color: '#f7cac9',
        fontWeight: 500,
        marginBottom: 24
      }}>{resume.title}</div>
      <div style={sectionTitleStyle}>WORK EXPERIENCE</div>
      {resume.experience.map((exp, idx) => (
        <div key={idx} style={{ marginBottom: 18 }}>
          <div style={{ fontWeight: 600, color: '#333', fontSize: 15 }}>{exp.role}</div>
          <div style={{ color: '#f7cac9', fontSize: 13, marginBottom: 4 }}>{exp.company} • {exp.duration}</div>
          <div style={sectionTextStyle}>{exp.description}</div>
        </div>
      ))}
      <div style={sectionTitleStyle}>EDUCATION</div>
      {resume.education.map((edu, idx) => (
        <div key={idx} style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 600, color: '#333', fontSize: 14 }}>{edu.degree}</div>
          <div style={{ color: '#f7cac9', fontSize: 13 }}>{edu.school} • {edu.year}</div>
        </div>
      ))}
    </div>
  </div>
);

const RichardPreview = ({ resume, photo }) => (
  <div style={{
    width: 700,
    height: 1000,
    background: '#f7fafd',
    borderRadius: 14,
    overflow: 'hidden',
    fontFamily: "'Segoe UI', Arial, sans-serif",
    display: 'flex',
    boxShadow: '0 6px 24px rgba(0,0,0,0.10)'
  }}>
    <div style={{
      width: '33%',
      background: 'linear-gradient(180deg, #2c4a5f 0%, #4a90e2 100%)',
      color: 'white',
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <ProfilePhoto photo={photo} name={resume.name} color="#2c4a5f" borderColor="#4a90e2" />
      <div style={sectionTitleStyleWhite}>CONTACT</div>
      <div style={sectionTextStyleWhite}><span style={iconStyle}>✉️</span> {resume.email}</div>
      <div style={sectionTextStyleWhite}><span style={iconStyle}>📞</span> {resume.phone}</div>
      <div style={sectionTextStyleWhite}><span style={iconStyle}>📍</span> {resume.location}</div>
      <div style={sectionTitleStyleWhite}>SKILLS</div>
      <ul style={{ paddingLeft: 18, margin: 0 }}>
        {resume.skills.map((skill, idx) => (
          <li key={idx} style={sectionTextStyleWhite}>{skill}</li>
        ))}
      </ul>
    </div>
    <div style={{
      width: '67%',
      padding: 36,
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    }}>
      <div style={{
        fontSize: 32,
        fontWeight: 700,
        color: '#2c4a5f',
        marginBottom: 4,
        letterSpacing: 1
      }}>{resume.name}</div>
      <div style={{
        fontSize: 18,
        color: '#222',
        fontWeight: 500,
        marginBottom: 24
      }}>{resume.title}</div>
      <div style={sectionTitleStyleBlue}>PROFESSIONAL SUMMARY</div>
      <div style={sectionTextStyle}>{resume.summary}</div>
      <div style={sectionTitleStyleBlue}>WORK EXPERIENCE</div>
      {resume.experience.map((exp, idx) => (
        <div key={idx} style={{ marginBottom: 18 }}>
          <div style={{ fontWeight: 600, color: '#333', fontSize: 15 }}>{exp.role}</div>
          <div style={{ color: '#4a90e2', fontSize: 13, marginBottom: 4 }}>{exp.company} • {exp.duration}</div>
          <div style={sectionTextStyle}>{exp.description}</div>
        </div>
      ))}
      <div style={sectionTitleStyleBlue}>EDUCATION</div>
      {resume.education.map((edu, idx) => (
        <div key={idx} style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 600, color: '#333', fontSize: 14 }}>{edu.degree}</div>
          <div style={{ color: '#4a90e2', fontSize: 13 }}>{edu.school} • {edu.year}</div>
        </div>
      ))}
    </div>
  </div>
);

const EllaPreview = ({ resume, photo }) => (
  <div style={{
    width: 700,
    height: 1000,
    background: '#f8f6f6',
    borderRadius: 14,
    overflow: 'hidden',
    fontFamily: "'Segoe UI', Arial, sans-serif",
    display: 'flex',
    boxShadow: '0 6px 24px rgba(0,0,0,0.10)'
  }}>
    <div style={{
      width: '38%',
      background: 'linear-gradient(180deg, #a08080 0%, #e0b1b1 100%)',
      color: 'white',
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <ProfilePhoto photo={photo} name={resume.name} color="#a08080" borderColor="#e0b1b1" />
      <div style={sectionTitleStyleWhite}>PROFILE</div>
      <div style={sectionTextStyleWhite}>{resume.summary}</div>
      <div style={sectionTitleStyleWhite}>CONTACT</div>
      <div style={sectionTextStyleWhite}><span style={iconStyle}>✉️</span> {resume.email}</div>
      <div style={sectionTextStyleWhite}><span style={iconStyle}>📞</span> {resume.phone}</div>
      <div style={sectionTextStyleWhite}><span style={iconStyle}>📍</span> {resume.location}</div>
      <div style={sectionTitleStyleWhite}>SKILLS</div>
      <ul style={{ paddingLeft: 18, margin: 0 }}>
        {resume.skills.map((skill, idx) => (
          <li key={idx} style={sectionTextStyleWhite}>{skill}</li>
        ))}
      </ul>
    </div>
    <div style={{
      width: '62%',
      padding: 36,
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    }}>
      <div style={{
        fontSize: 28,
        fontWeight: 700,
        color: '#a08080',
        marginBottom: 4,
        letterSpacing: 1
      }}>{resume.name}</div>
      <div style={{
        fontSize: 16,
        color: '#e0b1b1',
        fontWeight: 500,
        marginBottom: 24,
        fontStyle: 'italic'
      }}>{resume.title}</div>
      <div style={sectionTitleStyle}>EDUCATION</div>
      {resume.education.map((edu, idx) => (
        <div key={idx} style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 600, color: '#333', fontSize: 14 }}>{edu.degree}</div>
          <div style={{ color: '#a08080', fontSize: 13 }}>{edu.school} • {edu.year}</div>
        </div>
      ))}
      <div style={sectionTitleStyle}>EXPERIENCE</div>
      {resume.experience.map((exp, idx) => (
        <div key={idx} style={{ marginBottom: 18 }}>
          <div style={{ fontWeight: 600, color: '#333', fontSize: 15 }}>{exp.role}</div>
          <div style={{ color: '#a08080', fontSize: 13, marginBottom: 4 }}>{exp.company} • {exp.duration}</div>
          <div style={sectionTextStyle}>{exp.description}</div>
        </div>
      ))}
    </div>
  </div>
);

const OliviaPreview = ({ resume, photo }) => (
  <div style={{
    width: 700,
    height: 1000,
    background: '#f5f2f2',
    borderRadius: 14,
    overflow: 'hidden',
    fontFamily: "'Segoe UI', Arial, sans-serif",
    display: 'flex',
    boxShadow: '0 6px 24px rgba(0,0,0,0.10)'
  }}>
    <div style={{
      width: '38%',
      background: 'linear-gradient(180deg, #5c8a8a 0%, #b2dfdb 100%)',
      color: 'white',
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <ProfilePhoto photo={photo} name={resume.name} color="#5c8a8a" borderColor="#b2dfdb" />
      <div style={sectionTitleStyleWhite}>PROFILE</div>
      <div style={sectionTextStyleWhite}>{resume.summary}</div>
      <div style={sectionTitleStyleWhite}>CONTACT</div>
      <div style={sectionTextStyleWhite}><span style={iconStyle}>✉️</span> {resume.email}</div>
      <div style={sectionTextStyleWhite}><span style={iconStyle}>📞</span> {resume.phone}</div>
      <div style={sectionTextStyleWhite}><span style={iconStyle}>📍</span> {resume.location}</div>
      <div style={sectionTitleStyleWhite}>SKILLS</div>
      <ul style={{ paddingLeft: 18, margin: 0 }}>
        {resume.skills.map((skill, idx) => (
          <li key={idx} style={sectionTextStyleWhite}>{skill}</li>
        ))}
      </ul>
    </div>
    <div style={{
      width: '62%',
      padding: 36,
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    }}>
      <div style={{
        fontSize: 28,
        fontWeight: 700,
        color: '#5c8a8a',
        marginBottom: 4,
        letterSpacing: 1
      }}>{resume.name}</div>
      <div style={{
        fontSize: 16,
        color: '#b2dfdb',
        fontWeight: 500,
        marginBottom: 24,
        fontStyle: 'italic'
      }}>{resume.title}</div>
      <div style={sectionTitleStyle}>EDUCATION</div>
      {resume.education.map((edu, idx) => (
        <div key={idx} style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 600, color: '#333', fontSize: 14 }}>{edu.degree}</div>
          <div style={{ color: '#5c8a8a', fontSize: 13 }}>{edu.school} • {edu.year}</div>
        </div>
      ))}
      <div style={sectionTitleStyle}>EXPERIENCE</div>
      {resume.experience.map((exp, idx) => (
        <div key={idx} style={{ marginBottom: 18 }}>
          <div style={{ fontWeight: 600, color: '#333', fontSize: 15 }}>{exp.role}</div>
          <div style={{ color: '#5c8a8a', fontSize: 13, marginBottom: 4 }}>{exp.company} • {exp.duration}</div>
          <div style={sectionTextStyle}>{exp.description}</div>
        </div>
      ))}
    </div>
  </div>
);

const Templates = () => {
  const [resume, setResume] = useState(initialData);
  const [template, setTemplate] = useState(null);
  const [photo, setPhoto] = useState(null);
  const componentRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  const handleChange = (field, value) => {
    setResume({ ...resume, [field]: value });
  };

  const handleExperienceChange = (idx, field, value) => {
    const updated = resume.experience.map((exp, i) =>
      i === idx ? { ...exp, [field]: value } : exp
    );
    setResume({ ...resume, experience: updated });
  };

  const handleEducationChange = (idx, field, value) => {
    const updated = resume.education.map((edu, i) =>
      i === idx ? { ...edu, [field]: value } : edu
    );
    setResume({ ...resume, education: updated });
  };

  const handleSkillChange = (idx, value) => {
    const updated = resume.skills.map((skill, i) =>
      i === idx ? value : skill
    );
    setResume({ ...resume, skills: updated });
  };

  const addExperience = () => {
    setResume({
      ...resume,
      experience: [
        ...resume.experience,
        { company: '', role: '', duration: '', description: '' }
      ]
    });
  };

  const removeExperience = (idx) => {
    setResume({
      ...resume,
      experience: resume.experience.filter((_, i) => i !== idx)
    });
  };

  const addEducation = () => {
    setResume({
      ...resume,
      education: [
        ...resume.education,
        { school: '', degree: '', year: '' }
      ]
    });
  };

  const removeEducation = (idx) => {
    setResume({
      ...resume,
      education: resume.education.filter((_, i) => i !== idx)
    });
  };

  const addSkill = () => {
    setResume({
      ...resume,
      skills: [...resume.skills, '']
    });
  };

  const removeSkill = (idx) => {
    setResume({
      ...resume,
      skills: resume.skills.filter((_, i) => i !== idx)
    });
  };

  const inputStyle = {
    width: '100%',
    border: '2px solid #e9ecef',
    borderRadius: '6px',
    padding: '10px',
    fontSize: '14px',
    marginBottom: '12px',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit'
  };

  const buttonStyle = {
    background: '#222',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'transform 0.1s, box-shadow 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const removeButtonStyle = {
    background: '#ff4757',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '4px 8px',
    cursor: 'pointer',
    fontSize: '12px',
    marginLeft: '8px'
  };

  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      padding: 20
    }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        background: 'white',
        borderRadius: 15,
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'linear-gradient(45deg, #222, #444)',
          color: 'white',
          padding: 30,
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2.5em', marginBottom: 10, fontWeight: 'bold' }}>🚀 Dynamic Resume Builder</h1>
          <p style={{ fontSize: '1.1em', opacity: 0.9 }}>Create professional resumes with real-time preview and instant download</p>
        </div>

        <div style={{ display: 'flex', minHeight: 800 }}>
          {!template && (
            <div style={{ width: '100%', padding: 40 }}>
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <h2 style={{ fontSize: '1.8em', color: '#333', marginBottom: 10 }}>Please select a template for your resume.</h2>
                <p style={{ fontSize: '1em', color: '#666' }}>You can always change it later.</p>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '1fr 1fr',
                gap: 30,
                maxWidth: 1000,
                margin: '0 auto',
                justifyItems: 'center'
              }}>
                {[
                  { name: 'aleena', component: AleenaPreview, title: 'Aleena Style' },
                  { name: 'richard', component: RichardPreview, title: 'Richard Style' },
                  { name: 'ella', component: EllaPreview, title: 'Ella Style' },
                  { name: 'olivia', component: OliviaPreview, title: 'Olivia Style' }
                ].map(({ name, component: Component, title }) => (
                  <div
                    key={name}
                    onClick={() => setTemplate(name)}
                    style={{
                      cursor: 'pointer',
                      border: '2px solid #e0e0e0',
                      borderRadius: 12,
                      padding: 15,
                      background: '#fff',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '100%',
                      maxWidth: 400
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)';
                      e.currentTarget.style.borderColor = '#222';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                      e.currentTarget.style.borderColor = '#e0e0e0';
                    }}
                  >
                    <div style={{ 
                      transform: 'scale(0.45)', 
                      transformOrigin: 'center top',
                      marginBottom: -150
                    }}>
                      <Component resume={resume} />
                    </div>
                    <div style={{ 
                      textAlign: 'center', 
                      fontWeight: 600, 
                      fontSize: '1.1em', 
                      color: '#333',
                      marginTop: 15
                    }}>{title}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {template && (
            <>
              <div style={{
                flex: 1,
                padding: 30,
                background: '#f8f9fa',
                borderRight: '1px solid #e9ecef',
                overflowY: 'auto',
                maxHeight: '800px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
                  <button 
                    onClick={() => setTemplate(null)} 
                    style={{
                      ...buttonStyle,
                      background: '#6c757d'
                    }}
                  >
                    ← Back to Templates
                  </button>
                  <button onClick={handlePrint} style={buttonStyle}>
                    📄 Download PDF
                  </button>
                </div>

                {/* Profile Photo Upload */}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontWeight: 600, marginBottom: 8, display: 'block' }}>Profile Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = ev => setPhoto(ev.target.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {photo && (
                    <div style={{ marginTop: 10 }}>
                      <img
                        src={photo}
                        alt="Profile"
                        style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid #eee' }}
                      />
                      <button
                        type="button"
                        onClick={() => setPhoto(null)}
                        style={removeButtonStyle}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ color: '#333', marginBottom: 16 }}>Personal Information</h3>
                  <input
                    style={{ ...inputStyle, fontSize: '18px', fontWeight: 'bold' }}
                    placeholder="Full Name"
                    value={resume.name}
                    onChange={e => handleChange('name', e.target.value)}
                  />
                  <input
                    style={inputStyle}
                    placeholder="Professional Title"
                    value={resume.title}
                    onChange={e => handleChange('title', e.target.value)}
                  />
                  <input
                    style={inputStyle}
                    placeholder="Email Address"
                    value={resume.email}
                    onChange={e => handleChange('email', e.target.value)}
                  />
                  <input
                    style={inputStyle}
                    placeholder="Phone Number"
                    value={resume.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                  />
                  <input
                    style={inputStyle}
                    placeholder="Location"
                    value={resume.location}
                    onChange={e => handleChange('location', e.target.value)}
                  />
                  <textarea
                    style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                    placeholder="Professional Summary"
                    value={resume.summary}
                    onChange={e => handleChange('summary', e.target.value)}
                  />
                </div>

                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ color: '#333', marginBottom: 16 }}>Work Experience</h3>
                  {resume.experience.map((exp, idx) => (
                    <div key={idx} style={{ 
                      background: 'white', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '16px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <strong>Experience {idx + 1}</strong>
                        {resume.experience.length > 1 && (
                          <button onClick={() => removeExperience(idx)} style={removeButtonStyle}>
                            Remove
                          </button>
                        )}
                      </div>
                      <input
                        style={inputStyle}
                        placeholder="Company Name"
                        value={exp.company}
                        onChange={e => handleExperienceChange(idx, 'company', e.target.value)}
                      />
                      <input
                        style={inputStyle}
                        placeholder="Job Title"
                        value={exp.role}
                        onChange={e => handleExperienceChange(idx, 'role', e.target.value)}
                      />
                      <input
                        style={inputStyle}
                        placeholder="Duration (e.g., 2022 - Present)"
                        value={exp.duration}
                        onChange={e => handleExperienceChange(idx, 'duration', e.target.value)}
                      />
                      <textarea
                        style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                        placeholder="Job Description and Achievements"
                        value={exp.description}
                        onChange={e => handleExperienceChange(idx, 'description', e.target.value)}
                      />
                    </div>
                  ))}
                  <button onClick={addExperience} style={buttonStyle}>+ Add Experience</button>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ color: '#333', marginBottom: 16 }}>Education</h3>
                  {resume.education.map((edu, idx) => (
                    <div key={idx} style={{ 
                      background: 'white', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '16px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <strong>Education {idx + 1}</strong>
                        {resume.education.length > 1 && (
                          <button onClick={() => removeEducation(idx)} style={removeButtonStyle}>
                            Remove
                          </button>
                        )}
                      </div>
                      <input
                        style={inputStyle}
                        placeholder="University/School Name"
                        value={edu.school}
                        onChange={e => handleEducationChange(idx, 'school', e.target.value)}
                      />
                      <input
                        style={inputStyle}
                        placeholder="Degree/Certification"
                        value={edu.degree}
                        onChange={e => handleEducationChange(idx, 'degree', e.target.value)}
                      />
                      <input
                        style={inputStyle}
                        placeholder="Year of Graduation"
                        value={edu.year}
                        onChange={e => handleEducationChange(idx, 'year', e.target.value)}
                      />
                    </div>
                  ))}
                  <button onClick={addEducation} style={buttonStyle}>+ Add Education</button>
                </div>

                <div>
                  <h3 style={{ color: '#333', marginBottom: 16 }}>Skills</h3>
                  {resume.skills.map((skill, idx) => (
                    <div key={idx} style={{ 
                      background: 'white', 
                      padding: '12px', 
                      borderRadius: '8px', 
                      marginBottom: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <input
                        style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
                        placeholder="Enter a skill"
                        value={skill}
                        onChange={e => handleSkillChange(idx, e.target.value)}
                      />
                      {resume.skills.length > 1 && (
                        <button onClick={() => removeSkill(idx)} style={removeButtonStyle}>
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button onClick={addSkill} style={buttonStyle}>+ Add Skill</button>
                </div>
              </div>

              <div style={{
                flex: 1,
                padding: 30,
                background: 'white',
                overflowY: 'auto',
                maxHeight: '800px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start'
              }}>
                <div ref={componentRef} style={{ transform: 'scale(0.7)', transformOrigin: 'top center' }}>
                  {template === 'aleena' && <AleenaPreview resume={resume} photo={photo} />}
                  {template === 'richard' && <RichardPreview resume={resume} photo={photo} />}
                  {template === 'ella' && <EllaPreview resume={resume} photo={photo} />}
                  {template === 'olivia' && <OliviaPreview resume={resume} photo={photo} />}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Templates;