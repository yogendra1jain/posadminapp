import React from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField,
    BooleanField,
    NumberField,
    FunctionField
} from 'react-admin';
import _find from 'lodash/find';
import _get from 'lodash/get';


const SampleShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField  label="First Name" source="person.firstName" />
            <TextField  label="Last Name" source="person.lastName" />
            <NumberField  label="Phone Number" source="phoneNumber.phoneNumber" />
            <NumberField  source="loginPin" />
            <TextField  source="role" />
            <TextField  source="email" />
            <BooleanField  source="active" />
        </SimpleShowLayout>
    </Show>
);

export default SampleShow;