import * as CATEGORIES_CONSTANTS from '../constants/categories';
import dynamicActionWrapper from '../helpers/actionHelper';

// Action start for post login

let status = '';

export const getLevel1Categories = (subreddit, url, data) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: CATEGORIES_CONSTANTS.MAIN_URL + url,
        method: 'POST',
        body: data,
        initCb: level1CategoryRequest,
        successCb: level1CategoryRecieve,
        failureCb: level1CategoryRecieveError,
        resolve: '',
        reject: '',
        subreddit,
        wrapperActionType: 'FETCH_LEVEL_1_WRAPPER',
        redirect: 'follow'
    }));

const level1CategoryRequest = (subreddit) => ({
    type: CATEGORIES_CONSTANTS.LEVEL_1_REQUEST,
    subreddit
});

const level1CategoryRecieveError = (subreddit, err, errCode) => ({
    type: CATEGORIES_CONSTANTS.LEVEL_1_RECIEVE_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

const level1CategoryRecieve = (subreddit, json, status) => ({
    type: CATEGORIES_CONSTANTS.LEVEL_1_RECIEVE,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

export const getAllByRetailerId = (subreddit, url, data) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: CATEGORIES_CONSTANTS.MAIN_URL + url,
        method: 'POST',
        body: data,
        initCb: allCategoriesRequest,
        successCb: allCategoriesRecieve,
        failureCb: allCategoriesRecieveError,
        resolve: '',
        reject: '',
        subreddit,
        wrapperActionType: 'FETCH_ALL_CATEGORIES_WRAPPER',
        redirect: 'follow'
    }));

const allCategoriesRequest = (subreddit) => ({
    type: CATEGORIES_CONSTANTS.ALL_CATEGORIES_REQUEST,
    subreddit
});

const allCategoriesRecieveError = (subreddit, err, errCode) => ({
    type: CATEGORIES_CONSTANTS.ALL_CATEGORIES_RECIEVE_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

const allCategoriesRecieve = (subreddit, json, status) => ({
    type: CATEGORIES_CONSTANTS.ALL_CATEGORIES_RECIEVE,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})


