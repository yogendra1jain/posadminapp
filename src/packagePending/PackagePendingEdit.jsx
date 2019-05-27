
import { Edit, SimpleForm, TextInput, BooleanInput, ReferenceInput, SelectInput } from 'react-admin';
import React from 'react';
export const PackagependingEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" />
            {/* <ReferenceInput source="uId" reference="us"><SelectInput optionText="id" /></ReferenceInput> */}
            <TextInput source="manifest" />
            <TextInput source="facility" />
            <TextInput source="metricProduct" />
            <TextInput source="productCategory" />
            <TextInput source="quantity" />
            <TextInput source="vendor" />
            <TextInput source="lastModified" />
            <BooleanInput source="metricApproved" />
        </SimpleForm>
    </Edit>
);