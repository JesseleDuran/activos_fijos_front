import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@material-ui/core";
import translate from "utils/translate";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/CircularProgress";
import ChoppedText from "ChoppedText";

const ICONS_BY_STATE = {
  LOADING: () => <CircularProgress color="primary" size={35} />,
  SUCCESS: () => <Icon style={{ color: "green" }}>check_circle</Icon>,
  ERROR: reason => (
    <Tooltip title={reason} placement="bottom">
      <Icon style={{ color: "red" }}>error</Icon>
    </Tooltip>
  ),
};

const TestTable = ({ data = [], classes, onItemClick = () => {} }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>{translate("MappingPage.table.name")}</TableCell>
        <TableCell>{translate("MappingPage.table.id")}</TableCell>
        <TableCell>{translate("MappingPage.table.sku")}</TableCell>
        <TableCell>{translate("MappingPage.table.price")}</TableCell>
        <TableCell>{translate("MappingPage.table.result")}</TableCell>
        <TableCell />
      </TableRow>
    </TableHead>
    <TableBody>{renderData(data, classes, onItemClick)}</TableBody>
  </Table>
);

const renderData = (items, classes, onItemClick) =>
  items.map((item, index) => (
    <TableRow key={`${item.id}-${index}`} onClick={() => onItemClick(item)}>
      {renderItem(item, classes)}
    </TableRow>
  ));

const renderItem = (item, classes) => [
  <TableCell key={Math.random()}>{item.name}</TableCell>,
  <TableCell key={Math.random()} title={item.rappiId.join(",")}>
    <ChoppedText text={item.rappiId.join(",")} length={25} />
  </TableCell>,
  <TableCell key={Math.random()}>{item.sku}</TableCell>,
  <TableCell key={Math.random()}>{item.price}</TableCell>,
  <TableCell key={Math.random()}>
    {renderResult(item.result, item.reason)}
  </TableCell>,
];

const renderResult = (result, reason) => ICONS_BY_STATE[result](reason);

TestTable.propTypes = {};

export default TestTable;
