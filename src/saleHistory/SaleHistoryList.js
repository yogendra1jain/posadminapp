import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    Filter,
    DateInput,
    FunctionField, ReferenceField
} from 'react-admin';
import moment from 'moment';
import DineroPrice from '../global/components/DineroPrice';
import SaleHistoryShow from './SaleHistoryShow';
import _get from 'lodash/get';
import SyncIcon from '@material-ui/icons/Sync';

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
            <TextField source="id" label="Id" />
            <FunctionField label="Date" render={record => moment(_get(record, 'saleTimeStamp.seconds', 0) * 1000).format('MM/DD/YYYY h:ss a')} />
            <ReferenceField
                label="Customer"
                source="customerId"
                reference="Customer"
                linkType="show"
            >
                <TextField source="name" />
            </ReferenceField>
            <FunctionField label="No of Items" render={record => _get(record, 'saleItems', []).length} />

            <FunctionField text-align="left" label="Sync Status" render={record => _get(record, 'syncStatus', 0) == 0 ? <SyncIcon style={{ color: 'yellow' }} /> : _get(record, 'syncStatus', 0) == 1 || _get(record, 'syncStatus', 0) == 2 ? <SyncIcon style={{ color: 'green' }} /> : <SyncIcon style={{ color: 'red' }} />} />

            <DineroPrice label="Sales Price" source="totalAmount.amount" />
        </Datagrid>
    </List>
);

export default SaleHistoryList;
