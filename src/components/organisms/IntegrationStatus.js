import React from "react";
import { integrationStatus, mappingStatus } from "../../constants";

const IntegrationStatus = ({ integration }) => (
  // TODO create a generic component to handle entities status
  <span
    style={{
      fontWeight: 600,
      fontSize: "14px",
      color: integration.status === integrationStatus.ACTIVE ? "green" : "red",
    }}
  >
    {integration.status}
  </span>
);

export default IntegrationStatus;
