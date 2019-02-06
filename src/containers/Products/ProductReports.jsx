import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import "bootstrap/dist/css/bootstrap.css";
import { GetProductVolumeData, GetProductWiseVolumeData, GetProductRevenueData, GetProductProfitData } from '../../actions/reports'
import { PieChart, Pie, Sector, Cell, slice } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from "moment";
import AutoComplete from '../../components/Elements/AutoComplete.jsx';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _map from 'lodash/map';

var productRevenue = [{ name: "Skywalker OG", value: 20.0 },
{ name: "King Louis XIII", value: 25.0 },
{ name: "White Rhino", value: 10.0 },
{ name: "Citrus Sap", value: 15.0 },
{ name: "Sour Apple", value: 30.0 }
];

const data1 = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const data2 = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];


const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Value ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Volume ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const renderActiveShapeRevenue = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Value ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Revenue ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const renderActiveShapeProfit = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Value ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Profit ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};





class ChartsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndexProVolume: 0,
            activeIndexProRevenue: 0,
            activeIndexProProfit: 0,
            showProductLineChart: false,
            showProductLineChartRevenue: false,
            showProductLineChartProfit: false
        }
        this.onPieEnterVolume = this.onPieEnterVolume.bind(this);
        this.onPieHoverVolume = this.onPieHoverVolume.bind(this);
        this.onPieHoverRevenue = this.onPieHoverRevenue.bind(this);
        this.onPieHoverProfit = this.onPieHoverProfit.bind(this);
        this.onPieEnterRevenue = this.onPieEnterRevenue.bind(this);
        this.onPieEnterProfit = this.onPieEnterProfit.bind(this);
        this.startDate = '';
        this.endDate = '';
        this.productReports = {
            periodicity: '1-0-0'
        };
        this.currentDate = '';
        this.productWiseVolumeData = [];
    }

    componentDidMount() {
        const { dispatch, reportsReducer } = this.props;
        let retailerId = localStorage.getItem("retailerID");
        this.startDate = this.startDate ? this.startDate : this.currentDate;
        this.endDate = this.endDate ? this.endDate : this.currentDate;
        let productVolumeURL = `${process.env.ANALYTICS_SERVICE_URL}` + '/retailer/' + retailerId + '/reports/productsByVolume?from='+this.startDate+'&to='+this.endDate;
        dispatch(GetProductVolumeData(reportsReducer, productVolumeURL));
        let productRevenueURL = `${process.env.ANALYTICS_SERVICE_URL}` + '/retailer/' + retailerId + '/reports/productsByRevenue?from='+this.startDate+'&to='+this.endDate;
        dispatch(GetProductRevenueData(reportsReducer, productRevenueURL));
        let productProfitURL = `${process.env.ANALYTICS_SERVICE_URL}` + '/retailer/' + retailerId + '/reports/productsByProfit?from='+this.startDate+'&to='+this.endDate;
        dispatch(GetProductProfitData(reportsReducer, productProfitURL));

    }

    onPieHoverVolume(data, index) {
        this.setState({
            activeIndexProVolume: index,
            activeIndexProRevenue: index,
            activeIndexProProfit: index,
        });
    }

    onPieHoverRevenue(data, index) {
        this.setState({
            activeIndexProRevenue: index,
            activeIndexProVolume: index,
            activeIndexProProfit: index,
        });
    }

    onPieHoverProfit(data, index) {
        this.setState({
            activeIndexProRevenue: index,
            activeIndexProVolume: index,
            activeIndexProProfit: index,
        });
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
        let productVolumeURL = `${process.env.ANALYTICS_SERVICE_URL}` + '/retailer/' + retailerId + '/reports/productsByVolume?from=' + this.startDate + '&to=' + (this.endDate ? this.endDate : this.startDate);
        dispatch(GetProductVolumeData(reportsReducer, productVolumeURL));
        let productRevenueURL = `${process.env.ANALYTICS_SERVICE_URL}` + '/retailer/' + retailerId + '/reports/productsByRevenue?from=' + this.startDate + '&to=' + (this.endDate ? this.endDate : this.startDate);
        dispatch(GetProductRevenueData(reportsReducer, productRevenueURL));
        let productProfitURL = `${process.env.ANALYTICS_SERVICE_URL}` + '/retailer/' + retailerId + '/reports/productsByProfit?from=' + this.startDate + '&to=' + (this.endDate ? this.endDate : this.startDate);
        dispatch(GetProductProfitData(reportsReducer, productProfitURL));
    }

    onPieEnterVolume(data, index) {
        this.setState({
            activeIndexProVolume: index,
            showProductLineChart: true,
        });
        this.productName = data.name;
        const { dispatch, reportsReducer } = this.props;
        let retailerId = localStorage.getItem("retailerID");
        let productId = data.productId;
        let Periodicity = this.productReports.periodicity ? this.productReports.periodicity : '1-0-0';
        
        
        this.startDate = this.startDate ? this.startDate : this.currentDate;
        this.endDate = this.endDate ? this.endDate : this.currentDate;
        let productWiseVolumeURL = `${process.env.ANALYTICS_SERVICE_URL}` + '/retailer/' + retailerId + '/reports/productReport?from=' + this.startDate + '&to=' + this.endDate + '&periodicity=' +Periodicity+ '&productId=' + productId;
        dispatch(GetProductWiseVolumeData(reportsReducer, productWiseVolumeURL));
    }

    onPieEnterRevenue(data, index) {
        this.setState({
            activeIndexProRevenue: index,
            showProductLineChartRevenue: true,
            showProductLineChart: true,
        });
        this.productName = data.name;
        const { dispatch, reportsReducer } = this.props;
        let retailerId = localStorage.getItem("retailerID");
        let productId = data.productId;
        let Periodicity = this.productReports.periodicity ? this.productReports.periodicity : '1-0-0';
        
        
        this.startDate = this.startDate ? this.startDate : this.currentDate;
        this.endDate = this.endDate ? this.endDate : this.currentDate;
        let productWiseVolumeURL = `${process.env.ANALYTICS_SERVICE_URL}` + '/retailer/' + retailerId + '/reports/productReport?from=' + this.startDate + '&to=' + this.endDate + '&periodicity=' +Periodicity+ '&productId=' + productId;
        dispatch(GetProductWiseVolumeData(reportsReducer, productWiseVolumeURL));
    }

    onPieEnterProfit(data, index) {
        this.setState({
            activeIndexProProfit: index,
            showProductLineChartProfit: true,
            showProductLineChart: true,
        });
        this.productName = data.name;
        const { dispatch, reportsReducer } = this.props;
        let retailerId = localStorage.getItem("retailerID");
        let productId = data.productId;
        let Periodicity = this.productReports.periodicity ? this.productReports.periodicity : '1-0-0';
        
        
        this.startDate = this.startDate ? this.startDate : this.currentDate;
        this.endDate = this.endDate ? this.endDate : this.currentDate;
        let productWiseVolumeURL = `${process.env.ANALYTICS_SERVICE_URL}` + '/retailer/' + retailerId + '/reports/productReport?from=' + this.startDate + '&to=' + this.endDate + '&periodicity=' +Periodicity+ '&productId=' + productId;
        dispatch(GetProductWiseVolumeData(reportsReducer, productWiseVolumeURL));
    }

    handleSelectChange = (id, name) => {
        _set(this.productReports,name,id);
        this.forceUpdate();
    }


    render() {
        let date = new Date();

        this.currentDate = moment(date).format("YYYY-MM-DD")

        let color = 0x111111;

        const Periodicity = {
            "data": [{
                "value": "1-0-0",
                "displayText": "Daily"
            }, {
                "value": "7-0-0",
                "displayText": "Weekly"
            }, {
                "value": "14-0-0",
                "displayText": "Fortnightly"
            }, {
                "value": "0-1-0",
                "displayText": "Monthly"
            },  {
                "value": "0-3-0",
                "displayText": "Quarterly"
            }, {
                "value": "0-6-0",
                "displayText": "Half-Yearly"
            }, {
                "value": "0-0-1",
                "displayText": "Yearly"
            }]
        }
        
        this.productWiseVolumeData = this.props.productWiseVolumeData;

        let i = 0;
        _map(this.productWiseVolumeData, (asd) => {
            let Date = asd.From.substring(0,10);
            let formattedDate = moment(Date).format("MMM-DD-YYYY")
            _set(this.productWiseVolumeData, `[${i}].From`, formattedDate);
            i += 1;
        })
        

        // if (!this.actionDate) {
        //     this.actionDate = dateFormattedUSA({ value: new Date() });
        // }



        return (
            <div className="">
                {/* <div className="col-md-6">
                    <PieChart data={productVolume} width={450} height={400} radius={110} innerRadius={20} sectorBorderColor="white" title="Product Volume Report" />
                </div>

                <div className="col-md-6">
                    <PieChart data={productRevenue} width={450} height={400} radius={110} innerRadius={20} sectorBorderColor="white" title="Product Revenue Report" />
                </div> */}
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
                        <label className="control-label">Periodicity</label>
                        <AutoComplete
                            type="single"
                            data={_get(Periodicity, 'data', [])}
                            name="periodicity"
                            value={_get(this.productReports, 'periodicity', '')}
                            changeHandler={(id, name) => { this.handleSelectChange(id, "periodicity") }}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="pie-chart">

                            <PieChart width={800} height={400}>
                                <Pie
                                    activeIndex={this.state.activeIndexProVolume}
                                    activeShape={renderActiveShape}
                                    data={this.props.productVolumeData}
                                    cx={300}
                                    cy={200}
                                    innerRadius={80}
                                    outerRadius={140}
                                    //fill="#8884d8"
                                    onClick={this.onPieEnterVolume}
                                    onMouseEnter={this.onPieHoverVolume}>
                                    {
                                        this.props.productVolumeData.map((entry, index) => {
                                            color = color + 0x12345;
                                            return <Cell key={{ index }} fill={"#" + color.toString(16)} />
                                        })
                                    }
                                </Pie>
                            </PieChart>
                            <h4> Volume </h4>
                        </div>

                    </div>

                    <div className="col-sm-4">
                        <div className="pie-chart">

                            <PieChart width={800} height={400}>
                                <Pie
                                    activeIndex={this.state.activeIndexProRevenue}
                                    activeShape={renderActiveShapeRevenue}
                                    data={this.props.productRevenueData}
                                    cx={300}
                                    cy={200}
                                    innerRadius={80}
                                    outerRadius={140}
                                    //fill="#8884d8"
                                    onClick={this.onPieEnterRevenue}
                                    onMouseEnter={this.onPieHoverRevenue}>
                                    {
                                        this.props.productRevenueData.map((entry, index) => {
                                            color = color + 0x12345;
                                            return <Cell key={{ index }} fill={"#" + color.toString(16)} />
                                        })
                                    }
                                </Pie>
                            </PieChart>
                            <h4> Revenue </h4>
                        </div>
                        {/* <div className="rechart-graph">
                            {this.state.showProductLineChartRevenue == true ?
                                <div>
                                    <h4> {this.productName} </h4>
                                    <LineChart width={600} height={300} data={this.props.productWiseVolumeData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="totalSale" stroke="#82ca9d" />
                                    </LineChart>
                                </div> : ''}
                        </div> */}
                    </div>

                    <div className="col-sm-4">
                        <div className="pie-chart">

                            <PieChart width={800} height={400}>
                                <Pie
                                    activeIndex={this.state.activeIndexProProfit}
                                    activeShape={renderActiveShapeProfit}
                                    data={this.props.productProfitData}
                                    cx={300}
                                    cy={200}
                                    innerRadius={80}
                                    outerRadius={140}
                                    //fill="#8884d8"
                                    onClick={this.onPieEnterProfit}
                                    onMouseEnter={this.onPieHoverProfit}>
                                    {
                                        this.props.productProfitData.map((entry, index) => {
                                            color = color + 0x12345;
                                            return <Cell key={{ index }} fill={"#" + color.toString(16)} />
                                        })
                                    }
                                </Pie>
                            </PieChart>
                            <h4> Profit </h4>
                        </div>
                        {/* <div className="rechart-graph">
                            {this.state.showProductLineChartProfit == true ?
                                <div>
                                    <h4> {this.productName} </h4>
                                    <LineChart width={600} height={300} data={this.props.productWiseVolumeData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="totalSale" stroke="#82ca9d" />
                                    </LineChart>
                                </div> : ''}
                        </div> */}
                    </div>

                    <div className="col-sm-12">
                        {this.state.showProductLineChart == true ?
                            <div>
                                <h4 style={{ marginTop: "80px", marginBottom: "40px" }} > {this.productName} </h4>
                                <LineChart width={600} height={300} data={this.productWiseVolumeData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <XAxis dataKey="From" />
                                    <YAxis />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="TotalSale" stroke="#0D1F45" />
                                    <Line type="monotone" dataKey="TotalRevenue" stroke="#0D5307" />
                                    <Line type="monotone" dataKey="TotalProfit" stroke="#8F3409" />
                                </LineChart>
                            </div> : ''}
                    </div>

                </div>

            </div>
        )

    }

}

const mapStateToProps = state => {

    let { reportsReducer } = state;

    let { productVolumeData, productWiseVolumeData, productRevenueData, productProfitData, productWiseRevenueData, productWiseProfitData } = reportsReducer || []


    return {
        productVolumeData,
        productWiseVolumeData,
        productRevenueData,
        productProfitData,
        productWiseProfitData,
        productWiseRevenueData

    }
}

export default connect(mapStateToProps)(ChartsContainer);