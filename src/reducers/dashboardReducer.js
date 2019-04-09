import _get from 'lodash/get';
import _cloneDeep from 'lodash/cloneDeep';
import _set from 'lodash/set';

const dashboardReducer = (state = {
    isFetching: false,
    didInvalidate: false,
    type: '',
    status: '',
    paymentMethodPieChartData: []
}, action) => {
    switch (action.type) {
        case 'savePaymentMethodPieChartData':
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                status: action.status,
                didInvalidate: false,
                paymentMethodPieChartData: action.data,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}

export {
    dashboardReducer
}

export default dashboardReducer;