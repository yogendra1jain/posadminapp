import { combineReducers } from 'redux';
import _get from 'lodash/get';
import {
    REQUEST_INVENTORY_LOOKUP_DATA,
    RECEIVE_INVENTORY_LOOKUP_DATA,
    RECEIVE_INVENTORY_LOOKUP_DATA_ERROR,
    REQUEST_INVENTORY_DATA,
    RECEIVE_INVENTORY_DATA
} from '../constants/inventory';

const inventoryReducer = (state = 'inventoryState', action) => {
  switch (action.type) {
    default:
      return state
  }
}


const inventoryData = (state = {
  isFetching: false,
  didInvalidate: false,
  type: '',
  productData: [],
  getSaleTransaction: [],
  getCustomerRegistration: [],
  customerSearchData: []

}, action) => {
  switch (action.type) {
       
      case REQUEST_INVENTORY_LOOKUP_DATA:
      return Object.assign({}, state, {
        isFetching: true, type: action.type, status: '',inventorySaveData:[],
        inventoryData:[],lastUpdated: action.receivedAt
      });

    case RECEIVE_INVENTORY_LOOKUP_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, didInvalidate: false, status: action.status,inventorySaveData:[],
        inventoryData: action.data, lastUpdated: action.receivedAt
      });
    case RECEIVE_INVENTORY_LOOKUP_DATA_ERROR:
    return Object.assign({}, state, {
      isFetching: false,
      type: action.type, didInvalidate: false, status: action.status,inventorySaveData:[],
      inventoryData: action.error, lastUpdated: action.receivedAt
    });  

    case REQUEST_INVENTORY_DATA:
    return Object.assign({}, state, {
      isFetching: true, type: action.type, status: '',
      inventorySaveData:[],lastUpdated: action.receivedAt
    });

  case RECEIVE_INVENTORY_DATA:
    return Object.assign({}, state, {
      isFetching: false,
      type: action.type, didInvalidate: false, status: action.status,
      inventorySaveData: action.data, lastUpdated: action.receivedAt
    }); 

    default:
      return state
  }
}


export {
    inventoryData
}

export default inventoryReducer;