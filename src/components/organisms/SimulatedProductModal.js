import React from "react";
import styled from "styled-components";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import translate from "../../utils/translate";
import Select from "../molecules/Select";
import Button from "../molecules/Button";
import Divisor from "../atoms/Divisor";
import PrimaryButton from "../molecules/PrimaryButton";

const Title = styled.p`
  font-size: 20px;
  font-weight: 700;
  padding-left: 20px;
`;

const styles = theme => ({
  paper: {
    margin: "5% 35%",
  },
  container: {
    padding: theme.spacing.unit * 2,
  },
});

class SimulatedProductModal extends React.Component {
  state = {
    name: "",
    price: "",
    sku: "",
    type: "",
    subtype: "",
  };

  componentWillReceiveProps = nextProps => {
    if (!nextProps.open) this.setState({ name: "", price: "", sku: "" });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onAdd = () => {
    this.props.onAdd(this.state);
  };

  render() {
    const { classes, onClose, buttons } = this.props;
    return (
      <Modal open={this.props.open}>
        <Paper className={classes.paper}>
          <Grid container className={classes.container}>
            <Title>{translate("simulatedProducts.modalTitle")}</Title>
            <Divisor />
            <Grid item xs={6} justify="flex-start" container>
              <p>{translate("simulatedProducts.form.id")}</p>
            </Grid>
            <Grid item xs={6} justify="center" container>
              <TextField
                label={translate("simulatedProducts.form.id")}
                value={this.state.rappiId}
                onChange={this.handleChange("sku")}
              />
            </Grid>
            <Grid item xs={6} justify="flex-start" container>
              <p>{translate("simulatedProducts.form.name")}</p>
            </Grid>
            <Grid item xs={6} justify="center" container>
              <TextField
                label={translate("simulatedProducts.form.name")}
                value={this.state.name}
                onChange={this.handleChange("name")}
              />
            </Grid>
            <Grid item xs={6} justify="flex-start" container>
              <p>{translate("simulatedProducts.form.price")}</p>
            </Grid>
            <Grid item xs={6} justify="center" container>
              <TextField
                label={translate("simulatedProducts.form.price")}
                value={this.state.price}
                onChange={this.handleChange("price")}
              />
            </Grid>

            <Grid item xs={6} justify="flex-start" container>
              <p>{translate("simulatedProducts.form.type")}</p>
            </Grid>
            <Grid item xs={6} justify="center" container>
              <Grid item xs={9}>
                <Select
                  label={translate("simulatedProducts.form.type")}
                  value={this.state.type}
                  onChange={this.handleChange("type")}
                  options={generateFakeTypeOptions()}
                />
              </Grid>
            </Grid>

            <Grid item xs={6} justify="flex-start" container>
              <p>{translate("simulatedProducts.form.subtype")}</p>
            </Grid>
            <Grid item xs={6} justify="center" container>
              <TextField
                label={translate("simulatedProducts.form.subtype")}
                value={this.state.subtype}
                onChange={this.handleChange("subtype")}
              />
            </Grid>

            <Divisor />
            <Grid
              item
              xs={12}
              justify="flex-end"
              container
              style={{ padding: "1%" }}
            >
              <Button onClick={onClose}>{translate("cancel")}</Button>
              <PrimaryButton
                onClick={this.onAdd}
                disabled={!buttons.add}
                debounce
              >
                {translate("addProduct")}
              </PrimaryButton>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    );
  }
}

const generateFakeTypeOptions = () => [
  {
    value: "product",
    label: "Product",
  },
  {
    value: "Combo",
    label: "Combo",
  },
  {
    value: "topping",
    label: "Topping",
  },
];

export default withStyles(styles)(SimulatedProductModal);
