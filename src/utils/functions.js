import _ from "lodash";
import store from "store";

export const findRappiItem = id => {
  const state = store.getState();
  const rappiItems = { ...state.rappi.items };
  const simulated = [...state.simulated.items];
  if (rappiItems[id]) return rappiItems[id];

  const simulatedItem = _.find(simulated, item => item.sku === id);
  if (simulatedItem) return simulatedItem;

  for (const i in rappiItems) {
    const result = _.find(rappiItems[i].items, item => item.sku === id);
    if (result) return result;
  }
  return null;
};

export const findInItem = (id, item) =>
  _.find(item.items, item => item.sku === id);

export const findMappedItem = (id, items) => {
  let result = _.find(items, item => item.indexes.indexOf(id) !== -1);
  if (result) return result;

  for (let i = 0; i < items.length; i++) {
    result = _.find(items[i].items, item => item.indexes.indexOf(id) !== -1);
    if (result) return result;
  }

  return null;
};

export const getHostname = () => {
  const { port, protocol, hostname } = window.location;
  return `${protocol}//${hostname}${port ? `:${port}` : ""}`;
};

export const removeKeys = (obj, keysToRemove) => {
  const keys = Object.keys(obj).filter(key => keysToRemove.indexOf(key) === -1);
  const resultObj = {};
  keys.forEach(key => {
    try {
      resultObj[key] = JSON.parse(obj[key]);
    } catch (e) {
      resultObj[key] = obj[key];
    }
  });
  return resultObj;
};

export const removeEmptyKeys = obj => {
  if (!obj) return {};
  const keysToRemove = Object.keys(obj).filter(
    key => !obj[key] || obj[key] === "",
  );
  return removeKeys(obj, keysToRemove);
};

export const generateRelations = (relationList, indexes) => {
  const relations = { with: [], without: [], default: [] };
  if (relationList) {
    relationList.forEach(item => {
      const rappiItem = findRappiItem(item.value, indexes);
      if (rappiItem)
        relations[item.name]
          ? (relations[item.name] = [...relations[item.name], rappiItem])
          : (relations[item.name] = [rappiItem]);
    });
  }
  return relations;
};

export const generateIndexes = (indexes, rappiItems) =>
  indexes.map(index => findRappiItem(index, rappiItems)).filter(i => i);

export const getIntegrationOptions = integrations =>
  integrations.allIds.map(integration => ({
    label: integrations.byId[integration].brand,
    value: integrations.byId[integration].id,
  }));

export const getStoreOptions = stores =>
  stores.map(store => ({
    label: store.name,
    value: store,
  }));

/** Filter items of an array that fulfills a list of conditions
 *
 * Receives an array of objects with a shape of
 * { condition: Boolean[], value: [actual_value_of_the_option]}
 * and returns only the values of the objects where all its conditions
 * are truthy or doesn't have any condition
 *
 * @param optionsArray - Array of objects
 * @returns An array of the filtered values
 */
export const keepFulfilledValues = optionsArray =>
  optionsArray
    .filter(
      item => item.conditions === undefined || item.conditions.every(c => c),
    )
    .map(element => element.value);
