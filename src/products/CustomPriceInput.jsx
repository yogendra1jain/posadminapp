
import React from 'react';
import dineroObj from '../Global/Conversion/dineroObj';
import _get from 'lodash/get'
import {
 NumberInput
} from 'react-admin';
import splitDotWithInt from '../Global/Conversion/splitDotWithInt';

const CustomerPriceInput = (props)=>{
    const { record,source,resource } = props;
    console.log(_get(record,source,0),record,source);
    return <NumberInput format={v => dineroObj(v).toUnit(2)} parse={v =>splitDotWithInt(v) } source={source} />
}

export {CustomerPriceInput}