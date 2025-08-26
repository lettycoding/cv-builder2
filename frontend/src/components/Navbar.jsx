import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../assets/real2.png';

export const menuItems = [
  { title: 'Home', url: '/' },
  { title: 'Pricing', url: '/pricing' },
  { title: 'Sign in', url: '/login' },
  { title: 'Get started', url: '/get-started' },
];

const MenuItem = ({ item }) => {
  const isInternal = item.url && item.url.startsWith('/');
  return (
    <div className="menu-item">
      {isInternal ? (
        <Link to={item.url}>{item.title}</Link>
      ) : (
        <a href={item.url || '#'}>{item.title}</a>
      )}
    </div>
  );
};

const Navbar = () => {
  return (
    <nav>
      <div className="nav-container">
        <div className="nav-content">
          <div className="logo">
            <img src={logo} alt="Company Name Logo" className="logo-img" />
          </div>
          <div className="nav-menu">
            {menuItems.map((item, index) => {
              // Skip rendering "Sign in" and "Get started" as MenuItems since they have custom styling
              if (item.title === 'Sign in' || item.title === 'Get started') {
                return null;
              }
              return <MenuItem key={index} item={item} />;
            })}
            <Link to="/login" className="sign-in-btn">Sign in</Link>
            <Link to="/get-started" className="get-started-btn">Get started</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;