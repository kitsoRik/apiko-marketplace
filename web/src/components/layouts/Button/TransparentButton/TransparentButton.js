import React from 'react';

import "./TransparentButton.scss";

const TransparentButton = ({ className, value, disabled = false, darkMode = null, ...props }) => {
  return (
    <button
      className={`button-transparent ${className ?? ""}`}
      disabled={disabled ? "true" : null}
      dark-mode={darkMode ? "true" : null}
      {...props}>
      {value}
    </button>
  )
};

export default TransparentButton;