export const PRODUCT_LOOKUP_URL = `${process.env.APPLICATION_BFF_URL}`
export const CUSTOMER_SEARCH_URL = `${process.env.APPLICATION_BFF_URL}/customers/search`
export const NEW_CUSTOMER_REGISTRATION_URL = `${process.env.APPLICATION_BFF_URL}/customers`
export const SALE_TRANSACTION_URL = `${process.env.APPLICATION_BFF_URL}/saleTransaction`;
// "http://13.127.202.129:2003/pos-bff/store/S2/products";

export const REQUEST_PRODUCT_LOOKUP_DATA = 'REQUEST_PRODUCT_LOOKUP_DATA';
export const RECEIVE_PRODUCT_LOOKUP_DATA = 'RECEIVE_PRODUCT_LOOKUP_DATA';
export const RECEIVE_PRODUCT_LOOKUP_DATA_ERROR = 'RECEIVE_PRODUCT_LOOKUP_DATA_ERROR';

export const REQUEST_PRODUCT_UPDATE= 'REQUEST_PRODUCT_UPDATE';

export const UPLOAD_DOCUMENT = 'UPLOAD_DOCUMENT';
export const RECEIVED_DOCUMENT_UPLOAD_SUCCESS_RESPONSE = 'RECEIVED_DOCUMENT_UPLOAD_SUCCESS_RESPONSE';
export const RECEIVED_DOCUMENT_UPLOAD_ERROR = 'RECEIVED_DOCUMENT_UPLOAD_ERROR';

export const REQUEST_PRODUCT_DATA = 'REQUEST_PRODUCT_DATA';
export const RECEIVE_PRODUCT_DATA = 'RECEIVE_PRODUCT_DATA';


export const REQUEST_SALE_TRANSACTION_DATA = 'REQUEST_SALE_TRANSACTION_DATA';
export const RECEIVE_SALE_TRANSACTION_DATA = 'RECEIVE_SALE_TRANSACTION_DATA';

export const REQUEST_CUSTOMER_REGISTRATION_DATA = 'REQUEST_CUSTOMER_REGISTRATION_DATA';
export const RECEIVE_CUSTOMER_REGISTRATION_DATA = 'RECEIVE_CUSTOMER_REGISTRATION_DATA';

export const REQUEST_CUSTOMER_SEARCH_DATA = "REQUEST_CUSTOMER_SEARCH_DATA";
export const RECEIVE_CUSTOMER_SEARCH_DATA = "RECEIVE_CUSTOMER_SEARCH_DATA";

export const REQUEST_VENDOR_PRODUCTS = 'REQUEST_VENDOR_PRODUCTS';
export const RECEIVE_VENDOR_PRODUCTS = 'RECEIVE_VENDOR_PRODUCTS';
export const RECEIVE_VENDOR_PRODUCTS_ERROR = 'RECEIVE_VENDOR_PRODUCTS_ERROR';

export const REQUEST_REATILER_PRODUCTS = 'REQUEST_REATILER_PRODUCTS';
export const RECEIVE_REATILER_PRODUCTS = 'RECEIVE_REATILER_PRODUCTS';
export const RECEIVE_REATILER_PRODUCTS_ERROR = 'RECEIVE_REATILER_PRODUCTS_ERROR';

export const REQUEST_EXISTING_POS_PRODUCTS_FOR_VENDOR = 'REQUEST_EXISTING_POS_PRODUCTS_FOR_VENDOR';
export const RECEIVE_EXISTING_POS_PRODUCTS_FOR_VENDOR = 'RECEIVE_EXISTING_POS_PRODUCTS_FOR_VENDOR';
export const RECEIVE_EXISTING_POS_PRODUCTS_FOR_VENDOR_ERROR = 'RECEIVE_EXISTING_POS_PRODUCTS_FOR_VENDOR_ERROR';

export const REQUEST_VENDOR_PRODUCT_SAVE = 'REQUEST_VENDOR_PRODUCT_SAVE'
export const RECEIVE_VENDOR_PRODUCT_SAVE = 'RECEIVE_VENDOR_PRODUCT_SAVE'
export const RECEIVE_VENDOR_PRODUCT_SAVE_ERROR = 'REQUEST_VENDOR_PRODUCT_SAVE_ERROR'

export const REQUEST_VENDOR_PRODUCT_UPDATE = 'REQUEST_VENDOR_PRODUCT_UPDATE';

export const REQUEST_PRODUCTS_FROM_CACHE = 'REQUEST_PRODUCTS_FROM_CACHE';
export const RECEIVE_PRODUCTS_FROM_CACHE = 'RECEIVE_PRODUCTS_FROM_CACHE';
export const RECEIVE_PRODUCTS_FROM_CACHE_ERROR = 'RECEIVE_PRODUCTS_FROM_CACHE_ERROR';

export const UPDATE_VENDOR_PRODUCTS_LIST = 'UPDATE_VENDOR_PRODUCTS_LIST'
export const UPDATE_VENDOR_LIST_FOR_PRODUCTS = 'UPDATE_VENDOR_LIST_FOR_PRODUCTS'