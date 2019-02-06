import { combineReducers } from 'redux';
import _get from 'lodash/get';
import {
  RECEIVED_STAFF,
  RECEIVED_STAFF_ERROR,
  REQUEST_STAFF,
  REQUEST_STAFF_LIST,
  RECEIVED_STAFF_LIST,
  RECEIVED_STAFF_LIST_ERROR,  
  REQUEST_STAFF_UPDATE,
  RECEIVED_STAFF_UPDATE,
  RECEIVED_STAFF_UPDATE_ERROR

} from '../constants/staff';

const staffReducer = (state = 'staffState', action) => {
  switch (action.type) {
    default:
      return state
  }
}


const staffsData = (state = {
  isFetching: false,
  didInvalidate: false,
  type: '',
  status: '',
  staffListData: [],
  staffSaveData:[],
}, action) => {
  switch (action.type) {
    case REQUEST_STAFF:
      return Object.assign({}, state, {
        isFetching: true,staffSaveData:[],staffListData:[],
        type: action.type, lastUpdated: action.receivedAt
      });
    case RECEIVED_STAFF:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, staffListData: [],staffSaveData:action.data,
        lastUpdated: action.receivedAt
      });
    case REQUEST_STAFF_LIST:
      return Object.assign({}, state, {
        isFetching: true,staffListData:[],staffSaveData:[],
        type: action.type, lastUpdated: action.receivedAt,selectedStaff:[],
      });
    case RECEIVED_STAFF_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,staffSaveData:[],
        didInvalidate: false, staffListData: action.data,selectedStaff:[],
        lastUpdated: action.receivedAt
      });
    case REQUEST_STAFF_UPDATE:
    return Object.assign({}, state, {
      isFetching: true,
      type: action.type, didInvalidate: false, status: action.status,
      selectedStaff: [], lastUpdated: action.receivedAt
    });
    case RECEIVED_STAFF_UPDATE:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, selectedStaff: action.data,staffSaveData:[],
        lastUpdated: action.receivedAt
    });
    case RECEIVED_STAFF_UPDATE_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, selectedStaff: action.error,staffSaveData:[],
        lastUpdated: action.receivedAt
    });
     

    default:
      return state
  }
}


export {
    staffsData
}

export default staffReducer;