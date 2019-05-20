import { createSelector } from 'reselect';
import { getReportReducer } from './common';
import get from 'lodash/get';
import map from 'lodash/map';
import moment from "moment";
import DineroInit from '../Global/Components/DineroInit';

const zReportDetails = state => get(getReportReducer(state), 'zReportData.zReportDetail', [])

const mapZReoprtDetails = data => (
    map(data, mapData)
)

const mapData = data => ({
    shiftId: get(data, 'shift.id', ''),
    openingAmount: DineroInit(get(data, 'shift.openingBalance.amount', 0)).toFormat('$0,0.00'),
    staff: get(data, 'staff.person.firstName', '') + ' ' + get(data, 'staff.person.lastName', ''),
    pos: get(data, 'terminal.name', ''),
    openFrom: moment(get(data, 'shift.openingTimeStamp.seconds', 0)* 1000) != 0 ? moment(get(data, 'shift.openingTimeStamp.seconds', 0)* 1000).format("MM/DD/YYYY h:mm a") : '',
    closedAt: moment.utc(get(data, 'shift.closingTimeStamp.seconds', 0)* 1000) != 0 ? moment(get(data, 'shift.closingTimeStamp.seconds', 0)* 1000).format("MM/DD/YYYY h:mm a") : '',
    cashSales: DineroInit(get(data, 'shift.cashSalesAmount', 0)).toFormat('$0,0.00'),
    cardSales: DineroInit(get(data, 'shift.cardSalesAmount', 0)).toFormat('$0,0.00'),
    cashAdded: DineroInit(get(data,'shift.cashAdded',0)).toFormat('$0,0.00'),
    cashRemoved: DineroInit(get(data, 'shift.cashRemoved',0)).toFormat('$0,0.00'),
    realClosingBalance: DineroInit(get(data, 'shift.closingBalance.amount', 0)).toFormat('$0,0.00'),
    theoreticalClosingBalance: DineroInit(get(data, 'shift.currentBalance.amount', 0)).toFormat('$0,0.00'),
    difference: DineroInit(get(data, 'shift.closingBalance.amount', 0)).subtract(DineroInit(get(data, 'shift.theoreticalClosingBalance', 0))).toFormat('$0,0.00'),
    totalSales: DineroInit(get(data, 'shift.totalSalesAmount',0)).toFormat('$0,0.00'),
    taxAmount: DineroInit(get(data, 'shift.taxAmount',0)).toFormat('$0,0.00'),
    totalSalesAmount: DineroInit(get(data, 'shift.totalSalesAmount',0)).toFormat('$0,0.00'),
    preTaxSalesAmount: DineroInit(get(data, 'shift.preTaxSalesAmount',0)).toFormat('$0,0.00'),
    totalDiscountAmount: DineroInit(get(data,'shift.totalDiscountAmount',0)).toFormat('$0,0.00'),
    cashRefundAmount: DineroInit(get(data,'shift.cashRefundAmount',0)).toFormat('$0,0.00'),
    cardRefundAmount: DineroInit(get(data,'shift.cardRefundAmount',0)).toFormat('$0,0.00'),
    giftCardRefundAmount: DineroInit(get(data,'shift.giftCardRefundAmount',0)).toFormat('$0,0.00'),
    employeeDeductSalesAmount: DineroInit(get(data,'shift.employeeDeductSalesAmount',0)).toFormat('$0,0.00'),
    costCenterChargeSalesAmount: DineroInit(get(data,'shift.costCenterChargeSalesAmount',0)).toFormat('$0,0.00'),
    loyaltySalesAmount: DineroInit(get(data,'shift.loyaltySalesAmount',0)).toFormat('$0,0.00'),
    decliningBalanceSalesAmount: DineroInit(get(data,'shift.decliningBalanceSalesAmount',0)).toFormat('$0,0.00'),
    giftCardSalesAmount: DineroInit(get(data,'shift.giftCardSalesAmount',0)).toFormat('$0,0.00'),
})


const ZReportDetailsSel = createSelector(
    zReportDetails,
    mapZReoprtDetails
)

export { ZReportDetailsSel };