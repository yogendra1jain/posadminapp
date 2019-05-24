
import { Edit, SimpleForm, TextInput,NumberInput } from 'react-admin';
import React from 'react';
export const VendorEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="email" />
            <NumberInput label='Country Code' source="phoneNumber.countryCode"/>
            <NumberInput label='Phone Number' source="phoneNumber.phoneNumber"/>

        </SimpleForm>   
    </Edit>
);