
import {
    TextField,
    Datagrid,
    List,
    Filter,
    TextInput,
    EditButton,
    FunctionField
} from 'react-admin';
import React from 'react';
import DineroPrice from '../global/components/DineroPrice';
import SyncIcon from '@material-ui/icons/Sync';
import _get from 'lodash/get';

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
            <FunctionField text-align="left" label="Sync Status" render={record => _get(record,'syncStatus',0) == 0 ? <SyncIcon style={{color: 'orange'}} /> : <SyncIcon style={{color: 'green'}} />} />
            <EditButton />
        </Datagrid>
    </List>
);