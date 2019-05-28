import React from 'react';
import { List, Datagrid, TextField, ReferenceField, BooleanField, DateField,EditButton } from 'react-admin';

const PackagePendingList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            {/* <ReferenceField source="uId" reference="us"><TextField source="id" /></ReferenceField> */}
            <TextField source="manifest" />
            <TextField source="facility" />
            <TextField source="metricProduct" />
            <TextField source="productCategory" />
            <TextField source="quantity" />
            <TextField source="vendor" />
            <TextField source="lastModified" />
            <BooleanField source="metricApproved" />
            <EditButton  label="Check In" />  

        </Datagrid>
    </List>
);

export default PackagePendingList;