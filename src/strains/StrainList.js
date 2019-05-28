import { TextField, 
    Datagrid, 
    NumberField,
    List,
    EditButton,
    FunctionField
 } from 'react-admin';
 import _get from 'lodash/get';
 import React from 'react';
 import Synced from '@material-ui/icons/Sync';
 import SyncPending from '@material-ui/icons/SyncProblem'; 

const StrainList = props => (
    <List {...props}>
        <Datagrid>
            <TextField text-align="left" label="Name" source="name" />
            <NumberField text-align="left" label="THC Level" source="thcLevel" />
            <NumberField textAlign="left" label="CBD Level" source="cbdLevel" />
            <NumberField textAlign="left" label="Indica Percentage"  source="indicaPercentage" />
            <NumberField textAlign="left" label="Sativa Percentage" source="sativaPercentage" />
            <TextField label="Genetics" source="genetics" />
            <FunctionField text-align="left" label="Sync Status" render={record => _get(record,'syncStatus',0) == 0 ? <SyncPending style={{color: 'red'}} /> : <Synced style={{color: 'green'}} />} />
            <EditButton />
        </Datagrid>
    </List>
);

export default StrainList