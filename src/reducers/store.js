import { combineReducers } from 'redux';
import _get from 'lodash/get';
import {
  RECEIVED_STORE,
  RECEIVED_STORE_ERROR,
  REQUEST_STORE,
  REQUEST_STORE_POST,
  RECEIVED_STORE_POST,
  RECEIVED_STORE_POST_ERROR,
  REQUEST_POS_LOGIN,
  RECEIVED_POS_LOGIN,
  CLEAR_POS_LOGIN,
  REQUEST_STORE_UPDATE,
  REQUEST_ADDRESS_FROM_ZIP,
  RECEIVED_ADDRESS_FROM_ZIP,
  RECEIVED_ADDRESS_FROM_ZIP_ERROR

} from '../constants/store';

const storeReducer = (state = 'storeState', action) => {
  switch (action.type) {
    default:
      return state
  }
}


const storesData = (state = {
  isFetching: false,
  didInvalidate: false,
  type: '',
  status: '',
  storeData: [],
  terminalData: [],
  posLogin:[],
}, action) => {
  switch (action.type) {
    case REQUEST_STORE:
      return Object.assign({}, state, {
        isFetching: true,storePostData:[],
        type: action.type, lastUpdated: action.receivedAt
      });
    case RECEIVED_STORE:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, 
        storeData: action.data,
        storePostData:[],
        lastUpdated: action.receivedAt
      });
    case REQUEST_STORE_POST:
      return Object.assign({}, state, {
        isFetching: true,storePostData:[],
        type: action.type, lastUpdated: action.receivedAt
      });
    case RECEIVED_STORE_POST:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, 
        status: action.status,
        didInvalidate: false, 
        storePostData: action.data,
        lastUpdated: action.receivedAt
      });
      case REQUEST_POS_LOGIN:
      return Object.assign({}, state, {
        isFetching: true,posLogin:[],status:'',
        type: action.type, lastUpdated: action.receivedAt
      });
    case RECEIVED_POS_LOGIN:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, posLogin: action.data,
        lastUpdated: action.receivedAt
      });
      case CLEAR_POS_LOGIN:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: '',
        didInvalidate: false, posLogin: [],
        lastUpdated: action.receivedAt
      });
      case REQUEST_STORE_UPDATE:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, 
        didInvalidate: false, 
        status: action.status,
        selectedStore: action.data, 
        lastUpdated: action.receivedAt
      });
      case REQUEST_ADDRESS_FROM_ZIP:
      return Object.assign({}, state, {
        isFetching: false,addressData: [],status:'',
        type: action.type, lastUpdated: action.receivedAt
      });
      case RECEIVED_ADDRESS_FROM_ZIP:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, addressData: action.data,
        lastUpdated: action.receivedAt
      });
      case RECEIVED_ADDRESS_FROM_ZIP_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, addressData: action.error,
        lastUpdated: action.receivedAt
      });

    default:
      return state
  }
}


export {
    storesData
}

export default storeReducer;