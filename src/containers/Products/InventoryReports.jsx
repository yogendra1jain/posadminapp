import React from 'react';
import _map from 'lodash/map';
import _set from 'lodash/set';
import _get from 'lodash/get';
import Redirect from "react-router/Redirect";
import Button from "react-bootstrap/lib/Button";
import { GetCustomerData } from '../../actions/reports'
import connect from 'react-redux/lib/connect/connect';
import moment from "moment";
import { fetchStore, fetchPostStore } from '../../actions/store';
import AutoComplete from '../../components/Elements/AutoComplete.jsx';
import _isEmpty from 'lodash/isEmpty';
import { fetchProductLookupData } from '../../actions/products';
import { GetInventoryData } from '../../actions/reports';
import { fetchInventoryLookupData } from '../../actions/inventory';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ReferenceArea } from 'recharts';

// const data = [
//     {name: 'Page A', Quantity: 1500, Date: "Jun-12-2018", amt: 2400},
//     {name: 'Page B', Quantity: 3000, Date: "Jun-13-2018", amt: 2210},
//     {name: 'Page C', Quantity: 2000, Date: "Jun-14-2018", amt: 2290},
//     {name: 'Page D', Quantity: 2780, Date: "Jun-15-2018", amt: 2000},
//     {name: 'Page E', Quantity: 1890, Date: "Jun-16-2018", amt: 2181},
//     {name: 'Page F', Quantity: 2390, Date: "Jun-17-2018", amt: 2500},
//     {name: 'Page G', Quantity: 3490, Date: "Jun-18-2018", amt: 2100},
// ];

const data = [
    { name: 1, cost: 4.11, impression: 100 },
    { name: 2, cost: 2.39, impression: 120 },
    { name: 3, cost: 1.37, impression: 150 },
    { name: 4, cost: 1.16, impression: 180 },
    { name: 5, cost: 'abc', impression: 200 },
    { name: 6, cost: 3, impression: 499 },
    { name: 7, cost: 0.53, impression: 50 },
    { name: 8, cost: 2.52, impression: 100 },
    { name: 9, cost: 1.79, impression: 200 },
    { name: 10, cost: 'abc', impression: 222 }
];

const getAxisYDomain = (from, to, ref, offset) => {
    const refData = data.slice(from - 1, to);
    let [bottom, top] = [refData[0][ref], refData[0][ref]];
    refData.forEach(d => {
        if (d[ref] > top) top = d[ref];
        if (d[ref] < bottom) bottom = d[ref];
    });

    return [(bottom | 0) - offset, (top | 0) + offset]
};

const initialState = {
    data,
    left: 'dataMin',
    right: 'dataMax',
    refAreaLeft: '',
    refAreaRight: '',
    top: 'dataMax+1',
    bottom: 'dataMin-1',
    top2: 'dataMax+20',
    bottom2: 'dataMin-20',
    animation: true
};

class inventoryChartsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.currentDate = {};
        this.storeList = [];
        this.products = [];
        this.selectedInventory = {};
        this.url = '';
        this.productId = '';
        this.storeId = '';
        this.inventoryReportData = [];
        this.inventoryData = {
            owner: localStorage.getItem('retailerID'),
            active: true,
            periodicity: '1-0-0'
        };
    }

    componentDidMount() {
        const { dispatch, storesReducer, reportsReducer } = this.props;
        let retailerId = localStorage.getItem('retailerID');
        dispatch(fetchStore(storesReducer, retailerId));
        // this.startDate = this.startDate ? this.startDate : this.currentDate;
        // this.endDate = this.endDate ? this.endDate : this.currentDate;
        // this.url = `${process.env.ANALYTICS_SERVICE_URL}` + '/retailer/' + retailerId + '/stores/' + this.storeId + '/products/' + this.productId + 'inventoryReport?from=' + this.startDate + '&to=' + this.endDate;
        // dispatch(GetInventoryData(reportsReducer, this.url));
        this.forceUpdate();

    }

    componentWillReceiveProps(props) {
        if (!_isEmpty(props.storeData)) {
            this.storeList = [];
            props.storeData && props.storeData.stores.map((store, index) => {
                this.storeList.push({ displayText: store.storeName, value: store.id });
            });
        }

        if (!_isEmpty(props.productData)) {
            this.products = [];
            props.productData.map(product => {
                this.products.push({ displayText: product.name, value: product.id })

            });
        }

        // let retailerId = localStorage.getItem('retailerID');
        // const { dispatch, reportsReducer } = this.props;
        // this.url = `${process.env.ANALYTICS_SERVICE_URL}` + '/retailer/' + retailerId + '/stores/' + this.storeId + '/products/' + this.productId + '/inventoryReport?from=' + this.startDate + '&to=' + this.endDate + 'periodicity;
        // dispatch(GetInventoryData(reportsReducer, this.url));
        // this.forceUpdate();

    }

    handleSelectChange = (id, name) => {
        _set(this.inventoryData, name, id);
        if (name == 'product') {
            this.productId = id;
        }
        const { dispatch, productsReducer, reportsReducer } = this.props;
        if (name === 'store' && !_isEmpty(id)) {
            this.storeId = id;
            let url = '';
            if (localStorage.getItem('role') === 'Admin') {
                url = '/products/' + localStorage.getItem('retailerID');
            } else if (localStorage.getItem('role') === 'Store Manager') {
                url = '/product/' + localStorage.getItem('storeID');
            }
            dispatch(fetchProductLookupData(productsReducer, url));

        }
        let retailerId = localStorage.getItem('retailerID');

        this.startDate = moment(this.startDate).format("YYYY-MM-DD");
        this.endDate = moment(this.endDate).format("YYYY-MM-DD");
        this.startDate = this.startDate ? this.startDate : this.currentDate;
        this.endDate = this.endDate ? this.endDate : this.currentDate;
        let Periodicity = this.inventoryData.periodicity ? this.inventoryData.periodicity : '1-0-0';
        this.url = `${process.env.ANALYTICS_SERVICE_URL}` + '/retailer/' + retailerId + '/stores/' + this.storeId + '/products/' + this.productId + '/inventoryReport?from=' + this.startDate + '&to=' + this.endDate + '&periodicity=' + Periodicity;
        dispatch(GetInventoryData(reportsReducer, this.url));
        this.forceUpdate();
    }

    handleDateValueChanged = (date) => {
        const { dispatch, productsReducer, reportsReducer } = this.props;
        let name = date.target.name;
        let value = date.target.value;
        const dateValue = moment(value).format("MM-DD-YYYY");

        if (name == 'startDate') {
            this.startDate = dateValue;
        }
        else if (name == 'endDate') {
            this.endDate = dateValue;
        }

        this.startDate = this.startDate ? this.startDate : this.currentDate;
        this.endDate = this.endDate ? this.endDate : this.currentDate;
        let retailerId = localStorage.getItem('retailerID');
        let Periodicity = this.inventoryData.periodicity ? this.inventoryData.periodicity : '1-0-0';
        this.url = `${process.env.ANALYTICS_SERVICE_URL}` + '/retailer/' + retailerId + '/stores/' + this.storeId + '/products/' + this.productId + '/inventoryReport?from=' + this.startDate + '&to=' + this.endDate + '&periodicity=' + Periodicity;
        dispatch(GetInventoryData(reportsReducer, this.url));
        this.forceUpdate();
    }

    zoom() {
        let { refAreaLeft, refAreaRight, data } = this.state;

        if (refAreaLeft === refAreaRight || refAreaRight === '') {
            this.setState(() => ({
                refAreaLeft: '',
                refAreaRight: ''
            }));
            return;
        }

        // xAxis domain
        if (refAreaLeft > refAreaRight)
            [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

        // yAxis domain
        const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 'cost', 1);
        const [bottom2, top2] = getAxisYDomain(refAreaLeft, refAreaRight, 'impression', 50);

        this.setState(() => ({
            refAreaLeft: '',
            refAreaRight: '',
            data: data.slice(),
            left: refAreaLeft,
            right: refAreaRight,
            bottom, top, bottom2, top2
        }));
    };

    zoomOut() {
        const { data } = this.state;
        this.setState(() => ({
            data: data.slice(),
            refAreaLeft: '',
            refAreaRight: '',
            left: 'dataMin',
            right: 'dataMax',
            top: 'dataMax+1',
            bottom: 'dataMin',
            top2: 'dataMax+50',
            bottom: 'dataMin+50'
        }));
    }

    render() {
        let date = new Date();

        this.currentDate = moment(date).format("YYYY-MM-DD");

        const Periodicity = {
            "data": [{
                "value": "1-0-0",
                "displayText": "Daily"
            }, {
                "value": "7-0-0",
                "displayText": "Weekly"
            }, {
                "value": "0-1-0",
                "displayText": "Monthly"
            }]
        }

        this.inventoryReportData = this.props.inventoryReportData;

        let i = 0;
        _map(this.inventoryReportData, (inventory) => {
            let Date = inventory.date.substring(0,10);
            let formattedDate = moment(Date).format("MMM-DD-YYYY")
            _set(this.inventoryReportData, `[${i}].date`, formattedDate);
            i += 1;
        })

        const { data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2 } = this.state;

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

                    <div className="form-d date-parent">
                        <label className="control-label">Stores</label>
                        <AutoComplete
                            type="multi"
                            data={this.storeList ? this.storeList : []}
                            name="store"
                            value={_get(this.inventoryData, 'store', '')}
                            changeHandler={(id, name) => { this.handleSelectChange(id, "store") }}
                        />
                    </div>

                    <div className="form-d date-parent">
                        <label className="control-label">Products</label>
                        <AutoComplete
                            type="multi"
                            data={this.products ? this.products : []}
                            value={_get(this.inventoryData, 'product', '')}
                            name="product"
                            placeholder="Select Product"
                            changeHandler={
                                (id) => {
                                    this.handleSelectChange(id, "product")
                                }
                            } />

                    </div>

                    <div className="form-d date-parent">
                        <label className="control-label">Periodicity</label>
                        <AutoComplete
                            type="single"
                            data={_get(Periodicity, 'data', [])}
                            name="periodicity"
                            value={_get(this.inventoryData, 'periodicity', '')}
                            changeHandler={(id, name) => { this.handleSelectChange(id, "periodicity") }}
                        />
                    </div>


                </div>

                {/* <div className="col-sm-12">
                    <div>
                        <h4 style={{ marginTop: "80px", marginBottom: "40px" }} > {this.productName} </h4>
                        <LineChart width={600} height={300} data={data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <XAxis dataKey="Date" />
                            <YAxis dataKey="Quantity" />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Quantity" stroke="#0D1F45" />
                            <Line type="monotone" dataKey="Date" stroke="#0D5307" />
                        </LineChart>
                    </div>
                </div> */}

                {/* <div className="highlight-bar-charts">
                    <a
                        href="javascript: void(0);"
                        className="btn update"
                        onClick={this.zoomOut.bind(this)}
                    >
                        Zoom Out
        </a>


                    <p>Highlight / Zoom - able Line Chart</p>
                    <LineChart
                        width={1600}
                        height={600}
                        data={this.props.inventoryReportData}
                        onMouseDown={(e) => this.setState({ refAreaLeft: e.activeLabel })}
                        onMouseMove={(e) => this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel })}
                        onMouseUp={this.zoom.bind(this)}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            allowDataOverflow={true}
                            dataKey="name"
                            domain={[left, right]}
                            type="number"
                        />
                        <YAxis
                            allowDataOverflow={true}
                            domain={[bottom, top]}
                            type="number"
                            yAxisId="1"
                        />
                        <YAxis
                            orientation="right"
                            allowDataOverflow={true}
                            domain={[bottom2, top2]}
                            type="number"
                            yAxisId="2"
                        />
                        <Tooltip />
                        <Line yAxisId="1" type='natural' dataKey='date' stroke='#8884d8' animationDuration={300} />
                        <Line yAxisId="2" type='natural' dataKey='availableQuantity' stroke='#82ca9d' animationDuration={300} />

                        {
                            (refAreaLeft && refAreaRight) ? (
                                <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />) : null

                        }

                    </LineChart>

                </div> */}


                <div>
                    <LineChart width={600} height={300} data={this.inventoryReportData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="date" />
                        <YAxis dataKey="availableQuantity"/>
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="date" stroke="#0D1F45" />
                        <Line type="monotone" dataKey="availableQuantity" stroke="#0D5307" />
                    </LineChart>
                </div>


            </div>
        )

    }
}

const mapStateToProps = state => {

    let { userRolesReducer, storesReducer, productsReducer, reportsReducer } = state

    let { storeData } = storesReducer || {};

    let { productData } = productsReducer || '';

    let { inventoryReportData } = reportsReducer || '';

    let { retailerId, userId } = userRolesReducer['userRolesData'] ? userRolesReducer['userRolesData'] : {};



    return {
        retailerId,
        userId,
        storeData,
        productData,
        inventoryReportData
    }
}

export default connect(mapStateToProps)(inventoryChartsContainer);