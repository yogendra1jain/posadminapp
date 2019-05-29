
import {
    TextField,
    Datagrid,
    List,
    Filter,
    TextInput,
    EditButton,
    ShowButton
} from 'react-admin';
import React from 'react';
import DineroPrice from '../global/components/DineroPrice';
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
        <Datagrid>
            <TextField label="SKU" source="sku" />
            <TextField label="Name" source="name" />
            <DineroPrice label="Cost Price" source="costPrice.amount" />
            <DineroPrice label="Sale Price" source="salePrice.amount" />
            <EditButton/>
            <ShowButton/>
        </Datagrid>
    </List>
);