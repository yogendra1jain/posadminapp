import React from "react";
import {
    Edit,
    SimpleForm,
    ReferenceInput,
    TextField,
    AutocompleteInput
} from "react-admin";

const METRCProductEditTitle = ({ record }) => {
    return <span>Edit {record.name}</span>;
};

const METRCProducteEdit = (props) => {
    return (
        <Edit
            title={<METRCProductEditTitle />}
            {...props}>
            <SimpleForm redirect="list">
                <TextField label="Id" source="id" />
                <TextField label="Name" source="name" />
                <TextField label="Category Type" source="ProductCategoryType" />
                <TextField label="Category Name" source="productCategoryName" />
                <TextField label="UOM" source="unitOfMeasureName" />
                <ReferenceInput source="productId" reference="Products" filter={{ unmappedProducts: true }}>
                    <AutocompleteInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    )
}

export default METRCProducteEdit;