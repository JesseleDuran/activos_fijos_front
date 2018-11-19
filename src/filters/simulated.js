import { itemStatus } from "../constants";

export default item => item.real === false && item.status === itemStatus.ACTIVE;
