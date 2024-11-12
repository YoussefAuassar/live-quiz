import React from 'react';
import '../styles/Button.css';

function Button({ label }) {
  return (
    <button className="quiz-button">
      {label}
    </button>
  );
}

export default Button;
