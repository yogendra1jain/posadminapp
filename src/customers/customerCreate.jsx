import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    RadioButtonGroupInput,
    DateInput,
    FormDataConsumer,
    BooleanInput
} from 'react-admin';
import ZipCodeInput from '../global/components/ZipCodeInput';
import { TextField } from '@material-ui/core';

const CustomerCreate = props => (
    <Create {...props}>
        <SimpleForm redirect="list">
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
            <RadioButtonGroupInput source="gender" choices={[
                { id: '1', name: 'Male' },
                { id: '2', name: 'Female' },
                { id: '3', name: 'Other' },
            ]} />
            <DateInput label="Date Of Birth" source="dob" />
            <RadioButtonGroupInput source="customerType" choices={[
                { id: '1', name: 'MEDICAL' },
                { id: '2', name: 'ADULT' },
            ]} />
            <FormDataConsumer>
                {(formData, dispatch, ...rest) => {
                    console.log(formData, 'formDataformDataformData')
                    return (
                        <div>
                            {formData.formData.customerType == 1 ?
                                <React.Fragment>
                                    <BooleanInput label="Temp Medical Licence" source="tempMedicalLicense" />
                                    <BooleanInput label="Tax Exempt" source="taxExempt" />
                                    <React.Fragment>
                                    <TextField label="Medical License Number" source="medicalLicenseNumber" />
                                    </React.Fragment>
                                    <NumberInput label="Gram Limit" source="gramLimit" />
                                    <NumberInput label="Plant Count Limit" source="plantCountLimit" />
                                    <NumberInput label="Age" source="age" />
                                </React.Fragment>
                                : null}
                        </div>
                    )
                }
                }
            </FormDataConsumer>
        </SimpleForm>
    </Create>
);

export default CustomerCreate;