import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
import _set from 'lodash/set';

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

import AutoCompletePosition from '../../../components/Elements/AutoCompletePosition.jsx';


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

const days = [
    { displayText: '1', value: '1' },
    { displayText: '2', value: '2' },
    { displayText: '3', value: '3' },
    { displayText: '4', value: '4' },
    { displayText: '5', value: '5' },
    { displayText: '6', value: '6' },
    { displayText: '7', value: '7' },
    { displayText: '8', value: '8' },
    { displayText: '9', value: '9' },
    { displayText: '10', value: '10' },
    { displayText: '11', value: '11' },
    { displayText: '12', value: '12' },
    { displayText: '13', value: '13' },
    { displayText: '14', value: '14' },
    { displayText: '15', value: '15' },
    { displayText: '16', value: '16' },
    { displayText: '17', value: '17' },
    { displayText: '18', value: '18' },
    { displayText: '19', value: '19' },
    { displayText: '20', value: '20' },
    { displayText: '21', value: '21' },
    { displayText: '22', value: '22' },
    { displayText: '23', value: '23' },
    { displayText: '24', value: '24' },
    { displayText: '25', value: '25' },
    { displayText: '26', value: '26' },
    { displayText: '27', value: '27' },
    { displayText: '28', value: '28' },
    { displayText: '29', value: '29' },
    { displayText: '30', value: '30' },
    { displayText: '31', value: '31' },
]

class AddEditComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limitRenewalDates: ''
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        //this.limitRenewalDates = {}
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

    handleSelectChange = (id, name) => {
        // _set(this.limitRenewalDates, name, id);
        console.log('kapil-----------', id, name)
        this.setState({ [name]: id });
        this.forceUpdate();
    }

    render() {
        console.log(_get(this, 'state.limitRenewalDates', '').split(',').length >= 2, 'bool')
        console.log(_get(this, 'state.limitRenewalDates', ''))
        const { classes, initialValues } = this.props;
        return (
            <div className='row' style={{ marginTop: '25px' }}>
                <div className="col-sm-12" style={{ marginLeft: 0 }} className="">
                    <div className="col-sm-4 normal-dropdowns" style={{ marginTop: '-25px' }}>
                        <Field name={`employeeStoreId`} placeholder="store" id={`employeeStoreId`} hideLabel={false} options={_get(this.props, 'storeList', [])} label={'Store *'} component={ReactSelectWrapper} />
                    </div>
                    <div className="col-sm-4 normal-dropdowns" style={{ marginTop: '-25px' }}>
                        <Field name={`isEmpPayEnabled`} placeholder="Employee Pay Enabled" id={`isEmpPayEnabled`} hideLabel={false} options={ActiveFlags} label={'Employee Pay Enabled *'} component={ReactSelectWrapper} />
                    </div>
                    <div className="col-sm-4 normal-dropdowns" style={{ marginTop: '-25px' }}>
                        <Field name={`active`} placeholder="Active" id={`active`} hideLabel={false} options={ActiveFlags} label={'Active *'} component={ReactSelectWrapper} />
                    </div>
                </div>
                <div className="col-sm-12" style={{ marginLeft: 0, marginTop: '20px' }}>

                    <div className="col-sm-6" >
                        <Field name={`email`} placeholder="email" id={`email`} hideLabel={false} label={'email *'} component={TextFieldInput} />
                    </div>
                    <div className="col-sm-6">
                        <Field name={`employeeDiscount`} placeholder="Discount" type="number" parse={value => parseFloat(value, 20)} id={`employeeDiscount`} hideLabel={false} label={'Discount *'} component={TextFieldInput} />
                    </div>
                </div>
                <div className="col-sm-12" style={{ marginLeft: 0, marginTop: '20px' }}>
                    <div className="col-sm-6">
                        <Field name={`employeeId`} placeholder="Employee Id" id={`employeeId`} hideLabel={false} label={'Employee Id *'} component={TextFieldInput} />
                    </div>
                </div>
                <FormSection name={`phoneNumber`}>
                    <div className="col-sm-12" style={{ marginLeft: 0, marginTop: '20px' }}>
                        <div className="col-sm-6">
                            <Field name={`countryCode`} type="number" parse={value => parseInt(value, 20)} placeholder="Country Code" id={`countryCode`} hideLabel={false} label={'countryCode *'} component={TextFieldInput} />
                        </div>
                        <div className="col-sm-6">
                            <Field name={`phoneNumber`} type="number" parse={value => parseInt(value, 20)} placeholder="Phone Number" id={`phoneNumber`} hideLabel={false} label={'phoneNumber *'} component={TextFieldInput} />
                        </div>
                    </div>
                </FormSection>
                <FormSection name={`customer`}>
                    <div className="col-sm-12" style={{ marginLeft: 0, marginTop: '20px' }}>
                        <div className="col-sm-6" >
                            <Field name={`firstName`} id={`firstName`} placeholder="firstName" hideLabel={false} label='First Name *' component={TextFieldInput} />
                        </div>
                        <div className="col-sm-6">
                            <Field name={`lastName`} id={`lastName`} type={"text"} placeholder="Last Name" hideLabel={false} label='lastName *' component={TextFieldInput} />
                        </div>
                    </div>
                </FormSection>

                <div className="col-sm-12" style={{ marginLeft: 0, marginTop: '20px' }}>
                    <div className="col-sm-6">
                        <Field name={`amount`} id={`amount`} type={`number`} placeholder="PurchaseLimit" hideLabel={false} label='Purchase Limit *' component={TextFieldInput} />
                    </div>
                    <div className="col-sm-6">
                        {/* <label className="control-label">Select Limit Renewal Dates</label>
                        <AutoCompletePosition
                            type="multi"
                            data={days}
                            value={_get(this, 'state.limitRenewalDates', '')}
                            name="limitRenewalDates"
                            placeholder="Limit Renewal Dates"
                            changeHandler={(id) => {
                                this.handleSelectChange(id, "limitRenewalDates")
                            }}
                            disabled={_get(this, 'state.limitRenewalDates', '').split(',').length >= 2}
                        /> */}

                        <Field
                            name={`limitRenewalDates`}
                            id={`limitRenewalDates`}
                            type={`multi`}
                            placeholder="Limit Renewal Dates"
                            hideLabel={false}
                            label='Limit Renewal Dates *'
                            value={_get(this, 'state.limitRenewalDates', '')}
                            data={days}
                            onChange={(id) => {
                                this.handleSelectChange(id, "limitRenewalDates")
                            }}
                            disabled={_get(this, 'state.limitRenewalDates', '').split(',').length >= 2}
                            component={AutoCompletePosition}
                        />
                    </div>
                </div>

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