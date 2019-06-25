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


const SampleEdit = (props) => {
    return (
        <Edit title={<SampleEditTitle />} {...props}>
            <SimpleForm redirect="list">
            
            </SimpleForm>
        </Edit>
    )
}

export default SampleEdit