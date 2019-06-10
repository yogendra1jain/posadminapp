    import DashBoardHoc from './DashboardHoc';
import React from 'react';

// /* Lodash Imports */
// import _get from 'lodash/get';
// import _slice from 'lodash/slice'
// import _reverse from 'lodash/reverse'
// /* Material import */
// import Button from "@material-ui/core/Button"

// /* Redux Imports */
// import { connect } from 'react-redux';
// /* Component Imports */
// import HighVelocityChart from './Components/HighVelocityChart';
// import LowVelocityChart from './Components/LowVelocityChart';
// import PaymentMethodsPie from './Components/PaymentMethodsPie';
// import LowInventoryTable from './Components/LowInventoryTable';
// import OutOfStockTable from './Components/OutOfStockTable';
// import axiosFetcher from '../global/dataFetcher/axiosFetcher';
// import FromandToCalander from '../global/components/FromandToCalander';
// import { toTimestamp } from '../global/helper/helpers';
// import _isEmpty from 'lodash/isEmpty';
// import DineroInit from '../global/conversion/DineroObj';
// import moment from 'moment';

// class DashboardContainer extends React.Component {

//     constructor() {
//         super();
//         this.state = {
//             storeList: [],
//             PaymentMethodsData: [],
//             saleAmount: {},
//             totalOrders: 0,
//             highVelocityOrders: [],
//             lowVelocityOrders: [],
//             days: 1,
//             startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
//             endDate:moment().format('YYYY-MM-DD')

//         }
//     }
//     componentDidMount() {
//         if (localStorage.getItem('role') == 1) {
//             axiosFetcher({
//                 method: 'POST',
//                 url: "Store/ByRetailerId",
//                 reqObj: {
//                     id: localStorage.getItem('retailerId')
//                 },
//                 dispatch: this.props.dispatch,
//                 identifier: "getStoreByRetailer_dashboard",
//                 successCb: (storeList) => {
//                     let storeListArr = storeList.map((store) => {
//                         let displayObj = {
//                             displayText: store.name,
//                             value: store.id
//                         }
//                         return displayObj
//                     });
//                     this.setState({ storeList: storeListArr });

//                 },
//                 errorCb: () => console.log("err is here"),
//                 dontShowMessage: true
//             })
//         }
//         else if (localStorage.getItem('role') == 2) {
//             this.setState({ selectedStore: localStorage.getItem('storeId') });
//             this.state.selectedStore = localStorage.getItem('storeId')
//             this.getReports()
//         }
//     }
//     onDateSelect = (type, value) => {
//         this.setState({ [type]: value })
//     }
//     onStoreSelect = (id) => {
//         this.setState({ selectedStore: id })
//     }

//     getReports = () => {

//         let endDate = moment(_get(this.state, 'endDate', 0))
//         endDate.endOf('day');
//         let newEndDate = new Date(endDate);
//         let reqObj = {
//             id: _get(this.state, 'selectedStore', ''),
//             fromTimeStamp: {
//                 seconds: toTimestamp(_get(this.state, 'startDate', 0)) / 1000
//             },
//             toTimestamp: {
//                 seconds: parseInt(newEndDate / 1000)
//             }
//         }

//         let days = ((toTimestamp(_get(this.state, 'endDate', 0)) / 1000) - (toTimestamp(_get(this.state, 'startDate', 0)) / 1000)) / (60 * 60 * 24)

//         this.setState({
//             days
//         })

//         axiosFetcher({
//             method: 'POST',
//             dispatch: this.props.dispatch,
//             reqObj,
//             url: 'Reports/SalesReport/ByPaymentMethods',
//             identifier: 'fetchSaleByPaymentMethod',
//             successCb: this.handlePaymentMethodReportSuccess,
//             errorCb: () => this.handlePaymentMethodReportError,
//         })

//         axiosFetcher({
//             method: 'POST',
//             dispatch: this.props.dispatch,
//             reqObj,
//             url: 'Reports/Sales/Dashboard',
//             identifier: 'GET_DASHBOARD_SALES_DATA',
//             successCb: this.handleDashboardSalesSuccess,
//             errorCb: () => this.handleDashboardSalesError,
//         })
//     }

//     handlePaymentMethodReportSuccess = (data) => {
//         let pieChartData = []
//         if (!_isEmpty(data.result)) {
//             console.log(data.result, "data.resultdata.resultdata.result")
//             if (Array.isArray(data.result)) {
//                 _get(data, 'result', []).map(data => {
//                     let temp = {}
//                     temp.name = data.paymentMethod
//                     temp.value = data.value.amount
//                     pieChartData.push(temp)
//                 })
//                 this.setState({ PaymentMethodsData: pieChartData })
//             }
//         }
//     }

