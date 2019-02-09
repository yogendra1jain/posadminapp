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
import _pull from 'lodash/pull';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
// import Category from './category';
import 'react-drawer/lib/react-drawer.css';
import Alert from 'react-s-alert';

import { fetchStore, fetchPostStore, requestStoreUpdate } from '../../actions/store';
import { getCustomerData, requestCustomerUpdate } from '../../actions/customer';


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
class StoreListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.open = false;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.selectRowProp = {
            mode: 'radio',
            clickToSelect: false,
            onSelect: this.onRowSelect,
            // onSelectAll: this.onSelectAll,
            bgColor: '#ffffff',
            // selected : this.selectedIds,
        }
        this.redirectToNewProduct = false;
        this.addNewStore = this.addNewStore.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
        this.productList = [];
        this.storeList = [];
        this.selectedIds = [];
        this.selectedInfo = {};
        this.selectedStore = {};
        this.store = '';
        this.method = 'POST';
        this.id = '';
        this.isUpdate = false;
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
        debugger
        if (props.type === 'CUSTOMER_RECIEVE') {
            if (!_isEmpty(_get(props, 'customersReducer.customerData', []))) {
                this.storeList = [];
                _get(props, 'customersReducer.customerData', []).map(store => {
                    let tempStore = {};
                    tempStore.id = store.id;
                    this.storeList.push(tempStore);
                })
                // this.storeList = props.storeData.stores;
                this.forceUpdate();
            }
        }
        else if (props.type === 'RECEIVED_STORE_POST') {
            if (!_isEmpty(props.storePostData)) {
                if (props.storePostData.status !== 200 && props.storePostData.status !== '') {
                    this.showAlert(true, props.storePostData.message);
                } else if (props.storePostData.status === 200) {
                    this.showAlert(false, props.storePostData.message);
                    const { dispatch, storesReducer } = this.props;
                    let retailerId = localStorage.getItem('retailerID');
                    dispatch(fetchStore(storesReducer, retailerId));
                    this.isUpdate = false;
                    this.open = false;
                }
                this.forceUpdate();
            }
        }

    }

    componentDidMount() {
        let reqObj = {
            id: localStorage.getItem('retailerID')
        }
        let url = `/Customer/All`;
        this.props.dispatch(getCustomerData('', url, reqObj))
    }
    addNew = () => {
        this.setState({ redirectToAddEditPage: true })
    }

    onUpdate() {
        let tempStore = _find(this.storeList, { 'id': this.selectedStore.id });
        debugger
        this.open = true;
        const { dispatch, customersReducer } = this.props;
        dispatch(requestCustomerUpdate(customersReducer, tempStore));
        this.isUpdate = true;
        this.method = 'POST';
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
        const { dispatch, storesReducer } = this.props;
        let retailerId = localStorage.getItem('retailerID');
        let data = {};
        if (this.id !== '') {
            data.id = this.id;
        }
        data.storeName = this.store;
        data.retailer = localStorage.getItem('retailerID');
        dispatch(fetchPostStore(storesReducer, data, this.method));
    }



    handleInputChange(e) {
        this.store = e.target.value;
        this.forceUpdate();
    }
    handleSelectChange = (id, name) => {

    }
    render() {
        if (this.open) {
            return (
                <Redirect push to="/customers/add" />
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

        let { customerList } = this.props
        return (
            <div className="">
                <div>
                    <div className="form-btn-group">
                        <SaveButton disabled={this.selectedIds.length === 0} buttonDisplayText={'Update'} handlerSearch={this.onUpdate} />
                        <SaveButton disabled={this.isUpdate} buttonDisplayText={'Add new'} Class_Name={"btn-info"} handlerSearch={this.addNewStore} />
                    </div>
                    <div>
                        <BootstrapTable
                            data={customerList}
                            options={options}
                            selectRow={this.selectRowProp}
                            striped hover
                            pagination={true}
                            exportCSV={true}
                            search={true}
                            searchPlaceholder={'Search Customers'}>

                            <TableHeaderColumn width='100' dataField='id' isKey={true} >ID</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='name'>Name</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='email' dataSort>Email</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='phone' dataSort>Phone</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>
                <div>
                </div>
            </div>
        )

    }

}

const mapStateToProps = state => {

    let { productsReducer, userRolesReducer, customersReducer, storesReducer } = state
    let { type } = customersReducer || {};

    let customerList = []
    let { customerData } = customersReducer || []
    customerData.map((data, index) => {
        customerList.push(
            {
                id: data.id,
                name: data.customer.firstName + ' ' + data.customer.lastName,
                email: data.email,
                phone: data.phoneNumber.phoneNumber
            }
        )
    })

    return {
        customerList,
        storesReducer,
        customersReducer,
        type
    }
}

export default connect(mapStateToProps)(StoreListContainer);
