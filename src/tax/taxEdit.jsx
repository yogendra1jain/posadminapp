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
import {EditTitle} from '../global/components/Title';

const TaxEditTitle = ({ record }) => {
  return <span>Edit {record.name}</span>;
};

const TaxAppliedToChoices = [
  { id: 1, name: "Medical Cannabis" },
  { id: 2, name: "Recreational Cannabis" },
  { id: 3, name: "All Cannabis" },
  { id: 4, name: "Non Cannabis" },
  { id: 5, name: "All Products" }
];

const TaxEdit = props => (
  <Edit title={<EditTitle source="name" />} {...props}>
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
      <TextInput label="Name" source="name" validate={required()} />
      <NumberInput
        label="Percentage"
        source="percentage"
        validate={required()}
      />
      <RadioButtonGroupInput
        validate={required()}
        parse={val => parseInt(val, 10)}
        label="Tax Rate Applicable on"
        source="appliedTo"
        choices={TaxAppliedToChoices}
      />
      <BooleanInput source="active" />
    </SimpleForm>
  </Edit>
);

export default TaxEdit;
