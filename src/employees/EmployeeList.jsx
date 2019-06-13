
import React from 'react';
import { TextField, ReferenceField, EmailField, NumberField, BooleanField, List, Datagrid } from 'react-admin';

const EmployeeList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="customer.firstName" />
            <EmailField source="email" />
            <TextField source="billingAddress.addressLine1" />
            <NumberField source="phoneNumber.countryCode" />
            <BooleanField source="employee" />
            <BooleanField source="isEmpPayEnabled" />
            <BooleanField source="active" />
            <ReferenceField source="employeeId" reference="employees"><TextField source="id" linkType="show" /></ReferenceField>
            <ReferenceField source="employeeStoreId" reference="employeeStores"><TextField source="id" /></ReferenceField>
            <NumberField source="employeeDiscount" />
            <NumberField source="lastUpdated.seconds" />
            <TextField source="employeePurchaseLimit.currency" />
            <TextField source="limitRenewalDates" />
        </Datagrid>
    </List>
)

export default EmployeeList;