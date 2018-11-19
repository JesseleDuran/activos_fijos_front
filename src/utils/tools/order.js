import groupBy from "lodash/groupBy";
import map from "lodash/map";

export const generateOrdersByItem = (item, storeId) => {
  const { exclusive, inclusive } = item;
  let orders = [];
  if (exclusive.length > 0) {
    const group = groupBy(exclusive, "metadata.toppingCategoryId");
    const exclusiveGroups = pseudoCartesian(map(group, g => g));
    orders = exclusiveGroups.map(exclusiveGroup =>
      generateOrderWith(item, exclusiveGroup, inclusive, storeId),
    );
  } else {
    orders.push(generateOrderWith(item, null, inclusive, storeId));
  }
  return orders;
};

export const pseudoCartesian = arrays => {
  const longest = findLongestArrayIndex(arrays);
  const results = [];
  for (let i = 0; i < arrays[longest].length; i++) {
    const combination = [arrays[longest][i]];
    for (let j = 0; j < arrays.length; j++)
      if (j !== longest) combination.push(findAtPosition(arrays[j], i));
    results.push(combination);
  }
  return results;
};

const findAtPosition = (toppings, index) => {
  return toppings[index] ? toppings[index] : toppings[0];
};

const findLongestArrayIndex = arrays => {
  return arrays.reduce(
    (longest, arry, index) => {
      return longest.arry.length < arry.length ? { arry, index } : longest;
    },
    { arry: [], index: -1 },
  ).index;
};

export const generateOrderWith = (
  item,
  exclusiveGroup,
  inclusiveItems,
  storeId,
) => {
  const product = {
    name: item.name,
    id: Number(item.sku),
    totalPrice: Number(item.price),
    unitPrice: Number(item.price),
    comments: "Test Comment",
    units: 1,
    toppings: exclusiveGroup
      ? generateToppings([...exclusiveGroup, ...inclusiveItems])
      : generateToppings(inclusiveItems),
  };
  const products = [product];
  return {
    id: Math.floor(Math.random() * 500000000),
    userId: 141450437,
    products,
    totalValue: Number(item.price),
    totalPrice: Number(item.price),
    storeId,
  };
};

export const generateToppings = toppings => {
  return toppings.map(topping => ({
    id: Number(topping.sku),
    price: Number(topping.price),
    description: topping.name,
    units: 1,
    index: 1,
    toppingCategoryId: Number(topping.metadata.toppingCategoryId),
    categoryIndex: 0,
  }));
};
