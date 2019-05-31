import React from "react";
import DineroPrice from "../global/components/DineroPrice";
import {
  TextField,
  ReferenceField,
  NumberField,
  BooleanField,
  List,
  Datagrid,
  EditButton
} from "react-admin";
const VendorListTitle = ({ record }) => {
  return <span>Vendor Products List</span>;
};
const VendorProductList = props => (
  <List {...props} title={<VendorListTitle />}>
    <Datagrid rowClick="edit">
      {/* <TextField source="id" /> */}
      <ReferenceField source="vendorId" reference="vendors">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="posProductId" reference="Search/Products" label="POS Product">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="sku" label="Vendor SKU"/>
      <DineroPrice label="Price" source="price.amount" />

      {/* <NumberField source="defaultOrderQty" /> */}
      <NumberField source="conversionFactor" label="Pack Size"/>
      <BooleanField source="primary" label="Primary Supplier"/>
      <EditButton />
    </Datagrid>
  </List>
);

export default VendorProductList;
