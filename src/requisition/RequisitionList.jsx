import {
    TextField, 
    Datagrid, 
    List,
    EditButton,
    ShowButton,
    ReferenceField
} from 'react-admin';
import React from 'react';

const RequisitionList = props => (
    <List {...props}>
        <Datagrid>
            <ReferenceField label="Product Name" source="posProductId" reference="Products" linkType="show">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Vendor Name" source="vendorId" reference="vendors" linkType="show">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Store Name" source="storeId" reference="Store" linkType="show">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="quantity" />
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
)

export default RequisitionList;