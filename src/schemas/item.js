import { schema } from "normalizr";

const item = new schema.Entity("items", {}, { idAttribute: "sku" });

export default item;
