import * as REPORT_CONSTANTS from '../constants/reports';
import dynamicActionWrapper from '../helpers/actionHelper';
import {
    debug
} from 'util';

let status = '';

export const requestProductVolumeData = subreddit => ({
    type: REPORT_CONSTANTS.REQUEST_PRODUCT_VOLUME_DATA,
    subreddit
})

export const receiveProductVolumeData = (subreddit, json) => ({
    type: REPORT_CONSTANTS.RECEIVE_PRODUCT_VOLUME_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
})

export const GetProductVolumeData = (subreddit, url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'GET',
        initCb: requestProductVolumeData,
        successCb: receiveProductVolumeData,
        // failureCb: receiveProductLookupDataError,
        subreddit,
        wrapperActionType: 'FETCH_PRODUCT_VOLUME_DATA_WRAPPER',
        redirect: 'follow'
    }));

export const requestProductWiseVolumeData = subreddit => ({
    type: REPORT_CONSTANTS.REQUEST_PRODUCT_WISE_VOLUME_DATA,
    subreddit
})

export const receiveProductWiseVolumeData = (subreddit, json) => ({
    type: REPORT_CONSTANTS.RECEIVE_PRODUCT_WISE_VOLUME_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
})

export const GetProductWiseVolumeData = (subreddit, url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'GET',
        initCb: requestProductWiseVolumeData,
        successCb: receiveProductWiseVolumeData,
        // failureCb: receiveProductLookupDataError,
        subreddit,
        wrapperActionType: 'FETCH_PRODUCT_WISE_VOLUME_DATA_WRAPPER',
        redirect: 'follow'
    }));

export const requestProductWiseProfitData = subreddit => ({
    type: REPORT_CONSTANTS.REQUEST_PRODUCT_WISE_PROFIT_DATA,
    subreddit
})

export const receiveProductWiseProfitData = (subreddit, json) => ({
    type: REPORT_CONSTANTS.RECEIVE_PRODUCT_WISE_PROFIT_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
})

export const GetProductWiseProfitData = (subreddit, url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'GET',
        initCb: requestProductWiseProfitData,
        successCb: receiveProductWiseProfitData,
        // failureCb: receiveProductLookupDataError,
        subreddit,
        wrapperActionType: 'FETCH_PRODUCT_WISE_PROFIT_DATA_WRAPPER',
        redirect: 'follow'
    }));

export const requestProductRevenueData = subreddit => ({
    type: REPORT_CONSTANTS.REQUEST_PRODUCT_REVENUE_DATA,
    subreddit
})

export const receiveProductRevenueData = (subreddit, json) => ({
    type: REPORT_CONSTANTS.RECEIVE_PRODUCT_REVENUE_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
})

export const GetProductRevenueData = (subreddit, url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'GET',
        initCb: requestProductRevenueData,
        successCb: receiveProductRevenueData,
        // failureCb: receiveProductLookupDataError,
        subreddit,
        wrapperActionType: 'FETCH_PRODUCT_WISE_PROFIT_REVENUE_WRAPPER',
        redirect: 'follow'
    }));

export const requestProductWiseRevenueData = subreddit => ({
    type: REPORT_CONSTANTS.REQUEST_PRODUCT_WISE_REVENUE_DATA,
    subreddit
})

export const receiveProductWiseRevenueData = (subreddit, json) => ({
    type: REPORT_CONSTANTS.RECEIVE_PRODUCT_WISE_REVENUE_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
})

export const GetProductWiseRevenueData = (subreddit, url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'GET',
        initCb: requestProductWiseRevenueData,
        successCb: receiveProductWiseRevenueData,
        // failureCb: receiveProductLookupDataError,
        subreddit,
        wrapperActionType: 'FETCH_PRODUCT_WISE_REVENUE_DATA_WRAPPER',
        redirect: 'follow'
    }));

export const requestProductProfitData = subreddit => ({
    type: REPORT_CONSTANTS.REQUEST_PRODUCT_PROFIT_DATA,
    subreddit
})

