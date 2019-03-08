import React from 'react';
import Redirect from "react-router/Redirect";
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';
import "bootstrap/dist/css/bootstrap.css";
import SaveButton from '../../components/common/SaveButton.jsx'
import { fetchStore, fetchPostStore, requestStoreUpdate } from '../../actions/store';
import connect from 'react-redux/lib/connect/connect';
import ReactDrawer from 'react-drawer';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
import _pull from 'lodash/pull';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
// import Category from './category';
import 'react-drawer/lib/react-drawer.css';
import Alert from 'react-s-alert';
import AddProductDrawer from './addProductsDrawer';
import { fetchProductLookupData } from '../../actions/products';

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
class StoreListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDrawer: false
        }
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
        if (props.type === 'RECEIVED_STORE') {
            if (!_isEmpty(props.storeData)) {
                this.storeList = [];
                props.storeData.map(store => {
                    let tempStore = {};
                    tempStore.storeName = store.name;
                    tempStore.id = store.id;
                    tempStore.retailerId = store.retailerId
                    tempStore.displayAddress = _get(store.address, 'city', '') + ", " + _get(store.address, 'state', '') + ", " + _get(store.address, 'country', '') + ", "
                        + _get(store.address, 'postalCode', '')
                    tempStore.addressLine1 = _get(store.address, 'addressLine1', '');
                    tempStore.addressLine2 = _get(store.address, 'addressLine2', '');
                    tempStore.city = _get(store.address, 'city', '');
                    tempStore.state = _get(store.address, 'state', '');
                    tempStore.postalCode = _get(store.address, 'postalCode', '');
                    tempStore.country = _get(store.address, 'country', '');
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
        const { dispatch, storesReducer, productsReducer } = this.props;
        let reqBody = {
            id: localStorage.getItem('retailerID')
        }
        let url = '/Store/ByRetailerId'
        dispatch(fetchStore(storesReducer, url, reqBody));
        let ProductListurl = '/Product/ByRetailerId';
        dispatch(fetchProductLookupData(productsReducer,ProductListurl, reqBody));
    }
    onUpdate() {
        let tempStore = _find(this.storeList, { 'id': this.selectedStore.id });
        this.open = true;
        const { dispatch, storesReducer } = this.props;
        dispatch(requestStoreUpdate(storesReducer, tempStore));
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
        this.method = 'POST';
        const { dispatch, storesReducer } = this.props;
        dispatch(requestStoreUpdate(storesReducer, {}));
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

    addProduct = () => {
        this.setState({openDrawer: true})
    }

    onDrawerClose = () => {
        this.setState({openDrawer: false})
    }

    render() {
        if (this.open) {
            return (
                <Redirect push to="/addEditStore" />
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
                        {/* <SaveButton disabled={this.selectedIds.length === 0} buttonDisplayText={'Add Products'} handlerSearch={this.addProduct} /> */}
                        <SaveButton disabled={this.selectedIds.length === 0} buttonDisplayText={'Update'} handlerSearch={this.onUpdate} />
                        <SaveButton disabled={this.isUpdate} buttonDisplayText={'Add new'} Class_Name={"btn-info"} handlerSearch={this.addNewStore} />
                    </div>
                    <div>

                        <BootstrapTable
                            data={this.storeList}
                            options={options}
                            selectRow={this.selectRowProp}
                            striped hover
                            pagination={true} 
                            exportCSV={true} 
                            search={true} 
                            searchPlaceholder={'Search'}>
                            <TableHeaderColumn width='50' dataField='id' isKey={true} hidden={true}></TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='storeName' dataSort >
                                Store Name
                        </TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='displayAddress' >Address</TableHeaderColumn>


                        </BootstrapTable>

                    </div>
                </div>
                {/* <div>
                    <ReactDrawer
                        open={this.state.openDrawer}
                        position={'bottom'}
                        onClose={this.onDrawerClose}
                        noOverlay={true}
                    >
                        <div className="slide-panel">
                            <div className="row">
                                <AddProductDrawer 
                                    productData={_get(this,'props.productData', [])}
                                    storeId={this.selectedStore.id}
                                    onClose={this.onDrawerClose}
                                    {...this.props}
                                />
                            </div>
                        </div>
                    </ReactDrawer>
                </div> */}
            </div>
        )

    }

}

const mapStateToProps = state => {

    let { productsReducer, userRolesReducer, storesReducer } = state

    let { status } = storesReducer || '';
    let { isFetching } = storesReducer || false;
    let { productData } = productsReducer || '';
    let { type, storeData, storePostData } = storesReducer || {};

    let { retailerId, userId } = userRolesReducer['userRolesData'] ? userRolesReducer['userRolesData'] : {};



    return {
        status,
        isFetching,
        retailerId,
        userId,
        type,
        productData,
        storeData,
        storePostData

    }
}

export default connect(mapStateToProps)(StoreListContainer);
