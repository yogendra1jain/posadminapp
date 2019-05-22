
import { TextField, BooleanField, ReferenceField, DateField, NumberField, Datagrid, List, } from 'react-admin';
import React from 'react';
export const ProductList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="sku" />
            <TextField source="name" />
            <TextField source="costPrice.amount" />
            <TextField source="salePrice.amount" />
            {/* <TextField source="id" />
            <TextField source="name" />
            <TextField source="description" />
            <TextField source="category1" />
            <TextField source="category2" />
            <TextField source="category3" />
            <TextField source="image" />
            <BooleanField source="active" />
            <TextField source="salePrice.currency" />
            <TextField source="sku" />
            <TextField source="upcCode" />
            <BooleanField source="isTaxable" />
            <ReferenceField source="retailerId" reference="retailers"><TextField source="id" /></ReferenceField>
            <TextField source="costPrice.currency" />
            <BooleanField source="discountable" />
            <NumberField source="createdOn.seconds" />
            <DateField source="dimensions" />
            <TextField source="keywords" />
            <DateField source="extendedSku" />
            <TextField source="seasonality" />
            <NumberField source="updatedOn.seconds" />
            <TextField source="additionalUpcCodes" /> */}
        </Datagrid>
    </List>
);