import { combineReducers } from 'redux';
import _get from 'lodash/get';
import {
  REQUEST_SESSION_DATA,
  REQUEST_SESSION_LIST,
  RECEIVED_SESSION_DATA,
  RECEIVED_SESSION_DATA_ERROR,
  RECEIVED_SESSION_LIST,
  RECEIVED_SESSION_LIST_ERROR,
  REQUEST_SESSION_ADD_EDIT,
  RECEIVED_SESSION_ADD_EDIT,
  RECEIVED_SESSION_ADD_EDIT_ERROR,
  REQUEST_SESSION_PUT_MONEY,
  RECEIVED_SESSION_PUT_MONEY,
  RECEIVED_SESSION_PUT_MONEY_ERROR,
  REQUEST_SESSION_TAKE_MONEY,
  RECEIVED_SESSION_TAKE_MONEY,
  RECEIVED_SESSION_TAKE_MONEY_ERROR

} from '../constants/session';

const sessionReducer = (state = 'sessionState', action) => {
  switch (action.type) {
    default:
      return state
  }
}


const sessionsData = (state = {
  isFetching: false,
  didInvalidate: false,
  type: '',
  status: '',
  sessionList: [],
  sessionData: {},
  sessionAddEdit: {},
  putMoney: [],
  takeMoney: []
}, action) => {
  switch (action.type) {
    case REQUEST_SESSION_LIST:
      return Object.assign({}, state, {
        isFetching: true, sessionList: [], sessionData: {},
        type: action.type, lastUpdated: action.receivedAt
      });
    case RECEIVED_SESSION_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, sessionList: action.data, sessionData: {},
        lastUpdated: action.receivedAt
      });
    case RECEIVED_SESSION_LIST_ERROR:
      return Object.assign({}, state, {
        isFetching: false, sessionList: action.error, sessionData: {},
        type: action.type, lastUpdated: action.receivedAt
      });
    case REQUEST_SESSION_DATA:
      return Object.assign({}, state, {
        isFetching: true, sessionData: {},
        type: action.type, lastUpdated: action.receivedAt
      });
    case RECEIVED_SESSION_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, sessionData: action.data,
        lastUpdated: action.receivedAt
      });
    case RECEIVED_SESSION_DATA_ERROR:
      return Object.assign({}, state, {
        isFetching: false, sessionData: action.error,
        type: action.type, lastUpdated: action.receivedAt
      });

    case REQUEST_SESSION_ADD_EDIT:
      return Object.assign({}, state, {
        isFetching: true, sessionAddEdit: {},
        type: action.type, lastUpdated: action.receivedAt
      });
    case RECEIVED_SESSION_ADD_EDIT:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, sessionAddEdit: action.data,
        lastUpdated: action.receivedAt
      });
    case RECEIVED_SESSION_ADD_EDIT_ERROR:
      return Object.assign({}, state, {
        isFetching: false, sessionAddEdit: action.error,
        type: action.type, lastUpdated: action.receivedAt
      });

    case REQUEST_SESSION_PUT_MONEY:
      return Object.assign({}, state, {
        isFetching: true, putMoney: {},
        type: action.type, lastUpdated: action.receivedAt
      });
    case RECEIVED_SESSION_PUT_MONEY:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, putMoney: action.data,
        lastUpdated: action.receivedAt
      });
    case RECEIVED_SESSION_PUT_MONEY_ERROR:
      return Object.assign({}, state, {
        isFetching: false, putMoney: action.error,
        type: action.type, lastUpdated: action.receivedAt
      });

    case REQUEST_SESSION_PUT_MONEY:
      return Object.assign({}, state, {
        isFetching: true, putMoney: {},
        takeMoney: {},
        type: action.type, lastUpdated: action.receivedAt
      });
    case RECEIVED_SESSION_PUT_MONEY:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, putMoney: action.data,
        takeMoney: {},
        lastUpdated: action.receivedAt
      });
    case RECEIVED_SESSION_PUT_MONEY_ERROR:
      return Object.assign({}, state, {
        isFetching: false, putMoney: action.error,
        type: action.type, lastUpdated: action.receivedAt
      });

    case REQUEST_SESSION_TAKE_MONEY:
      return Object.assign({}, state, {
        isFetching: true, takeMoney: {},
        putMoney:{},
        type: action.type, lastUpdated: action.receivedAt
      });
    case RECEIVED_SESSION_TAKE_MONEY:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, takeMoney: action.data,
        putMoney: {},
        lastUpdated: action.receivedAt
      });
    case RECEIVED_SESSION_TAKE_MONEY_ERROR:
      return Object.assign({}, state, {
        isFetching: false, takeMoney: action.error,
        type: action.type, lastUpdated: action.receivedAt
      });


    default:
      return state
  }
}


export {
  sessionsData
}

export default sessionReducer;