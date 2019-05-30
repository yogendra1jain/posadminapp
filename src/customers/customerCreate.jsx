import React from "react";
import {
  Create,
  TabbedForm,
  FormTab,
  SimpleForm,
  TextInput,
  NumberInput,
  RadioButtonGroupInput,
  DateInput,
  FormDataConsumer,
  BooleanInput
} from "react-admin";
import ZipCodeInput from "../global/components/ZipCodeInput";
import { TextField } from "@material-ui/core";

const CustomerCreate = props => (
  <Create {...props}>
    <TabbedForm redirect="list">
      <FormTab label="Contact Details">
        <TextInput label="First Name" source="customer.firstName" />
        <TextInput label="Last Name" source="customer.lastName" />
        <TextInput label="Email" source="email" />

        <NumberInput label="Phone Number" source="phoneNumber.phoneNumber" />
        <RadioButtonGroupInput
          source="gender"
          choices={[
            { id: "1", name: "Male" },
            { id: "2", name: "Female" },
            { id: "3", name: "Other" }
          ]}
        />
        <DateInput label="Date Of Birth" source="dob" />
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
          source="customerType"
          choices={[
            { id: "1", name: "MEDICAL" },
            { id: "2", name: "RECREATIONAL" }
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

                    <TextField
                      label="Medical License Number"
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
                  </React.Fragment>
                ) : null}
              </React.Fragment>
            );
          }}
        </FormDataConsumer>
      </FormTab>
    </TabbedForm>
  </Create>
);

export default CustomerCreate;
