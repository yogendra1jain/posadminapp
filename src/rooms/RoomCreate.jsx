import React from "react";
import {
    Create,
    SimpleForm,
    TextInput,
    BooleanInput,
    required,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    TextField
} from "react-admin";
import { CreateTitle } from '../global/components/Title';

const TaxCreate = props => (
    <Create title={<CreateTitle name="Room" />} {...props}>
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
    </Create>
);

export default TaxCreate;
