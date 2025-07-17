import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Slider from './components/Slider';
import ImageCarousel from './components/imageCarousel';
import FeatureSection from './components/FeatureSection';
import Login from './components/Login';
import GetStarted from './components/GetStarted';
import UploadResume from './components/UploadResume';
import {Share2,Rocket,Contact,CircleCheck,ArrowRight } from 'lucide-react';
import Reviews from './components/Reviews';
import Account from './components/CreateAcc';

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
                  <div style={{display:'center'}}>
                     <div className="features">
                    <div style={{ marginBottom: '100px' }}>
                      <span style={{ fontSize: '20px',display: 'flex', alignItems: 'center',marginLeft:'10px' }}> <span 
                      style=
                      {{backgroundColor:'rgb(212, 220, 228)',
                        justifyContent:'center',
                        display:'flex',
                        alignItems:'center',
                        borderRadius:'5px',
                        height:'60px',
                        width:'60px'
                      
                      }}><Contact  style={{
                               
                                borderRadius: '5px', 
                                width: '30px', 
                                height: '30px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                      }} /></span>
                      
                         Readable contact information</span>
                    </div>
                   <div style={{ marginBottom: '20px', marginLeft: '100px' }}>
                      <span style={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}>
                        <span
                        style=
                      {{backgroundColor:'rgb(212, 220, 228)',
                        justifyContent:'center',
                        display:'flex',
                        alignItems:'center',
                        borderRadius:'5px',
                        height:'60px',
                        width:'60px'
                      
                      }}
                        >
                            <Rocket style={{
                          fontSize:'6px',
                         
                          borderRadius: '5px',
                          width: '30px',
                          height: '30px',
                          marginRight: '8px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }} />
                        </span>
                        
                        Full experience section parsing
                      </span>
                    </div>
                    <div style={{ marginLeft: '200px', marginTop: '100px', backgroundColor: 'transparent' }}>
                      <span style={{ fontSize: '20px',display: 'flex', alignItems: 'center'}} >
                        <span 
                        style=
                      {{backgroundColor:'rgb(212, 220, 228)',
                        justifyContent:'center',
                        display:'flex',
                        alignItems:'center',
                        borderRadius:'5px',
                        height:'60px',
                        width:'60px'
                      
                      }}
                        >

                          <Share2  style={{
                                 
                                borderRadius: '5px', 
                                fontSize:'6px',
                                width: '30px', 
                                height: '30px', 
                                marginRight: '8px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                      }} size={20}/>
                        </span>
                        Optimized skills section</span>
                    </div>
                  </div>

                </div>
                 
                </div>
                <div>
                  <Reviews />
                </div>
                <div style={{margin:'50px'}}>
                  <h1 style={{fontSize:'30px',marginBottom:'20px'}}>Check your resume for grammatical and punctuation errors</h1>
                  <h3 style={{marginBottom:'20px'}}>A built-in content checker tool helping you stay on top of grammar errors and clichés</h3>
                  <h3 style={{display: 'flex', alignItems: 'center'}}><CircleCheck style={{color:'green',marginRight: '8px'}}/>  Wording and readability analysis</h3>
                      <h3 style={{display: 'flex', alignItems: 'center'}}><CircleCheck  style={{color:'green',marginRight: '8px'}}/>  Eliminate typos and grammatical errors</h3>
                     <h3 style={{display: 'flex', alignItems: 'center'}}><CircleCheck style={{color:'green',marginRight:'8px'}}/>   Content suggestions based on your job and experience</h3>
                </div>
                <div style={{margin:'50px',display:'left'}}>
                  <h1 style={{fontSize:'30px',marginBottom:'20px'}}>Resume tailoring based on the job you’re applying for</h1>
                  <h3 style={{marginBottom:'20px'}}>Quickly ensure that your resume covers key skills and experiences by pasting the job ad you’re applying for</h3>
                  <h3 style={{display: 'flex', alignItems: 'center'}}><CircleCheck style={{color:'green',marginRight: '8px'}}/>  Skills and experience section analysis</h3>
                      <h3 style={{display: 'flex', alignItems: 'center'}}><CircleCheck  style={{color:'green',marginRight: '8px'}}/>  Actionable checklist of what else to add to your resume</h3>
                     <h3 style={{display: 'flex', alignItems: 'center'}}><CircleCheck style={{color:'green',marginRight:'8px'}}/>   Instant comparison between your resume and the job posting</h3>
                </div>

                <div style={{margin:'50px',display:'left'}}>
                  <h1 style={{fontSize:'30px',marginBottom:'20px'}}>20+ Professionally designed resume sections</h1>
                  <h3 style={{marginBottom:'20px'}}>Express your professional history without limitations or worry about how your resume looks</h3>
                  <h3 style={{display: 'flex', alignItems: 'center'}}><CircleCheck style={{color:'green',marginRight: '8px'}}/>  Professional sections like Experience, Skills,Summary and Education</h3>
                      <h3 style={{display: 'flex', alignItems: 'center'}}><CircleCheck  style={{color:'green',marginRight: '8px'}}/>  Personal sections like Strengths, Quotes, Books,Interests and my Time</h3>
                     <h3 style={{display: 'flex', alignItems: 'center'}}><CircleCheck style={{color:'green',marginRight:'8px'}}/>  Other sections like Certifications, Awards, Achievements, Languages and References</h3>
                </div>

               <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0 }}>
                  <h1 style={{ fontSize: '30px', textAlign: 'center' }}>
                    The resume builder that’s right for your job and experience
                  </h1>
                </div>

                
                <div>
                  <button style={{
                                    color: 'blue',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center', // Center text horizontally
                                    backgroundColor: 'transparent',
                                    borderColor: 'white',
                                    borderRadius: '5px',
                                    height: '60px',
                                    width: '300px',
                                  }}><span style={{ display: 'flex', alignItems: 'center' ,fontSize:'15px'}}>View All Resume Examples</span> <ArrowRight style={{color:'blue'}}/> </button>



                </div>
              </main>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/upload-resume" element={<UploadResume />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;