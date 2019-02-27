import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
/* Material import */
import Button from '@material-ui/core/Button';
import _isEmpty from 'lodash/isEmpty';
import { withStyles } from '@material-ui/core/styles';
import _isArray from 'lodash/isArray';
/* Redux Imports */
import { connect } from 'react-redux';
import { Field, FormSection } from 'redux-form';
import { showMessage } from '../../../actions/common';
import { TextFieldInput, ReactSelectWrapper } from '../../../components/common/MaterialUiComponents';
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

const CurrencyData = [
    {
        label: 'USD',
        value: 'USD',
    }
]

const ActiveFlags = [
    {
        label: 'Yes',
        value: true,
    },
    {
        label: 'No',
        value: false,
    },
]

class AddEditComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        let reqObj = {
            id: localStorage.getItem('retailerID'),
        }
        let storeUrl = '/Store/ByRetailerId';
        const { dispatch, storesReducer } = this.props;
        dispatch(fetchStore(storesReducer, storeUrl, reqObj));
    }

    // handleBlur = (e) => {
    //     let value = e.value;
    //     this.setState({
    //         selectedStore: value,
    //     });
    // }

    render() {
        const { classes, initialValues } = this.props;
        return (
            <div className='row' style={{ marginTop: '25px' }}>
                <div className="col-sm-12" style={{ marginLeft: 0 }}>
                    <div className="col-sm-4" style={{ marginTop: '-25px' }}>
                        <Field name={`employeeStoreId`} placeholder="store" id={`employeeStoreId`} hideLabel={false} options={_get(this.props, 'storeList', [])} label={'Store *'} component={ReactSelectWrapper} />
                    </div>
                    <div className="col-sm-4" style={{ marginTop: '-25px' }}>
                        <Field name={`isEmpPayEnabled`} placeholder="Employee Pay Enabled" id={`isEmpPayEnabled`} hideLabel={false} options={ActiveFlags} label={'Employee Pay Enabled *'} component={ReactSelectWrapper} />
                    </div>
                    <div className="col-sm-4" style={{ marginTop: '-25px' }}>
                        <Field name={`active`} placeholder="Active" id={`active`} hideLabel={false} options={ActiveFlags} label={'Active *'} component={ReactSelectWrapper} />
                    </div>
                </div>
                <div className="col-sm-12" style={{ marginLeft: 0, marginTop: '10px' }}>

                    <div className="col-sm-6" >
                        <Field name={`email`} placeholder="email" id={`email`} hideLabel={false} label={'email *'} component={TextFieldInput} />
                    </div>
                    <div className="col-sm-6">
                        <Field name={`employeeDiscount`} placeholder="Discount" type="number" parse={value => parseFloat(value, 10)} id={`employeeDiscount`} hideLabel={false} label={'Discount *'} component={TextFieldInput} />
                    </div>
                    <div className="col-sm-6">
                        <Field name={`employeeId`} placeholder="Employee Id" id={`employeeId`} hideLabel={false} label={'Employee Id *'} component={TextFieldInput} />
                    </div>

                </div>
                <FormSection name={`phoneNumber`}>
                    <div className="col-sm-12" style={{ marginLeft: 0, marginTop: '10px' }}>

                        <div className="col-sm-6">
                            <Field name={`countryCode`} type="number" parse={value => parseInt(value, 10)} placeholder="Country Code" id={`countryCode`} hideLabel={false} label={'countryCode *'} component={TextFieldInput} />
                        </div>
                        <div className="col-sm-6">
                            <Field name={`phoneNumber`} type="number" parse={value => parseInt(value, 10)} placeholder="Phone Number" id={`phoneNumber`} hideLabel={false} label={'phoneNumber *'} component={TextFieldInput} />
                        </div>

                    </div>
                </FormSection>
                <FormSection name={`customer`}>
                    <div className="col-sm-12" style={{ marginLeft: 0, marginTop: '10px' }}>

                        <div className="col-sm-6" >
                            <Field name={`firstName`} id={`firstName`} placeholder="firstName" hideLabel={false} label='First Name *' component={TextFieldInput} />
                        </div>
                        <div className="col-sm-6">
                            <Field name={`lastName`} id={`lastName`} type={"text"} placeholder="Last Name" hideLabel={false} label='lastName *' component={TextFieldInput} />
                        </div>

                    </div>
                </FormSection>
            </div>
        );
    }
}


const mapStateToProps = state => {
    let { storesReducer } = state
    let { storeData } = storesReducer || [];

    let storeList = [];
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
        storeList,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(AddEditComp))