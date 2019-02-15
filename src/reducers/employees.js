import {
    combineReducers
} from 'redux';
import _get from 'lodash/get';
import _cloneDeep from 'lodash/cloneDeep';
import _set from 'lodash/set';
import {
    REQUEST_EMPLOYEES_LIST,
    RECEIVE_EMPLOYEES_LIST,
    RECEIVE_EMPLOYEES_LIST_ERROR,
    REQUEST_EMPLOYEES_LIST_CSV_UPLOAD,
    RECEIVE_EMPLOYEES_LIST_CSV_UPLOAD,
    RECEIVE_EMPLOYEES_LIST_CSV_UPLOAD_ERROR
} from '../constants/employees';

const employeeReducer = (state = 'employeeState', action) => {
    switch (action.type) {
        default:
            return state
    }
}


const employeeData = (state = {
    isFetching: false,
    didInvalidate: false,
    type: '',
    status: '',
    employeesList: [],
    employeeCsvData: [],
}, action) => {
    switch (action.type) {
        case REQUEST_EMPLOYEES_LIST:
            return Object.assign({}, state, {
                isFetching: true,
                vendorData: [],
                type: action.type,
                lastUpdated: action.receivedAt
            });
        case RECEIVE_EMPLOYEES_LIST:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                status: action.status,
                didInvalidate: false,
                employeesList: action.data,
                lastUpdated: action.receivedAt
            });
        case RECEIVE_EMPLOYEES_LIST_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                status: action.status,
                didInvalidate: false,
                lastUpdated: action.receivedAt
            });
        case REQUEST_EMPLOYEES_LIST_CSV_UPLOAD:
            return Object.assign({}, state, {
                isFetching: true,
                vendorData: [],
                type: action.type,
                lastUpdated: action.receivedAt
            });
        case RECEIVE_EMPLOYEES_LIST_CSV_UPLOAD:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                status: action.status,
                didInvalidate: false,
                employeeCsvData: action.data,
                lastUpdated: action.receivedAt
            });
        case RECEIVE_EMPLOYEES_LIST_CSV_UPLOAD_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                status: action.status,
                didInvalidate: false,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}


export {
    employeeData
}

export default employeeReducer;