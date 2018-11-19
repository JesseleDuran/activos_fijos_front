import PropTypes from "prop-types";
import React from "react";
import {
  Table as MaterializeTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import translate from "utils/translate";
import Checkbox from "@material-ui/core/Checkbox";
import OptionsMenu from "./OptionsMenu";

/** This array includes the item fields with metadata that shouldn't
 * be rendered.
 * The options are rendered apart so the 'options' key must be here as well.
 */
const EXCLUDED_COLUMNS = ["options", "identifier"];

const hasOptions = item => item.options && item.options.length > 0;

const renderColumns = columns =>
  columns.map(column => (
    <TableCell key={column} data-field={column}>
      {translate(column)}
    </TableCell>
  ));

const getTitleOfComponent = component =>
  component.props ? component.props.title : "";

const renderItem = (item, onItemClick) =>
  Object.keys(item)
    .filter(key => !EXCLUDED_COLUMNS.includes(key))
    .map(key => (
      <TableCell
        key={Math.random()}
        onClick={() => onItemClick(item)}
        title={
          typeof item[key] === "string"
            ? item[key].toString()
            : getTitleOfComponent(item[key])
        }
      >
        {item[key]}
      </TableCell>
    ));

const renderData = (data, selected, onSelect, onItemClick) =>
  data.map(item => {
    const rowId = item.identifier ? item.identifier.value : item.id;
    const isSelected = selected.includes(rowId);

    return (
      <TableRow key={rowId} selected={isSelected} hover>
        <TableCell padding="checkbox">
          <Checkbox
            type="checkbox"
            checked={isSelected}
            onClick={() => (onSelect ? onSelect(rowId) : null)}
          />
        </TableCell>
        {renderItem(item, onItemClick)}
        <TableCell>
          {hasOptions(item) && <OptionsMenu options={item.options} />}
        </TableCell>
      </TableRow>
    );
  });

const Table = ({ data = [], selected, onSelect, onItemClick, selectAll }) => {
  let shouldShowOptionsCol = false;
  let columnTitles = [];

  if (data.length > 0) {
    shouldShowOptionsCol = data.some(hasOptions);
    columnTitles = Object.keys(data[0]);
  }

  const getVisibleColums = () => {
    const hiddenColumns = shouldShowOptionsCol
      ? EXCLUDED_COLUMNS.filter(col => col !== "options")
      : EXCLUDED_COLUMNS;

    return columnTitles.filter(column => !hiddenColumns.includes(column));
  };

  return (
    <MaterializeTable>
      {data.length > 0 ? (
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                type="checkbox"
                indeterminate={
                  selected.length > 0 && selected.length < data.length
                }
                checked={selected.length >= data.length}
                onClick={selectAll}
              />
            </TableCell>
            {renderColumns(getVisibleColums())}
          </TableRow>
        </TableHead>
      ) : null}
      <TableBody>{renderData(data, selected, onSelect, onItemClick)}</TableBody>
    </MaterializeTable>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  onItemClick: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
  selectAll: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
};

Table.defaultProps = {
  onItemClick: () => {},
};

export default Table;
