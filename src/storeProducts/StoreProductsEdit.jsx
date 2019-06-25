import React from "react";
import {
    Edit,
    SimpleForm,
    BooleanInput,
    required
} from "react-admin";
import PriceInput from '../global/components/PriceInput';

const SampleEditTitle = ({ record }) => {
    return <span>Edit {record.name}</span>;
};


const SampleEdit = (props) => {
    return (
        <Edit title={<SampleEditTitle />} {...props}>
            <SimpleForm redirect="list">
                <PriceInput
                    validate={required()}
                    label="Cost Price"
                    source="costPrice"
                />
                <PriceInput
                    validate={required()}
                    label="Default Sale Price"
                    source="salePrice"
                />
                <BooleanInput label="Active" source="active" />
            </SimpleForm>
        </Edit>
    )
}

export default SampleEdit