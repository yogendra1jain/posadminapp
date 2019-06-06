import React from 'react';
import { Edit, SimpleForm, TextField, ReferenceInput, NumberField, AutocompleteInput } from 'react-admin';

 const PackageEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextField source="id" />
            <TextField source="label" />
            <TextField source="packageType" />
            <ReferenceInput  source="posProductId" reference="Search/Products"><AutocompleteInput  optionText="name" /></ReferenceInput>
            <NumberField source="syncStatus" />
            <TextField source="metrcId"/>
            <TextField source="metrcProduct" />
            <NumberField source="quantity" />
        </SimpleForm>
    </Edit>
);

export default PackageEdit;