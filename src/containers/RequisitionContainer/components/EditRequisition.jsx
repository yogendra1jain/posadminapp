import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
import _set from 'lodash/set';

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

class EditRequisition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }
    
    populateRequisitionList = () => {
        let rows = []
        this.props.fields.map((member, index) => {
            rows.push(
                <div className='box-conversion-row'>
                    <div className='box-conversion-item'>
                        <span className='box-conversion-data'>
                            <Field
                                name={`${member}.vendorId`}
                                options={_get(this.props, 'vendorList', [])}
                                disabled={true}
                                component={ReactSelectWrapper}
                            />
                        </span>
                        <span className='box-conversion-title'>Vendor</span>
                    </div>
                    <div className='box-conversion-item'>
                        <span className='box-conversion-data'>
                            <Field
                                name={`${member}.posProductId`}
                                options={_get(this.props, 'retailerProducts', [])}
                                component={ReactSelectWrapper}
                                disabled={true}
                            />
                        </span>
                        <span className='box-conversion-title'>POS Product</span>
                    </div>
                    <div className='box-conversion-item'>
                        <span className='box-conversion-data'>
                            <Field
                                name={`${member}.storeId`}
                                options={_get(this.props, 'storeList', [])}
                                component={ReactSelectWrapper}
                                disabled={true}
                            />
                        </span>
                        <span className='box-conversion-title'>Store</span>
                    </div>
                    <div className='box-conversion-item'>
                        <span className='box-conversion-data'>
                            <Field
                                name={`${member}.vendorProductId`}
                                options={_get(this.props, 'vendorProductsList', [])}
                                component={ReactSelectWrapper}
                                disabled={true}
                            />
                        </span>
                        <span className='box-conversion-title'>Vendor Product</span>
                    </div>
                    <div className='box-conversion-item'>
                        <span className='box-conversion-data'>
                            <Field
                                name={`${member}.quantity`}
                                component={TextFieldInput}
                                type={"number"}
                                parse={value => parseInt(value, 10)}
                                disabled={false}
                            />
                        </span>
                        <span className='box-conversion-title'>Quantity</span>
                    </div>
                    <div className='box-conversion-item'>
                        <span className='box-conversion-data'>
                            <Field
                                name={`${member}.status`}
                                component={TextFieldInput}
                                disabled={true}
                            />
                        </span>
                        <span className='box-conversion-title'>Status</span>
                    </div>
                    <DeleteIcon className={this.props.classes.icon} onClick={() => { }} />
                </div>
            )
        })
        return <div className='box-conversion-container width-100-percent'>{rows}</div>
    }

    addNewRequisition = () => {
        this.setState({
            openAddDialog: true,
        });
    }
    toggleAddDialog = () => {
        this.setState({
            openAddDialog: !this.state.openAddDialog,
        });
    }
    handleSubmitHandler = (values, selProd) => {
        let data = { ...values };
        data.posProductId = selProd.posProductId;
        // data.storeId = selProd.storeId;
        data.vendorId = selProd.vendorId;
        data.retailerId = selProd.retailerId;
        _set(data, 'createdTime.seconds', new Date().getTime());
        console.log('values to create new requisition', data);

        let url = `/Requisition/Save`
        this.props.dispatch(saveRequisitionForm('', url, data))
            .then((data) => {
                console.log('requisition is saved successfully.');
                this.props.fetchBasicDetails();
                this.props.toggleEditState();
            }, (err) => {
                console.log('err while saving requisition form', err);
                this.props.dispatch(showMessage({ text: `${JSON.stringify(err)}`, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 5000);
            })
    }

    render() {
        const { classes, fields } = this.props;
        const { onEditClick, openAddDialog } = this.state
        return (
            <div className='edit-conversion-container'>
                <FormDialog
                    open={openAddDialog}
                    handleClose={this.toggleAddDialog}
                    title={'Add New'}
                    fullScreen={false}
                    fullWidth={true}
                    dialogContent={
                        <AddRequisitionForm
                            storeList={this.props.storeList}
                            handleSubmitHandler={this.handleSubmitHandler}
                            classes={classes}
                        />
                    }
                />

                <Button
                    variant="outlined"
                    onClick={() => this.addNewRequisition()}
                    color="primary"
                    className={classes.button}>+ New Requisition</Button>
                {this.populateRequisitionList()}
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