import { itemStatus } from "../constants";

export default item => item.real && item.status === itemStatus.ACTIVE;
