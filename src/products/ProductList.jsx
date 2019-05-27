
import {
    TextField,
    Datagrid,
    List,
    Filter,
    TextInput
} from 'react-admin';
import React from 'react';
import { DineroPrice } from './DineroPrice';
const ProductListTitle = ({ record }) => {
    return (
        <span>
            Product List
        </span>
    )
};
const ProductFilter = (props) => {
    return (
        <Filter {...props}>
            <TextInput label="Search" source="q" alwaysOn />
        </Filter>
    )
};

export const ProductList = props => (
    <List {...props} title={<ProductListTitle />}  filters={<ProductFilter/>}>
        <Datagrid rowClick="edit">
            <TextField source="sku" />
            <TextField source="name" />
            <DineroPrice source="costPrice.amount" />
            <DineroPrice source="salePrice.amount" />
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