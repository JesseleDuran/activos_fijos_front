import React from "react";
import Button from "@material-ui/core/Button";
import debounceCall from "debounce-promise";

const WAIT_DEFAULT_DEBOUNCE = 500;

const ButtonComponent = ({
  	children,
  	onClick,
  	debounce,
  	wait = WAIT_DEFAULT_DEBOUNCE,
  	...otherProps
}) => (
  	<Button
    	{...otherProps}
    	color="primary"
    	waves="light"
    	onClick={debounce ? debounceCall(onClick, wait) : onClick}
  	>
    	{children}
  	</Button>
);

export default ButtonComponent;
