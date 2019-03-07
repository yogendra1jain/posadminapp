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

export const fetchStaffList = (subreddit, url, data) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: STAFF_CONSTANTS.STAFF_URL+url,
        method: 'POST',
        body: data,
        initCb: requestStaffList,
        successCb: receiveStaffList,
        failureCb: receiveStaffListError,
        subreddit,
        wrapperActionType: 'FETCH_STAFF_LIST_WRAPPER',
        redirect: 'follow'
    }));



export const requestStaffUpdate = (subreddit, staff, id) => ({
    type: STAFF_CONSTANTS.REQUEST_STAFF_UPDATE,
    subreddit,
    id: id,
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

//Action for Change Password
const requestChangePassword = (subreddit)=> ({
    type: STAFF_CONSTANTS.REQUEST_CHANGE_PASSWORD,
    subreddit
});

const receiveChangePassword = (subreddit, json, status )=> ({
    type: STAFF_CONSTANTS.RECEIVE_CHANGE_PASSWORD,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

const receiveChangePasswordError = (subreddit,err,errCode) => ({
    type: STAFF_CONSTANTS.RECEIVE_CHANGE_PASSWORD_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

export const changePassword = (subreddit, data,url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: STAFF_CONSTANTS.STAFF_URL+url,
        method: 'POST',
        body: data,
        initCb: requestChangePassword,
        successCb: receiveChangePassword,
        failureCb: receiveChangePasswordError,
        subreddit,
        wrapperActionType: 'FETCH_CHANGE_PASSWORD_WRAPPER',
        redirect: 'follow'
    }));