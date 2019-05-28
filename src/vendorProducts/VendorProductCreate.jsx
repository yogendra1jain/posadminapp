import React from 'react';
import { Create, TextInput, ReferenceInput, NumberInput, BooleanInput, SimpleForm, DateInput, SelectInput } from 'react-admin';

const VendorProductCreate = props => (
    < Create {...props}>
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
    </Create >
);

export default VendorProductCreate