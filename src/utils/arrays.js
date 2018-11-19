import { isEqual } from "lodash";

export const diff = (prev, curr) => curr.filter((v, i) => !isEqual(v, prev[i]));
