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
    openingAmount: get(data, 'shift.openingBalance.currencyCode', '') + ' ' + get(data, 'shift.openingBalance.amount', '').toFixed(2),
    staff: get(data, 'staff.person.firstName', '') + ' ' + get(data, 'staff.person.lastName', ''),
    pos: get(data, 'terminal.name', ''),
    openFrom: moment.utc(get(data, 'shift.openingTimeStamp.seconds', 0)* 1000).format("DD-MMM-YYYY HH:MM:SS"),
    closedAt: moment.utc(get(data, 'shift.closingTimeStamp.seconds', 0)* 1000).format("DD-MMM-YYYY HH:MM:SS"),
    cashSales: get(data, 'shift.cashSalesAmount', ''),
    cardSales: get(data, 'shift.cardSalesAmount', ''),
    cashAdded: get(data, 'shift.cashAdded', ''),
    cashRemoved: get(data, 'shift.cashRemoved', ''),
    realClosingBalance: get(data, 'shift.closingBalance.currencyCode', '') + ' ' + get(data, 'shift.closingBalance.amount', ''),
    theoreticalClosingBalance: get(data, 'shift.theoreticalClosingBalance', ''),
    difference: get(data, 'shift.difference', ''),
    totalSales: get(data, 'shift.totalSales', '')
})


const ZReportDetailsSel = createSelector(
    zReportDetails,
    mapZReoprtDetails
)

export { ZReportDetailsSel };