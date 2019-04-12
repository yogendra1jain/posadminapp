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
import { fetchStore } from '../../actions/store';
import { fetchSaleReportData } from '../../actions/reports';
import { toTimestamp } from '../../helpers/helpers';
import CircularProgress from '@material-ui/core/CircularProgress';

const options = {
    paginationPosition: 'top',
    defaultSortName: 'staffName',
    // defaultSortOrder: 'asc',
    clearSearch: true,
    withFirstAndLast: true,
    sizePerPageList: [{
        text: '5', value: 5
    }, {
        text: '10', value: 10
    }]
};
class SaleDataReportContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment(),
            endDate: moment(),
            storeId: '',
            storeList: [],
            saleReportData: [],
            isLoading: false
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
        if (!_isEmpty(props.storeData)) {
            let storeList = [];
            if (Array.isArray(props.storeData)) {
                this.setState({ isLoading: false })
                _get(props, 'storeData', []).map(store => {
                    let tempStore = {};
                    tempStore.displayText = store.name;
                    tempStore.value = store.id;
                    storeList.push(tempStore);
                })
                this.setState({ storeList })
            }
        }

        if (_get(props, 'saleReportData', [])) {
            let saleReport = []
            if(!_isEmpty(props.saleReportData)) {
                if (Array.isArray(props.saleReportData)) {
                    _get(props, 'saleReportData', []).map(report => {
                    let paymentMethod1 = ''
                    let paymentMethod2 = ''
                    let paymentMethod3 = ''
                    _get(report, 'payments',[]).map(payment => {
                        let isCash = ('paymentMethod' in  payment)
                        if(!isCash) {
                            paymentMethod1 = 'CASH'
                        }
                        if(payment.paymentMethod == 1) {
                            paymentMethod2 = 'CARD - FREEDOM PAY'
                        }
                        if(payment.paymentMethod == 2) {
                            paymentMethod3 = 'GIFT CARD'
                        }
                    })
                    let tax
                    let isTaxExist = !('itemTaxPercent' in _get(report, 'saleItem', {}))
                    isTaxExist ? tax = 0 : tax = (_get(report, 'saleItem.itemSubTotal.amount', 0) * _get(report, 'saleItem.itemTaxPercent', 0)) / 100
                    let isProductExist = !('product' in report)
                    let isMiscExist = !('misc' in _get(report, 'product', {}))
                    let tempStore = {}
                    tempStore.date = moment.utc(_get(report, 'saleTransactionDetail.saleTimeStamp.seconds', 0) * 1000).format("DD-MMM-YYYY hh:mm:ss")
                    tempStore.orderId = _get(report, 'saleTransactionDetail.id', '')
                    tempStore.staffName = _get(report, 'staff.person.firstName', '') + ' ' + _get(report, 'staff.person.lastName', '')
                    tempStore.customerName = _get(report, 'customer.customer.firstName', '') + ' ' + _get(report, 'customer.customer.lastName', '')
                    tempStore.customerId = _get(report, 'customer.id', '')
                    tempStore.employeeCode = _get(report, 'customer.employeeId', '')
                    tempStore.sku = _get(report, 'product.sku', '')
                    tempStore.barCode = _get(report, 'product.upcCode', '')
                    tempStore.productName = _get(report, 'product.name', '')
                    tempStore.staffNote = _get(report, 'saleTransactionDetail.saleComment', '')
                    tempStore.group = _get(report, 'group.name', '')
                    tempStore.category = _get(report, 'category.name', '')
                    tempStore.subCategory = _get(report, 'subCategory.name', '')
                    tempStore.itemType = isProductExist ? 'Gift Card' : isMiscExist ? 'Product' : 'Miscellaneous Product'
                    tempStore.priceRetailUnit = _get(report, 'product.salePrice.price', 0)
                    tempStore.quantity = _get(report, 'saleItem.qty', 1)
                    tempStore.totalRetailSales = _get(report, 'saleItem.itemRegularTotal.amount', 0)
                    tempStore.totalItemDiscount = _get(report, 'saleItem.itemTotalDiscountAmount.amount', 0)
                    tempStore.preTaxSales = _get(report, 'saleItem.itemSubTotal.amount', 0)
                    tempStore.tax = tax.toFixed(2)
                    tempStore.totalSales = _get(report, 'saleItem.itemEffectiveTotal.amount', 0)
                    tempStore.employeeDiscountAmount = ((_get(report, 'saleItem.itemRegularTotal.amount', 0) * _get(report, 'saleItem.employeeDiscountPercent', 0)) / 100).toFixed(2)
                    tempStore.itemDiscountAmount = ((_get(report, 'saleItem.itemRegularTotal.amount') * _get(report, 'saleItem.itemDiscountPercent', 0)) / 100).toFixed(2)
                    tempStore.cartDiscountAmount = ((_get(report, 'saleItem.itemRegularTotal.amount') * _get(report, 'saleItem.cartDiscountPercent', 0)) / 100).toFixed(2)
                    tempStore.costPrice = _get(report, 'product.costPrice.price', 0) * _get(report, 'saleItem.qty', 1)
                    tempStore.paymentMethod1 = paymentMethod1
                    tempStore.paymentMethod2 = paymentMethod2
                    tempStore.paymentMethod3 = paymentMethod3
                    tempStore.itemVendorNo = _get(report, 'vendorProduct.sku', '')
                    tempStore.vendorName = _get(report, 'vendor.name', '')
                    saleReport.push(tempStore)
                })
                this.setState({ saleReportData: saleReport })
            }
        } 
    }else {
        this.setState({ saleReportData: [], isLoading: false })
    }
    }

    componentDidMount() {
        if(localStorage.getItem('role') == 1) {
            const { dispatch, storesReducer } = this.props;
            let reqBody = {
                id: localStorage.getItem('retailerID')
            }
            let url = '/Store/ByRetailerId'
            dispatch(fetchStore(storesReducer, url, reqBody));
        } else if(localStorage.getItem('role') == 2) {
            this.setState({ storeId: localStorage.getItem('storeID')})
        }
        
    }

    handleChangeStartDate = (date, event) => {
        console.log('date in start change date', date, 'event', event, 'target', event.target);
        this.setState({
            startDate: moment(date)
        })
    }

    handleSelectChange = (id, name) => {
        if(id == null) {
            this.setState({saleReportData: [], storeId: ''})
        } else {
            this.setState({ storeId: id })
        }
    }

    handleSubmitReportData = () => {
        this.setState({ isLoading: true })
        let fromDate = toTimestamp(_get(this, 'state.startDate', 0))
        let end = moment(this.state.startDate).add(1, 'days')
        let endDate = toTimestamp(end)
        console.log(fromDate, 'fromDate', endDate, 'endDate')
        let finalObj = {
            id: this.state.storeId,
            fromTimeStamp: {
                seconds: fromDate / 1000
            },
            toTimeStamp: {
                seconds: endDate / 1000
            }
        }
        this.props.dispatch(fetchSaleReportData('', '/Reports/SalesReport/ByStore', finalObj))
    }

    render() {  
        const role = localStorage.getItem('role')
        return (
            <div className="">
                <div className='panel-container'>
                    <span className='panel-heading'>Sale Data Report</span>
                </div>
                <div className="react-bs-table-container mb-10">
                <div className="row">
                    <div className="col-sm-3 date-parent">
                    <div class="head-title"><label>Select Date: </label></div>
                        <label className="control-label">Date</label>
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
                    {
                        role == 1 ? 
                        <div className="col-sm-3">
                            <label>Select Store</label>
                            <AutoComplete
                                type="single"
                                data={this.state.storeList}
                                name="stores"
                                value={_get(this.state, 'storeId', '')}
                                changeHandler={(id) => { this.handleSelectChange(id) }}
                            />
                        </div> : 
                        <div className="col-sm-3" style={{marginTop: "25px"}}>
                            <label>Store Name: <span>{localStorage.getItem('storeName')}
                            </span></label>
                        </div>
                    }
                    
                    <div className="col-sm-3 form-btn-group m-t-20">
                        <SaveButton disabled={this.state.storeId == ''} buttonDisplayText={'Submit'} handlerSearch={() => this.handleSubmitReportData()} />
                        {/* <SaveButton Class_Name={"btn-info"} buttonDisplayText={'Add new'} handlerSearch={this.addNew} /> */}
                    </div>
                </div>
                </div>

                <div>
                {
                    this.state.isLoading ? <div style={{marginTop: '100px'}} className='loader-wrapper-main'>
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
                                data={_get(this, 'state.saleReportData', [])}
                                options={options}
                                striped hover
                                pagination={true}
                                exportCSV={true}
                                search={true}
                                searchPlaceholder={'Search'}>

                                <TableHeaderColumn width='100' dataField='date' isKey={true} >Date
                        </TableHeaderColumn>
                                {/* <TableHeaderColumn width='100' dataField='time'>Time
                        </TableHeaderColumn> */}
                                <TableHeaderColumn width='200' dataField='orderId' dataSort>Order Id
                        </TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='staffName' dataSort>Staff Name</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='customerName' dataSort>Customer Name</TableHeaderColumn>
                                <TableHeaderColumn width='200' dataField='customerId' dataSort>Customer Id</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='employeeCode' dataSort>Employee Code</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='sku' dataSort>SKU</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='barCode' dataSort>Barcode</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='productName' dataSort>Product Name</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='staffNote'>Staff Note</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='group' dataSort>Group</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='category' dataSort>Category</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='subCategory' dataSort>Sub Category</TableHeaderColumn>
                                {/* <TableHeaderColumn width='100' dataField='totalRefund' dataSort>Hot Product</TableHeaderColumn> */}
                                <TableHeaderColumn width='100' dataField='itemVendorNo' dataSort>Item Vender No</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='vendorName' dataSort>Vendor Name</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='itemType' dataSort>Item Type</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='priceRetailUnit' dataSort>Price Retail Unit</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='costPrice' dataSort>Cost Price</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='quantity'>Quantity</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='totalRetailSales'>Total Retail Sales</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='totalItemDiscount' dataSort>Total Item Discount</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='preTaxSales' dataSort>Total Pre-Tax Sales</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='tax' dataSort>Taxes</TableHeaderColumn>
                                {/* <TableHeaderColumn width='100' dataField='totalRefund' dataSort>Total Sales Including GC</TableHeaderColumn> */}
                                <TableHeaderColumn width='100' dataField='totalSales' dataSort>Total Sales</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='paymentMethod1' dataSort>Payment method1</TableHeaderColumn>
                                {/* <TableHeaderColumn width='100' dataField='totalRemianingAmount' dataSort>Payment method1 Amount</TableHeaderColumn> */}
                                <TableHeaderColumn width='100' dataField='paymentMethod2' dataSort>Payment method2</TableHeaderColumn>
                                {/* <TableHeaderColumn width='100' dataField='companyCode'>Payment method2 Amount</TableHeaderColumn> */}
                                <TableHeaderColumn width='100' dataField='paymentMethod3'>Payment method3</TableHeaderColumn>
                                {/* <TableHeaderColumn width='100' dataField='deductionDate' dataSort>Payment method3 Amount</TableHeaderColumn> */}
                                {/* <TableHeaderColumn width='100' dataField='employeeName' dataSort>Total Item Discount</TableHeaderColumn> */}
                                <TableHeaderColumn width='100' dataField='employeeDiscountAmount' dataSort>Employee Discount Amount</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='itemDiscountAmount' dataSort>Item Discount Amount</TableHeaderColumn>
                                {/* <TableHeaderColumn width='100' dataField='cartDiscountAmount' dataSort>Total Cart Discount</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='fileSource' dataSort>Loyalty Discount Amount</TableHeaderColumn> */}
                                <TableHeaderColumn width='100' dataField='cartDiscountAmount' dataSort>Cart Discount Amount</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                }
                </div>
            </div>
        )

    }

}

const mapStateToProps = state => {

    let { reportsReducer, storesReducer } = state
    let { saleReportData } = reportsReducer || []
    let { storeData } = storesReducer || {};
    return {
        saleReportData,
        storeData
    }
}

export default connect(mapStateToProps)(SaleDataReportContainer);
