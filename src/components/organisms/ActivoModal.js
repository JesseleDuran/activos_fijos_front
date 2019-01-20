import React from "react";
import ActivosForm from "./ActivosForm";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ActivoModal extends React.Component {
    state = {};

    render() {
        const {
            activo,
            open,
            close
        } = this.props;
        return (
            <Dialog
                open={open}
                onClose={close}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Activo #"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Let Google help apps determine location. This means sending anonymous location data to
                    Google, even when no apps are running.
                    </DialogContentText>
                        {activo &&
                            <ActivosForm
                                activo={activo}
                                clasificaciones={[activo.clasificacion]}
                                marcas={[activo.marca]}
                                ubicaciones={[{ desubifis: activo.desubifis, codubifis: activo.desubifis }]}
                                disabled
                            />
                        }
                </DialogContent>
                <DialogActions>
                    <Button onClick={close} color="primary" autoFocus>
                    Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default ActivoModal;
