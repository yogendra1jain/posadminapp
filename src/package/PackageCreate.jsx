import React from 'react';
import { ReferenceInput,NumberInput, AutocompleteInput, ArrayInput, Create, SimpleFormIterator, TextInput, SelectInput } from 'react-admin';
import { SimpleForm } from 'react-admin';
import { FormDataConsumer } from 'ra-core';
import { TextField } from '@material-ui/core';

const PackageCreateTitle = ({ record }) => {
    return (
        <span>Create Package</span>
    )
};
const PackageCreate = (props) => {
    return (
        <Create title={<PackageCreateTitle />}  {...props}>
            <SimpleForm redirect="list">
                <ReferenceInput source="posProductId" reference="Search/Products"><AutocompleteInput source="posProductId" optionText="name" /></ReferenceInput>
                <TextInput source="label" label="label"></TextInput>
                <FormDataConsumer>
                    {({ formData, ...rest }) => {
                        debugger;

                        return (
                            <ArrayInput source="ingredients">
                                <SimpleFormIterator>
                                    <ReferenceInput filter={{ posProductId: formData.posProductId }} label="Package" source="sourcePackageId" reference="Package">
                                        <AutocompleteInput source="originalPackage" optionText={(val) => `${val.label}(${val.quantity})`} />
                                    </ReferenceInput>
                                    <NumberInput source="quantity" label="Quantity"></NumberInput>
                                </SimpleFormIterator>
                            </ArrayInput>
                        )
                    }}
                </FormDataConsumer>
            </SimpleForm>
        </Create>
    )

}

export default PackageCreate;