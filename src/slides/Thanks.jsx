import React from 'react';
import { Link } from 'react-router-dom';

export default function Thanks() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to bottom right, #e0ffe0, #ffffff)',
    padding: '20px',
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '20px',
    textAlign: 'center',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    maxWidth: '500px',
    width: '100%',
  };

  const checkmarkStyle = {
    fontSize: '60px',
    color: '#4BB543',
    marginBottom: '20px',
  };

  const headingStyle = {
    fontSize: '28px',
    color: '#333',
    marginBottom: '15px',
  };

  const paragraphStyle = {
    fontSize: '16px',
    color: '#555',
    marginBottom: '25px',
  };

  const buttonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#4BB543',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '30px',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#3ca535',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={checkmarkStyle}>✓</div>
        <h1 style={headingStyle}>Thank You for Your Purchase!</h1>
        <p style={paragraphStyle}>
          We truly appreciate your business and hope you enjoy your items.
        </p>
        <Link
          to="/"
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#3ca535')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#4BB543')}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
