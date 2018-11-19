import styled from "styled-components";
import Paper from "@material-ui/core/Paper/Paper";

const ModalPaper = styled(Paper)`
  top: calc((100vh - ${({ height }) => height}) / 2);
  bottom: calc((100vh - ${({ height }) => height}) / 2);
  margin: auto;
  width: ${({ width }) => width || "1000px"};
  position: relative;
  min-height: ${({ height }) => height};
  outline: none;
`;

export default ModalPaper;
