import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import { confirmable } from "react-confirm";

@confirmable
class ConfirmationDialog extends React.Component {
    render = () => {
        const {
            show,
            proceed,
            cancel,
            confirmation,
        } = this.props;

        return (
            <Dialog
                open={show}
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                aria-labelledby="confirmation-dialog-title"
            >
                <DialogTitle id="confirmation-dialog-title">
                    ¿Estas Seguro?
                </DialogTitle>
                <DialogContent>{confirmation}</DialogContent>
                <DialogActions>
                    <Button onClick={cancel} color="primary">
                        No
                    </Button>
                    <Button onClick={proceed} color="primary">
                        Si
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };
}

export default ConfirmationDialog;
