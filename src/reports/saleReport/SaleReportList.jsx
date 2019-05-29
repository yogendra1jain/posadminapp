import React from 'react';
import {
    Filter,
    List,
    ReferenceInput,
    SelectInput,
} from 'react-admin';
import GridList from './GridList';

export const SaleReportFilter = props => (
    <Filter {...props}>
        <ReferenceInput label="Select Store" reference="Store" alwaysOn>
            <SelectInput source="name" />
        </ReferenceInput>
    </Filter>
);

const SaleReportList = props => (
    <List
        {...props}
        filters={<SaleReportFilter />}
    >
        <GridList />
    </List>
);

export default SaleReportList;
