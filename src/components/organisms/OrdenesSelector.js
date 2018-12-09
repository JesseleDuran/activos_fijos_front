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
            .concat(item.forpagcom)
            .concat(item.fecaprord)
            .concat(item.fechentdesde)
            .concat(item.fechenthasta)
            .concat(item.cod_pro)
            .concat(item.forpagcom)
            .concat(item.montot)
            .concat(item.numordcom)
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
        const { onSelect, orden } = this.props;
        onSelect(orden === selected ? null : selected);
    };

    render = () => {
        const { orden } = this.props;
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
                                        <ChoppedText text={`${filtered[index].numordcom} - ${filtered[index].obscom}`} length={200}/>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Checkbox
                                            type="checkbox"
                                            onClick={() => this.onSelect(filtered[index].numordcom)}
                                            checked={orden === filtered[index].numordcom}/>
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
