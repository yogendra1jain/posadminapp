import React from 'react';
import { Show, SimpleShowLayout, TextField, BooleanField, NumberField, DateField } from 'react-admin';
import { BillingAddressField } from '../global/components/BillingAdressField';
import { FullNameField } from '../global/components/FullNameField';
import DisplayDateField from '../global/components/DisplayDateFields';
import CustomerTypeMapper from '../global/components/CustomerTypeMapper';
 const CustomerShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <FullNameField label='Name' addLabel={true}/>
            <TextField label={'Phone Number'} source="phoneNumber.phoneNumber" />
            <TextField source="email" />
            <BillingAddressField label='Billing Address' addLabel={true} source="billingAddress" />
            <BooleanField label='Status' source="active" />
            <CustomerTypeMapper source="customerType"  addLabel={true} />
            <BooleanField source="tempMedicalLicense" />
            <TextField source="medicalLicenseNumber" />
            <DateField source="medicalLicenseExpiration" locales="en-US" />
            <NumberField source="gramLimit" />
            <NumberField source="plantCountLimit" />
            <DisplayDateField label='Last Updated' addLabel={true} source="lastUpdated.seconds" />
        </SimpleShowLayout>
    </Show>
);

export default CustomerShow;