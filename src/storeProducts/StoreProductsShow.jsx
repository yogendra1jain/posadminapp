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
        </SimpleShowLayout>
    </Show>
);

export default SampleShow;