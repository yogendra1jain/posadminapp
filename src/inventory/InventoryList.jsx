import React from "react";
import {
  Datagrid,
  List,
  ReferenceField,
  TextField,
  EditButton
} from "react-admin";

const InventoryList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <ReferenceField
        linkType="show"
        source="product.id"
        reference="Products"
        label="Product Name"
      >
        <TextField source="name" />
      </ReferenceField>
      <TextField label="Quantity In Hand" source="inventory.quantity" />
      <TextField label="UOM" source="inventory.uom" />
      <EditButton label="Adjust"/>
    </Datagrid>
  </List>
);

export default InventoryList;
