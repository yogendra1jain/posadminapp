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

const SampleEditTitle = ({ record }) => {
    return <span>Edit {record.name}</span>;
};


const SampleList = (props) => {
    return (
        <Edit title={<SampleEditTitle />} {...props}>
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
                <TextInput source="name" />
                <BooleanInput source="active" />
            </SimpleForm>
        </Edit>
    )
}

export default SampleList