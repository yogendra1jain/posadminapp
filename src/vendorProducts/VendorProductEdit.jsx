import React from 'react';
import { Edit, TextInput, ReferenceInput, NumberInput, BooleanInput, SimpleForm, DateInput, SelectInput } from 'react-admin';
export const VendorProductEdit = props => (
    < Edit {...props }>
        <SimpleForm>
            <ReferenceInput source="vendorId" reference="vendors"><SelectInput optionText="name" /></ReferenceInput>
            <ReferenceInput source="posProductId" reference="Search/Products"><SelectInput optionText="name" /></ReferenceInput>
            <TextInput source="sku" />
            <TextInput source="price.currency" />
            <NumberInput source="defaultOrderQty" />
            <NumberInput source="conversionFactor" />
            <BooleanInput source="primary" />
            <TextInput source="upc" />
            <NumberInput source="discountPercent" />
            <TextInput source="unitType" />
        </SimpleForm>
    </Edit >
);