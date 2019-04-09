import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';

/* Material import */
import Button from "@material-ui/core/Button"

/* Redux Imports */
import { connect } from 'react-redux';
/* Component Imports */
import HighVelocityChart from './Components/HighVelocityChart';
import LowVelocityChart from './Components/LowVelocityChart';
import PaymentMethodsPie from './Components/PaymentMethodsPie';
import LowInventoryTable from './Components/LowInventoryTable';
import OutOfStockTable from './Components/OutOfStockTable';
import genericPostData from '../../Global/DataFetch/genericPostData';
import FromandToCalander from '../../Global/Components/FromandToCalander';
import {toTimestamp} from '../../helpers/helpers';
import {commonActionCreater} from '../../actions/Common/commonAction';
import _isEmpty from 'lodash/isEmpty'
class DashboardContainer extends React.Component {

    constructor() {
        super();
        this.state = {
            storeList: [],
            PaymentMethodsData: []
        }
    }
    componentDidMount() {
        // genericPostData({
        //     url: "/Reports/SalesReport/ByPaymentMethods",
        //     reqObj: {
        //         FromTimeStamp: {seconds:323},
        //         ToTimeStamp: {seconds:323}
        //     },
        //     dispatch:this.props.dispatch,
        //     identifier:"GETPIEDATA",
        //     successCb:console.log("data is here"),
        //     errorCb:()=>console.log("err is here")
        // })
        genericPostData({
            url: "/Store/ByRetailerId",
            reqObj: {
                id: localStorage.getItem('retailerID')
            },
            dispatch: this.props.dispatch,
            identifier: "getStoreByRetailer_dashboard",
            successCb: (storeList) => {
                let storeListArr = storeList.map((store) => {
                    let displayObj = {
                        displayText: store.name,
                        value: store.id
                    }
                    return displayObj
                });
                this.setState({ storeList: storeListArr });

            },
            errorCb: () => console.log("err is here"),
            dontShowMessage: true
        })
    }
    onDateSelect = (type, value) => {
        this.setState({ [type]: value })
    }
    onStoreSelect = (id) => {
     this.setState({selectedStore: id})
    }

    getReports = () => {
        let reqObj = {
            id: _get(this.state,'selectedStore',''),
            fromTimeStamp : {
                seconds: toTimestamp(_get(this.state,'startDate',0)) / 1000
            },
            toTimestamp: {
                seconds: toTimestamp(_get(this.state,'endDate',0)) / 1000
            }
        }
        let url = '/Reports/SalesReport/ByPaymentMethods'
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj,
            url,
            identifier: 'fetchSaleByPaymentMethod',
            successCb: this.handlePaymentMethodReportSuccess,
            errorCb: () => this.handlePaymentMethodReportError,
            successText: "Fetched SuccessFully"
        })
    }

    handlePaymentMethodReportSuccess = (data) => {
        let pieChartData = []
        if(!_isEmpty(data.result)) {
            if(Array.isArray(data.result)) {
                _get(data,'result',[]).map(data => {
                    let temp = {}
                    temp.name = data.paymentMethod
                    temp.value = data.value
                    pieChartData.push(temp)
                  })
                this.setState({ PaymentMethodsData: pieChartData })
            }
        }
    }

    handlePaymentMethodReportError = (err) => {

    }

    render() {
        return (
            <div className='dashboard'>
                <div className='panel-container'>
                    <span className='panel-heading'>Dashboard</span>
                </div>
                <div style={{padding:"20px"}} className="flex-row dash-1 justify-space-between">
                    <FromandToCalander
                        onDateSelect={this.onDateSelect}
                        storeList={this.state.storeList}
                        onStoreSelect={this.onStoreSelect}
                    />
                    
                    <div className="flex-row align-center">
                        <Button onClick={this.getReports} variant="contained" color="primary">
                            Submit
                   </Button>
                    </div>

                </div>

                <div className='fwidth flex-column'>

                    <div className='flex-row dash-1'>
                        <div className='dash-11'>
                            <div className='flex-column fheight'>
                                <div className='card flex-column'>
                                    <span className='card-title'>Order Velocity</span>
                                    <span className='card-value'>500</span>
                                </div>
                                <div className='card flex-column'>
                                    <span className='card-title'>Amount Of Sales</span>
                                    <span className='card-value'>$10,000</span>
                                </div>
                                <div className='card flex-column'>
                                    <span className='card-title'>No. of Sales</span>
                                    <span className='card-value'>10</span>
                                </div>
                            </div>
                        </div>
                        <div className='dash-12'>
                            <div className='card flex-column fheight'>
                                <span className='card-title'>High Velocity Items</span>
                                <HighVelocityChart />
                            </div>
                        </div>
                    </div>


                    <div className='flex-row dash-2'>
                        <div className='dash-21'>
                            <div className='card flex-column fheight'>
                                <span className='card-title'>Low Velocity Items</span>
                                <LowVelocityChart />
                            </div>
                        </div>
                        <div className='dash-22'>
                            <div className='card flex-column payment-method-pie fheight'>
                                <span className='card-title'>Payment Methods</span>
                                <PaymentMethodsPie data={_get(this.state,'PaymentMethodsData',[])} />
                            </div>
                        </div>
                    </div>



                    <div className='flex-row dash-3'>
                        <div className='card fwidth'>
                            <span className='card-title'>Low Inventory</span>
                            <LowInventoryTable />
                        </div>
                    </div>

                    <div className='flex-row dash-4'>
                        <div className='card fwidth'>
                            <span className='card-title'>Out Of stock</span>
                            <OutOfStockTable />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(DashboardContainer);