import _get from 'lodash/get';

const qtyValidation = (value, allValues,quantity) => {
    debugger;
    let totalQuntity = _get(allValues,'itemPackages',[]).reduce((acc, returnObj) => {
        return (acc + returnObj.quantity)
    }, 0);
    let receivedQuantity =quantity;

    debugger;

    if (receivedQuantity < (value+totalQuntity)) {
        return `${(totalQuntity)-receivedQuantity} exceeded`;
    }
    return undefined;
}


export {
    qtyValidation
}