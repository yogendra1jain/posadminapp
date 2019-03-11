import React, { Component } from 'react';
import Redirect from "react-router/Redirect";
import { changePassword } from '../../actions/staff';
import { Formik } from 'formik';
import SaveButton from '../../components/common/SaveButton.jsx'
import _set from 'lodash/set';
import _get from 'lodash/get';
import Row from "react-bootstrap/lib/Row";
import { GenericInput } from '../../components/common/TextValidation.jsx';
import {connect} from 'react-redux';
import Alert from 'react-s-alert';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            errorMsg: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.passwordInfo = {}
        this.redirectToList = false
    }

    showAlert(error, msg) {
        if (error) {
            Alert.error(msg || '', {
                position: 'bottom-right',
                effect: 'slide',
                timeout: 5000,
                html: true
            });
            this.forceUpdate();
        } else {
            Alert.success(msg || 'successfully saved.', {
                position: 'bottom-right',
                effect: 'slide',
                timeout: 3000,
                html: true
            });
        }

    }

    handleInputChange(e, props) {
        _set(this.passwordInfo, e.target.name, e.target.value);
        if(e.target.value == '') {
            this.setState({isError: true})
        } else {
            this.setState({isError: false})
        }
        if(e.target.name == 'confirmPassword') {
            if(e.target.value !== this.passwordInfo.newPassword) {
                this.setState({
                    errorMsg: 'Confirm password is not matching.', 
                    isError: true
                })
            } else {
                this.setState({
                    errorMsg: '', 
                    isError: false
                })
            }
        } 
        if (props) {
            props.handleChange(e)
        }
        this.forceUpdate();
    }

    componentDidMount() {
        let operatorId = _get(this.props,'location.state.operatorId','')
        if(operatorId == '') {
            this.props.history.push('/staffs')
        }
        this.setState({isError: true})
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.status == 200) {
            this.showAlert(false, 'Password Reset Successfully!')
            this.redirectToList = true
            this.forceUpdate();
        } else {
            this.showAlert(false, 'Password Reset Failed!')
            this.redirectToList = false
            this.forceUpdate();
        }
    }

    handleChangePassword = () => {
        let reqBody = {
            operatorId: this.props.location.state.operatorId,
            newPassword: this.passwordInfo.newPassword
        } 
        let url = '/Operator/ResetPassword'
        this.props.dispatch(changePassword('',reqBody, url))
    }

    handleCancel = () => {
        this.redirectToList = true
        this.forceUpdate();
    }

    render() {

        if (this.redirectToList) {
            return (
                <Redirect push to={{
                    pathname: '/staffs',
                    state: { id: _get(this.props, 'location.state.id', '') },
                }} />
            )
        }

        return (
            <Formik
                handleChange={this.props.handleChange}
                handleBlur={this.props.handleBlur}
                enableReinitialize={true}
                onSubmit={() => { }}
                values={this.passwordInfo}
                render={(props) => {
                return (
                    <div>
                        <Row className="d-flex">
                        <div className="col-sm-6 col-md-4 form-d">
                            <label className="control-label">New Password</label>
                            <GenericInput
                                htmlFor="newPassword" displayName="New Password" type="text"
                                inputName="newPassword" defaultValue={_get(this.passwordInfo, 'newPassword', '')}
                                onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                type="password"
                                className="text-input error"
                            />
                        </div>
                        <div className="col-sm-6 col-md-4 form-d">
                            <label className="control-label">Confirm Password</label>
                            <GenericInput
                                htmlFor="confirmPassword" displayName="Confirm Password" type="text"
                                inputName="confirmPassword" defaultValue={_get(this.passwordInfo, 'confirmPassword', '')}
                                onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                className="text-input error"
                                type="password"
                            />
                            {this.state.errorMsg == '' ? '' : 
                            <span style={{color: 'red'}}>{this.state.errorMsg}</span>}
                        </div>
                        </Row>
                        <Row>
                            <div className="col-sm-12">
                                <div className="form-btn-group">
                                    <SaveButton disabled={this.state.isError} buttonDisplayText={'Reset Password'} Class_Name={"btn-info"} handlerSearch={this.handleChangePassword} />
                                    <SaveButton buttonDisplayText={'Cancel'} Class_Name={""} handlerSearch={this.handleCancel} />

                                </div>
                            </div>
                        </Row>
                    </div>
                )
            }} />
        )  
    }               
}

const mapStateToProps = state => {
    const {staffsReducer} = state
    let { status } = staffsReducer || '';
    let { isFetching } = staffsReducer || false;
    let { type } = staffsReducer || '';

    return {
        staffsReducer,
        status,
        isFetching,
        type
    }
}

export default connect(mapStateToProps)(ResetPassword);