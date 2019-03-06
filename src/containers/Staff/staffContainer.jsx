import React from 'react';
import Redirect from "react-router/Redirect";
import "bootstrap/dist/css/bootstrap.css";
import SaveButton from '../../components/common/SaveButton.jsx'
import { fetchStore } from '../../actions/store';
import AutoComplete from '../../components/Elements/AutoComplete.jsx';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
import _pull from 'lodash/pull';
import _cloneDeep from 'lodash/cloneDeep';
import Row from "react-bootstrap/lib/Row";
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { GenericInput } from '../../components/common/TextValidation.jsx';
// import Category from './category';
import { fetchSaveStaff, fetchStaffList } from '../../actions/staff';
import { fetchAddressFromZip } from '../../actions/store';
import 'react-drawer/lib/react-drawer.css';
import Alert from 'react-s-alert';
import { Formik } from 'formik';
import Yup from 'yup';

const options = {
    paginationPosition: 'top',
    defaultSortName: 'storeName',
    defaultSortOrder: 'asc',
    clearSearch: true,
    withFirstAndLast: true,
    sizePerPageList: [{
        text: '5', value: 5
    }, {
        text: '10', value: 10
    }],


};
class AddEditStaffContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdating: false
        }
        this.open = false;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.getStaff = true;
        this.selectRowProp = {
            mode: 'radio',
            clickToSelect: false,
            onSelect: this.onRowSelect,
            // onSelectAll: this.onSelectAll,
            bgColor: '#ffffff',
            // selected : this.selectedIds,
        }
        this.saveHandler = this.saveHandler.bind(this);
        this.gotAddressData = false;
        this.storeList = [];
        this.method = 'POST';
        this.mode = 'ADD';
        this.id = '';
        this.isUpdate = false;
        this.isStoreManager = false;
        this.passwordType = "password";
        this.btnDisplayText = 'Show Password';
        this.props1 = null;

        this.isSalesExecutive = (localStorage.getItem('role') === 'Sales Executive');
        this.redirectToList = false;
        this.staffInfo = {
            owner: localStorage.getItem('retailerID'),
            active: true
        };
        this.updatedStaffInfo = {
            owner: localStorage.getItem('retailerID'),
            active: true
        };
        this.roles = [
            { displayText: 'Cashier', value: 'cashier' },
            { displayText: 'Manager', value: 'manager' }
        ]
        this.status = [
            { displayText: 'Active', value: 'Active' },
            { displayText: 'Inactive', value: 'Inactive' }
        ]
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

    componentWillReceiveProps(props) {
        if (!_isEmpty(props.storeData)) {
            this.storeList = [];
            _get(props.storeData, 'stores', []).map((store, index) => {
                this.storeList.push({ displayText: store.storeName, value: store.id });
            });
        }
        // if (props.type === 'RECEIVED_ADDRESS_FROM_ZIP') {
        if (!_isEmpty(props.addressData) && this.getAddressFlag) {
            this.getAddressFlag = false;
            _set(this.staffInfo, 'city', _get(props.addressData, 'city', ''));
            _set(this.staffInfo, 'state', _get(props.addressData, 'state', ''));
            // _set(this.staffInfo,'latitude', _get(props.addressData,'latitude',''));
            _set(this.staffInfo, 'streetAddress1', _get(props.addressData, 'location', ''));
            // _set(this.staffInfo,'longitude', _get(props.addressData,'longitude',''));
            _set(this.staffInfo, 'country', 'US');
            this.props1.setValues(this.staffInfo);

        }
        // }
        // if (props.type === 'RECEIVED_STAFF_LIST') {
        //     if (!_isEmpty(props.staffListData)) {
        //         let staffList = props.staffListData;
        //         this.forceUpdate();
        //     }
        // }
        if (!_isEmpty(props.selectedStaff) && props.type === 'RECEIVED_STAFF_UPDATE' && this.getStaff) {
            this.getStaff = false;
            this.mode = 'EDIT';
            let staff = props.selectedStaff;
            console.log(staff, 'gfyfiyfufufuyh')
            this.staffInfo.owner = localStorage.getItem('retailerID');
            this.staffInfo.store = staff.store;
            this.staffInfo.userId = staff.userId
            this.staffInfo.password = staff.password;
            this.staffInfo.employeeId = staff.employeeId;
            this.staffInfo.confirmPassword = _get(staff, 'password', '');
            this.staffInfo.email = _get(staff.userInfo, 'email');
            this.staffInfo.age = _get(staff.userInfo, 'age');
            this.staffInfo.phone = _get(staff.billingAddress, 'phone');
            this.staffInfo.alternativeContactNo = _get(staff.userInfo, 'alternativeContactNo');
            this.staffInfo.firstName = _get(staff.billingAddress, 'firstName');
            this.staffInfo.lastName = _get(staff.billingAddress, 'lastName');
            this.staffInfo.company = _get(staff.billingAddress, 'company');
            this.staffInfo.gender = _get(staff.userInfo, 'gender');
            this.staffInfo.role = _get(staff.userInfo, 'role');
            if (_get(staff.userInfo, 'role') === 'Sales Executive') {
                this.isSalesExecutive = true;
            }
            this.staffInfo.pin = staff.pin;
            this.staffInfo.streetAddress1 = _get(staff.billingAddress, 'streetAddress1');
            this.staffInfo.streetAddress2 = _get(staff.billingAddress, 'streetAddress2');
            this.staffInfo.city = _get(staff.billingAddress, 'city');
            this.staffInfo.state = _get(staff.billingAddress, 'state');
            this.staffInfo.country = _get(staff.billingAddress, 'country');
            this.staffInfo.zipCode = _get(staff.billingAddress, 'zipCode');
            this.staffInfo.id = staff.id;

            this.method = 'PUT';
            this.isUpdate = true;
            this.updatedStaffInfo = _cloneDeep(this.staffInfo);
        }
        if (props.type === 'RECEIVED_STAFF') {
            // if (!_isEmpty(props.staffSaveData)) {
            //     if (props.status !== 200 && props.staffSaveData.status !== '') {
            //         this.showAlert(true, props.staffSaveData.message);
            // } else if (props.status === 200) {
            this.showAlert(false, 'Staff Created Successfully!');
            this.redirectToList = true;
            // const { dispatch, storesReducer } = this.props;
            // let retailerId = localStorage.getItem('retailerID');
            // dispatch(fetchStore(storesReducer, retailerId));
            // }
            this.forceUpdate();
        // }
    }

}
componentDidMount() {
    console.log(this.props.selectedId, 'this.props.selectedStaff')
    if (this.props.selectedId) {
        this.setState({ isUpdating: true })
        let selectedStaff = _find(this.props.staffListData, { 'id': this.props.selectedId })
        console.log(selectedStaff, 'selectedStaff')
        this.staffInfo = selectedStaff
        this.staffInfo.firstName = selectedStaff.person.firstName
        this.staffInfo.middleName = selectedStaff.person.middleName
        this.staffInfo.lastName = selectedStaff.person.lastName
        this.staffInfo.phone = selectedStaff.phoneNumber.phoneNumber
    }
    this.forceUpdate()
}
onUpdate() {
    this.id = this.selectedStore.id;
    this.store = this.selectedStore.storeName;
    this.open = true;
    this.isUpdate = true;
    this.method = 'PUT';
    this.forceUpdate();
}
onRowSelect = (row, isSelected, e) => {
    isSelected ? this.selectedIds = [(row.id)] : _pull(this.selectedIds, row.id);
    // this.handleAllChecks();        
    this.selectedStore = row;
    if (isSelected == false) {

        this.selectedInfo = {};
        this.selectedStore = {};
    }
    this.selectRowProp.selected = this.selectedIds;
    this.forceUpdate();
}

