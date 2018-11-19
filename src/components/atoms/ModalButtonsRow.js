import styled from "styled-components";
import PaddedGrid from "../molecules/PaddedGrid";

const ModalButtonsRow = styled(PaddedGrid)`
  align-items: flex-end;
  justify-content: flex-end;
  padding-bottom: 10px;

  & > button {
    margin-right: 5px;
  }

  & > button:last-child {
    margin-right: 0;
  }
`;

export default ModalButtonsRow;
