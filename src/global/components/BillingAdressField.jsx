import React from 'react';
import _get from 'lodash/get';
import  Typography  from '@material-ui/core/Typography';

export const BillingAddressField = ({ record = {} }) => {
    return (
        <Typography>{
            _get(record,'billingAddress.addressLine1','') + ', ' + _get(record,'billingAddress.addressLine2','') + ', ' +
            _get(record,'billingAddress.city','') + ', ' + _get(record,'billingAddress.state','') + ', ' + _get(record,'billingAddress.country','') + ', ' + _get(record,'billingAddress.postalCode','')
        }</Typography>
    )
}

BillingAddressField.defaultProps = { label: 'billingAddress' };