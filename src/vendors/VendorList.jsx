import React from 'react';
import { Datagrid, TextField, EmailField, ReferenceField, DateField, BooleanField, List } from 'react-admin';
import { PhoneNumber } from '../global/components/PhoneNumber';

const VendroListTitle = ({ record }) => {
    return (
        <span>
            Vendor List
        </span>
    )
};

export const VendorList = props => (
    < List {...props} title={<VendroListTitle/>}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            {/* <BooleanField source="status" />
            <TextField source="code" /> */}
            <PhoneNumber source='phoneNumber'/>

        </Datagrid>
    </List >
);