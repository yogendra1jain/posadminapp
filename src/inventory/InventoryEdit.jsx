import React from "react";
import { Edit, SimpleForm, NumberInput, required } from "react-admin";
import ProductReferenceField from "../products/ProductReferenceField";

const InventoryEdit = props => (
  <Edit title="Adjust Inventory" {...props} undoable={false}>
    <SimpleForm>
      <ProductReferenceField src="productId" label="Product" />
      <NumberInput source="quantity" disabled label="On-hand Quantity" />
      <NumberInput
        source="deltaQuantity"
        label="Adjust Quantity (Delta)"
        defaultValue={0}
      />
    </SimpleForm>
  </Edit>
);

export default InventoryEdit;
