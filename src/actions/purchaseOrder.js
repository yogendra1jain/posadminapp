import * as PURCHASE_ORDER_CONSTANT from '../constants/purchaseOrder';
import dynamicActionWrapper from '../helpers/actionHelper';


const requestPurchaseOrders = (subreddit) => ({
    type: PURCHASE_ORDER_CONSTANT.REQUEST_PURCHASE_ORDERS,
    subreddit
});

const receivePurchaseOrders = (subreddit, data, status, resolve) => {
    resolve(data);
    return ({
        type: PURCHASE_ORDER_CONSTANT.RECEIVE_PURCHASE_ORDERS,
        subreddit,
        data,
        receivedAt: Date.now()
    });
}
const receivePurchaseOrdersError = (subreddit, error, status, reject) => {
    reject(error)
    return ({
        type: PURCHASE_ORDER_CONSTANT.RECEIVE_PURCHASE_ORDERS_ERROR,
        subreddit,
        error,
        receivedAt: Date.now()
    })
} 

export const fetchPurchaseOrders = (subreddit, url, data) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(dynamicActionWrapper({
            path: PURCHASE_ORDER_CONSTANT.PURCHASE_ORDERS_URL + url,
            method: 'POST',
            body: data,
            initCb: requestPurchaseOrders,
            successCb: receivePurchaseOrders,
            failureCb: receivePurchaseOrdersError,
            resolve: resolve,
            reject: reject,
            subreddit,
            wrapperActionType: 'FETCH_PURCHASE_ORDERS_WRAPPER',
            redirect: 'follow'
        }));
    })
}



const requestPurchaseOrderSave = (subreddit) => ({
    type: PURCHASE_ORDER_CONSTANT.REQUEST_PURCHASE_ORDER_SAVE,
    subreddit
});

const receivePurchaseOrderSave = (subreddit, data, status, resolve) => {
    resolve(data);
    return ({
        type: PURCHASE_ORDER_CONSTANT.RECEIVE_PURCHASE_ORDER_SAVE,
        subreddit,
        data,
        receivedAt: Date.now()
    });
}
const receivePurchaseOrderSaveError = (subreddit, error, status, reject) => {
    reject(error)
    return ({
        type: PURCHASE_ORDER_CONSTANT.RECEIVE_PURCHASE_ORDER_SAVE_ERROR,
        subreddit,
        error,
        receivedAt: Date.now()
    })
} 

export const purchaseOrderSave = (subreddit, url, data) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(dynamicActionWrapper({
            path: PURCHASE_ORDER_CONSTANT.PURCHASE_ORDERS_URL + url,
            method: 'POST',
            body: data,
            initCb: requestPurchaseOrderSave,
            successCb: receivePurchaseOrderSave,
            failureCb: receivePurchaseOrderSaveError,
            resolve: resolve,
            reject: reject,
            subreddit,
            wrapperActionType: 'FETCH_PURCHASE_ORDERS_WRAPPER',
            redirect: 'follow'
        }));
    })
}

const requestPurchaseOrderById = (subreddit) => ({
    type: PURCHASE_ORDER_CONSTANT.REQUEST_PURCHASE_ORDER_BY_ID,
    subreddit
});

const receivePurchaseOrderById = (subreddit, data, status, resolve) => {
    resolve(data);
    return ({
        type: PURCHASE_ORDER_CONSTANT.RECEIVE_PURCHASE_ORDER_BY_ID,
        subreddit,
        data,
        receivedAt: Date.now()
    });
}
const receivePurchaseOrderByIdError = (subreddit, error, status, reject) => {
    reject(error)
    return ({
        type: PURCHASE_ORDER_CONSTANT.RECEIVE_PURCHASE_ORDER_BY_ID_ERROR,
        subreddit,
        error,
        receivedAt: Date.now()
    })
} 

export const fetchPurchaseOrderById = (subreddit, url, data) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(dynamicActionWrapper({
            path: PURCHASE_ORDER_CONSTANT.PURCHASE_ORDERS_URL + url,
            method: 'POST',
            body: data,
            initCb: requestPurchaseOrderById,
            successCb: receivePurchaseOrderById,
            failureCb: receivePurchaseOrderByIdError,
            resolve: resolve,
            reject: reject,
            subreddit,
            wrapperActionType: 'FETCH_PURCHASE_ORDERS_WRAPPER',
            redirect: 'follow'
        }));
    })
}



export const requestPORequisitionUpdate = (subreddit, quantity, index, proposedQuantity) => ({
    type: PURCHASE_ORDER_CONSTANT.REQUEST_PO_REQUISITION_UPDATE,
    subreddit,
    quantity: quantity,
    index: index,
    proposedQuantity: proposedQuantity,
});

export const setPOViewFlag = (subreddit, isView) => ({
    type: PURCHASE_ORDER_CONSTANT.SET_PO_VIEW_FLAG,
    subreddit,
    isView: isView,
});


const requestPurchaseOrderRecieptById = (subreddit) => ({
    type: PURCHASE_ORDER_CONSTANT.REQUEST_PURCHASE_ORDER_RECIEPT_BY_ID,
    subreddit
});

const receivePurchaseOrderRecieptById = (subreddit, data, status, resolve) => {
    resolve(data);
    return ({
        type: PURCHASE_ORDER_CONSTANT.RECEIVE_PURCHASE_ORDER_RECIEPT_BY_ID,
        subreddit,
        data,
        receivedAt: Date.now()
    });
}
const receivePurchaseOrderRecieptByIdError = (subreddit, error, status, reject) => {
    reject(error)
    return ({
        type: PURCHASE_ORDER_CONSTANT.RECEIVE_PURCHASE_ORDER_RECIEPT_BY_ID_ERROR,
        subreddit,
        error,
        receivedAt: Date.now()
    })
} 

export const fetchPurchaseOrderRecieptById = (subreddit, url, data) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(dynamicActionWrapper({
            path: PURCHASE_ORDER_CONSTANT.PURCHASE_ORDERS_URL + url,
            method: 'POST',
            body: data,
            initCb: requestPurchaseOrderRecieptById,
            successCb: receivePurchaseOrderRecieptById,
            failureCb: receivePurchaseOrderRecieptByIdError,
            resolve: resolve,
            reject: reject,
            subreddit,
            wrapperActionType: 'FETCH_PURCHASE_ORDERS_WRAPPER',
            redirect: 'follow'
        }));
    })
}

export const requestPORecieptRequisitionUpdate = (subreddit, quantity, index) => ({
    type: PURCHASE_ORDER_CONSTANT.REQUEST_PO_RECIEPT_REQUISITION_UPDATE,
    subreddit,
    quantity: quantity,
    index: index,
});