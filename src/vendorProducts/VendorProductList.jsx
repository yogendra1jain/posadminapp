import React from "react";
import DineroPrice from "../global/components/DineroPrice";
import {
  TextField,
  ReferenceField,
  NumberField,
  BooleanField,
  List,
  Datagrid,
  EditButton,
  Responsive
} from "react-admin";
import MobileGrid from './MobileGrid';
import {SimpleFilter} from '../global/components/filter';
import ProductReferenceField from "../products/ProductReferenceField";

const VendorListTitle = ({ record }) => {
  return <span>Vendor Products List</span>;
};

const VendorProductList = props => (
  <List filters={<SimpleFilter />} {...props} title={<VendorListTitle />}>
    <Responsive 
      small={<MobileGrid />}
      medium={<Datagrid rowClick="edit">
      <ReferenceField source="vendorId" reference="vendors">
        <TextField source="name" />
      </ReferenceField>
      {/* <ReferenceField source="posProductId" reference="Products" label="POS Product">
        <TextField source="name" />
      </ReferenceField> */}
      <ProductReferenceField src="posProductId" label="Product"/>
      <TextField source="sku" label="Vendor SKU"/>
      <DineroPrice label="Price" source="price.amount" />
      <NumberField source="conversionFactor" label="Pack Size"/>
      <BooleanField source="primary" label="Primary Supplier"/>
      <EditButton />
    </Datagrid>}
    />
  </List>
);

export default VendorProductList;
