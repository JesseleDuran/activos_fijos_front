import unionBy from "lodash/unionBy";

export const deleteHandler = (items, itemsToDelete) =>
	items.filter(i => !itemsToDelete.includes(i));

export const updateHandler = (items, itemsToUpdate, filter) => [
	...unionBy(itemsToUpdate, items, "id").filter(filter),
];

export const addHandler = (items, filter) => items.filter(filter);
