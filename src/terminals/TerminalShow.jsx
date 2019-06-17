import React from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField,
    BooleanField,
    NumberField,
    FunctionField,
    ReferenceField
} from 'react-admin';
import _find from 'lodash/find';
import _get from 'lodash/get';

const TerminalShowTitle = ({ record }) => {
    return <span>Terminal {record ? `${record.name}` : ""}</span>;
};

const TerminalShow = props => (
    <Show title={<TerminalShowTitle />} {...props}>
        <SimpleShowLayout>
        <ReferenceField  reference="Store" source="storeId"><TextField source="name" /></ReferenceField> 
            <TextField source="name" />
            <TextField source="active" />
        </SimpleShowLayout>
    </Show>
);

export default TerminalShow;