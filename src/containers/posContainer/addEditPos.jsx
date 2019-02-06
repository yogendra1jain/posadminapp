import React from 'react';
import Redirect from "react-router/Redirect";
import SaveButton from '../../components/common/SaveButton.jsx'
import { fetchStore, fetchTerminal, postPOSLogin } from '../../actions/store';
import AutoComplete from '../../components/Elements/AutoComplete.jsx';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEmpty from 'lodash/isEmpty';
import Row from "react-bootstrap/lib/Row";
import { GenericInput } from '../../components/common/TextValidation.jsx';
import { uploadDocument,ProductDataSave } from '../../actions/products';
import Alert from 'react-s-alert';
import {RECEIVE_PRODUCT_DATA, RECEIVED_DOCUMENT_UPLOAD_SUCCESS_RESPONSE} from '../../constants/products';



class AddEditPosContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.posInfo = {};
        this.storeList = [];
        this.status = {
            data: [
                {
                    displayText: 'Enable',
                    value: 'Enable'
                },
                {
                    displayText: 'Disable',
                    value: 'Disable'
                }
            ]
        }
        this.redirectToSearch = false;
       
        this.onSave = this.onSave.bind(this);
        this.method = 'POST';
    }


    componentDidMount() {
        const { dispatch, storesReducer } = this.props;
        let retailerId = localStorage.getItem('retailerID');
        dispatch(fetchStore(storesReducer, retailerId));
        this.forceUpdate();
    }
     

    handleInputChange(event) {
       _set(this.posInfo, event.target.name, event.target.value);
       this.forceUpdate();
    }
    handleSelectChange = (id, name) => {
       _set(this.posInfo, name, id);
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
            Alert.success(msg||'successfully subimetted', {
                position: 'bottom-right',
                effect: 'slide',
                timeout: 3000,
                html: true
            });
        }

    }
    onSave () {
       
    }
    componentWillReceiveProps(props){
        if (!_isEmpty(props.storeData)) {
            this.storeList = [];
            props.storeData.stores.map((store, index) => {
                this.storeList.push({ displayText: store.storeName, value: store.id });
            });
        }
               
    }
    handleCancel = () => {
        this.redirectToSearch = true;
        this.forceUpdate();
    }

    render() {
        
        if(this.redirectToSearch){
            return(
                <Redirect push to="/posList" />
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
            <div className="strainBlock">
                {/* <span className="glyphicon glyphicon-remove drawer-close" onClick={this.closeDrawer}></span> */}

                <Row className="d-flex">
                    <div className="col-sm-6 col-md-4 form-d">
                        <label className="control-label">Pos Name</label>
                        <GenericInput
                            htmlFor="posName" displayName="Pos Name"
                            inputName="posName" defaultValue={_get(this.posInfo,'posName','')}
                            onChange={this.handleInputChange} errorCheck={false}
                            className="text-input error"
                        />
                    </div>
                    <div className="col-sm-6 col-md-4 form-d">
                        <label className="control-label">Store</label>
                        <AutoComplete
                            type="single"
                            data={this.storeList}
                            name="store"
                            value={_get(this.posInfo,'store','')}
                            changeHandler={(id, name) => { this.handleSelectChange(id, "store") }}
                        />
                    </div>
                    <div className="col-sm-6 col-md-4 form-d">
                        <label className="control-label">Status</label>
                        <AutoComplete
                            type="single"
                            data={_get(this.status,'data',[])}
                            name="store"
                            value={_get(this.posInfo,'status','')}
                            changeHandler={(id, name) => { this.handleSelectChange(id, "status") }}
                        />
                    </div>                                                
                   
                                        
                    
                </Row>
                <Row>
                    <div className="col-sm-12">
                        <div className="form-btn-group">
                            <SaveButton buttonDisplayText={'Save'} Class_Name={"btn-info"} handlerSearch={this.onSave}/>
                            <SaveButton buttonDisplayText={'Cancel'} Class_Name={""} handlerSearch={this.handleCancel}/>

                        </div>
                    </div>
                </Row>
               
            </div>
        )

    }

}

const mapStateToProps = state => {

    let { storesReducer } = state

    let { status } = storesReducer || '';
    let { isFetching } = storesReducer || false;
    let { type,storeData } = storesReducer || {};




    return {
        status,
        isFetching,        
        storeData,
        type,       

    }
}

export default connect(mapStateToProps)(AddEditPosContainer);
