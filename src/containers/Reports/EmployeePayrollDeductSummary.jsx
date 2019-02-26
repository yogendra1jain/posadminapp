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
import { fetchEmpPayrollDeductSummary } from '../../actions/reports';
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
class EmployeePayrollDeductSummary extends React.Component {
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
        // let reqBody = {
        //     id: localStorage.getItem('retailerID')
        // }
        // let url = `/Store/ByRetailerId`;
        // this.props.dispatch(fetchStoreList('', url, reqBody))
        //     .then((data) => {
        //         !_isEmpty(data) && _isArray(data) && data.map((values, index) => {
        //             let obj = {}
        //             obj = { value: values.id, displayText: values.name }
        //             this.setState({
        //                 storeList: [...this.state.storeList, obj]
        //             })
        //         })
        //     }, (err) => {
        //         console.log('err', err);
        //     })

        this.fetchEmpPayrollDeductSummary();
    }

    fetchEmpPayrollDeductSummary = () => {
        // let reqBody = {
        //     id: localStorage.getItem('retailerID')
        // }
        // let url = `/Store/ByRetailerId`;
        // this.props.dispatch(fetchStoreList('', url, reqBody))
        //     .then((data) => {
        //         !_isEmpty(data) && _isArray(data) && data.map((values, index) => {
        //             let obj = {}
        //             obj = { value: values.id, displayText: values.name }
        //             this.setState({
        //                 storeList: [...this.state.storeList, obj]
        //             })
        //         })
        //     }, (err) => {
        //         console.log('err', err);
        //     })
    }

    handleChangeStartDate = (date, event) => {
        console.log('date in start change date', date, 'event', event, 'target', event.target);
        this.setState({
            startDate: moment(date)
        })
        // , this.sendDateForGettingData(moment(date), this.state.endDate));
    }

    handleChangeEndDate = (date) => {
        this.setState({
            endDate: moment(date)
        })
        // , this.sendDateForGettingData(this.state.startDate, moment(date)));
    }

    handleSelectChange = (id, name) => {
        this.setState({ storeId: id })
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

        let { empPayrollDeductSummaryData } = this.props;
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
                        <div class="head-title">Date Range: </div>
                        <div className="col-sm-3 form-d date-parent">
                            <label className="control-label">From </label>
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

                        <div className="col-sm-3 form-d date-parent">
                            <label className="control-label">To </label>
                            <DatePicker
                                selected={this.state.endDate}
                                selectsEnd
                                showYearDropdown={true}
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onSelect={this.handleChangeEndDate}
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
                        data={empPayrollDeductSummaryData}
                        options={options}
                        striped hover
                        pagination={true}
                        exportCSV={true}
                        search={true}
                        searchPlaceholder={'Search'}>

                        <TableHeaderColumn width='100' dataField='companyCode'>Company Code</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='employeeId' isKey={true} >Employee Id</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='deductionDate' dataSort>Deduction Date</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='employeeName' dataSort>Employee Name</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='totalSale' dataSort>Total Sale</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='totalRefund' dataSort>Total Refund</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='totalRemianingAmount' dataSort>Total Remaining Amount</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='fileSource' dataSort>File Source</TableHeaderColumn>
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
    let { empPayrollDeductSummaryData } = reportsReducer || []

    return {
        empPayrollDeductSummaryData
    }
}

export default connect(mapStateToProps)(EmployeePayrollDeductSummary);
