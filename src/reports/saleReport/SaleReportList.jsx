import { TextField, 
    Datagrid, 
    EmailField,
    List,
    Filter,
    TextInput,
    EditButton
 } from 'react-admin';
 import React from 'react';
 
// const Filter = (props) => {
//      return (
//      <Filter {...props}>
//          <TextInput label="Search" source="q" alwaysOn />
//      </Filter>
//  )};
 
 const SaleReportList = props => (
     <List {...props}>
         <Datagrid>
             <TextField source="customer.email" />
             {/* <EmailField source="email" />
             <TextField label="Phone" source="phoneNumber.phoneNumber" /> */}
             <EditButton />
         </Datagrid>
     </List>
 );
 
 export default SaleReportList;
 