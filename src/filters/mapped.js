import get from "lodash/get";
import { itemStatus } from "../constants";

export default item =>
  	get(item, "indexes", []).length > 0 &&
  	item.real &&
  	item.status === itemStatus.ACTIVE &&
  	(item.type === "combo" || item.type === "product");
