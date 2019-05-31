import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  ArrayInput,
  SimpleFormIterator
} from "react-admin";
import React from "react";

const VendorEdit = props => (
  <Edit {...props} undoable={false}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />

      <NumberInput label="Country Code" source="phoneNumber.countryCode" />
      <NumberInput label="Phone Number" source="phoneNumber.phoneNumber" />

      <ArrayInput source="licenses">
        <SimpleFormIterator>
          <TextInput source="license" />
          <TextInput source="type" />
          <TextInput source="info" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);

export default VendorEdit;
