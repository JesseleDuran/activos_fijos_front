import React from "react";
import Grid from "@material-ui/core/Grid";

const ViewPager = ({ children, page, style }) => <Grid container style={style}>{children[page]}</Grid>;

export default ViewPager;
