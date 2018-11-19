import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import translate from "utils/translate";
import Divisor from "Divisor";
import RelationItem from "RelationItem";

const Title = styled.p`
  font-size: 16px;
  margin: 10px;
`;

const Container = styled.div`
  width: 100%;
  border: 1px #e5eaf0 solid;
`;

const ListContainer = styled.div`
  width: 100%;
  height: 15vh;
  max-height: 15vh;
  overflow-y: auto;
`;

const IncludeLink = styled.p`
  font-size: 14px;
  color: ${props => (props.includeEnabled ? "#16b497" : "#ECEFF5")};
  font-weight: 800;
  margin: 5px;
  cursor: ${props => (props.includeEnabled ? "pointer" : "default")};
`;

const RelationsBox = ({
  relationName,
  list,
  onInclude,
  onRemove,
  includeEnabled,
  deleteEnabled = true,
}) => (
  <Container>
    <Title>{relationName}</Title>
    <Divisor />
    <ListContainer>
      {renderList(list, relationName, onRemove, deleteEnabled)}
    </ListContainer>
    <Divisor />
    <IncludeLink
      includeEnabled={includeEnabled}
      onClick={() => (includeEnabled ? onInclude(relationName) : null)}
    >
      {translate("relations.include")}
    </IncludeLink>
  </Container>
);

const renderList = (list, relationName, onRemove, deleteEnabled) =>
  list.map((item, index) => (
    <RelationItem
      data={item}
      onClickDelete={data => onRemove(data, relationName)}
      deleteEnabled={deleteEnabled}
      key={index}
    />
  ));

export default RelationsBox;
