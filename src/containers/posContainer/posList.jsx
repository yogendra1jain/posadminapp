import React from 'react';
import Redirect from "react-router/Redirect";
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
import Alert from 'react-s-alert';



const options = {
    paginationPosition: 'top',
    defaultSortName: 'name',
    defaultSortOrder: 'asc',
    clearSearch: true,
    withFirstAndLast: true,
    sizePerPageList: [{
        text: '5', value: 5
    }, {
        text: '10', value: 10
    }],
};

class PosList extends React.Component {
    constructor(props) {
        super(props);
        this.selectRowProp = {
            mode: 'radio',
            clickToSelect: false,
            onSelect: this.onRowSelect,
            onSelectAll: this.onSelectAll,
            bgColor: '#ffffff',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.posInfo = {};
        this.storeList = [];
        this.fetchStatusFlag = false;
        this.selectedStatus = true
        this.selectedStore = {}
        this.status = {
            data: [
                {
                    displayText: 'Active',
                    value: true
                },
                {
                    displayText: 'Inactive',
                    value: false
                }
            ]
        }
        this.redirectToSearch = false;
        this.onSave = this.onSave.bind(this);
        this.method = 'POST';
        this.open = false;
        this.selectedIds = '';
        this.submitted = false;
        this.selectedInfo = {};
        this.selectedPos = {};
        this.posList = [];
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
        if (!_isEmpty(props.storeData)) {
            this.storeList = [];
            props.storeData.map((store, index) => {
                this.storeList.push({ displayText: store.name, value: store.id });
            });
            this.forceUpdate();
        }
       
        if(props.type == 'RECEIVED_POS_TERMINAL_LIST') {
            debugger
            if(!_isEmpty(props.posListData)) {
                this.posList = []
                props.posListData.map(pos => {
                    let tempPos = {};
                    tempPos.id = pos.id;
                    tempPos.name = pos.name;
                    tempPos.storeId = pos.storeId
                    tempPos.active = pos.active ? 'Active' : 'Inactive'
                    this.posList.push(tempPos)
                })
                this.forceUpdate();                
            } else {
                this.posList = []
            }
        }

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
        this.open = false;
        let url = '';
        let data = {}
        if(this.isUpdate){
            console.log(this.posInfo, 'this.posInfo')
            url = "/Terminal/Update"
            data = this.posInfo
        }else{
            url = "/Terminal/Create"
            data = {};
            data.storeId = _get(this.selectedStore,'stores', '')
            data.name = _get(this.posInfo,'name', '')
            data.active = this.posInfo.active ? true : false
        }
        dispatch(fetchPosTerminalData(posTerminalReducer, data, url));
        this.forceUpdate();
        
        if(this.props.status == 200) {
            console.log(this.selectedStore.stores, 'this.selectedStore.stores')
            let reqBody = {
                id: this.selectedStore.stores
            }
            let listurl = '/Terminal/ByStoreId';
            dispatch(fetchPosTerminalList(posTerminalReducer, listurl, reqBody));
        }
        
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
        this.posList = []
        const { dispatch, storesReducer } = this.props;
        let reqBody = {
            id: localStorage.getItem('retailerID')
        }
        let url = '/Store/ByRetailerId'
        dispatch(fetchStore(storesReducer, url, reqBody));
        // if (localStorage.getItem('role') === 'Admin') {
        //     this.isStoreAdmin = false;
        //     this.fetchStores();
        // } else {
        //     this.isStoreAdmin = true;
        //     this.retailerStore = localStorage.getItem('storeID');
        //     this.posInfo.store = this.retailerStore;
        //     this.fetchTerminals();
        // }
        this.forceUpdate();
    }

    onRowSelect = (row, isSelected, e) => {
        isSelected ? this.selectedIds = [(row.id)] : _pull(this.selectedIds, row.id);
        // this.handleAllChecks();        
        this.selectedPos = row;
        if (isSelected == false) {
            this.selectedInfo = {};
            this.selectedPos = {};
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
            this.method = 'POST';
            const { dispatch, staffsReducer } = this.props;
            this.fetchStores();
            this.open = true;
        }
        let tempStore = _find(this.posList,{'id': this.selectedPos.id});
        this.posInfo.name = _get(tempStore,'name', '')
        this.posInfo.id = _get(tempStore,'id', '')
        this.posInfo.storeId = _get(tempStore,'storeId', '')
        if(tempStore.active) {
            this.posInfo.active = tempStore.active == 'Active' ? true : false
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
    handleSelectStoreChange(id, name) {
        _set(this.selectedStore, name, id);
        const { dispatch, posTerminalReducer } = this.props;
        let reqBody = {
            id: id
        }
        let url = '/Terminal/ByStoreId';
        dispatch(fetchPosTerminalList(posTerminalReducer, url, reqBody));
        this.forceUpdate();
    }

    render() {
        if(_isEmpty(this.selectedStore)) {
            this.posList = []
        }
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

                <div className='panel-container'>
                    <span className='panel-heading'>POS List</span>
                    <div>
                        <SaveButton disabled={this.selectedIds.length === 0} buttonDisplayText={'Update'} handlerSearch={this.onUpdate} Class_Name="m-r-10" />
                        <SaveButton disabled={!this.selectedStore.stores} Class_Name="btn-info" buttonDisplayText={'Add new'} handlerSearch={this.addNew} />
                    </div>
                </div>

                <div>
                    <div className="row">
                        <div className="col-sm-4">
                            <label className="control-label"> Select Store</label>
                            <AutoComplete
                                type="single"
                                data={this.storeList}
                                name="stores"
                                value={_get(this.selectedStore,'stores','')}
                                changeHandler={(id, name) => { this.handleSelectStoreChange(id, "stores") }}
                            />
                        </div>
                    </div>
                    <div>
                        <BootstrapTable data={this.posList} options={options}
                            selectRow={this.selectRowProp}
                            striped hover
                            pagination={true} exportCSV={true} search={true} searchPlaceholder={'Search'}>
                            <TableHeaderColumn width='50' dataField='id' isKey={true} hidden={true}>ID</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='name' >Pos Name</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='active'>Pos Status</TableHeaderColumn>
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
                                        htmlFor="name" displayName="Pos Name"
                                        inputName="name" defaultValue={_get(this.posInfo, 'name', '')}
                                        onChange={this.handleInputChange} errorCheck={false}
                                        className="text-input error"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 form-d">
                                    <label className="control-label">Status</label>
                                    <AutoCompletePosition
                                        type="single"
                                        data={_get(this.status, 'data', [])}
                                        name="store"
                                        value={_get(this.posInfo, 'active', '')}
                                        changeHandler={(id, name) => { this.handleSelectChange(id, "active") }}
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

    let { retailerId, userId } = userRolesReducer['userRolesData'] ? userRolesReducer['userRolesData'] : {};

    return {
        status,
        isFetching,
        retailerId,
        userId,
        type,
        posSaveData,
        storeData,
        posStatusData,
        posListData
    }
}

export default connect(mapStateToProps)(PosList);
