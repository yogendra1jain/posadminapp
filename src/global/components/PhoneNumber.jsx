import React from 'react';
import _get from 'lodash/get';

export const PhoneNumber = ({ record = {} }) => {
    return (
        <span>{+_get(record,'phoneNumber.countryCode','') + ' ' + _get(record,'phoneNumber.phoneNumber','')}</span>
    )
}