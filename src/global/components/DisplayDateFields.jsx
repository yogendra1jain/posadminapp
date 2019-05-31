import React from 'react';
import moment from 'moment';
import _get from 'lodash/get';
import  Typography  from '@material-ui/core/Typography';
const DisplayDateField = ({ source, record = {} }) => <Typography>{moment(_get(record, source) * 1000).format('MM/DD/YYYY')}</Typography>;

export default DisplayDateField;