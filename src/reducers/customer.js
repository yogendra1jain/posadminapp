import { combineReducers } from 'redux';
import _get from 'lodash/get';
import {
  CUSTOMER_REQUEST,
  CUSTOMER_RECIEVE,
  CUSTOMER_RECIEVE_ERROR,
  CUSTOMER_FORM_REQUEST,
  CUSTOMER_FORM_RECIEVE_ERROR,
  CUSTOMER_FORM_RECIEVE,
  REQUEST_CUSTOMER_UPDATE,
} from '../constants/customer';

const customerReducer = (state = 'storeState', action) => {
  switch (action.type) {
    default:
      return state
  }
}


const customerData = (state = {
  isFetching: false,
  didInvalidate: false,
  type: '',
  status: '',
  customerData: [],
  terminalData: [],
  posLogin: [],
}, action) => {
  switch (action.type) {
    case CUSTOMER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        customerData: [],
        type: action.type,
        lastUpdated: action.receivedAt
      });
    case CUSTOMER_RECIEVE:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        status: action.status,
        didInvalidate: false,
        customerData: action.data,
        lastUpdated: action.receivedAt
      });
    case CUSTOMER_RECIEVE_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        status: action.status,
        didInvalidate: false,
        addressData: action.error,
        lastUpdated: action.receivedAt
      });


    case 'save_customer_init':
      return Object.assign({}, state, {
        isFetching: true,
        customerFormData: [],
        type: action.type,
        lastUpdated: action.receivedAt
      });
    case 'save_customer_success':
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        status: action.status,
        didInvalidate: false,
        customerFormData: action.data,
        selectedStore: [],
        lastUpdated: action.receivedAt
      });
    case 'save_customer_error':
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        status: action.status,
        didInvalidate: false,
        addressData: action.error,
        lastUpdated: action.receivedAt
      });

    case REQUEST_CUSTOMER_UPDATE:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        status: action.status,
        selectedStore: action.data,
        lastUpdated: action.receivedAt
      });




    /* case REQUEST_STORE:
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
        type: action.type, didInvalidate: false, status: action.status,
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
      }); */

    default:
      return state
  }
}


export {
  customerData
}

export default customerReducer;