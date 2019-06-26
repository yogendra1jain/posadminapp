import _get from 'lodash/get';

const qtyValidation = (value, allValues) => {
    debugger;
    let totalQuntity = _get(allValues,'itemPackages',[]).reduce((acc, returnObj) => {
        return (acc + returnObj.quantity)
    }, 0);
    let receivedQuantity = allValues.receivedQuantity;

    debugger;

    if (receivedQuantity < (value+totalQuntity)) {
        return `${(value+totalQuntity)-receivedQuantity} exceeded`;
    }
    return undefined;
}


export {
    qtyValidation
}