//     handleDashboardSalesSuccess = (data) => {
//         let orders = data.velocity
//         let lowVelocityOrders = _slice(orders, [0], [5])
//         let highVelocityOrders = _slice(orders, [(orders.length - 5)], [orders.length]);
//         _reverse(highVelocityOrders)
//         let orderVelocity = (data.totalOrders / this.state.days).toFixed(2)
//         this.setState({
//             saleAmount: data.saleAmount,
//             totalOrders: data.totalOrders,
//             highVelocityOrders: highVelocityOrders,
//             lowVelocityOrders: lowVelocityOrders,
//             orderVelocity: orderVelocity
//         })
//     }

//     handleDashboardSalesError = (err) => {
//         console.log(err, 'error')
//     }

//     handlePaymentMethodReportError = (err) => {
//         console.log(err, 'error')
//     }

//     render() {
//         return (
//             <div className='dashboard'>
//                 {/* <div className='panel-container'>
//                     <span className='panel-heading'>Dashboard</span>
//                 </div> */}
//                 <div style={{ padding: "20px" }} className="flex-row dash-1 justify-space-between">
//                     <FromandToCalander
//                         startDate={this.state.startDate}
//                         endDate={this.state.endDate}
//                         onDateSelect={this.onDateSelect}
//                         storeList={this.state.storeList}
//                         onStoreSelect={this.onStoreSelect}
//                     />

//                     <div className="flex-row align-center">
//                         <Button onClick={this.getReports} variant="contained" color="primary">
//                             Submit
//                    </Button>
//                     </div>

//                 </div>

//                 <div className='fwidth flex-column'>
//                     <div className='flex-row dash-1'>
//                         <div className='dash-11'>
//                             <div className='flex-column fheight'>
//                                 {
//                                     _get(this.state, 'orderVelocity', false) ?
//                                         <div className='card flex-column'>
//                                             <span className='card-title'>Order Velocity</span>
//                                             <span className='card-value'>{_get(this.state, 'orderVelocity')}</span>
//                                         </div> : null
//                                 }
//                                 {
//                                     _get(this.state, 'saleAmount.amount', false) ?
//                                         <div className='card flex-column'>
//                                             <span className='card-title'>Amount Of Sales</span>
//                                             <span className='card-value'>{DineroInit(_get(this.state, 'saleAmount.amount')).toFormat('$0,0.00')}</span>
//                                         </div> : null
//                                 }
//                                 {
//                                     _get(this.state, 'totalOrders', false) ?
//                                         <div className='card flex-column'>
//                                             <span className='card-title'>No. of Sales</span>
//                                             <span className='card-value'>{_get(this.state, 'totalOrders')}</span>
//                                         </div> : null
//                                 }
//                             </div>
//                         </div>
//                         {
//                             _get(this.state, 'highVelocityOrders').length ?
//                                 <div className='dash-12'>
//                                     <div className='card flex-column fheight'>
//                                         <span className='card-title'>High Velocity Items</span>
//                                         <HighVelocityChart
//                                             highVelocityOrders={this.state.highVelocityOrders}
//                                         />
//                                     </div>
//                                 </div> : null
//                         }
//                     </div>
//                     <div className='flex-row dash-2'>
//                         {
//                             _get(this.state, 'lowVelocityOrders').length ?
//                                 <div className='dash-21'>
//                                     <div className='card flex-column fheight'>
//                                         <span className='card-title'>Low Velocity Items</span>
//                                         <LowVelocityChart
//                                             lowVelocityOrders={this.state.lowVelocityOrders}
//                                         />
//                                     </div>
//                                 </div> : null
//                         }
//                         {
//                             _get(this.state, 'PaymentMethodsData').length ?
//                                 <div className='dash-22'>
//                                     <div className='card flex-column payment-method-pie fheight' style={{ position: 'relative' }}>
//                                         <span className='card-title'>Payment Methods</span>
//                                         <PaymentMethodsPie
//                                             data={_get(this.state, 'PaymentMethodsData', [])}
//                                         />
//                                     </div>
//                                 </div> : null
//                         }
//                     </div>



//                     {/* <div className='flex-row dash-3'>
//                         <div className='card fwidth'>
//                             <span className='card-title'>Low Inventory</span>
//                             <LowInventoryTable />
//                         </div>
//                     </div>

//                     <div className='flex-row dash-4'>
//                         <div className='card fwidth'>
//                             <span className='card-title'>Out Of stock</span>
//                             <OutOfStockTable />
//                         </div>
//                     </div> */}
//                 </div>
//             </div>
//         );
//     }
// }

// function mapStateToProps() {
//     return {};
// }

// export default connect(mapStateToProps)(DashboardContainer);




class SalesDashBoardContainer extends React.Component {

    render() {
        return (
            <div id="SalesDashBoardContainer"></div>
        )
    }
}

export default DashBoardHoc(SalesDashBoardContainer,'SALES_ANALYSIS','SalesDashBoardContainer');