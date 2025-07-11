
import React from 'react';
import './Login.css';
import { Flame, PiggyBank, Hand } from 'lucide-react';

const Login = () => {
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
          <button className="social-btn facebook">Facebook</button>
        </div>
        <p>or use your email</p>
        <form>
          <input type="email" placeholder="Your Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="sign-in-btn">Sign In</button>
        </form>
        <div className="links">
          <a href="#">Forgot your password?</a>
          <p>First time here? <a href="#">Create an account</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
