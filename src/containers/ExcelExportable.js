import React, { Component } from "react";
import Workbook, { Column, Sheet } from "react-excel-workbook";
import translate, { translateKey } from "utils/translate";
import { connect } from "react-redux";
import { findMappedItem } from "utils/functions";
import _ from "lodash";
import Button from "Button";
import { findRappiItem } from "../utils/functions";
import { getMappedItems } from "../reducers/mapped";
import { getRestaurantItems } from "../reducers/restaurant";

const ExcelColumns = [
  "MappingPage.table.sku",
  "MappingPage.table.name",
  "MappingPage.table.id",
  "MappingPage.table.price",
  "MappingPage.table.state",
];

const Match = {
  "MappingPage.table.sku": "sku",
  "MappingPage.table.name": "name",
  "MappingPage.table.id": "indexes",
  "MappingPage.table.price": "price",
  "MappingPage.table.state": "mappingState",
};

class ExcelExportable extends Component {
  renderButton = () => <Button>{translate("excelExport")}</Button>;

  formatData = (keys, data) => {
    const res = data
      .map(item => [...this.formatItem(item), this.generateSeparator(keys)])
      .reduce((prev, curr) => [...prev, ...curr], [])
      .filter(item => item)
      .map(item => this.matchColumnNames(item, keys));
    return res;
  };

  matchColumnNames = (item, keys) => {
    const obj = {};
    keys.forEach(key => (obj[key] = this.mapAttribute(item, key)));
    return obj;
  };

  mapAttribute = (item, key) => {
    let result = item[Match[key]] ? item[Match[key]] : "";
    if (result instanceof Array) result = _.toString(result);
    return result;
  };

  formatItem = item => {
    const relations = this.generateRelationItems(item.relations);
    return [item, ...relations];
  };

  generateRelationItems = relations =>
    relations ? relations.map(this.toItem) : [];

  toItem = relation => {
    const { restaurantItems } = this.props;
    return findMappedItem(relation.value, restaurantItems);
  };

  generateSeparator = keys => {
    const obj = { separator: true };
    keys.forEach(key => (obj[key] = ""));
    return obj;
  };

  renderColumns = columns =>
    columns.map(column => (
      <Column label={translateKey(column)} value={column} key={column} />
    ));

  render = () => {
    const { mappedItems, filename } = this.props;

    return mappedItems.length > 0 ? (
      <Workbook filename={`${filename}.xlsx`} element={this.renderButton()}>
        <Sheet
          data={this.formatData(ExcelColumns, mappedItems)}
          name="Products"
        >
          {this.renderColumns(ExcelColumns)}
        </Sheet>
      </Workbook>
    ) : null;
  };
}

const mapStateToProps = state => ({
  mappedItems: getMappedItems(state),
  restaurantItems: getRestaurantItems(state),
});

export default connect(
  mapStateToProps,
  {},
)(ExcelExportable);
