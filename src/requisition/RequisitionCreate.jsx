import React from 'react';
import {
    Create,
    SimpleForm,
    NumberInput
} from 'react-admin';

const RequisitionCreateTitle = () => {
    return <span> Create Requisition</span>
}


const RequisitionCreate = props => (
    <Create title={<RequisitionCreateTitle />} {...props}>
        <SimpleForm redirect="list">
            {/* <ReferenceInput label="Select Vendor Product" source="strainId" reference="VendorProduct/GetByRetailerId">
                <AutocompleteInput validate={required()} optionText="name" />
            </ReferenceInput>
            <ReferenceInput label="Select Store" source="strainId" reference="Strain">
                <AutocompleteInput validate={required()} optionText="name" />
            </ReferenceInput> */}
            <NumberInput source="quantity" />
        </SimpleForm>
    </Create>
);

export default RequisitionCreate;