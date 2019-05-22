
import React from 'react';
import dineroObj from '../Global/Conversion/dineroObj';
import _get from 'lodash/get'

const DineroPrice = (props)=>{
    const { record,source,resource } = props;
    console.log(record[source],record,source);
    return <span>{dineroObj(_get(record,source,0)).toFormat('$0,0.00')}</span>
}

export {DineroPrice}