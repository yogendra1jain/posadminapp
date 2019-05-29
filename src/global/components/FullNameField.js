import React from 'react';
import _get from 'lodash/get'

export const FullNameField = ({ record = {} }) => {
    return (
        <span>{_get(record,'customer.firstName','') + ' ' + _get(record,'customer.lastName','')}</span>
    )
}

FullNameField.defaultProps = { label: 'Name' };