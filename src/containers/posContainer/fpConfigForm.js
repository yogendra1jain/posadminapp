import React, { Component } from 'react';
import SaveButton from '../../components/common/SaveButton';
import _set from 'lodash/set';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { Formik } from 'formik';
import Row from "react-bootstrap/lib/Row";
import { GenericInput } from '../../components/common/TextValidation.jsx';
import { addFreedomPayConfig, getFreedomPayConfig } from '../../actions/posTerminal'
import { connect } from 'react-redux';
import showMessage from '../../actions/toastAction';
import genericPostData from '../../Global/DataFetch/genericPostData';

class FPConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fpConfigValues: {},
            disableSave: false,
            isUpdate: false
        }
    }

    componentDidMount() {
        if (_get(this.props, 'history.location.state.storeId', '') == '') {
            this.props.history.push('/posList')
        }
        else {
            let data = {
                id: _get(this.props, 'history.location.state.terminalId', '')
            }
            let url = '/Payment/FreedomPay/Config/Get'
            this.props.dispatch(getFreedomPayConfig('', data, url)).then(resp => {
                this.isUpdate = true
                this.setState({
                    fpConfigValues: {
                        freedomPayClientEnvironment: _get(resp, 'freedomPayClientEnvironment'),
                        freedomPayTerminalId: _get(resp, 'freedomPayTerminalId'),
                        freedomPayStoreId: _get(resp, 'freedomPayStoreId'),
                        freedomPayClientUrl: _get(resp, 'freedomPayClientUrl'),
                        merchantReferenceCode: _get(resp, 'merchantReferenceCode'),
                        freedomPayWorkstationId: _get(resp, 'freedomPayWorkstationId'),
                    }
                })

            }).catch(err => {
                console.log('Error while getting data of fpconfig ', err);
            })
        }

    }

    handleInputChange = (e, props) => {
        this.setState({
            fpConfigValues: {
                ...this.state.fpConfigValues,
                [e.target.name]: e.target.value
            }
        })
    }

    createHandler() {
        this.setState({ disableSave: true })
        let data = _get(this, 'state.fpConfigValues', {})
        _set(data, 'posTerminalId', _get(this.props.history, 'location.state.terminalId', ''))
        let url = "/Payment/FreedomPay/Config/Save";

        genericPostData({
            dispatch: this.props.dispatch,
            reqObj: data,
            url,
            identifier: 'FPCongig',
            successCb: this.handleSuccessAddFP,
            errorCb: () => this.setState({ disableSave: false })
            ,
            successText: "Submited SuccessFully"
        })


    }
    handleSuccessAddFP = resp => {
        this.setState({ disableSave: false })
        this.handleCancel();
    }

    handleCancel = () => {
        this.props.history.push({
            pathname: '/posList',
            state: {
                storeId: _get(this.props.history, 'location.state.storeId', '')
            }
        })
    }

    render() {

        return (
            <Formik
                initialValues={this.state.fpConfigValues}
                handleChange={this.props.handleChange}
                handleBlur={this.props.handleBlur}
                enableReinitialize={true}
                onSubmit={() => { }}
                values={this.state.fpConfigValues}
                render={(props) => {

                    return (
                        <div className="strainBlock">
                            <Row className="d-flex">
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">FP Client Environment</label>
                                    <GenericInput
                                        htmlFor="freedomPayClientEnvironment" displayName="FP Client Environment" type="text"
                                        inputName="freedomPayClientEnvironment" defaultValue={_get(this, 'state.fpConfigValues.freedomPayClientEnvironment', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={true}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">FP Terminal Id</label>
                                    <GenericInput
                                        htmlFor="freedomPayTerminalId" displayName="FP Terminal Id" type="text"
                                        inputName="freedomPayTerminalId" defaultValue={_get(this, 'state.fpConfigValues.freedomPayTerminalId', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={true}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">FP Store Id</label>
                                    <GenericInput
                                        htmlFor="freedomPayStoreId" displayName="FP Store Id" type="text"
                                        inputName="freedomPayStoreId" defaultValue={_get(this, 'state.fpConfigValues.freedomPayStoreId', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={true}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">FP Client URL</label>
                                    <GenericInput
                                        htmlFor="freedomPayClientUrl" displayName="FP Client URL" type="text"
                                        inputName="freedomPayClientUrl" defaultValue={_get(this, 'state.fpConfigValues.freedomPayClientUrl', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={true}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Merchant Reference Code</label>
                                    <GenericInput
                                        htmlFor="merchantReferenceCode" displayName="Merchant Reference Code" type="text"
                                        inputName="merchantReferenceCode" defaultValue={_get(this, 'state.fpConfigValues.merchantReferenceCode', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={true}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">FP Workstation Id</label>
                                    <GenericInput
                                        htmlFor="freedomPayWorkstationId" displayName="FP Workstation Id" type="text"
                                        inputName="freedomPayWorkstationId" defaultValue={_get(this, 'state.fpConfigValues.freedomPayWorkstationId', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={true}
                                        className="text-input error"
                                    />
                                </div>
                            </Row>
                            <Row>
                                <div className="col-sm-12">
                                    <div className="form-btn-group">
                                        <SaveButton buttonDisplayText={this.state.isUpdate ? 'Update' : 'Create'} Class_Name={"btn-info"} disabled={this.state.disableSave} handlerSearch={() => this.createHandler()} />
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

export default connect()(FPConfig);