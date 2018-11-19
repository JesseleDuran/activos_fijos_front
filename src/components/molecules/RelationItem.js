import React from "react";
import Icon from "@material-ui/core/Icon";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";

const Text = styled.p`
  margin: 0;
  font-size: 13px;
`;

const ClickableButton = styled(Icon)`
  cursor: pointer;
  font-size: 20px;
`;

const Row = styled(Grid)`
  font-size: 20px;
  display: flex;
  padding: 2px;
  align-items: center;
`;

const RelationItem = ({ data, onClickDelete, deleteEnabled = true }) => {
  const text = `${data.sku} · ${data.name}${
    data.related ? ` ↠ ${data.related}` : ""
  }`;
  return (
    <Grid container onClick={this.changeClicked} style={{ padding: "1%" }}>
      <Row container>
        {deleteEnabled && (
          <Grid item xs={1} style={{ display: "flex" }}>
            <ClickableButton
              fontSize="inherit"
              color="action"
              onClick={() => onClickDelete(data)}
            >
              delete
            </ClickableButton>
          </Grid>
        )}
        <Grid item xs={11}>
          <Text>{text}</Text>
        </Grid>
      </Row>
    </Grid>
  );
};

export default RelationItem;
