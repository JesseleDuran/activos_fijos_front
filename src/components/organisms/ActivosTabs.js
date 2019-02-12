import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ActivosForm from "./ActivosForm";
import HistorialMovimientosList from "./HistorialMovimientosList"

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class ActivosTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { activo } = this.props;
        const { value } = this.state;

        return (
            <div>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange} centered>
                        <Tab label="Datos" />
                        <Tab label="Historial de Movimientos" />
                    </Tabs>
                </AppBar>
                {value === 0 && 
                <TabContainer>
                    {activo && <ActivosForm
                        activo={activo}
                        clasificaciones={[activo.clasificacion]}
                        marcas={[activo.marca]}
                        ubicaciones={[{ desubifis: activo.desubifis, codubifis: activo.desubifis }]}
                        disabled
                    />
                    }
                </TabContainer>}
                {value === 1 && <TabContainer>
                    {activo && <HistorialMovimientosList
                        movimientos={activo.movimientos}
                    />
                    }
                </TabContainer>}
            </div>
        );
    }
}

export default withStyles()(ActivosTabs);
