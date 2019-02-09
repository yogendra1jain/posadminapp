import * as CUSTOMER_CONSTANTS from '../constants/customer';
import dynamicActionWrapper from '../helpers/actionHelper';

// Action start for post login

let status = '';

export const getCustomerData = (subreddit, url, data) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: CUSTOMER_CONSTANTS.MAIN_URL + url,
        method: 'POST',
        body: data,
        initCb: customerRequest,
        successCb: customerRecieve,
        failureCb: customerRecieveError,
        resolve: '',
        reject: '',
        subreddit,
        wrapperActionType: 'FETCH_CUSTOMER_WRAPPER',
        redirect: 'follow'
    }));

const customerRequest = (subreddit) => ({
    type: CUSTOMER_CONSTANTS.CUSTOMER_REQUEST,
    subreddit
});

const customerRecieveError = (subreddit, err, errCode) => ({
    type: CUSTOMER_CONSTANTS.CUSTOMER_RECIEVE_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

const customerRecieve = (subreddit, json, status) => ({
    type: CUSTOMER_CONSTANTS.CUSTOMER_RECIEVE,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})



export const submitCustomerForm = (subreddit, url, data) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: CUSTOMER_CONSTANTS.MAIN_URL + url,
        method: 'POST',
        body: data,
        initCb: customerFormRequest,
        successCb: customerFormRecieve,
        failureCb: customerFormRecieveError,
        resolve: '',
        reject: '',
        subreddit,
        wrapperActionType: 'CUSTOMER_FORM_WRAPPER',
        redirect: 'follow'
    }));

const customerFormRequest = (subreddit) => ({
    type: CUSTOMER_CONSTANTS.CUSTOMER_FORM_REQUEST,
    subreddit
});

const customerFormRecieveError = (subreddit, err, errCode) => ({
    type: CUSTOMER_CONSTANTS.CUSTOMER_FORM_RECIEVE_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

const customerFormRecieve = (subreddit, json, status) => ({
    type: CUSTOMER_CONSTANTS.CUSTOMER_FORM_RECIEVE,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

export const requestCustomerUpdate = (subreddit, data) => ({
    type: CUSTOMER_CONSTANTS.REQUEST_CUSTOMER_UPDATE,
    subreddit,
    data: data
});