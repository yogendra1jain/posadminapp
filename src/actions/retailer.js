import * as RETAILER_CONSTANTS from '../constants/retailer';
import dynamicActionWrapper from '../helpers/actionHelper';

const requestRetailerList = (subreddit) => ({
    type: RETAILER_CONSTANTS.REQUEST_RETAILER_LIST,
    subreddit
});

const receiveRetailerList = (subreddit, data, status, resolve) => {
    resolve(data);
    return ({
        type: RETAILER_CONSTANTS.RECIEVE_RETAILER_LIST,
        subreddit,
        data,
        receivedAt: Date.now()
    });
}
const receiveRetailerListError = (subreddit, error, status, reject) => {
    reject(error)
    return ({
        type: RETAILER_CONSTANTS.RECIEVE_RETAILER_LIST_ERROR,
        subreddit,
        error,
        receivedAt: Date.now()
    })
} 

export const fetchRetailerList = (subreddit, url, data) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(dynamicActionWrapper({
            path: RETAILER_CONSTANTS.MAIN_URL + url,
            method: 'POST',
            body: data,
            initCb: requestRetailerList,
            successCb: receiveRetailerList,
            failureCb: receiveRetailerListError,
            resolve: resolve,
            reject: reject,
            subreddit,
            wrapperActionType: 'FETCH_REQUEST_RETAILER_LIST_WRAPPER',
            redirect: 'follow'
        }));
    })
}

const requestSaveRetailerData = (subreddit) => ({
    type: RETAILER_CONSTANTS.REQUEST_SAVE_RETAILER_DATA,
    subreddit
});

const receiveSaveRetailerData = (subreddit, data, status, resolve) => {
    resolve(data);
    return ({
        type: RETAILER_CONSTANTS.RECIEVE_SAVE_RETAILER_DATA,
        subreddit,
        data,
        receivedAt: Date.now()
    });
}

const receiveSaveRetailerDataError = (subreddit, error, status, reject) => {
    reject(error)
    return ({
        type: RETAILER_CONSTANTS.RECIEVE_SAVE_RETAILER_DATA_ERROR,
        subreddit,
        error,
        receivedAt: Date.now()
    })
} 

export const saveRetailerData = (subreddit, url, data) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(dynamicActionWrapper({
            path: RETAILER_CONSTANTS.MAIN_URL + url,
            method: 'POST',
            body: data,
            initCb: requestSaveRetailerData,
            successCb: receiveSaveRetailerData,
            failureCb: receiveSaveRetailerDataError,
            resolve: resolve,
            reject: reject,
            subreddit,
            wrapperActionType: 'FETCH_REQUEST_SAVE_RETAILER_DATA_WRAPPER',
            redirect: 'follow'
        }));
    })
}