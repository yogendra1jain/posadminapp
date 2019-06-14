import {
    TextField,
    Datagrid,
    NumberField,
    List,
    EditButton,
    FunctionField,
    ShowButton,
    Filter,
    TextInput,
    Responsive,
} from 'react-admin';
import _get from 'lodash/get';
import React from 'react';
import SyncIcon from '@material-ui/icons/Sync';
import MobileGrid from './MobileGrid';

const StrainFilter = (props) => {
    return (
        <Filter {...props}>
            <TextInput label="Search Strain" source="q" alwaysOn />
        </Filter>
    )
};

const StrainList = props => (
    <List {...props} filters={<StrainFilter />}>
        <Responsive
            small={<MobileGrid />}
            medium={<Datagrid>
                <TextField text-align="left" label="Name" source="name" />
                <NumberField text-align="left" label="THC Level" source="thcLevel" />
                <NumberField textAlign="left" label="CBD Level" source="cbdLevel" />
                <NumberField textAlign="left" label="Indica Percentage" source="indicaPercentage" />
                <NumberField textAlign="left" label="Sativa Percentage" source="sativaPercentage" />
                <TextField label="Genetics" source="genetics" />
                <FunctionField text-align="left" label="Sync Status" render={record => _get(record, 'syncStatus', 0) == 0 ? <SyncIcon style={{ color: 'yellow' }} /> : _get(record, 'syncStatus', 0) == 1 || _get(record, 'syncStatus', 0) == 2 ? <SyncIcon style={{ color: 'green' }} /> : <SyncIcon style={{ color: 'red' }} />} />
                <EditButton />
                <ShowButton />
            </Datagrid>}
        />
    </List>
);

export default StrainList
