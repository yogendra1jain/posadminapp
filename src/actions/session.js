import * as SESSION_CONSTANTS from '../constants/session';
import dynamicActionWrapper from '../helpers/actionHelper';

// Action start for post login

let status = '';

const requestSessionList = (subreddit) => ({
    type: SESSION_CONSTANTS.REQUEST_SESSION_LIST,
    subreddit
});

const receiveSessionListError = (subreddit, err, errCode) => ({
    type: SESSION_CONSTANTS.RECEIVED_SESSION_LIST_ERROR,
    subreddit,
    error: err,
    status: errCode,
})

const receiveSessionList = (subreddit, json, status) => ({
    type: SESSION_CONSTANTS.RECEIVED_SESSION_LIST,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

// export const fetchSessionList = (subreddit, url) => dispatch => {

//     dispatch(requestSessionList(subreddit));

//     fetch(SESSION_CONSTANTS.SESSION_URL + url, {
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
//         .then(json => { return dispatch(receiveSessionList(subreddit, json, status)) })
//         .catch(err => { return dispatch(receiveSessionListError(subreddit, err, 500)) })
// }

export const fetchSessionList = (subreddit, url) => dispatch => 
dispatch(dynamicActionWrapper({
    path: SESSION_CONSTANTS.SESSION_URL + url,
    method: 'Get',
    initCb: requestSessionList,
    successCb: receiveSessionList,
    failureCb: receiveSessionListError,
    subreddit,
    wrapperActionType: 'FETCH_SESSION_LIST_WRAPPER',
    redirect: 'follow'
}));



const requestSessionData = (subreddit) => ({
    type: SESSION_CONSTANTS.REQUEST_SESSION_DATA,
    subreddit
});

const receiveSessionDataError = (subreddit, err, errCode) => ({
    type: SESSION_CONSTANTS.RECEIVED_SESSION_DATA_ERROR,
    subreddit,
    error: err,
    status: errCode
})

const receiveSessionData = (subreddit, json, status) => ({
    type: SESSION_CONSTANTS.RECEIVED_SESSION_DATA,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

// export const fetchSessionData = (subreddit, url, method) => dispatch => {

//     dispatch(requestSessionData(subreddit));

//     fetch(SESSION_CONSTANTS.SESSION_URL + url, {
//         method: method,
//         headers: {
//             "Content-type": "application/json"
//         },
//         //body: JSON.stringify(data)
//     })
//         .then(response => {
//             status = response.status;

//             return response.json()
//         }
//         )
//         .then(json => { return dispatch(receiveSessionData(subreddit, json, status)) })
//         .catch(err => { return dispatch(receiveSessionDataError(subreddit, err, 500)) })
// }

export const fetchSessionData = (subreddit, url, method) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: SESSION_CONSTANTS.SESSION_URL+url,
        method: method,
        initCb: requestSessionData,
        successCb: receiveSessionData,
        failureCb: receiveSessionDataError,
        subreddit,
        wrapperActionType: 'FETCH_SESSION_DATA_WRAPPER',
        redirect: 'follow'
    }));


const requestSessionAddEdit = (subreddit) => ({
    type: SESSION_CONSTANTS.REQUEST_SESSION_ADD_EDIT,
    subreddit
});

const receiveSessionAddEditError = (subreddit, err, errCode) => ({
    type: SESSION_CONSTANTS.RECEIVED_SESSION_ADD_EDIT_ERROR,
    subreddit,
    error: err,
    status: errCode
})

const receiveSessionAddEdit = (subreddit, json, status) => ({
    type: SESSION_CONSTANTS.RECEIVED_SESSION_ADD_EDIT,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

// export const fetchSessionAddEdit = (subreddit, data, url, method) => dispatch => {

//     dispatch(requestSessionAddEdit(subreddit));

//     fetch(SESSION_CONSTANTS.SESSION_URL + url, {
//         method: method,
//         headers: {
//             "Content-type": "application/json"
//         },
//         body: JSON.stringify(data)
//     })
//         .then(response => {
//             status = response.status;

//             return response.json()
//         }
//         )
//         .then(json => { return dispatch(receiveSessionAddEdit(subreddit, json, status)) })
//         .catch(err => { return dispatch(receiveSessionAddEditError(subreddit, err, 500)) })
// }

export const fetchSessionAddEdit = (subreddit, data, url, method) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: SESSION_CONSTANTS.SESSION_URL + url,
        method: method,
        body: data,
        initCb: requestSessionAddEdit,
        successCb: receiveSessionAddEdit,
        failureCb: receiveSessionAddEditError,
        subreddit,
        wrapperActionType: 'FETCH_SESSION_ADD_EDIT_DATA_WRAPPER',
        redirect: 'follow'
    }));

