import React from "react";
import isEqual from "lodash/isEqual";
import translate from "utils/translate";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import * as PropTypes from "prop-types";
import Button from "../molecules/Button";
import Divisor from "../atoms/Divisor";
import RelationsBoxList from "./RelationsBoxList";
import {
  findRappiItem,
  generateIndexes,
  generateRelations,
} from "../../utils/functions";
import { translateKey } from "../../utils/translate";
import ListMenu from "./ListMenu";
import ModalPaper from "../molecules/ModalPaper";
import ModalTitle from "../atoms/ModalTitle";
import PaddedGrid from "../molecules/PaddedGrid";
import ModalButtonsRow from "../atoms/ModalButtonsRow";
import PrimaryButton from "../molecules/PrimaryButton";

const styles = theme => ({
  width: theme.spacing.unit * 50,
  padding: theme.spacing.unit * 4,
});

const baseRelations = {
  with: true,
  without: true,
  default: true,
};

class ProductRelationsModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      relations: this.getRelations(props),
    };
  }

  componentWillReceiveProps = nextProps => {
    this.setState(state => ({
      ...state,
      relations: this.getRelations(nextProps),
    }));
  };

  getRelations = props => {
    const { item, rappiItems } = props;
    if (!item) return baseRelations;
    const indexes = generateIndexes(item.indexes, rappiItems);
    return generateRelations(item.relations, [...indexes, ...rappiItems]);
  };

  onItemSelected = item => {
    this.setState(prevState => ({
      selected: [...prevState.selected, item],
    }));
  };

  onItemUnSelected = item => {
    this.setState(prevState => ({
      selected: prevState.selected.filter(i => !isEqual(i, item)),
    }));
  };

  onInclude = relationName => {
    const { relations } = this.state;
    if (!relations[relationName]) relations[relationName] = [];
    this.setState(state => ({
      selected: [],
      relations: {
        ...relations,
        [relationName]: [...relations[relationName], ...state.selected],
      },
    }));
  };

  onRemove = (data, relationName) => {
    const { relations } = this.state;
    this.setState({
      selected: [],
      relations: {
        ...relations,
        [relationName]: relations[relationName].filter(
          rel => rel.sku !== data.sku,
        ),
      },
    });
  };

  getPreparedRelations = () => {
    const { relations } = this.state;
    return Object.keys(relations).reduce(
      (acum, type) => [
        ...acum,
        ...relations[type].reduce(
          (a, v) => [...a, { name: type, value: v.sku }],
          [],
        ),
      ],
      [],
    );
  };

  handleSend = () => {
    this.props.onSubmit({
      ...this.props.item,
      relations: this.getPreparedRelations(),
    });
    this.setState({ selected: [], relations: baseRelations });
    this.props.onClose();
  };

  filterRappiItems = iteratedItem => {
    const { indexes = [] } = this.props.item;

    if (iteratedItem.real === false) return true;
    if (!indexes) return false;

    return indexes.some(id => {
      const subItem = findRappiItem(id) || {};
      return (subItem.items || []).find(i => i.sku === iteratedItem.sku);
    });
  };

  render() {
    const { classes, onClose, rappiItems, simulatedItems, item } = this.props;

    return item ? (
      <Modal
        open={this.props.open}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <ModalPaper height="680px" className={classes.paper}>
          <Grid container className={classes.container}>
            <ModalTitle>
              {`${translateKey("editRelations")} - ${item.name}`}
            </ModalTitle>
            <Divisor />
            <PaddedGrid
              item
              xs={8}
              justify="flex-start"
              alignContent="flex-start"
              container
            >
              <ListMenu
                list={[...rappiItems, ...simulatedItems]}
                selected={this.state.selected}
                height="170px"
                idKey="sku"
                onItemSelected={this.onItemSelected}
                onItemUnSelected={this.onItemUnSelected}
                filter={this.filterRappiItems}
              />
            </PaddedGrid>
            <PaddedGrid
              item
              xs={12}
              justify="flex-start"
              alignContent="flex-start"
              container
            >
              <RelationsBoxList
                relations={this.state.relations}
                includeEnabled={baseRelations}
                onInclude={this.onInclude}
                onRemove={this.onRemove}
              />
            </PaddedGrid>
            <ModalButtonsRow item xs={12} container>
              <Button onClick={onClose}>{translate("cancel")}</Button>
              <PrimaryButton onClick={this.handleSend}>
                {translate(item.id ? "editProduct" : "addProduct")}
              </PrimaryButton>
            </ModalButtonsRow>
          </Grid>
        </ModalPaper>
      </Modal>
    ) : null;
  }
}

ProductRelationsModalForm.propTypes = {
  classes: PropTypes.any.isRequired,
  item: PropTypes.any.isRequired,
  onAdd: PropTypes.any.isRequired,
  onClose: PropTypes.any.isRequired,
  open: PropTypes.any.isRequired,
  rappiItems: PropTypes.any.isRequired,
  simulatedItems: PropTypes.any.isRequired,
};

export default withStyles(styles)(ProductRelationsModalForm);
