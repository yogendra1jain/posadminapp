import React from 'react';
import _get from 'lodash/get'
import Typography  from '@material-ui/core/Typography';

const CustomerTypeMapper = ({ record, source }) => {
    return (<Typography>
        {_get(record, source) == 1 ? 'MEDICAL' : _get(record, source) == 2 ? 'ADULT' : 'Not Added'}
    </Typography>)
}

export default CustomerTypeMapper