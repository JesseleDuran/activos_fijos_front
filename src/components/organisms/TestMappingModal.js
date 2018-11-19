import React from "react";
import styled from "styled-components";
import translate from "utils/translate";
import Button from "Button";
import Modal from "@material-ui/core/Modal";
import Divisor from "Divisor";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import TestTable from "TestTable";

const Title = styled.p`
  font-size: 20px;
  font-weight: 700;
  padding-left: 20px;
`;

const FooterContainer = styled.div`
  padding: 1%;
  width: 100%;
`;

const styles = theme => ({
  paper: {
    margin: "10% 20%",
  },
});

const Footer = ({ onClose, onFinalize }) => (
  <FooterContainer>
    <Grid container justify="flex-end">
      <Grid item xs={3}>
        <Grid container>
          <Grid item xs={6}>
            <Button onClick={onClose}>{translate("cancel")}</Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={onClose}>{translate("finalize")}</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </FooterContainer>
);

class TestMappingModal extends React.Component {
  render() {
    const { classes, totalItems, itemsTested } = this.props;
    return (
      <Modal open={this.props.open}>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={4}>
              <Title>{translate("testMapping.title")}</Title>
            </Grid>
            <Grid item xs={7} container justify="flex-end" alignItems="center">
              <span>
                {translate("validated")}:{(itemsTested * 100) / totalItems}%
              </span>
            </Grid>
            <Divisor />
            <TestTable {...this.props} />
            <Divisor />
            <Footer {...this.props} />
          </Grid>
        </Paper>
      </Modal>
    );
  }
}

export default withStyles(styles)(TestMappingModal);
