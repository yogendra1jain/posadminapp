import React from 'react';

export const AddressField = ({ record = {} }) => {
    return (
        <span>{
            record.address.addressLine1 + ', ' + record.address.addressLine2 + ', ' +
            record.address.city + ', ' + record.address.state + ', ' + record.address.country + ', ' + record.address.postalCode
        }</span>
    )
}

AddressField.defaultProps = { label: 'Address' };