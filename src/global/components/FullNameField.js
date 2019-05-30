import React from 'react';
import _get from 'lodash/get'
import  Typography  from '@material-ui/core/Typography';

export const FullNameField = ({ record = {} }) => {
    return (
        <Typography>{_get(record,'customer.firstName','') + ' ' + _get(record,'customer.lastName','')}</Typography>
    )
}

FullNameField.defaultProps = { label: 'Name' };