import React from 'react';
import { List, Datagrid, TextField, ReferenceField, BooleanField, DateField, EditButton } from 'react-admin';
import { FormDataConsumer } from 'ra-core';

const PackagePendingList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField label="Id" source="packageID" />
            {/* <ReferenceField source="uId" reference="us"><TextField source="id" /></ReferenceField> */}
            <TextField label="Manifest Number" source="manifestNumber" />
            <TextField label="Transfer Id" source="transferID" />

            <TextField label="Label" source="packageLabel" />
            <TextField label="Type" source="packageType" />
            <TextField label="Product Name" source="productName" />
            <TextField label="Category" source="productCategoryName" />
            <TextField label="Lab Testting State" source="labTestingState" />
            <TextField label="Shipment Package State" source="shipmentPackageState" />
            <TextField label="Shipped Quantity" source="shippedQuantity" />
            <TextField label="UOM" source="shippedUnitOfMeasureName" />
            <FormDataConsumer>
                {(fd)=>fd.shippedQuantity==""}
            </FormDataConsumer>
            <EditButton label="Check In" />

        </Datagrid>
    </List>
);

export default PackagePendingList;