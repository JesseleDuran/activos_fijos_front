import React from "react";
import { Route as OriginalRoute } from "react-router-dom";
import { merge } from "lodash";
import { parse } from "query-string";

const assignQueryString = props =>
  merge(props, {
    match: { query: parse(props.location.search, { arrayFormat: "index" }) },
  });

const render = (Component, props) =>
  Component && <Component {...assignQueryString(props)} />;

const Route = ({ path, ...rest }) => (
  <OriginalRoute
    path={path}
    render={props => render(rest.component || rest.render, props)}
    children={props => render(rest.children, props)}
  />
);

export default Route;
