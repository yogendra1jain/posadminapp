import * as STORE_CONSTANTS from '../constants/store';
import dynamicActionWrapper from '../helpers/actionHelper';

// Action start for post login

let status = '';

const requestPostStore = (subreddit) => ({
    type: STORE_CONSTANTS.REQUEST_STORE_POST,
    subreddit
});

const receivePostStoreError = (subreddit, err, errCode) => ({
    type: STORE_CONSTANTS.RECEIVED_STORE_POST_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

const receivePostStore = (subreddit, json, status) => ({
    type: STORE_CONSTANTS.RECEIVED_STORE_POST,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

// export const fetchPostStore = (subreddit, data,method) => dispatch => {

//     dispatch(requestPostStore(subreddit));

//     fetch(STORE_CONSTANTS.STORE_URL+"/stores", { method: method,
//     headers: {
//         "Content-type": "application/json"
//     },
//     body: JSON.stringify(data)
//     })
//     .then(response => {
//         status = response.status;

//         return response.json() } 
//     )
//     .then(json => { return dispatch(receivePostStore(subreddit, json, status )) } )
//     .catch(err => { return dispatch(receivePostStoreError(subreddit,err,500)) } )
// }

export const fetchPostStore = (subreddit, data, url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: STORE_CONSTANTS.STORE_URL + url,
        method: 'POST',
        body: data,
        initCb: requestPostStore,
        successCb: receivePostStore,
        failureCb: receivePostStoreError,
        subreddit,
        wrapperActionType: 'FETCH_POST_STORE_WRAPPER',
        redirect: 'follow'
    }));

const requestStore = (subreddit) => ({
    type: STORE_CONSTANTS.REQUEST_STORE,
    subreddit
});

const receiveStoreError = (subreddit, err, errCode) => ({
    type: STORE_CONSTANTS.RECEIVED_STORE_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

const receiveStore = (subreddit, json, status) => ({
    type: STORE_CONSTANTS.RECEIVED_STORE,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

// export const fetchStore = (subreddit, data) => dispatch => {

//     dispatch(requestStore(subreddit));

//     fetch(STORE_CONSTANTS.STORE_URL+"/stores/"+data, { method: 'GET',
//     headers: {
//         "Content-type": "application/json"
//     },
//     // body: JSON.stringify(data)
//     })
//     .then(response => {
//         status = response.status;

//         return response.json() } 
//     )
//     .then(json => { return dispatch(receiveStore(subreddit, json, status )) } )
//     .catch(err => { return dispatch(receiveStoreError(subreddit,err,500)) } )
// }

export const fetchStore = (subreddit, url, data) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: STORE_CONSTANTS.STORE_URL + url,
        method: 'POST',
        body: data,
        initCb: requestStore,
        successCb: receiveStore,
        failureCb: receiveStoreError,
        resolve: '',
        reject: '',
        subreddit,
        wrapperActionType: 'FETCH_STORE_WRAPPER',
        redirect: 'follow'
    }));

export const requestStoreUpdate = (subreddit, store) => ({
    type: STORE_CONSTANTS.REQUEST_STORE_UPDATE,
    subreddit,
    data: store
});

const requestAddressFromZip = (subreddit) => ({
    type: STORE_CONSTANTS.REQUEST_ADDRESS_FROM_ZIP,
    subreddit
});

const receiveAddressFromZipError = (subreddit, err, errCode) => ({
    type: STORE_CONSTANTS.RECEIVED_ADDRESS_FROM_ZIP_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

const receiveAddressFromZip = (subreddit, json, status) => ({
    type: STORE_CONSTANTS.RECEIVED_ADDRESS_FROM_ZIP,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

// export const fetchAddressFromZip = (subreddit, zipCode) => dispatch => {

//     dispatch(requestAddressFromZip(subreddit));

//     fetch(STORE_CONSTANTS.STORE_URL+"/zipCodes/"+zipCode+"/details", { method: 'GET',
//     headers: {
//         "Content-type": "application/json"
//     },
//     // body: JSON.stringify(data)
//     })
//     .then(response => {
//         status = response.status;

//         return response.json() } 
//     )
//     .then(json => { return dispatch(receiveAddressFromZip(subreddit, json, status )) } )
//     .catch(err => { return dispatch(receiveAddressFromZipError(subreddit,err,500)) } )
// }

export const fetchAddressFromZip = (subreddit, zipCode) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: STORE_CONSTANTS.STORE_URL + "/zipCodes/" + zipCode + "/details",
        method: 'GET',
        initCb: requestAddressFromZip,
        successCb: receiveAddressFromZip,
        failureCb: receiveAddressFromZipError,
        subreddit,
        wrapperActionType: 'FETCH_ADDRESS_FROM_ZIP_WRAPPER',
        redirect: 'follow'
    }));

const requestStoreList = (subreddit) => ({
    type: STORE_CONSTANTS.REQUEST_STORE,
    subreddit
});

const receiveStoreList = (subreddit, data, status, resolve) => {
    resolve(data);
    return ({
        type: STORE_CONSTANTS.RECEIVED_STORE,
        subreddit,
        data,
        receivedAt: Date.now()
    });
}
const receiveStoreListError = (subreddit, error, status, reject) => {
    reject(error)
    return ({
        type: STORE_CONSTANTS.RECEIVED_STORE_ERROR,
        subreddit,
        error,
        receivedAt: Date.now()
    })
}

export const fetchStoreList = (subreddit, url, data) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(dynamicActionWrapper({
            path: STORE_CONSTANTS.STORE_URL + url,
            method: 'POST',
            body: data,
            initCb: requestStoreList,
            successCb: receiveStoreList,
            failureCb: receiveStoreListError,
            resolve: resolve,
            reject: reject,
            subreddit,
            wrapperActionType: 'FETCH_STORE_LIST_DATA_WRAPPER',
            redirect: 'follow'
        }));
    })
}

//map products with store

const requestMapProductsWithStore = (subreddit) => ({
    type: STORE_CONSTANTS.REQUEST_STORE,
    subreddit
});

const receiveMapProductsWithStoreError = (subreddit, err, errCode) => ({
    type: STORE_CONSTANTS.RECEIVED_STORE_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

const receiveMapProductsWithStore = (subreddit, json, status) => ({
    type: STORE_CONSTANTS.RECEIVED_STORE,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

export const mapProductsWithStore = (subreddit, url, data) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: STORE_CONSTANTS.STORE_URL + url,
        method: 'POST',
        body: data,
        initCb: requestMapProductsWithStore,
        successCb: receiveMapProductsWithStore,
        failureCb: receiveMapProductsWithStoreError,
        resolve: '',
        reject: '',
        subreddit,
        wrapperActionType: 'MAP_PRODUCTS_WITH_STORE_WRAPPER',
        redirect: 'follow'
    }));