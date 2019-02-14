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



const requestRequisitionForm = (subreddit) => ({
    type: VENDOR_CONSTANTS.REQUEST_REQUISITION_SAVE,
    subreddit
});

const receiveRequisitionForm = (subreddit, data, status, resolve) => {
    resolve(data);
    return ({
        type: VENDOR_CONSTANTS.RECIEVE_REQUISITION_SAVE,
        subreddit,
        data,
        receivedAt: Date.now()
    });
}
const receiveRequisitionFormError = (subreddit, error, status, reject) => {
    reject(error)
    return ({
        type: VENDOR_CONSTANTS.RECIEVE_REQUISITION_SAVE_ERROR,
        subreddit,
        error,
        receivedAt: Date.now()
    })
} 

export const saveRequisitionForm = (subreddit, url, data) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(dynamicActionWrapper({
            path: VENDOR_CONSTANTS.MAIN_URL + url,
            method: 'POST',
            body: data,
            initCb: requestRequisitionForm,
            successCb: receiveRequisitionForm,
            failureCb: receiveRequisitionFormError,
            resolve: resolve,
            reject: reject,
            subreddit,
            wrapperActionType: 'FETCH_PRODUCT_LOOKUP_DATA_WRAPPER',
            redirect: 'follow'
        }));
    })
}


const requestRequisitionList = (subreddit) => ({
    type: VENDOR_CONSTANTS.REQUEST_REQUISITION_LIST,
    subreddit
});

const receiveRequisitionList = (subreddit, data, status, resolve) => {
    resolve(data);
    return ({
        type: VENDOR_CONSTANTS.RECIEVE_REQUISITION_LIST,
        subreddit,
        data,
        receivedAt: Date.now()
    });
}
const receiveRequisitionListError = (subreddit, error, status, reject) => {
    reject(error)
    return ({
        type: VENDOR_CONSTANTS.RECIEVE_REQUISITION_LIST_ERROR,
        subreddit,
        error,
        receivedAt: Date.now()
    })
} 

export const fetchRequisitionList = (subreddit, url, data) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(dynamicActionWrapper({
            path: VENDOR_CONSTANTS.MAIN_URL + url,
            method: 'POST',
            body: data,
            initCb: requestRequisitionList,
            successCb: receiveRequisitionList,
            failureCb: receiveRequisitionListError,
            resolve: resolve,
            reject: reject,
            subreddit,
            wrapperActionType: 'FETCH_PRODUCT_LOOKUP_DATA_WRAPPER',
            redirect: 'follow'
        }));
    })
}