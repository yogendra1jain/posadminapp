import * as REPORT_CONSTANTS from '../constants/reports'
import { debug } from 'util';
import dynamicActionWrapper from '../helpers/actionHelper';

let status = '';

export const requestProductVolumeData = subreddit => ({
    type: REPORT_CONSTANTS.REQUEST_PRODUCT_VOLUME_DATA,
    subreddit
})

export const receiveProductVolumeData = (subreddit, json) => ({
    type: REPORT_CONSTANTS.RECEIVE_PRODUCT_VOLUME_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
})

// export const GetProductVolumeData = (subreddit, url) => dispatch => {

//     dispatch(requestProductVolumeData(subreddit));

//     fetch(url, {
//         method: 'GET',
//         headers: {
//             "Content-type": "application/json"
//         },
//         // body: JSON.stringify(data)
//     })
//         .then(response => {
//             status = response.status;

//             return response.json()
//         }
//         )
//         .then(json => { return dispatch(receiveProductVolumeData(subreddit, json, status)) })
//     // .catch(err => { return dispatch(receiveTerminalError(subreddit,err,500)) } )
// }

export const GetProductVolumeData = (subreddit, url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'GET',
        initCb: requestProductVolumeData,
        successCb: receiveProductVolumeData,
        // failureCb: receiveProductLookupDataError,
        subreddit,
        wrapperActionType: 'FETCH_PRODUCT_VOLUME_DATA_WRAPPER',
        redirect: 'follow'
    }));


// export const GetProductVolumeData = (subreddit, url) => dispatch =>
//     dispatch(dynamicActionWrapper({
//         path: url,
//         method: 'Get',
//         initCb: requestProductVolumeData,
//         successCb: receiveProductVolumeData,
//         subreddit,
//         wrapperActionType: 'FETCH_ORGANIZATION_ADD_FORM_WRAPPER',
//         redirect: 'follow'
//     }));

export const requestProductWiseVolumeData = subreddit => ({
    type: REPORT_CONSTANTS.REQUEST_PRODUCT_WISE_VOLUME_DATA,
    subreddit
})

export const receiveProductWiseVolumeData = (subreddit, json) => ({
    type: REPORT_CONSTANTS.RECEIVE_PRODUCT_WISE_VOLUME_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
})

// export const GetProductWiseVolumeData = (subreddit, url) => dispatch => {

//     dispatch(requestProductWiseVolumeData(subreddit));

//     fetch(url, {
//         method: 'GET',
//         headers: {
//             "Content-type": "application/json"
//         },
//         // body: JSON.stringify(data)
//     })
//         .then(response => {
//             status = response.status;

//             return response.json()
//         }
//         )
//         .then(json => { return dispatch(receiveProductWiseVolumeData(subreddit, json, status)) })
//     // .catch(err => { return dispatch(receiveTerminalError(subreddit,err,500)) } )
// }

export const GetProductWiseVolumeData = (subreddit, url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'GET',
        initCb: requestProductWiseVolumeData,
        successCb: receiveProductWiseVolumeData,
        // failureCb: receiveProductLookupDataError,
        subreddit,
        wrapperActionType: 'FETCH_PRODUCT_WISE_VOLUME_DATA_WRAPPER',
        redirect: 'follow'
    }));

export const requestProductWiseProfitData = subreddit => ({
    type: REPORT_CONSTANTS.REQUEST_PRODUCT_WISE_PROFIT_DATA,
    subreddit
})

export const receiveProductWiseProfitData = (subreddit, json) => ({
    type: REPORT_CONSTANTS.RECEIVE_PRODUCT_WISE_PROFIT_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
})

// export const GetProductWiseProfitData = (subreddit, url) => dispatch => {

//     dispatch(requestProductWiseProfitData(subreddit));

//     fetch(url, {
//         method: 'GET',
//         headers: {
//             "Content-type": "application/json"
//         },
//         // body: JSON.stringify(data)
//     })
//         .then(response => {
//             status = response.status;

//             return response.json()
//         }
//         )
//         .then(json => { return dispatch(receiveProductWiseProfitData(subreddit, json, status)) })
//     // .catch(err => { return dispatch(receiveTerminalError(subreddit,err,500)) } )
// }

export const GetProductWiseProfitData = (subreddit, url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'GET',
        initCb: requestProductWiseProfitData,
        successCb: receiveProductWiseProfitData,
        // failureCb: receiveProductLookupDataError,
        subreddit,
        wrapperActionType: 'FETCH_PRODUCT_WISE_PROFIT_DATA_WRAPPER',
        redirect: 'follow'
    }));

export const requestProductRevenueData = subreddit => ({
    type: REPORT_CONSTANTS.REQUEST_PRODUCT_REVENUE_DATA,
    subreddit
})

