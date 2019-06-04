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
        <span>Sale Report</span>
    )
}

 const SaleReportList = props => (
     <List title={<SaleReportTitle />} filters={<SaleReportFilter />} filterDefaultValues={{ date: moment().format('YYYY-MM-DD') }} {...props}>
         <Datagrid>
             <TextField source="date" />
             <TextField source="orderId" />
             <TextField source="staffName" />
             <TextField source="customerName" />
             <TextField source="customerId" />
             <TextField source="employeeCode" />
             <TextField source="sku" />
             <TextField source="barCode" />
             <TextField source="productName" />
             <TextField source="staffNote" />
             <TextField source="group" />
             <TextField source="category" />
             <TextField source="subCategory" />
             <TextField source="itemType" />
             <TextField source="priceRetailUnit" />
             <TextField source="costPrice" />
             <TextField source="quantity" />
             <TextField source="totalRetailSales" />
             <TextField source="preTaxSales" />
             <TextField source="tax" />
             <TextField source="totalSales" />
             <TextField source="employeeDiscountAmount" />
             <TextField source="itemDiscountAmount" />
             <TextField source="cartDiscountAmount" />
             <TextField source="totalItemDiscount" />
             <TextField source="paymentMethod1" />
             <TextField source="paymentMethod2" />
             <TextField source="paymentMethod3" />
             <TextField source="itemVendorNo" />
             <TextField source="vendorName" />
         </Datagrid>
     </List>
 );
 
 export default SaleReportList;
 