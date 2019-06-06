import React from 'react';  
import { List, Datagrid,ReferenceField,NumberField,TextField } from 'react-admin';

 const PackageList = props => (
    <List {...props}>
        <Datagrid >
            <TextField source="id" />
            <TextField source="label" />
            <TextField source="packageType" />
            <ReferenceField source="posProductId" reference="Search/Products"><TextField source="name" /></ReferenceField>
            <NumberField source="syncStatus" />
            <TextField source="metrcId" reference="metrcs"></TextField>
            <TextField source="metrcProduct" />
        </Datagrid>
    </List>
);

export default PackageList