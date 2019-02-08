import React from "react";
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from "react-bootstrap/lib/Button";
import FormGroup from "react-bootstrap/lib/FormGroup";
import connect from 'react-redux/lib/connect/connect';
import Redirect from "react-router/Redirect";
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEmpty from 'lodash/isEmpty';

// import "../../components/LoginForm/LoginFormStyle.css";
import "bootstrap/dist/css/bootstrap.css";
import '../../assets/stylesheets/main.css';
import logologin from '../../assets/images/logo-main.jpg';


//import LoginForm from "../../components/LoginForm/LoginForm.jsx"
import { fetchUserRole } from '../../actions/userRoles';

import { Formik } from 'formik';
import { GenericInput } from '../../components/common/TextValidation.jsx';
import Yup from 'yup';
import Alert from 'react-s-alert';
import jwtDecode from 'jwt-decode';

class LoginContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            redirect: false,
            redirectToSearch: false,
        };
        this.onPaste = this.onPaste.bind(this);
        this.loginCredentials = {
            email: "",
            password: ""
        };
    }

    isValidEmailAddress() {
        var pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return pattern.test(this.state.email);
    }

    validateForm() {
        return this.state.email.length > 0 && this.isValidEmailAddress() && this.state.password.length > 0;
    }

    handleChange = (props, event) => {
        if (props.handleChange)
            props.handleChange(event);
        _set(this.loginCredentials, event.target.name, event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        });
        this.forceUpdate();
    }

    handleSubmit = event => {
        // const { dispatch, commonLoginReducer } = this.props;
        // dispatch(postLogin(commonLoginReducer,this.loginCredentials))        
        const { dispatch, userRoleReducer } = this.props;
        dispatch(fetchUserRole(userRoleReducer, this.loginCredentials));
        this.setState({ redirect: true });
        event.preventDefault();
    }

    getClassName() {
        if (this.validateForm()) {
            return "info";
        } else {
            return "info";
        }
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
            Alert.success(msg || 'Logged in  successfully', {
                position: 'bottom-right',
                effect: 'slide',
                timeout: 3000,
                html: true
            });
        }

    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.redirectToSearch && nextProps.status === 200) {
            this.setState({
                redirectToSearch: true,
            });
            let token = nextProps.token;
            let decodeToken = jwtDecode(token);
            console.log(decodeToken, 'decoded json data')
            localStorage.setItem('Token',token);    
            localStorage.setItem('userPin', _get(decodeToken,'Operator.loginPin', ''));
            localStorage.setItem('userName', _get(decodeToken,'Operator.person.firstName','') + " " + _get(decodeToken,'Operator.person.lastName',''));
            localStorage.setItem('retailerID', _get(decodeToken, 'Retailer.id', ''));
            localStorage.setItem('employeeID', _get(decodeToken, 'Operator.id', ''));
            localStorage.setItem('role', _get(decodeToken, 'Operator.role', ''));
            // if (nextProps.user.userInfo.role === 'Store Manager') {
            //     localStorage.setItem('storeManager', nextProps.user.id)
            // }
            localStorage.setItem('storeID', _get(decodeToken, 'Store.id', ''));
            this.showAlert(false, 'User Authenticated.');

        } else {
            if (nextProps.status !== 200 && nextProps.status !== '' && nextProps.status !== undefined)
                this.showAlert(true, 'Login Failed.');
            this.setState({
                redirectToSearch: false
            });
        }

    }
    onPaste(e) {
        e.preventDefault();
        this.forceUpdate();
    }

    render() {

        if (_get(this, 'props.isFetching')) {
            return (<div className='loader-wrapper-main'>
                <div className="spinner">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div>
            </div>);
        }


        if (this.state.redirectToSearch) {
            return (<Redirect push to={'/products'} />)
        }

        return (<Jumbotron>
            <Formik
                initialValues={{}}
                // validate = {validate1}
                validationSchema={LoginFormSchema}
                handleChange={this.props.handleChange}
                handleBlur={this.props.handleBlur}
                enableReinitialize={true}
                onSubmit={this.handleSubmit}
                values={{ ...this.loginCredentials }}
                render={(props) => {
                    if (!props || _isEmpty(props.values)) {
                        props.setValues(this.loginCredentials);
                    }
                    return (
                        <div className="login">
                            <div className="login-logo">
                                <img src={logologin} />
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <FormGroup controlId="email" bsSize="large">
                                    {/*                                     
                                    <FormControl
                                    autoFocus
                                    type="email"
                                    value={this.state.email}
                                    name="email"
                                    onChange={this.handleChange}
                                    placeholder="Email"
                                    /> */}
                                    <GenericInput
                                        htmlFor="email" displayName="UserName"
                                        inputName="email" defaultValue={this.loginCredentials.email}
                                        onChange={this.handleChange.bind(this, props)}
                                        onBlur={props.handleBlur} errorMessage={props.errors.email}
                                        error={props.errors} errorValue={props.errors.email} className="text-input error"
                                        touched={props.touched} touchedValue={props.touched.email}
                                    />
                                </FormGroup>
                                <FormGroup controlId="password" bsSize="large">

                                    {/* <FormControl
                                    value={this.state.password}
                                    onChange={this.handleChange.bind(this, props)}
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    /> */}
                                    <GenericInput
                                        htmlFor="password" displayName="Password" type="password"
                                        inputName="password" defaultValue={this.loginCredentials.password}
                                        onChange={this.handleChange.bind(this, props)}
                                        // onPaste= {(event)=>this.onPaste(event)}
                                        onBlur={props.handleBlur} errorMessage={props.errors.password}
                                        error={props.errors} errorValue={props.errors.password} className="text-input error"
                                        touched={props.touched} touchedValue={props.touched.password}
                                    />

                                    {/* { this.props.status!=200 && _get(this.props.userRoleData,'message',undefined) ?
                                        <div style={{color:"red"}}>
                                        { this.props.userRoleData.message }
                                        </div>: ''
                                    } */}
                                </FormGroup>

                                <Button
                                    bsStyle={this.getClassName()}
                                    block
                                    bsSize="large"
                                    disabled={!props.isValid}
                                    type="submit"
                                    className="btn btn-login"
                                >
                                    Login
                                </Button>
                            </form>
                        </div>
                    )
                }
                }
            />

        </Jumbotron>
        )
    }
}

const LoginFormSchema = Yup.object().shape({

    email: Yup.string()
        // .email('email is not valid')
        .min(5, 'username should be atleast 5 characters long.')
        .max(50, 'username should be atmost 50 characters long.')
        .required('username is required'),
    password: Yup.string()
        .min(5, 'password should be atleast 5 characters long.')
        .max(50, 'password should be atmost 50 characters long.')
        .required('password is required'),

});

const mapStateToProps = state => {

    let { userRolesReducer, commonLoginReducer } = state

    let { status } = userRolesReducer || '';
    let { isFetching } = userRolesReducer || false;
    // let { userRoleData } = loginReducer[commonLoginReducer] || [];
    let { token } = userRolesReducer['userRolesData'] ? userRolesReducer['userRolesData'] : {};



    return {
        commonLoginReducer,
        status,
        isFetching,
        // userRoleData,
        token

    }
}

export default connect(mapStateToProps)(LoginContainer);