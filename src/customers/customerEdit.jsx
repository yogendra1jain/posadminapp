import { TextInput,
    NumberInput,
    Edit,
    SimpleForm,
    Query, 
    Loading, 
    FormDataConsumer
} from 'react-admin';
import React from 'react';
import ZipCodeInput from '../global/components/ZipCodeInput';

 const CustomerTitle = ({ record }) => {
    return (
        <span>
            Customer {record ? `${record.customer.firstName} ${record.customer.lastName}` : ''}
        </span>
    )
};

export const CustomerEdit = props => (
    <Edit title={<CustomerTitle />} {...props}>
        <SimpleForm>
            <TextInput label="First Name" source="customer.firstName" />
            <TextInput label="Last Name" source="customer.lastName" />
            <TextInput label="Email" source="email" />
            <TextInput label="Address Line 1" source="billingAddress.addressLine1" />
            <TextInput label="Address Line 2" source="billingAddress.addressLine2" />
            <ZipCodeInput/>
            <TextInput label="City" source="billingAddress.city" />
            <TextInput label="State" source="billingAddress.state" />
            <TextInput label="Country" source="billingAddress.country" />
            <NumberInput label="Phone Number" source="phoneNumber.phoneNumber" />
        </SimpleForm>
    </Edit>
);

