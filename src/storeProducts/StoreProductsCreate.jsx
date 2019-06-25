import React from "react";
import {
    Create,
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

const TerminalCreateTitle = () => {
    return <span>Create Tax</span>;
};




const TaxCreate = props => (
    <Create title={<TerminalCreateTitle />} {...props}>
        <SimpleForm
            redirect="list"
        >
        
        </SimpleForm>
    </Create>
);

export default TaxCreate;
