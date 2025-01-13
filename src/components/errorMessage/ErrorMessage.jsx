import React from 'react';
import ReactDOM from 'react-dom';
import "./style.css";

const ErrorMessage = ({ message }) => {
  return ReactDOM.createPortal(
    <div className="error-message">
      {message}
    </div>,
    document.body 
  );
};

export default ErrorMessage;