export const receiveProductRevenueData = (subreddit, json) => ({
    type: REPORT_CONSTANTS.RECEIVE_PRODUCT_REVENUE_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
})

// export const GetProductRevenueData = (subreddit, url) => dispatch => {

//     dispatch(requestProductRevenueData(subreddit));

//     fetch(url, {
//         method: 'GET',
//         headers: {
//             "Content-type": "application/json"
//         },
//         // body: JSON.stringify(data)
//     })
//         .then(response => {
//             status = response.status;

//             return response.json()
//         }
//         )
//         .then(json => { return dispatch(receiveProductRevenueData(subreddit, json, status)) })
//     // .catch(err => { return dispatch(receiveTerminalError(subreddit,err,500)) } )
// }

export const GetProductRevenueData = (subreddit, url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'GET',
        initCb: requestProductRevenueData,
        successCb: receiveProductRevenueData,
        // failureCb: receiveProductLookupDataError,
        subreddit,
        wrapperActionType: 'FETCH_PRODUCT_WISE_PROFIT_REVENUE_WRAPPER',
        redirect: 'follow'
    }));

export const requestProductWiseRevenueData = subreddit => ({
    type: REPORT_CONSTANTS.REQUEST_PRODUCT_WISE_REVENUE_DATA,
    subreddit
})

export const receiveProductWiseRevenueData = (subreddit, json) => ({
    type: REPORT_CONSTANTS.RECEIVE_PRODUCT_WISE_REVENUE_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
})

// export const GetProductWiseRevenueData = (subreddit, url) => dispatch => {

//     dispatch(requestProductWiseRevenueData(subreddit));

//     fetch(url, {
//         method: 'GET',
//         headers: {
//             "Content-type": "application/json"
//         },
//         // body: JSON.stringify(data)
//     })
//         .then(response => {
//             status = response.status;

//             return response.json()
//         }
//         )
//         .then(json => { return dispatch(receiveProductWiseRevenueData(subreddit, json, status)) })
//     // .catch(err => { return dispatch(receiveTerminalError(subreddit,err,500)) } )
// }

export const GetProductWiseRevenueData = (subreddit, url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'GET',
        initCb: requestProductWiseRevenueData,
        successCb: receiveProductWiseRevenueData,
        // failureCb: receiveProductLookupDataError,
        subreddit,
        wrapperActionType: 'FETCH_PRODUCT_WISE_REVENUE_DATA_WRAPPER',
        redirect: 'follow'
    }));

export const requestProductProfitData = subreddit => ({
    type: REPORT_CONSTANTS.REQUEST_PRODUCT_PROFIT_DATA,
    subreddit
})

export const receiveProductProfitData = (subreddit, json) => ({
    type: REPORT_CONSTANTS.RECEIVE_PRODUCT_PROFIT_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
})

// export const GetProductProfitData = (subreddit, url) => dispatch => {

//     dispatch(requestProductProfitData(subreddit));

//     fetch(url, {
//         method: 'GET',
//         headers: {
//             "Content-type": "application/json"
//         },
//         // body: JSON.stringify(data)
//     })
//         .then(response => {
//             status = response.status;

//             return response.json()
//         }
//         )
//         .then(json => { return dispatch(receiveProductProfitData(subreddit, json, status)) })
//     // .catch(err => { return dispatch(receiveTerminalError(subreddit,err,500)) } )
// }

export const GetProductProfitData = (subreddit, url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'GET',
        initCb: requestProductProfitData,
        successCb: receiveProductProfitData,
        // failureCb: receiveProductLookupDataError,
        subreddit,
        wrapperActionType: 'FETCH_PRODUCT_PROFIT_DATA_WRAPPER',
        redirect: 'follow'
    }));

export const requestProductAllData = subreddit => ({
    type: REPORT_CONSTANTS.REQUEST_PRODUCT_ALL_DATA,
    subreddit
})

export const receiveProductAllData = (subreddit, json) => ({
    type: REPORT_CONSTANTS.RECEIVE_PRODUCT_ALL_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
})

// export const GetProductAllData = (subreddit, url) => dispatch => {

//     dispatch(requestProductAllData(subreddit));

//     fetch(url, {
//         method: 'GET',
//         headers: {
//             "Content-type": "application/json"
//         },
//         // body: JSON.stringify(data)
//     })
//         .then(response => {
//             status = response.status;

//             return response.json()
//         }
//         )
//         .then(json => { return dispatch(receiveProductAllData(subreddit, json, status)) })
//     // .catch(err => { return dispatch(receiveTerminalError(subreddit,err,500)) } )
// }

