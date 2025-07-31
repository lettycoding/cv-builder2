import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Slider from './components/Slider';
import ImageCarousel from './components/imageCarousel';
import FeatureSection from './components/FeatureSection';
import Login from './components/Login';
import GetStarted from './components/GetStarted';
import UploadResume from './components/UploadResume';
import { Share2, Rocket, Contact, CircleCheck, ArrowRight, Star } from 'lucide-react';
import Reviews from './components/Reviews';
import Account from './components/CreateAcc';
import { Link } from 'react-router-dom';
import ResumeScore from './components/ResumeScore';
import grandientimage from './assets/gradient.svg'; // Ensure this path is correct
import { RxFontStyle } from 'react-icons/rx';

import Templates from './components/Templates';


function App() {
  const backgroundStyle = {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
    padding: '20px',
    marginTop: '80px',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${grandientimage})`,
    fontFamily: 'Rubik, sans-serif',
  };

  const headingContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginLeft: '55px',
    marginTop: '-40px',
    marginBottom: '50px',
    backgroundColor: 'transparent',
    fontFamily: 'Rubik, sans-serif',
  };

  const headingStyle = {
    fontSize: '58px',
    lineheight:'76px',
    fontWeight: 'bold',
    margin: 0,
    color:'#2d2639',
    fontstyle:'normal',
    marginBottom:'10px',
    fontFamily: 'Rubik, sans-serif',
  };

  const headingStyle3 = {
    fontSize: '30px',
    fontWeight: 'bold',
    margin: 0,
    fontFamily: 'Rubik, sans-serif',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '20px',
    marginLeft: '8px',
    marginBottom: '15px',
    backgroundColor: 'transparent',
    fontFamily: 'Rubik, sans-serif',
  };

  const buildButtonStyle = {
    marginTop:'25px',
    padding: '13px 16px',
    backgroundColor: 'rgb(27,205,164)',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '18px',
    cursor: 'pointer',
    fontFamily: 'Rubik, sans-serif',
  };
  const buildButtonStyle3 = {
    marginTop: '25px',
    padding: '13px 16px',
    borderColor: 'rgb(56,67,71)',
    backgroundColor: 'transparent',
    borderRadius: '4px',
    fontSize: '18px',
    borderStyle: 'solid',     
    borderWidth: '2px',       
    cursor: 'pointer',
    fontFamily: 'Rubik, sans-serif',
    textDecoration: 'none',
  };

  const starContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  };

  const singleStarWrapperStyle = {
    backgroundColor: 'rgb(27,205,164)',
    padding: '4px',
    borderRadius: '8px',
    margin: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const starIconStyle = {
    color: 'white',
    size:'2px',
  };

  const headingStyle2 = {
    display: 'flex',
    alignItems: 'center',
    marginTop: '30px',
    fontFamily: 'Rubik, sans-serif',
  };

  const reviewStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    marginLeft: '55px',
    color: '#333',
    backgroundColor: 'transparent',
    fontFamily: 'Rubik, sans-serif',
  };

  const buildButtonStyle2 = {
    padding: '10px 20px',
    backgroundColor: 'rgb(228,228,228)',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '50px',
    fontFamily: 'Rubik, sans-serif',
  };

  const starStyle = {
    color: 'rgb(87,205,164)',
    fontSize: '18px',
    fontFamily: 'Rubik, sans-serif',
  };

  return (
    <Router>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <main style={backgroundStyle}>
                <div style={headingContainerStyle}>
                  <div>
                    <div style={{font:'58px rubik',margin:'32px 0px',color:'2D3639'}}>
                      <h1 style={headingStyle}>
                        Enhancv's <span style={{ color: 'rgb(78,59,149)' }}>Resume Builder</span>
                      </h1>
                      <h1 style={headingStyle}>
                        helps you get hired at top
                      </h1>
                      <h1 style={headingStyle}> companies</h1>
                    </div>
                    <div style={buttonContainerStyle}>
                      <button style={buildButtonStyle}>Build Your Resume</button>
                      <Link to="/resumescore" style={buildButtonStyle3}>
                        <span style={{color:'rgb(56,67,71)'}}>Get Your Resume Score</span>
                      </Link>
                    </div>
                    <div style={reviewStyle}>
                      <span>Excellent</span>
                      <span>
                        <div style={starContainerStyle}>
                          <div style={singleStarWrapperStyle}>
                            <Star size={20} fill='#fff' style={starIconStyle} />
                          </div>
                          <div style={singleStarWrapperStyle}>
                            <Star size={20} fill='#fff' style={starIconStyle} />
                          </div>
                          <div style={singleStarWrapperStyle}>
                            <Star size={20} fill='#fff' style={starIconStyle} />
                          </div>
                          <div style={singleStarWrapperStyle}>
                            <Star size={20} fill='#fff' style={starIconStyle} />
                          </div>
                          <div
                            style={{
                              ...singleStarWrapperStyle,
                              background: 'linear-gradient(to right, rgb(27,205,164) 50%, #fff 50%)'
                            }}
                          >
                            <Star size={20} fill='#fff' style={starIconStyle} />
                          </div>
                        </div>
                      </span>
                      <span>4,662 Reviews</span>
                    </div>
                    <div>
                      <h3></h3>
                    </div>
                  </div>
                  <div><ImageCarousel /></div>
                </div>
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
                  <div style={{ display: 'center' }}>
                    <div className="features">
                      <div style={{ marginBottom: '100px' }}>
                        <span
                          style={{
                            fontSize: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: '10px',
                            fontFamily: 'Rubik, sans-serif',
                          }}
                        >
                          <span
                            style={{
                              backgroundColor: 'rgb(212, 220, 228)',
                              justifyContent: 'center',
                              display: 'flex',
                              alignItems: 'center',
                              borderRadius: '5px',
                              height: '60px',
                              width: '60px',
                            }}
                          >
                            <Contact
                              style={{
                                borderRadius: '5px',
                                width: '30px',
                                height: '30px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            />
                          </span>
                          Readable contact information
                        </span>
                      </div>
                      <div style={{ marginBottom: '20px', marginLeft: '100px' }}>
                        <span
                          style={{
                            fontSize: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            fontFamily: 'Rubik, sans-serif',
                          }}
                        >
                          <span
                            style={{
                              backgroundColor: 'rgb(212, 220, 228)',
                              justifyContent: 'center',
                              display: 'flex',
                              alignItems: 'center',
                              borderRadius: '5px',
                              height: '60px',
                              width: '60px',
                            }}
                          >
                            <Rocket
                              style={{
                                borderRadius: '5px',
                                width: '30px',
                                height: '30px',
                                marginRight: '8px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            />
                          </span>
                          Full experience section parsing
                        </span>
                      </div>
                      <div
                        style={{
                          marginLeft: '200px',
                          marginTop: '100px',
                          backgroundColor: 'transparent',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            fontFamily: 'Rubik, sans-serif',
                          }}
                        >
                          <span
                            style={{
                              backgroundColor: 'rgb(212, 220, 228)',
                              justifyContent: 'center',
                              display: 'flex',
                              alignItems: 'center',
                              borderRadius: '5px',
                              height: '60px',
                              width: '60px',
                            }}
                          >
                            <Share2
                              style={{
                                borderRadius: '5px',
                                width: '30px',
                                height: '30px',
                                marginRight: '8px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                              size={20}
                            />
                          </span>
                          Optimized skills section
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Reviews />
                </div>
                <div style={{ margin: '50px' }}>
                  <h1 style={{ fontSize: '30px', marginBottom: '20px', fontFamily: 'Rubik, sans-serif' }}>
                    Check your resume for grammatical and punctuation errors
                  </h1>
                  <h3 style={{ marginBottom: '20px', fontFamily: 'Rubik, sans-serif' }}>
                    A built-in content checker tool helping you stay on top of grammar errors and clichés
                  </h3>
                  <h3 style={{ display: 'flex', alignItems: 'center', fontFamily: 'Rubik, sans-serif' }}>
                    <CircleCheck style={{ color: 'green', marginRight: '8px' }} /> Wording and readability analysis
                  </h3>
                  <h3 style={{ display: 'flex', alignItems: 'center', fontFamily: 'Rubik, sans-serif' }}>
                    <CircleCheck style={{ color: 'green', marginRight: '8px' }} /> Eliminate typos and grammatical errors
                  </h3>
                  <h3 style={{ display: 'flex', alignItems: 'center', fontFamily: 'Rubik, sans-serif' }}>
                    <CircleCheck style={{ color: 'green', marginRight: '8px' }} /> Content suggestions based on your job and experience
                  </h3>
                </div>
                <div style={{ margin: '50px', display: 'left' }}>
                  <h1 style={{ fontSize: '30px', marginBottom: '20px', fontFamily: 'Rubik, sans-serif' }}>
                    Resume tailoring based on the job you’re applying for
                  </h1>
                  <h3 style={{ marginBottom: '20px', fontFamily: 'Rubik, sans-serif' }}>
                    Quickly ensure that your resume covers key skills and experiences by pasting the job ad you’re applying for
                  </h3>
                  <h3 style={{ display: 'flex', alignItems: 'center', fontFamily: 'Rubik, sans-serif' }}>
                    <CircleCheck style={{ color: 'green', marginRight: '8px' }} /> Skills and experience section analysis
                  </h3>
                  <h3 style={{ display: 'flex', alignItems: 'center', fontFamily: 'Rubik, sans-serif' }}>
                    <CircleCheck style={{ color: 'green', marginRight: '8px' }} /> Actionable checklist of what else to add to your resume
                  </h3>
                  <h3 style={{ display: 'flex', alignItems: 'center', fontFamily: 'Rubik, sans-serif' }}>
                    <CircleCheck style={{ color: 'green', marginRight: '8px' }} /> Instant comparison between your resume and the job posting
                  </h3>
                </div>
                <div style={{ margin: '50px', display: 'left' }}>
                  <h1 style={{ fontSize: '30px', marginBottom: '20px', fontFamily: 'Rubik, sans-serif' }}>
                    20+ Professionally designed resume sections
                  </h1>
                  <h3 style={{ marginBottom: '20px', fontFamily: 'Rubik, sans-serif' }}>
                    Express your professional history without limitations or worry about how your resume looks
                  </h3>
                  <h3 style={{ display: 'flex', alignItems: 'center', fontFamily: 'Rubik, sans-serif' }}>
                    <CircleCheck style={{ color: 'green', marginRight: '8px' }} /> Professional sections like Experience, Skills, Summary and Education
                  </h3>
                  <h3 style={{ display: 'flex', alignItems: 'center', fontFamily: 'Rubik, sans-serif' }}>
                    <CircleCheck style={{ color: 'green', marginRight: '8px' }} /> Personal sections like Strengths, Quotes, Books, Interests and my Time
                  </h3>
                  <h3 style={{ display: 'flex', alignItems: 'center', fontFamily: 'Rubik, sans-serif' }}>
                    <CircleCheck style={{ color: 'green', marginRight: '8px' }} /> Other sections like Certifications, Awards, Achievements, Languages and References
                  </h3>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 0,
                    padding: 0,
                  }}
                >
                  <h1 style={{ fontSize: '30px', textAlign: 'center', fontFamily: 'Rubik, sans-serif' }}>
                    The resume builder that’s right for your job and experience
                  </h1>
                </div>
                <div>
                  <button
                    style={{
                      color: 'blue',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'transparent',
                      borderColor: 'white',
                      borderRadius: '5px',
                      height: '60px',
                      width: '300px',
                      fontFamily: 'Rubik, sans-serif',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', fontSize: '15px' }}>
                      View All Resume Examples
                    </span>{' '}
                    <ArrowRight style={{ color: 'blue' }} />
                  </button>
                </div>
              </main>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/upload-resume" element={<UploadResume />} />
          <Route path="/account" element={<Account />} />
          <Route path="/resumescore" element={<ResumeScore />} />
          <Route path="/templates" element={<Templates />} />
          
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;