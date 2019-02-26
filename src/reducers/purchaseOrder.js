import {
    combineReducers
} from 'redux';
import _get from 'lodash/get';
import _cloneDeep from 'lodash/cloneDeep';
import _set from 'lodash/set';
import {
    REQUEST_PURCHASE_ORDERS,
    RECEIVE_PURCHASE_ORDERS,
    RECEIVE_PURCHASE_ORDERS_ERROR,
    REQUEST_PURCHASE_ORDER_SAVE,
    RECEIVE_PURCHASE_ORDER_SAVE,
    RECEIVE_PURCHASE_ORDER_SAVE_ERROR,
    REQUEST_PURCHASE_ORDER_BY_ID,
    RECEIVE_PURCHASE_ORDER_BY_ID,
    RECEIVE_PURCHASE_ORDER_BY_ID_ERROR,
    REQUEST_PO_REQUISITION_UPDATE,
    SET_PO_VIEW_FLAG,
    REQUEST_PURCHASE_ORDER_RECIEPT_BY_ID,
    RECEIVE_PURCHASE_ORDER_RECIEPT_BY_ID,
    RECEIVE_PURCHASE_ORDER_RECIEPT_BY_ID_ERROR,
    REQUEST_PO_RECIEPT_REQUISITION_UPDATE,
} from '../constants/purchaseOrder';

const purchaseOrderReducer = (state = 'purchaseOrderState', action) => {
    switch (action.type) {
        default:
            return state
    }
}


const purchaseOrderData = (state = {
    isFetching: false,
    didInvalidate: false,
    type: '',
    status: '',
    purchaseOrderList: [],
    purchaseOrderDataSave: {},
    purchaseOrderById: {},
    purchaseOrderRecieptById: {},
    isPOViewFlag: false,
}, action) => {
    switch (action.type) {
        case REQUEST_PURCHASE_ORDERS:
            return Object.assign({}, state, {
                isFetching: true,
                vendorData: [],
                type: action.type,
                lastUpdated: action.receivedAt
            });
        case RECEIVE_PURCHASE_ORDERS:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                status: action.status,
                didInvalidate: false,
                purchaseOrderList: action.data,
                lastUpdated: action.receivedAt
            });
        case RECEIVE_PURCHASE_ORDERS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                status: action.status,
                didInvalidate: false,
                lastUpdated: action.receivedAt
            });
        case REQUEST_PURCHASE_ORDER_SAVE:
            return Object.assign({}, state, {
                isFetching: true,
                vendorData: [],
                type: action.type,
                lastUpdated: action.receivedAt
            });
        case RECEIVE_PURCHASE_ORDER_SAVE:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                status: action.status,
                didInvalidate: false,
                purchaseOrderDataSave: action.data,
                lastUpdated: action.receivedAt
            });
        case RECEIVE_PURCHASE_ORDER_SAVE_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                status: action.status,
                didInvalidate: false,
                lastUpdated: action.receivedAt
            });
        case REQUEST_PURCHASE_ORDER_BY_ID:
            return Object.assign({}, state, {
                isFetching: true,
                vendorData: [],
                type: action.type,
                lastUpdated: action.receivedAt
            });
        case RECEIVE_PURCHASE_ORDER_BY_ID:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                status: action.status,
                didInvalidate: false,
                purchaseOrderById: action.data,
                lastUpdated: action.receivedAt
            });
        case RECEIVE_PURCHASE_ORDER_BY_ID_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                status: action.status,
                didInvalidate: false,
                lastUpdated: action.receivedAt
            });
        case REQUEST_PO_REQUISITION_UPDATE:
            let tempPO = _cloneDeep(_get(state, 'purchaseOrderById', []));
            let index = action.index;
            _set(tempPO, `requisitions[${index}].quantity`, action.quantity);
            _set(tempPO, `requisitions[${index}].proposedQuantity`, action.proposedQuantity);
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                status: action.status,
                didInvalidate: false,
                purchaseOrderById: tempPO,
                lastUpdated: action.receivedAt
            });
        case SET_PO_VIEW_FLAG:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                status: action.status,
                didInvalidate: false,
                isPOViewFlag: action.isView,
                lastUpdated: action.receivedAt
            });
        case REQUEST_PURCHASE_ORDER_RECIEPT_BY_ID:
            return Object.assign({}, state, {
                isFetching: true,
                vendorData: [],
                type: action.type,
                lastUpdated: action.receivedAt
            });
        case RECEIVE_PURCHASE_ORDER_RECIEPT_BY_ID:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                status: action.status,
                didInvalidate: false,
                purchaseOrderRecieptById: action.data,
                lastUpdated: action.receivedAt
            });
        case RECEIVE_PURCHASE_ORDER_RECIEPT_BY_ID_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                status: action.status,
                didInvalidate: false,
                lastUpdated: action.receivedAt
            });
        case REQUEST_PO_RECIEPT_REQUISITION_UPDATE:
            let tempPOReciept = _cloneDeep(_get(state, 'purchaseOrderById', {}));
            index = action.index;
            _set(tempPOReciept, `requisitions[${index}].fulfilledQuantity`, Number(action.quantity));
            // _set(tempPOReciept, `requisitions[${index}].proposedQuantity`, action.proposedQuantity);
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                status: action.status,
                didInvalidate: false,
                purchaseOrderById: tempPOReciept,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}


export {
    purchaseOrderData
}

export default purchaseOrderReducer;