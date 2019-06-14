import React from 'react';
import moment from 'moment';
import _get from 'lodash/get';
import {
    Show, 
    TextField,
    SimpleShowLayout,
    FunctionField,
    ArrayField,
    Datagrid,
    NumberField
} from 'react-admin';
import DineroPrice from "../global/components/DineroPrice";

const ShowTitle = ({record}) => {
    return ''
}

const SaleHistoryShow = (props) => {
    console.log(props, 'sale history data')
    return (
        <Show {...props} title={<ShowTitle />}>
            <SimpleShowLayout>
                <TextField label="Order Id" source="id" />
                <FunctionField label="Order Date" render={record => moment(record.saleTimeStamp.seconds * 1000).format('DD/MM/YYYY hh:mm:ss')} />
                <TextField label="Store name" source="store.name" />
                <FunctionField label="Store Address" render={record => `${_get(record,'store.address.addressLine1','')}, ${_get(record,'store.address.addressLine1','')}, ${_get(record,'store.address.city','')}, ${_get(record,'store.address.state','')}, ${_get(record,'store.address.country','')}, ${_get(record,'store.address.postalCode','')}`} />
                <FunctionField label="Cashier name" render={record => `${_get(record,'operator.person.firstName','')} ${_get(record,'operator.person.lastName','')}`} />
                <TextField label="Terminal name" source="terminal.name" />
                <FunctionField label="Customer name" render={record => `${_get(record,'customer.customer.firstName','')} ${_get(record,'customer.customer.lastName','')}`} />
                <ArrayField source="saleItems">
                    <Datagrid>
                        <TextField label='Product Name' source="product.name" />
                        <NumberField label="Quantity" source="qty" />
                        <DineroPrice label='Sale Price' source="itemRegularTotal.amount" />
                        {_get(props,'record.employeeDiscountTotal.amount', false) ? <DineroPrice label='Emp Discount' source="employeeDiscountTotal.amount" /> : ''}
                        {_get(props,'record.cartDiscountTotal.amount', false) ? <DineroPrice label='Cart Discount' source="cartDiscountTotal.amount" /> : ''}
                        {_get(props,'record.itemDiscountTotal.amount', false) ? <DineroPrice label='Item Discount' source="itemDiscountTotal.amount" /> : ''}
                        {_get(props,'record.itemTaxAmount.amount', false) ? <DineroPrice label='Tax' source="itemTaxAmount.amount" /> : ''}
                        <DineroPrice label='Subtotal' source="itemSubTotal.amount" />
                    </Datagrid>
                </ArrayField>
                {_get(props,'record.cartDiscountAmount.amount', false) ? <DineroPrice label='Cart Discount' source="cartDiscountAmount.amount" />: ''}
                {_get(props,'record.employeeDiscountAmount.amount', false) ? <DineroPrice label='Emp Discount' source="employeeDiscountAmount.amount" /> : ''}
                {_get(props,'record.itemDiscountAmount.amount', false) ? <DineroPrice label='Item Discount' source="itemDiscountAmount.amount" /> : ''}
                {_get(props,'record.totalTaxAmount.amount', false) ? <DineroPrice label='Tax Amount' source="totalTaxAmount.amount" /> : ''}
                <DineroPrice label='Total Amount' source="totalAmount.amount" />
                <DineroPrice label='Total Amount Paid' source="totalAmountPaid.amount" />
                {_get(props,'record.changeDue.amount', false) ? <DineroPrice label='Change Due' source="changeDue.amount" /> :  ''}
            </SimpleShowLayout>
        </Show>
    )
}

export default SaleHistoryShow;
