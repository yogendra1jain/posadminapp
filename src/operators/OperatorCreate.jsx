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
            <TextInput validate={required()} label="First Name" source="person.firstName" />
            <TextInput validate={required()} label="Last Name" source="person.lastName" />
            <NumberInput validate={required()} label="Phone Number" source="phoneNumber.phoneNumber" />
            <TextInput validate={required()} source="loginPin" />
            <TextInput validate={required()} source="role" />
            <TextInput validate={required()} source="email" />
            <BooleanInput  source="active" />
        </SimpleForm>
    </Create>
);

export default TaxCreate;
