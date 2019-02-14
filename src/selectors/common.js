import _get from 'lodash/get';

const getReportReducer = state => _get(state, 'reportsReducer') || {};

export {
    getReportReducer
}