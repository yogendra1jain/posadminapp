import React from 'react';
import { Edit, TextInput, ReferenceInput, NumberInput, BooleanInput } from 'react-admin';
export const VendorProductEdit = props => (
    < Edit {...props }>
        <SimpleForm>
            <TextInput source="id" />
            <ReferenceInput source="vendorId" reference="vendors"><SelectInput optionText="id" /></ReferenceInput>
            <ReferenceInput source="posProductId" reference="posProducts"><SelectInput optionText="id" /></ReferenceInput>
            <ReferenceInput source="retailerId" reference="retailers"><SelectInput optionText="id" /></ReferenceInput>
            <DateInput source="sku" />
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