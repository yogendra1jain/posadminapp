import React from 'react';
import _map from 'lodash/map';
import _set from 'lodash/set';
import Redirect from "react-router/Redirect";
import Button from "react-bootstrap/lib/Button";
import { GetTopProducts, GetCustomerData } from '../../actions/reports'
import connect from 'react-redux/lib/connect/connect';
import _sortedUniq from 'lodash/sortedUniq';
import moment from "moment";
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import _maxBy from 'lodash/maxBy';
import _minBy from 'lodash/minBy';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _cloneDeep from 'lodash/cloneDeep';
import SaveButton from '../../components/common/SaveButton.jsx';
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';
import { ScatterChart, Scatter, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import Slider1 from 'rc-slider';

const style = {};
const parentStyle = { overflow: 'hidden' };

const createSliderWithTooltip = Slider1.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider1.Range);
const Handle = Slider1.Handle;

const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={value}
            visible={dragging}
            placement="top"
            key={index}
        >
            <Handle value={value} {...restProps} />
        </Tooltip>
    );
};

const Products = [
    {
        id: 1,
        productName: "a",
        quantitySold: 10,
    },
    {
        id: 2,
        productName: "b",
        quantitySold: 20,
    },
    {
        id: 3,
        productName: "c",
        quantitySold: 30,
    },
    {
        id: 4,
        productName: "d",
        quantitySold: 40,
    },
    {
        id: 5,
        productName: "e",
        quantitySold: 50,
    }
]

const colors = ["red", "blue", "Green", "Purple", "Yellow"]

class customerChartsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valueSpending: 10,
            valueAvg: 10,
        }
        this.currentDate = {};
        this.data = [];
        this.maxValue = '';
        this.minValue = '';
        this.maxValueAvg = '';
        this.custIds = [];
    }

    componentDidMount() {
        const { dispatch, reportsReducer } = this.props;
        let retailerId = localStorage.getItem("retailerID");
        this.startDate = this.startDate ? this.startDate : this.currentDate;
        this.endDate = this.endDate ? this.endDate : this.currentDate;
        let customerVolumeURL = `${process.env.ANALYTICS_SERVICE_URL}` + '/retailer/' + retailerId + '/reports/customerReport?from=' + this.startDate + '&to=' + this.endDate;
        dispatch(GetCustomerData(reportsReducer, customerVolumeURL));

    }

    componentWillReceiveProps(props) {

        this.data = [];
        let i = 0;
        this.maxValue = '';
        this.avgdata = [];
        this.minValue = '';

        // _map(data, (asd) => {
        //     _set(data, `[${i}].noOfTxns`, asd.totalSpending / asd.noOfTxns);
        //     i += 1;
        // })

        this.maxValue = _maxBy(props.customerData, 'totalSpending');
        this.minValue = _minBy(props.customerData, 'totalSpending');


        _map(props.customerData, (asd) => {
            let avgData = (asd.totalSpending / asd.noOfTxns);
            if ((this.state.valueSpending[1] >= asd.totalSpending && this.state.valueSpending[0] <= asd.totalSpending) && (this.state.valueAvg[1] >= avgData && this.state.valueAvg[0] <= avgData)) {
                _set(this.data, `[${i}].noOfTxns`, asd.totalSpending / asd.noOfTxns);
                _set(this.data, `[${i}]._id`, asd._id);
                _set(this.data, `[${i}].totalSpending`, asd.totalSpending);
            }
            i += 1;
        })

        this.custIds.push(this.data);

        _map(props.customerData, (asd) => {

            _set(this.avgdata, `[${i}].noOfTxns`, asd.totalSpending / asd.noOfTxns);
            _set(this.avgdata, `[${i}]._id`, asd._id);
            _set(this.avgdata, `[${i}].totalSpending`, asd.totalSpending);
            i += 1;

        })

        this.maxValueAvg = _maxBy(this.avgdata, 'noOfTxns');

    }

    handleDateValueChanged = (date) => {
        let name = date.target.name;
        let value = date.target.value;
        const dateValue = moment(value).format("MM-DD-YYYY");

        if (name == 'startDate') {
            this.startDate = dateValue;
        }
        else if (name == 'endDate') {
            this.endDate = dateValue;
        }
        this.forceUpdate();
        const { dispatch, reportsReducer } = this.props;
        let retailerId = localStorage.getItem("retailerID");
        this.startDate = this.startDate ? this.startDate : this.currentDate;
        this.endDate = this.endDate ? this.endDate : this.currentDate;
        let customerVolumeURL = `${process.env.ANALYTICS_SERVICE_URL}` + '/retailer/' + retailerId + '/reports/customerReport?from=' + this.startDate + '&to=' + this.endDate;
        dispatch(GetCustomerData(reportsReducer, customerVolumeURL));
    }

    handleChangeStart = () => {

    };

    handleChangeSpendings = value => {
        this.setState({
            valueSpending: value
        })
        const { dispatch, reportsReducer } = this.props;
        let retailerId = localStorage.getItem("retailerID");
        this.startDate = this.startDate ? this.startDate : this.currentDate;
        this.endDate = this.endDate ? this.endDate : this.currentDate;
        let customerVolumeURL = `${process.env.ANALYTICS_SERVICE_URL}` + '/retailer/' + retailerId + '/reports/customerReport?from=' + this.startDate + '&to=' + this.endDate;
        dispatch(GetCustomerData(reportsReducer, customerVolumeURL));
    }

    handleChangeAverage = value => {
        this.setState({
            valueAvg: value
        })
        const { dispatch, reportsReducer } = this.props;
        let retailerId = localStorage.getItem("retailerID");
        this.startDate = this.startDate ? this.startDate : this.currentDate;
        this.endDate = this.endDate ? this.endDate : this.currentDate;
        let customerVolumeURL = `${process.env.ANALYTICS_SERVICE_URL}` + '/retailer/' + retailerId + '/reports/customerReport?from=' + this.startDate + '&to=' + this.endDate;
        dispatch(GetCustomerData(reportsReducer, customerVolumeURL));
    }

    getTopProducts = () => {

        const customerIds = [];
        // _map(this.data, (customer) => {
        //     let custId = customer._id;
        //     customerIds.push(custId);
        // })

        this.data.map(customer => {
            let custId = customer._id;
            customerIds.push(custId);
        })


        const { dispatch, reportsReducer } = this.props;
        let retailerId = localStorage.getItem("retailerID");
        this.startDate = this.startDate ? this.startDate : this.currentDate;
        this.endDate = this.endDate ? this.endDate : this.currentDate;
        let data = {};
        data.customerIds = customerIds;
        let topProductsUrl = `${process.env.ANALYTICS_SERVICE_URL}` + '/retailer/' + retailerId + '/reports/topProductsReport?from=' + this.startDate + '&to=' + this.endDate;
        dispatch(GetTopProducts(reportsReducer, topProductsUrl, data));
        this.forceUpdate();
    }

    handleChangeComplete = () => {

    };

    render() {
        let date = new Date();
        const { valueSpending } = this.state;
        const { valueAvg } = this.state;

        this.currentDate = moment(date).format("YYYY-MM-DD");

        // if (_get(this, 'props.isFetching')) {
        //     return (<div className='loader-wrapper-main'>
        //         <div className="spinner">
        //             <div className="rect1"></div>
        //             <div className="rect2"></div>
        //             <div className="rect3"></div>
        //             <div className="rect4"></div>
        //             <div className="rect5"></div>
        //         </div>
        //     </div>);
        // }

        return (

            
            <div className="">

                <div className="row d-flex">
                    <div className="form-d date-parent">
                        <label className="control-label">From </label>
                        <input
                            name="startDate"
                            type="date"
                            className="form-control"
                            defaultValue={this.currentDate}
                            onChange={this.handleDateValueChanged}
                        />
                    </div>

                    {/* <Datetime name='startDate'
                                        onChange={this.handleDateValueChanged}
                                        defaultValue={this.actionDate}
                                        dateFormat="MM-DD-YYYY"
                                        timeFormat={false}
                                        closeOnSelect={true} /> */}
                    <div className="form-d date-parent">
                        <label className="control-label">To </label>
                        <input
                            name="endDate"
                            type="date"
                            className="form-control"
                            defaultValue={this.currentDate}
                            onChange={this.handleDateValueChanged}
                        />
                    </div>

                    <div className="mt-21">
                            <SaveButton buttonDisplayText={'Get Top Products'} Class_Name={"btn-info"} handlerSearch={this.getTopProducts} />
                    </div>


                </div>
                <div className="strainBlock c-reports">
                    <div className="col-sm-1">
                        <div style={style} className='v-slider'>
                            <label className="control-label">Filter by Spendings </label>
                            {/* <input type="range" min={0} max={100} name="rangeS" /> */}
                            <Range min={0}
                                step={1}
                                max={this.maxValue ? this.maxValue.totalSpending : 10}
                                onAfterChange={this.handleChangeSpendings}
                                vertical
                                defaultValue={[0, 10]}
                                tipFormatter={value => `${value}$`}
                            />

                            {/* <div className='value'>{value}</div> */}


                        </div>
                    </div>
                    {/* <div className="col-sm-2">
                        <div className='form-d date-parent'>
                            <label className="control-label">Filter by Spendings </label>
                            <Slider
                                orientation={"vertical"}
                                min={0}
                                step={1}
                                max={this.maxValue ? this.maxValue.totalSpending : 100}
                                value={valueSpending}
                                onChangeStart={this.handleChangeStart}
                                onChange={this.handleChangeSpendings}
                                onChangeComplete={this.handleChangeComplete}
                                tooltip={true}
                            /> */}
                    {/* <div className='value'>{value}</div> */}


                    {/* </div>
                    </div> */}



                    <div className="col-sm-11">
                        <div className="col-sm-6">
                            <label style={{ marginLeft: '208' }} className="control-label">Customer Report </label>
                            <ScatterChart width={500} height={500} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <XAxis type="number" dataKey={'noOfTxns'} name='Avg' unit='$' />
                                <YAxis type="number" dataKey={'totalSpending'} name='Spendings' unit='$' />
                                <CartesianGrid />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Scatter name='Customer' data={this.data} fill='#8884d8'>
                                    {
                                        this.data && this.data.map((entry, index) => {
                                            console.log('clr', colors[index % colors.length])
                                            return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                        })
                                    }

                                </Scatter>
                            </ScatterChart>

                            <div style={style} className='h-slider'>
                                <label className="control-label">Filter by Average </label>
                                {/* <input type="range" min={0} max={100} name="rangeS" /> */}
                                <Range min={0}
                                    step={1}
                                    max={this.maxValueAvg ? this.maxValueAvg.noOfTxns : 10}
                                    onAfterChange={this.handleChangeAverage}
                                    horizontal
                                    defaultValue={[0, 10]}
                                    tipFormatter={value => `${value}$`}
                                />

                                {/* <div className='value'>{value}</div> */}


                            </div>

                        </div>

                        <div className="col-sm-6">

                            <h4 className="ob"> Top Products </h4>
                            <BootstrapTable data={this.props.topProducts} className={' '} >
                                <TableHeaderColumn dataField='id' isKey={true} hidden={true}>id</TableHeaderColumn>
                                <TableHeaderColumn width='40' dataAlign='center' editable={false} dataField='productName'>Product Name</TableHeaderColumn>
                                <TableHeaderColumn width='40' dataAlign='center' editable={false} dataField='quantitySold'>Quantity Sold</TableHeaderColumn>
                            </BootstrapTable>


                        </div>
                    </div>
                   
                </div>
            </div>
        )

    }

}

const mapStateToProps = state => {

    let { reportsReducer } = state;

    let { customerData, topProducts } = reportsReducer || []

    let { isFetching } = reportsReducer || false;

    return {
        customerData,
        topProducts,
        isFetching
    }
}

export default connect(mapStateToProps)(customerChartsContainer);