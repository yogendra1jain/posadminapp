import React from 'react';
import { TextField, ReferenceField, DateField, NumberField, BooleanField, List, Datagrid } from 'react-admin';
const VendorListTitle = ({ record }) => {
    return (
        <span>
            Vendor Products List
        </span>
    )
};
const VendorProductList = props => (
    <List {...props} title={<VendorListTitle/>}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <ReferenceField source="vendorId" reference="vendors"><TextField source="name" /></ReferenceField>
            <ReferenceField source="posProductId" reference="Search/Products"><TextField source="name" /></ReferenceField>
            <DateField source="sku" />
            <TextField source="price.currency" />
            <NumberField source="defaultOrderQty" />
            <NumberField source="conversionFactor" />
            <BooleanField source="primary" />
            <TextField source="upc" />
            <NumberField source="discountPercent" />
            <TextField source="unitType" />
        </Datagrid>
    </List>
);

export default VendorProductList