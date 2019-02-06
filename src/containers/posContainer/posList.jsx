import React from 'react';
import Redirect from "react-router/Redirect";
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from "react-bootstrap/lib/Button";
import FormGroup from "react-bootstrap/lib/FormGroup";
import FormControl from "react-bootstrap/lib/FormControl";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Col from 'react-bootstrap/lib/Col';
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';
import "bootstrap/dist/css/bootstrap.css";
import SaveButton from '../../components/common/SaveButton.jsx'
import { fetchStore } from '../../actions/store';
import AutoComplete from '../../components/Elements/AutoComplete.jsx';
import AutoCompletePosition from '../../components/Elements/AutoCompletePosition.jsx';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _cloneDeep from 'lodash/cloneDeep';

import _set from 'lodash/set';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
import _pull from 'lodash/pull';
import Row from "react-bootstrap/lib/Row";
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { GenericInput } from '../../components/common/TextValidation.jsx';
import { fetchPosTerminalList, fetchPosTerminalData, fetchPosTerminalStatus } from '../../actions/posTerminal';
import 'react-drawer/lib/react-drawer.css';
import ReactDrawer from 'react-drawer';
import { fetchProductLookupData } from '../../actions/products';
import Alert from 'react-s-alert';



const options = {
    paginationPosition: 'top',
    defaultSortName: 'number',
    defaultSortOrder: 'asc',
    clearSearch: true,
    withFirstAndLast: true,
    sizePerPageList: [{
        text: '5', value: 5
    }, {
        text: '10', value: 10
    }],


};

const PosData = [
    {
        id: 1,
        posName: 'terminal1',
        posId: 1,
        storeName: 'store1',
        status: 'Enable',
    },
    {
        id: 2,
        posName: 'terminal2',
        posId: 2,
        storeName: 'store2',
        status: 'Enable',
    },
    {
        id: 3,
        posName: 'terminal3',
        posId: 3,
        storeName: 'store1',
        status: 'Enable',
    },
    {
        id: 4,
        posName: 'terminal4',
        posId: 4,
        storeName: 'store1',
        status: 'Disable',
    },

]

