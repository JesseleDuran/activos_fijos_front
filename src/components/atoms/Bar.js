import React from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";

const Bar = styled.div`
	width: 100%;
  	height: 30px;
  	z-index: 10;
  	background: ${props => props.background};
  	display: flex;
  	align-items: center;
  	justify-content: center;
`;

const Logo = styled.img`
  	width: 50px;
  	height: 50%;
`;

const BarContainer = props => (
    <Bar {...props} background={props.theme.palette.primary.main}/>
);

export default withTheme()(BarContainer);
