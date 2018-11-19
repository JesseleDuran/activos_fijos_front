import store from "store";
import { getAccessToken } from "../reducers/auth";
import { getApplicationBaseUrl } from "../reducers/application";

export const getToken = () => getAccessToken(store.getState());

export const getBaseUrl = () =>
  `${getApplicationBaseUrl(store.getState())}/api`;

export const mapIdsToValues = (ids, values, mutator = value => value) =>
  (ids || []).map(id => mutator(values[id]));

export const getOrdered = (reducer, mutator) =>
  mapIdsToValues(reducer.allIds, reducer.byId, mutator);

export const getNestedOrdered = (reducer, childReducer, ...fields) => {
  const mutator = value => {
    const mutated = {};
    for (const field of fields) {
      mutated[field] = childReducer.byId[value[field]];
    }
    return { ...value, ...mutated };
  };
  return getOrdered(reducer, mutator);
};

export const categorizeValuesByField = (values, field, limit) => {
  const categories = {};
  for (const value of values) {
    if (categories[value[field]] === undefined) {
      categories[value[field]] = [];
    }

    if (limit === undefined || categories[value[field]].length < limit) {
      categories[value[field]].push(value);
    }
  }
  return categories;
};
