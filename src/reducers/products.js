import { combineReducers } from 'redux';
import _get from 'lodash/get';
import {
  REQUEST_PRODUCT_DATA,
  RECEIVE_PRODUCT_DATA,
  REQUEST_SALE_TRANSACTION_DATA,
  RECEIVE_SALE_TRANSACTION_DATA,
  REQUEST_CUSTOMER_REGISTRATION_DATA,
  RECEIVE_CUSTOMER_REGISTRATION_DATA,
  REQUEST_CUSTOMER_SEARCH_DATA,
  RECEIVE_CUSTOMER_SEARCH_DATA,
  REQUEST_PRODUCT_LOOKUP_DATA,
  RECEIVE_PRODUCT_LOOKUP_DATA,
  RECEIVE_PRODUCT_LOOKUP_DATA_ERROR,
  REQUEST_PRODUCT_UPDATE,
  UPLOAD_DOCUMENT,
  RECEIVED_DOCUMENT_UPLOAD_SUCCESS_RESPONSE,
  RECEIVED_DOCUMENT_UPLOAD_ERROR

} from '../constants/products';

const productReducer = (state = 'productState', action) => {
  switch (action.type) {
    default:
      return state
  }
}


const productData = (state = {
  isFetching: false,
  didInvalidate: false,
  type: '',
  productData: [],
  getSaleTransaction: [],
  getCustomerRegistration: [],
  customerSearchData: [],
  productSaveData: {}
}, action) => {
  switch (action.type) {
    case UPLOAD_DOCUMENT:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        error: undefined,
        lastUpdated: action.receivedAt,
        requestToUrl: action.url, // use for printing requested url
        fileUrl: undefined,
        requestWithDataBody: action.data // use for printing data to be sent to server
      });
      case RECEIVED_DOCUMENT_UPLOAD_SUCCESS_RESPONSE:

      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, error: undefined,
        didInvalidate: false,
        // @todo remove and make specific data at root level
        fileData: action.data,
        lastUpdated: action.receivedAt
      }
      );

    case RECEIVED_DOCUMENT_UPLOAD_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, error: undefined,
        didInvalidate: false, fileData: [],
        lastUpdated: action.receivedAt
      }
      );
    case REQUEST_PRODUCT_DATA:
      return Object.assign({}, state, {
        isFetching: true, type: action.type, status: '',selectedProduct:{},
        lastUpdated: action.receivedAt
      });

    case RECEIVE_PRODUCT_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, 
        didInvalidate: false, 
        status: action.status,
        selectedProduct:{},
        productSaveData: action.data, 
        lastUpdated: action.receivedAt
      });

      case REQUEST_PRODUCT_LOOKUP_DATA:
      return Object.assign({}, state, {
        isFetching: true, type: action.type, status: '',selectedProduct:{},
        lastUpdated: action.receivedAt
      });

    case RECEIVE_PRODUCT_LOOKUP_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, didInvalidate: false, status: action.status,selectedProduct:{},
        productData: action.data, lastUpdated: action.receivedAt
      });
    case RECEIVE_PRODUCT_LOOKUP_DATA_ERROR:
    return Object.assign({}, state, {
      isFetching: false,
      type: action.type, didInvalidate: false, status: action.status,
      productData: '', lastUpdated: action.receivedAt
    });

    case REQUEST_PRODUCT_UPDATE:
    return Object.assign({}, state, {
      isFetching: false,
      type: action.type, 
      didInvalidate: false, 
      status: action.status,
      selectedProduct: action.data, 
      lastUpdated: action.receivedAt
    });

    case REQUEST_SALE_TRANSACTION_DATA:
      return Object.assign({}, state, {
        isFetching: true, type: action.type,status: '',
        getSaleTransaction:[], lastUpdated: action.receivedAt
      });

    case RECEIVE_SALE_TRANSACTION_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, didInvalidate: false, status: action.status,
        getSaleTransaction: action.data, lastUpdated: action.receivedAt
      });

    case REQUEST_CUSTOMER_REGISTRATION_DATA:
      return Object.assign({}, state, {
        isFetching: true, type: action.type, status: '',
        lastUpdated: action.receivedAt
      });

    case RECEIVE_CUSTOMER_REGISTRATION_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, didInvalidate: false, status: action.status,
        getCustomerRegistration: action.data, lastUpdated: action.receivedAt
      });

    case REQUEST_CUSTOMER_SEARCH_DATA:
      return Object.assign({}, state, {
        isFetching: true, type: action.type, status: '', customerSearchData: [],
        lastUpdated: action.receivedAt
      });

    case RECEIVE_CUSTOMER_SEARCH_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, didInvalidate: false, status: action.status,
        customerSearchData: action.data, lastUpdated: action.receivedAt
      });


    default:
      return state
  }
}


export {
  productData
}

export default productReducer;