import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
/* Material import */
import Button from '@material-ui/core/Button';
import _isEmpty from 'lodash/isEmpty';
import { withStyles } from '@material-ui/core/styles';
/* Redux Imports */
import { connect } from 'react-redux';
import { Field, FormSection } from 'redux-form';
import { getVendorData } from '../../../actions/vendor';
import { showMessage } from '../../../actions/common';
import { fetchRetailerProducts, fetchExistingPOSProductsForVendor } from '../../../actions/products';
import { TextFieldInput, ReactSelectWrapper } from '../../../components/common/MaterialUiComponents';
import Alert from 'react-s-alert';
import FormControl from 'material-ui/Form/FormControl';

import {clearSelectedProduct} from '../../../actions/products'; 
/* Component Imports */

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

const CurrencyData = [
    {
        label: 'USD',
        value: 'USD',
    }
]

class AddEditVendorProductComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        let posProductUrl = `/Product/ByRetailerId`;
        let data = {
            id: localStorage.getItem('retailerID'),
        };
        let url = `/Vendor/ByRetailerId`;
        this.props.dispatch(getVendorData('', url, data))
        this.props.dispatch(fetchRetailerProducts('', posProductUrl, data))
            .then((Data) => {
                console.log('retailer products retrieved successfully.');
            }, (err) => {
                console.log('err while fetching retailer products.', err);
                this.props.dispatch(showMessage({ text: `${JSON.stringify(err)}`, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 1000);
            })
    }

    componentWillUnmount() {
        this.props.dispatch(clearSelectedProduct('CLEAR_SELECTED_PRODUCT'))
    }

    handleBlur = () => {
        let formValue = _get(this.props, 'AddEditVendorProduct');
        console.log('form values', formValue);
        let data = {
            vendorId: _get(formValue, 'values.vendorId', ''),
            posProductId: _get(formValue, 'values.posProductId', ''),
        };
        let url = `/VendorProduct/CheckDuplicate`;
        if (_get(data, 'vendorId') && _get(data, 'posProductId')) {
            this.props.dispatch(fetchExistingPOSProductsForVendor('', url, data))
                .then((data) => {
                    console.log('fetched data for POS products', data);
                    if (!data.passed) {
                        this.props.dispatch(showMessage({ text: `This combination is already present.`, isSuccess: false }));
                        setTimeout(() => {
                            this.props.dispatch(showMessage({}));
                        }, 1000);
                        this.props.autofill('posProductId', '');
                    }
                }, (err) => {
                    console.log('error while fetching vendor POS Product', err);
                })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className='row mt-21'>
                    <div className="col-sm-4">
                        <label style={{ fontSize: "14px", marginTop: '5px' }}>vendor</label>
                        <Field name={`vendorId`} placeholder="vendor" id={`vendorId`} hideLabel={true} options={_get(this.props, 'vendorList', [])} label={'Vendor *'} onBlur={this.handleBlur} component={ReactSelectWrapper} />
                    </div>
                    <div className="col-sm-4">
                        <label style={{ fontSize: "14px", marginTop: '5px' }}>POS Product</label>
                        <Field name={`posProductId`} placeholder="POS Product" id={`posProductId`} hideLabel={true} options={_get(this.props, 'retailerProducts', [])} onBlur={this.handleBlur} label={'POS Product *'} component={ReactSelectWrapper} />
                    </div>
                </div>

                <div className='row mt-21'>
                    <div className="col-sm-4">
                        <Field name={`sku`} placeholder="SKU" id={`sku`} hideLabel={true} label={'SKU *'} component={TextFieldInput} />
                    </div>
                    <div className="col-sm-4">
                        <Field name={`defaultOrderQty`} type="number" parse={value => parseInt(value, 10)} placeholder="Default Order Qty" id={`defaultOrderQty`} hideLabel={true} label={'Default Order Qty *'} component={TextFieldInput} />
                    </div>
                    <div className="col-sm-4">
                        <Field name={`conversionFactor`} type="number" parse={value => parseInt(value, 10)} placeholder="Conversion Factor" id={`conversionFactor`} hideLabel={true} label={'Conversion Factor *'} component={TextFieldInput} />
                    </div>
                </div>

                <FormSection name={`price`}>
                    <div className="row mt-21">
                        <div className="col-sm-4">
                            <label style={{ fontSize: "14px", marginTop: '5px' }}>Currency</label>
                            <Field name={`currencyCode`} id={`currencyCode`} placeholder="Currency" hideLabel={true} label='Currency *' options={CurrencyData} component={ReactSelectWrapper} />
                        </div>
                        <div className="col-sm-4">
                            <Field name={`price`} id={`price`} type={"number"} parse={value => parseInt(value, 10)} placeholder="Amount" hideLabel={true} label='Amount *' component={TextFieldInput} />
                        </div>
                    </div>
                </FormSection>

            </React.Fragment>
        );
    }
}


const mapStateToProps = state => {
    let { productsReducer, vendorsReducer, form } = state

    let vendorList = [];
    let retailerProducts = [];
    let { vendorData } = vendorsReducer || [];
    let { AddEditVendorProduct } = form || {};
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
    return {
        vendorList,
        retailerProducts,
        AddEditVendorProduct,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(AddEditVendorProductComp))