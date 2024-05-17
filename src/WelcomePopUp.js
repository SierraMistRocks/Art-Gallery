import React from 'react';

const WelcomePopup = ({ onClose }) => {
  return (
    <div className="welcome-popup">
      <h2>Welcome to Our Art Gallery</h2>
      <button onClick={onClose}>Explore</button>
    </div>
  );
};

export default WelcomePopup;
