import styled from "styled-components";

const UnPaddingCard = styled.div`
  width: 100%;
  heigth: auto;
  background: white;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.p`
  font-size: 18px;
  padding: 15px 15px 0;
`;

export const Container = styled.div`
  width: 100%;
  padding: 2%;
  margin-top: 10px;
`;

export default UnPaddingCard;
