import {
  combineReducers
} from 'redux';
import _get from 'lodash/get';
import {
  VENDOR_REQUEST,
  VENDOR_RECIEVE,
  VENDOR_RECIEVE_ERROR,
  VENDOR_FORM_REQUEST,
  VENDOR_FORM_RECIEVE_ERROR,
  VENDOR_FORM_RECIEVE,
  REQUEST_VENDOR_UPDATE,
  REQUEST_REQUISITION_SAVE,
  RECIEVE_REQUISITION_SAVE,
  RECIEVE_REQUISITION_SAVE_ERROR,
  REQUEST_REQUISITION_LIST,
  RECIEVE_REQUISITION_LIST,
  RECIEVE_REQUISITION_LIST_ERROR,
} from '../constants/vendor';

const vendorReducer = (state = 'storeState', action) => {
  switch (action.type) {
    default:
      return state
  }
}


const vendorData = (state = {
  isFetching: false,
  didInvalidate: false,
  type: '',
  status: '',
  vendorData: [],
  terminalData: [],
  requisitionListData: [],
  savedRequisitionData: {},
  posLogin: [],
}, action) => {
  switch (action.type) {
    case VENDOR_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        vendorData: [],
        type: action.type,
        lastUpdated: action.receivedAt
      });
    case VENDOR_RECIEVE:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        status: action.status,
        didInvalidate: false,
        vendorData: action.data,
        lastUpdated: action.receivedAt
      });
    case VENDOR_RECIEVE_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        status: action.status,
        didInvalidate: false,
        addressData: action.error,
        lastUpdated: action.receivedAt
      });


    case VENDOR_FORM_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        vendorFormData: [],
        type: action.type,
        lastUpdated: action.receivedAt
      });
    case VENDOR_FORM_RECIEVE:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        status: action.status,
        didInvalidate: false,
        vendorFormData: action.data,
        selectedStore: [],
        lastUpdated: action.receivedAt
      });
    case VENDOR_FORM_RECIEVE_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        status: action.status,
        didInvalidate: false,
        addressData: action.error,
        lastUpdated: action.receivedAt
      });

    case REQUEST_VENDOR_UPDATE:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        status: action.status,
        selectedStore: action.data,
        lastUpdated: action.receivedAt
      });

    case REQUEST_REQUISITION_SAVE:
      return Object.assign({}, state, {
        isFetching: true,
        vendorFormData: [],
        type: action.type,
        lastUpdated: action.receivedAt
      });
    case RECIEVE_REQUISITION_SAVE:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        status: action.status,
        didInvalidate: false,
        savedRequisitionData: action.data,
        lastUpdated: action.receivedAt
      });
    case RECIEVE_REQUISITION_SAVE_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        status: action.status,
        didInvalidate: false,
        lastUpdated: action.receivedAt
      });
      case REQUEST_REQUISITION_LIST:
      return Object.assign({}, state, {
        isFetching: true,
        vendorFormData: [],
        type: action.type,
        lastUpdated: action.receivedAt
      });
    case RECIEVE_REQUISITION_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        status: action.status,
        didInvalidate: false,
        requisitionListData: action.data,
        lastUpdated: action.receivedAt
      });
    case RECIEVE_REQUISITION_LIST_ERROR:
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
  vendorData
}

export default vendorReducer;