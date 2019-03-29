import _get from 'lodash/get';
import {
    SEND_SELECTED_PRODUCTS,
    INIT_PRODUCT_OVERRIDE,
    RECEIVE_PRODUCT_OVERRIDE,
    RECEIVE_PRODUCT_OVERRIDE_ERROR,
    REQUEST_PRODUCT_DATA,
    RECEIVE_PRODUCT_DATA,
    RECEIVE_PRODUCT_DATA_ERROR
} from '../constants/productOverride';

const productReducer = (state = {
    productOverrideData: [],
    overriddenProductData: {},
    productList: [],
    isFetching: false,
    error:'',
    type: '',
    status: ''
}, action) => {
    switch (action.type) {
        case SEND_SELECTED_PRODUCTS: 
            return Object.assign({}, state, {
                type: action.type,
                productOverrideData: action.data
            })

        case INIT_PRODUCT_OVERRIDE:
            return Object.assign({}, state, {
                isFetching: true, 
                type: action.type, 
                status: '', 
                overriddenProductData: {},
                lastUpdated: action.receivedAt
            });
      
        case RECEIVE_PRODUCT_OVERRIDE:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type, 
                status: action.status, 
                overriddenProductData: action.data,
                lastUpdated: action.receivedAt
            });

        case RECEIVE_PRODUCT_OVERRIDE_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type, 
                status: action.status, 
                error: action.error,
                lastUpdated: action.receivedAt
            });

        case REQUEST_PRODUCT_DATA:
            return Object.assign({}, state, {
                isFetching: true, 
                type: action.type, 
                status: '', 
                productList: [],
                lastUpdated: action.receivedAt
            });
      
        case RECEIVE_PRODUCT_DATA:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type, 
                status: action.status, 
                productList: action.data,
                lastUpdated: action.receivedAt
            });

        case RECEIVE_PRODUCT_DATA_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type, 
                status: action.status, 
                error: action.error,
                lastUpdated: action.receivedAt
            });

        default:
            return state
    }
}

export default productReducer;