export const receiveProductProfitData = (subreddit, json) => ({
    type: REPORT_CONSTANTS.RECEIVE_PRODUCT_PROFIT_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
})

export const GetProductProfitData = (subreddit, url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'GET',
        initCb: requestProductProfitData,
        successCb: receiveProductProfitData,
        // failureCb: receiveProductLookupDataError,
        subreddit,
        wrapperActionType: 'FETCH_PRODUCT_PROFIT_DATA_WRAPPER',
        redirect: 'follow'
    }));

export const requestProductAllData = subreddit => ({
    type: REPORT_CONSTANTS.REQUEST_PRODUCT_ALL_DATA,
    subreddit
})

export const receiveProductAllData = (subreddit, json) => ({
    type: REPORT_CONSTANTS.RECEIVE_PRODUCT_ALL_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
})

export const GetProductAllData = (subreddit, url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'GET',
        initCb: requestProductAllData,
        successCb: receiveProductAllData,
        // failureCb: receiveProductLookupDataError,
        subreddit,
        wrapperActionType: 'FETCH_PRODUCT_ALL_DATA_WRAPPER',
        redirect: 'follow'
    }));

export const requestCustomerData = subreddit => ({
    type: REPORT_CONSTANTS.REQUEST_CUSTOMER_DATA,
    subreddit
})

export const receiveCustomerData = (subreddit, json) => ({
    type: REPORT_CONSTANTS.RECEIVE_CUSTOMER_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
})

export const GetCustomerData = (subreddit, url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'GET',
        initCb: requestCustomerData,
        successCb: receiveCustomerData,
        // failureCb: receiveProductLookupDataError,
        subreddit,
        wrapperActionType: 'FETCH_CUSTOMER_DATA_WRAPPER',
        redirect: 'follow'
    }));

export const requestInventoryData = subreddit => ({
    type: REPORT_CONSTANTS.REQUEST_INVENTORY_DATA,
    subreddit
})

export const receiveInventoryData = (subreddit, json) => ({
    type: REPORT_CONSTANTS.RECEIVE_INVENTORY_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
})

export const GetInventoryData = (subreddit, url) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'GET',
        initCb: requestInventoryData,
        successCb: receiveInventoryData,
        // failureCb: receiveProductLookupDataError,
        subreddit,
        wrapperActionType: 'FETCH_INVENTORY_DATA_WRAPPER',
        redirect: 'follow'
    }));

export const requestSaleByStoreData = subreddit => ({
    type: REPORT_CONSTANTS.REQUEST_SALE_BY_STORE_DATA,
    subreddit
})

export const receiveSaleByStoreData = (subreddit, json) => ({
    type: REPORT_CONSTANTS.RECEIVE_SALE_BY_STORE_DATA,
    subreddit,
    data: json,
    receivedAt: Date.now()
})

export const requestTopProducts = subreddit => ({
    type: REPORT_CONSTANTS.REQUEST_TOP_PRODUCTS,
    subreddit
})

export const receiveTopProducts = (subreddit, json) => ({
    type: REPORT_CONSTANTS.RECEIVE_TOP_PRODUCTS,
    subreddit,
    data: json,
    receivedAt: Date.now()
})

export const GetTopProducts = (subreddit, url, data) => dispatch =>
    dispatch(dynamicActionWrapper({
        path: url,
        method: 'POST',
        body: data,
        initCb: requestTopProducts,
        successCb: receiveTopProducts,
        // failureCb: receiveProductLookupDataError,
        subreddit,
        wrapperActionType: 'FETCH_TOP_PRODUCTS_WRAPPER',
        redirect: 'follow'
    }));

const requestEmpPayrollDeductDetails = (subreddit) => ({
    type: REPORT_CONSTANTS.REQUEST_EMP_PAYROLL_DEDUCT_DETAILS,
    subreddit
});

