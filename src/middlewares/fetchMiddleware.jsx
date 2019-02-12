import _isEmpty from 'lodash/isEmpty';
import _pickBy from 'lodash/pickBy';
import { generateV1uuid } from '../helpers/helpers.js';
import { onLogout } from '../actions/userRoles';

// pure function
const addOptionalOptions = (config, options) => {
    debugger
    let newOptions = { ...options };
    // if (!_isEmpty(config.body)) {
        if (config.isFormData && _isEmpty(config.body)) {
            newOptions.body = config.formData;
        } else {
            newOptions.body = JSON.stringify(config.body);
        }

    return newOptions;
}

const httpVerbs = {
    post: 'POST',
    get: 'GET',
    put: 'PUT',
    patch: 'PATCH',
    delete: 'DELETE'
};

const fetchMiddleware = store => next => action => {
    if (!action || !action.fetchConfig) {
        return next(action)
    }
    let dispatch = store.dispatch;
    let config = action.fetchConfig;
    const subreddit = action.subreddit;
    let status = '';
    const id = action.id;
    //@todo multiple params
    dispatch(config.initHandler(subreddit))

    const path = config.path || "/"
    const argMethod = config.method || "GET";

    const method = httpVerbs[argMethod.toLowerCase()];


    const headers = config.headers && { ...config.headers } || {};
    const successHandler = config.success;
    const failureHandler = config.failure || function (subreddit, error, errCode) { return { type: 'DUMMY_ERROR', subreddit, error, errCode } };


    const state = store.getState();

    const metaHeaders = {
        "CorrelationId": generateV1uuid(),
        "Content-Type": config.contentType || 'application/json',
        "Authorization":`Bearer ${localStorage.getItem('Token')}`
    };

    if (!config.doNotSendAuthHeader) {
        // metaHeaders.Authorization = state.userRolesReducer && state.userRolesReducer.authToken
        // metaHeaders.checkauth = true;
    }

    const metaOptions = {
        method,
        headers: {
            ...metaHeaders,
            ...headers
        }
    };

    let options = addOptionalOptions(config, metaOptions);

    const passOnParams = _pickBy(config.passOnParams, param => param);
    if (config.passOnParams) {
        options = {
            ...options,
            ...passOnParams
        }
    }

    fetch(path,
        options)
        .then((response) => {
            status = response.status;
            return response.json()
                .then((jsonData) => {
                    // if (jsonData.message === 'jwt expired') {
                    //     dispatch(onLogout());
                    // } else {
                        return Promise.resolve(jsonData);
                    // }
                })
                .catch((err) => {
                    // @todo temp handling, need to fix bff api response
                    console.error(err);
                    return Promise.resolve({});
                })
        })
        .then(json => dispatch(successHandler(subreddit, json, status, id, action.successCbPassOnParams)))
        .catch(error => dispatch(failureHandler(subreddit, error, 500)))
}

export default fetchMiddleware;