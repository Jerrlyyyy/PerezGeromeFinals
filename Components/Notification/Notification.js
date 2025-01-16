import React from 'react';
import './Notification.css';

const Notification = ({ message, isVisible, isSuccess }) => {
  return (
    <div className={`notification ${isVisible ? 'show' : ''} ${isSuccess ? 'success' : 'error'}`}>
      <div className="notification-content">
        <div className="check-icon">{isSuccess ? '✓' : '✖'}</div>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Notification;