const receiveEmpPayrollDeductDetails = (subreddit, data, status, resolve) => {
    resolve(data);
    return ({
        type: REPORT_CONSTANTS.RECEIVE_EMP_PAYROLL_DEDUCT_DETAILS,
        subreddit,
        data,
        receivedAt: Date.now()
    });
}
const receiveEmpPayrollDeductDetailsError = (subreddit, error, status, reject) => {
    reject(error)
    return ({
        type: REPORT_CONSTANTS.RECEIVE_EMP_PAYROLL_DEDUCT_DETAILS_ERROR,
        subreddit,
        error,
        receivedAt: Date.now()
    })
} 

export const fetchEmpPayrollDeductDetails = (subreddit, url, data) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(dynamicActionWrapper({
            path: REPORT_CONSTANTS.PRODUCT_LOOKUP_URL + url,
            method: 'POST',
            body: data,
            initCb: requestEmpPayrollDeductDetails,
            successCb: receiveEmpPayrollDeductDetails,
            failureCb: receiveEmpPayrollDeductDetailsError,
            resolve: resolve,
            reject: reject,
            subreddit,
            wrapperActionType: 'FETCH_EMP_PAYROLL_DEDUCT_DETAILS_WRAPPER',
            redirect: 'follow'
        }));
    })
}

const requestEmpPayrollDeductSummary = (subreddit) => ({
    type: REPORT_CONSTANTS.REQUEST_EMP_PAYROLL_DEDUCT_SUMMARY,
    subreddit
});

const receiveEmpPayrollDeductSummary = (subreddit, data, status, resolve) => {
    resolve(data);
    return ({
        type: REPORT_CONSTANTS.RECEIVE_EMP_PAYROLL_DEDUCT_SUMMARY,
        subreddit,
        data,
        receivedAt: Date.now()
    });
}
const receiveEmpPayrollDeductSummaryError = (subreddit, error, status, reject) => {
    reject(error)
    return ({
        type: REPORT_CONSTANTS.RECEIVE_EMP_PAYROLL_DEDUCT_SUMMARY_ERROR,
        subreddit,
        error,
        receivedAt: Date.now()
    })
} 

export const fetchEmpPayrollDeductSummary = (subreddit, url, data) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(dynamicActionWrapper({
            path: REPORT_CONSTANTS.PRODUCT_LOOKUP_URL + url,
            method: 'POST',
            body: data,
            initCb: requestEmpPayrollDeductSummary,
            successCb: receiveEmpPayrollDeductSummary,
            failureCb: receiveEmpPayrollDeductSummaryError,
            resolve: resolve,
            reject: reject,
            subreddit,
            wrapperActionType: 'FETCH_EMP_PAYROLL_DEDUCT_SUMMARY_WRAPPER',
            redirect: 'follow'
        }));
    })
}

const requestEmpDiscountReport = (subreddit) => ({
    type: REPORT_CONSTANTS.REQUEST_EMP_DISCOUNT_REPORT,
    subreddit
});

const receiveEmpDiscountReport = (subreddit, data, status, resolve) => {
    resolve(data);
    return ({
        type: REPORT_CONSTANTS.RECEIVE_EMP_DISCOUNT_REPORT,
        subreddit,
        data,
        receivedAt: Date.now()
    });
}
const receiveEmpDiscountReportError = (subreddit, error, status, reject) => {
    reject(error)
    return ({
        type: REPORT_CONSTANTS.RECEIVE_EMP_DISCOUNT_REPORT_ERROR,
        subreddit,
        error,
        receivedAt: Date.now()
    })
} 

export const fetchEmpDiscountReportData = (subreddit, url, data) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(dynamicActionWrapper({
            path: REPORT_CONSTANTS.PRODUCT_LOOKUP_URL + url,
            method: 'POST',
            body: data,
            initCb: requestEmpDiscountReport,
            successCb: receiveEmpDiscountReport,
            failureCb: receiveEmpDiscountReportError,
            resolve: resolve,
            reject: reject,
            subreddit,
            wrapperActionType: 'FETCH_EMP_DISCOUNT_REPORT_WRAPPER',
            redirect: 'follow'
        }));
    })
}

