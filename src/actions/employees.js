import * as EMPLOYEES_CONSTANT from '../constants/employees';
import dynamicActionWrapper from '../helpers/actionHelper';


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