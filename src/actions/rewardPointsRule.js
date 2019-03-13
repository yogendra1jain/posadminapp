import * as REWARD_POINT_CONSTANTS from '../constants/rewardPointsRule';
import dynamicActionWrapper from '../helpers/actionHelper';

const initCreateRpEarningRule = (subreddit) => ({
    type: REWARD_POINT_CONSTANTS.INIT_CREATE_RP_EARNING_RULE,
    subreddit
});

const successCreateRpEarningRule = (subreddit, data, status, resolve) => {
    resolve(data);
    return ({
        type: REWARD_POINT_CONSTANTS.SUCCESS_CREATE_RP_EARNING_RULE,
        subreddit,
        data,
        status,
        receivedAt: Date.now()
    });
}
const failCreateRpEarningRule = (subreddit, error, status, reject) => {
    reject(error)
    return ({
        type: REWARD_POINT_CONSTANTS.FAILED_CREATE_RP_EARNING_RULE,
        subreddit,
        error,
        status,
        receivedAt: Date.now()
    })
} 

export const createRewardPointsEarningRule = (subreddit, url, data) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(dynamicActionWrapper({
            path: REWARD_POINT_CONSTANTS.MAIN_URL + url,
            method: 'POST',
            body: data,
            initCb: initCreateRpEarningRule,
            successCb: successCreateRpEarningRule,
            failureCb: failCreateRpEarningRule,
            resolve: resolve,
            reject: reject,
            subreddit,
            wrapperActionType: 'CREATE_REWARD_POINTS_EARNING_RULE',
            redirect: 'follow'
        }));
    })
}

const initCreateRpRedeemptionRule = (subreddit) => ({
    type: REWARD_POINT_CONSTANTS.INIT_CREATE_RP_REDEEMPTION_RULE,
    subreddit
});

const successCreateRpRedeemptionRule = (subreddit, data, status, resolve) => {
    resolve(data);
    return ({
        type: REWARD_POINT_CONSTANTS.SUCCESS_CREATE_RP_REDEEMPTION_RULE,
        subreddit,
        data,
        status,
        receivedAt: Date.now()
    });
}
const failCreateRpRedeemptionRule = (subreddit, error, status, reject) => {
    reject(error)
    return ({
        type: REWARD_POINT_CONSTANTS.FAILED_CREATE_RP_REDEEMPTION_RULE,
        subreddit,
        error,
        status,
        receivedAt: Date.now()
    })
} 

export const createRewardPointsRedeemptionRule = (subreddit, url, data) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(dynamicActionWrapper({
            path: REWARD_POINT_CONSTANTS.MAIN_URL + url,
            method: 'POST',
            body: data,
            initCb: initCreateRpRedeemptionRule,
            successCb: successCreateRpRedeemptionRule,
            failureCb: failCreateRpRedeemptionRule,
            resolve: resolve,
            reject: reject,
            subreddit,
            wrapperActionType: 'CREATE_REWARD_POINTS_EARNING_RULE',
            redirect: 'follow'
        }));
    })
}