import { combineReducers } from 'redux';
import _get from 'lodash/get';
import {
  REQUEST_RETAILER_LIST,
  RECIEVE_RETAILER_LIST,
  RECIEVE_RETAILER_LIST_ERROR,
  REQUEST_SAVE_RETAILER_DATA,
  RECIEVE_SAVE_RETAILER_DATA,
  RECIEVE_SAVE_RETAILER_DATA_ERROR,

} from '../constants/retailer';

const retailerReducer = (state = 'retailerState', action) => {
  switch (action.type) {
    default:
      return state
  }
}


const retailerData = (state = {
  isFetching: false,
  didInvalidate: false,
  type: '',
  status: '',
  retailerList: [],
  retailerSaveData: {}
}, action) => {
  switch (action.type) {
      case REQUEST_RETAILER_LIST:
      return Object.assign({}, state, {
        isFetching: false,retailerList: [],status:'',
        type: action.type, lastUpdated: action.receivedAt
      });
      case RECIEVE_RETAILER_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, retailerList: action.data,
        lastUpdated: action.receivedAt
      });
      case RECIEVE_RETAILER_LIST_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, retailerList: action.error,
        lastUpdated: action.receivedAt
      });

      case REQUEST_SAVE_RETAILER_DATA:
      return Object.assign({}, state, {
        isFetching: false,retailerSaveData: {},status:'',
        type: action.type, lastUpdated: action.receivedAt
      });
      case RECIEVE_SAVE_RETAILER_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, retailerSaveData: action.data,
        lastUpdated: action.receivedAt
      });
      case RECIEVE_SAVE_RETAILER_DATA_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, retailerSaveData: action.error,
        lastUpdated: action.receivedAt
      });

    default:
      return state
  }
}


export {
    retailerData
}

export default retailerReducer;