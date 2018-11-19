import React from "react";
import Button from "Button";

const PrimaryButton = ({ children, ...otherProps }) => (
  <Button {...otherProps} variant="contained">
    {children}
  </Button>
);

export default PrimaryButton;
