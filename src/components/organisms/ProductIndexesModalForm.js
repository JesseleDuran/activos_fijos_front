import React from "react";
import styled from "styled-components";
import isEqual from "lodash/isEqual";
import get from "lodash/get";
import translate, { translateKey } from "utils/translate";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Icon from "@material-ui/core/Icon/Icon";
import * as PropTypes from "prop-types";
import Divisor from "../atoms/Divisor";
import ListMenu from "./ListMenu";
import RelationItem from "../molecules/RelationItem";
import { findRappiItem } from "../../utils/functions";
import ModalPaper from "../molecules/ModalPaper";
import ModalTitle from "../atoms/ModalTitle";
import PaddedGrid from "../molecules/PaddedGrid";
import ModalButtonsRow from "../atoms/ModalButtonsRow";
import PrimaryButton from "../molecules/PrimaryButton";
import Button from "../molecules/Button";

const SelectedItems = styled(Grid)`
  margin-top: 20px;
  background: #fafafa;
  border-radius: 3px;
  height: 300px;
  overflow-y: auto;
  padding: 10px;
`;

const styles = theme => ({
  width: theme.spacing.unit * 50,
  padding: theme.spacing.unit * 4,
});

class ProductIndexesModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      indexes: [],
      items: [],
    };
  }

  componentWillReceiveProps = nextProps => {
    const indexes = get(nextProps, "item.indexes", []);
    const indexedItems = indexes
      .map(findRappiItem)
      .map(i => (i != null ? i : { sku: "comp", name: "compuesto" }));
    const items = [...nextProps.rappiItems, ...nextProps.simulatedItems];
    this.setState({
      indexes: indexedItems,
      items: !indexes.length
        ? items
        : items.filter(item => !indexes.includes(item.sku)),
      selected: [],
    });
  };

  handleItemSelected = item => {
    this.setState(prevState => ({
      selected: [...prevState.selected, item],
    }));
  };

  handleItemUnSelected = item => {
    this.setState(prevState => ({
      selected: prevState.selected.filter(i => !isEqual(i, item)),
    }));
  };

  handleAddItems = () => {
    const { selected, indexes, items } = this.state;
    const newIndexes = [...indexes, ...selected];
    this.setState({
      indexes: newIndexes,
      selected: [],
      items: this.getUnselectedIndexes(items, newIndexes),
    });
  };

  handleRemoveIndex = item => {
    this.setState(state => {
      const indexes = state.indexes.filter(i => !isEqual(i, item));
      const items = [...this.props.rappiItems, ...this.props.simulatedItems];
      return {
        indexes,
        items: this.getUnselectedIndexes(items, indexes),
      };
    });
  };

  getUnselectedIndexes = (items, indexed) =>
    items.filter(i => !indexed.includes(i));

  handleSave = () => {
    const indexes = this.state.indexes.map(i => i.sku);
    this.props.onSubmit({ ...this.props.item, indexes });
    this.props.onClose();
  };

  render() {
    const { classes, onClose, item } = this.props;
    const { selected, indexes, items } = this.state;
    return item ? (
      <Modal
        open={this.props.open}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <ModalPaper height="520px" className={classes.paper}>
          <Grid container className={classes.container}>
            <ModalTitle>
              {`${translateKey("editIndexes")} - ${item.name}`}
            </ModalTitle>
            <Divisor />
            <PaddedGrid
              item
              xs={6}
              justify="flex-start"
              alignContent="flex-start"
              container
            >
              <ListMenu
                list={items}
                selected={selected}
                height="270px"
                idKey="sku"
                onItemSelected={this.handleItemSelected}
                onItemUnSelected={this.handleItemUnSelected}
              />
            </PaddedGrid>
            <Grid item xs={1} justify="center" alignItems="center" container>
              <IconButton
                onClick={this.handleAddItems}
                disabled={!this.state.selected.length}
                style={{ width: "80px", height: "80px" }}
                color="secondary"
              >
                <Icon style={{ fontSize: "70px" }}>forward</Icon>
              </IconButton>
            </Grid>
            <PaddedGrid item xs={5} container>
              <Grid item xs={12}>
                {translate("indexedRappiProducts")}
              </Grid>
              <SelectedItems item xs={12}>
                {indexes.map(item => (
                  <RelationItem
                    data={item}
                    onClickDelete={() => this.handleRemoveIndex(item)}
                    key={item.id}
                  />
                ))}
              </SelectedItems>
            </PaddedGrid>

            <ModalButtonsRow item xs={12} container>
              <Button onClick={onClose}>{translate("cancel")}</Button>
              <PrimaryButton onClick={this.handleSave}>
                {translate("save")}
              </PrimaryButton>
            </ModalButtonsRow>
          </Grid>
        </ModalPaper>
      </Modal>
    ) : null;
  }
}

ProductIndexesModalForm.propTypes = {
  classes: PropTypes.any.isRequired,
  item: PropTypes.any.isRequired,
  onAdd: PropTypes.any.isRequired,
  onClose: PropTypes.any.isRequired,
  open: PropTypes.any.isRequired,
  rappiItems: PropTypes.any.isRequired,
  simulatedItems: PropTypes.any.isRequired,
};

export default withStyles(styles)(ProductIndexesModalForm);
