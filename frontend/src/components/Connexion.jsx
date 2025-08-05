import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Linkedin, Sparkles, ArrowRight, User, Zap, Download } from 'lucide-react';
import './Connexion.css';

const ResumeBuilderLanding = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const options = [
    {
      id: 'scratch',
      title: 'Build from Scratch',
      description: 'Start with a blank canvas and create your resume step by step with our guided builder.',
      icon: FileText,
      color: 'blue-cyan',
      features: ['Guided step-by-step process', 'Multiple templates', 'Real-time preview', 'Custom sections'],
      buttonText: 'Start Building'
    },
    {
      id: 'linkedin',
      title: 'Import from LinkedIn',
      description: 'Instantly populate your resume with your LinkedIn profile data and save time.',
      icon: Linkedin,
      color: 'blue-dark',
      features: ['Instant data import', 'Professional formatting', 'Easy editing', 'Keep privacy intact'],
      buttonText: 'Connect LinkedIn'
    },
    {
      id: 'ai',
      title: 'AI-Powered Creation',
      description: 'Let our AI craft a professional resume based on your career goals and experience.',
      icon: Sparkles,
      color: 'purple-pink',
      features: ['AI-optimized content', 'Industry-specific tips', 'ATS-friendly format', 'Smart suggestions'],
      buttonText: 'Generate with AI'
    }
  ];

  const handleOptionSelect = (optionId) => {
    setSelectedOption((prev) => (prev === optionId ? null : optionId));
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Selected option: ${optionId}`);
    }
  };

  return (
    <main className="landing-container">
      <div className="background-elements">
        <div className="bg-element bg-element-1"></div>
        <div className="bg-element bg-element-2"></div>
        <div className="bg-element bg-element-3"></div>
      </div>

      <div className="main-content">
        <header className={`header ${isVisible ? 'visible' : ''}`}>
          <div className="badge">
            <Zap className="badge-icon" aria-hidden="true" />
            <span className="badge-text">Professional Resume Builder</span>
          </div>
          
          <h1 className="main-title">
            Create Your
            <span className="gradient-text"> Perfect </span>
            Resume
          </h1>
          
          <p className="subtitle">
            Choose your preferred method to build a professional resume that stands out. 
            Whether you want full control, quick imports, or AI assistance - we've got you covered.
          </p>
        </header>

        <div className="options-grid">
          {options.map((option, index) => {
            const Icon = option.icon;
            const isSelected = selectedOption === option.id;
            
            return (
              <article
                key={option.id}
                className={`option-card ${isVisible ? 'visible' : ''} ${isSelected ? 'selected' : ''}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="card-content">
                  <div className={`gradient-overlay gradient-${option.color}`}></div>
                  
                  <div className={`icon-container gradient-${option.color}`}>
                    <Icon className="option-icon" aria-hidden="true" />
                  </div>

                  <h3 className="option-title">{option.title}</h3>
                  <p className="option-description">{option.description}</p>

                  <ul className="features-list">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="feature-item">
                        <div className="feature-bullet"></div>
                        <span className="feature-text">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* First option - Build from Scratch */}
                  {option.id === 'scratch' ? (
                    <Link
                      to="/reorganiser1"
                      className={`option-button gradient-${option.color}`}
                      aria-label="Start building resume from scratch"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (process.env.NODE_ENV !== 'production') {
                          console.log('Navigating to /reorganiser');
                        }
                      }}
                    >
                      {option.buttonText}
                      <ArrowRight className="button-arrow" aria-hidden="true" />
                    </Link>
                  ) : 
                  /* Second option - LinkedIn Import */
                  option.id === 'linkedin' ? (
                    <Link
                      to="/reorganiser1"
                      className={`option-button gradient-${option.color}`}
                      aria-label="Import from LinkedIn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (process.env.NODE_ENV !== 'production') {
                          console.log('Navigating to /reorganiser1');
                        }
                      }}
                    >
                      {option.buttonText}
                      <ArrowRight className="button-arrow" aria-hidden="true" />
                    </Link>
                  ) : (
                    /* Third option - AI-Powered (remains as button) */
                    <button
                      onClick={() => handleOptionSelect(option.id)}
                      className={`option-button gradient-${option.color}`}
                      aria-label={`Select ${option.title}`}
                    >
                      {option.buttonText}
                      <ArrowRight className="button-arrow" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className={`bottom-cta ${isVisible ? 'visible' : ''}`}>
          <div className="cta-badge">
            <User className="cta-icon user-icon" aria-hidden="true" />
            <span className="cta-text">Join 50,000+ professionals who built their dream resume</span>
            <Download className="cta-icon download-icon" aria-hidden="true" />
          </div>
        </div>

        {selectedOption && (
          <div className="selection-feedback">
            <div className="feedback-content">
              <div className="feedback-dot"></div>
              <span className="feedback-text">
                {options.find(opt => opt.id === selectedOption)?.title} selected!
              </span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ResumeBuilderLanding;