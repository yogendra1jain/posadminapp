import * as POS_TERMINAL from '../constants/posTerminal';
import dynamicActionWrapper from '../helpers/actionHelper';

// Action start for post login

let status = '';

const requestPosTerminalList = (subreddit)=> ({
    type: POS_TERMINAL.REQUEST_POS_TERMINAL_LIST,
    subreddit
});

const receivePosTerminalListError = (subreddit,err,errCode) => ({
    type: POS_TERMINAL.RECEIVED_POS_TERMINAL_LIST_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

const receivePosTerminalList = (subreddit, json, status )=> ({
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
        path: POS_TERMINAL.POS_TERMINAL_URL+url,
        method: 'POST',
        body: data,
        initCb: requestPosTerminalList,
        successCb: receivePosTerminalList,
        failureCb: receivePosTerminalListError,
        subreddit,
        wrapperActionType: 'FETCH_TERMINALS_WRAPPER',
        redirect: 'follow'
    }));

const requestPosTerminalData = (subreddit)=> ({
    type: POS_TERMINAL.REQUEST_POS_TERMINAL_DATA,
    subreddit
});

const receivePosTerminalDataError = (subreddit,err,errCode) => ({
    type: POS_TERMINAL.RECEIVED_POS_TERMINAL_DATA_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

const receivePosTerminalData = (subreddit, json, status )=> ({
    type: POS_TERMINAL.RECEIVED_POS_TERMINAL_DATA,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

// export const fetchPosTerminalData = (subreddit, data, method, url) => dispatch => {
    
//     dispatch(requestPosTerminalData(subreddit));
    
//     fetch(POS_TERMINAL.POS_TERMINAL_URL+url, { method: method,
//     headers: {
//         "Content-type": "application/json"
//     },
//     body: JSON.stringify(data)
//     })
//     .then(response => {
//         status = response.status;
         
//         return response.json() } 
//     )
//     .then(json => { return dispatch(receivePosTerminalData(subreddit, json, status )) } )
//     .catch(err => { return dispatch(receivePosTerminalDataError(subreddit,err,500)) } )
// }

export const fetchPosTerminalData = (subreddit, data, url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: POS_TERMINAL.POS_TERMINAL_URL+url,
        method: 'POST',
        body: data,
        initCb: requestPosTerminalData,
        successCb: receivePosTerminalData,
        failureCb: receivePosTerminalDataError,
        subreddit,
        wrapperActionType: 'FETCH_TERMINALS_DATA_WRAPPER',
        redirect: 'follow'
    }));


const requestPosTerminalStatus = (subreddit)=> ({
    type: POS_TERMINAL.REQUEST_POS_TERMINAL_STATUS,
    subreddit
});

const receivePosTerminalStatusError = (subreddit,err,errCode) => ({
    type: POS_TERMINAL.RECEIVED_POS_TERMINAL_STATUS_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

const receivePosTerminalStatus = (subreddit, json, status )=> ({
    type: POS_TERMINAL.RECEIVED_POS_TERMINAL_STATUS,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

// export const fetchPosTerminalStatus = (subreddit, data, url) => dispatch => {
    
//     dispatch(requestPosTerminalStatus(subreddit));
    
//     fetch(POS_TERMINAL.POS_TERMINAL_URL+url, { method: 'POST',
//     headers: {
//         "Content-type": "application/json"
//     },
//     body: JSON.stringify(data)
//     })
//     .then(response => {
//         status = response.status;
         
//         return response.json() } 
//     )
//     .then(json => { return dispatch(receivePosTerminalStatus(subreddit, json, status )) } )
//     .catch(err => { return dispatch(receivePosTerminalStatusError(subreddit,err,500)) } )
// }

export const fetchPosTerminalStatus = (subreddit, data, url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: POS_TERMINAL.POS_TERMINAL_URL+url,
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
    data:pos
});
