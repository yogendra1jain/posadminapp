import * as PRODUCT_CONSTANT from '../constants/products';
import dynamicActionWrapper from '../helpers/actionHelper';
import {
    debug
} from 'util';

let status = '';
//upload document
export const uploadDocumentAction = (subreddit) => ({
    type: "UPLOAD_DOCUMENT",
    subreddit
});

export const receivedDocumentUploadResponse = (subreddit, data) => ({
    type: "RECEIVED_DOCUMENT_UPLOAD_SUCCESS_RESPONSE",
    subreddit,
    data,
    receivedAt: Date.now()
});

export const receivedDocumentUploadError = (subreddit, error) => ({
    type: "RECEIVED_DOCUMENT_UPLOAD_ERROR",
    subreddit,
    error,
    receivedAt: Date.now()
});

export const uploadDocument = (file, url, subreddit) => (dispatch) => {
    const formData = new FormData();
    // formData.append('file', file);
    formData.append('userpic', file, 'chris.jpg');
    console.log(formData, 'formData')
    // formData.append('folderName', file.folderName);
    dispatch(uploadDocumentAction(subreddit));
    fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(json => dispatch(receivedDocumentUploadResponse(subreddit, json)))
        .catch(e => dispatch(receivedDocumentUploadError(subreddit, e)))
}


export const requestProductData = subreddit => ({
    type: PRODUCT_CONSTANT.REQUEST_PRODUCT_DATA,
    subreddit
})

export const receiveProductData = (subreddit, json, status) => ({
    type: PRODUCT_CONSTANT.RECEIVE_PRODUCT_DATA,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

// export const ProductDataSave  = (data,subreddit,saveProductURL, method) => dispatch => {
//     dispatch(requestProductData(subreddit));
//     fetch(saveProductURL , { 
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
//     .then(json => dispatch(receiveProductData(subreddit, json, status)))
// }

export const ProductDataSave = (data, subreddit, saveProductURL, method) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: saveProductURL,
        method: 'POST',
        body: data,
        initCb: requestProductData,
        successCb: receiveProductData,
        // failureCb: receivePosTerminalStatusError,
        subreddit,
        wrapperActionType: 'FETCH_PRODUCT_WRAPPER',
        redirect: 'follow'
    }));

const requestProductLookupData = (subreddit) => ({
    type: PRODUCT_CONSTANT.REQUEST_PRODUCT_LOOKUP_DATA,
    subreddit
});

const receiveProductLookupData = (subreddit, data) => ({
    type: PRODUCT_CONSTANT.RECEIVE_PRODUCT_LOOKUP_DATA,
    subreddit,
    data,
    receivedAt: Date.now()
});
const receiveProductLookupDataError = (subreddit, error) => ({
    type: PRODUCT_CONSTANT.RECEIVE_PRODUCT_LOOKUP_DATA_ERROR,
    subreddit,
    error,
    receivedAt: Date.now()
})

// Lookup data call
// export const fetchProductLookupData = (subreddit, url) => dispatch => {
//     dispatch(requestProductLookupData(subreddit))

//     return fetch( PRODUCT_CONSTANT.PRODUCT_LOOKUP_URL+url,
//         { method: 'GET', redirect: 'follow' })
//         .then(response => response.json())
//         .then(json => { return dispatch(receiveProductLookupData(subreddit, json)) })
//         .catch((err, status) => dispatch(
//             receiveProductLookupDataError(subreddit,
//                 err || new Error('Something Went Wrong'),
//                 status || 500)))
// }

export const fetchProductLookupData = (subreddit, url, data) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: PRODUCT_CONSTANT.PRODUCT_LOOKUP_URL + url,
        method: 'POST',
        body: data,
        initCb: requestProductLookupData,
        successCb: receiveProductLookupData,
        failureCb: receiveProductLookupDataError,
        resolve: '',
        reject: '',
        subreddit,
        wrapperActionType: 'FETCH_PRODUCT_LOOKUP_DATA_WRAPPER',
        redirect: 'follow'
    }));

export const requestProductUpdate = (subreddit, product) => ({
    type: PRODUCT_CONSTANT.REQUEST_PRODUCT_UPDATE,
    subreddit,
    data: product
});

// Fetch Level1 Category Reducer

const requestLevel1Category = (subreddit) => ({
    type: PRODUCT_CONSTANT.REQUEST_LEVEL1_CATEGORY_DATA,
    subreddit
});

const receiveLevel1Category = (subreddit, data) => ({
    type: PRODUCT_CONSTANT.RECEIVE_LEVEL1_CATEGORY_DATA,
    subreddit,
    data,
    receivedAt: Date.now()
});

