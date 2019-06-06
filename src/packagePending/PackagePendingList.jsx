import React from 'react';
import { List, Datagrid, TextField, ReferenceField, BooleanField, DateField, EditButton, FormDataConsumer } from 'react-admin';
import InfoOutline from '@material-ui/icons/InfoOutline'


const PackagePendingList = props => (
    <List {...props}>
        <Datagrid >
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
                {({ formData, ...rest }) => {
                    debugger;
                    if (formData.shipmentPackageState == "Shipped") {
                        return <InfoOutline titleAccess="Please Accept Package at Metric Site" color="red"></InfoOutline>
                    }
                    else if (formData.shipmentPackageState == "Accepted") {
                        return <EditButton label="Check In" />
                    }
                    else {
                        return null
                    }
                }
                }
            </FormDataConsumer>



        </Datagrid>
    </List>
);

export default PackagePendingList;