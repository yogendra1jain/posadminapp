import React from 'react';
import Redirect from "react-router/Redirect";
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';
import "bootstrap/dist/css/bootstrap.css";
import SaveButton from '../../components/common/SaveButton.jsx'
import Button from '@material-ui/core/Button';

import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isArray from 'lodash/isArray';
import _uniq from 'lodash/uniq';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
import _pull from 'lodash/pull';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
// import Category from './category';
import 'react-drawer/lib/react-drawer.css';
import Alert from 'react-s-alert';

import { fetchVendorProducts, requestVendorProductUpdate, fetchProductsFromCache, updateVendorProductsList, updateVendorsList } from '../../actions/products';
import { getVendorData } from '../../actions/vendor';
import { showMessage } from '../../actions/common';
import AutoComplete from '../../components/Elements/AutoComplete';

const options = {
    paginationPosition: 'top',
    defaultSortName: 'productName',
    defaultSortOrder: 'asc',
    clearSearch: true,
    withFirstAndLast: true,
    sizePerPageList: [{
        text: '5', value: 5
    }, {
        text: '10', value: 10
    }],


};
class VendorProductsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.selectedVendor = {};
        this.state = { isVendorSelected: false };
        this.selectRowProp = {
            mode: 'radio',
            clickToSelect: false,
            onSelect: this.onRowSelect,
            // onSelectAll: this.onSelectAll,
            bgColor: '#ffffff',
            // selected : this.selectedIds,
        }
        this.method = 'POST';
        this.vendorList = [];
        this.selectedIds = []
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

    componentDidMount() {
        let reqObj = {
            id: localStorage.getItem('retailerID')
        }
        let url = `/Vendor/ByRetailerId`;
        let vendorProdUrl = `/VendorProduct/GetByRetailerId`;
        this.props.dispatch(getVendorData('', url, reqObj))
        this.fetchVendorProducts(vendorProdUrl, reqObj);

    }

    componentWillReceiveProps(props) {
        if (props.vendorList) {
            this.vendorList = [];
            _get(props, 'vendorList', []).map(vendor => {
                let tempStore = {};
                tempStore.displayText = vendor.label;
                tempStore.value = vendor.value;
                this.vendorList.push(tempStore);
            })
            this.forceUpdate();
        }
    }

    fetchVendorProducts = (vendorProdUrl, reqObj) => {
        this.props.dispatch(fetchVendorProducts('', vendorProdUrl, reqObj))
            .then((data) => {
                console.log('came in then of vendorproduct service call.');
                let productIds = [];
                let vendorIds = [];
                !_isEmpty(data) && _isArray(data) && data.map((value) => {
                    productIds.push(value.posProductId);
                    vendorIds.push(value.vendorId);
                })
                this.getProductsFromCache(_uniq(productIds), _uniq(vendorIds));
            }, (err) => {
                console.log('err', err);
                this.props.dispatch(showMessage({ text: `${JSON.stringify(err)}`, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 1000);
            })
    }

    getProductsFromCache = (prodIds, vendorIds) => {
        let productsUrl = `/Product/GetByIds`;
        let data = {
            ids: prodIds,
        };
        this.props.dispatch(fetchProductsFromCache('', productsUrl, data))
            .then((data) => {
                console.log('data from cache', data);
                this.props.dispatch(updateVendorProductsList('', data));
                let vendorsUrl = `/Vendor/GetByIds`;
                let req = {
                    ids: vendorIds,
                };
                this.props.dispatch(fetchProductsFromCache('', vendorsUrl, req))
                    .then((data) => {
                        console.log('data from cache', data);
                        this.props.dispatch(updateVendorsList('', data));
                    }, (err) => {
                        console.log('err while fetching products from cache', err);
                    })
            }, (err) => {
                console.log('err while fetching products from cache', err);
            })
    }

    onRowSelect = (row, isSelected, e) => {
        isSelected ? this.selectedIds = [(row.id)] : _pull(this.selectedIds, row.id);
        // this.handleAllChecks();        
        this.selectedStore = row;
        if (isSelected == false) {

            this.selectedInfo = {};
            this.selectedStore = {};
        }
        this.selectRowProp.selected = this.selectedIds;
        this.forceUpdate();
    }

    handleSelectChange = (id, name) => {

    }
    addNewVendorProduct = () => {
        this.props.history.push('/vendorproducts/add');
    }
    updateVendorProduct = () => {
        if (this.selectedIds.length > 0) {
            let prodId = this.selectedIds[0];
            let tempProd = _find(this.props.vendorProductsList, { 'id': prodId });
            const { dispatch } = this.props;
            dispatch(requestVendorProductUpdate('', tempProd));
            this.props.history.push('/vendorproducts/add');
        }

    }

    handleVendorChange = (id, name) => {
        if(id == null)  {
            this.productLists = []
            this.selectedVendor = {}
            this.forceUpdate()
        } else {
            _set(this.selectedVendor, name, id);
            let vendorProdUrl = `/VendorProduct/GetByVendorId`;
            let reqObj = {
                id: id,
            }
            this.setState({ isVendorSelected: true }, () => {
                this.fetchVendorProducts(vendorProdUrl, reqObj);
            });
        } 
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.vendorProductsList !==  this.props.vendorProductsList) {
            if(this.state.isVendorSelected) {
                this.productLists = this.props.vendorProductsList
                this.forceUpdate()
            }
        }
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
        return (
            <div className="">
                <div className='panel-container'>
                    <span className='panel-heading'>Vendor Products</span>

                    <div>
                        <SaveButton disabled={this.selectedIds.length < 1}  Class_Name="m-r-10" buttonDisplayText={'Update'} handlerSearch={() => this.updateVendorProduct()} />
                        <SaveButton  disabled={_isEmpty(this.selectedVendor)} Class_Name="btn-info" buttonDisplayText={'Add New'} handlerSearch={this.addNewVendorProduct} />
                    </div>
                </div>

                <div>
                <div className="row">
                    <div className="col-sm-4 m-t-10">
                        <label>Select Vendor</label>
                        <AutoComplete
                            type="single"
                            data={this.vendorList}
                            name="vendor"
                            value={this.selectedVendor.vendor}
                            changeHandler={(id) => this.handleVendorChange(id, 'vendor')}
                        />
                    </div>
                    </div>
                    
                    <div>
                        <BootstrapTable
                            data={this.productLists}
                            options={options}
                            selectRow={this.selectRowProp}
                            striped hover
                            pagination={true}
                            exportCSV={true}
                            search={true}
                            searchPlaceholder={'Search Vendor Products'}>

                            <TableHeaderColumn width='100' dataField='id' isKey={true} hidden={true}>Id</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='vendorName' >Vendor Name</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='productName'>POS Product</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='sku' dataSort>SKU</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='combinedPrice' dataSort>Price</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='defaultOrderQty' dataSort>Default Order Quantity</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='conversionFactor' dataSort>Conversion Factor</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>
                <div>
                </div>
            </div>
        )

    }

}

