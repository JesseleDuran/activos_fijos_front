import React, { Component } from "react";
import { connect } from "react-redux";
import LoadFilePage from "LoadFilePage";
import csv from "csvtojson";
import { UploadStateEnum } from "DropZone";
import { updateItems } from "actions/item";
import { removeKeys, removeEmptyKeys } from "utils/functions";
import { withRouter } from "react-router-dom";
import uuidv1 from "uuid/v1";
import { getSelectedIntegrationStores } from "../reducers/integration";
import { getSelectedStore } from "../reducers/store";
import Page from "../hocs/Page";
import translate from "../utils/translate";
import { itemStatus } from "../constants";

@Page({
  title: translate("loadFilePage.title"),
  requiredProps: ["selectedStore"],
})
class LoadFileContainer extends Component {
  findStore = (stores, selectedStore) =>
    stores.filter(store => store.id === selectedStore)[0];

  onFileUploaded = (file, stater) => {
    const reader = new FileReader();
    reader.onload = () => this.toCSV(reader, stater);
    reader.onabort = () => stater(UploadStateEnum.error);
    reader.onerror = () => stater(UploadStateEnum.error);
    reader.readAsText(file);
  };

  toCSV = (reader, stater) => {
    const fileAsString = reader.result;
    stater(UploadStateEnum.uploading);
    csv({ delimiter: [",", ";"], ignoreEmpty: true, checkType: false })
      .fromString(fileAsString)
      .then(json => this.processJson(json, stater))
      .then(results => this.onResult(results, stater))
      .catch(err => {
        stater(UploadStateEnum.error);
      });
  };

  processJson = (json, stater) => {
    const values = json.filter(
      item => item.sku && item.name && item.subtype && item.type,
    );
    if (values.length === 0) stater(UploadStateEnum.error);
    const store = this.findStore(this.props.stores, this.props.selectedStore);

    return this.mapItems(values, store.id);
  };

  mapItems = (values, store) =>
    values.map(item => {
      let metadata = removeKeys(item, [
        "sku",
        "name",
        "price",
        "type",
        "subtype",
      ]);
      metadata = removeEmptyKeys(metadata);
      return {
        indexes: [],
        relations: [],
        real: true,
        ...item,
        type: item.type.toLowerCase(),
        id: uuidv1(),
        store,
        metadata,
        status: itemStatus.ACTIVE,
      };
    });

  onResult = (results, stater) => {
    stater(UploadStateEnum.success);
    this.props.updateItems(results);
  };

  render = () => {
    const store = this.findStore(this.props.stores, this.props.selectedStore);
    return <LoadFilePage store={store} onFileUploaded={this.onFileUploaded} />;
  };
}

const mapStateToProps = state => ({
  stores: getSelectedIntegrationStores(state),
  selectedStore: getSelectedStore(state),
});

export default connect(
  mapStateToProps,
  { updateItems },
)(withRouter(LoadFileContainer));
