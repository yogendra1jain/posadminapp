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
        let data = {...values};
        
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
                this.props.history.push('/vendorproducts')
        }, (err) => {
            console.log('err while saving vendor product', err);
        })

    }

    render() {
        const { handleSubmit } = this.props
        return (
            <div className="d-flex">
                <form onSubmit={handleSubmit(this.addVendorProduct)}>
                    <AddEditVendorProductComp
                        {...this.props}
                    />
                    <div className="row" style={{marginTop: '10px', marginLeft: '10px'}}>
                        <Button type="submit" variant="raised">SAVE</Button>
                    </div>
                </form>
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
        initialValues = {...selectedVendorProduct}
    }

    return {
        initialValues,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(AddEditVendorProduct))