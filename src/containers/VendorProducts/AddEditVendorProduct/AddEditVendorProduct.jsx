import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEmpty from 'lodash/isEmpty';
/* Material import */
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

/* Redux Imports */
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import asyncValidate from './validate';
import { vendorProductSave } from '../../../actions/products';
import { showMessage } from '../../../actions/common';
import AddEditVendorProductComp from '../components/AddEditVendorProductComp.jsx';
import SaveButton from '../../../components/common/SaveButton'

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

class AddEditVendorProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    addVendorProduct = (values) => {
        let saveUrl = `/VendorProduct/Save`;
        let data = { ...values };

        _set(data, 'price.price', Number(_get(data, 'price.price')));
        _set(data, 'defaultOrderQty', Number(_get(data, 'defaultOrderQty')));
        _set(data, 'conversionFactor', Number(_get(data, 'conversionFactor')));
        _set(data, 'retailerId', localStorage.getItem('retailerID'));

        this.props.dispatch(vendorProductSave('', saveUrl, data))
            .then((data) => {
                this.props.dispatch(showMessage({ text: `Saved succeffully.`, isSuccess: true }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 1000);
                this.handleCancel()
            }, (err) => {
                console.log('err while saving vendor product', err);
                this.props.dispatch(showMessage({ text: `${JSON.stringify(err)}`, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 5000);
            })

    }

    handleCancel = () => {
        this.props.history.push({
            pathname: '/vendorproducts',
            state: {id: _get(this.props,'history.location.state.id','')}
        })
    }

    render() {
        const { handleSubmit, initialValues } = this.props
        return (

            <div className="d-flex">
                <div className='panel-container'>
                    <span className='panel-heading'>{initialValues.id ? 'Update' : 'New'} Vendor Product </span>
                </div>
                <div className='box-conversion-container' style={{ width: '100%' }}>
                    <form onSubmit={handleSubmit(this.addVendorProduct)}>
                        <AddEditVendorProductComp
                            {...this.props}
                        />
                        <div className="row mt-21">  
                            <div className="col-sm-12">
                                <Button type="submit" style={{marginRight: "20px"}} className="btn-info">Save</Button>
                                <SaveButton buttonDisplayText={'Cancel'} Class_Name={""} handlerSearch={this.handleCancel} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


AddEditVendorProduct = reduxForm({
    form: 'AddEditVendorProduct',
    enableReinitialize: true,
    asyncValidate,
})(AddEditVendorProduct)

const mapStateToProps = state => {
    let { productsReducer } = state;
    let { selectedVendorProduct } = productsReducer || [];

    let initialValues = {}
    if (!_isEmpty(selectedVendorProduct)) {
        initialValues = { ...selectedVendorProduct }
    }

    return {
        initialValues,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(AddEditVendorProduct))