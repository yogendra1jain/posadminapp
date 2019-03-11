import { createSelector } from 'reselect';
import { getReportReducer } from './common';
import get from 'lodash/get';
import map from 'lodash/map';
import moment from "moment";

const zReportDetails = state => get(getReportReducer(state), 'zReportData.zReportDetail', [])

const mapZReoprtDetails = data => (
    map(data, mapData)
)

const mapData = data => ({
    shiftId: get(data, 'shift.id', ''),
    openingAmount: get(data, 'shift.openingBalance.currencyCode', '') + get(data, 'shift.openingBalance.amount', 0).toFixed(2),
    staff: get(data, 'staff.person.firstName', '') + ' ' + get(data, 'staff.person.lastName', ''),
    pos: get(data, 'terminal.name', ''),
    openFrom: moment.utc(get(data, 'shift.openingTimeStamp.seconds', 0)* 1000) != 0 ? moment.utc(get(data, 'shift.openingTimeStamp.seconds', 0)* 1000).format("DD-MMM-YYYY HH:MM:SS") : '',
    closedAt: moment.utc(get(data, 'shift.closingTimeStamp.seconds', 0)* 1000) != 0 ? moment.utc(get(data, 'shift.closingTimeStamp.seconds', 0)* 1000).format("DD-MMM-YYYY HH:MM:SS") : '',
    cashSales: get(data, 'shift.openingBalance.currencyCode', '') + get(data, 'shift.cashSalesAmount', 0).toFixed(2),
    cardSales: get(data, 'shift.openingBalance.currencyCode', '') + get(data, 'shift.cardSalesAmount', 0).toFixed(2),
    cashAdded: get(data, 'shift.cashAdded',0).toFixed(2),
    cashRemoved: get(data, 'shift.cashRemoved',0).toFixed(2),
    realClosingBalance: get(data, 'shift.openingBalance.currencyCode', '') + get(data, 'shift.closingBalance.amount', 0).toFixed(2),
    theoreticalClosingBalance: get(data, 'shift.openingBalance.currencyCode', '') + get(data, 'shift.theoreticalClosingBalance', 0).toFixed(2),
    difference: parseFloat(get(data, 'shift.closingBalance.amount', 0)) -parseFloat(get(data, 'shift.theoreticalClosingBalance', 0)),
    totalSales: get(data, 'shift.totalSales',0).toFixed(2),
    taxAmount: get(data, 'shift.taxAmount',0).toFixed(2),
    totalSalesAmount: get(data, 'shift.totalSalesAmount',0).toFixed(2),
    preTaxSalesAmount: get(data, 'shift.preTaxSalesAmount',0).toFixed(2),
    

})


const ZReportDetailsSel = createSelector(
    zReportDetails,
    mapZReoprtDetails
)

export { ZReportDetailsSel };