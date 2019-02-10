import React from "react";
import SearchInput from "../molecules/SearchInput";
import Grid from "@material-ui/core/Grid/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import styled from "styled-components";
import { AutoSizer, List } from "react-virtualized";
import ChoppedText from "../atoms/ChoppedText";

const ListContainer = styled.div`
  width:100%;
  height: ${props => props.height};
  max-height: ${props => props.height};
  overflow-y: auto;
`;


class OrdenesSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filtered: props.ordenes,
            selected: null,
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.state.filtered.length === 0)
            this.setState({ filtered: nextProps.ordenes });
    }

    prepareSearchableString = item => {
        const separator = "Ŗ";
        return [item.obscom]
            .concat(item.orden_compra)
            .concat(item.numero_factura)
            .concat(item.unidades)
            .concat(item.descripcion_activo)
            .concat(item.nombre_proveedor)
            .concat(item.condicion_pago)
            .concat(item.centro_costo)
            .concat(item.fecha_compra)
            .join(separator)
            .toLowerCase();
    };

    search = searchText => {
        const { ordenes } = this.props;
        const filtered = ordenes.filter(this.orderFilter(searchText));
        this.setState({ filtered });
    };

    orderFilter = searchText => {
        return item => this.prepareSearchableString(item).includes(searchText.toLowerCase());
    };

    onSelect = selected => {
        console.log(selected);
        const { onSelect, activo } = this.props;
        onSelect((activo.numero_orden_compra === selected.orden_compra && activo.numero_factura === selected.numero_factura && activo.codigo_articulo === selected.codigo_articulo) ? null : selected);
    };

    render = () => {
        const { activo } = this.props;
        const { filtered } = this.state;
        return <Grid container>
            <Grid item style={{ height: "60px" }}>
                <SearchInput onChange={this.search}/>
            </Grid>
            <ListContainer height={"55vh"}>
                <AutoSizer rowCount={filtered.length}>
                    {({ width, height }) => (
                        <List
                            width={width}
                            height={height}
                            rowHeight={50}
                            rowCount={filtered.length}
                            rowRenderer={({ key, index, style }) => {
                                return <Grid key={key} style={style} container title={filtered[index].obscom}>
                                    <Grid item xs={11} style={{ alignSelf: "center" }}>
                                        <ChoppedText text={`${filtered[index].orden_compra} - ${filtered[index].numero_factura} - ${filtered[index].unidades} unidades de ${filtered[index].descripcion_activo}`} length={200}/>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Checkbox
                                            type="checkbox"
                                            onClick={() => this.onSelect(filtered[index])}
                                            checked={activo.numero_orden_compra === filtered[index].orden_compra && activo.numero_factura === filtered[index].numero_factura && activo.codigo_articulo === filtered[index].codigo_articulo}/>
                                    </Grid>
                                </Grid>;
                            }
                            }
                        />
                    )}
                </AutoSizer>
            </ListContainer>

        </Grid>;

    };
}

export default OrdenesSelector;
