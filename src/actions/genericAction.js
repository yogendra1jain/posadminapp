import dynamicActionWrapper from '../helpers/actionHelper';

export const getData = (url, data, subreddit, constants, uploadConfig) => dispatch => {
    debugger
    return new Promise((resolve, reject) => {
        dispatch(dynamicActionWrapper({
            path: url,
            method: 'POST',
            body: data,
            uploadConfig,
            initCb: request,
            successCb: receive,
            failureCb: receiveError,
            resolve: '',
            reject: '',
            subreddit,
            constants,
            redirect: 'follow',
        }))
    })
}

export const request = (subreddit, constants) => {
    return ({
        type: constants.init,
        subreddit
    })
}
export const receive = (subreddit, json, id, resolve, constants) => {
    resolve(json)
    return {
        type: constants.success,
        subreddit,
        data: json,
        receivedAt: Date.now()
    }
};

export const receiveError = (subreddit, err, errCode, reject, constants) => {
    reject(err);
    return ({
        type: constants.error,
        subreddit,
        error: err,
        errorCode: errCode
    })
};

