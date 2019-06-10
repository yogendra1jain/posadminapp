import { TextField, 
   Datagrid, 
   EmailField,
   List,
   Filter,
   TextInput,
   EditButton,
   FunctionField,
   ShowButton
} from 'react-admin';
import React from 'react';
import _get from 'lodash/get';
import { FullNameField } from '../global/components/FullNameField';

const CustomerFilter = (props) => {
    return (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
)};

const CustomerList = props => (
    <List filters={<CustomerFilter />}  {...props}>
        <Datagrid>
            {/* <TextField source="id" /> */}
            <FullNameField />
            <EmailField source="email" />
            <TextField label="Phone" source="phoneNumber.phoneNumber" />
            <FunctionField label="Customer Segment" render={record => _get(record,'customerType', 0) == 1 ? 'Medical' : 'Recreational'} />

            <EditButton />
            <ShowButton/>
        </Datagrid>
    </List>
);

export default CustomerList;
