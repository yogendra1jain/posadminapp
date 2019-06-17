import { TextField, 
   Datagrid, 
   EmailField,
   List,
   Filter,
   TextInput,
   EditButton,
   FunctionField,
   ShowButton,
   Responsive
} from 'react-admin';
import React from 'react';
import _get from 'lodash/get';
import { FullNameField } from '../global/components/FullNameField';
import MobileGrid from './MobileGrid';

const CustomerFilter = (props) => {
    return (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
)};

const CustomerList = props => (
    <List filters={<CustomerFilter />}  {...props}>
        <Responsive 
            small={<MobileGrid />}
            medium={ <Datagrid>
                <FullNameField />
                <EmailField source="email" />
                <TextField label="Phone" source="phoneNumber.phoneNumber" />
                <FunctionField label="Customer Segment" render={record => _get(record,'customerType', 0) == 1 ? 'Medical' : 'Recreational'} />
    
                <EditButton />
                <ShowButton/>
            </Datagrid>}
        />
    </List>
);

export default CustomerList;
