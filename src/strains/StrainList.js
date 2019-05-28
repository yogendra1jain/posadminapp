import { TextField, 
    Datagrid, 
    NumberField,
    List,
    EditButton
 } from 'react-admin';
 import React from 'react';

const StrainList = props => (
    <List {...props}>
        <Datagrid>
            <TextField label="Name" source="name" />
            <NumberField label="THC Level" source="thcLevel" />
            <NumberField label="CBD Level" source="cbdLevel" />
            <NumberField label="Indica Percentage"  source="indicaPercentage" />
            <NumberField label="Sativa Percentage" source="sativaPercentage" />
            <TextField label="Genetics" source="genetics" />
            <EditButton />
        </Datagrid>
    </List>
);

export default StrainList
