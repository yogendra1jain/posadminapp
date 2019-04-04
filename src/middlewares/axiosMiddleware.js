import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import uuidv1 from 'uuid/v1';


const httpVerbs = {
  post: 'POST',
  get: 'GET',
  put: 'PUT',
  patch: 'PATCH',
  delete: 'DELETE',
};

const axiosMiddleware = store => next => (action) => {
  let authToken = `Bearer ${localStorage.getItem("Token")}`;
  if (!action || !action.fetchConfig) {
    return next(action)
  }

  const { dispatch } = store;
  const { fetchConfig: config, subreddit, id, constants, uploadConfig } = action;
  // @todo multiple params
  dispatch(config.initHandler(subreddit, constants));

  const path = config.path || '/';
  const argMethod = config.method || 'GET';

  const method = httpVerbs[argMethod.toLowerCase()];

  const headers = config.headers && { ...config.headers } || {};
  const successHandler = config.success;
  const resolve = config.resolve;
  const reject = config.reject;
  const failureHandler = config.failure || function (subreddit, error, errCode) {
    return {
      type: 'DUMMY_ERROR', subreddit, error, errCode,
    };
  };

  //const state = store.getState();

  let requestObject = {};

  requestObject.method = method;
  requestObject.url = path;

  if (config.body)
    requestObject.data = config.body;

  requestObject.headers = {
    ...headers,
    originURL: window.origin,
    correlationid: uuidv1(),
    Authorization: `${authToken}`,
    'Content-Type': 'application/json'
  }

  if (uploadConfig)
    requestObject.onUploadProgress = uploadConfig;

  axios(
    requestObject
  )
    .then(responseData => {
      dispatch(successHandler(subreddit, responseData.data, id, resolve, constants))

    }).catch((error) => {
      if (error.response) {
        return dispatch(failureHandler(subreddit, error.response.data, error.response.code, reject, constants))

      } else if (error.request) {
        console.log(error.request, 'request error is here');
        return dispatch(failureHandler(subreddit, { message: 'You are not connected to internet' }, 500, reject, constants))

      } else {
        return dispatch(failureHandler(subreddit, error, 500, reject, constants))
      }

      return dispatch(failureHandler(subreddit, error, 500, reject, constants))
    })
};

export default axiosMiddleware;
