import { createSelector } from 'reselect';
import { getReportReducer } from './common';
import get from 'lodash/get';
import map from 'lodash/map';
import moment from "moment";

const empPayrollDeductDetails = state => get(getReportReducer(state), 'empPayrollDeductDetailsData.employeePayrollDeductDetail', [])

const mapEmpPayrollDeductDetails = data => (
    map(data, mapData)
)

const mapData = data => ({
    employeeId: get(data, 'employee.id', ''),
    employeeName: get(data, 'employee.customer.firstName', '') + ' ' + get(data, 'employee.customer.lastName', ''),
    orderId: get(data, 'saleId', ''),
    totalSales: get(data, 'employeePayDeductAmount.amount', 0).toFixed(2),
    totalRefund: get(data, 'saleTransactions.totalRefund', 0),
    orderDate: moment.utc(get(data, 'saleTimestamp.seconds', 0)* 1000).format("DD-MMM-YYYY")
})

const EmpPayrollDeductDetailsSel = createSelector(
    empPayrollDeductDetails,
    mapEmpPayrollDeductDetails
)

export { EmpPayrollDeductDetailsSel };