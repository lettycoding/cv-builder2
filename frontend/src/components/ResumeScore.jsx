import React from 'react';
import './ResumeScore.css';
import { Lock } from 'lucide-react';
import enhanceImage from '/src/assets/checker.jpeg';
import enhancer from '/src/assets/enhance.png';

const ResumeScore = () => {
  return (
    <div className="resume-score-container">
      <div className="content-wrapper">
        <div className="text-content">
          <h3 className="header1">Resume Checker</h3>
          <div>
            <h1 className="header2">Is your resume good </h1>
            <h1 className="header22">enough?</h1>
          </div>
          <div>
            <h3 className="header3">
              A free and fast AI resume checker doing 16 crucial checks to ensure
            </h3>
            <h3 className="header31">your resume is ready to perform and get you interview callbacks.</h3>
          </div>
          <div className="button-div">
            <button className="mainbutton">
              <h3 className="buttonfont">Drop your resume here or choose a file.</h3>
              <h3 className="buttonfont">PDF or DOCX only. Max 2MB file size</h3>
              <div className="subbutton-margin">
                <button className="subbutton">
                  <h3 style={{ fontSize: '15px', color: 'white' }}>Upload Your Resume</h3>
                </button>
              </div>
              <h3 style={{ display: 'flex', justifyContent: 'center', fontSize: '15px', marginTop: '15px' }}>
                <Lock size={18} />
                <span style={{ marginLeft: '10px' }}>privacy guaranteed</span>
              </h3>
            </button>
          </div>
        </div>
        <div className="image-wrapper">
          <img src={enhanceImage} alt="checker photo" className="resume-image" />
        </div>
      </div>
      <div className="enhancer-section">
        <div className="enhancer-image-wrapper">
          <img src={enhancer} alt="enhancer image" className="enhancer-image" />
        </div>
        <div className="enhancer-text-content">
          <h1 style={{fontSize:'30px', marginBottom:'20px',marginTop:'100px'}}>
            Enhancv’s Resume Checker forms its ATS score with a two-tier system
          </h1>
          <h3 style={{fontSize:'18px', fontWeight:'lighter'}}>
            When you’re applying for a job, there’s a high chance your resume will be screened through an applicant tracking system way before it finds its way on a recruiter’s screen. ATS helps hiring managers find the right candidates by searching for keywords and adding the resume to a database.
            That’s why the success of your resume is highly dependent on how optimized your resume is for the job you’re applying for, the resume template you’re using, and what skills and keywords you have included.
          </h3>
          <div className='circle'>
            <p className='circle-text'>1</p>
          </div>
          <h2>The proportion of content we can interpret</h2>
          <h3 style={{fontSize:'18px', fontWeight:'lighter'}}>Similar to an ATS, we analyze and attempt to comprehend your resume. The greater our understanding of your resume, the more effectively it aligns with a company’s ATS.</h3>
          <div className='circle'>
            <p className='circle-text'>2</p>
          </div>
          <h2>What our checker identifies</h2>
          <h3 style={{fontSize:'18px', fontWeight:'lighter'}}>Although an ATS doesn’t look for spelling mistakes and poorly crafted content, recruitment managers certainly do. The second part of our score is based on the quantifiable achievements you have in your resume and the quality of the written content.</h3>
        </div>
      </div>
    </div>
  );
};

export default ResumeScore;