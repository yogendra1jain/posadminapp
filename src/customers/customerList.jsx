import { TextField, 
   Datagrid, 
   EmailField,
   List,
   Filter,
   TextInput,
   EditButton
} from 'react-admin';
import React from 'react';
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
            <TextField source="id" />
            <FullNameField />
            <EmailField source="email" />
            <TextField label="Phone" source="phoneNumber.phoneNumber" />
            <EditButton />
        </Datagrid>
    </List>
);

export default CustomerList;
