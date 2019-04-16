import React from 'react';
import DatePicker from 'react-datepicker';
import {connect} from 'react-redux';
import moment from "moment";
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEmpty from 'lodash/isEmpty';
import {fetchStore} from '../../actions/store';
import AutoComplete from '../../components/Elements/AutoComplete';
import SaveButton from '../../components/common/SaveButton';
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';
import {toTimestamp} from '../../helpers/helpers';
import genericPostData from '../../Global/DataFetch/genericPostData';
import showAlert from '../../actions/toastAction';
import CircularProgress from '@material-ui/core/CircularProgress';

const options = {
    paginationPosition: 'top',
    defaultSortName: 'orderCount',
    defaultSortOrder: 'asc',
    clearSearch: true,
    withFirstAndLast: true,
    sizePerPageList: [{
        text: '5', value: 5
    }, {
        text: '10', value: 10
    }]
};

class GiftCardTransactionReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment(),
            endDate: moment().add(1, 'days'),
            selectedStore: '',
            storeList: [],
            giftCardTransactionData: [],
            isLoading: false,
            error: ''
        }
    }

    componentDidMount() {
        if(localStorage.getItem('role') == 1) {
            let reqBody = {
                id: localStorage.getItem('retailerID')
            }
            let url = '/Store/ByRetailerId'
            this.props.dispatch(fetchStore('', url, reqBody));
        } else if(localStorage.getItem('role') == 2) {
            this.setState({ storeId: localStorage.getItem('storeID')})
        }
    }

    componentWillReceiveProps(nextProps) {
        if(Array.isArray(nextProps.storeList)) {
            if(nextProps.storeList.length > 0) {
                this.setState({
                    storeList: nextProps.storeList
                })
    }}}

    handleSubmitReportData = () => {
        this.setState({ isLoading: true })
        let endDate = moment(_get(this.state,'endDate',0))
        endDate.endOf('day');
        let endDateEndTime = new Date(endDate);
        let reqObj = {
            id: _get(this.state,'selectedStore',''),
            fromTimeStamp : {
                seconds: toTimestamp(_get(this.state,'startDate',0)) / 1000
            },
            toTimestamp: {
                seconds: parseInt(endDateEndTime / 1000)
            }
        }
        let url = '/Reports/GiftCards/Issued/ByStore'
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj,
            url,
            identifier: 'fetchGiftCardTransactions',
            successCb: this.handleSuccess,
            errorCb: () => this.handleError,
            successText: "Fetched SuccessFully"
        })
    }

    handleSuccess = (data) => {
        this.setState({isLoading: false}) 
        if(Array.isArray(data)) {
            if(!_isEmpty(data)) {
                let giftCardTransactionData = []
                data.map(data => {
                    let temp = {}
                    temp = data.giftCardRedemption
                    temp.dateTime = moment.utc(_get(data.giftCardRedemption,'paymentTimeStamp.seconds', 0) * 1000).format('DD MM YYYY hh:mm:ss') 
                    temp.customer = _get(data.customer,'customer.firstName','') + ' ' + _get(data.customer,'customer.lastName','')
                    giftCardTransactionData.push(temp)
                    temp.value = _get(data.giftCardRedemption,'value.currencyCode','$') + _get(data.giftCardRedemption,'value.amount',0) 
                })
                this.setState({giftCardTransactionData})
            }
        }
        this.props.dispatch(showAlert({text: 'Data Fetched Successfully!', isSuccess: true}))
    }

    handleError = (err) => {
        this.setState({ error: err, isLoading: false})
        this.props.dispatch(showAlert({text: err, isSuccess: false}))
    }

    render() {
        if (_get(this, 'props.isFetching', false)) {
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
        const role = localStorage.getItem('role')
        return (
            <div className="">
                <div className='panel-container'>
                    <span className='panel-heading'>Gift Card Transactions Report</span>
                </div>
                <div className="react-bs-table-container mb-10">
                    <div className="row">
                        <div className="col-sm-3 date-parent">
                            <div class="head-title">
                                <label>From: </label>
                            </div>
                            <DatePicker
                                selected={this.state.startDate}
                                selectsStart
                                showYearDropdown={true}
                                startDate={this.state.startDate}
                                onSelect={(date) => {this.setState({ startDate: date })}}
                                className="form-control"
                            />
                        </div>
                        <div className="col-sm-3 date-parent">
                            <div class="head-title">
                                <label>To: </label>
                            </div>
                            <DatePicker
                                selected={this.state.endDate}
                                selectsStart
                                showYearDropdown={true}
                                startDate={this.state.startDate}
                                onSelect={(date) => {this.setState({ endDate: date })}}
                                className="form-control"
                            />
                        </div>
                        {
                            role == 1 ? 
                            <div className="col-sm-3">
                                <label>Select Store</label>
                                <AutoComplete
                                    type="single"
                                    data={this.state.storeList}
                                    name="stores"
                                    value={_get(this.state, 'selectedStore', '')}
                                    changeHandler={(id) => {this.setState({selectedStore: id})}}
                                />
                            </div> : 
                            <div className="col-sm-3" style={{ marginTop: "25px" }}>
                                <label>Store Name: 
                                    <span>{localStorage.getItem('storeName')}</span>
                                </label>
                            </div>
                        }
                       
                        <div className="col-sm-3 form-btn-group m-t-20">
                            {this.state.isLoading ? 
                                <CircularProgress color="secondary" /> : 
                                <SaveButton disabled={this.state.selectedStore == ''} Class_Name={"btn-info"} buttonDisplayText={'Submit'} handlerSearch={() => this.handleSubmitReportData()} />
                            }
                        </div>
                    </div>
                </div>
                <div>
                    {this.state.isLoading ? 
                    <div style={{marginTop: '100px'}} className='loader-wrapper-main'>
                        <div className="spinner">
                            <div className="rect1"></div>
                            <div className="rect2"></div>
                            <div className="rect3"></div>
                            <div className="rect4"></div>
                            <div className="rect5"></div>
                        </div>
                    </div> :
                    <div>
                        <BootstrapTable
                        height='515'
                        data={_get(this, 'state.giftCardTransactionData', [])}
                        options={options}
                        striped hover
                        pagination={true}
                        exportCSV={true}
                        search={true}
                        searchPlaceholder={'Search'}>
                            <TableHeaderColumn width='100' dataField='transactionId' isKey={true}>
                                Transaction ID
                            </TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='dateTime'>
                                Time
                            </TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='customer'>
                                Customer
                            </TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='value'>
                                GC value
                            </TableHeaderColumn>
                            {/* Terminal Id not available for now will uncomment once it is avalable */}
                            {/* <TableHeaderColumn width='100' dataField='value'>
                                Terminal ID
                            </TableHeaderColumn> */}
                        </BootstrapTable>
                    </div>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { storesReducer } = state
    const { storeData, isFetching } = storesReducer || []
    let storeList = []
    Array.isArray(storeData) && storeData.map(store => {
        let temp = {}
        temp.displayText = store.name
        temp.value = store.id
        storeList.push(temp)
    })
     
    return {
        storeList,
        isFetching
    }
}

export default connect(mapStateToProps)(GiftCardTransactionReport);