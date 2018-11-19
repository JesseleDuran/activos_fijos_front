import React from "react";
import styled from "styled-components";
import isEqual from "lodash/isEqual";
import translate from "utils/translate";
import Modal from "@material-ui/core/Modal";
import Divisor from "Divisor";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import Button from "Button";
import PrimaryButton from "PrimaryButton";
import ModalPaper from "../molecules/ModalPaper";
import ModalTitle from "../atoms/ModalTitle";
import PaddedGrid from "../molecules/PaddedGrid";
import ModalButtonsRow from "../atoms/ModalButtonsRow";

const FormRow = styled(Grid)`
  &:not(:last-child) {
    padding-bottom: 20px;
  }

  & > * {
    width: 100%;
  }
`;

const styles = theme => ({
  width: theme.spacing.unit * 50,
  padding: theme.spacing.unit * 4,
});

const requiredFields = ["name", "cookingTime"];

class StoreModalForm extends React.Component {
  initialState = {
    item: {
      id: "",
      name: "",
      cookingTime: "",
    },
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  componentWillReceiveProps = nextProps => {
    if (this.hasNewEditableStore(nextProps)) {
      this.setState(this.getNewState(nextProps));
    }
  };

  hasNewEditableStore = nextProps => !isEqual(nextProps.item, this.state.item);

  getNewState = nextProps =>
    nextProps.item ? { item: nextProps.item } : this.initialState;

  getFieldProps = field => ({
    value: this.state.item[field],
    label: this.getFieldLabelTranslation(field),
    onChange: this.createChangeHandler(field),
  });

  getFieldLabelTranslation = field => translate(`storesManager.form.${field}`);

  createChangeHandler = name => event => {
    const { item } = this.state;

    const updatedItem = { ...item, [name]: event.target.value };

    this.setState({
      item: updatedItem,
      isValidItem: this.isValid(updatedItem),
    });
  };

  handleSend = () => {
    this.props.onAddOrUpdate(this.state.item);
    this.props.onClose();
  };

  shouldDisableSendButton() {
    return !this.state.isValidItem;
  }

  isValid(item) {
    const fieldIsValid = field => item[field] && item[field].toString().length;
    return requiredFields.every(fieldIsValid);
  }

  render() {
    const { classes, onClose, item } = this.props;
    const isEdition = Boolean(item && item.id);

    return (
      <Modal
        open={this.props.open}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <ModalPaper height="350px" width="400px" className={classes.paper}>
          <Grid container className={classes.container}>
            <ModalTitle>
              {translate(
                `storesManager.${
                  isEdition ? "modalEditTitle" : "modalAddTitle"
                }`,
              )}
            </ModalTitle>
            <Divisor />
            <PaddedGrid
              item
              xs={12}
              justify="flex-start"
              alignContent="flex-start"
              container
            >
              <FormRow item xs={12} justify="flex-start" container>
                <TextField disabled={isEdition} {...this.getFieldProps("id")} />
              </FormRow>

              <FormRow item xs={12} justify="flex-start" container>
                <TextField {...this.getFieldProps("name")} />
              </FormRow>
              <FormRow item xs={12} justify="flex-start" container>
                <TextField {...this.getFieldProps("cookingTime")} />
              </FormRow>
            </PaddedGrid>

            <ModalButtonsRow item xs={12} container>
              <Button onClick={onClose}>{translate("cancel")}</Button>
              <PrimaryButton
                onClick={this.handleSend}
                disabled={this.shouldDisableSendButton()}
                debounce
              >
                {translate("save")}
              </PrimaryButton>
            </ModalButtonsRow>
          </Grid>
        </ModalPaper>
      </Modal>
    );
  }
}

export default withStyles(styles)(StoreModalForm);
