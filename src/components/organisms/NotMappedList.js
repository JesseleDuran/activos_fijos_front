import React from "react";
import translate from "utils/translate";
import styled from "styled-components";

const Item = styled.p`
  margin: 0;
  margin-bottom: 2px;
  color: white;
`;

const Title = styled.h3`
  margin: 0;
  margin-bottom: 2px;
  color: white;
`;

const NotMappedList = ({ items }) => (
  <div>
    <Title>{translate("notMappedItems")}</Title>
    {items.map(item => (
      <Item>
        {item.sku} -
{item.name}
      </Item>
    ))}
  </div>
);

export default NotMappedList;
