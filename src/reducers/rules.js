import { combineReducers } from 'redux';
import _get from 'lodash/get';
import {
  REQUEST_REWARD_EARN_RULE,
  RECEIVED_REWARD_EARN_RULE,
  RECEIVED_REWARD_EARN_RULE_ERROR,
  REQUEST_REWARD_EARN_RULE_DATA,
  RECEIVED_REWARD_EARN_RULE_DATA,
  RECEIVED_REWARD_EARN_RULE_DATA_ERROR

} from '../constants/rules';

const ruleReducer = (state = 'ruleState', action) => {
  switch (action.type) {
    default:
      return state
  }
}


const rulesData = (state = {
  isFetching: false,
  didInvalidate: false,
  type: '',
  status: '',
  rewardEarnRules: [] ,  
}, action) => {
  switch (action.type) {
    case REQUEST_REWARD_EARN_RULE:
      return Object.assign({}, state, {
        isFetching: true,rewardEarnRules:[],
        type: action.type, lastUpdated: action.receivedAt
      });
    case RECEIVED_REWARD_EARN_RULE:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false,rewardEarnRules: action.data, 
        lastUpdated: action.receivedAt
      });
    case RECEIVED_REWARD_EARN_RULE_ERROR:
      return Object.assign({}, state, {
        isFetching: false,rewardEarnRules: action.error,
        status: action.status,
        type: action.type, lastUpdated: action.receivedAt
      });
    case REQUEST_REWARD_EARN_RULE_DATA:
      return Object.assign({}, state, {
        isFetching: true,rewardEarnRulesData:[],
        type: action.type, lastUpdated: action.receivedAt
      });
    case RECEIVED_REWARD_EARN_RULE_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type, status: action.status,
        didInvalidate: false,rewardEarnRulesData: action.data, 
        lastUpdated: action.receivedAt
      });
    case RECEIVED_REWARD_EARN_RULE_DATA_ERROR:
      return Object.assign({}, state, {
        isFetching: false,rewardEarnRulesData: action.error,
        type: action.type, lastUpdated: action.receivedAt
      });
    

    default:
      return state
  }
}


export {
    rulesData
}

export default ruleReducer;