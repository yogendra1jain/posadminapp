import React from "react";
import {
  Edit,
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

const OperatorEditTitle = ({ record }) => {
  return <span>Edit {record.person.firstName}</span>;
};

const roleChoices = [
  { id: "cashier", name: "Budtender" },
  { id: "manager", name: "Manager" }
];

const OperatorEdit = props => {
  return (
    <Edit title={<OperatorEditTitle />} {...props}>
      <SimpleForm defaultValue={{ countryCode: "1" }} redirect="list">
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
        <NumberInput validate={required()} source="loginPin" />
        <SelectInput
          validate={required()}
          choices={roleChoices}
          source="role"
        />
        <TextInput validate={required()} source="email" />
        <BooleanInput validate={required()} source="active" />
      </SimpleForm>
    </Edit>
  );
};

export default OperatorEdit;
