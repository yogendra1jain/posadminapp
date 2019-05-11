import React from 'react';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import TextField from '@material-ui/core/TextField';
import { reduxForm, Field } from 'redux-form';
import _get from 'lodash/get';

import _isArray from 'lodash/isArray';
import _uniq from 'lodash/uniq';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
import _set from 'lodash/set';
// import LoginView from './Login';
// import asyncValidate from './validate.js';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { fetchStore } from '../../../actions/store';

import { ReactSelectWrapper, TextFieldInput } from '../../../components/common/MaterialUiComponents';
import { fetchVendorProducts, fetchProductsFromCache, updateVendorProductsList, updateVendorsList } from '../../../actions/products';
import { getVendorData } from '../../../actions/vendor';
import { showMessage } from '../../../actions/common';
import DineroInit from '../../../Global/Components/DineroInit';

class AddRequisitionForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selProd: {},
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
        const { dispatch, storesReducer } = this.props;
        let reqBody = {
            id: localStorage.getItem('retailerID')
        }
        let storeUrl = '/Store/ByRetailerId'
        dispatch(fetchStore(storesReducer, storeUrl, reqBody));

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
    handleChange = (value) => {

        let selProduct = _find(this.props.vendorProductsData, { 'id': value });
        this.setState({
            selProd: selProduct,
        });
        this.props.autofill('quantity', selProduct.defaultOrderQty);
    }
    submitRequisition = (values) => {
        const { selProd } = this.state;
        let data = { ...values };
        data.posProductId = selProd.posProductId;
        data.vendorId = selProd.vendorId;
        data.retailerId = selProd.retailerId;
        _set(data, 'createdTime.seconds', new Date().getTime());
        let url = `/Requisition/Save`;
        this.props.handleSubmitHandler(data, url);
    }

    render() {
        const { handleSubmit, classes, initialValues } = this.props;
        const { selProd } = this.state;

        return (
            <div className="row mt-21" style={{ height: '250px' }}>
                <div className="col-sm-12">

                    <div className="signinForm">
                        <form onSubmit={handleSubmit(this.submitRequisition)}>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label>Vendor Product</label>
                                    <Field
                                        name={`vendorProductId`}
                                        options={_get(this.props, 'vendorProductsList', [])}
                                        disabled={false}
                                        onChange={(e) => this.handleChange(e)}
                                        component={ReactSelectWrapper}
                                    />
                                </div>
                                <div className="col-sm-4">
                                    <label>Store</label>
                                    <Field
                                        name={`storeId`}
                                        options={_get(this.props, 'storeList', [])}
                                        disabled={false}
                                        component={ReactSelectWrapper}
                                    />
                                </div>
                                <div className="col-sm-4">
                                    <label>Quantity</label>
                                    <Field
                                        name={`quantity`}
                                        disabled={false}
                                        component={TextFieldInput}
                                        type={"number"}
                                        parse={value => parseInt(value, 10)}
                                    /></div>
                            </div>
                            {/* <div className='box-conversion-row'> 
                                <div className='box-conversion-item'>
                                    <span className='box-conversion-data' style={{ width: '100px' }}>
                                        <span className='box-conversion-title'></span>

                                    </span>

                                </div>
                                <div className='box-conversion-item'>
                                    <span className='box-conversion-data' style={{ width: '100px' }}>

                                    </span>
                                    <span className='box-conversion-title'>Store</span>
                                </div>
                                <div className='box-conversion-item'>
                                    <span className='box-conversion-data'>

                                    </span>
                                    <span className='box-conversion-title'>Quantity</span>
                                </div>
                            </div>
                            */}
                            <div className='box-conversion-container mt-21'>
                                <div className='box-conversion-row'>
                                    <div className='box-conversion-item'>
                                        <span className='box-conversion-data'>{selProd.productName}</span>
                                        <label>POS Product</label>
                                    </div>
                                    <div className='box-conversion-item'>
                                        <span className='box-conversion-data'>{selProd.vendorName}</span>
                                        <label>Vendor</label>
                                    </div>
                                    <div className='box-conversion-item'>
                                        <span className='box-conversion-data'>{selProd.sku}</span>
                                        <label>SKU</label>
                                    </div>
                                    <div className='box-conversion-item'>
                                        <span className='box-conversion-data'>{selProd.defaultOrderQty}</span>
                                        <label>Default Order Qty</label>
                                    </div>
                                    <div className='box-conversion-item'>
                                        <span className='box-conversion-data'>{DineroInit(_get(selProd, 'price.amount', '')).toFormat('$0,0.00')}</span>
                                        <label>Price</label>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-parent-full mt-21">
                                <Button className="btn-info" type='submit'>{'Save'}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

AddRequisitionForm = reduxForm(
    {
        form: 'AddRequisitionForm',
        enableReinitialize: true,
        destroyOnUnmount: true,
        // asyncValidate
    }
)(AddRequisitionForm)

function mapStateToProps(state) {

    let { productsReducer, storesReducer } = state

    let { vendorProductsData } = productsReducer || [];
    let vendorProductsList = [];
    let { storeData } = storesReducer || [];
    let storeList = [];

    !_isEmpty(vendorProductsData) && _isArray(vendorProductsData) && vendorProductsData.map((data, index) => {
        vendorProductsList.push(
            {
                value: data.id,
                label: data.productName,
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

    return {
        vendorProductsList,
        vendorProductsData,
        storeList
    }
}

export default connect(mapStateToProps)(AddRequisitionForm)