class PosList extends React.Component {
    constructor(props) {
        super(props);
        this.selectRowProp = {
            mode: 'checkbox',
            clickToSelect: false,
            onSelect: this.onRowSelect,
            onSelectAll: this.onSelectAll,
            bgColor: '#ffffff',
            // selected : this.selectedIds,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.posInfo = {};
        this.storeList = [];
        this.fetchStatusFlag = false;
        this.selectedStatus = true
        this.status = {
            data: [
                {
                    displayText: 'Enable',
                    value: true
                },
                {
                    displayText: 'Disable',
                    value: false
                }
            ]
        }
        this.redirectToSearch = false;

        this.onSave = this.onSave.bind(this);
        this.method = 'POST';
        this.open = false;

        this.selectedIds = [];
        this.submitted = false;
        this.selectedInfo = {};
        this.selectedPos = {};
        this.isUpdate = false;
        this.redirectToAddEditPage = false;
        this.addNew = this.addNew.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.fetchTerminals = this.fetchTerminals.bind(this);
        this.isError = false;
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
        this.isError = false;
        if (!_isEmpty(props.storeData) && props.storeData.stores) {
            this.storeList = [];
            props.storeData.stores.map((store, index) => {
                this.storeList.push({ displayText: store.storeName, value: store.id });
            });
            // let tempStore = _find(this.storeList,{'value': this.retailerStore});
            // this.adminStore = this.storeList[0].storeName;
            this.forceUpdate();
        }
        if (props.posListData.message && this.fetchTerminalFlag) {
            this.fetchTerminalFlag = false;
            this.showAlert(true, props.posListData.message);
        }
        if ((props.posListData.length > 0) && this.fetchTerminalFlag) {
            this.fetchTerminalFlag = false;
            this.posList = props.posListData;
            this.adminStore = this.posList[0].storeName;
            this.forceUpdate();
        }
        // if(!_isEmpty(props.posStatusData)){

        // }
        if (!_isEmpty(props.posStatusData) && this.fetchStatusFlag) {
            this.fetchStatusFlag = false;
            if( props.status===200 ){
                this.showAlert(false, props.posStatusData.message);
                this.fetchTerminals();
                this.forceUpdate();
            }else if(props.status!==200 ){
                // this.isError = true;
                this.showAlert(true,props.posStatusData.message);            
                this.forceUpdate();
            }
        }
        if(!_isEmpty(props.posSaveData)&& this.submitted){
            this.open = false;
            this.submitted = false;
            if( props.status===200 ){
                this.showAlert(false, props.posSaveData.message);
                this.fetchTerminals();
                this.forceUpdate();
            }else if(props.status!==200 ){
                
                this.isError = true;
                this.showAlert(true,props.posSaveData.message);            
                this.forceUpdate();
            }
            
        }


    }
    componentDidUpdate(){
        if(this.isError){
            this.isError = false;
            this.open = true;
            this.forceUpdate();
        }
    }

    onSave() {
        const { dispatch, posTerminalReducer } = this.props;
        let data = {};
        this.submitted  = true;
        _set(data, 'posId', this.posInfo.posId);
        if(this.isStoreAdmin)
        _set(data, 'salesAdmin', localStorage.getItem('storeManager'));
        else
        _set(data, 'salesAdmin', this.posInfo.store);
        _set(data, 'isActive', _get(this.posInfo, 'isActive')===true ? true : false);

        if(this.isUpdate){
            delete data['salesAdmin'];
            _set(data, 'id', this.posInfo.id);
            _set(data, 'store', this.posInfo.store);
        }
        this.open = false;
        // data=_cloneDeep(this.posInfo);
        // delete data['store'];
        // _set(data,'salesAdmin', this.posInfo.store);
        let url = '';
        if(this.isUpdate){
            url = "/retailer/"+localStorage.getItem('retailerID')+"/terminal/"+this.posInfo.id+"/details"
        }else{
            url = "/retailer/"+localStorage.getItem('retailerID')+"/createTerminal"
        }
        dispatch(fetchPosTerminalData(posTerminalReducer, data, this.method, url));
        this.forceUpdate();

    }
    fetchTerminals() {
        this.selectedIds = [];
        this.selectRowProp.selected = this.selectedIds;
        this.fetchTerminalFlag = true;
        const { dispatch, posTerminalReducer } = this.props;
        let url = '/terminals' + "/" + this.retailerStore
        dispatch(fetchPosTerminalList(posTerminalReducer, url));
    }
    componentDidMount() {

        if (localStorage.getItem('role') === 'Admin') {
            this.isStoreAdmin = false;
            this.fetchStores();
        } else {
            this.isStoreAdmin = true;
            this.retailerStore = localStorage.getItem('storeID');
            this.posInfo.store = this.retailerStore;
            this.fetchTerminals();
        }
        this.forceUpdate();
    }
    onRowSelect = (row, isSelected, e) => {
        isSelected ? this.selectedIds.push(row.id) : _pull(this.selectedIds, row.id);
        // this.handleAllChecks(); 
        this.selectedInfo = row;
        _set(this.posInfo, 'posId', row.number);
        _set(this.posInfo,'id', row.id);
        // let tempStore = _find(this.storeList,{'value': this.retailerStore});
        // this.adminStore = tempStore.displayText;
        _set(this.posInfo, 'isActive', row.isActive);
        _set(this.posInfo, 'store', row.store);
        
        if (isSelected == false) {

            this.selectedInfo = {};
            this.selectedPos = {};
        }
        this.selectedStatus = this.selectedIds.length > 0 && _find(this.posList, { 'id': this.selectedIds[0] }).isActive;
        if (this.selectedIds.length > 1) {
            if(this.open){
                _pull(this.selectedIds, row.id);
                this.showAlert(true, 'you can update only one terminal at a time.');
            }
            let tempObj = _find(this.posList, { 'id': this.selectedIds[0] });
            if (tempObj.isActive !== row.isActive) {
                _pull(this.selectedIds, row.id);
            }
        }

        this.selectRowProp.selected = this.selectedIds;
        this.forceUpdate();
    }
    onSelectAll = (isSelected, rows) => {
        if (isSelected) {
            for (let i = 0; i < rows.length; i++) {
                this.selectedIds.push(rows[i].id);
                this.selectedInfo = rows[i];
                if (this.selectedIds.length > 1) {
                    let tempObj = _find(this.posList, { 'id': this.selectedIds[0] });
                    if (tempObj.isActive !== rows[i].isActive) {
                        _pull(this.selectedIds, rows[i].id);
                    }
                }
            }
        } else {
            this.selectedIds = [];
            this.selectedInfo = {};
        }
        this.selectedStatus = this.selectedIds.length > 0 && _find(this.posList, { 'id': this.selectedIds[0] }).isActive;
        this.selectRowProp.selected = this.selectedIds;
        this.forceUpdate();
    }


    fetchStores = () => {
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
    handleCancel = () => {
        this.open = false;
        this.posInfo.isActive = '';
        this.posInfo.posId = '';
        this.forceUpdate();
    }

    onUpdateStatus = () => {
        this.fetchStatusFlag = true;
        const { dispatch, posTerminalReducer } = this.props;
        let data = {};
        let terData = [];
        let isActive = this.posInfo.isActive;

        // this.selectedIds.map(id=>{
        //     let tempobj = _find(this.posList, {'id': id});
        //     let temp = {};
        //     _set(temp, 'posId', tempobj.number);
        //     isActive = tempobj.isActive;
        //     terData.push(id);
        // })
        _set(data,'status', (isActive!==undefined ? !Boolean(isActive): false))
        _set(data, 'terminals', this.selectedIds);
        let url = "/retailer/"+localStorage.getItem('retailerID')+"/terminal/changeStatus"

        dispatch(fetchPosTerminalStatus(posTerminalReducer, data, url));
        this.forceUpdate();
    }


    onUpdate() {
        if (this.selectedIds.length > 1) {
            this.showAlert(true, 'Please Select only 1 pos to update.');
            this.forceUpdate();
            return;
        } else {
            this.isUpdate = true;
            this.method = 'PUT';
            const { dispatch, staffsReducer } = this.props;
            this.fetchStores();
            this.open = true;
        }
        this.forceUpdate();
    }
    addNew() {
        this.isUpdate = false;
        this.method = 'POST';
        this.fetchStores();
        this.posInfo = {};
        
        this.open = true;
        this.forceUpdate();
    }
    handleSelectStoreChange(value, name) {
        _set(this, name, value);
        this.fetchTerminals();
        this.forceUpdate();
    }






    render() {
        if (this.redirectToAddEditPage) {
            return (
                <Redirect push to="/addEditPos" />
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
            <div className="">
                {/* <span className="glyphicon glyphicon-remove drawer-close" onClick={this.closeDrawer}></span> */}

                <div>
                    <div className="form-btn-group">
                        {localStorage.getItem('role') === 'Admin' &&
                            <div style={{ marginTop: "-15px" }} className="col-sm-6 col-md-4 form-d text-left pad-none">
                                <label className="control-label">Store</label>
                                <AutoComplete
                                    type="single"
                                    data={this.storeList}
                                    name="retailerStore"
                                    value={_get(this, 'retailerStore', '')}
                                    changeHandler={(id, name) => { this.handleSelectStoreChange(id, "retailerStore") }}
                                />
                            </div>
                        }
                        <SaveButton disabled={this.selectedIds.length === 0} buttonDisplayText={this.selectedStatus === true ? 'Disable' : 'Enable'} handlerSearch={this.onUpdateStatus} />
                        <SaveButton disabled={this.selectedIds.length === 0} buttonDisplayText={'Update'} handlerSearch={this.onUpdate} />
                        <SaveButton Class_Name={"btn-info"} buttonDisplayText={'Add new'} handlerSearch={this.addNew} />
                    </div>
                    <div>

                        <BootstrapTable data={this.posList} options={options}
                            selectRow={this.selectRowProp}
                            striped hover
                            pagination={true} exportCSV={true} search={true} searchPlaceholder={'Search'}>
                            <TableHeaderColumn width='50' dataField='id' isKey={true} hidden={true}></TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='number' >Pos Name</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='storeName' >storeName</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='isActive' >Status</TableHeaderColumn>
                            {/* <TableHeaderColumn width='100' dataField='posId' >Pos Id</TableHeaderColumn> */}

                        </BootstrapTable>

                    </div>
                </div>
                <div>
                    <ReactDrawer
                        open={this.open}
                        position={'bottom'}
                        // onClose={this.onDrawerClose}
                        noOverlay={true}
                    >
                        <div className="slide-panel">
                            {/* <span className="glyphicon glyphicon-remove drawer-close" onClick={this.closeDrawer}></span> */}

                            <Row className="d-flex">
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Pos Name</label>
                                    <GenericInput
                                        htmlFor="posId" displayName="Pos Name"
                                        inputName="posId" defaultValue={_get(this.posInfo, 'posId', '')}
                                        onChange={this.handleInputChange} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div>
                                {this.isStoreAdmin &&
                                    <fieldset className="col-md-4 col-sm-6 form-d" disabled={true}>

                                        <label class="control-label">Store</label>
                                        <FormControl
                                            type="text"
                                            name="store"
                                            value={this.adminStore}
                                            placeholder="Store"
                                        // onChange = {this.handleInputChange}
                                        >
                                        </FormControl>

                                    </fieldset>
                                }
                                {!this.isStoreAdmin &&
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Store</label>
                                    <AutoCompletePosition
                                        type="single"
                                        data={this.storeList}
                                        name="store"
                                        value={_get(this.posInfo, 'store', '')}
                                        changeHandler={(id, name) => { this.handleSelectChange(id, "store") }}
                                    />
                                </div>
                                }
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Status</label>
                                    <AutoCompletePosition
                                        type="single"
                                        data={_get(this.status, 'data', [])}
                                        name="store"
                                        value={_get(this.posInfo, 'isActive', '')}
                                        changeHandler={(id, name) => { this.handleSelectChange(id, "isActive") }}
                                    />
                                </div>



                            </Row>
                            <Row>
                                <div className="col-sm-12">
                                    <div className="form-btn-group">
                                        <SaveButton buttonDisplayText={'Save'} Class_Name={"btn-info"} handlerSearch={this.onSave} />
                                        <SaveButton buttonDisplayText={'Cancel'} Class_Name={""} handlerSearch={this.handleCancel} />

                                    </div>
                                </div>
                            </Row>

                        </div>
                    </ReactDrawer>
                </div>

            </div>
        )

    }

}

const mapStateToProps = state => {

    let { posTerminalReducer, userRolesReducer, storesReducer, productsReducer } = state

    let { status } = posTerminalReducer || '';
    let { isFetching } = posTerminalReducer || false;
    let { type, posListData, posSaveData, posStatusData } = posTerminalReducer || '';
    let { storeData } = storesReducer || {};
    // let { posListData } = posTerminalReducer || [];


    let { retailerId, userId } = userRolesReducer['userRolesData'] ? userRolesReducer['userRolesData'] : {};



    return {
        status,
        isFetching,
        retailerId,
        userId,
        type,
        // staffListData,
        posSaveData,
        storeData,
        posStatusData,
        posListData

    }
}

export default connect(mapStateToProps)(PosList);
