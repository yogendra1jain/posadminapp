import { combineReducers } from 'redux';
import _get from 'lodash/get';
import {
 REQUEST_POS_TERMINAL_LIST,
 REQUEST_POS_TERMINAL_DATA,
 RECEIVED_POS_TERMINAL_LIST,
 RECEIVED_POS_TERMINAL_LIST_ERROR,
 RECEIVED_POS_TERMINAL_DATA,
 RECEIVED_POS_TERMINAL_DATA_ERROR,
 REQUEST_POS_TERMINAL_STATUS,
 RECEIVED_POS_TERMINAL_STATUS,
 RECEIVED_POS_TERMINAL_STATUS_ERROR

} from '../constants/posTerminal';

const posReducer = (state = 'posState', action) => {
  switch (action.type) {
    default:
      return state
  }
}


const posTerminalData = (state = {
  isFetching: false,
  didInvalidate: false,
  type: '',
  status: '',
  posListData: [],
  posStatusData:[],
  posSaveData:[],
}, action) => {
  switch (action.type) {
    case REQUEST_POS_TERMINAL_LIST:
      return Object.assign({}, state, {
        isFetching: true,posListData:[],posSaveData:[],
        type: action.type, lastUpdated: action.receivedAt
      });
    case RECEIVED_POS_TERMINAL_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, posListData: action.data,
        lastUpdated: action.receivedAt
      });
    case REQUEST_POS_TERMINAL_DATA:
      return Object.assign({}, state, {
        isFetching: true,staffSaveData:[],
        type: action.type, lastUpdated: action.receivedAt,posSaveData:[],
      });
    case RECEIVED_POS_TERMINAL_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,posSaveData:action.data,
        didInvalidate: false,
        lastUpdated: action.receivedAt
      });

    case RECEIVED_POS_TERMINAL_DATA_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, posSaveData:action.error,
        lastUpdated: action.receivedAt,
    });
    case RECEIVED_POS_TERMINAL_LIST_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, posListData:action.error,
        lastUpdated: action.receivedAt
    });
    case REQUEST_POS_TERMINAL_STATUS:
      return Object.assign({}, state, {
        isFetching: true,posStatusData:[],
        type: action.type, lastUpdated: action.receivedAt
      });
    case RECEIVED_POS_TERMINAL_STATUS:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, posStatusData: action.data,
        lastUpdated: action.receivedAt
      });
    case RECEIVED_POS_TERMINAL_STATUS_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, posStatusData:action.error,
        lastUpdated: action.receivedAt
    });
     

    default:
      return state
  }
}


export {
    posTerminalData
}

export default posReducer;