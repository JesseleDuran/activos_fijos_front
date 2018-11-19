import React, { Component } from "react";
import styled from "styled-components";
import translate from "utils/translate";
import Divisor from "Divisor";
import Button from "Button";
import Grid from "@material-ui/core/Grid";
import _ from "lodash";
import ExcelExportable from "containers/ExcelExportable";
import Paper from "@material-ui/core/Paper";
import SearchInput from "SearchInput";
import TestMappingModal from "containers/TestMappingModal";
import Pagination from "Pagination";
import Table from "./Table";
import EllipsableText from "../atoms/EllipsableText";
import ChoppedText from "../atoms/ChoppedText";

const Title = styled.p`
  font-size: 18px;
  margin: 0;
`;

const TitleContainer = styled.div`
  padding: 2% 5%;
`;

const ButtonSection = ({ enable, openTestModal }) => (
  <Grid container justify="flex-start" style={{ marginLeft: "10px" }}>
    <Grid item xs={2}>
      <Button onClick={openTestModal} disabled={!enable}>
        {translate("test")}
      </Button>
    </Grid>
    <Grid item xs={3}>
      <ExcelExportable filename="mapped" disabled={!enable} />
    </Grid>
  </Grid>
);

class MappedRelations extends Component {
  changeColumnNames = item => {
    const result = {};
    const indexes = _.toString(item.indexes);
    result["MappingPage.table.sku"] = item.sku;
    result["MappingPage.table.name"] = item.name;
    result["MappingPage.table.id"] = (
      <ChoppedText
        text={indexes}
        length={15}
        title={indexes}
      />
    );
    result["MappingPage.table.price"] = `$${item.price ? item.price : 0}`;
    result.identifier = {
      field: "id",
      value: item.id,
    };
    return result;
  };

  render = () => {
    const {
      page,
      filtered,
      selected,
      onSelect,
      onItemClick,
      selectAll,
      onChangePage,
      filter,
      rowsPerPage,
      changeRowsPerPage,
    } = this.props;

    const itemsIndex = page * rowsPerPage;
    return (
      <Paper>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <TitleContainer>
              <Title>{translate("MappingPage.mapRelations")}</Title>
            </TitleContainer>
          </Grid>
          <Grid item xs={5}>
            <SearchInput onChange={value => filter(value)} />
          </Grid>
          <Grid item xs={12}>
            <Divisor />
          </Grid>
          <Grid item xs={12}>
            <Table
              selectAll={selectAll}
              onItemClick={onItemClick}
              selected={selected}
              identifierField="id"
              data={filtered
                .slice(itemsIndex, itemsIndex + rowsPerPage)
                .map(this.changeColumnNames)}
              onSelect={onSelect}
            />
          </Grid>
          <Grid item xs={7}>
            <ButtonSection
              openTestModal={this.props.onOpenTestModal}
              selectAll={selectAll}
              enable={selected.length > 0}
            />
          </Grid>
          <Grid item xs={5}>
            <Pagination
              page={page}
              count={filtered.length}
              onChangePage={onChangePage}
              rowsPerPage={rowsPerPage}
              onRowsChange={changeRowsPerPage}
            />
          </Grid>
          <TestMappingModal
            open={this.props.testModal}
            items={filtered.filter(i => selected.includes(i.id))}
            onClose={this.props.onCloseTestModal}
          />
        </Grid>
      </Paper>
    );
  };
}

export default MappedRelations;
