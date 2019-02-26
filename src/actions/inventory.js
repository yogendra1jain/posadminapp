import * as INVENTORY_CONSTANT from '../constants/inventory'
import { debug } from 'util';
import dynamicActionWrapper from '../helpers/actionHelper';

let status = '';


export const requestInventoryData = subreddit => ({
    type: INVENTORY_CONSTANT.REQUEST_INVENTORY_DATA,
    subreddit
})

export const receiveInventoryData = (subreddit, json, status) => ({
    type: INVENTORY_CONSTANT.RECEIVE_INVENTORY_DATA,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

// export const InventoryDataSave  = (data,subreddit,saveProductURL, method) => dispatch => {
//     dispatch(requestInventoryData(subreddit));
//     fetch(INVENTORY_CONSTANT.INVENTORY_URL+'/inventories' , { 
//       method: method,
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data),
//     })
//     .then(response => {
//         status = response.status;

//         return response.json() } 
//     )
//     .then(json => dispatch(receiveInventoryData(subreddit, json, status)))
// }

export const InventoryDataSave = (data, subreddit, saveProductURL, method) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: INVENTORY_CONSTANT.INVENTORY_URL + '/inventories',
        method: method,
        body: data,
        initCb: requestInventoryData,
        successCb: receiveInventoryData,
        subreddit,
        wrapperActionType: 'FETCH_INVENTORY_DATA_WRAPPER',
        redirect: 'follow'
    }));

const requestInventoryLookupData = (subreddit) => ({
    type: INVENTORY_CONSTANT.REQUEST_INVENTORY_LOOKUP_DATA,
    subreddit
});

const receiveInventoryLookupData = (subreddit, data) => ({
    type: INVENTORY_CONSTANT.RECEIVE_INVENTORY_LOOKUP_DATA,
    subreddit,
    data,
    receivedAt: Date.now()
});
const receiveInventoryLookupDataError = (subreddit, error) => ({
    type: INVENTORY_CONSTANT.RECEIVE_INVENTORY_LOOKUP_DATA_ERROR,
    subreddit,
    error,
    receivedAt: Date.now()
})

// Lookup data call
// export const fetchInventoryLookupData = (subreddit, url) => dispatch => {
//     dispatch(requestInventoryLookupData(subreddit))

//     return fetch(INVENTORY_CONSTANT.INVENTORY_URL + url,
//         { method: 'GET', redirect: 'follow' })
//         .then(response => response.json())
//         .then(json => { return dispatch(receiveInventoryLookupData(subreddit, json)) })
//         .catch((err, status) => dispatch(
//             receiveInventoryLookupDataError(subreddit,
//                 err || new Error('Something Went Wrong'),
//                 status || 500)))
// }

export const fetchInventoryLookupData = (subreddit, url, data) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: INVENTORY_CONSTANT.INVENTORY_URL + url,
        body: data,
        method: 'POST',
        initCb: requestInventoryLookupData,
        successCb: receiveInventoryLookupData,
        failureCb: receiveInventoryLookupDataError,
        subreddit,
        wrapperActionType: 'FETCH_INVENTORY_LOOKUP_DATA_WRAPPER',
        redirect: 'follow'
    }));

export const invetoryUpdate = (subreddit, url, data) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: INVENTORY_CONSTANT.INVENTORY_URL + url,
        body: data,
        method: 'POST',
        initCb: requestInventoryUpdate,
        successCb: receiveInventoryUpdate,
        failureCb: receiveInventoryUpdateError,
        subreddit,
        wrapperActionType: 'INVENTORY_UPDATE',
        redirect: 'follow'
    }));
const requestInventoryUpdate = (subreddit) => ({
    type: INVENTORY_CONSTANT.REQUEST_INVENTORY_UPDATE,
    subreddit
});

const receiveInventoryUpdate = (subreddit, data) => ({
    type: INVENTORY_CONSTANT.RECEIVE_INVENTORY_UPDATE,
    subreddit,
    data,
    receivedAt: Date.now()
});
const receiveInventoryUpdateError = (subreddit, error) => ({
    type: INVENTORY_CONSTANT.RECEIVE_INVENTORY_UPDATE_ERROR,
    subreddit,
    error,
    receivedAt: Date.now()
})





