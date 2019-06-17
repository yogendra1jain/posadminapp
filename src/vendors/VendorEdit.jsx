import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  ArrayInput,
  SimpleFormIterator
} from "react-admin";
import React from "react";

const VendorEditTitle = ({record}) => {
  return <span>Vendor {record.name}</span>
}

const VendorEdit = props => (
  <Edit {...props} undoable={false} title={<VendorEditTitle />}>
    <SimpleForm>
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
  </Edit>
);

export default VendorEdit;
