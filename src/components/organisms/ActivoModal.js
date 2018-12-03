import React from "react";

import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import ActivosForm from "./ActivosForm";


class ActivoModal extends React.Component {
    state = {};

    render() {
        const {
            activo,
            open,
        } = this.props;
        return (
            <Modal open={open}>
                <Paper>
                    {activo &&
                    <ActivosForm
                        activo={activo}
                        clasificaciones={[activo.clasificacion]}
                        marcas={[activo.marca]}
                        ubicaciones={[{ desubifis: activo.desubifis, codubifis: activo.desubifis }]}
                        disabled
                    />
                    }
                </Paper>
            </Modal>
        );
    }
}

export default ActivoModal;
