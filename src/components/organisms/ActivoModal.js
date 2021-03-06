import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ActivosTabs from './ActivosTabs'

class ActivoModal extends React.Component {
    state = {};

    render() {
        const {
            activo,
            open,
            close,
            onChange,
            update,
            hasChanged, 
            clasificaciones,
            marcas,
            downloadCartaDeAsignacion
        } = this.props;
        return (
            <Dialog
                fullScreen
                open={open}
                onClose={close}
                aria-labelledby="responsive-dialog-title"
            >
                {activo &&
                    <DialogTitle id="responsive-dialog-title">{`Activo N° ${activo.n_activo}`}</DialogTitle>
                }
                <DialogContent>
                    <DialogContentText>
                        <ActivosTabs
                            activo={activo}
                            onChange={onChange}
                            clasificaciones={clasificaciones}
                            marcas={marcas}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={downloadCartaDeAsignacion} color="primary" autoFocus>
                        Imprimir acta de asignación
                    </Button>
                    <Button onClick={close} color="primary" autoFocus>
                        Cerrar
                    </Button>
                    <Button disabled={hasChanged} onClick={update} ariant="contained" color="primary" autoFocus>
                        Actualizar
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default ActivoModal;
