import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const PageTitle = ({ title }) => (
  <Grid item xs={12} style={{ margin: "1%" }}>
    <Typography variant="headline" style={{ width: "100%" }}>
      {title}
    </Typography>
  </Grid>
);

export default PageTitle;
