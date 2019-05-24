import React from 'react';

export const FullNameField = ({ record = {} }) => {
    return (
        <span>{record.customer.firstName + ' ' + record.customer.lastName}</span>
    )
}

FullNameField.defaultProps = { label: 'Name' };