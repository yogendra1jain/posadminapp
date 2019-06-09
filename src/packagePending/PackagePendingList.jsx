import React from 'react';
import { List, Datagrid, TextField, ReferenceField, BooleanField, DateField, withDataProvider, EditButton, FormDataConsumer } from 'react-admin';
import InfoOutline from '@material-ui/icons/InfoOutline'
import moment from 'moment'
import SyncIcon from '@material-ui/icons/Sync';



class PackagePendingList extends React.Component {
    syncClick = (props) => {
        this.props.dataProvider('GET_ONE', 'Sync/Metrc/IncomingTransfers', {retailerId:localStorage.getItem('retailerId')}).then((data)=>{
            localStorage.setItem('incomingPkgSyncTime',Date.now());
            this.setState({})
        })
    }

    render() {
        return (
            <div className='flex-column'>
                <div className='flex-row justify-center align-center justify-flex-end'>
                    <span>{`Metrc Last Synced ${moment(localStorage.getItem('incomingPkgSyncTime') * 1).format('MM-DD-YYYY,hh:mm:ss a')}`}</span>
                    <SyncIcon onClick={this.syncClick} style={{ fontSize: '1.2px' }} title="Sync to metrc again" style={{ color: 'orange' }} />
                </div>

                <List {...this.props}>
                    <Datagrid >
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
                        <EditButton label="Check In" />

                    </Datagrid>
                </List>
              </div>

        );

    }
}

export default withDataProvider(PackagePendingList);