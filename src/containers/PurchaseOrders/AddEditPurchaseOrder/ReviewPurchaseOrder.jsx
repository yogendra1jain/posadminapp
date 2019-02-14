import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import Button from '@material-ui/core/Button';

import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isArray from 'lodash/isArray';
import _uniq from 'lodash/uniq';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
import _pull from 'lodash/pull';
import { withStyles } from '@material-ui/core/styles';

// import Category from './category';
import { showMessage } from '../../../actions/common';
import FormDialog from '../../../components/common/CommonDialog/index';
import { getRequisitionStatus } from '../../../helpers/helpers';

import { fetchVendorProducts, fetchRetailerProducts, fetchProductsFromCache, updateVendorProductsList, updateVendorsList } from '../../../actions/products';
import { getVendorData, saveRequisitionForm } from '../../../actions/vendor';
import { fetchStore } from '../../../actions/store';
import { fetchPurchaseOrderById, requestPORequisitionUpdate, purchaseOrderSave } from '../../../actions/purchaseOrder';



const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class ReviewPurchaseOrderContainer extends React.Component {
    constructor(props) {
        super(props);
        let { params } = this.props.match;
        this.state = {
            selectedValue: '',
            params: params,
        };
        console.log('params:', params);
    }


    componentDidMount() {
        let reqObj1 = {
            id: _get(this.state, 'params.id', ''),
        }
        let url1 = `/PurchaseOrder/Bloated`;
        this.props.dispatch(fetchPurchaseOrderById('', url1, reqObj1))
            .then((data) => {
                console.log('data fetched purchaseOrderById', data);
            }, (err) => {
                this.props.dispatch(showMessage({ text: `${JSON.stringify(err)}`, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 5000);

            })
            .catch((err) => {
                this.props.dispatch(showMessage({ text: `${JSON.stringify(err)}`, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 5000);
            })
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
                        });
                        this.props.dispatch(updateVendorsList('', data));
                    }, (err) => {
                        console.log('err while fetching products from cache', err);
                    })
            }, (err) => {
                console.log('err while fetching products from cache', err);
            })
    }

    handleSelectChange = (id, name) => {

    }

    onApproveReject = (isReject) => {
        let url = `/PurchaseOrder/Approve`;
        if (isReject) {
            url = `/PurchaseOrder/Reject`
        }
        let data = {
            id: _get(this.state, 'params.id', ''),
        }
        this.props.dispatch(purchaseOrderSave('', url, data))
            .then((data) => {
                this.props.history.push('/purchaseorders');
            }, (err) => {
                console.log('err while approving PO', err);
                this.props.dispatch(showMessage({ text: `${JSON.stringify(err)}`, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 5000);
            })
    }
    onReject = (row) => {

    }
    handleChangeInput = (e, index, proposedQuantity) => {
        let value = _get(e, 'target.value', '');
        this.props.dispatch(requestPORequisitionUpdate('', value, index, proposedQuantity));
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
        return _get(store, 'label', '');
    }
    mapVendorProductName = (id) => {
        let vendor = _find(_get(this.props, 'vendorProductsList', []), {
            'id': id
        });
        return _get(vendor, 'name', '');
    }
    editRequisition = (index) => {
        let reqObj = _get(this.props, `requisitionListData[${index}]`)



    }
    handleSubmitHandler = (index) => {
        let values = _get(this, `props.purchaseOrderById.requisitions[${index}]`, {})
        let data = { ...values };
        data.quantity = Number(data.quantity);
        delete data.proposedQuantity;
        console.log('data to be saved', data);
        let url = `/Requisition/Save`
        this.props.dispatch(saveRequisitionForm('', url, data))
            .then((data) => {
                console.log('requisition is saved successfully.');
                this.props.dispatch(showMessage({ text: `Requisition updated.`, isSuccess: true }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 5000);
                // this.props.toggleEditState();
            }, (err) => {
                console.log('err while saving requisition form', err);
                this.props.dispatch(showMessage({ text: `${JSON.stringify(err)}`, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 5000);
            })
    }

    populateRequisitions = () => {
        let rows = []
        _get(this, 'props.purchaseOrderById.requisitions', []).map((data, index) => {
            rows.push(
                <div className={'box-conversion-row'} style={{ border: 'solid 1px #ddd' }}>
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
                        <span className='box-conversion-data'>{data.proposedQuantity? data.proposedQuantity: data.quantity}</span>
                        <span className='box-conversion-title'>Proposed Quantity</span>
                    </div>
                    <div className='box-conversion-item'>
                        <input className='box-conversion-data' onChange={(e) => this.handleChangeInput(e, index, data.proposedQuantity? data.proposedQuantity: data.quantity)} value={data.quantity} />
                        <span className='box-conversion-title'>Quantity</span>
                    </div>
                    <div className='box-conversion-item'>
                        <span className='box-conversion-data'>{getRequisitionStatus(data.status)}</span>
                        <span className='box-conversion-title'>Status</span>
                    </div>
                    {
                        !this.props.isPOViewFlag &&
                        <div>
                            <Button variant="outlined" color="primary" className={this.props.classes.button} onClick={() => this.handleSubmitHandler(index)}>Edit</Button>
                        </div>
                    }
                </div>
            )
        })

        return (
            <div className='box-conversion-container'>
                <div className='panel-container'>
                    <span className='panel-heading'>Requisition List </span>
                </div>
                {rows}
            </div>
        )
    }
    toggleDialog = () => {
        this.setState({
            openDialog: !this.state.openDialog,
        });
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
        const { purchaseOrderById } = this.props;
        return (
            <div className="">
                <FormDialog
                    open={this.state.openDialog}
                    handleClose={this.toggleDialog}
                    title={'Confirm'}
                    fullScreen={false}
                    fullWidth={true}
                    dialogContent={
                        <div>
                            <span>Are You Sure To Reject.</span>
                            <div className="form-btn-group">
                                <Button type="button" style={{ marginRight: '10px' }} variant="raised" onClick={() => this.onApproveReject(true)}>Reject</Button>
                                <Button type="button" variant="raised" onClick={() => this.toggleDialog()}>Cancel</Button>
                            </div>
                        </div>
                    }
                />
                <div>
                    {
                        !this.props.isPOViewFlag &&
                        <div className="form-btn-group">
                            <Button type="button" style={{ marginRight: '10px' }} variant="raised" onClick={() => this.onApproveReject(false)}>Approve</Button>
                            <Button type="button" variant="raised" onClick={() => this.toggleDialog()}>Reject</Button>
                        </div>
                    }
                    <div>
                        <div className="row" style={{ marginTop: '25px' }}>
                            <div className="col-sm-6" style={{ border: 'solid 1px #ddd' }}>
                                <div className='box-conversion-container'>
                                    <div className={'box-conversion-row'} style={{ height: '105px' }}>
                                        <div className='box-conversion-item'>
                                            <span className='box-conversion-data'>{_get(purchaseOrderById, 'order.store.name')}</span>
                                            <span className='box-conversion-title'>Store Name</span>
                                        </div>
                                        <div className='box-conversion-item'>
                                            <span className='box-conversion-data'>{`${_get(purchaseOrderById, 'order.store.address.addressLine1')} ${_get(purchaseOrderById, 'order.store.address.addressLine2')} ${_get(purchaseOrderById, 'order.store.address.city')} ${_get(purchaseOrderById, 'order.store.address.state')} ${_get(purchaseOrderById, 'order.store.address.country')}`}</span>
                                            <span className='box-conversion-title'>Store Address</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6" style={{ border: 'solid 1px #ddd' }}>
                                <div className='box-conversion-container'>
                                    <div className={'box-conversion-row'} style={{ height: '105px' }}>
                                        <div className='box-conversion-item'>
                                            <span className='box-conversion-data'>{_get(purchaseOrderById, 'order.vendor.name')}</span>
                                            <span className='box-conversion-title'>Vendor Name</span>
                                        </div>
                                        <div className='box-conversion-item'>
                                            <span className='box-conversion-data'>{_get(purchaseOrderById, 'order.vendor.email')}</span>
                                            <span className='box-conversion-title'>Vendor Email</span>
                                        </div>
                                        <div className='box-conversion-item'>
                                            <span className='box-conversion-data'>{_get(purchaseOrderById, 'order.vendor.phoneNumber.phoneNumber')}</span>
                                            <span className='box-conversion-title'>Vendor Phone Number</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {this.populateRequisitions()}
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>
        )

    }

}
const mapStateToProps = state => {

    let { purchaseOrdersReducer, vendorsReducer, storesReducer } = state
    let { requisitionListData } = vendorsReducer || [];

    let { type } = purchaseOrdersReducer || {};
    let { purchaseOrderById } = purchaseOrdersReducer || [];
    let { isFetching, isPOViewFlag } = purchaseOrdersReducer || false;
    let { storeData } = storesReducer || [];
    let storeList = [];
    let { vendorData } = vendorsReducer || [];
    let vendorList = [];
    _isArray(storeData) && !_isEmpty(storeData) && storeData.map((data, index) => {
        storeList.push(
            {
                value: data.id,
                label: data.name,
            }
        )
    })
    !_isEmpty(vendorData) && _get(vendorsReducer, 'vendorData', []).map((data, index) => {
        vendorList.push(
            {
                value: data.id,
                label: data.name,
            }
        )
    })
    return {
        purchaseOrderById,
        isFetching,
        type,
        requisitionListData,
        storeList,
        vendorList,
        isPOViewFlag
    }
}

export default connect(mapStateToProps)(withStyles(styles)(ReviewPurchaseOrderContainer));
