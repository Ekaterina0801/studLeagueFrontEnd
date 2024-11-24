import React from "react";
import './style.css';

function Modal({ show, onClose, children }) {
  if (!show) return null; // If `show` is false, do not render anything

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
}

export default Modal;

