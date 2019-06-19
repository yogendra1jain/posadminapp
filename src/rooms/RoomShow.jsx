import React from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField,
    BooleanField,
    ReferenceField
} from 'react-admin';
import _find from 'lodash/find';
import _get from 'lodash/get';


const SampleShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <ReferenceField label="Store Name" source="storeId" reference="Store" linkType={false}>
                <TextField source="name" />
            </ReferenceField>            <TextField label="Location" source="location" />
            <TextField label="Info" source="info" />
            <BooleanField label="Active" source="active" />
            <BooleanField label="Inventory For Sale" source="inventoryForSale" />
        </SimpleShowLayout>
    </Show>
);

export default SampleShow;