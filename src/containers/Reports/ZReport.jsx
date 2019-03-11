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
import { fetchStoreList } from '../../actions/store';
import { fetchZReportData } from '../../actions/reports';
import { toTimestamp } from '../../helpers/helpers';
import { ZReportDetailsSel } from '../../selectors/ZReportSelector.jsx'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Button from '@material-ui/core/Button';
import ReactToPrint from "react-to-print";
import ZReportPrintData from './ZReportPrintData.jsx';
import EditorFormatColorReset from 'material-ui/SvgIcon';

const options = {
    paginationPosition: 'top',
    // defaultSortName: 'name',
    defaultSortOrder: 'asc',
    clearSearch: true,
    withFirstAndLast: true,
    sizePerPageList: [{
        text: '5', value: 5
    }, {
        text: '10', value: 10
    }],


};
class ZReportContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment(),
            endDate: moment().add(1, 'days'),
            storeId: '',
            storeList: [],
            printClicked: false
        }
        this.row = '';
    }

    componentDidMount() {
        this.fetchStores();
    }

    fetchStores = () => {
        let reqBody = {
            id: localStorage.getItem('retailerID')
        }
        let url = `/Store/ByRetailerId`;
        this.props.dispatch(fetchStoreList('', url, reqBody))
            .then((data) => {
                !_isEmpty(data) && _isArray(data) && data.map((values, index) => {
                    let obj = {}
                    obj = { value: values.id, displayText: values.name }
                    this.setState({
                        storeList: [...this.state.storeList, obj]
                    })
                })
            }, (err) => {
                console.log('err', err);
            })
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
        let reqBody = { id: this.state.storeId, fromTimestamp: { seconds: fromDate / 1000 }, toTimestamp: { seconds: endDate / 1000 } }
        let url = `/Reports/ZReport/ByStore`;
        this.props.dispatch(fetchZReportData('', url, reqBody))
            .then((data) => {
            }, (err) => {
                console.log('err', err);
            })
    }

    handleClose = () => {
        this.forceUpdate();
    }

    handlePrint = (row) => {
        this.row = row;
        this.setState({ printClicked: true })
    }

    closeModal = () => {
        this.setState({ printClicked: false })
    }

    actionColumn = (cell, row) => {

        return (
            <div>
                <Button type="button" style={{ marginRight: '10px' }} variant="raised" onClick={() => this.handlePrint(row, false)}>Print</Button>
            </div>
        )
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

        let { zReportDetailsData } = this.props;

        return (
            <div className="">
                <div className='panel-container'>
                    <span className='panel-heading'>Z Report</span>
                </div>
                <div className="react-bs-table-container mb-10">
                    <div className="row">
                        <div className="col-sm-3 date-parent">
                            <div class="head-title">
                                <label>
                                    Date Range: 
                                </label>
                            </div>
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
                        <div className="col-sm-3">
                            <label>Select Store</label>
                            <AutoComplete
                                type="single"
                                data={this.state.storeList}
                                name="stores"
                                value={_get(this.state, 'storeId', '')}
                                changeHandler={(id) => { this.handleSelectChange(id) }}
                            />
                        </div>
                        <div className="col-sm-3 form-btn-group m-t-20">
                            <SaveButton buttonDisplayText={'Submit'} handlerSearch={() => this.handleSubmitReportData()} />
                        </div>
                    </div>
                </div>

                <ZReportPrintData
                    closeModal={() => this.closeModal()}
                    open={this.state.printClicked}
                    data={this.row}
                />

                <div>
                    <BootstrapTable
                        height='450'
                        data={zReportDetailsData}
                        options={options}
                        striped hover
                        pagination={true}
                        exportCSV={true}
                        search={true}
                        searchPlaceholder={'Search'}>

                        <TableHeaderColumn width='140' dataField='shiftId' isKey={true} >Shift Id</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='staff'>Staff</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='pos' dataSort>POS</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='openFrom' dataSort>Open From</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='closedAt' dataSort>Closed At</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='openingAmount' dataSort>Opening Amount</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='cashSales' >Cash Sales</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='cardSales' >Card Sales</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='cashAdded'>Cash Added</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='cashRemoved' dataSort>Cash Removed</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='realClosingBalance' dataSort>Real Closing Balance</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='theoreticalClosingBalance' dataSort>Theoretical Closing Balance</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='difference' dataSort>Difference</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='totalSales' dataSort>Total Sales</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='' dataFormat={this.actionColumn} dataSort>Actions</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        )

    }

}

const mapStateToProps = state => {

    let { reportsReducer } = state
    let zReportDetailsData = ZReportDetailsSel(state);
    let { isFetching } = reportsReducer || false;

    return {
        zReportDetailsData,
        isFetching
    }
}

export default connect(mapStateToProps)(ZReportContainer);
