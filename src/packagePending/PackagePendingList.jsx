import React from 'react';
import { List, Datagrid, TextField, ReferenceField, BooleanField, DateField, withDataProvider, EditButton, FormDataConsumer } from 'react-admin';
import InfoOutline from '@material-ui/icons/InfoOutline'
import moment from 'moment'
import SyncIcon from '@material-ui/icons/Sync';
import Button from '@material-ui/core/Button'


const ListActionButton = ({ basePath, data, resource,syncClick,lastSynched,disable }) => {
    return (
    <div>
    <Button disabled={disable}  color="primary" onClick={syncClick}>Sync Now</Button>
    <span>{`METRC Last Synced ${moment(lastSynched * 1).format('MM/DD/YYYY hh:mm a')}`}</span>
    </div>
    )
}

class PackagePendingList extends React.Component {
constructor(props){
    super(props);
    this.state = {lastSynched:null,disable:false}
}
    setTimOutCb = ()=>{
        console.log("^^^^^^^^^^^^^^^")
        this.setState({disable:false});
        this.forceUpdate()
    }
    syncClick = (props) => {
        this.setState({disable:true})
        setInterval(this.setTimOutCb,5*1000)
        this.props.dataProvider('GET_ONE', 'Sync/Metrc/IncomingTransfers', { id: localStorage.getItem('retailerId') }).then((data) => {
            localStorage.setItem('lastSynched',Date.now())
            this.setState({lastSynched:Date.now(),disable:false});
        })
       
    } 
    componentDidMount(){
        this.setState({lastSynched:localStorage.getItem('incomingPkgSyncTime')})
    }  

    render() {
        return (
            <div className='flex-column'>
                    {/* <div className='flex-row justify-center align-center justify-flex-end'>
                        <span>{`METRC Last Synced ${moment(localStorage.getItem('incomingPkgSyncTime') * 1).format('MM/DD/YYYY hh:mm a')}`}</span>
                        <SyncIcon onClick={this.syncClick} style={{ fontSize: '1.2px' }} title="Sync to metrc again" style={{ color: 'orange' }} />
                    </div> */}

                <List {...this.props} actions={<ListActionButton disable={this.state.disable} lastSynched = {this.state.lastSynched}  syncClick={this.syncClick} />} >
                    <Datagrid >
                        {/* <ReferenceField source="uId" reference="us"><TextField source="id" /></ReferenceField> */}
                        <TextField label="Manifest Number" source="manifestNumber" />
                        <TextField label="Transfer Id" source="transferID" />

                        <TextField label="Label" source="packageLabel" />
                        <TextField label="Type" source="packageType" />
                        <TextField label="Product Name" source="productName" />
                        <TextField label="Category" source="productCategoryName" />
                        <TextField label="Shipment Status" source="shipmentPackageState" />
                        <TextField label="Quantity" source="shippedQuantity" />
                        <TextField label="UOM" source="shippedUnitOfMeasureName" defaultValue={0} />
                        <FormDataConsumer>
                            {({ formData, ...rest }) => {
                                if (formData.shipmentPackageState == "Shipped") {
                                    return <InfoOutline titleAccess="Please Accept Package on METRC UI" color="red"></InfoOutline>
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
                        {/* <EditButton label="Check In" /> */}

                    </Datagrid>
                </List>
              </div>

        );

    }
}

export default withDataProvider(PackagePendingList);