import React from 'react';
import Redirect from "react-router/Redirect";
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';
import "bootstrap/dist/css/bootstrap.css";
import SaveButton from '../../components/common/SaveButton.jsx'
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
import {fetchStore} from '../../actions/store';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { GenericInput } from '../../components/common/TextValidation.jsx';
import { fetchStaffList, requestStaffUpdate } from '../../actions/staff';
import 'react-drawer/lib/react-drawer.css';
import ReactDrawer from 'react-drawer';
import { fetchProductLookupData } from '../../actions/products';
import Alert from 'react-s-alert';
import _pull from 'lodash/pull';
import AutoComplete from '../../components/Elements/AutoComplete';


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
class StaffListContainer extends React.Component {
    constructor(props) {
        super(props);        
        this.selectRowProp = {
            mode: 'radio',
            clickToSelect: false,
            onSelect: this.onRowSelect,
            onSelectAll: this.onSelectAll,
            bgColor: '#ffffff',
            // selected : this.selectedIds,
        }       
        this.selectedIds = [];
        this.selectedInfo = {};
        this.selectedInventory = {};
        this.products = [];
        this.staffList = [];
        this.storeList = [];
        this.selectedStore = {};
        this.selectedStatus = 'Enable';
        this.open = false;
        this.isUpdate = false;
        this.method = 'POST';
        this.redirectToAddEditPAge = false;
        this.addNew = this.addNew.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.saveInventory = this.saveInventory.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
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
            Alert.success(msg||'successfully saved.', {
                position: 'bottom-right',
                effect: 'slide',
                timeout: 3000,
                html: true
            });
        }

    }
    componentWillReceiveProps(props) {
        if(props.type === 'RECEIVED_STAFF_LIST'){
            if((props.staffListData.length>0)){
                this.staffListData = props.staffListData;
                this.staffList = [];
                props.staffListData.map(staff  => {
                    let tempStaff = {};
                    tempStaff.name = staff.person.firstName + " " + staff.person.lastName;
                    tempStaff.phone = staff.phoneNumber.countryCode + staff.phoneNumber.phoneNumber;
                    tempStaff.email = staff.email;
                    tempStaff.role = staff.role;
                    tempStaff.id = staff.id;
                    tempStaff.loginPin = staff.loginPin
                    this.staffList.push(tempStaff);
                });
            }
            this.forceUpdate();
        }
        if (props.storeData) {
            this.storeList = [];
            props.storeData.map(store=>{
                let tempStore = {};
                tempStore.displayText = store.name;
                tempStore.value = store.id;
                this.storeList.push(tempStore);
            })
            // this.storeList = props.storeData.stores;
            this.forceUpdate();
        }
    }

    componentDidMount(){
        console.log(_get(this.props,'location.state.id', ''), 'this.props.location.state.id')
        const { dispatch, storesReducer } = this.props;
        let reqBody = {
            id: localStorage.getItem('retailerID')
        }
        let url = '/Store/ByRetailerId'
        dispatch(fetchStore(storesReducer, url, reqBody));
        this.selectedStore.stores= _get(this.props,'location.state.id', '')
        if(this.selectedStore.stores) {
            const { dispatch, staffsReducer } = this.props;
            let reqBody = {
                id: this.selectedStore.stores
            }
            let url = '/Operator/ByStoreId';
            dispatch(fetchStaffList(staffsReducer, url, reqBody));
        }

    }

    onRowSelect = (row, isSelected, e) => {
        isSelected ? this.selectedIds.push(row.id) : _pull(this.selectedIds, row.id);
        // this.handleAllChecks(); 

        this.selectedStaff = _find(this.staffListData,{'id':row.id});
        this.selectedStatus = this.selectedIds.length>0 && _find(this.staffListData, { 'id': this.selectedIds[0] }).status;
        if (this.selectedIds.length > 1) {
            let tempObj = _find(this.staffListData, { 'id': this.selectedIds[0] });
            if (tempObj.status !== row.status) {
                _pull(this.selectedIds, row.id);
            }
        }
        // if (isSelected == false) {

        //     this.selectedInfo = {};
        //     this.selectedStaff = {};
        // }
        this.selectRowProp.selected = this.selectedIds;
        this.forceUpdate();
    }
    onSelectAll = (isSelected, rows) => {
        if (isSelected) {
            for (let i = 0; i < rows.length; i++) {
                this.selectedIds.push(rows[i].id);
                this.selectedStaff = rows[i];
                if (this.selectedIds.length > 1) {
                    let tempObj = _find(this.staffListData, { 'id': this.selectedIds[0] });
                    if (tempObj.status !== rows[i].status) {
                        _pull(this.selectedIds, rows[i].id);
                    }
                }
            }
        } else {
            this.selectedIds = [];
            this.selectedStaff = {};
        }
        this.selectedStatus = this.selectedIds.length>0 && _find(this.staffListData, { 'id': this.selectedIds[0] }).status;
        this.selectRowProp.selected = this.selectedIds;
        this.forceUpdate();
    }

 
    onUpdate(){
        const {dispatch, staffsReducer} = this.props;
        let tempStore = _find(this.staffList,{'id': this.selectedStaff.id});
        console.log(tempStore, 'tempStore')
        dispatch(requestStaffUpdate(staffsReducer, tempStore));
        this.redirectToAddEditPAge = true;
    }
    addNew() {
       this.redirectToAddEditPAge = true;
       const {dispatch, staffsReducer} = this.props;
    //    dispatch(requestStaffUpdate(staffsReducer, {}));
       this.forceUpdate();
    }
    saveInventory (selectedInventory) {
       
    }

    handleSelectChange = (id, name) => {
        _set(this.selectedStore,name,id);
        this.forceUpdate()
        const { dispatch, staffsReducer } = this.props;
        let reqBody = {
            id: id
        }
        let url = '/Operator/ByStoreId';
        dispatch(fetchStaffList(staffsReducer, url, reqBody));
    }

    handleInputChange (event) {
       
    }

   
  
    render() {
        
        if(this.redirectToAddEditPAge){
            return (
                <Redirect push to={{
                    pathname: '/staff',
                    state: { id: this.selectedStore.stores },
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
            <div className="">
                <div>
                    <div className="form-btn-group">
                        {/* <SaveButton disabled={this.selectedIds.length === 0} buttonDisplayText={this.selectedStatus === 'Enable' ? 'Disable' : 'Enable'} handlerSearch={this.onUpdateStatus} /> */}
                        <SaveButton disabled={this.selectedIds.length===0} buttonDisplayText={'Update'} handlerSearch={this.onUpdate}/>
                        <SaveButton  Class_Name={"btn-info"} buttonDisplayText={'Add new'} handlerSearch={this.addNew}/>
                    </div>
                    <div>
                        <label>Select Store</label>
                        {
                            !_isEmpty(this.storeList) ? 
                            <AutoComplete
                                type="single"
                                data={this.storeList}
                                name="stores"
                                value={_get(this.selectedStore,'stores','')}
                                changeHandler={(id) => {this.handleSelectChange(id, 'stores') }}
                            /> : null
                        }
                    </div>
                    <div>
                        <BootstrapTable data={this.staffList} options={options}
                            selectRow={this.selectRowProp}
                            striped hover
                            pagination={true} exportCSV={true} search={true} searchPlaceholder={'Search'}>
                            <TableHeaderColumn width='50' dataField='id' isKey={true} hidden={true}></TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='role' >Role</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='name' >Name</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='email' >Email</TableHeaderColumn>
                            {/* <TableHeaderColumn width='50' dataField='status' >Status</TableHeaderColumn> */}
                            <TableHeaderColumn width='100' dataField='phone' >Phone</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>
            </div>
        )

    }

}

const mapStateToProps = state => {

    let { staffsReducer, userRolesReducer, storesReducer, productsReducer } = state
    let { status } = staffsReducer || '';
    let { isFetching } = staffsReducer || false;
    let { type, staffListData, staffSaveData } = staffsReducer || '';
    let { storeData } = storesReducer || {};
    // let { storePostData } = storesReducer || {};
    // let { productData } = productsReducer || '';

    
    let { retailerId, userId } = userRolesReducer['userRolesData'] ? userRolesReducer['userRolesData'] : {};



    return {
        status,
        isFetching,
        retailerId,        
        userId,
        type,
        staffListData,
        staffSaveData,       
        // storePostData,
        storeData
    }
}

export default connect(mapStateToProps)(StaffListContainer);
