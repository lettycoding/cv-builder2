
import React from 'react';
import './CreateAcc.css';
import { Flame, PiggyBank, Hand } from 'lucide-react';
import { Link } from 'react-router-dom';

const Account = () => {
  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo">Enhancv</div>
        <h2>Create a resume you are proud of</h2>
        <ul className="features-list">
          <li><PiggyBank className="icon" /> Save time with hassle-free templates</li>
          <li><Hand className="icon" /> Beat the competition using actionable, contextual advice</li>
          <li><Flame className="icon" /> Highlight key achievements with memorable visuals</li>
        </ul>
        <p>Get inspired by 1800+ Free Resume Examples and Templates</p>
      </div>
      <div className="login-right">
        <h2>Sign in to your account</h2>
        <div className="social-buttons">
          <button className="social-btn linkedin">LinkedIn</button>
          <button className="social-btn google">Google</button>
         
        </div>
        <p>or use your email</p>
        <form>
          <input type="name" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="sign-in-btn">create account</button>
        </form>
        <div className="links">
          
          
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Account;
