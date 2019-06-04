import { 
   TextField, 
   Datagrid, 
   List,
   EditButton,
   ShowButton
} from 'react-admin';
import React from 'react';

const TaxList = props => (
    <List  {...props}>
        <Datagrid>
            <TextField source="name" />
            <TextField label="Percentage" source="percentage" />
            <EditButton />
            <ShowButton/>
        </Datagrid>
    </List>
);

export default TaxList;
