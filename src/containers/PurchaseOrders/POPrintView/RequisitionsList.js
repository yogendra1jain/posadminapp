import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
import _set from 'lodash/set';

import _isArray from 'lodash/isArray';
import _uniq from 'lodash/uniq';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
/* Material import */
import { withStyles } from '@material-ui/core/styles';
/* Redux Imports */
import { connect } from 'react-redux';
import { showMessage } from '../../../actions/common';
import { fetchVendorProducts, fetchRetailerProducts, fetchProductsFromCache, updateVendorProductsList, updateVendorsList } from '../../../actions/products';
import { getVendorData } from '../../../actions/vendor';
import { fetchStore } from '../../../actions/store';
/* Component Imports */
import SaveButton from '../../../components/common/SaveButton';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: 32,
    },
});

class EditRequisition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cachedProducts: [],
            cachedVendors: [],
            isLoading: false
        }
        this.requisitionList = []
    }

    componentDidMount() {
        // this.fetchBasicDetails();
        this.setState({ isLoading: true})
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
                    isLoading: false
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

    populateRequisitions = () => {
        let rows = []
        _get(this, 'props.requisitions', []).map((data) => {
            rows.push(
                <tr>
                    <td>{this.mapProductName(data.posProductId)}</td>
                    <td>{this.mapVendorName(data.vendorId)}</td>
                    <td>{this.mapStoreName(data.storeId)}</td>
                    {
                        this.props.showReceievedQuantity ?
                            <td>{data.quantity}</td> :
                            <td>{data.proposedQuantity ? data.proposedQuantity : data.quantity}</td>
                    }
                    
                    <td>{this.getRequisitionStatus(data.status)}</td>
                </tr>
                // <div className={'box-conversion-row'} style={{ border: 'solid 1px #ddd' }}>
                //     <div className='box-conversion-item'>
                //         <span className='box-conversion-data'>{this.mapProductName(data.posProductId)}</span>
                //         <span className='box-conversion-title'>POS Product</span>
                //     </div>
                //     <div className='box-conversion-item'>
                //         <span className='box-conversion-data'></span>
                //         <span className='box-conversion-title'>Vendor Id</span>
                //     </div>
                //     <div className='box-conversion-item'>
                //         <span className='box-conversion-data'>{this.mapStoreName(data.storeId)}</span>
                //         <span className='box-conversion-title'>Store Id</span>
                //     </div>
                //     {/* <div className='box-conversion-item'>
                //         <span className='box-conversion-data'>{data.vendorProductId}</span>
                //         <span className='box-conversion-title'>Vendor Product</span>
                //     </div> */}
                //     {
                //         this.props.showReceievedQuantity ?
                //             <div className='box-conversion-item'>
                //                 <span className='box-conversion-data'>{data.quantity}</span>
                //                 <span className='box-conversion-title'>{'Ordered Quantity'}</span>
                //             </div>
                //             : <div className='box-conversion-item'>
                //                 <span className='box-conversion-data'>{data.proposedQuantity ? data.proposedQuantity : data.quantity}</span>
                //                 <span className='box-conversion-title'>{'Proposed Quantity'}</span>
                //             </div>

                //     }
                    
                //     <div className='box-conversion-item'>
                //         <span className='box-conversion-data'>{this.getRequisitionStatus(data.status)}</span>
                //         <span className='box-conversion-title'>Status</span>
                //     </div>
                // </div>
            )
        })
        
        return (
            <div>                
                <h2 className='po-print-subtitle'>Requisition List</h2>
                
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>POS Product</th>
                                <th>Vendor ID</th>
                                <th>Store ID</th>
                                <th>Product Quantity</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    render() {
            return (
                <div className="row m0">
                    {this.populateRequisitions()}
                </div>
            );
    } 
}

const mapStateToProps = state => {
    let { productsReducer, storesReducer, vendorsReducer } = state
    let { vendorProductsData } = productsReducer || [];
    let vendorProductsList = [];
    let { storeData } = storesReducer || [];
    let storeList = [];

    let vendorList = [];
    let retailerProducts = [];
    let { vendorData } = vendorsReducer || [];
    let { retailerProductsData } = productsReducer || [];
    if(Array.isArray(vendorData)) {
        if(!_isEmpty(vendorData)) {
            vendorData.map((data, index) => {
                vendorList.push(
                    {
                        value: data.id,
                        label: data.name,
                    }
                )
        })
    }
    }
    !_isEmpty(retailerProductsData) && _get(productsReducer, 'retailerProductsData', []).map((data, index) => {
        retailerProducts.push(
            {
                value: data.id,
                label: data.name,
            }
        )
    })
    !_isEmpty(storeData) && _isArray(storeData) && storeData.map((data, index) => {
        storeList.push(
            {
                value: data.id,
                label: data.name,
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
    return {
        vendorList,
        vendorProductsList,
        storeList,
        retailerProducts,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(EditRequisition))