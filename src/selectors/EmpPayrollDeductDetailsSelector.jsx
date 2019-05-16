import { createSelector } from 'reselect';
import { getReportReducer } from './common';
import get from 'lodash/get';
import map from 'lodash/map';
import moment from "moment";
import DineroInit from '../Global/Components/DineroInit';

const empPayrollDeductDetails = state => get(getReportReducer(state), 'empPayrollDeductDetailsData.employeePayrollDeductDetail', [])

const mapEmpPayrollDeductDetails = data => (
    map(data, mapData)
)

const mapData = data => ({
    employeeId: get(data, 'employee.id', ''),
    employeeName: get(data, 'employee.customer.firstName', '') + ' ' + get(data, 'employee.customer.lastName', ''),
    orderId: get(data, 'saleId', ''),
    totalSales: DineroInit(get(data, 'employeePayDeductAmount.amount', 0)).toFormat('$0,0.00'),
    totalRefund: DineroInit(get(data, 'saleTransactions.totalRefund', 0)).toFormat('$0,0.00'),
    orderDate: moment(get(data, 'saleTimestamp.seconds', 0)* 1000).format("MM/DD/YYYY h:mm a")
})

const EmpPayrollDeductDetailsSel = createSelector(
    empPayrollDeductDetails,
    mapEmpPayrollDeductDetails
)

export { EmpPayrollDeductDetailsSel };