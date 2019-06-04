import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  RadioButtonGroupInput,
  BooleanInput
} from 'react-admin'

const TaxEditTitle = ({record}) => {
  return (
    <span>Edit {record.name}</span>
  )
}

const TaxAppliedToChoices = [
  { id: 0, name: 'Dummy Product' },
  { id: 1, name: 'Medical Cannabis' },
  { id: 2, name: 'Recreational Cannabis' },
  { id: 3, name: 'All Cannabis'},
  { id: 4, name: 'Non Cannabis'},
  { id: 5, name: 'All Products'}
]

const StoreEdit = props => (
  <Edit title={<TaxEditTitle />} {...props}>
    <SimpleForm redirect="list">
      <TextInput label="Name" source="name" />
      <NumberInput label="Percentage" source="percentage" />
      <RadioButtonGroupInput
        parse={val => parseInt(val, 10)} 
        label="Tax applied to"
        source="appliedTo"
        choices={TaxAppliedToChoices}
      />
      <BooleanInput source="active" />
    </SimpleForm>
  </Edit>
);

export default StoreEdit;