const receiveLeve1CategoryError = (subreddit, error) => ({
    type: PRODUCT_CONSTANT.RECEIVE_LEVEL1_CATEGORY_DATA_ERROR,
    subreddit,
    error,
    receivedAt: Date.now()
})

export const fetchLevel1Category = (subreddit, url, data) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: PRODUCT_CONSTANT.PRODUCT_LOOKUP_URL+url,
        method: 'POST',
        body: data,
        initCb: requestLevel1Category,
        successCb: receiveLevel1Category,
        failureCb: receiveLeve1CategoryError,
        resolve: '',
        reject: '',
        subreddit,
        wrapperActionType: 'FETCH_LEVEL1_CATEGORY_DATA',
        redirect: 'follow'
    }));

// Fetch Level2 Category Reducer

const requestLevel2Category = (subreddit) => ({
type: PRODUCT_CONSTANT.REQUEST_LEVEL2_CATEGORY_DATA,
subreddit
});

const receiveLevel2Category = (subreddit, data) => ({
type: PRODUCT_CONSTANT.RECEIVE_LEVEL2_CATEGORY_DATA,
subreddit,
data,
receivedAt: Date.now()
});

const receiveLeve2CategoryError = (subreddit, error) => ({
type: PRODUCT_CONSTANT.RECEIVE_LEVEL2_CATEGORY_DATA_ERROR,
subreddit,
error,
receivedAt: Date.now()
})

export const fetchLevel2Category = (subreddit, url, data) => dispatch =>
dispatch(dynamicActionWrapper({
    path: PRODUCT_CONSTANT.PRODUCT_LOOKUP_URL+url,
    method: 'POST',
    body: data,
    initCb: requestLevel2Category,
    successCb: receiveLevel2Category,
    failureCb: receiveLeve2CategoryError,
    resolve: '',
    reject: '',
    subreddit,
    wrapperActionType: 'FETCH_LEVEL2_CATEGORY_DATA',
    redirect: 'follow'
}));

// Fetch Level3 Category Reducer

const requestLevel3Category = (subreddit) => ({
    type: PRODUCT_CONSTANT.REQUEST_LEVEL3_CATEGORY_DATA,
    subreddit
});

const receiveLevel3Category = (subreddit, data) => ({
    type: PRODUCT_CONSTANT.RECEIVE_LEVEL3_CATEGORY_DATA,
    subreddit,
    data,
    receivedAt: Date.now()
});

const receiveLeve3CategoryError = (subreddit, error) => ({
    type: PRODUCT_CONSTANT.RECEIVE_LEVEL3_CATEGORY_DATA_ERROR,
    subreddit,
    error,
    receivedAt: Date.now()
})

export const fetchLevel3Category = (subreddit, url, data) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: PRODUCT_CONSTANT.PRODUCT_LOOKUP_URL+url,
        method: 'POST',
        body: data,
        initCb: requestLevel3Category,
        successCb: receiveLevel3Category,
        failureCb: receiveLeve3CategoryError,
        resolve: '',
        reject: '',
        subreddit,
        wrapperActionType: 'FETCH_LEVEL3_CATEGORY_DATA',
        redirect: 'follow'
    }));



const requestVendorProducts = (subreddit) => ({
    type: PRODUCT_CONSTANT.REQUEST_VENDOR_PRODUCTS,
    subreddit
});

const receiveVendorProducts = (subreddit, data, status, resolve) => {
    resolve(data);
    return ({
        type: PRODUCT_CONSTANT.RECEIVE_VENDOR_PRODUCTS,
        subreddit,
        data,
        receivedAt: Date.now()
    });
}
const receiveVendorProductsError = (subreddit, error, status, reject) => {
    reject(error)
    return ({
        type: PRODUCT_CONSTANT.RECEIVE_VENDOR_PRODUCTS_ERROR,
        subreddit,
        error,
        receivedAt: Date.now()
    })
} 

export const fetchVendorProducts = (subreddit, url, data) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(dynamicActionWrapper({
            path: PRODUCT_CONSTANT.PRODUCT_LOOKUP_URL + url,
            method: 'POST',
            body: data,
            initCb: requestVendorProducts,
            successCb: receiveVendorProducts,
            failureCb: receiveVendorProductsError,
            resolve: resolve,
            reject: reject,
            subreddit,
            wrapperActionType: 'FETCH_PRODUCT_LOOKUP_DATA_WRAPPER',
            redirect: 'follow'
        }));
    })
}
