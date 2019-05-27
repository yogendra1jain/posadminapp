import React from 'react';
import _get from 'lodash/get';

export const AddressField = ({ record = {} }) => {
    return (
        <span>{
            _get(record,'address.addressLine1','') + ', ' + _get(record,'address.addressLine2','') + ', ' +
            _get(record,'address.city','') + ', ' + _get(record,'address.state','') + ', ' + _get(record,'address.country','') + ', ' + _get(record,'address.postalCode','')
        }</span>
    )
}

AddressField.defaultProps = { label: 'Address' };