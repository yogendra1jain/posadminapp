import React from 'react';
import { 
    Show, 
    SimpleShowLayout, 
    TextField, 
    BooleanField, 
    NumberField
} from 'react-admin';

 const CustomerShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
            <NumberField source="percentage" />
            <BooleanField label='Active' source="active" />
        </SimpleShowLayout>
    </Show>
);

export default CustomerShow;