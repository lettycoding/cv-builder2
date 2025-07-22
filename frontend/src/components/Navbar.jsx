import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'; // Import Link
import logo1 from '../assets/logo.png';


export const menuItems = [
  {
    title: 'Resume',
    submenu: [
      {
        title: 'Resume templates',
      },
          {title: 'Creative templates', url: '/#' },
          { title: 'Traditional templates', url: '/#' },
          { title: 'Modern templates', url: '/#' },
          { title: 'Simple templates', url: '/#' },

          {title: 'Resume templates'},
          { title: 'Creative templates', url: '/#' },
          { title: 'Traditional templates', url: '/#' },
          { title: 'Modern templates', url: '/#' },
          { title: 'Simple templates', url: '/#' },
      
      
      /*{
        title: 'Resume templates',
        submenu: [
          { title: 'Creative templates', url: '/#' },
          { title: 'Traditional templates', url: '/#' },
          { title: 'Modern templates', url: '/#' },
          { title: 'Simple templates', url: '/#' },
        ],
      },
      {
        title: 'Resume writing guide',
        submenu: [
          { title: 'Writing a resume', url: '/#' },
          { title: 'Resume summary', url: '/#' },
          { title: 'Choosing a resume format', url: '/#' },
          { title: 'Fitting experience on one page', url: '/#' },
        ],
      },
      {
        title: 'Resume example',
        submenu: [
          { title: 'Project manager', url: '/#' },
          { title: 'Data scientist', url: '/#' },
          { title: 'Scrum master', url: '/#' },
          { title: 'Business analyst', url: '/#' },
        ],
      },
      { title: 'AI resume builder', url: '/#' },
      { title: 'Resume checker', url: '/#' },
      { title: 'Resume skills', url: '/#' },
       */
    ],
  },
  {
    title: 'Cover letter',
    submenu: [
      { title: 'Cover letter builder', url: '/#' },
      { title: 'Cover letter template', url: '/#' },
      { title: 'Free AI Cover letter', url: '/#' },
      {
        title: 'Cover letter writing guide',
        submenu: [
          { title: 'Writing a Cover letter', url: '/#' },
          { title: 'Cover letter format', url: '/#' },
          { title: 'Ending Cover letter', url: '/#' },
          { title: 'Cover letter design', url: '/#' },
        ],
      },
      { title: 'Cover letter example', url: '/#' },
      { title: 'QA engineer', url: '/#' },
      { title: 'Cashier', url: '/#' },
      { title: 'Data analyst', url: '/#' },
      { title: 'UX designer', url: '/#' },
      { title: 'Architect', url: '/#' },
      { title: 'Civil engineer', url: '/#' },
      { title: 'Lecturer', url: '/#' },
      { title: 'Pilot', url: '/#' },
      { title: 'Waiter', url: '/#' },
      { title: 'Data engineer', url: '/#' },
    ],
  },
  {
    title: 'Blog',
    submenu: [
      {
        title: 'Resources',
        submenu: [
          { title: 'Resume resources', url: '/#' },
          { title: 'Cover letter resources', url: '/#' },
          { title: 'Job interview', url: '/#' },
        ],
      },
      { title: 'FAQs', url: '/#' },
      { title: 'Career growth', url: '/#' },
    ],
  },
  { title: 'Pricing', url: '/#' },
  { title: 'For organisation', url: '/#' },
  { title: 'Sign in', url: '/#' },
  { title: 'Get started', url: '/#' },
];

const MenuItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasSubmenu = item.submenu && item.submenu.length > 0;

  return (
    <div className="menu-item" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <a href={item.url || '#'}>
        {item.title}
        {hasSubmenu && (
          <svg className="arrow" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 3L4 5L7 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </a>
      {hasSubmenu && isOpen && (
        <div className="dropdown">
          {item.submenu.map((subItem, index) => (
            <MenuItem key={index} item={subItem} />
          ))}
        </div>
      )}
    </div>
  );
};


const Dropdown = function(props) {

  return (

    <div className='dropdown'>
      <button className='dropdownbtn'>{props.title}</button>
      <div className='dropdowm-content'>
        {props.items.map(function(item,index){
          return <a href="#" key={index}>{item}</a>;
          
        })}
      </div>
    </div>
  )
}
const Navbar = () => {
  return (
    <nav>
      <div className="nav-container">
        <div className="nav-content">
          <div className="logo">

            <img src={logo1} alt="Company Name Logo" className="logo-img" />
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