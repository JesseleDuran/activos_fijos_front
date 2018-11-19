import _ from "lodash";

export const applyStyle = (style, val) => (val ? `${style}:${val}` : "");

// Receives a collection of props and see if any of them
// matches the theme attrs in the specified route
//
// Usefull when trying to match the color in the props of a component
// to the colors in the theme
export const getMatchingProp = (route, props, fallback = "") => {
  const keys = _.keys(props.theme[route]);
  const matchingProp = _.find(_.keys(props), prop => keys.includes(prop));
  return props.theme[route][matchingProp] || fallback;
};
