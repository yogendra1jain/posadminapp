import { TextField, 
    Datagrid, 
    List,
    EditButton,
    ShowButton
 } from 'react-admin';
import React from 'react';
import {AddressField} from '../global/components/AddressField';

const StoreList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <AddressField />
            <EditButton />
            <ShowButton/>
        </Datagrid>
    </List>
);

export default StoreList;