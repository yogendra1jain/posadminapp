import { TextField, 
    Datagrid, 
    NumberField,
    List,
    EditButton,
    FunctionField,
    ShowButton,
    Filter,
    TextInput
 } from 'react-admin';
 import _get from 'lodash/get';
 import React from 'react';
 import SyncIcon from '@material-ui/icons/Sync';

 const StrainFilter = (props) => {
    return (
        <Filter {...props}>
            <TextInput label="Search Strain" source="q" alwaysOn />
        </Filter>
    )
};

const StrainList = props => (
    <List {...props} filters={<StrainFilter />}>
        <Datagrid>
            <TextField text-align="left" label="Name" source="name" />
            <NumberField text-align="left" label="THC Level" source="thcLevel" />
            <NumberField textAlign="left" label="CBD Level" source="cbdLevel" />
            <NumberField textAlign="left" label="Indica Percentage"  source="indicaPercentage" />
            <NumberField textAlign="left" label="Sativa Percentage" source="sativaPercentage" />
            <TextField label="Genetics" source="genetics" />
            <FunctionField text-align="left" label="Sync Status" render={record => _get(record,'syncStatus',0) == 0 ? <SyncIcon style={{color: 'orange'}} /> : <SyncIcon style={{color: 'green'}} />} />
            <EditButton />
            <ShowButton/>
        </Datagrid>
    </List>
);

export default StrainList