const mapStateToProps = (state, ownProps) => {

    let { productsReducer, vendorsReducer } = state

    let { type } = productsReducer || {};
    let { vendorProductsData } = productsReducer || [];
    let { isFetching } = productsReducer || false;
    let vendorList = []
    let vendorProductsList = [];
    let { vendorData } = vendorsReducer || [];
    if(!_isEmpty(vendorData)) {
        _get(vendorsReducer, 'vendorData', []).map((data, index) => {
            let phoneNumber = _get(data, 'phoneNumber.phoneNumber', 0);
    
            vendorList.push(
                {
                    value: data.id,
                    label: data.name,
                }
            )
        })
    }
    !_isEmpty(vendorProductsData) && _isArray(vendorProductsData) && vendorProductsData.map((data, index) => {
        let price = `${_get(data, 'price.currencyCode', '')} ${_get(data, 'price.price', 0)}`;

        vendorProductsList.push(
            {
                id: data.id,
                vendorId: data.vendorId,
                vendorName: data.vendorName,
                posProductId: data.posProductId,
                productName: data.productName,
                retailerId: data.retailerId,
                sku: data.sku,
                combinedPrice: price,
                price: data.price,
                defaultOrderQty: data.defaultOrderQty,
                conversionFactor: data.conversionFactor,

            }
        )
    })

    return {
        vendorList,
        isFetching,
        vendorsReducer,
        type,
        vendorProductsList

    }
}

export default connect(mapStateToProps)(VendorProductsContainer);
