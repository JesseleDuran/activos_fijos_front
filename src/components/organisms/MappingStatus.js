import React from "react";
import { mappingStatus } from "../../constants";

const statusColors = {
  [mappingStatus.ACTIVE]: "green",
  [mappingStatus.DELETED]: "red",
  [mappingStatus.ARCHIVED]: "grey",
};

const MappingStatus = ({ mapping }) => (
  <span
    style={{
      fontWeight: 600,
      fontSize: "14px",
      color: statusColors[mapping.status] || "black",
    }}
  >
    {mapping.status}
  </span>
);

export default MappingStatus;
