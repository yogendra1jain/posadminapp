import React from 'react';
import {
    List, 
    Datagrid,
    TextField
} from 'react-admin';

const POListTitle = () => {
    return <span>PO List</span>
}

const PurchaseorderList = props => (
    <List {...props}>
        <Datagrid>
            <TextField label="Store Name" source="store.name" />
            <TextField label="Vendor Name" source="vendor.name" />
        </Datagrid>
    </List>
);

export default PurchaseorderList;