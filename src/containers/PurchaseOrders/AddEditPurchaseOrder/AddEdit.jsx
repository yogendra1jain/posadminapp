import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
import _find from 'lodash/find';

import _isEmpty from 'lodash/isEmpty';
import _set from 'lodash/set';
import _isArray from 'lodash/isArray';
import _uniq from 'lodash/uniq';
import _findIndex from 'lodash/findIndex';
import _cloneDeep from 'lodash/cloneDeep';
/* Material import */
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
/* Redux Imports */
import { connect } from 'react-redux';
import Select from 'react-select'

/* Component Imports */

import { fetchRequisitionList } from '../../../actions/vendor';
import { fetchVendorProducts, fetchRetailerProducts, fetchProductsFromCache, updateVendorProductsList, updateVendorsList } from '../../../actions/products';
import { getVendorData, saveRequisitionForm } from '../../../actions/vendor';
import { fetchStore } from '../../../actions/store';
import { showMessage } from '../../../actions/common';
import { purchaseOrderSave } from '../../../actions/purchaseOrder';
import AutoComplete from '../../../components/Elements/AutoComplete';
import SaveButton from '../../../components/common/SaveButton';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class AddEditPurchaseOrder extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedRows: [],
        }
        this.selectedStore = {}
        this.selectedVendor = {}
    }

    componentDidMount() {
        let requisitionUrl = `/Requisition/GetByCriteria`;
        let reqData = {
            statuses: [0],
            id: localStorage.getItem('retailerID'),
        };
        this.fetchBasicDetails(requisitionUrl, reqData);
        let reqObj = {
            id: localStorage.getItem('retailerID')
        }
        let url = `/Vendor/ByRetailerId`;
        let posProductUrl = `/Product/ByRetailerId`;
        let vendorProdUrl = `/VendorProduct/GetByRetailerId`;
        let storeUrl = '/Store/ByRetailerId';
        this.props.dispatch(getVendorData('', url, reqObj))
        this.props.dispatch(fetchRetailerProducts('', posProductUrl, reqObj))
        const { dispatch, storesReducer } = this.props;
        dispatch(fetchStore(storesReducer, storeUrl, reqObj));

        this.fetchVendorProducts(vendorProdUrl, reqObj);
    }
    fetchVendorProducts = (vendorProdUrl, reqObj) => {
        this.setState({ loading: true })
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
                }, 5000);
            })
    }


    getProductsFromCache = (prodIds, vendorIds) => {
        let productsUrl = `/Product/GetByIds`;
        let data = {
            ids: prodIds,
        };
        this.props.dispatch(fetchProductsFromCache('', productsUrl, data))
            .then((data) => {
                this.setState({
                    cachedProducts: data,
                });
                this.props.dispatch(updateVendorProductsList('', data));
                let vendorsUrl = `/Vendor/GetByIds`;
                let req = {
                    ids: vendorIds,
                };
                this.props.dispatch(fetchProductsFromCache('', vendorsUrl, req))
                    .then((data) => {
                        this.setState({
                            cachedVendors: data,
                            loading: false
                        });
                        this.props.dispatch(updateVendorsList('', data));
                    }, (err) => {
                        console.log('err while fetching products from cache', err);
                    })
            }, (err) => {
                console.log('err while fetching products from cache', err);
            })
    }
    fetchBasicDetails = (requisitionUrl, reqObj) => {
        this.props.dispatch(fetchRequisitionList('', requisitionUrl, reqObj))
            .then((data) => {
                this.setState({ loadingList: false })
                console.log('requisition list fetched successfully.');
            }, (err) => {
                console.log('error while fetching requisition list', err);
                this.props.dispatch(showMessage({ text: `${JSON.stringify(err)}`, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 5000);
            })
    }

    getRequisitionStatus = (status) => {
        let statusValue = '';
        switch (status) {
            case 0:
                statusValue = 'SCRATCH';
                break
            case 1:
                statusValue = 'CAPTURED';
                break
            case 2:
                statusValue = 'REJECTED';
                break
            case 3:
                statusValue = 'COMPLETE';
                break
            default:
                statusValue = 'SCRATCH';
                break;
        }
        return statusValue;
    }

    mapProductName = (productId) => {
        let prod = _find(_get(this.state, 'cachedProducts', []), {
            'id': productId
        });
        return _get(prod, 'name', '');
    }
    mapVendorName = (vendorId) => {
        let vendor = _find(_get(this.state, 'cachedVendors', []), {
            'id': vendorId
        });
        return _get(vendor, 'name', '');
    }
    mapStoreName = (id) => {
        let store = _find(_get(this.props, 'storeList', []), {
            'value': id
        });
        return _get(store, 'displayText', '');
    }
    mapVendorProductName = (id) => {
        let vendor = _find(_get(this.props, 'vendorProductsList', []), {
            'id': id
        });
        return _get(vendor, 'name', '');
    }
    selectRequisitionRow = (data) => {
        let selRows = _cloneDeep(this.state.selectedRows) || [];
        let existIndex = _findIndex(selRows, { 'id': data.id });
        // this.state.selectedRows.indexOf(data.posProductId);
        if (existIndex == -1) {
            selRows.push(data);
        } else {
            selRows.splice(existIndex, 1);
        }
        this.setState({
            selectedRows: selRows,
        });
    }

    populateRequisitionList = () => {
        let rows = []
        if(!_isEmpty(this.props.requisitionListData)) {
            if(Array.isArray(this.props.requisitionListData)) {
                _get(this, 'props.requisitionListData', []).map((data, index) => {
                    rows.push(
                        <div onClick={() => this.selectRequisitionRow(data)} className={_findIndex(this.state.selectedRows, { 'id': data.id }) !== -1 ? 'box-conversion-row selected' : 'box-conversion-row'} style={{ border: 'solid 1px #ddd' }}>
                            <div className='box-conversion-item'>
                                <span className='box-conversion-data'>{this.mapProductName(data.posProductId)}</span>
                                <span className='box-conversion-title'>POS Product</span>
                            </div>
                            <div className='box-conversion-item'>
                                <span className='box-conversion-data'>{this.mapVendorName(data.vendorId)}</span>
                                <span className='box-conversion-title'>Vendor Id</span>
                            </div>
                            <div className='box-conversion-item'>
                                <span className='box-conversion-data'>{this.mapStoreName(data.storeId)}</span>
                                <span className='box-conversion-title'>Store Id</span>
                            </div>
                            {/* <div className='box-conversion-item'>
                                <span className='box-conversion-data'>{data.vendorProductId}</span>
                                <span className='box-conversion-title'>Vendor Product</span>
                            </div> */}
                            <div className='box-conversion-item'>
                                <span className='box-conversion-data'>{data.quantity}</span>
                                <span className='box-conversion-title'>Quantity</span>
                            </div>
                            <div className='box-conversion-item'>
                                <span className='box-conversion-data'>{this.getRequisitionStatus(data.status)}</span>
                                <span className='box-conversion-title'>Status</span>
                            </div>
                        </div>
                    )
                })
            }
        }

        return (
            <div className='react-bs-table-container'>
                {rows.length < 1 ? 'No Data Found' : rows}
            </div>
        )
    }

    toggleDialog = () => {
        this.setState({
            showDialog: !this.state.showDialog,
        });
    }
    handleChange = (id, name) => {
        this.setState({ loadingList: true })
        if (name == 'vendor') {
            _set(this.selectedVendor, name, id);
        } else {
            _set(this.selectedStore, name, id);
        }
        this.forceUpdate();
        let requisitionUrl = `/Requisition/GetByCriteria`;
        let reqData = {
            statuses: [0],
            id: localStorage.getItem('retailerID'),
            vendorId: name === 'vendor' ? id : this.selectedVendor.vendor,
            storeId: name === 'store' ? id : this.selectedStore.store,
        };
        this.fetchBasicDetails(requisitionUrl, reqData);
    }

    SavePO = () => {
        let requisionIds = [];
        this.state.selectedRows.map((row) => {
            requisionIds.push(row.id);
        });
        let url = `/PurchaseOrder/Create`;
        let data = {
            requisitionIds: requisionIds
        }

        this.props.dispatch(purchaseOrderSave('', url, data))
            .then((data) => {
                if (!_isEmpty(data)) {
                    this.props.history.push('/purchaseorders');
                    this.props.dispatch(showMessage({ text: `Saved Successfully.`, isSuccess: true }));
                    setTimeout(() => {
                        this.props.dispatch(showMessage({}));
                    }, 5000);
                } else {
                    this.props.dispatch(showMessage({ text: `something went wrong.`, isSuccess: false }));
                    setTimeout(() => {
                        this.props.dispatch(showMessage({}));
                    }, 5000);
                }

            }, (err) => {
                this.props.dispatch(showMessage({ text: `${JSON.stringify(err)}`, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 5000);
            });
    }
    cancelPO = () => {
        this.props.history.push('/purchaseorders');
    }

    render() {
        const { classes } = this.props;
        if (_get(this, 'state.loading')) {
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
                    <span className='panel-heading'>Requisition List </span>
                    <div>
                        <SaveButton Class_Name="m-r-10" buttonDisplayText={'Cancel'} handlerSearch={() => this.cancelPO()} />
                        <SaveButton disabled={this.state.selectedRows.length < 1} Class_Name="btn-info" buttonDisplayText={'Create PO'} handlerSearch={() => this.SavePO()} />
                    </div>
                </div>

                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Select Vendor</label>
                            <AutoComplete
                                type="single"
                                data={this.props.vendorList}
                                value={this.selectedVendor.vendor}
                                name="vendor"
                                placeholder="Select Vendor"
                                changeHandler={(e) => this.handleChange(e, 'vendor')}
                            />
                        </div>
                        <div className="col-md-6">
                            <label>Select Store</label>
                            <AutoComplete
                                type="single"
                                data={this.props.storeList}
                                value={this.selectedStore.store}
                                name="store"
                                placeholder="Select Store"
                                changeHandler={(e) => this.handleChange(e, 'store')}
                            />
                        </div>
                    </div> 
                    <div>
                        {/* <div className="row">
                            <div className="col-sm-2">
                                <span>Product Name</span>
                            </div>
                            <div className="col-sm-2">
                                <span>Vendor Id</span>
                            </div>
                            <div className="col-sm-2">
                                <span>Store Id</span>
                            </div>
                            <div className="col-sm-2">
                                <span>Proposed Quantity</span>
                            </div>
                            <div className="col-sm-2">
                                <span>Quantity</span>
                            </div>
                            <div className="col-sm-2">
                                <span>Status</span>
                            </div>
                        </div> */}

                        {this.state.loadingList ? <div style={{marginTop: "50px", marginLeft: "50px"}} className='loader-wrapper-main'>
                        <div className="spinner">
                            <div className="rect1"></div>
                            <div className="rect2"></div>
                            <div className="rect3"></div>
                            <div className="rect4"></div>
                            <div className="rect5"></div>
                        </div>
                        </div> : this.populateRequisitionList()}
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    let { vendorsReducer, productsReducer, storesReducer } = state
    let { productsFromCache } = productsReducer || [];

    let { requisitionListData } = vendorsReducer || [];
    let { vendorProductsData, isFetching } = productsReducer || [];
    let vendorProductsList = [];
    let { storeData } = storesReducer || [];
    let storeList = [];
    let { vendorData } = vendorsReducer || [];
    let vendorList = [];

    _isArray(storeData) && !_isEmpty(storeData) && storeData.map((data, index) => {
        storeList.push(
            {
                value: data.id,
                displayText: data.name,
            }
        )
    })

    !_isEmpty(vendorProductsData) && _isArray(vendorProductsData) && vendorProductsData.map((data, index) => {
        vendorProductsList.push(
            {
                value: data.id,
                label: data.productName,
            }
        )
    })
    if(Array.isArray(vendorData)) {
        if(!_isEmpty(vendorData)) {
            vendorData.map((data, index) => {
                vendorList.push(
                    {
                        value: data.id,
                        displayText: data.name,
                    }
                )
            })
        }
    }
    return {
        requisitionListData,
        productsFromCache,
        vendorProductsList,
        storeList,
        vendorList,
        isFetching,
    }

}

export default connect(mapStateToProps)((withStyles(styles)(AddEditPurchaseOrder)))