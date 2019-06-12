import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    Filter,
    DateInput,
    FunctionField
} from 'react-admin';
import moment from 'moment';
import DineroPrice from '../global/components/DineroPrice';
import SaleHistoryShow from './SaleHistoryShow';
import _get from 'lodash/get';

const ListFilters = props => (
    <Filter {...props}>
        <DateInput source="date_gte" alwaysOn />
        <DateInput source="date_lte" alwaysOn />
    </Filter>
);

const SaleHistory = () => {
    return <span>Sale History</span>
}

const SaleHistoryList = props => (
    <List {...props} title={<SaleHistory />} >
        <Datagrid rowClick="expand" expand={<SaleHistoryShow />}>
            <TextField source="sale.id" label="Id" />
            <FunctionField label="Date" render={record => moment(_get(record.sale,'saleTimeStamp.seconds',0) * 1000).format('DD/MM/YYYY')} />
            <FunctionField label="Customer" render={record => `${_get(record,'customer.customer.firstName','')} + ${_get(record,'customer.customer.lastName','')}`} />
            <DineroPrice label="Sale Price" source="sale.totalAmount.amount" />
        </Datagrid>
    </List>
);

export default SaleHistoryList;