const requestSessionPutMoney = (subreddit) => ({
    type: SESSION_CONSTANTS.REQUEST_SESSION_PUT_MONEY,
    subreddit
});

const receiveSessionPutMoneyError = (subreddit, err, errCode) => ({
    type: SESSION_CONSTANTS.RECEIVED_SESSION_PUT_MONEY_ERROR,
    subreddit,
    error: err,
    status: errCode
})

const receiveSessionPutMoney = (subreddit, json, status) => ({
    type: SESSION_CONSTANTS.RECEIVED_SESSION_PUT_MONEY,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

// export const putSessionMoney = (subreddit, data, url, method) => dispatch => {

//     dispatch(requestSessionPutMoney(subreddit));

//     fetch(SESSION_CONSTANTS.SESSION_URL + url, {
//         method: method,
//         headers: {
//             "Content-type": "application/json"
//         },
//         body: JSON.stringify(data)
//     })
//         .then(response => {
//             status = response.status;

//             return response.json()
//         }
//         )
//         .then(json => { return dispatch(receiveSessionPutMoney(subreddit, json, status)) })
//         .catch(err => { return dispatch(receiveSessionPutMoneyError(subreddit, err, 500)) })
// }


export const putSessionMoney = (subreddit, data, url, method) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: SESSION_CONSTANTS.SESSION_URL + url,
        method: method,
        body: data,
        initCb: requestSessionPutMoney,
        successCb: receiveSessionPutMoney,
        failureCb: receiveSessionPutMoneyError,
        subreddit,
        wrapperActionType: 'PUT_SESSION_MONEY_WRAPPER',
        redirect: 'follow'
    }));

const requestSessionTakeMoney = (subreddit) => ({
    type: SESSION_CONSTANTS.REQUEST_SESSION_TAKE_MONEY,
    subreddit
});

const receiveSessionTakeMoneyError = (subreddit, err, errCode) => ({
    type: SESSION_CONSTANTS.RECEIVED_SESSION_TAKE_MONEY_ERROR,
    subreddit,
    error: err,
    status: errCode
})

const receiveSessionTakeMoney = (subreddit, json, status) => ({
    type: SESSION_CONSTANTS.RECEIVED_SESSION_TAKE_MONEY,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

// export const takeSessionMoney = (subreddit, data, url, method) => dispatch => {

//     dispatch(requestSessionTakeMoney(subreddit));

//     fetch(SESSION_CONSTANTS.SESSION_URL + url, {
//         method: method,
//         headers: {
//             "Content-type": "application/json"
//         },
//         body: JSON.stringify(data)
//     })
//         .then(response => {
//             status = response.status;

//             return response.json()
//         }
//         )
//         .then(json => { return dispatch(receiveSessionTakeMoney(subreddit, json, status)) })
//         .catch(err => { return dispatch(receiveSessionTakeMoneyError(subreddit, err, 500)) })
// }

export const takeSessionMoney = (subreddit, data, url, method) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: SESSION_CONSTANTS.SESSION_URL + url,
        method: method,
        body: data,
        initCb: requestSessionTakeMoney,
        successCb: receiveSessionTakeMoney,
        failureCb: receiveSessionTakeMoneyError,
        subreddit,
        wrapperActionType: 'TAKE_SESSION_MONEY_WRAPPER',
        redirect: 'follow'
    }));