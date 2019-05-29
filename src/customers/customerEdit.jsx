import { TextInput,
    NumberInput,
    Edit,
    SimpleForm
} from 'react-admin';
import React from 'react';
import ZipCodeInput from '../global/components/ZipCodeInput';
import _get from 'lodash/get';

const CustomerTitle = ({ record }) => {
    return (
        <span>
            Customer {record ? `${_get(record,'customer.firstName')} ${_get(record,'customer.lastName')}` : ''}
        </span>
    )
};

const CustomerEdit = props => (
    <Edit title={<CustomerTitle />} {...props}>
        <SimpleForm>
            <TextInput label="First Name" source="customer.firstName" />
            <TextInput label="Last Name" source="customer.lastName" />
            <TextInput label="Email" source="email" />
            <TextInput label="Address Line 1" source="billingAddress.addressLine1" />
            <TextInput label="Address Line 2" source="billingAddress.addressLine2" />
            <ZipCodeInput source="billingAddress.postalCode" />
            <TextInput label="City" source="billingAddress.city" />
            <TextInput label="State" source="billingAddress.state" />
            <TextInput label="Country" source="billingAddress.country" />
            <NumberInput label="Phone Number" source="phoneNumber.phoneNumber" />
        </SimpleForm>
    </Edit>
);

export default CustomerEdit;

