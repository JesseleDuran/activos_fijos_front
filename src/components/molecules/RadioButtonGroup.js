import React from "react";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";

const RadioButtonGroup = ({
  selected,
  options,
  onChange,
  disabled = false,
}) => {
  const renderOption = (option, index) => (
    <FormControlLabel
      key={index}
      value={option.value}
      control={<Radio />}
      label={option.label}
      disabled={disabled || option.disabled}
    />
  );

  return (
    <RadioGroup value={selected} onChange={e => onChange(e.target.value)}>
      {options.map(renderOption)}
    </RadioGroup>
  );
};

export default RadioButtonGroup;
