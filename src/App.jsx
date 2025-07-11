import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Slider from './components/Slider';
import ImageCarousel from './components/imageCarousel';
import FeatureSection from './components/FeatureSection';
import Login from './components/Login';
import GetStarted from './components/GetStarted';
import UploadResume from './components/UploadResume';

function App() {
  const backgroundStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
    padding: '20px',
    marginTop: '60px',
    background: 'linear-gradient(to right, #e6f0fa, #87ceeb)',
  };

  const headingContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginLeft: '55px',
    marginTop: '90px',
    marginBottom: '50px',
  };

  const headingStyle = {
    fontSize: '53px',
    fontWeight: 'bold',
    margin: 0,
  };

  const headingStyle3 = {
    fontSize: '30px',
    fontWeight: 'bold',
    margin: 0,
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '10px',
    marginLeft: '55px',
    marginBottom: '15px',
  };

  const buildButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const scoreButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#fff',
    color: '#333',
    border: '1px solid #333',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const headingStyle2 = {
    display: 'flex',
    alignItems: 'center',
    marginTop: '30px',
  };

  const reviewStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    marginLeft: '55px',
    color: '#333',
  };

  const buildButtonStyle2 = {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '50px',
  };

  const starStyle = {
    color: '#ffd700',
    fontSize: '18px',
  };

  const gradientStyle = {
    width: '100%',
    height: '200px',
    background: 'radial-gradient(circle at 80% 50%, #6b48ff, #ff69b4, #87ceeb, #ffffff)',
    position: 'relative',
    top: '50px',
    zIndex: -1,
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <main style={backgroundStyle}>
                <div style={headingContainerStyle}>
                  <div>
                    <h1 style={headingStyle}>
                      Enhancv's <span style={{ color: 'slateblue' }}>Resume</span>
                    </h1>
                    <h1 style={headingStyle}>
                      <span style={{ color: 'slateblue' }}>Builder</span> helps you get
                    </h1>
                    <h1 style={headingStyle}>hired at top companies</h1>
                  </div>
                  <ImageCarousel />
                </div>
                <div style={buttonContainerStyle}>
                  <button style={buildButtonStyle}>Build Your Resume</button>
                  <button style={scoreButtonStyle}>Get Your Resume Score</button>
                </div>
                <div style={reviewStyle}>
                  <span>Excellent</span>
                  <span style={starStyle}>★★★★☆</span>
                  <span>4,662 Reviews</span>
                </div>
                <div style={gradientStyle}></div>
                <Slider />
                <FeatureSection />
                <div style={headingContainerStyle}>
                  <div>
                    <h2 style={headingStyle3}>Resumes optimized for</h2>
                    <h2 style={headingStyle3}> applicant tracking systems</h2>
                    <h2 style={headingStyle3}> (ATS)</h2>
                    <h3 style={headingStyle2}>
                      Enhancv resumes and cover letters are vigorously tested against
                    </h3>
                    <h3> major ATS systems to ensure complete parsability</h3>
                    <div style={buttonContainerStyle}>
                      <button style={buildButtonStyle2}>Build an ATS-Friendly Resume</button>
                    </div>
                    <div>
                      <h1>Trusted by Executives &</h1>
                      <h1> Senior Professionals</h1>
                    </div>
                  </div>
                  <div className="features">
                    <div style={{ marginBottom: '100px' }}>
                      <span style={{ fontSize: '20px' }}>Readable contact information</span>
                    </div>
                    <div style={{ marginBottom: '20px', marginLeft: '100px' }}>
                      <span style={{ fontSize: '20px' }}>Full experience section parsing</span>
                    </div>
                    <div style={{ marginLeft: '200px', marginTop: '100px', backgroundColor: 'rgba(185, 189, 192, 0.7)' }}>
                      <span style={{ fontSize: '20px' }}>Optimized skills section</span>
                    </div>
                  </div>
                </div>
              </main>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/upload-resume" element={<UploadResume />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;