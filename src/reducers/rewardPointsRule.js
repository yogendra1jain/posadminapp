import _get from 'lodash/get';
import {
   INIT_CREATE_RP_EARNING_RULE,
   SUCCESS_CREATE_RP_EARNING_RULE,
   FAILED_CREATE_RP_EARNING_RULE,
   INIT_CREATE_RP_REDEEMPTION_RULE,
   SUCCESS_CREATE_RP_REDEEMPTION_RULE,
   FAILED_CREATE_RP_REDEEMPTION_RULE
} from '../constants/rewardPointsRule';

const productReducer = (state = {
    rewardPointsEarningRule: {},
    rewardPointsRedeemptionRule: {},
    rpEarningLoader: false,
    rpRedeemptionLoader: false,
    error:'',
    type: '',
    status: ''
}, action) => {
    switch (action.type) {
        case INIT_CREATE_RP_EARNING_RULE:
            return Object.assign({}, state, {
                rpEarningLoader: true, 
                type: action.type, 
                status: '', 
                rewardPointsEarningRule: {},
                lastUpdated: action.receivedAt
            });
      
        case SUCCESS_CREATE_RP_EARNING_RULE:
            return Object.assign({}, state, {
                rpEarningLoader: false,
                type: action.type, 
                status: action.status, 
                rewardPointsEarningRule: action.data,
                lastUpdated: action.receivedAt
            });

        case FAILED_CREATE_RP_EARNING_RULE:
            return Object.assign({}, state, {
                rpEarningLoader: false,
                type: action.type, 
                status: action.status, 
                error: action.error,
                lastUpdated: action.receivedAt
            });


        case INIT_CREATE_RP_REDEEMPTION_RULE:
            return Object.assign({}, state, {
                rpRedeemptionLoader: true, 
                type: action.type, 
                status: '', 
                rewardPointsRedeemptionRule: {},
                lastUpdated: action.receivedAt
            });
      
        case SUCCESS_CREATE_RP_REDEEMPTION_RULE:
            return Object.assign({}, state, {
                rpRedeemptionLoader: false,
                type: action.type, 
                status: action.status, 
                rewardPointsRedeemptionRule: action.data,
                lastUpdated: action.receivedAt
            });

        case FAILED_CREATE_RP_REDEEMPTION_RULE:
            return Object.assign({}, state, {
                rpRedeemptionLoader: false,
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