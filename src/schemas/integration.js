import { schema } from "normalizr";

export const integrationSchema = new schema.Entity(
  "integrations",
  {},
  { idAttribute: "id" },
);
