import { combineReducers } from 'redux';
import _get from 'lodash/get';
import {
  REQUEST_PRODUCT_VOLUME_DATA,
  RECEIVE_PRODUCT_VOLUME_DATA,
  REQUEST_PRODUCT_REVENUE_DATA,
  RECEIVE_PRODUCT_REVENUE_DATA,
  REQUEST_PRODUCT_PROFIT_DATA,
  RECEIVE_PRODUCT_PROFIT_DATA,
  REQUEST_PRODUCT_ALL_DATA,
  RECEIVE_PRODUCT_ALL_DATA,
  REQUEST_PRODUCT_WISE_VOLUME_DATA,
  RECEIVE_PRODUCT_WISE_VOLUME_DATA,
  REQUEST_PRODUCT_WISE_REVENUE_DATA,
  RECEIVE_PRODUCT_WISE_REVENUE_DATA,
  REQUEST_PRODUCT_WISE_PROFIT_DATA,
  RECEIVE_PRODUCT_WISE_PROFIT_DATA,
  REQUEST_CUSTOMER_DATA,
  RECEIVE_CUSTOMER_DATA,
  REQUEST_INVENTORY_DATA,
  RECEIVE_INVENTORY_DATA,
  REQUEST_SALE_BY_STORE_DATA,
  RECEIVE_SALE_BY_STORE_DATA,
  REQUEST_TOP_PRODUCTS,
  RECEIVE_TOP_PRODUCTS

} from '../constants/reports';

const reportReducer = (state = 'reportState', action) => {
  switch (action.type) {
    default:
      return state
  }
}


const reportsData = (state = {
  isFetching: false,
  didInvalidate: false,
  type: '',
  status: '',
  productVolumeData: [],
  productWiseVolumeData: [],
  productRevenueData: [],
  productWiseRevenueData: [],
  productProfitData: [],
  productAllData: [],
  productWiseProfitData: [],
  customerData: [],
  inventoryReportData: [],
  saleByStoreData: [],
  topProducts: []
}, action) => {
  switch (action.type) {
    case REQUEST_PRODUCT_VOLUME_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type, lastUpdated: action.receivedAt
      });
    case RECEIVE_PRODUCT_VOLUME_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, productVolumeData: action.data,
        lastUpdated: action.receivedAt
      });

    case REQUEST_PRODUCT_WISE_VOLUME_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type, lastUpdated: action.receivedAt
      });
    case RECEIVE_PRODUCT_WISE_VOLUME_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, productWiseVolumeData: action.data,
        lastUpdated: action.receivedAt
      });

    case REQUEST_PRODUCT_REVENUE_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type, lastUpdated: action.receivedAt
      });
    case RECEIVE_PRODUCT_REVENUE_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, productRevenueData: action.data,
        lastUpdated: action.receivedAt
      });

    case REQUEST_PRODUCT_WISE_REVENUE_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type, lastUpdated: action.receivedAt
      });
    case RECEIVE_PRODUCT_WISE_REVENUE_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, productWiseRevenueData: action.data,
        lastUpdated: action.receivedAt
      });

    case REQUEST_PRODUCT_WISE_PROFIT_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type, lastUpdated: action.receivedAt
      });
    case RECEIVE_PRODUCT_WISE_PROFIT_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, productWiseProfitData: action.data,
        lastUpdated: action.receivedAt
      });

    case REQUEST_PRODUCT_PROFIT_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type, lastUpdated: action.receivedAt
      });
    case RECEIVE_PRODUCT_PROFIT_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, productProfitData: action.data,
        lastUpdated: action.receivedAt
      });

    case REQUEST_PRODUCT_ALL_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type, lastUpdated: action.receivedAt
      });
    case RECEIVE_PRODUCT_ALL_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, productAllData: action.data,
        lastUpdated: action.receivedAt
      });

    case REQUEST_CUSTOMER_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type, lastUpdated: action.receivedAt
      });
    case RECEIVE_CUSTOMER_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, customerData: action.data,
        lastUpdated: action.receivedAt
      });

    case REQUEST_INVENTORY_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type, lastUpdated: action.receivedAt
      });
    case RECEIVE_INVENTORY_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, inventoryReportData: action.data,
        lastUpdated: action.receivedAt
      });

    case REQUEST_SALE_BY_STORE_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type, lastUpdated: action.receivedAt
      });
    case RECEIVE_SALE_BY_STORE_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, saleByStoreData: action.data,
        lastUpdated: action.receivedAt
      });

    case REQUEST_TOP_PRODUCTS:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type, lastUpdated: action.receivedAt
      });
    case RECEIVE_TOP_PRODUCTS:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false, topProducts: action.data,
        lastUpdated: action.receivedAt
      });

    default:
      return state
  }
}


export {
  reportsData
}

export default reportReducer;