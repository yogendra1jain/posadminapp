import * as EMPLOYEES_CONSTANT from '../constants/employees';
import dynamicActionWrapper from '../helpers/actionHelper';
import { generateV1uuid } from '../helpers/helpers';

const requestEmployeesList = (subreddit) => ({
    type: EMPLOYEES_CONSTANT.REQUEST_EMPLOYEES_LIST,
    subreddit
});

const receiveEmployeesList = (subreddit, data, status, resolve) => {
    resolve(data);
    return ({
        type: EMPLOYEES_CONSTANT.RECEIVE_EMPLOYEES_LIST,
        subreddit,
        data,
        receivedAt: Date.now()
    });
}
const receiveEmployeesListError = (subreddit, error, status, reject) => {
    reject(error)
    return ({
        type: EMPLOYEES_CONSTANT.RECEIVE_EMPLOYEES_LIST_ERROR,
        subreddit,
        error,
        receivedAt: Date.now()
    })
} 

export const fetchEmployeesList = (subreddit, url, data) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(dynamicActionWrapper({
            path: EMPLOYEES_CONSTANT.EMPLOYEES_URL + url,
            method: 'POST',
            body: data,
            initCb: requestEmployeesList,
            successCb: receiveEmployeesList,
            failureCb: receiveEmployeesListError,
            resolve: resolve,
            reject: reject,
            subreddit,
            wrapperActionType: 'FETCH_EMPLOYEE_LIST_WRAPPER',
            redirect: 'follow'
        }));
    })
}

const requestNewEmployee = (subreddit) => ({
    type: EMPLOYEES_CONSTANT.REQUEST_NEW_EMPLOYEE,
    subreddit
});

const receiveNewEmployee = (subreddit, data, status, resolve) => {
    resolve(data);
    return ({
        type: EMPLOYEES_CONSTANT.RECEIVE_NEW_EMPLOYEE,
        subreddit,
        data,
        receivedAt: Date.now()
    });
}
const receiveNewEmployeeError = (subreddit, error, status, reject) => {
    reject(error)
    return ({
        type: EMPLOYEES_CONSTANT.RECEIVE_NEW_EMPLOYEE_ERROR,
        subreddit,
        error,
        receivedAt: Date.now()
    })
} 

export const saveNewEmployee = (subreddit, url, data) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(dynamicActionWrapper({
            path: EMPLOYEES_CONSTANT.EMPLOYEES_URL + url,
            method: 'POST',
            body: data,
            initCb: requestNewEmployee,
            successCb: receiveNewEmployee,
            failureCb: receiveNewEmployeeError,
            resolve: resolve,
            reject: reject,
            subreddit,
            wrapperActionType: 'FETCH_EMPLOYEE_LIST_WRAPPER',
            redirect: 'follow'
        }));
    })
}


export const requestEmployeesUpdate = (subreddit, data) => ({
    type: EMPLOYEES_CONSTANT.REQUEST_EMPLOYEE_UPDATE,
    subreddit,
    data: data,
});


//DOcument Upload

export const uploadDocument = (file, url, subreddit, storeId) => (dispatch) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('storeId',storeId)
    const metaHeaders = {
        "CorrelationId": generateV1uuid(),
        "Authorization": `Bearer ${localStorage.getItem('Token')}`
    };

    return fetch(EMPLOYEES_CONSTANT.EMPLOYEES_URL + url, {
        headers: metaHeaders,
        method: 'POST',
        body: formData
    })
}