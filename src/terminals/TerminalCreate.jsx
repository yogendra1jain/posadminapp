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
    </Create>
);

export default TaxCreate;
