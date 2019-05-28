
import { Create, SimpleForm, TextInput,NumberInput } from 'react-admin';
import React from 'react';

const VendorCreate = props => (
    <Create {...props}>
        <SimpleForm redirect='list'>
            <TextInput source="name" />
            <TextInput source="email" />
            <NumberInput label='Country Code' source="phoneNumber.countryCode"/>
            <NumberInput label='Phone Number' source="phoneNumber.phoneNumber"/>

        </SimpleForm>   
    </Create>
);

export default VendorCreate;