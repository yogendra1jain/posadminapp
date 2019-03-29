import * as OVERRIDE_CONSTANTS from '../constants/productOverride';
import dynamicActionWrapper from '../helpers/actionHelper';

const initProductOverride = (subreddit)=> ({
    type: OVERRIDE_CONSTANTS.INIT_PRODUCT_OVERRIDE,
    subreddit
});

const receiveProductOverrideError = (subreddit,err,errCode) => ({
    type: OVERRIDE_CONSTANTS.RECEIVE_PRODUCT_OVERRIDE_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

const receiveProductOverride = (subreddit, json, status )=> ({
    type: OVERRIDE_CONSTANTS.RECEIVE_PRODUCT_OVERRIDE,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

export const saveProductOverride = (subreddit, url, data) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: OVERRIDE_CONSTANTS.OVERRIDE_LOOKUP_URL + url,
        method: 'POST',
        body: data,
        initCb: initProductOverride,
        successCb: receiveProductOverride,
        failureCb: receiveProductOverrideError,
        subreddit,
        wrapperActionType: 'FETCH_SEND_SELECTED_PRODUCTS_WRAPPER',
        redirect: 'follow'
    }));

export const sendSelectedProducts = (data) => ({
    type: 'SEND_SELECTED_PRODUCTS',
    data
})

const requestProductData = (subreddit)=> ({
    type: OVERRIDE_CONSTANTS.INIT_PRODUCT_OVERRIDE,
    subreddit
});

const receiveProductDataError = (subreddit,err,errCode) => ({
    type: OVERRIDE_CONSTANTS.RECEIVE_PRODUCT_DATA_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

const receiveProductData = (subreddit, json, status )=> ({
    type: OVERRIDE_CONSTANTS.RECEIVE_PRODUCT_DATA,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

export const fetchProductData = (subreddit, url, data) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: OVERRIDE_CONSTANTS.OVERRIDE_LOOKUP_URL + url,
        method: 'POST',
        body: data,
        initCb: requestProductData,
        successCb: receiveProductData,
        failureCb: receiveProductDataError,
        subreddit,
        wrapperActionType: 'FETCH_PRODUCT_DATA',
        redirect: 'follow'
    }));