import React from 'react';
import { ChevronLeft, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.jsx';

// Mock template data with placeholder images
const templates = [
  { id: 1, name: 'Deux colonnes', img: 'img4.jpeg/200x280/f8fafc/64748b?text=Deux+colonnes' },
  { id: 2, name: 'Élégant', img: 'img8.jpeg/200x280/f1f5f9/475569?text=Élégant' },
  { id: 3, name: 'Moderne', img: 'img14.jpeg/200x280/fafafa/525252?text=Moderne' },
  { id: 4, name: 'Contemporain', img: 'img2.jpeg/200x280/f9fafb/6b7280?text=Contemporain' },
  { id: 5, name: 'Raffiné', img: 'img3.jpeg/200x280/f8f9fa/495057?text=Raffiné' },
  { id: 6, name: 'Chronologique', img: 'img4.jpeg/200x280/fafbfc/4a5568?text=Chronologique' },
  { id: 7, name: 'Créatif', img: 'img5.jpeg/200x280/f7f8f9/374151?text=Créatif' },
  { id: 8, name: 'Multicolonne', img: 'img6.jpeg/200x280/f6f7f8/6b7280?text=Multicolonne' },
  { id: 9, name: 'Harvard', img: 'img7.jpeg/200x280/f8f9fa/4b5563?text=Harvard' },
  { id: 10, name: 'Stylé', img: 'img8.jpeg/200x280/f9fafb/374151?text=Stylé' },
  { id: 11, name: 'Compact', img: 'img9.jpeg/200x280/fafbfc/64748b?text=Compact' },
  { id: 12, name: 'Une colonne', img: 'img14.jpeg/200x280/f8fafc/525252?text=Une+colonne' },
  { id: 13, name: 'Élégant', img: 'img11.jpeg/200x280/f7f8f9/495057?text=Élégant+2' },
  { id: 14, name: 'Classique', img: 'img12.jpeg/200x280/f6f7f8/4a5568?text=Classique' },
  { id: 15, name: 'Raffiné', img: 'img13.jpeg/200x280/f9fafb/475569?text=Raffiné+2' },
  { id: 16, name: 'Harvard', img: 'img14.jpeg/200x280/fafafa/4b5563?text=Harvard+2' }
];

const CVTemplateSelector = () => {
  const handleTemplateClick = (templateId) => {
    alert(`Template sélectionné: ${templateId}`);
    // In your real app, you would use: navigate('/template');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button style={{
              padding: '0.25rem',
              border: 'none',
              background: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}>
              <ChevronLeft style={{ width: '20px', height: '20px', color: '#6b7280' }} />
            </button>
            {/* Progress indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '28px',
                height: '28px',
                background: '#10b981',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                ✓
              </div>
              <div style={{
                width: '48px',
                height: '2px',
                background: '#10b981',
                borderRadius: '2px'
              }}></div>
              <div style={{
                width: '28px',
                height: '28px',
                background: '#10b981',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                2
              </div>
              <div style={{
                width: '48px',
                height: '2px',
                background: '#d1d5db',
                borderRadius: '2px'
              }}></div>
              <div style={{
                width: '28px',
                height: '28px',
                background: '#d1d5db',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6b7280',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                3
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem' }}>
        {/* Profile section */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-block', marginBottom: '1.5rem' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #60a5fa, #a855f7, #fb923c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <User style={{ width: '40px', height: '40px', color: 'white' }} />
              </div>
            </div>
          </div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '8px'
          }}>
            Veuillez sélectionner un modèle pour votre CV.
          </h1>
          <p style={{ color: '#6b7280' }}>
            Vous pouvez toujours le modifier ultérieurement.
          </p>
        </div>

        {/* Templates grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(4, 1fr)',
          gap: '1.5rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {templates.map((template) => (
            <div
              key={template.id}
              style={{
                position: 'relative',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => handleTemplateClick(template.id)}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div style={{
                height: '256px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src={template.img}
                  alt={template.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    border: '1px solid #f3f4f6'
                  }}
                />
              </div>

              <div style={{
                padding: '12px',
                borderTop: '1px solid #f3f4f6'
              }}>
                <h3 style={{
                  fontWeight: '500',
                  color: '#111827',
                  textAlign: 'center',
                  fontSize: '14px',
                  margin: 0
                }}>{template.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CVTemplateSelector;