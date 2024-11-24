// MainContent.js
import React from 'react';
import './style.css';

const MainContent = ({ children }) => {
  return (
    <div className="main-content">
        {children}
    </div>
  );
};

export default MainContent;

