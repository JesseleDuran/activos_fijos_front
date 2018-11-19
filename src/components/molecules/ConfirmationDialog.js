import React from "react";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "Button";
import { translateKey } from "../../utils/translate";

class ConfirmationDialog extends React.Component {
  state = {
    open: true,
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { handleClose, open } = this.state;
    const {
      fullScreen,
      onCancel,
      onOk,
      title,
      content,
      okCaption,
    } = this.props;
    const handleCancel = () => {
      onCancel();
      this.handleClose();
    };
    const handleOk = () => {
      onOk();
      this.handleClose();
    };

    return (
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {onCancel && (
            <Button onClick={handleCancel} color="primary">
              {translateKey("cancel")}
            </Button>
          )}
          <Button onClick={handleOk} color="primary" autoFocus>
            {okCaption || "Ok"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ConfirmationDialog;
