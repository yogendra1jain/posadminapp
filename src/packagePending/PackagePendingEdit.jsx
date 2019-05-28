
import { Edit, SimpleForm, TextInput, BooleanInput, ReferenceInput, AutocompleteInput, SelectInput, TextField, AutoComplete, FormInput } from 'react-admin';
import React from 'react';
import { withStyles } from '@material-ui/core/styles/withStyles';
import Quantity from './Quantity';

const PackagePendingEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextField source="id" />
            <TextField source="metricProduct" />
            {/* <ReferenceInput source="uId" reference="us"><SelectInput optionText="id" /></ReferenceInput> */}
            <ReferenceInput source="posProductId" reference="Search/Products">
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
            <Quantity />
            <TextField source="manifest" />
            <TextInput source="facility" />

            <TextInput source="productCategory" />
            <TextInput source="quantity" />
            <TextInput source="vendor" />
            <TextInput source="lastModified" />
            <BooleanInput source="metricApproved" />
        </SimpleForm>
    </Edit>
);

export default PackagePendingEdit;