export const GetProductAllData = (subreddit, url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'GET',
        initCb: requestProductAllData,
        successCb: receiveProductAllData,
        // failureCb: receiveProductLookupDataError,
        subreddit,
        wrapperActionType: 'FETCH_PRODUCT_ALL_DATA_WRAPPER',
        redirect: 'follow'
    }));

export const requestCustomerData = subreddit => ({
    type: REPORT_CONSTANTS.REQUEST_CUSTOMER_DATA,
    subreddit
})

export const receiveCustomerData = (subreddit, json) => ({
    type: REPORT_CONSTANTS.RECEIVE_CUSTOMER_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
})

// export const GetCustomerData = (subreddit, url) => dispatch => {

//     dispatch(requestCustomerData(subreddit));

//     fetch(url, {
//         method: 'GET',
//         headers: {
//             "Content-type": "application/json"
//         },
//         // body: JSON.stringify(data)
//     })
//         .then(response => {
//             status = response.status;

//             return response.json()
//         }
//         )
//         .then(json => { return dispatch(receiveCustomerData(subreddit, json, status)) })
//     // .catch(err => { return dispatch(receiveTerminalError(subreddit,err,500)) } )
// }

export const GetCustomerData = (subreddit, url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'GET',
        initCb: requestCustomerData,
        successCb: receiveCustomerData,
        // failureCb: receiveProductLookupDataError,
        subreddit,
        wrapperActionType: 'FETCH_CUSTOMER_DATA_WRAPPER',
        redirect: 'follow'
    }));

export const requestInventoryData = subreddit => ({
    type: REPORT_CONSTANTS.REQUEST_INVENTORY_DATA,
    subreddit
})

export const receiveInventoryData = (subreddit, json) => ({
    type: REPORT_CONSTANTS.RECEIVE_INVENTORY_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
})

// export const GetInventoryData = (subreddit, url) => dispatch => {

//     dispatch(requestInventoryData(subreddit));

//     fetch(url, {
//         method: 'GET',
//         headers: {
//             "Content-type": "application/json"
//         },
//         // body: JSON.stringify(data)
//     })
//         .then(response => {
//             status = response.status;

//             return response.json()
//         }
//         )
//         .then(json => { return dispatch(receiveInventoryData(subreddit, json, status)) })
//     // .catch(err => { return dispatch(receiveTerminalError(subreddit,err,500)) } )
// }

export const GetInventoryData = (subreddit, url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'GET',
        initCb: requestInventoryData,
        successCb: receiveInventoryData,
        // failureCb: receiveProductLookupDataError,
        subreddit,
        wrapperActionType: 'FETCH_INVENTORY_DATA_WRAPPER',
        redirect: 'follow'
    }));

export const requestSaleByStoreData = subreddit => ({
    type: REPORT_CONSTANTS.REQUEST_SALE_BY_STORE_DATA,
    subreddit
})

export const receiveSaleByStoreData = (subreddit, json) => ({
    type: REPORT_CONSTANTS.RECEIVE_SALE_BY_STORE_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
})

// export const GetSaleByStoreData = (subreddit, url) => dispatch => {

//     dispatch(requestSaleByStoreData(subreddit));

//     fetch(url, {
//         method: 'GET',
//         headers: {
//             "Content-type": "application/json"
//         },
//         // body: JSON.stringify(data)
//     })
//         .then(response => {
//             status = response.status;

//             return response.json()
//         }
//         )
//         .then(json => { return dispatch(receiveSaleByStoreData(subreddit, json, status)) })
//     // .catch(err => { return dispatch(receiveTerminalError(subreddit,err,500)) } )
// }

export const requestTopProducts = subreddit => ({
    type: REPORT_CONSTANTS.REQUEST_TOP_PRODUCTS,
    subreddit
})

export const receiveTopProducts = (subreddit, json) => ({
    type: REPORT_CONSTANTS.RECEIVE_TOP_PRODUCTS,
    subreddit,
    data: json,
    receivedAt: Date.now()
})

// export const GetCustomerData = (subreddit, url) => dispatch => {

//     dispatch(requestCustomerData(subreddit));

//     fetch(url, {
//         method: 'GET',
//         headers: {
//             "Content-type": "application/json"
//         },
//         // body: JSON.stringify(data)
//     })
//         .then(response => {
//             status = response.status;

//             return response.json()
//         }
//         )
//         .then(json => { return dispatch(receiveCustomerData(subreddit, json, status)) })
//     // .catch(err => { return dispatch(receiveTerminalError(subreddit,err,500)) } )
// }

export const GetTopProducts = (subreddit, url, data) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'POST',
        body: data,
        initCb: requestTopProducts,
        successCb: receiveTopProducts,
        // failureCb: receiveProductLookupDataError,
        subreddit,
        wrapperActionType: 'FETCH_TOP_PRODUCTS_WRAPPER',
        redirect: 'follow'
    }));