const requestEmpDetailsList = (subreddit) => ({
    type: REPORT_CONSTANTS.REQUEST_EMP_DETAILS_LIST,
    subreddit
});

const receiveEmpDetailsList = (subreddit, data, status, resolve) => {
    resolve(data);
    return ({
        type: REPORT_CONSTANTS.RECEIVE_EMP_DETAILS_LIST,
        subreddit,
        data,
        receivedAt: Date.now()
    });
}
const receiveEmpDetailsListError = (subreddit, error, status, reject) => {
    reject(error)
    return ({
        type: REPORT_CONSTANTS.RECEIVE_EMP_DETAILS_LIST_ERROR,
        subreddit,
        error,
        receivedAt: Date.now()
    })
} 

export const fetchEmpDetailsData = (subreddit, url, data) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(dynamicActionWrapper({
            path: REPORT_CONSTANTS.PRODUCT_LOOKUP_URL + url,
            method: 'POST',
            body: data,
            initCb: requestEmpDetailsList,
            successCb: receiveEmpDetailsList,
            failureCb: receiveEmpDetailsListError,
            resolve: resolve,
            reject: reject,
            subreddit,
            wrapperActionType: 'FETCH_EMP_DETAILS_LIST_WRAPPER',
            redirect: 'follow'
        }));
    })
}

const requestZReportData = (subreddit) => ({
    type: REPORT_CONSTANTS.REQUEST_Z_REPORT_DATA,
    subreddit
});

const receiveZReportData = (subreddit, data, status, resolve) => {
    resolve(data);
    return ({
        type: REPORT_CONSTANTS.RECEIVE_Z_REPORT_DATA,
        subreddit,
        data,
        receivedAt: Date.now()
    });
}
const receiveZReportDataError = (subreddit, error, status, reject) => {
    reject(error)
    return ({
        type: REPORT_CONSTANTS.RECEIVE_Z_REPORT_DATA_ERROR,
        subreddit,
        error,
        receivedAt: Date.now()
    })
} 

export const fetchZReportData = (subreddit, url, data) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(dynamicActionWrapper({
            path: REPORT_CONSTANTS.PRODUCT_LOOKUP_URL + url,
            method: 'POST',
            body: data,
            initCb: requestZReportData,
            successCb: receiveZReportData,
            failureCb: receiveZReportDataError,
            resolve: resolve,
            reject: reject,
            subreddit,
            wrapperActionType: 'FETCH_Z_REPORT_DATA_WRAPPER',
            redirect: 'follow'
        }));
    })
}

const requestSaleReportData = (subreddit) => ({
    type: REPORT_CONSTANTS.REQUEST_SALE_REPORT_DATA,
    subreddit
});

const receiveSaleReportData = (subreddit, data, status, resolve) => {
    resolve(data);
    return ({
        type: REPORT_CONSTANTS.RECEIVE_SALE_REPORT_DATA,
        subreddit,
        data,
        receivedAt: Date.now()
    });
}
const receiveSaleReportDataError = (subreddit, error, status, reject) => {
    reject(error)
    return ({
        type: REPORT_CONSTANTS.RECEIVE_SALE_REPORT_DATA_ERROR,
        subreddit,
        error,
        receivedAt: Date.now()
    })
} 

export const fetchSaleReportData = (subreddit, url, data) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(dynamicActionWrapper({
            path: REPORT_CONSTANTS.PRODUCT_LOOKUP_URL + url,
            method: 'POST',
            body: data,
            initCb: requestSaleReportData,
            successCb: receiveSaleReportData,
            failureCb: receiveSaleReportDataError,
            resolve: resolve,
            reject: reject,
            subreddit,
            wrapperActionType: 'FETCH_SALE_REPORT_DATA_WRAPPER',
            redirect: 'follow'
        }));
    })
}