import React from "react";
import RelationsBox from "RelationsBox";
import Grid from "@material-ui/core/Grid";

const RelationsBoxList = props => (
  <Grid container style={{ padding: "1%", flexWrap: "nowrap" }}>
    {renderBoxes(props)}
  </Grid>
);

const renderBoxes = props => {
  const {
    relations,
    onInclude,
    onRemove,
    includeEnabled,
    deleteEnabled = true,
  } = props;
  const keys = Object.keys(relations);
  return keys.map(key => (
    <Grid item xs={4} key={key} style={{ marginLeft: "5px" }}>
      <RelationsBox
        relationName={key}
        list={relations[key]}
        onInclude={onInclude}
        onRemove={onRemove}
        includeEnabled={includeEnabled[key]}
        deleteEnabled={deleteEnabled}
      />
    </Grid>
  ));
};

export default RelationsBoxList;
