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

const requiredFields = ["brand", "entryPoint", "coreQueue"];

class IntegrationModalForm extends React.Component {
  initialState = {
    item: {
      id: "",
      brand: "",
      entryPoint: "",
      coreQueue: "",
      stores: [],
    },
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  componentWillReceiveProps = nextProps => {
    if (this.hasNewItem(nextProps)) {
      this.setState({ item: this.getNewItemState(nextProps) });
    }
  };

  hasNewItem = nextProps => !isEqual(nextProps.item, this.state.item);

  getNewItemState = nextProps => nextProps.item || this.initialState.item;

  static replaceNullFields = rawItem =>
    Object.keys(this.initialState.item).reduce(
      (item, key) => ({ ...item, [key]: rawItem[key] || "" }),
      {},
    );

  getFieldProps = field => ({
    value: this.state.item[field],
    label: this.getFieldLabelTranslation(field),
    onChange: this.createChangeHandler(field),
  });

  getFieldLabelTranslation = field =>
    translate(`integrationsManager.form.${field}`);

  createChangeHandler = name => event => {
    const updatedItem = { ...this.state.item, [name]: event.target.value };
    this.setState({
      item: updatedItem,
      isValidItem: this.isValid(updatedItem),
    });
  };

  shouldDisableSendButton() {
    return !this.state.isValidItem;
  }

  handleSend = () => {
    this.props.onAddOrUpdate(this.state.item);
    this.props.onClose();
  };

  isValid(item) {
    const fieldIsValid = field => item[field] && item[field].length > 0;
    return requiredFields.every(fieldIsValid);
  }

  render() {
    const { classes, onClose } = this.props;
    const { item } = this.state;
    return (
      <Modal
        open={this.props.open}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <ModalPaper height="350px" width="400px" className={classes.paper}>
          <Grid container className={classes.container}>
            <ModalTitle>
              {translate(
                `integrationsManager.${
                  item.id ? "modalEditTitle" : "modalAddTitle"
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
              {item.id && (
                <FormRow item xs={12} justify="flex-start" container>
                  <TextField {...this.getFieldProps("id")} disabled />
                </FormRow>
              )}
              <FormRow item xs={12} justify="flex-start" container>
                <TextField {...this.getFieldProps("brand")} />
              </FormRow>
              <FormRow item xs={12} justify="flex-start" container>
                <TextField {...this.getFieldProps("entryPoint")} />
              </FormRow>
              <FormRow item xs={12} justify="flex-start" container>
                <TextField {...this.getFieldProps("coreQueue")} />
              </FormRow>
            </PaddedGrid>

            <ModalButtonsRow item xs={12} container>
              <Button onClick={onClose}>{translate("cancel")}</Button>
              <PrimaryButton
                onClick={this.handleSend}
                disabled={this.shouldDisableSendButton()}
                debounce
              >
                {translate(
                  `integrationsManager.${
                    item.id ? "editIntegration" : "addOrUpdateIntegration"
                  }`,
                )}
              </PrimaryButton>
            </ModalButtonsRow>
          </Grid>
        </ModalPaper>
      </Modal>
    );
  }
}

export default withStyles(styles)(IntegrationModalForm);
