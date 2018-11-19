import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ActivosPage from "../components/pages/ActivosPage";

import Page from "../hocs/Page";

@Page({ title: "Activos" })
class ActivosContainer extends Component {
  render = () => {
    return <ActivosPage />;
  };
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {},
)(withRouter(ActivosContainer));
