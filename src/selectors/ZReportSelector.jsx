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
    staff: get(data, 'staff.id', ''),
    pos: get(data, 'terminal.name', ''),
    openFrom: moment.utc(get(data, 'shift.openingTimeStamp.seconds', 0)* 1000).format("DD-MMM-YYYY"),
    closedAt: get(data, 'closedAt', ''),
    cashSales: get(data, 'cashSales', ''),
    cashAdded: get(data, 'cashAdded', ''),
    cashRemoved: get(data, 'cashRemoved', ''),
    realClosingBalance: get(data, 'realClosingBalance', ''),
    theoreticalClosingBalance: get(data, 'theoreticalClosingBalance', ''),
    difference: get(data, 'difference', ''),
    totalSales: get(data, 'totalSales', '')
})


const ZReportDetailsSel = createSelector(
    zReportDetails,
    mapZReoprtDetails
)

export { ZReportDetailsSel };