import React, {Component} from 'react';
import SaveButton from '../../components/common/SaveButton';
import _set from 'lodash/set';
import { Formik } from 'formik';
import Row from "react-bootstrap/lib/Row";
import { GenericInput } from '../../components/common/TextValidation.jsx';
import _get from 'lodash/get';
import {addFreedomPayConfig} from '../../actions/posTerminal'
import {connect} from 'react-redux';
import showMessage from '../../actions/toastAction';
import { isUndefined } from 'util';

class FPConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disableSave: false
        }
        this.freedomPayInfo = {}
        this.updatedFreedomPayInfo = {}
        this.createHandler = this.createHandler.bind(this);
    }

    componentDidMount() {
        if(_get(this.props,'history.location.state.storeId','') == '') {
            this.props.history.push('/posList')
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isSuccess) {
            debugger
            this.setState({ disableSave: false })
            this.handleCancel()
            this.props.dispatch(showMessage({ text: 'Successfully Crreated FP Config', isSuccess: true }));
            setTimeout(() => {
                this.props.dispatch(showMessage({ text: '', isSuccess: true }));

            }, 1000)
        } else {
            debugger
            this.setState({ disableSave: false })
            this.props.dispatch(showMessage({ text: 'Some error occured while creating config', isSuccess: false }));
            setTimeout(() => {
                this.props.dispatch(showMessage({ text: '', isSuccess: true }));
            }, 1000)
        }
    }

    handleInputChange = (e, props) => {
        _set(this.freedomPayInfo, e.target.name, e.target.value)
        this.forceUpdate()
    }

    createHandler() {
        this.setState({ disableSave: true })
        let data = _get(this,'freedomPayInfo',{})
        _set(data,'freedomPayStoreId', _get(this.props.history,'location.state.storeId',''))
        _set(data, 'freedomPayTerminalId',_get(this.props.history,'location.state.terminalId',''))
        let url = "/Payment/FreedomPay/Config/Save"
        this.props.dispatch(addFreedomPayConfig('',data, url))
    }

    handleCancel = () => {
        this.props.history.push({
            pathname: '/posList',
            state: {
                storeId: _get(this.props.history,'location.state.storeId','')
            }
        })
    }

    render() {
        return (
            <Formik
                initialValues={this.updatedFreedomPayInfo}
                handleChange={this.props.handleChange}
                handleBlur={this.props.handleBlur}
                enableReinitialize={true}
                onSubmit={() => { }}
                values={this.freedomPayInfo}
                render={(props) => {

                    return (
                        <div className="strainBlock">
                            <Row className="d-flex">
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">FP Client Environment</label>
                                    <GenericInput
                                        htmlFor="freedomPayClientEnvironment" displayName="FP Client Environment" type="text"
                                        inputName="freedomPayClientEnvironment" defaultValue={_get(this.freedomPayInfo, 'freedomPayClientEnvironment', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={true}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">FP Client URL</label>
                                    <GenericInput
                                        htmlFor="freedomPayClientUrl" displayName="FP Client URL" type="text"
                                        inputName="freedomPayClientUrl" defaultValue={_get(this.freedomPayInfo, 'freedomPayClientUrl', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={true}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Merchant Reference Code</label>
                                    <GenericInput
                                        htmlFor="merchantReferenceCode" displayName="Merchant Reference Code" type="text"
                                        inputName="merchantReferenceCode" defaultValue={_get(this.freedomPayInfo, 'merchantReferenceCode', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={true}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">FP Workstation Id</label>
                                    <GenericInput
                                        htmlFor="freedomPayWorkstationId" displayName="FP Workstation Id" type="text"
                                        inputName="freedomPayWorkstationId" defaultValue={_get(this.freedomPayInfo, 'freedomPayWorkstationId', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={true}
                                        className="text-input error"
                                    />
                                </div>
                            </Row>
                            <Row>
                                <div className="col-sm-12">
                                    <div className="form-btn-group">
                                        <SaveButton buttonDisplayText={'Create'} Class_Name={"btn-info"} disabled={this.state.disableSave} handlerSearch={() => this.createHandler()} /> 
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

const mapStateToProps = state => {
    const {posTerminalReducer} = state
    const {status, type, saveFPConfig} = posTerminalReducer
    let isSuccess = true 
    if(type == 'SUCCESS_ADD_FP_CONFIG') {
        if(status == 200) {
            isSuccess = true
        }
    } else if(type == 'SUCCESS_ADD_FP_CONFIG') {
        if(status == 400) {
            isSuccess = false
        }
    }
    return {
        status,
        type,
        saveFPConfig,
        isSuccess
    } 
}

export default connect(mapStateToProps)(FPConfig);