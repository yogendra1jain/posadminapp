import React from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField
} from 'react-admin';
import _find from 'lodash/find';
import _get from 'lodash/get';

const METRCProductShowTitle = ({ record }) => {
    return <span>{record.name}</span>;
};

const SampleShow = props => (
    <Show {...props} title={<METRCProductShowTitle />} >
        <SimpleShowLayout>
            <TextField label="Id" source="id" />
            <TextField label="Name" source="name" />
            <TextField label="Category Type" source="ProductCategoryType" />
            <TextField label="Category Name" source="productCategoryName" />
            <TextField label="UOM" source="unitOfMeasureName" />
        </SimpleShowLayout>
    </Show>
);

export default SampleShow;