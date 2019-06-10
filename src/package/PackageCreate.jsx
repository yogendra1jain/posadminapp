import React from "react";
import {
  ReferenceInput,
  NumberInput,
  AutocompleteInput,
  ArrayInput,
  Create,
  SimpleFormIterator,
  TextInput,
  required
} from "react-admin";
import { SimpleForm } from "react-admin";
import { FormDataConsumer } from "ra-core";

const PackageCreateTitle = ({ record }) => {
  return <span>Create Package</span>;
};
const PackageCreate = props => {
  return (
    <Create title={<PackageCreateTitle />} {...props}>
      <SimpleForm redirect="list">
        <ReferenceInput
          source="posProductId"
          reference="Search/Products"
          validate={required()}
        >
          <AutocompleteInput source="posProductId" optionText="name" />
        </ReferenceInput>
        <TextInput source="label" label="METRC Tag (Label)" validate={required()} />
        <FormDataConsumer>
          {({ formData, ...rest }) => {
            debugger;

            return (
              <ArrayInput source="ingredients" validate={required()}>
                <SimpleFormIterator>
                  <ReferenceInput
                    filter={{ posProductId: formData.posProductId }}
                    label="Package"
                    source="sourcePackageId"
                    reference="Package"
                  >
                    <AutocompleteInput
                      source="originalPackage"
                      optionText={val =>
                        `${val.label}(${val.quantity} ${val.uom})`
                      }
                    />
                  </ReferenceInput>
                  <NumberInput source="quantity" label="Quantity" />
                </SimpleFormIterator>
              </ArrayInput>
            );
          }}
        </FormDataConsumer>
      </SimpleForm>
    </Create>
  );
};

export default PackageCreate;
