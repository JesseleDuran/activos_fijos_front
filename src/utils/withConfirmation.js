import React from "react";
import { confirmAlert } from "react-confirm-alert";
import ConfirmationDialog from "../components/molecules/ConfirmationDialog";
import { translateKey } from "./translate";

export const withConfirmation = (targetFn, options = {}) => (...args) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      const handleCancel = () => {
        onClose();
      };
      const handleOk = () => {
        targetFn(...args);
        onClose();
      };

      const { okCaption, title, content } = options;

      return (
        <ConfirmationDialog
          onOk={handleOk}
          onCancel={handleCancel}
          okCaption={okCaption || translateKey("defaultConfirmDialog.ok")}
          title={title || translateKey("defaultConfirmDialog.title")}
          content={content || translateKey("defaultConfirmDialog.content")}
        />
      );
    },
  });
};
