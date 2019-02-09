import * as VENDOR_CONSTANTS from '../constants/vendor';
import dynamicActionWrapper from '../helpers/actionHelper';

// Action start for post login

let status = '';

export const getVendorData = (subreddit, url, data) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: VENDOR_CONSTANTS.MAIN_URL + url,
        method: 'POST',
        body: data,
        initCb: vendorRequest,
        successCb: vendorRecieve,
        failureCb: vendorRecieveError,
        resolve: '',
        reject: '',
        subreddit,
        wrapperActionType: 'FETCH_VENDOR_WRAPPER',
        redirect: 'follow'
    }));

const vendorRequest = (subreddit) => ({
    type: VENDOR_CONSTANTS.VENDOR_REQUEST,
    subreddit
});

const vendorRecieveError = (subreddit, err, errCode) => ({
    type: VENDOR_CONSTANTS.VENDOR_RECIEVE_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

const vendorRecieve = (subreddit, json, status) => ({
    type: VENDOR_CONSTANTS.VENDOR_RECIEVE,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})



export const submitVendorForm = (subreddit, url, data) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: VENDOR_CONSTANTS.MAIN_URL + url,
        method: 'POST',
        body: data,
        initCb: vendorFormRequest,
        successCb: vendorFormRecieve,
        failureCb: vendorFormRecieveError,
        resolve: '',
        reject: '',
        subreddit,
        wrapperActionType: 'VENDOR_FORM_WRAPPER',
        redirect: 'follow'
    }));

const vendorFormRequest = (subreddit) => ({
    type: VENDOR_CONSTANTS.VENDOR_FORM_REQUEST,
    subreddit
});

const vendorFormRecieveError = (subreddit, err, errCode) => ({
    type: VENDOR_CONSTANTS.VENDOR_FORM_RECIEVE_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

const vendorFormRecieve = (subreddit, json, status) => ({
    type: VENDOR_CONSTANTS.VENDOR_FORM_RECIEVE,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

export const requestVendorUpdate = (subreddit, data) => ({
    type: VENDOR_CONSTANTS.REQUEST_VENDOR_UPDATE,
    subreddit,
    data: data
});