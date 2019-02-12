import { combineReducers } from 'redux';
import _get from 'lodash/get';
import {
  LEVEL_1_REQUEST,
  LEVEL_1_RECIEVE,
  LEVEL_1_RECIEVE_ERROR,
  ALL_CATEGORIES_REQUEST,
  ALL_CATEGORIES_RECIEVE_ERROR,
  ALL_CATEGORIES_RECIEVE,
} from '../constants/categories';

const categoriesReducer = (state = 'storeState', action) => {
  switch (action.type) {
    default:
      return state
  }
}


const categoriesData = (state = {
  isFetching: false,
  didInvalidate: false,
  type: '',
  status: '',
  categoriesData: [],
  terminalData: [],
  posLogin: [],
}, action) => {
  switch (action.type) {
    case LEVEL_1_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        level1Data: [],
        type: action.type,
        lastUpdated: action.receivedAt
      });
    case LEVEL_1_RECIEVE:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        status: action.status,
        didInvalidate: false,
        level1Data: action.data,
        lastUpdated: action.receivedAt
      });
    case LEVEL_1_RECIEVE_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        status: action.status,
        didInvalidate: false,
        addressData: action.error,
        lastUpdated: action.receivedAt
      });


    case ALL_CATEGORIES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        allCategories: [],
        type: action.type,
        lastUpdated: action.receivedAt
      });
    case ALL_CATEGORIES_RECIEVE:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        status: action.status,
        didInvalidate: false,
        allCategories: action.data,
        selectedStore: [],
        lastUpdated: action.receivedAt
      });
    case ALL_CATEGORIES_RECIEVE_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        status: action.status,
        didInvalidate: false,
        addressData: action.error,
        lastUpdated: action.receivedAt
      });

    default:
      return state
  }
}


export {
    categoriesData
}

export default categoriesReducer;