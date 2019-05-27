import { TextField, 
    Datagrid, 
    List,
    EditButton
 } from 'react-admin';
import React from 'react';
import {AddressField} from '../global/components/AddressField';

export const StoreList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <AddressField />
            <EditButton />
        </Datagrid>
    </List>
);