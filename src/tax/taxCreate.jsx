import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  RadioButtonGroupInput,
  BooleanInput
} from 'react-admin'

const TaxCreateTitle = () => {
  return (
    <span>Create Tax</span>
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

const StoreCreate = props => (
  <Create title={<TaxCreateTitle />} {...props}>
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
  </Create>
);

export default StoreCreate;