import { TextInput,
    Edit,
    SimpleForm,
    SelectArrayInput,
    Loading,
    Query
} from 'react-admin';
import React from 'react';
import ZipCodeInput from '../global/components/ZipCodeInput';
import _get from 'lodash/get';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';

const StoreEditTitle = ({ record }) => {
    return (
        <span>
            Store {record ? `${record.name}` : ''}
        </span>
    )
};

// let createSource = (paymentMethods, availablePaymentMethods) => {
//     let source = paymentMethods.map(paymentMethod => {
//         return _find(availablePaymentMethods,'id',paymentMethod)
//     }) 
//     return source
// }

const PaymentMethods = ({ record = {} }) => {
    return <Query type="GET_ONE" resource="PaymentMethods" payload={{}}>
        {({ data, loading, error }) => {
            if (loading) { return <Loading />; }
            if (error) { return <p>Some Error Occured!</p>; }
            if(!_isEmpty(data)) {
                return <SelectArrayInput label="Payment Methods" source="paymentMethods" choices={data} />
            }
        }}
    </Query>
}

export const StoreEdit = props => (
    <Edit title={<StoreEditTitle />} {...props}>
        <SimpleForm>
            <TextInput label="Store Name" source="name" />
            <TextInput label="Address Line 1" source="address.addressLine1" />
            <TextInput label="Address Line 2" source="address.addressLine2" />
            <ZipCodeInput source="address.postalCode" />
            <TextInput label="City" source="address.city" />
            <TextInput label="State" source="address.state" />
            <TextInput label="Country" source="address.country" />
            <PaymentMethods />
        </SimpleForm>
    </Edit>
);