import { TextField, 
    Datagrid, 
    List,
    Filter,
    DateInput
 } from 'react-admin';
 import React from 'react';
 import moment from 'moment';
 
 const SaleReportFilter = props => (
    <Filter {...props}>
        <DateInput source="date" alwaysOn label="Select Date" />
    </Filter>
    );

const SaleReportTitle = () => {
    return (
        <span>Daily Sales Report</span>
    )
}

 const SaleReportList = props => (
     <List title={<SaleReportTitle />} filters={<SaleReportFilter />} filterDefaultValues={{ date: moment().format('YYYY-MM-DD') }} {...props}>
         <Datagrid>
             <TextField source="date" />
             <TextField source="orderId" label="Order ID"/>
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
 