import React from "react";
import {
    ReferenceInput,
    NumberInput,
    AutocompleteInput,
    ArrayInput,
    Create,
    SimpleFormIterator,
    TextInput,
    required,
    FormDataConsumer,
    SimpleForm,
    SelectInput,
    ReferenceField,
    TextField
} from "react-admin";

const PackageCreateTitle = ({ record }) => {
    return <span>Create Package</span>;
};
const NewPackageCreate = ({ permissions, ...props }) => {
    return (
        <Create title={<PackageCreateTitle />} {...props}>
            <SimpleForm redirect="list">
                {permissions !== "1" ? (
                    <ReferenceField label="Store" source="storeId" reference="Store">
                        <TextField source="name" />
                    </ReferenceField>
                ) : (
                        <ReferenceInput
                            source="storeId"
                            label="Store"
                            reference="Store"
                        >
                            <SelectInput />
                        </ReferenceInput>
                    )}
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

                        return (
                            <ArrayInput source="ingredients" validate={required()}>
                                <SimpleFormIterator>
                                    <ReferenceInput
                                        filter={permissions === "1" ? { posProductId: formData.posProductId, storeId: formData.storeId,syncStatus:"1" } : { posProductId: formData.posProductId, storeId: localStorage.getItem("storeId"),syncStatus:"1" }}
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
    )
}


export default NewPackageCreate;