onSelectAll = (isSelected, rows) => {
    // if (isSelected) {
    //     for (let i = 0; i < rows.length; i++) {
    //         this.selectedIds.push(rows[i].sku)
    //     }
    // } else {

    this.selectedIds = [];


    // }
    this.selectRowProp.selected = this.selectedIds;


    this.forceUpdate();
}
addNewStore() {
    this.open = true;
    this.forceUpdate();
}
saveHandler() {
    const { dispatch, staffsReducer } = this.props;
    let data = {};
    data.storeId = _get(this.props, 'location.state.id', '');
    data.person = {}
    data.person.firstName = this.staffInfo.firstName;
    data.person.middleName = this.staffInfo.middleName;
    data.person.lastName = this.staffInfo.lastName;
    data.phoneNumber = {}
    data.phoneNumber.countryCode = 91;
    data.phoneNumber.phoneNumber = parseInt(this.staffInfo.phone);
    data.email = this.staffInfo.email
    data.password = this.staffInfo.password
    data.loginPin = this.staffInfo.loginPin
    data.role = this.staffInfo.role
    data.active = this.staffInfo.active == 'Active' ? true : false;
    if (this.state.isUpdating) {
        data.id = this.staffInfo.id
    }
    let url = '';
    if (this.state.isUpdating) {
        url = '/Operator/Update';
    } else {
        url = '/Operator/Create'
    }
    // data.storeName = this.store;
    // data.retailer = localStorage.getItem('retailerID');
    dispatch(fetchSaveStaff(staffsReducer, data, this.method, url));
}



