import React from "react";
import styled from "styled-components";
import { DotLoader } from "react-spinners";
import Grid from "@material-ui/core/Grid";
import translate from "utils/translate";
import PageTitle from "PageTitle";

const Container = styled.div`
  	position: fixed;
 	padding-left: 50%;
 	padding-top: 15%;
  	z-index: 2;
  	width: 100%;
  	height: 100%;
  	background: #fafafac7;
`;

const PageLoader = ({ active }) =>
  	active ? (
    <Container>
      	<Grid container>
        	<Grid item xs={12}>
          		<DotLoader color="#16B497" loading size={180} />
        	</Grid>
        	<PageTitle title={translate("loading")} />
      	</Grid>
    </Container>
) : null;

export default PageLoader;
