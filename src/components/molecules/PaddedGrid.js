import styled from "styled-components";
import Grid from "@material-ui/core/Grid/Grid";

const DEFAULT_PADDING = "15px";

const PaddedGrid = styled(Grid)`
  padding: ${({ padding = DEFAULT_PADDING }) => padding};
`;

export default PaddedGrid;
