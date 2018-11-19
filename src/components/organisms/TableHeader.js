import React from "react";
import translate, { translateKey } from "utils/translate";
import Divisor from "Divisor";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "Button";
import Pagination from "Pagination";
import SearchInput from "SearchInput";
import Icon from "@material-ui/core/Icon/Icon";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Table from "./Table";

const Header = ({ updateFilter, onDelete, selected }) => {
  const shouldEnableDeleteBtn = selected.length > 0;
  const selectedItemKey =
    selected.length === 1 ? "selectedItem" : "selectedItems";
  return (
    <Grid
      container
      style={{ padding: "1%" }}
      direction="row"
      justify="space-between"
    >
      <div>
        <IconButton
          onClick={() => onDelete(selected)}
          disabled={!shouldEnableDeleteBtn}
        >
          <Icon color={shouldEnableDeleteBtn ? "error" : "disabled"}>
            delete
          </Icon>
        </IconButton>
        <span
          style={{
            fontSize: "12px",
            color: "#F44336",
            marginLeft: "3px",
          }}
        >
          {shouldEnableDeleteBtn &&
            `${selected.length} ${translateKey(selectedItemKey)}`}
        </span>
      </div>
      <Grid item xs={2}>
        <SearchInput onChange={updateFilter} />
      </Grid>
    </Grid>
  );
};

export default Header;
