import React from "react";
import styled from "styled-components";
import translate from "utils/translate";
import Modal from "@material-ui/core/Modal";
import Divisor from "Divisor";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { TextField, InputLabel } from "@material-ui/core";
import Button from "Button";
import PrimaryButton from "PrimaryButton";
import Select from "Select";
import i18n from "utils/i18n";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import Input from "@material-ui/core/Input/Input";
import FormControl from "@material-ui/core/FormControl/FormControl";
import JSONTextArea from "../molecules/JSONTextArea";
import ModalPaper from "../molecules/ModalPaper";
import ModalTitle from "../atoms/ModalTitle";
import PaddedGrid from "../molecules/PaddedGrid";
import ModalButtonsRow from "../atoms/ModalButtonsRow";
import { itemStatus } from "../../constants";

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

const requiredFields = ["name", "price", "sku", "type", "subtype"];

class ProductInfoModalForm extends React.Component {
  static initialState = {
    item: {
      name: "",
      price: "",
      sku: "",
      type: "",
      subtype: "",
      metadata: {},
    },
    isValidItem: false,
    isValidMetadata: true,
  };

  constructor(props) {
    super(props);
    this.state = ProductInfoModalForm.initialState;
    const language = i18n.language.substr(0, 2) || "en";
    import(`react-json-editor-ajrm/locale/${language}`).then(
      locale => (this.locale = locale.default),
    );
  }

  // TODO refactor this
  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (!nextProps.open) return ProductInfoModalForm.initialState;
    if (
      nextProps.item &&
      prevState.item === ProductInfoModalForm.initialState.item
    ) {
      const item = {
        ...nextProps.item,
        ...ProductInfoModalForm.replaceNullFields(nextProps.item),
      };
      return {
        ...prevState,
        isValidItem: ProductInfoModalForm.validateItem(item),
        item,
      };
    }
    return prevState;
  };

  static replaceNullFields = rawItem =>
    Object.keys(ProductInfoModalForm.initialState.item).reduce(
      (item, key) => ({ ...item, [key]: rawItem[key] || "" }),
      {},
    );

  getFieldProps = field => ({
    value: this.state.item[field],
    label: this.getFieldLabelTranslation(field),
    onChange: this.handleChange(field),
  });

  getFieldLabelTranslation = field =>
    translate(`productsManager.form.${field}`);

  getTypeOptions = () => [
    { value: "product", label: "Product" },
    { value: "combo", label: "Combo" },
    { value: "topping", label: "Topping" },
  ];

  handleChange = name => event => {
    const updatedItem = { ...this.state.item, [name]: event.target.value };
    this.setState({
      item: updatedItem,
      isValidItem: ProductInfoModalForm.validateItem(updatedItem),
    });
  };

  handleMetadataChange = value => {
    this.setState(prevState => ({
      item: { ...prevState.item, metadata: value.json },
      isValidMetadata: !value.error,
    }));
  };

  shouldDisableSendButton() {
    return !this.state.isValidItem || !this.state.isValidMetadata;
  }

  handleSend = () => {
    // TODO Refactor this
    this.props.onAddOrUpdate({ ...this.state.item, status: itemStatus.ACTIVE });
    this.props.onClose();
  };

  static validateItem(item) {
    return requiredFields.every(field => item[field] && item[field].length > 0);
  }

  getParsedMetadata = () => {
    const { metadata } = this.state.item;
    let parsedMetadata;
    try {
      parsedMetadata = JSON.parse(metadata);
    } catch (e) {
      parsedMetadata = metadata;
    }
    return parsedMetadata;
  };

  render() {
    const { classes, onClose } = this.props;
    const { item } = this.state;
    return (
      <Modal
        open={this.props.open}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <ModalPaper height="480px" className={classes.paper}>
          <Grid container className={classes.container}>
            <ModalTitle>
              {translate(
                `productsManager.${
                  item.id ? "modalEditTitle" : "modalAddTitle"
                }`,
              )}
            </ModalTitle>
            <Divisor />
            <PaddedGrid
              item
              xs={6}
              justify="flex-start"
              alignContent="flex-start"
              container
            >
              <FormRow item xs={12} justify="flex-start" container>
                <TextField {...this.getFieldProps("sku")} />
              </FormRow>
              <FormRow item xs={12} justify="flex-start" container>
                <TextField {...this.getFieldProps("name")} />
              </FormRow>
              <FormRow item xs={12} justify="flex-start" container>
                <FormControl fullWidth>
                  <InputLabel shrink htmlFor="adornment-price">
                    {this.getFieldLabelTranslation("price")}
                  </InputLabel>
                  <Input
                    id="adornment-price"
                    {...this.getFieldProps("price")}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                  />
                </FormControl>
              </FormRow>
              <FormRow item xs={12} justify="flex-start" container>
                <Select
                  {...this.getFieldProps("type")}
                  options={this.getTypeOptions()}
                />
              </FormRow>
              <FormRow item xs={12} justify="flex-start" container>
                <TextField {...this.getFieldProps("subtype")} />
              </FormRow>
            </PaddedGrid>

            <PaddedGrid item xs={6} container>
              <FormRow item xs={12} container>
                <JSONTextArea
                  label={this.getFieldLabelTranslation("metadata")}
                  id="jsonViewer"
                  key="jsonViewer"
                  placeholder={this.getParsedMetadata()}
                  locale={this.locale}
                  width="470px"
                  theme="light_mitsuketa_tribute"
                  colors={{
                    default: "#000",
                    background: "#EEE",
                  }}
                  onChange={this.handleMetadataChange}
                  height="300px"
                  confirmGood={false}
                />
              </FormRow>
            </PaddedGrid>
            <ModalButtonsRow item xs={12} container>
              <Button onClick={onClose}>{translate("cancel")}</Button>
              <PrimaryButton
                onClick={this.handleSend}
                disabled={this.shouldDisableSendButton()}
                debounce
              >
                {translate(item.id ? "editProduct" : "addProduct")}
              </PrimaryButton>
            </ModalButtonsRow>
          </Grid>
        </ModalPaper>
      </Modal>
    );
  }
}

export default withStyles(styles)(ProductInfoModalForm);
