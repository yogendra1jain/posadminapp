import React from 'react';  
import { List, Datagrid,ReferenceField,NumberField,TextField,Filter,TextInput,EditButton } from 'react-admin';
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
            <EditButton/>
        </Datagrid>
    </List>
);

export default PackageList