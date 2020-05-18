import React from 'react';

import "./TransparentButton.scss";
import AsComponent from 'react-as-component';
import { Link } from 'react-router-dom';

const TransparentButton = ({ asLink = false, className, value, disabled = false, darkMode = null, ...props }) => {
  return (
    <AsComponent
      as={asLink ? Link : "button"}
      className={`button-transparent ${className ?? ""}`}
      disabled={disabled}
      dark-mode={darkMode ? "true" : null}
      {...props}>
      {value}
    </AsComponent>
  )
};

export default TransparentButton;