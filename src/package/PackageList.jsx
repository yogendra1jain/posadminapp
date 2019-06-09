import React from 'react';  
import SyncIcon from '@material-ui/icons/Sync';
import _get from 'lodash/get';
import { List, Datagrid,ReferenceField,NumberField,TextField,Filter,TextInput,EditButton,FunctionField } from 'react-admin';
const PackageFilter = (props) => {
    return (
        <Filter {...props}>
            <TextInput label="Search" source="q" alwaysOn />
        </Filter>
    )
};
 const PackageList = props => (
    <List {...props} filters={<PackageFilter/>}>
        <Datagrid >
            <TextField source="id" />
            <TextField source="label" />
            <TextField source="packageType" />
            <ReferenceField source="posProductId" reference="Search/Products"><TextField source="name" /></ReferenceField>
            <NumberField source="syncStatus" />
            <TextField source="metrcId" reference="metrcs"></TextField>
            <TextField source="metrcProduct" />
            <FunctionField text-align="left" label="Sync Status" render={record => _get(record,'syncStatus',0) == 0 ? <SyncIcon style={{color: 'orange'}} /> : <SyncIcon style={{color: 'green'}} />} />
            <EditButton/>
        </Datagrid>
    </List>
);

export default PackageList