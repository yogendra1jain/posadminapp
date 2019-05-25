import React from 'react';
import dineroObj from '../conversion/DineroObj';
import _get from 'lodash/get'

const DineroPrice = (props)=>{
    const { record, source, resource } = props;
    return <span>{dineroObj(_get(record,source,0)).toFormat('$0,0.00')}</span>
}

export default DineroPrice;