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

import { submitVendorForm } from '../../actions/vendor';

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
class AddEditVendorNew extends React.Component {
    constructor(props) {
        super(props);
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
            { displayText: 'Retailer Admin', value: 'Admin' },
            { displayText: 'Store Manager', value: 'Store Manager' },
            { displayText: 'Sales Executive', value: 'Sales Executive' },
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
            props.storeData.stores.map((store, index) => {
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
        if (!_isEmpty(props.selectedStaff) && props.type === 'REQUEST_VENDOR_UPDATE' && this.getStaff) {
            this.updatedStaffInfo = _cloneDeep(this.staffInfo);
        }
        if (_get(props, 'vendorsReducer.type') === 'VENDOR_FORM_RECIEVE') {
            this.showAlert(false, 'Vendor created successfully!')
            this.redirectToList = true;
            this.forceUpdate();
        } else if (_get(props, 'vendorsReducer.type') === 'VENDOR_FORM_RECIEVE_ERROR') {
            this.showAlert(true, 'Some Error Occured!')
            this.redirectToList = false;
            this.forceUpdate();
        }

    }
    componentDidMount() {
        if (!_isEmpty(this.props.selectedStore)) {
            this.setState({ isUpdating: true })
            this.storeInfo = this.props.selectedStore;
            _set(this.storeInfo, 'retailerId', localStorage.getItem('retailerID'));
            // if(!_isEmpty(this.storeInfo.storeAddress)){
            //     _set(this.storeInfo,'storeAddress',{});
            // }
            delete this.storeInfo['displayAddress'];
            this.updatedStoreInfo = _cloneDeep(this.storeInfo);
            console.log(this.updatedStoreInfo, 'this.updatedStoreInfo')
            // _set(this.storeInfo,'id', localStorage.getItem('retailerID'));
            this.method = 'POST';
            this.forceUpdate();
        }
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
        data = {
            name: _get(this, 'staffInfo.name', ''),
            email: _get(this, 'staffInfo.email', ''),
            phoneNumber: {
                countryCode: _get(this, 'staffInfo.countryCode', 91),
                phoneNumber: parseInt(_get(this, 'staffInfo.phone', 0), 10),
            },
            retailerId: localStorage.getItem('retailerID'),
        }
        let url = '';
        if (_get(this, 'staffInfo.id', false)) {
            data.id = _get(this, 'staffInfo.id')
            url = '/Vendor/Update'
        } else {
            url = '/Vendor/Create'
        }
        dispatch(submitVendorForm('', url, data))
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
        if (name === 'role') {
            if (id === 'Sales Executive') {
                this.isSalesExecutive = true;
                this.isStoreManager = false;
                delete this.staffInfo['store'];
            }
            else if (id === 'Store Manager') {
                this.isStoreManager = true;
                const { dispatch, storesReducer } = this.props;

                let retailerId = localStorage.getItem('retailerID');
                dispatch(fetchStore(storesReducer, retailerId));
                this.forceUpdate();
            } else {
                this.isSalesExecutive = false;
                this.isStoreManager = false;
                delete this.staffInfo['store'];
            }
        }
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
                <Redirect push to="/vendors" />
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
        if(!_isEmpty(this.props.initialValues)){
            this.staffInfo = this.props.initialValues
        }
        return (
            <Formik
                initialValues={this.props.initialValues}
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
                            <Row className="d-flex">
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Name</label>
                                    <GenericInput
                                        htmlFor="name" displayName="Name" type="text"
                                        inputName="name" defaultValue={_get(this.staffInfo, 'name', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={true}
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
                                    <label className="control-label">Contact Number</label>
                                    <GenericInput
                                        htmlFor="phone" displayName="Contact Number" type="number"
                                        inputName="phone" defaultValue={_get(this.staffInfo, 'phone', '')}
                                        onChange={(event) => this.handleInputChange(event, props)} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div>
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
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords don't match").required('Confirm Password is required'),


});

const mapStateToProps = state => {

    let { vendorsReducer } = state
    let { selectedStore } = vendorsReducer || {}
    let initialValues = {}
    if (!_isEmpty(selectedStore)) {
        let temp = _find(vendorsReducer.vendorData, { 'id': selectedStore.id });
        initialValues = {
            name: _get(temp, 'name', ''),
            // firstName: _get(temp, 'contactPerson.firstName', ''),
            // middleName: _get(temp, 'contactPerson.middleName', ''),
            // lastName: _get(temp, 'contactPerson.lastName', ''),
            email: _get(temp, 'email', ''),
            countryCode: _get(temp, 'phoneNumber.countryCode', 91),
            phone: _get(temp, 'phoneNumber.phoneNumber', ''),
            id: _get(temp, 'id'),
        }
    }


    return {
        vendorsReducer,
        selectedStore,
        initialValues
    }
}

export default connect(mapStateToProps)(AddEditVendorNew);
