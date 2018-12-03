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

class ListMenu extends React.Component {
  constructor(props) {
    super(props);
    const filteredList = props.filter
      ? props.list.filter(props.filter)
      : props.list;
    this.state = {
      filteredList,
      filterConfig: {
        showAll: false,
        searchBy: "",
      },
    };
  }

  componentWillReceiveProps = nextProps => {
    if (!isEqual(nextProps.list, this.props.list)) {
      this.setState({
        filteredList: nextProps.list.filter(this.getListFilter()),
      });
    }
  };

  getListFilter = () => item =>
    (this.shouldApplyPropFilter() ? this.props.filter(item) : true) &&
    this.itemIncludesSearchString(item);

  handleSearchByUpdate = text => {
    this.setState(
      ({ filterConfig }) => ({
        filterConfig: {
          ...filterConfig,
          searchBy: text.toLowerCase(),
        },
      }),
      this.applyFilter,
    );
  };

  handleShowAllToggle = () => {
    this.setState(
      ({ filterConfig }) => ({
        filterConfig: {
          ...filterConfig,
          showAll: !filterConfig.showAll,
        },
      }),
      this.applyFilter,
    );
  };

  onSelectItem = (value, data) =>
    value && this.props.onItemSelected && this.props.onItemUnSelected
      ? this.props.onItemSelected(data)
      : this.props.onItemUnSelected(data);

  shouldApplyPropFilter = () =>
    !this.state.filterConfig.showAll && this.props.filter;

  applyFilter = () => {
    const { list } = this.props;
    this.setState({
      filteredList: list.filter(this.getListFilter()),
    });
  };

  itemIncludesSearchString = item => {
    const { filterConfig } = this.state;
    return this.prepareSearchableString(item).includes(filterConfig.searchBy);
  };

  prepareSearchableString = item => {
    const { idKey } = this.props;
    const separator = "Ŗ";
    return [item.name]
      .concat(item[idKey])
      .concat(item.price)
      .concat(get(item, "type", ""))
      .concat(get(item, "subType", ""))
      .concat(JSON.stringify(item.metadata))
      .join(separator)
      .toLowerCase();
  };

  renderItem = (
    list,
    idKey,
    key,
    index,
    multiSelectable,
    selected,
    disabled,
    style,
    onCompound,
    compoundSelected,
  ) => {
    const item = list[index];
    const isSelected = find(selected, i => item[idKey] === i[idKey]) != null;
    const isCompounded =
      find(compoundSelected, i => item[idKey] === i[idKey]) != null;
    return (
      <ActivoItem
        key={key}
        data={item}
        idKey={idKey}
        onSelect={disabled ? null : this.onSelectItem}
        isSelected={isSelected}
        isCompounded={isCompounded}
        style={style}
        onCompound={onCompound}
      />
    );
  };

  render = () => {
    const { filteredList, filterConfig } = this.state;
    const {
      name,
      idKey,
      disabled = false,
      multiSelectable,
      selected,
      height,
      filter,
      onCompound,
      compoundSelected,
    } = this.props;

    return (
      <Grid container>
        <Grid container style={{ padding: "1%" }}>
          <Grid item xs={4}>
            <p>{name}</p>
          </Grid>
          {filter && (
            <Grid item xs={4}>
              <FormControlLabel
                control={(
<Checkbox
  type="checkbox"
                    checked={filterConfig.showAll}
  onClick={this.handleShowAllToggle}
                  />
)}
                label={translateKey("showAll")}
              />
            </Grid>
          )}

          <Grid item xs={filter ? 4 : 8}>
            <SearchInput onChange={v => this.handleSearchByUpdate(v)} />
          </Grid>
        </Grid>
        <Divisor />
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
                      idKey,
                      key,
                      index,
                      multiSelectable,
                      selected,
                      disabled,
                      style,
                      onCompound,
                      compoundSelected,
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

ListMenu.propTypes = {
  compoundSelected: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired,
  filter: PropTypes.any.isRequired,
  height: PropTypes.any.isRequired,
  idKey: PropTypes.any.isRequired,
  list: PropTypes.array.isRequired,
  multiSelectable: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onCompound: PropTypes.func.isRequired,
  onItemSelected: PropTypes.func.isRequired,
  onItemUnSelected: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
};

export default ListMenu;
