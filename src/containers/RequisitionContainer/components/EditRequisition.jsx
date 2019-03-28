import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
import _set from 'lodash/set';

import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';

import _isArray from 'lodash/isArray';
import _uniq from 'lodash/uniq';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
/* Material import */
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
/* Redux Imports */
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import FormDialog from '../../../components/common/CommonDialog/index.js';
import AddRequisitionForm from './AddRequisitionComp.jsx';
import { saveRequisitionForm } from '../../../actions/vendor';
import { showMessage } from '../../../actions/common';
import { TextFieldInput, ReactSelectWrapper } from '../../../components/common/MaterialUiComponents';
import { fetchVendorProducts, fetchRetailerProducts, fetchProductsFromCache, updateVendorProductsList, updateVendorsList } from '../../../actions/products';
import { getVendorData } from '../../../actions/vendor';
import { fetchStore } from '../../../actions/store';
import CircularProgress from '@material-ui/core/CircularProgress';
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

const options = {
    paginationPosition: 'top',
    defaultSortName: 'posProductId',
    defaultSortOrder: 'asc',
    clearSearch: true,
    withFirstAndLast: true,
    sizePerPageList: [{
        text: '5', value: 5
    }, {
        text: '10', value: 10
    }],
};
class EditRequisition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cachedProducts: [],
            cachedVendors: [],
            isLoading: false
        }
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

    productColumn = (cell, row) => {
        return (
            <div>
                <span>{this.mapProductName(row.posProductId)}</span>
            </div>
        )
    }
    vendorColumn = (cell, row) => {
        return (
            <div>
                <span>{this.mapVendorName(row.vendorId)}</span>
            </div>
        )
    }
    storeColumn = (cell, row) => {
        return (
            <div>
                <span>{this.mapStoreName(row.storeId)}</span>
            </div>
        )
    }
    statusColumn = (cell, row) => {
        return (
            <div>
                <span>{this.getRequisitionStatus(row.status)}</span>
            </div>
        )
    }

    populateRequisitions = () => {
        let rows = []
        _get(this, 'props.requisitions', []).map((data, index) => {
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
                    {
                        this.props.showReceievedQuantity ?
                            <div className='box-conversion-item'>
                                <span className='box-conversion-data'>{data.quantity}</span>
                                <span className='box-conversion-title'>{'Ordered Quantity'}</span>
                            </div>
                            : <div className='box-conversion-item'>
                                <span className='box-conversion-data'>{data.proposedQuantity ? data.proposedQuantity : data.quantity}</span>
                                <span className='box-conversion-title'>{'Proposed Quantity'}</span>
                            </div>

                    }
                    {
                        !this.props.isPrinting ? 
                        this.props.showReceievedQuantity ?
                            <div className='box-conversion-item'>
                                <input style={{ width: '100px' }} className='box-conversion-data' disabled={this.props.isPOViewFlag} onChange={(e) => this.props.handleChangeInput(e, index, data.quantity)} value={data.fulfilledQuantity ? data.fulfilledQuantity: data.quantity} />
                                <span className='box-conversion-title'>{'Received Quantity'}</span>
                            </div>
                            : <div className='box-conversion-item'>
                                <input style={{ width: '100px' }} className='box-conversion-data' disabled={this.props.isPOViewFlag} onChange={(e) => this.props.handleChangeInput(e, index, data.proposedQuantity ? data.proposedQuantity : data.quantity)} value={data.quantity} />
                                <span className='box-conversion-title'>{'Quantity'}</span>
                            </div>
                        : ''
                    }
                    <div className='box-conversion-item'>
                        <span className='box-conversion-data'>{this.getRequisitionStatus(data.status)}</span>
                        <span className='box-conversion-title'>Status</span>
                    </div>
                    {
                        !this.props.isPOViewFlag &&
                        // !this.props.isPrinting ? 
                        <div>
                            <SaveButton Class_Name="btn-info" buttonDisplayText={'Save'} handlerSearch={() => this.props.handleSubmitHandler(index)}/>
                        </div> 
                    }
                </div>
            )
        })

        return (
            <div className='white-box-container'>
                <div className='white-box-header'>
                    <h2 className='white-box-title'>Requisition List</h2>
                </div>
                <div className="white-box-body">
                    {rows}
                </div>
            </div>
        )
    }

    render() {
        const { classes, fields, forEdit } = this.props;
        const { onEditClick, openAddDialog } = this.state
        console.log(this.props.requisitionListData, 'requisitionListData')
        let table

        if(!this.state.isLoading) {
            table = <BootstrapTable
            data={_get(this.props, 'requisitionListData', [])}
            options={options}
            selectRow={this.props.selectRowProp}
            striped hover
            pagination={true}
            exportCSV={true}
            search={true}
            searchPlaceholder={'Search PO'}>

            <TableHeaderColumn width='100' dataField='id' isKey={true} hidden={true}>Id</TableHeaderColumn>
            <TableHeaderColumn width='100' dataField='posProductId' dataFormat={this.productColumn} >Product</TableHeaderColumn>
            <TableHeaderColumn width='100' dataField='vendorId' dataFormat={this.vendorColumn}>Vendor</TableHeaderColumn>
            <TableHeaderColumn width='100' dataField='storeId' dataFormat={this.storeColumn}>Store</TableHeaderColumn>
            <TableHeaderColumn width='100' dataField='quantity' >Quantity</TableHeaderColumn>
            <TableHeaderColumn width='100' dataField='status' dataFormat={this.statusColumn} dataSort>Status</TableHeaderColumn>
            {/* <TableHeaderColumn width='100' dataField='' dataFormat={this.props.actionColumn} dataSort>Actions</TableHeaderColumn> */}
        </BootstrapTable>
        } else {
            return (<div className='loader-wrapper-main' style={{marginTop: '40px', marginLeft: "20px"}}>
            <div className="spinner">
                <div className="rect1"></div>
                <div className="rect2"></div>
                <div className="rect3"></div>
                <div className="rect4"></div>
                <div className="rect5"></div>
            </div>
        </div>)
        }

        if (forEdit) {
            return (
                <div className="row m0">
                    {
                        this.props.handleCancel &&
                        <div className="form-btn-group">
                            <SaveButton disabled={this.state.selectedRows.length < 1} Class_Name="btn-info" buttonDisplayText={'Save All'} handlerSearch={() => this.props.handleSubmitHandler('', true)} />

                            <SaveButton disabled={this.state.selectedRows.length < 1} Class_Name="m-r-10" buttonDisplayText={'Cancel'} handlerSearch={() => this.props.handleCancel()} />

                            
                        </div>
                    }

                    {this.populateRequisitions()}
                </div>
            );
        } else {
            return table
        }
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
    let { retailerProductsData, selectedVendorProduct } = productsReducer || [];
    !_isEmpty(vendorData) && _get(vendorsReducer, 'vendorData', []).map((data, index) => {
        vendorList.push(
            {
                value: data.id,
                label: data.name,
            }
        )
    })
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