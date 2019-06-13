import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  ArrayInput,
  SimpleFormIterator
} from "react-admin";
import React from "react";

const VendorCreate = props => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="name" />
      <TextInput source="email" label="Contact Email"/>

      {/* <NumberInput label="Country Code" source="phoneNumber.countryCode" /> */}
      <NumberInput label="Phone Number" source="phoneNumber.phoneNumber" />

      <ArrayInput source="licenses">
        <SimpleFormIterator>
          <TextInput source="license" />
          <TextInput source="type" />
          <TextInput source="info" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

export default VendorCreate;
