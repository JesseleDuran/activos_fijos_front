import React from "react";
import ListMenu from "ListMenu";
import Grid from "@material-ui/core/Grid";

const MenusContainer = ({
  store,
  restaurantItems,
  rappiItems,
  rappiMultiSelectable = true,
  restaurantMultiSelectable = true,
  onRappiSelect,
  onRestaurantSelect,
  onRappiUnSelect,
  onRestaurantUnSelect,
  rappiSelected,
  restaurantSelected,
  height = "250px",
  onCompoundSelect,
  compoundSelected,
  onCompoundUnSelect,
  filter,
}) => (
  <Grid container>
    <Grid item xs={6}>
      <ListMenu
        height={height}
        name="Rappi"
        list={rappiItems}
        idKey="sku"
        selected={rappiSelected}
        multiSelectable={rappiMultiSelectable}
        onItemSelected={onRappiSelect}
        onItemUnSelected={onRappiUnSelect}
        filter={filter}
        onCompound={generateCompound(onCompoundSelect, onCompoundUnSelect)}
        compoundSelected={compoundSelected}
      />
    </Grid>
    <Grid item xs={6}>
      <ListMenu
        height={height}
        name={store.name}
        list={restaurantItems}
        idKey="sku"
        selected={restaurantSelected}
        multiSelectable={restaurantMultiSelectable}
        onItemSelected={onRestaurantSelect}
        onItemUnSelected={onRestaurantUnSelect}
      />
    </Grid>
  </Grid>
);

function generateCompound(onCompoundSelect, onCompoundUnSelect) {
  if (onCompoundSelect && onCompoundUnSelect)
    return (value, data) =>
      value ? onCompoundSelect(data) : onCompoundUnSelect(data);
  return null;
}

export default MenusContainer;
