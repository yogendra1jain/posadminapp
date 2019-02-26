import React from 'react';
import Redirect from "react-router/Redirect";
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';
import "bootstrap/dist/css/bootstrap.css";
import SaveButton from '../../components/common/SaveButton.jsx'
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEmpty from 'lodash/isEmpty';
import _isArray from 'lodash/isArray';
import _find from 'lodash/find';
import _pull from 'lodash/pull';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'react-drawer/lib/react-drawer.css';
import Alert from 'react-s-alert';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import AutoComplete from '../../components/Elements/AutoComplete';
// import { fetchStoreList } from '../../actions/store';
import { fetchSaleReportData } from '../../actions/reports';
import { toTimestamp } from '../../helpers/helpers';


const options = {
    paginationPosition: 'top',
    defaultSortName: 'name',
    defaultSortOrder: 'asc',
    clearSearch: true,
    withFirstAndLast: true,
    sizePerPageList: [{
        text: '5', value: 5
    }, {
        text: '10', value: 10
    }],


};
class SaleDataReportContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment(),
            endDate: moment().add(1, 'days'),
            storeId: '',
            storeList: []
        }
    }

    showAlert(error, msg) {
        if (error) {
            Alert.error(msg || '', {
                position: 'bottom-right',
                effect: 'slide',
                timeout: 5000,
                html: true
            });
            this.forceUpdate();
        } else {
            Alert.success(msg || 'successfully saved.', {
                position: 'bottom-right',
                effect: 'slide',
                timeout: 3000,
                html: true
            });
        }

    }

    componentWillReceiveProps(props) {

    }

    componentDidMount() {
        this.fetchSaleDataReport();
    }

    fetchSaleDataReport = () => {
    }

    handleChangeStartDate = (date, event) => {
        console.log('date in start change date', date, 'event', event, 'target', event.target);
        this.setState({
            startDate: moment(date)
        })
        // , this.sendDateForGettingData(moment(date), this.state.endDate));
    }

    handleSelectChange = (id, name) => {
        // this.setState({ storeId: id })
    }

    handleSubmitReportData = () => {
        let fromDate = toTimestamp(_get(this, 'state.startDate', 0))
        let endDate = toTimestamp(_get(this, 'state.endDate', 0))
        let finalObj = { fromDate: fromDate, endDate: endDate }
        console.log('dataaaaaaaaaaaaaaaaaaaaaaa', finalObj)
    }

    render() {

        if (_get(this, 'props.isFetching')) {
            return (<div className='loader-wrapper-main'>
                <div className="spinner">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div>
            </div>);
        }

        let { saleDataReportData } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-sm-6 col-xs-8">
                        <ul className="breadcrumb" >
                            <li>Employee Payroll Deduct Summary</li>
                        </ul>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="date-range">
                        <div class="head-title">Select Date: </div>
                        <div className="col-sm-3 form-d date-parent">
                            <label className="control-label">Date </label>
                            <DatePicker
                                selected={this.state.startDate}
                                selectsStart
                                showYearDropdown={true}
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onSelect={this.handleChangeStartDate}
                                className="form-control"
                            />
                        </div>

                        {/* <div className="col-sm-3">
                            <label>Select Store</label>
                            <AutoComplete
                                type="single"
                                data={this.state.storeList}
                                name="stores"
                                value={_get(this.state, 'storeId', '')}
                                changeHandler={(id) => { this.handleSelectChange(id) }}
                            />
                        </div> */}
                        <div className="col-sm-3 form-btn-group">
                            <SaveButton buttonDisplayText={'Submit'} handlerSearch={() => this.handleSubmitReportData()} />
                            {/* <SaveButton Class_Name={"btn-info"} buttonDisplayText={'Add new'} handlerSearch={this.addNew} /> */}
                        </div>
                    </div>
                </div>
                <div>
                    <BootstrapTable
                        height='515'
                        data={saleDataReportData}
                        options={options}
                        striped hover
                        pagination={true}
                        exportCSV={true}
                        search={true}
                        searchPlaceholder={'Search'}>

                        <TableHeaderColumn width='100' dataField='date'  isKey={true} >Date</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='time'>Time</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='orderId' dataSort>Order Id</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='employeeName' dataSort>WebPos Staff Name</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='totalSale' dataSort>Customer Name</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='totalRefund' dataSort>Customer Id</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='totalRemianingAmount' dataSort>Employee Code</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='fileSource' dataSort>KaBloom Extended SKU</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='totalRemianingAmount' dataSort>Barcode</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='fileSource' dataSort>Product Name</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='companyCode'>Staff Note</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='employeeId'>Notes</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='deductionDate' dataSort>Group</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='employeeName' dataSort>Category</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='totalSale' dataSort>Sub Category</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='totalRefund' dataSort>Hot Product</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='totalRemianingAmount' dataSort>Item Vender No</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='fileSource' dataSort>Vendor Name</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='totalRemianingAmount' dataSort>Item Type</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='fileSource' dataSort>Price Retail Unit</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='companyCode'>Quantity</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='employeeId'>Total Retail Sales</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='deductionDate' dataSort>Total Discounts</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='employeeName' dataSort>Total Pre-Tax Sales</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='totalSale' dataSort>Taxes</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='totalRefund' dataSort>Total Sales Including GC</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='totalRemianingAmount' dataSort>Total Sales</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='fileSource' dataSort>Payment method1</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='totalRemianingAmount' dataSort>Payment method1 Amount</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='fileSource' dataSort>Payment method2</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='companyCode'>Payment method2 Amount</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='employeeId'>Payment method3</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='deductionDate' dataSort>Payment method3 Amount</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='employeeName' dataSort>Total Item Discount</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='totalSale' dataSort>Employee Discount Amount</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='totalRefund' dataSort>Item Discount Amount</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='totalRemianingAmount' dataSort>Total Cart Discount</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='fileSource' dataSort>Loyalty Discount Amount</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='totalRemianingAmount' dataSort>Cart Discount Amount</TableHeaderColumn>
                    </BootstrapTable>
                </div>
                <div>
                </div>
            </div>
        )

    }

}

const mapStateToProps = state => {

    let { reportsReducer } = state
    let { saleDataReportData } = reportsReducer || []

    return {
        saleDataReportData
    }
}

export default connect(mapStateToProps)(SaleDataReportContainer);
