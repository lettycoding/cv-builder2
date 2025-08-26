import React from 'react';

const Footer = () => (
    <footer style={{
        background: '#222',
        color: '#fff',
        textAlign: 'center',
        padding: '1rem 0',
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
    }}>
        <small>&copy; {new Date().getFullYear()} CV Builder. All rights reserved.</small>
    </footer>
);

export default Footer;
