import React from "react";
import styled from "styled-components";
import isEqual from "lodash/isEqual";
import find from "lodash/find";
import get from "lodash/get";
import { List, AutoSizer } from "react-virtualized";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import * as PropTypes from "prop-types";
import { translateKey } from "../../utils/translate";
import Divisor from "../atoms/Divisor";
import ActivoItem from "../molecules/ActivoItem";
import SearchInput from "../molecules/SearchInput";

const ListContainer = styled.div`
  padding: 1%;
  height: ${props => props.height};
  max-height: ${props => props.height};
  overflow-y: auto;
`;

class ActivosSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredList: props.activos,
        };
    }

    componentWillReceiveProps = nextProps => {
        if (!isEqual(nextProps.activos, this.props.activos)) {
            this.setState({
                filteredList: nextProps.activos,
            });
        }
    };

    getListFilter = text => item => this.itemIncludesSearchString(text, item);


    onSelectItem = (value, data) =>
        value && this.props.onSelect && this.props.onUnSelect
            ? this.props.onSelect(data)
            : this.props.onUnSelect(data);


    applyFilter = text => {
        const { activos } = this.props;
        this.setState({
            filteredList: activos.filter(this.getListFilter(text)),
        });
    };

    itemIncludesSearchString = (text, item) => {
        return this.prepareSearchableString(item).includes(text.toLowerCase());
    };

    prepareSearchableString = item => {
        const separator = "Ŗ";
        return [item.modelo]
            .concat(item.marca)
            .concat(item.clasificacion)
            .concat(item.n_activo)
            .concat(item.descripcion)
            .join(separator)
            .toLowerCase();
    };

    renderItem = (
        list,
        key,
        index,
        multiSelectable,
        selected,
        disabled,
        style,
    ) => {
        const item = list[index];
        const isSelected = find(selected, i => item.n_activo === i.n_activo) != null;

        return (
            <ActivoItem
                key={key}
                data={item}
                onSelect={disabled ? null : this.onSelectItem}
                isSelected={isSelected}
                style={style}
            />
        );
    };

    render = () => {
        const { filteredList } = this.state;
        const {
            disabled = false,
            multiple,
            selected,
            height = "50vh",
        } = this.props;

        return (
            <Grid container>
                <Grid container style={{ padding: "1%" }}>
                    <Grid item xs={4}>
                        <p>Seleccionar Activos</p>
                    </Grid>
                    <Grid item xs={8}>
                        <SearchInput onChange={v => this.applyFilter(v)}/>
                    </Grid>
                </Grid>
                <Divisor/>
                <Grid item xs={12}>
                    <ListContainer height={height}>
                        <AutoSizer rowCount={filteredList.length}>
                            {({ width, height }) => (
                                <List
                                    width={width}
                                    height={height}
                                    rowHeight={45}
                                    rowCount={filteredList.length}
                                    rowRenderer={({ key, index, style }) =>
                                        this.renderItem(
                                            filteredList,
                                            key,
                                            index,
                                            multiple,
                                            selected,
                                            disabled,
                                            style,
                                        )
                                    }
                                />
                            )}
                        </AutoSizer>
                    </ListContainer>
                </Grid>
            </Grid>
        );
    };
}


export default ActivosSelector;
