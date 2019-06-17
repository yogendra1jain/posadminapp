import {
    TextField,
    Datagrid,
    List,
    Filter,
    DateInput,
    ReferenceInput,
    SelectInput
} from 'react-admin';
import React from 'react';
import moment from 'moment';

const SaleReportFilter = ({ permissions, ...props }) => {
    return (
        <Filter {...props}>
            <DateInput source="date" alwaysOn label="Select Date" />
            {permissions === "1" ? (
                <ReferenceInput
                    label="Select Store"
                    reference="Store"
                    alwaysOn
                    allowEmpty={false}
                    source="storeId"
                >
                    <SelectInput source="name" />
                </ReferenceInput>
            ) : null}
        </Filter>
    );
};

const SaleReportTitle = () => {
    return (
        <span>Daily Sales Report</span>
    )
}

const SaleReportList = ({ permissions, ...props }) => (
    <List
        title={<SaleReportTitle />}
        filters={<SaleReportFilter permissions={permissions} />}
        filterDefaultValues={{ date: moment().format('YYYY-MM-DD') }}
        {...props}
    >
        <Datagrid>
            <TextField source="date" />
            <TextField source="orderId" label="Order ID" />
            <TextField source="staffName" />
            <TextField source="customerName" />
            <TextField source="customerId" />
            <TextField source="sku" />
            <TextField source="productName" />
            <TextField source="group" />
            <TextField source="category" />
            <TextField source="priceRetailUnit" />
            <TextField source="costPrice" />
            <TextField source="quantity" />
            <TextField source="totalRetailSales" />
            <TextField source="preTaxSales" />
            <TextField source="tax" />
            <TextField source="totalSales" />
            <TextField source="itemDiscountAmount" />
            <TextField source="cartDiscountAmount" />
            <TextField source="totalItemDiscount" />
            <TextField source="paymentMethod1" />
            <TextField source="paymentMethod2" />
        </Datagrid>
    </List>
);

export default SaleReportList;
