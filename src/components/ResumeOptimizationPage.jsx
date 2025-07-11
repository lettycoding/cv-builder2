import React from 'react';

const ResumeOptimizationPage = () => {
  return (
    <div className="container" style={{ textAlign: 'left', position: 'relative', zIndex: 1, maxWidth: '600px' }}>
      <h1 style={{ fontSize: '2.5em', marginBottom: '10px' }}>Resumes optimized for applicant tracking systems (ATS)</h1>
      <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
        Enhancv resumes and cover letters are vigorously tested against major ATS systems to ensure complete parsability
      </p>
      <button
        className="button"
        style={{
          backgroundColor: '#2ecc71',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1.1em',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#27ae60')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#2ecc71')}
      >
        Build an ATS-Friendly Resume
      </button>
      <div
        className="features"
        style={{
          position: 'absolute',
          right: '50px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <div
          className="feature"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
            padding: '10px 20px',
            margin: '15px 0',
            display: 'flex',
            alignItems: 'center',
            width: '200px',
          }}
        >
          <img src="https://via.placeholder.com/24" alt="Readable contact" style={{ marginRight: '10px', width: '24px', height: '24px' }} />
          <span>Readable contact information</span>
        </div>
        <div
          className="feature"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
            padding: '10px 20px',
            margin: '15px 0',
            display: 'flex',
            alignItems: 'center',
            width: '180px',
          }}
        >
          <img src="https://via.placeholder.com/24" alt="Experience parsing" style={{ marginRight: '10px', width: '24px', height: '24px' }} />
          <span>Full experience section parsing</span>
        </div>
        <div
          className="feature"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
            padding: '10px 20px',
            margin: '15px 0',
            display: 'flex',
            alignItems: 'center',
            width: '160px',
          }}
        >
          <img src="https://via.placeholder.com/24" alt="Optimized skills" style={{ marginRight: '10px', width: '24px', height: '24px' }} />
          <span>Optimized skills section</span>
        </div>
      </div>
      <div
        className="background-lines"
        style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.2 }}
      >
        <div
          className="line"
          style={{ position: 'absolute', background: '#ecf0f1', width: '2px', height: '100%', transformOrigin: 'bottom', left: '20%', transform: 'rotate(15deg)' }}
        ></div>
        <div
          className="line"
          style={{ position: 'absolute', background: '#ecf0f1', width: '2px', height: '100%', transformOrigin: 'bottom', left: '40%', transform: 'rotate(-10deg)' }}
        ></div>
        <div
          className="line"
          style={{ position: 'absolute', background: '#ecf0f1', width: '2px', height: '100%', transformOrigin: 'bottom', left: '60%', transform: 'rotate(20deg)' }}
        ></div>
        <div
          className="line"
          style={{ position: 'absolute', background: '#ecf0f1', width: '2px', height: '100%', transformOrigin: 'bottom', left: '80%', transform: 'rotate(-15deg)' }}
        ></div>
      </div>
    </div>
  );
};

export default ResumeOptimizationPage;