import { Datagrid, EditButton, List, TextField } from "react-admin";
import React from "react";
import _get from "lodash/get";

const ProductListTitle = ({ record }) => {
  return <span>METRC Imported Items</span>;
};

const ProductList = props => (
  <List {...props} title={<ProductListTitle />} filter={{ syncStatus: "2" }}>
    <Datagrid>
      <TextField label="METRC Item" source="name" />
      <TextField label="METRC ID" source="metrcId" />
      <TextField label="Type" source="metrcItemType" />
      <TextField label="Category" source="metrcCategory" />
      <TextField label="Unit of Measure" source="metrcUom" />
      <EditButton label="Import to Master"/>
    </Datagrid>
  </List>
);

export default ProductList;
