import {
    Filter, 
    TextInput
} from 'react-admin';
import React from 'react';

export const SimpleFilter = (props) => {
    return (
        <Filter {...props}>
            <TextInput source="q" label="Search"  alwaysOn />
        </Filter>
    )
}