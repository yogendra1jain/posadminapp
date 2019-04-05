import React, { Component } from 'react';
import { Formik } from 'formik';
import Row from 'react-bootstrap/lib/Row';
import Yup from 'yup';
import { connect } from 'react-redux';
import _set from 'lodash/set';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
import SaveButton from '../../components/common/SaveButton';
import { GenericInput } from '../../components/common/TextValidation';
import genericPostData from '../../Global/DataFetch/genericPostData';
import showMessage from '../../actions/toastAction';

class AddEditCustomer extends Component {
    constructor(props) {
        super(props);
        this.customerInfo = {}
        this.isUpdating = false
    }

    componentDidMount() {
        if(!_isEmpty(this.props.initialValues)) {
            this.customerInfo = this.props.initialValues
            this.isUpdating = true
            this.forceUpdate()
        }
    }

    handleInputChange = (e, props) => {
        _set(this.customerInfo, e.target.name, e.target.value);
        this.forceUpdate()
    }

    handleSuccessZipcodeFetch = (res, props) => {
        _set(this.customerInfo, 'city', res.city)
        _set(this.customerInfo, 'state', res.state)
        _set(this.customerInfo, 'country', res.country)
        props.setValues(this.customerInfo)
    }

    handleErrorZipCodeFetch = (err, props) => {
        _set(this.customerInfo, 'city', '')
        _set(this.customerInfo, 'state', '')
        _set(this.customerInfo, 'country', '')
        props.setValues(this.customerInfo)
    }

    handleBlur = (e, props) => {
        if (e.target.name == 'postalCode') {
            let reqBody = {
                zipCode: e.target.value,
                countryShortCode: "US"
            }
            let url = '/Reference/GetZipCodeData'
            genericPostData({
                dispatch: this.props.dispatch,
                reqObj: reqBody,
                url,
                identifier: 'address_from_zip',
                successCb: (res) => this.handleSuccessZipcodeFetch(res, props),
                errorCb: (err) => this.handleErrorZipCodeFetch(err, props)
                ,
                successText: "Fetched Successfully"
            })
        }
    }

    handleSuccessAddCustomer = () => {
        this.props.dispatch(showMessage({ text: "Customer Created Successfully!", isSuccess: true }))
        this.handleCancel()
    }

    handleErrorAddCustomer = () => {
        this.props.dispatch(showMessage({ text: "Some Error Occured!", isSuccess: false }))
    }

