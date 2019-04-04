import * as POS_TERMINAL from '../constants/posTerminal';
import dynamicActionWrapper from '../helpers/actionHelper';

// Action start for post login

let status = '';

const requestPosTerminalList = (subreddit) => ({
    type: POS_TERMINAL.REQUEST_POS_TERMINAL_LIST,
    subreddit
});

const receivePosTerminalListError = (subreddit, err, errCode) => ({
    type: POS_TERMINAL.RECEIVED_POS_TERMINAL_LIST_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

const receivePosTerminalList = (subreddit, json, status) => ({
    type: POS_TERMINAL.RECEIVED_POS_TERMINAL_LIST,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

// export const fetchPosTerminalList = (subreddit,url) => dispatch => {

//     dispatch(requestPosTerminalList(subreddit));

//     fetch(POS_TERMINAL.POS_TERMINAL_URL+url, { method: 'GET',
//     headers: {
//         "Content-type": "application/json"
//     },
//     // body: JSON.stringify(data)
//     })
//     .then(response => {
//         status = response.status;

//         return response.json() } 
//     )
//     .then(json => { return dispatch(receivePosTerminalList(subreddit, json, status )) } )
//     .catch(err => { return dispatch(receivePosTerminalListError(subreddit,err,500)) } )
// }

export const fetchPosTerminalList = (subreddit, url, data) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: POS_TERMINAL.POS_TERMINAL_URL + url,
        method: 'POST',
        body: data,
        initCb: requestPosTerminalList,
        successCb: receivePosTerminalList,
        failureCb: receivePosTerminalListError,
        subreddit,
        wrapperActionType: 'FETCH_TERMINALS_WRAPPER',
        redirect: 'follow'
    }));

const requestPosTerminalData = (subreddit) => {
    return ({
        type: POS_TERMINAL.REQUEST_POS_TERMINAL_DATA,
        subreddit
    });
}

const receivePosTerminalDataError = (subreddit, err, errCode, reject) => {
    reject(errCode)
    return ({
        type: POS_TERMINAL.RECEIVED_POS_TERMINAL_DATA_ERROR,
        subreddit,
        error: err,
        errorCode: errCode
    })
}

const receivePosTerminalData = (subreddit, json, status, resolve) => {
    resolve(json);
    return ({
        type: POS_TERMINAL.RECEIVED_POS_TERMINAL_DATA,
        subreddit,
        data: json,
        status: status,
        receivedAt: Date.now()
    })
}

export const fetchPosTerminalData = (subreddit, data, url) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(dynamicActionWrapper({
            path: POS_TERMINAL.POS_TERMINAL_URL + url,
            method: 'POST',
            body: data,
            initCb: requestPosTerminalData,
            successCb: receivePosTerminalData,
            failureCb: receivePosTerminalDataError,
            resolve: resolve,
            reject: reject,
            subreddit,
            wrapperActionType: 'FETCH_TERMINALS_DATA_WRAPPER',
            redirect: 'follow'
        }));
    })
}

const requestPosTerminalStatus = (subreddit) => ({
    type: POS_TERMINAL.REQUEST_POS_TERMINAL_STATUS,
    subreddit
});

const receivePosTerminalStatusError = (subreddit, err, errCode) => ({
    type: POS_TERMINAL.RECEIVED_POS_TERMINAL_STATUS_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

const receivePosTerminalStatus = (subreddit, json, status) => ({
    type: POS_TERMINAL.RECEIVED_POS_TERMINAL_STATUS,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

export const fetchPosTerminalStatus = (subreddit, data, url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: POS_TERMINAL.POS_TERMINAL_URL + url,
        method: 'POST',
        body: data,
        initCb: requestPosTerminalStatus,
        successCb: receivePosTerminalStatus,
        failureCb: receivePosTerminalStatusError,
        subreddit,
        wrapperActionType: 'FETCH_TERMINALS_STATUS_WRAPPER',
        redirect: 'follow'
    }));

export const requestreceivePosTerminalUpdate = (subreddit, pos) => ({
    type: POS_TERMINAL.REQUEST_POS_TERMINAL_UPDATE,
    subreddit,
    data: pos
});


const initAddFPConfig = (subreddit) => ({
    type: POS_TERMINAL.INIT_ADD_FP_CONFIG,
    subreddit
});

const successAddFPConfig = (subreddit, json, status, resolve) => {
    resolve(json);
    return ({
        type: POS_TERMINAL.SUCCESS_ADD_FP_CONFIG,
        subreddit,
        data: json,
        status: status,
        receivedAt: Date.now()
    })
}

const failAddFPConfig = (subreddit, err, errCode, reject) => {
    reject(errCode);
    return ({
        type: POS_TERMINAL.FAIL_ADD_FP_CONFIG,
        subreddit,
        error: err,
        errorCode: errCode
    })
}

export const addFreedomPayConfig = (subreddit, data, url) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(dynamicActionWrapper({
            path: POS_TERMINAL.POS_TERMINAL_URL + url,
            method: 'POST',
            body: data,
            initCb: initAddFPConfig,
            successCb: successAddFPConfig,
            failureCb: failAddFPConfig,
            resolve: resolve,
            reject: reject,
            subreddit,
            wrapperActionType: 'ADD_FP_CONFIG',
            redirect: 'follow'
        }));
    })
};

const initGetFPConfig = (subreddit) => ({
    type: POS_TERMINAL.INIT_GET_FP_CONFIG,
    subreddit
});

const successGetFPConfig = (subreddit, json, status, resolve) => {
    resolve(json);
    return ({
        type: POS_TERMINAL.SUCCESS_GET_FP_CONFIG,
        subreddit,
        data: json,
        status: status,
        receivedAt: Date.now()
    })
}

const failGetFPConfig = (subreddit, err, errCode, reject) => {
    reject(err);
    return ({
        type: POS_TERMINAL.FAIL_GET_FP_CONFIG,
        subreddit,
        error: err,
        errorCode: errCode
    })
}

export const getFreedomPayConfig = (subreddit, data, url) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(dynamicActionWrapper({
            path: POS_TERMINAL.POS_TERMINAL_URL + url,
            method: 'POST',
            body: data,
            initCb: initGetFPConfig,
            successCb: successGetFPConfig,
            failureCb: failGetFPConfig,
            resolve: resolve,
            reject: reject,
            subreddit,
            wrapperActionType: 'GET_FP_CONFIG',
            redirect: 'follow'
        }))
    })
}