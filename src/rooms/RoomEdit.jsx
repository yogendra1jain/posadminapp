import React from "react";
import {
    Edit,
    SimpleForm,
    TextInput,
    BooleanInput,
    required,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    TextField
} from "react-admin";

const SampleEditTitle = ({ record }) => {
    return <span>Edit {record.name}</span>;
};


const SampleEdit = (props) => {
    return (
        <Edit title={<SampleEditTitle />} {...props}>
            <SimpleForm redirect="list">
                {props.permissions !== "1" ? (
                    <ReferenceField label="Store" source="storeId" reference="Store" linkType={false}>
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
                <TextInput label="Location" source="location" />
                <TextInput label="Info" source="info" />
                <BooleanInput label="Active" source="active" />
                <BooleanInput label="Inventory For Sale" source="inventoryForSale" />
            </SimpleForm>
        </Edit>
    )
}

export default SampleEdit