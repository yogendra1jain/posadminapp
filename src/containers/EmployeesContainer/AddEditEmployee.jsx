import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEmpty from 'lodash/isEmpty';
import _isArray from 'lodash/isArray';
import _find from 'lodash/find';
/* Material import */
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

/* Redux Imports */
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { showMessage } from '../../actions/common';
import { saveNewEmployee } from '../../actions/employees';
import AddEditComp from './components/AddEditComp.jsx';

/* Component Imports */
import SaveButton from '../../components/common/SaveButton.jsx'

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

class AddEditEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    saveEmployee = (values) => {
        let saveUrl = `/Customer/Create`;
        if (values.id) {
            saveUrl = `/Customer/Update`;
        }
        let data = { ...values };
        _set(data, 'retailerId', localStorage.getItem('retailerID'));
        let store = _find(_get(this.props, 'storeList', []), { 'value': data.employeeStoreId });
        _set(data, 'billingAddress', _get(store, 'address', {}));
        _set(data, 'employee', true);
        _set(data, 'employeePurchaseLimit', {
            currencyCode: '$',
            amount: parseInt(values.amount)
        });
        if(localStorage.getItem('role') == 2) {
            _set(data,'employeeStoreId',localStorage.getItem('storeID'))
        }
        let limitRenewalDates = _get(values, 'limitRenewalDates', '').split(',').map(item => {
            return parseInt(item);
        })
        _set(data, 'limitRenewalDates', limitRenewalDates);

        if (data.amount)
            delete data.amount;

        console.log('values to save for employee', data);
        this.props.dispatch(saveNewEmployee('', saveUrl, data))
            .then((data) => {
                this.props.dispatch(showMessage({ text: `Saved succeffully.`, isSuccess: true }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 1000);
                this.props.history.push('/employees');
            }, (err) => {
                console.log('err while saving vendor product', err);
                this.props.dispatch(showMessage({ text: `${JSON.stringify(err)}`, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 5000);
            })

    }

    handleCancel = () => {
        this.props.history.push('/employees')
    }

    render() {
        const { handleSubmit, initialValues } = this.props;

        return (

            <div className="">
                <div className='panel-container'>
                    <span className='panel-heading'>{_get(initialValues, 'id') ? 'Update' : 'New'} Employee </span>
                </div>
                <div className='box-conversion-container'>
                    <form onSubmit={handleSubmit(this.saveEmployee)}>
                        <div className="form-btn-group">
                            <Button type="button" variant="raised" onClick={this.handleCancel} style={{marginRight: "10px   "}} className="btn-info">CANCEL</Button>
                            <Button type="submit" variant="raised" className="btn-info">SAVE</Button>

                        </div>
                        <div className='box-conversion-container'>
                            <AddEditComp
                                initialValues={initialValues}
                            />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


AddEditEmployee = reduxForm({
    form: 'AddEditEmployee',
    enableReinitialize: true,
    // asyncValidate,
})(AddEditEmployee)

const mapStateToProps = state => {
    let { employeesReducer, storesReducer } = state;

    let { storeData } = storesReducer || [];
    let { employeeById } = employeesReducer || {};

    let storeList = [];
    let initialValues = employeeById;
    _isArray(storeData) && !_isEmpty(storeData) && storeData.map((data, index) => {
        storeList.push(
            {
                value: data.id,
                label: data.name,
                address: data.address,
            }
        )
    })


    return {
        initialValues,
        storeList
    }
}

export default connect(mapStateToProps)(withStyles(styles)(AddEditEmployee))