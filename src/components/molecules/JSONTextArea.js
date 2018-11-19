import React from "react";
import { InputLabel } from "@material-ui/core";
import JSONInput from "react-json-editor-ajrm";
import styled from "styled-components";

const Container = styled.div`
  padding-top: 5px;
`;

class JSONTextArea extends React.Component {
  state = {
    focused: false,
  };

  handleFocus = () => {
    this.setState({ focused: true });
  };

  handleBlur = () => {
    this.setState({ focused: false });
  };

  render() {
    const { label, ...jsonInputProps } = this.props;
    return [
      <InputLabel key="label" shrink focused={this.state.focused}>
        {label}
      </InputLabel>,
      <Container
        key="jsonContainer"
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <JSONInput key="jsonInput" {...jsonInputProps} />
      </Container>,
    ];
  }
}

export default JSONTextArea;
