import React from "react";
import {
  Edit,
  SimpleForm,
  TextField,
  ReferenceInput,
  NumberField,
  AutocompleteInput,
  required
} from "react-admin";

const Title = ({record}) => {
  return <span>Edit {record.label}</span>
}

const PackageEdit = props => (
  <Edit {...props} title={<Title />}>
    <SimpleForm>
      {/* <TextField source="id" /> */}
      <TextField source="label" />
      <TextField source="metrcId" label="METRC Id" />
      <TextField source="metrcProduct" />

      {/* <TextField source="packageType" /> */}
      <ReferenceInput
        source="posProductId"
        reference="Search/Products"
        label="Change Item in Package"
        validate={required()}
      >
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      {/* <NumberField source="syncStatus" /> */}
      <NumberField source="quantity" />
      <TextField source="uom" />
    </SimpleForm>
  </Edit>
);

export default PackageEdit;