    saveHandler = () => {
        let reqBody = {}
        reqBody = {
            customer: {
                firstName: _get(this, 'customerInfo.firstName', ''),
                middleName: _get(this, 'customerInfo.middleName', ''),
                lastName: _get(this, 'customerInfo.lastName', ''),
            },
            email: _get(this, 'customerInfo.email', ''),
            billingAddress: {
                addressLine1: _get(this, 'customerInfo.address1', ''),
                addressLine2: _get(this, 'customerInfo.address2', ''),
                city: _get(this, 'customerInfo.city', ''),
                state: _get(this, 'customerInfo.state', ''),
                postalCode: _get(this, 'customerInfo.postalCode', ''),
                country: _get(this, 'customerInfo.country', 'USA'),
            },
            phoneNumber: {
                countryCode: _get(this, 'customerInfo.countryCode', 91),
                phoneNumber: parseInt(_get(this, 'customerInfo.phoneNumber', 0), 10),
            },
            retailerId: localStorage.getItem('retailerID'),
        }
        let url = ''
        if(this.isUpdating) {
            reqBody.active = _get(this.customerInfo,'active', false)
            url = '/Customer/Update'
            reqBody.id = _get(this.customerInfo,'id','')
        } else {
            url = '/Customer/Create';
        }
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj: reqBody,
            url,
            identifier: 'save_customer',
            successCb: this.handleSuccessAddCustomer,
            errorCb: () => this.handleErrorAddCustomer
            ,
            successText: "Submited SuccessFully"
        })
    }

    handleCancel = () => {
        this.props.history.push('/customers')
    }

    render() {
        return (
            <Formik
                initialValues={this.props.initialValues}
                validationSchema={customerFormValidation}
                handleChange={this.props.handleChange}
                handleBlur={this.props.handleBlur}
                enableReinitialize={true}
                onSubmit={() => { }}
                values={this.customerInfo}
                render={(props) => {
                    return (
                        <div className="strainBlock">
                            <Row className="d-flex">
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">First Name</label>
                                    <GenericInput
                                        htmlFor="firstName" displayName="First Name" type="text"
                                        inputName="firstName" defaultValue={_get(this.customerInfo, 'firstName', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={true}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Middle Name</label>
                                    <GenericInput
                                        htmlFor="middleName" displayName="Middle Name" type="text"
                                        inputName="middleName" defaultValue={_get(this.customerInfo, 'middleName', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={true}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Last Name</label>
                                    <GenericInput
                                        htmlFor="lastName" displayName="Last Name" type="text"
                                        inputName="lastName" defaultValue={_get(this.customerInfo, 'lastName', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={true}
                                        className="text-input error"
                                    />
                                </div>

                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Email</label>
                                    <GenericInput
                                        htmlFor="email" displayName="Email" type="email"
                                        inputName="email" defaultValue={_get(this.customerInfo, 'email', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div>

                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Address Line 1</label>
                                    <GenericInput
                                        htmlFor="address1" displayName="Address Line 1" type="text"
                                        inputName="address1" defaultValue={_get(this.customerInfo, 'address1', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div>

                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Address Line 2</label>
                                    <GenericInput
                                        htmlFor="address2" displayName="Address Line 2" type="text"
                                        inputName="address2" defaultValue={_get(this.customerInfo, 'address2', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div>

                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Zipcode</label>
                                    <GenericInput
                                        htmlFor="postalCode" displayName="Zipcode" type="text"
                                        inputName="postalCode" defaultValue={_get(this.customerInfo, 'postalCode', '')}
                                        onBlur={(event) => this.handleBlur(event, props)}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">City</label>
                                    <GenericInput
                                        htmlFor="city" displayName="City" type="text"
                                        inputName="city" defaultValue={_get(this.customerInfo, 'city', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">State</label>
                                    <GenericInput
                                        htmlFor="state" displayName="State" type="text"
                                        inputName="state" defaultValue={_get(this.customerInfo, 'state', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div>

                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Country</label>
                                    <GenericInput
                                        htmlFor="country" displayName="Country" type="text"
                                        inputName="country" defaultValue={_get(this.customerInfo, 'country', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div>

                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Phone Number</label>
                                    <GenericInput
                                        htmlFor="phoneNumber" displayName="Phone Number" type="number"
                                        inputName="phoneNumber" defaultValue={_get(this.customerInfo, 'phoneNumber', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div>
                            </Row>
                            <Row>
                                <div className="col-sm-12">
                                    <div className="form-btn-group">
                                        <SaveButton buttonDisplayText={this.isUpdating ? 'Update': 'Save'} Class_Name={"btn-info"} handlerSearch={this.saveHandler} />
                                        <SaveButton buttonDisplayText={'Cancel'} Class_Name={""} handlerSearch={this.handleCancel} />
                                    </div>
                                </div>
                            </Row>
                        </div>
                    )
                }}
            />
        )
    }
}

const customerFormValidation = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords don't match").required('Confirm Password is required'),
});

const mapStateToProps = state =>{
    let { customersReducer } = state
    let { selectedStore } = customersReducer || {}
    let initialValues = {}
    if (!_isEmpty(selectedStore)) {
        let customerUpdateData = _find(customersReducer.customerData, { 'id': selectedStore.id });
        console.log(customerUpdateData , 'customerUpdateData')
        initialValues = {
            id: _get(customerUpdateData, 'id'),
            firstName: _get(customerUpdateData, 'customer.firstName', ''),
            middleName: _get(customerUpdateData, 'customer.middleName', ''),
            lastName: _get(customerUpdateData, 'customer.lastName', ''),
            email: _get(customerUpdateData, 'email', ''),
            address1: _get(customerUpdateData, 'billingAddress.addressLine1', ''),
            address2: _get(customerUpdateData, 'billingAddress.addressLine2', ''),
            city: _get(customerUpdateData, 'billingAddress.city', ''),
            state: _get(customerUpdateData, 'billingAddress.state', ''),
            country: _get(customerUpdateData, 'billingAddress.country', 'USA'),
            postalCode: _get(customerUpdateData, 'billingAddress.postalCode', ''),
            countryCode: _get(customerUpdateData, 'phoneNumber.countryCode', 91),
            phoneNumber: parseInt(_get(customerUpdateData, 'phoneNumber.phoneNumber', 0), 10),
            active: _get(customerUpdateData, 'active', false)
        }
    }
    return {
        selectedStore,
        initialValues
    }
}

export default connect(mapStateToProps)(AddEditCustomer);