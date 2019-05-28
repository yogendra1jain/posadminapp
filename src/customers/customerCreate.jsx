import React from 'react';
import { Create, 
    SimpleForm, 
    TextInput,
    NumberInput
} from 'react-admin';
import ZipCodeInput from '../global/components/ZipCodeInput';

const CustomerCreate = props => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <TextInput label="First Name" source="customer.firstName" />
            <TextInput label="Last Name" source="customer.lastName" />
            <TextInput label="Email" source="email" />
            <TextInput label="Address Line 1" source="billingAddress.addressLine1" />
            <TextInput label="Address Line 2" source="billingAddress.addressLine2" />
            <ZipCodeInput source="billingAddress.postalCode"/>
            <TextInput label="City" source="billingAddress.city" />
            <TextInput label="State" source="billingAddress.state" />
            <TextInput label="Country" source="billingAddress.country" />
            <NumberInput label="Phone Number" source="phoneNumber.phoneNumber" />
        </SimpleForm>
    </Create>
);

export default CustomerCreate;