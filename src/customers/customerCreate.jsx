import React from "react";
import {
  Create,
  TabbedForm,
  FormTab,
  TextInput,
  NumberInput,
  RadioButtonGroupInput,
  DateInput,
  FormDataConsumer,
  BooleanInput,
  required
} from "react-admin";
import ZipCodeInput from "../global/components/ZipCodeInput";
import { CreateTitle } from "../global/components/Title";
import withStyles from "@material-ui/core/styles/withStyles";

export const styles = {
  width: { width: "5em" },
  widthFormGroup: { display: "inline-block" },
  height: { width: "5em" },
  heightFormGroup: { display: "inline-block", marginLeft: 32 }
};

const MedicalInfo = withStyles(styles)(({ classes, ...props }) => (
  <div>
    <BooleanInput
      label="Temporary Recommendation"
      source="tempMedicalLicense"
      defaultValue={false}
    />
    <BooleanInput label="Tax Exempt" source="taxExempt" />
    <FormDataConsumer>
      {(formData, ...rest) => {
        return (
          <div>
            {formData.formData.tempMedicalLicense === false ? (
              <div>
                <TextInput
                  label="Medical License"
                  source="medicalLicenseNumber"
                  className={classes.widthFormGroup}
                />
                <DateInput
                  validate={required()}
                  label="License Expiry Date"
                  source="medicalLicenseExpiration"
                  className={classes.heightFormGroup}
                />
              </div>
            ) : null}
          </div>
        );
      }}
    </FormDataConsumer>

    <NumberInput
      label="Purchase Limit (g)"
      source="gramLimit"
      className={classes.widthFormGroup}
      defaultValue={28}
    />
    <NumberInput
      label="Plant Count Limit"
      source="plantCountLimit"
      className={classes.heightFormGroup}
      defaultValue={6}
    />
  </div>
));

const CustomerCreate = ({ classes, ...props }) => (
  <Create {...props} title={<CreateTitle name="Customer" />}>
    <TabbedForm redirect="list">
      <FormTab label="Contact Details">
        <TextInput
          label="First Name"
          validate={required()}
          formClassName={classes.widthFormGroup}
          source="customer.firstName"
        />
        <TextInput
          label="Last Name"
          validate={required()}
          formClassName={classes.heightFormGroup}
          source="customer.lastName"
        />
        <TextInput label="Email" source="email" />

        <NumberInput label="Phone Number" source="phoneNumber.phoneNumber" />
        <RadioButtonGroupInput
          parse={v => parseInt(v)}
          validate={required()}
          source="gender"
          choices={[
            { id: 1, name: "Male" },
            { id: 2, name: "Female" }
            // { id: 3, name: "Other" }
          ]}
          defaultValue={1}
        />
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
          parse={v => parseInt(v)}
          source="customerType"
          validate={required()}
          choices={[
            { id: 1, name: "MEDICAL" },
            { id: 2, name: "RECREATIONAL" }
          ]}
          defaultValue={2}
        />
        <DateInput validate={required()} label="Date Of Birth" source="dob" />
        <FormDataConsumer>
          {(formData, ...rest) => {
            return (
              <div>
                {formData.formData.customerType === 1 ? <MedicalInfo /> : null}
              </div>
            );
          }}
        </FormDataConsumer>
      </FormTab>
    </TabbedForm>
  </Create>
);

export default withStyles(styles)(CustomerCreate);
