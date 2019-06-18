import React from 'react';
import { Edit, 
    AutocompleteInput, 
    TextInput, 
    ReferenceInput, 
    NumberInput, 
    BooleanInput, 
    SimpleForm, 
    DateInput, 
    SelectInput,
    ReferenceField,
    TextField
} from 'react-admin';

const Title = ({ record }) => {
    return <span>Edit Vendor Product</span>
}

const VendorProductEdit = props => (
    < Edit {...props} title={<Title />}>
        <SimpleForm>
            <ReferenceInput source="vendorId" reference="vendors">
                <AutocompleteInput source="text" optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="posProductId" reference="Products">
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
            <TextInput source="sku" />
            <TextInput source="price.currency" />
            <NumberInput source="defaultOrderQty" />
            <NumberInput source="conversionFactor" />
            <BooleanInput source="primary" />
            <TextInput source="upc" />
            <NumberInput source="discountPercent" />
            <TextInput source="unitType" />
        </SimpleForm>
    </Edit >
);

export default VendorProductEdit