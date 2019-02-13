import {
  combineReducers
} from 'redux';
import _get from 'lodash/get';
import _cloneDeep from 'lodash/cloneDeep';
import _isArray from 'lodash/isArray';
import _findIndex from 'lodash/findIndex';
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
  RECEIVED_DOCUMENT_UPLOAD_ERROR,
  REQUEST_VENDOR_PRODUCTS,
  RECEIVE_VENDOR_PRODUCTS,
  RECEIVE_VENDOR_PRODUCTS_ERROR,
  REQUEST_REATILER_PRODUCTS,
  RECEIVE_REATILER_PRODUCTS,
  RECEIVE_REATILER_PRODUCTS_ERROR,
  REQUEST_EXISTING_POS_PRODUCTS_FOR_VENDOR,
  RECEIVE_EXISTING_POS_PRODUCTS_FOR_VENDOR,
  RECEIVE_EXISTING_POS_PRODUCTS_FOR_VENDOR_ERROR,
  REQUEST_VENDOR_PRODUCT_SAVE,
  RECEIVE_VENDOR_PRODUCT_SAVE,
  RECEIVE_VENDOR_PRODUCT_SAVE_ERROR,
  REQUEST_VENDOR_PRODUCT_UPDATE,
  REQUEST_PRODUCTS_FROM_CACHE,
  RECEIVE_PRODUCTS_FROM_CACHE,
  RECEIVE_PRODUCTS_FROM_CACHE_ERROR,
  UPDATE_VENDOR_PRODUCTS_LIST,
  UPDATE_VENDOR_LIST_FOR_PRODUCTS,

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
  vendorProductsData: [],
  existingPOSProductForVendor: {},
  retailerProductsData: [],
  vendorProductSaveData: {},
  productsFromCache: [],
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
        type: action.type,
        error: undefined,
        didInvalidate: false,
        // @todo remove and make specific data at root level
        fileData: action.data,
        lastUpdated: action.receivedAt
      });

    case RECEIVED_DOCUMENT_UPLOAD_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        error: undefined,
        didInvalidate: false,
        fileData: [],
        lastUpdated: action.receivedAt
      });
    case REQUEST_PRODUCT_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        status: '',
        selectedProduct: {},
        lastUpdated: action.receivedAt
      });

    case RECEIVE_PRODUCT_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        status: action.status,
        selectedProduct: {},
        productSaveData: action.data,
        lastUpdated: action.receivedAt
      });

    case REQUEST_PRODUCT_LOOKUP_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        status: '',
        selectedProduct: {},
        lastUpdated: action.receivedAt
      });

    case RECEIVE_PRODUCT_LOOKUP_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        status: action.status,
        selectedProduct: {},
        productData: action.data,
        lastUpdated: action.receivedAt
      });
    case RECEIVE_PRODUCT_LOOKUP_DATA_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        status: action.status,
        productData: '',
        lastUpdated: action.receivedAt
      });
    case REQUEST_VENDOR_PRODUCTS:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        status: '',
      });

    case RECEIVE_VENDOR_PRODUCTS:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        status: action.status,
        vendorProductsData: action.data,
        lastUpdated: action.receivedAt
      });
    case RECEIVE_VENDOR_PRODUCTS_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        status: action.status,
        lastUpdated: action.receivedAt
      });
    case UPDATE_VENDOR_PRODUCTS_LIST:
      let tempProdList = _cloneDeep(_get(state, 'vendorProductsData', []));
      let cachedProducts = _cloneDeep(action.data) || [];
      console.log('product data', tempProdList);
      _isArray(tempProdList) && tempProdList.map((prod, index) => {
        let pIndex = _findIndex(cachedProducts, {
          'id': prod.posProductId
        });
        if (pIndex !== -1) {
          tempProdList[index].productName = cachedProducts[pIndex].name;
        }
      })
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        status: action.status,
        vendorProductsData: tempProdList,
        lastUpdated: action.receivedAt
      });
    case UPDATE_VENDOR_LIST_FOR_PRODUCTS:
      tempProdList = _cloneDeep(_get(state, 'vendorProductsData', []));
      cachedProducts = _cloneDeep(action.data) || [];
      _isArray(tempProdList) && tempProdList.map((prod, index) => {
        let pIndex = _findIndex(cachedProducts, {
          'id': prod.vendorId
        });
        if (pIndex !== -1) {
          tempProdList[index].vendorName = cachedProducts[pIndex].name;
        }
      })
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        status: action.status,
        vendorProductsData: tempProdList,
        lastUpdated: action.receivedAt
      });
    case REQUEST_REATILER_PRODUCTS:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        status: '',
      });

    case RECEIVE_REATILER_PRODUCTS:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        status: action.status,
        retailerProductsData: action.data,
        lastUpdated: action.receivedAt
      });
    case RECEIVE_REATILER_PRODUCTS_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        status: action.status,
        lastUpdated: action.receivedAt
      });
    case REQUEST_VENDOR_PRODUCT_SAVE:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        status: '',
      });

    case RECEIVE_VENDOR_PRODUCT_SAVE:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        status: action.status,
        vendorProductSaveData: action.data,
        lastUpdated: action.receivedAt
      });
    case RECEIVE_VENDOR_PRODUCT_SAVE_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        status: action.status,
        lastUpdated: action.receivedAt
      });

    case REQUEST_EXISTING_POS_PRODUCTS_FOR_VENDOR:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        status: '',
      });

    case RECEIVE_EXISTING_POS_PRODUCTS_FOR_VENDOR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        status: action.status,
        existingPOSProductForVendor: action.data,
        lastUpdated: action.receivedAt
      });
    case RECEIVE_EXISTING_POS_PRODUCTS_FOR_VENDOR_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        status: action.status,
        existingPOSProductForVendor: action.error,
        lastUpdated: action.receivedAt
      });

    case REQUEST_VENDOR_PRODUCT_UPDATE:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        status: action.status,
        selectedVendorProduct: action.data,
        lastUpdated: action.receivedAt
      });
    case REQUEST_PRODUCTS_FROM_CACHE:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        status: '',
      });

    case RECEIVE_PRODUCTS_FROM_CACHE:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        status: action.status,
        productsFromCache: action.data,
        lastUpdated: action.receivedAt
      });
    case RECEIVE_PRODUCTS_FROM_CACHE_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        status: action.status,
        lastUpdated: action.receivedAt
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
        isFetching: true,
        type: action.type,
        status: '',
        getSaleTransaction: [],
        lastUpdated: action.receivedAt
      });

    case RECEIVE_SALE_TRANSACTION_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        status: action.status,
        getSaleTransaction: action.data,
        lastUpdated: action.receivedAt
      });

    case REQUEST_CUSTOMER_REGISTRATION_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        status: '',
        lastUpdated: action.receivedAt
      });

    case RECEIVE_CUSTOMER_REGISTRATION_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        status: action.status,
        getCustomerRegistration: action.data,
        lastUpdated: action.receivedAt
      });

    case REQUEST_CUSTOMER_SEARCH_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        status: '',
        customerSearchData: [],
        lastUpdated: action.receivedAt
      });

    case RECEIVE_CUSTOMER_SEARCH_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        status: action.status,
        customerSearchData: action.data,
        lastUpdated: action.receivedAt
      });


    default:
      return state
  }
}


export {
  productData
}

export default productReducer;