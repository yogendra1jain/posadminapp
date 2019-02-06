import * as RULES_CONSTANTS from '../constants/rules';
import dynamicActionWrapper from '../helpers/actionHelper';

// Action start for post login

let status = '';

const requestRewardEarnRule = (subreddit)=> ({
    type: RULES_CONSTANTS.REQUEST_REWARD_EARN_RULE,
    subreddit
});

const receiveRewardEarnRuleError = (subreddit,err,errCode) => ({
    type: RULES_CONSTANTS.RECEIVED_REWARD_EARN_RULE_ERROR,
    subreddit,
    error: err,
    status: errCode
})

const receiveRewardEarnRule = (subreddit, json, status )=> ({
    type: RULES_CONSTANTS.RECEIVED_REWARD_EARN_RULE,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

// export const fetchRewardEarnRule = (subreddit, url) => dispatch => {
    
//     dispatch(requestRewardEarnRule(subreddit));
    
//     fetch(RULES_CONSTANTS.RULE_URL+url, { method: 'GET',
//     headers: {
//         "Content-type": "application/json"
//     },
//     // body: JSON.stringify(data)
//     })
//     .then(response => {
//         status = response.status;
         
//         return response.json() } 
//     )
//     .then(json => { return dispatch(receiveRewardEarnRule(subreddit, json, status )) } )
//     .catch(err => { return dispatch(receiveRewardEarnRuleError(subreddit,err,500)) } )
// }

export const fetchRewardEarnRule = (subreddit, url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: RULES_CONSTANTS.RULE_URL+url,
        method: 'GET',
        initCb: requestRewardEarnRule,
        successCb: receiveRewardEarnRule,
        failureCb: receiveRewardEarnRuleError,
        subreddit,
        wrapperActionType: 'FETCH_REWARD_EARN_RULE_WRAPPER',
        redirect: 'follow'
    }));


const requestRewardEarnRuleData = (subreddit)=> ({
    type: RULES_CONSTANTS.REQUEST_REWARD_EARN_RULE_DATA,
    subreddit
});

const receiveRewardEarnRuleDataError = (subreddit,err,errCode) => ({
    type: RULES_CONSTANTS.RECEIVED_REWARD_EARN_RULE_DATA_ERROR,
    subreddit,
    error: err,
    errorCode: errCode
})

const receiveRewardEarnRuleData = (subreddit, json, status )=> ({
    type: RULES_CONSTANTS.RECEIVED_REWARD_EARN_RULE_DATA,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

// export const saveRewardEarnRuleData = (subreddit, data,method, url) => dispatch => {
    
//     dispatch(requestRewardEarnRuleData(subreddit));
    
//     fetch(RULES_CONSTANTS.RULE_URL+url, { method: method,
//     headers: {
//         "Content-type": "application/json"
//     },
//     body: JSON.stringify(data)
//     })
//     .then(response => {
//         status = response.status;
         
//         return response.json() } 
//     )
//     .then(json => { return dispatch(receiveRewardEarnRuleData(subreddit, json, status )) } )
//     .catch(err => { return dispatch(receiveRewardEarnRuleDataError(subreddit,err,500)) } )
// }

export const saveRewardEarnRuleData = (subreddit, data,method, url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: RULES_CONSTANTS.RULE_URL+url,
        method: method,
        body: data,
        initCb: requestRewardEarnRuleData,
        successCb: receiveRewardEarnRuleData,
        failureCb: receiveRewardEarnRuleDataError,
        subreddit,
        wrapperActionType: 'SAVE_REWARD_EARN_RULE_WRAPPER',
        redirect: 'follow'
    }));