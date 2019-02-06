import React from 'react';
import Redirect from "react-router/Redirect";
import SaveButton from '../../components/common/SaveButton.jsx'
import { fetchStore, fetchTerminal, postPOSLogin, fetchAddressFromZip, fetchPostStore } from '../../actions/store';
import AutoComplete from '../../components/Elements/AutoComplete.jsx';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEmpty from 'lodash/isEmpty';
import Row from "react-bootstrap/lib/Row";
import { GenericInput } from '../../components/common/TextValidation.jsx';
import Alert from 'react-s-alert';
import _cloneDeep from 'lodash/cloneDeep';
import { Formik } from 'formik';
import Yup from 'yup';



class AddEditStoreContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.storeInfo = {
            retailer: localStorage.getItem('retailerID'),
            storeAddress: {}
        };
        this.storeList = [];
        this.props1 = null;

        this.redirectToSearch = false;
        this.gotAddressData = false;

        this.onSave = this.onSave.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleInputAddressChange = this.handleInputAddressChange.bind(this);
        this.method = 'POST';
    }


    componentDidMount() {
        if (!_isEmpty(this.props.selectedStore)) {
            this.storeInfo = this.props.selectedStore;
            _set(this.storeInfo, 'retailer', localStorage.getItem('retailerID'));
            // if(!_isEmpty(this.storeInfo.storeAddress)){
            //     _set(this.storeInfo,'storeAddress',{});
            // }
            delete this.storeInfo['displayAddress'];
            this.updatedStoreInfo = _cloneDeep(this.storeInfo);
            // _set(this.storeInfo,'id', localStorage.getItem('retailerID'));
            this.method = 'PUT';
            this.forceUpdate();
        }
    }


    handleInputChange(event, props) {
        _set(this.storeInfo, event.target.name, event.target.value);
        if(props){
            props.handleChange(event);
        }
        this.forceUpdate();
    }
    handleInputAddressChange(event) {
        _set(this.storeInfo.storeAddress, event.target.name, event.target.value);
        this.forceUpdate();
    }
    handleSelectChange = (id, name) => {
        _set(this.storeInfo, name, id);
        this.forceUpdate();
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
            Alert.success(msg || 'successfully subimetted', {
                position: 'bottom-right',
                effect: 'slide',
                timeout: 3000,
                html: true
            });
        }

    }
    onSave() {
        const { dispatch, storesReducer } = this.props;
        // let retailerId = localStorage.getItem('retailerID');
        let data = {};
        data = this.storeInfo;
        delete data['storeAddress'];
        _set(data, 'storeAddress.streetAddress1', this.storeInfo.streetAddress1);
        _set(data, 'storeAddress.streetAddress2', this.storeInfo.streetAddress2);
        _set(data, 'storeAddress.city', this.storeInfo.city);
        _set(data, 'storeAddress.state', this.storeInfo.state);
        _set(data, 'storeAddress.zipCode', this.storeInfo.zipCode);
        _set(data, 'storeAddress.country', this.storeInfo.country);
        _set(data, 'storeAddress.latitude', this.storeInfo.latitude);
        _set(data, 'storeAddress.longitude', this.storeInfo.longitude);
        
        


        // data.retailer = localStorage.getItem('retailerID');
        dispatch(fetchPostStore(storesReducer, data, this.method));
    }
    onCancel = () => {
        this.redirectToSearch = true;
        this.forceUpdate();
    }
    handleBlur = (event, props) => {
        let name = event.target.name;
        let value = event.target.value;
        this.gotAddressData = false;
        this.getAddressFlag = true;
        if(props){
            this.props1 = props;
        }
        if (name === 'zipCode') {
            if(isNaN(value)){
                return
            }else{
                let intVal = parseInt(value);
                _set(this.storeInfo,'zipCode',intVal);
            }
            const { dispatch, storesReducer } = this.props;
            let data = {
                zipCode: value,
            }
            dispatch(fetchAddressFromZip(storesReducer, this.storeInfo.zipCode));
            this.forceUpdate();
        }
    }
    componentWillReceiveProps(props) {

        if (props.type === 'RECEIVED_ADDRESS_FROM_ZIP' && this.getAddressFlag) {
            if (!_isEmpty(props.addressData)) {
                this.gotAddressData = true;
                this.getAddressFlag = false;
                _set(this.storeInfo,'city', _get(props.addressData,'city',''));
                _set(this.storeInfo,'state', _get(props.addressData,'state',''));
                _set(this.storeInfo,'latitude', _get(props.addressData,'latitude',''));
                _set(this.storeInfo,'streetAddress1', _get(props.addressData,'location',''));
                _set(this.storeInfo,'longitude', _get(props.addressData,'longitude',''));
                _set(this.storeInfo,'country', 'US');
                this.props1.setValues(this.storeInfo);
            }
        }
        else if (props.type === 'RECEIVED_STORE_POST') {
            if (!_isEmpty(props.storePostData)) {
                if (props.storePostData.status !== 200 && props.storePostData.status !== '') {
                    this.showAlert(true, props.storePostData.message);
                } else if (props.storePostData.status === 200) {
                    this.showAlert(false, props.storePostData.message);
                    this.redirectToSearch = true;
                    // const { dispatch, storesReducer } = this.props;
                    // let retailerId = localStorage.getItem('retailerID');
                    // dispatch(fetchStore(storesReducer, retailerId));
                    // this.isUpdate = false;
                    // this.open = false;                    
                }
                this.forceUpdate();
            }
        }

    }

    render() {

        if (this.redirectToSearch) {
            return (
                <Redirect push to="/stores" />
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
                initialValues={this.updatedStoreInfo}
                // validate = {validate1}
                validationSchema={storeFormValidation}
                handleChange={this.props.handleChange}
                handleBlur={this.props.handleBlur}
                enableReinitialize={true}
                onSubmit={() => { }}
                values={this.storeInfo}
                render={(props) => {
                   
                    return (
                        <div className="strainBlock">
                            {/* <span className="glyphicon glyphicon-remove drawer-close" onClick={this.closeDrawer}></span> */}

                            <Row className="d-flex">
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Retailer Id</label>
                                    <GenericInput
                                        htmlFor="retailerId" displayName="Retailer Id" disabled={true}
                                        inputName="retailerId" defaultValue={_get(this.storeInfo, 'retailer', '')}
                                        onChange={(event)=>this.handleInputChange(event, props)} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Store Name</label>
                                    <GenericInput
                                        htmlFor="storeName" displayName="Store Name"
                                        inputName="storeName" defaultValue={_get(this.storeInfo, 'storeName', '')}
                                        onChange={(event)=>this.handleInputChange(event, props)} errorCheck={true}
                                        onBlur={props.handleBlur} errorMessage={props.errors.storeName}
                                        error={props.errors} errorValue={props.errors.storeName}
                                        touched={props.touched} touchedValue={props.touched.storeName}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">

                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Street Address1</label>
                                    <GenericInput
                                        htmlFor="streetAddress1" displayName="Street Address1"
                                        inputName="streetAddress1" defaultValue={_get(this.storeInfo, 'streetAddress1', '')}
                                        onChange={(event)=>this.handleInputChange(event, props)} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Street Address2</label>
                                    <GenericInput
                                        htmlFor="streetAddress2" displayName="Street Address2"
                                        inputName="streetAddress2" defaultValue={_get(this.storeInfo, 'streetAddress2', '')}
                                        onChange={(event)=>this.handleInputChange(event, props)} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">City</label>
                                    <GenericInput
                                        htmlFor="city" displayName="City"
                                        inputName="city" defaultValue={_get(this.storeInfo, 'city', '')}
                                        onChange={(event)=>this.handleInputChange(event, props)} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Zip Code</label>
                                    <GenericInput
                                        htmlFor="zipCode" displayName="Zip Code" type="text"
                                        inputName="zipCode" defaultValue={_get(this.storeInfo, 'zipCode', '')}
                                        onChange={(event)=>this.handleInputChange(event, props)} errorCheck={false}
                                        onBlur={(event) => this.handleBlur(event, props)}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">State</label>
                                    <GenericInput
                                        htmlFor="state" displayName="State"
                                        inputName="state" defaultValue={_get(this.storeInfo, 'state', '')}
                                        onChange={(event)=>this.handleInputChange(event, props)} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Country</label>
                                    <GenericInput
                                        htmlFor="country" displayName="Country"
                                        inputName="country" defaultValue={_get(this.storeInfo, 'country', '')}
                                        onChange={(event)=>this.handleInputChange(event, props)} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Latitude</label>
                                    <GenericInput
                                        htmlFor="latitude" displayName="Latitude"
                                        inputName="latitude" defaultValue={_get(this.storeInfo, 'latitude', '')}
                                        onChange={(event)=>this.handleInputChange(event, props)} errorCheck={true}
                                        onBlur={props.handleBlur} errorMessage={props.errors.latitude}
                                        error={props.errors} errorValue={props.errors.latitude}
                                        touched={props.touched} touchedValue={props.touched.latitude}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Longitude</label>
                                    <GenericInput
                                        htmlFor="longitude" displayName="Longitude"
                                        inputName="longitude" defaultValue={_get(this.storeInfo, 'longitude', '')}
                                        onChange={(event)=>this.handleInputChange(event, props)} errorCheck={true}
                                        onBlur={props.handleBlur} errorMessage={props.errors.longitude}
                                        error={props.errors} errorValue={props.errors.longitude}
                                        touched={props.touched} touchedValue={props.touched.longitude}
                                        className="text-input error"
                                    />
                                </div>



                            </Row>
                            <Row>
                                <div className="col-sm-12">
                                    <div className="form-btn-group">
                                        <SaveButton disabled={!props.isValid} buttonDisplayText={'Save'} Class_Name={"btn-info"} handlerSearch={this.onSave} />
                                        <SaveButton buttonDisplayText={'Cancel'} Class_Name={""} handlerSearch={this.onCancel} />
                                    </div>
                                </div>
                            </Row>

                        </div>
                    )
                }
                }
            />

        )

    }

}
const storeFormValidation = Yup.object().shape({
    storeName:Yup.string().required('Store Name is required'), 
    latitude: Yup.string().required('Latitude is required'),
    longitude: Yup.string().required('Longitude is required'),


});

const mapStateToProps = state => {

    let { storesReducer } = state

    let { status } = storesReducer || '';
    let { isFetching } = storesReducer || false;
    let { type, storeData, selectedStore, storePostData, addressData } = storesReducer || {};




    return {
        status,
        isFetching,
        storeData,
        type,
        selectedStore,
        addressData,
        storePostData

    }
}

export default connect(mapStateToProps)(AddEditStoreContainer);
