import React from "react";
import styled from "styled-components";
import translate, { translateKey } from "utils/translate";
import Button from "Button";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Divisor from "Divisor";
import RelationsBox from "RelationsBox";
import ListMenu from "ListMenu";
import { findRappiItem } from "utils/functions";
import PrimaryButton from "PrimaryButton";
import RelationsBoxList from "./RelationsBoxList";
import { generateIndexes, generateRelations } from "../../utils/functions";

const Title = styled.p`
  font-size: 20px;
  font-weight: 700;
  padding-top: 10px;
  padding-left: 20px;
`;

const Relations = ({ relations }) => (
  <Grid container>
    <RelationsBoxList
      relations={relations}
      includeEnabled={false}
      deleteEnabled={false}
    />
  </Grid>
);

const renderRelations = relations => {};

const Footer = ({ onCancelClick, onClean }) => (
  <Grid container style={{ padding: "1%" }} justify="flex-end">
    <Grid item xs={2}>
      <Button onClick={onCancelClick}>{translate("cancel")}</Button>
    </Grid>
    <Grid item xs={2}>
      <PrimaryButton onClick={onClean}>{translate("clean")}</PrimaryButton>
    </Grid>
  </Grid>
);

const RappiIndexes = ({ indexes }) => (
  <ListMenu
    height="100px"
    idKey="sku"
    selected={indexes}
    disabled
    list={indexes}
    name={translateKey("MappingPage.indexedWith")}
  />
);

const Details = ({ data }) => (
  <Grid container style={{ padding: "1%" }}>
    <Grid item xs={12}>
      <h5>{translate("MappingPage.productDetail")}</h5>
    </Grid>
    <Grid item xs={2}>
      {translate("MappingPage.table.name")}:
    </Grid>
    <Grid item xs={10}>
      {data.name}
    </Grid>
    <Grid item xs={2}>
      {translate("MappingPage.table.sku")}:
    </Grid>
    <Grid item xs={10}>
      {data.sku}
    </Grid>
    <Grid item xs={2}>
      {translate("MappingPage.table.price")}:
    </Grid>
    <Grid item xs={10}>
      ${data.price ? data.price : 0}
    </Grid>
  </Grid>
);

class MappedDetailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { rappiItems, onClean, data, onCloseClick } = this.props;
    console.log("RENDER", this.props);

    if (data != null) {
      const indexes = generateIndexes(data.indexes, rappiItems);
      const relations = generateRelations(data.relations, [
        ...indexes,
        ...rappiItems,
      ]);
      return (
        <Modal open={this.props.open}>
          <Paper style={{ margin: "5%" }}>
            <Grid container>
              <Title>
                {translate("detail")} : {data.name} - {data.sku}
              </Title>
              <Divisor />

              <Grid item xs={6}>
                <RappiIndexes indexes={indexes} />
              </Grid>
              <Grid item xs={6}>
                <Details data={data} />
              </Grid>

              <Divisor />
              <Relations {...this.state} relations={relations} />
              <Divisor />
              <Footer onClean={onClean} onCancelClick={onCloseClick} />
            </Grid>
          </Paper>
        </Modal>
      );
    }
    return null;
  }
}

export default MappedDetailModal;
