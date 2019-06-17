import {
    TextInput,
    NumberInput,
    Edit,
    TabbedForm,
    FormTab,
    BooleanInput,
    RadioButtonGroupInput,
    DateInput,
    FormDataConsumer,
    required
} from 'react-admin';
import React from 'react';
import ZipCodeInput from '../global/components/ZipCodeInput';
import _get from 'lodash/get';

const CustomerTitle = ({ record }) => {
    return (
        <span>
            Customer {record.customer.firstName}
        </span>
    )
};

const CustomerEdit = props => (
    <Edit title={<CustomerTitle />} {...props}>
        <TabbedForm>
            <FormTab label="Contact Details">
                <TextInput label="First Name" validate={required()} source="customer.firstName" />
                <TextInput label="Last Name" validate={required()} source="customer.lastName" />
                <TextInput label="Email" source="email" />

                <NumberInput label="Phone Number" source="phoneNumber.phoneNumber" />
                <RadioButtonGroupInput
                    parse={(v) => parseInt(v)}
                    source="gender"
                    choices={[
                        { id: 1, name: "Male" },
                        { id: 2, name: "Female" },
                        { id: 3, name: "Other" }
                    ]}
                />
                <DateInput validate={required()} label="Date Of Birth" source="dob" />
            </FormTab>
            <FormTab label="Address">
                <TextInput
                    label="Address Line 1"
                    source="billingAddress.addressLine1"
                />
                <TextInput
                    label="Address Line 2"
                    source="billingAddress.addressLine2"
                />
                <ZipCodeInput source="billingAddress.postalCode" />
                <TextInput label="City" source="billingAddress.city" />
                <TextInput label="State" source="billingAddress.state" />
                <TextInput label="Country" source="billingAddress.country" />
            </FormTab>
            <FormTab label="Patient Details">
                <RadioButtonGroupInput
                    parse={(v) => parseInt(v,10)}
                    source="customerType"
                    choices={[
                        { id: 1, name: "MEDICAL" },
                        { id: 2, name: "RECREATIONAL" }
                    ]}
                />
                <FormDataConsumer>
                    {(formData, ...rest) => {
                        console.log(formData, "formDataformDataformData");
                        return (
                            <React.Fragment>
                                {formData.formData.customerType == 1 ? (
                                    <React.Fragment>
                                        <BooleanInput
                                            label="Temp Medical Licence"
                                            source="tempMedicalLicense"
                                        />
                                        <BooleanInput label="Tax Exempt" source="taxExempt" />

                                        <TextInput
                                            label="Medical License"
                                            source="medicalLicenseNumber"
                                        />

                                        <NumberInput
                                            label="Purchase Limit (g)"
                                            source="gramLimit"
                                        />

                                        <NumberInput
                                            label="Purchase Limit (plants)"
                                            source="plantCountLimit"
                                        />
                                        <DateInput validate={required()} label="License Expiry Date" source="medicalLicenseExpiration" />
                                    </React.Fragment>
                                ) : null}
                            </React.Fragment>
                        );
                    }}
                </FormDataConsumer>
            </FormTab>
        </TabbedForm>
    </Edit>
);

export default CustomerEdit;