handleInputChange(e, props) {
    _set(this.staffInfo, e.target.name, e.target.value);
    if (props) {
        props.handleChange(e)
    }
    this.forceUpdate();
}
handleSelectChange = (id, name) => {
    _set(this.staffInfo, name, id);
    this.forceUpdate();
}

handleBlur = (event, props) => {
    let name = event.target.name;
    let value = event.target.value;
    this.getAddressFlag = true;
    this.gotAddressData = false;
    this.props1 = props;
    if (name === 'zipCode') {
        if (isNaN(value)) {
            return
        } else {
            let intVal = parseInt(value);
            _set(this.staffInfo, 'zipCode', intVal);
        }
        const { dispatch, storesReducer } = this.props;
        let data = {
            zipCode: value,
        }
        dispatch(fetchAddressFromZip(storesReducer, value));
        this.forceUpdate();
    }
}

handleCancel = () => {
    this.redirectToList = true;
    this.forceUpdate();
}
showPassword = () => {
    if (this.btnDisplayText === 'Show Password') {
        this.btnDisplayText = 'Hide Password';
        this.passwordType = "text";
    } else {
        this.btnDisplayText = 'Show Password';
        this.passwordType = "password";
    }

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



    return (
        <Formik
            initialValues={this.updatedStaffInfo}
            // validate = {validate1}
            validationSchema={staffFormValidation}
            handleChange={this.props.handleChange}
            handleBlur={this.props.handleBlur}
            enableReinitialize={true}
            onSubmit={() => { }}
            values={this.staffInfo}
            render={(props) => {

                return (

                    <div className="strainBlock">
                        {/* <span className="glyphicon glyphicon-remove drawer-close" onClick={this.closeDrawer}></span> */}

                        <Row className="d-flex">
                            {/* <div className="col-sm-6 col-md-4 form-d">
                    <label className="control-label">Owner</label>
                    <GenericInput
                        htmlFor="owner" displayName="Owner" disabled={true}
                        inputName="owner" defaultValue={_get(this.staffInfo,'owner','')}
                        onChange={this.handleInputChange} errorCheck={false}
                        className="text-input error"
                    />
                </div> */}      <div className="col-sm-6 col-md-4 form-d">
                                <label className="control-label">Role</label>
                                <AutoComplete
                                    type="single"
                                    data={this.roles ? this.roles : []}
                                    name="role"
                                    value={_get(this.staffInfo, 'role', '')}
                                    changeHandler={(id, name) => { this.handleSelectChange(id, "role") }}
                                />
                            </div>

                            <div className="col-sm-6 col-md-4 form-d">
                                <label className="control-label">Active</label>
                                <AutoComplete
                                    type="single"
                                    data={this.status ? this.status : []}
                                    name="active"
                                    value={_get(this.staffInfo, 'active', '')}
                                    changeHandler={(id, name) => { this.handleSelectChange(id, "active") }}
                                />
                            </div>

                            {/* <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">User Name</label>
                                    <GenericInput
                                        htmlFor="userId" displayName="User ID" type="text"
                                        inputName="userId" defaultValue={_get(this.staffInfo, 'userId', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={true}
                                        className="text-input error"
                                    />
                                </div> */}
                            <div className="col-sm-6 col-md-4 form-d">
                                <label className="control-label">First Name</label>
                                <GenericInput
                                    htmlFor="firstName" displayName="First Name" type="text"
                                    inputName="firstName" defaultValue={_get(this.staffInfo, 'firstName', '')}
                                    onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                    className="text-input error"
                                />
                            </div>
                            <div className="col-sm-6 col-md-4 form-d">
                                <label className="control-label">Middle Name</label>
                                <GenericInput
                                    htmlFor="middleName" displayName="Middle Name" type="text"
                                    inputName="middleName" defaultValue={_get(this.staffInfo, 'middleName', '')}
                                    onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                    className="text-input error"
                                />
                            </div>
                            <div className="col-sm-6 col-md-4 form-d">
                                <label className="control-label">Last Name</label>
                                <GenericInput
                                    htmlFor="lastName" displayName="Last Name" type="text"
                                    inputName="lastName" defaultValue={_get(this.staffInfo, 'lastName', '')}
                                    onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                    className="text-input error"
                                />
                            </div>
                            <div className="col-sm-6 col-md-4 form-d">
                                <label className="control-label">Email</label>
                                <GenericInput
                                    htmlFor="email" displayName="Email" type="email"
                                    inputName="email" defaultValue={_get(this.staffInfo, 'email', '')}
                                    onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                    className="text-input error"
                                />
                            </div>
                            <div className="col-sm-6 col-md-4 form-d">
                                <label className="control-label">Password</label>
                                <GenericInput
                                    htmlFor="password" displayName="Password" type={this.passwordType}
                                    inputName="password" defaultValue={_get(this.staffInfo, 'password', '')}
                                    onChange={(event) => this.handleInputChange(event, props)} errorCheck={true}
                                    onBlur={props.handleBlur} errorMessage={props.errors.password}
                                    error={props.errors} errorValue={props.errors.password}
                                    touched={props.touched} touchedValue={props.touched.password}
                                    className="text-input error"
                                />
                                <span className={this.btnDisplayText === 'Show Password' ? 'show-password' : 'hide-password'} onClick={this.showPassword}>{this.btnDisplayText}</span>
                            </div>
                            {/* {!this.isUpdate &&
                                    <div className="col-sm-6 col-md-4 form-d">
                                        <label className="control-label">Confirm Password</label>
                                        <GenericInput
                                            htmlFor="password" displayName="Confirm Password" type={this.passwordType}
                                            inputName="confirmPassword" defaultValue={_get(this.staffInfo, 'confirmPassword', '')}
                                            onChange={(event) => this.handleInputChange(event, props)} errorCheck={true}
                                            onBlur={props.handleBlur} errorMessage={props.errors.confirmPassword}
                                            error={props.errors} errorValue={props.errors.confirmPassword}
                                            touched={props.touched} touchedValue={props.touched.confirmPassword}
                                            className="text-input error"
                                        />
                                    </div>
                                } */}
                            {/* {this.isSalesExecutive && !this.isUpdate &&
                                    <div className="col-sm-6 col-md-4 form-d">
                                        <label className="control-label">Pin</label>
                                        <GenericInput
                                            htmlFor="pin" displayName="pin" type="number"
                                            inputName="pin" defaultValue={_get(this.staffInfo, 'pin', '')}
                                            onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                            className="text-input error"
                                        />
                                    </div>
                                } */}
                            {/* <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Employee ID</label>
                                    <GenericInput
                                        htmlFor="email" displayName="Employee ID" type="text"
                                        inputName="employeeId" defaultValue={_get(this.staffInfo, 'employeeId', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div> */}
                            {/* <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Age</label>
                                    <GenericInput
                                        htmlFor="age" displayName="Age" type="number"
                                        inputName="age" defaultValue={_get(this.staffInfo, 'age', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div> */}
                            <div className="col-sm-6 col-md-4 form-d">
                                <label className="control-label">Contact Number</label>
                                <GenericInput
                                    htmlFor="phone" displayName="Contact Number" type="text"
                                    inputName="phone" defaultValue={_get(this.staffInfo, 'phone', '')}
                                    onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                    className="text-input error"
                                />
                            </div>
                            <div className="col-sm-6 col-md-4 form-d">
                                <label className="control-label">Login Pin</label>
                                <GenericInput
                                    htmlFor="loginPin" displayName="Login Pin" type="text"
                                    inputName="loginPin" defaultValue={_get(this.staffInfo, 'loginPin', '')}
                                    onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                    className="text-input error"
                                />
                            </div>
                            {/* <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Alternative Contact Number</label>
                                    <GenericInput
                                        htmlFor="alternativeContactNo" displayName="Alternative Contact Number" type="text"
                                        inputName="alternativeContactNo" defaultValue={_get(this.staffInfo, 'alternativeContactNo', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div> */}

                            {/* <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Gender</label>
                                    <GenericInput
                                        htmlFor="gender" displayName="Gender" type="text"
                                        inputName="gender" defaultValue={_get(this.staffInfo, 'gender', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div> */}

                            {/* <div className="col-sm-6 col-md-4 form-d">
                    <label className="control-label">Sales Admin</label>
                    <GenericInput
                        htmlFor="salesAdmin" displayName="salesAdmin" type="text"
                        inputName="salesAdmin" defaultValue={_get(this.staffInfo,'salesAdmin','')}
                        onChange={this.handleInputChange} errorCheck={false}
                        className="text-input error"
                    />
                </div> */}
                            {/* <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Street Address1</label>
                                    <GenericInput
                                        htmlFor="streetAddress1" displayName="streetAddress1" type="text"
                                        inputName="streetAddress1" defaultValue={_get(this.staffInfo, 'streetAddress1', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Street Address2</label>
                                    <GenericInput
                                        htmlFor="streetAddress2" displayName="streetAddress2" type="text"
                                        inputName="streetAddress2" defaultValue={_get(this.staffInfo, 'streetAddress2', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">City</label>
                                    <GenericInput
                                        htmlFor="city" displayName="city" type="text"
                                        inputName="city" defaultValue={_get(this.staffInfo, 'city', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">ZipCode</label>
                                    <GenericInput
                                        htmlFor="zipCode" displayName="zipCode" type="text"
                                        inputName="zipCode" defaultValue={_get(this.staffInfo, 'zipCode', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                        onBlur={(event)=>this.handleBlur(event, props)}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">State</label>
                                    <GenericInput
                                        htmlFor="state" displayName="state" type="text"
                                        inputName="state" defaultValue={_get(this.staffInfo, 'state', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Country</label>
                                    <GenericInput
                                        htmlFor="country" displayName="country" type="text"
                                        inputName="country" defaultValue={_get(this.staffInfo, 'country', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div> */}

                            {/* <div className="col-sm-6 col-md-4 form-d">
                    <label className="control-label">Categories</label>
                    <AutoComplete
                        type="multi"
                        data={_get(this.categories,'data',[])}
                        name="categories"
                        value={_get(this.productInfo,'categories','')}
                        changeHandler={(id, name) => { this.handleSelectChange(id, "categories") }}
                    />
                </div> */}



                            {/* <div className="col-sm-5">
                    <ul>{this.fileNames}</ul>
                    </div> */}
                            {/* <div className="col-sm-12" style={{marginBottom:"20px"}}>
                        <img src={this.imagePreviewUrl} />
                    </div> */}



                        </Row>
                        <Row>
                            <div className="col-sm-12">
                                <div className="form-btn-group">
                                    <SaveButton buttonDisplayText={'Save'} Class_Name={"btn-info"} handlerSearch={this.saveHandler} />
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

const staffFormValidation = Yup.object().shape({
    // employeeId: Yup.string()
    //     .required('Required'),
    // userId: Yup.string()
    //     .required('required'),
    // password: Yup.string()
    //     .required('required'),
    // confirmPassword: Yup.string()
    //     .required(' required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords don't match").required('Confirm Password is required'),


});

const mapStateToProps = state => {

    let { staffsReducer, userRolesReducer, storesReducer } = state

    let { status } = staffsReducer || '';
    let { isFetching } = staffsReducer || false;
    let { staffListData, staffSaveData, type, selectedStaff, selectedId } = staffsReducer || '';
    let { storeData, addressData } = storesReducer || {};

    let { retailerId, userId } = userRolesReducer['userRolesData'] ? userRolesReducer['userRolesData'] : {};



    return {
        status,
        isFetching,
        retailerId,
        userId,
        type,
        staffSaveData,
        storeData,
        staffListData,
        selectedStaff,
        addressData,
        selectedId
    }
}

export default connect(mapStateToProps)(AddEditStaffContainer);
