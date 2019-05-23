import { TextInput,
    NumberInput,
    Edit,
    SimpleForm,
    Query, 
    Loading, 
    FormDataConsumer
} from 'react-admin';
import React from 'react';
import ZipCodeInput from './ZipCodeInput';

 const CustomerTitle = ({ record }) => {
    return (
        <span>
            Customer {record ? `${record.customer.firstName} ${record.customer.lastName}` : ''}
        </span>
    )
};

const handleBlur = (record) => {
    console.log(record.target.value, 'record.target.value')
    return (
        <Query type="GET_ONE" resource="/Reference/GetZipCodeData" payload={{ countryShortCode: "US",zipCode: record }}>
            {({ data, loading, error }) => {
                if (loading) { return <Loading />; }
                if (error) { return <p>Some Error Occured</p> }
                return (
                    <div>
                       <TextInput label="City" source={data.city} />
                       <TextInput label="State" source={data.state} />
                       <TextInput label="Country" source={data.country} />
                    </div>
                )
            }}
        </Query>
    )
}

const ZipCodeField = ({ record = {} }) => {
    return (
        <React.Fragment>
            <TextInput onBlur={(e) => handleBlur(e)} label="Zipcode" source="billingAddress.postalCode" />
            <TextInput label="City" source="billingAddress.city" />
            <TextInput label="State" source="billingAddress.state" />
            <TextInput label="Country" source="billingAddress.country" />
        </React.Fragment>
    )
}

export const CustomerEdit = props => (
    <Edit title={<CustomerTitle />} {...props}>
        <SimpleForm>
            <TextInput label="First Name" source="customer.firstName" />
            <TextInput label="Last Name" source="customer.lastName" />
            <TextInput label="Email" source="email" />
            <TextInput label="Address Line 1" source="billingAddress.addressLine1" />
            <TextInput label="Address Line 2" source="billingAddress.addressLine2" />
            <ZipCodeInput source='billingAddress.postalCode'/>
            <TextInput label="City" source="billingAddress.city" />
            <TextInput label="State" source="billingAddress.state" />
            <TextInput label="Country" source="billingAddress.country" />
            <NumberInput label="Phone Number" source="phoneNumber.phoneNumber" />
        </SimpleForm>
    </Edit>
);

