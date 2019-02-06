import * as STAFF_CONSTANTS from '../constants/staff';
import dynamicActionWrapper from '../helpers/actionHelper';

// Action start for post login

let status = '';

const requestStaff = (subreddit)=> ({
    type: STAFF_CONSTANTS.REQUEST_STAFF,
    subreddit
});

const receiveStaffError = (subreddit,err,errCode) => ({
    type: STAFF_CONSTANTS.RECEIVED_STAFF_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

const receiveStaff = (subreddit, json, status )=> ({
    type: STAFF_CONSTANTS.RECEIVED_STAFF,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

// export const fetchSaveStaff = (subreddit, data,method,url) => dispatch => {
    
//     dispatch(requestStaff(subreddit));
    
//     fetch(STAFF_CONSTANTS.STAFF_URL+url, { method: method,
//     headers: {
//         "Content-type": "application/json"
//     },
//     body: JSON.stringify(data)
//     })
//     .then(response => {
//         status = response.status;
         
//         return response.json() } 
//     )
//     .then(json => { return dispatch(receiveStaff(subreddit, json, status )) } )
//     .catch(err => { return dispatch(receiveStaffError(subreddit,err,500)) } )
// }

export const fetchSaveStaff = (subreddit, data,method,url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: STAFF_CONSTANTS.STAFF_URL+url,
        method: method,
        body: data,
        initCb: requestStaff,
        successCb: receiveStaff,
        failureCb: receiveStaffError,
        subreddit,
        wrapperActionType: 'FETCH_SAVE_STAFF_WRAPPER',
        redirect: 'follow'
    }));

const requestStaffList = (subreddit)=> ({
    type: STAFF_CONSTANTS.REQUEST_STAFF_LIST,
    subreddit
});

const receiveStaffListError = (subreddit,err,errCode) => ({
    type: STAFF_CONSTANTS.RECEIVED_STAFF_LIST_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

const receiveStaffList = (subreddit, json, status )=> ({
    type: STAFF_CONSTANTS.RECEIVED_STAFF_LIST,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

// export const fetchStaffList = (subreddit, url) => dispatch => {
    
//     dispatch(requestStaffList(subreddit));
    
//     fetch(STAFF_CONSTANTS.STAFF_URL+"/staff/search"+url, { method: 'GET',
//     headers: {
//         "Content-type": "application/json"
//     },
//     // body: JSON.stringify(data)
//     })
//     .then(response => {
//         status = response.status;
         
//         return response.json() } 
//     )
//     .then(json => { return dispatch(receiveStaffList(subreddit, json, status )) } )
//     .catch(err => { return dispatch(receiveStaffListError(subreddit,err,500)) } )
// }

export const fetchStaffList = (subreddit, url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: STAFF_CONSTANTS.STAFF_URL+"/staff/search"+url,
        method: 'GET',
        initCb: requestStaffList,
        successCb: receiveStaffList,
        failureCb: receiveStaffListError,
        subreddit,
        wrapperActionType: 'FETCH_STAFF_LIST_WRAPPER',
        redirect: 'follow'
    }));



const requestStaffUpdate = (subreddit, staff) => ({
    type: STAFF_CONSTANTS.REQUEST_STAFF_UPDATE,
    subreddit,
    data:staff
});

const receiveStaffUpdateError = (subreddit,err,errCode) => ({
    type: STAFF_CONSTANTS.RECEIVED_STAFF_UPDATE_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

const receiveStaffUpdate = (subreddit, json, status )=> ({
    type: STAFF_CONSTANTS.RECEIVED_STAFF_UPDATE,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

// export const fetchStaffUpdate = (subreddit, id, role) => dispatch => {
    
//     dispatch(requestStaffUpdate(subreddit));
    
//     fetch(STAFF_CONSTANTS.STAFF_URL+"/staff/"+id+"/details?role="+role, { method: 'GET',
//     headers: {
//         "Content-type": "application/json"
//     },
//     // body: JSON.stringify(data)
//     })
//     .then(response => {
//         status = response.status;
         
//         return response.json() } 
//     )
//     .then(json => { return dispatch(receiveStaffUpdate(subreddit, json, status )) } )
//     .catch(err => { return dispatch(receiveStaffUpdateError(subreddit,err,500)) } )
// }

export const fetchStaffUpdate = (subreddit, id, role) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: STAFF_CONSTANTS.STAFF_URL+"/staff/"+id+"/details?role="+role,
        method: 'GET',
        initCb: requestStaffUpdate,
        successCb: receiveStaffUpdate,
        failureCb: receiveStaffUpdateError,
        subreddit,
        wrapperActionType: 'FETCH_STAFF_UPDATE_WRAPPER',
        redirect: 'follow'
    }));