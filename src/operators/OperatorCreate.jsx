import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  RadioButtonGroupInput,
  BooleanInput,
  ReferenceField,
  ReferenceInput,
  TextField,
  SelectInput,
  required
} from "react-admin";

const OperatorCreateTitle = () => {
  return <span>Create Operator</span>;
};

const roleChoices = [
  { id: "cashier", name: "Budtender" },
  { id: "manager", name: "Manager" }
];

const OperatorCreate = props => (
  <Create title={<OperatorCreateTitle />} {...props}>
    <SimpleForm redirect="list">
      {props.permissions !== "1" ? (
        <ReferenceField label="Store" source="storeId" reference="Store">
          <TextField source="name" />
        </ReferenceField>
      ) : (
        <ReferenceInput
          source="storeId"
          reference="Store"
          validate={required()}
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
      )}
      <TextInput
        validate={required()}
        label="First Name"
        source="person.firstName"
      />
      <TextInput
        validate={required()}
        label="Last Name"
        source="person.lastName"
      />
      <NumberInput
        validate={required()}
        label="Phone Number"
        source="phoneNumber.phoneNumber"
      />
      <TextInput validate={required()} source="loginPin" />
      <SelectInput validate={required()} choices={roleChoices} source="role" />
      <TextInput validate={required()} source="email" />
      <BooleanInput source="active" />
    </SimpleForm>
  </Create>
);

export default OperatorCreate;
