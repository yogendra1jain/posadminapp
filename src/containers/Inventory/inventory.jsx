import React from 'react';
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';
import "bootstrap/dist/css/bootstrap.css";
import SaveButton from '../../components/common/SaveButton.jsx'
import { fetchStore } from '../../actions/store';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { fetchInventoryLookupData, invetoryUpdate } from '../../actions/inventory';
import 'react-drawer/lib/react-drawer.css';
import ReactDrawer from 'react-drawer';
import { fetchProductLookupData } from '../../actions/products';
import Alert from 'react-s-alert';
import AddEditInventory from './AddEditInventory.jsx';
import AdjustInventoryQuantity from './AdjustInventoryQuantity.jsx';
import _pull from 'lodash/pull';
import AutoComplete from '../../components/Elements/AutoComplete';

const ProsuctsData = [
    {
        name: 'p1',
        sku: '123',
        costPrice: 22,
        sellingPrice: 30,
        details: 'good product',
    },
    {
        name: 'p2',
        sku: '1234',
        costPrice: 20,
        sellingPrice: 40,
        details: 'good ',
    },
    {
        name: 'p3',
        sku: '103',
        costPrice: 82,
        sellingPrice: 100,
        details: 'good product',
    },
    {
        name: 'p4',
        sku: '83',
        costPrice: 200,
        sellingPrice: 210,
        details: 'good product',
    }
]
const options = {
    paginationPosition: 'top',
    defaultSortName: 'id',
    defaultSortOrder: 'asc',
    clearSearch: true,
    withFirstAndLast: true,
    sizePerPageList: [{
        text: '5', value: 5
    }, {
        text: '10', value: 10
    }],
};

class InventoryListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.selectRowProp = {
            mode: 'radio',
            clickToSelect: false,
            onSelect: this.onRowSelect,
            // onSelectAll: this.onSelectAll,
            bgColor: '#ffffff',
            // selected : this.selectedIds,
        }
        this.selectedIds = [];
        this.selectedInfo = {};
        this.selectedInventory = {};
        this.storeList = [];
        this.products = [];
        this.productList = ProsuctsData;
        this.openUpdateInventory = false;
        this.openAdjustQuantity = false;
        this.isUpdate = false;
        this.isAdjust = false;
        this.method = 'POST';
        this.addNew = this.addNew.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.saveInventory = this.saveInventory.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.saveInventoryFlag = false;
        this.isAddnew = false;
        this.selectedStore = {};
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
        const { dispatch, inventoriesReducer } = this.props;
        if (!_isEmpty(props.inventoryData)) {
            console.log(props.inventoryData, 'props.inventoryData')
            this.inventoryList = [];
            _get(props, 'inventoryData', []).map(inventory => {
                let tempPos = {};
                tempPos.id = inventory.product.id;
                tempPos.name = inventory.product.name;
                tempPos.active = inventory.product.active;
                tempPos.category1 = inventory.product.category1;
                tempPos.category2 = inventory.product.category2;
                tempPos.category3 = inventory.product.category3;
                tempPos.image = inventory.product.image;
                tempPos.retailerId = inventory.product.retailerId;
                tempPos.salePrice = {}
                tempPos.salePrice.currencyCode = inventory.product.salePrice.currencyCode;
                tempPos.salePrice.price = inventory.product.salePrice.price;
                tempPos.sku = inventory.product.sku;
                tempPos.unitOfMeasure = inventory.product.unitOfMeasure;
                tempPos.quantity = _get(inventory, 'inventory.quantity', 0);
                this.inventoryList.push(tempPos);
            })
            this.forceUpdate();
        }
        if (!_isEmpty(props.storeData) && this.isAdmin) {
            this.storeList = [];
            props.storeData.stores.map((store, index) => {
                this.storeList.push({ displayText: store.storeName, value: store.id });
            });
        }
        if (props.storeData) {
            console.log(props.storeData, 'props.storeData')
            this.storeList = [];
            _get(props, 'storeData', []).map(store => {
                let tempStore = {};
                tempStore.displayText = store.name;
                tempStore.value = store.id;
                this.storeList.push(tempStore);
            })
            // this.storeList = props.storeData.stores;
            this.forceUpdate();
        }
        //    if(!_isEmpty(props.productData)){
        //         this.products = [];
        //         props.productData.map(product=>{
        //         this.products.push({displayText:product.name , value: product.id})                       

        //     });
        //    }
        if (!_isEmpty(props.inventorySaveData) && this.saveInventoryFlag) {
            this.saveInventoryFlag = false;
            if (props.status !== 200 && props.status !== '') {

                this.showAlert(true, 'inventory creation failed.');
                this.openUpdateInventory = false;
                this.openAdjustQuantity = false;
            } else if (props.status === 200) {
                this.showAlert(false, 'successfully saved.');
                this.openUpdateInventory = false;
                this.openAdjustQuantity = false;
                let url = '';
                if (this.isAdmin) {
                    url = '/productinventories/' + localStorage.getItem('retailerID');
                } else if (localStorage.getItem('role') === 'Store Manager') {
                    url = '/retailer/' + localStorage.getItem('retailerID') + '/store/' + localStorage.getItem('storeID') + '/products';
                }
                dispatch(fetchInventoryLookupData(inventoriesReducer, url));
                this.isUpdate = false;
                this.selectedIds = [];
            }
            this.forceUpdate();
        }

        if (props.type == "RECEIVE_INVENTORY_UPDATE") {

            let reqBody = {
                id: this.selectedStore.stores
            }
            let url2 = '/Inventory/ByStoreId';
            dispatch(fetchInventoryLookupData(inventoriesReducer, url2, reqBody));
            this.forceUpdate();
        }

    }

    handleSelectChange = (id, name) => {
        _set(this.selectedStore, name, id);
        const { dispatch, inventoriesReducer } = this.props;
        let reqBody = {
            id: id
        }
        let url = '/Inventory/ByStoreId';
        dispatch(fetchInventoryLookupData(inventoriesReducer, url, reqBody));
        this.forceUpdate()
    }

    componentDidMount() {
        this.inventoryList = []
        const { dispatch, storesReducer } = this.props;
        let url = '/Store/ByRetailerId';
        let reqBody = {
            id: localStorage.getItem('retailerID')
        }
        dispatch(fetchStore(storesReducer, url, reqBody));
    }
    onRowSelect = (row, isSelected, e) => {
        if (!this.isAddnew) {

            isSelected ? this.selectedIds = [(row.id)] : _pull(this.selectedIds, row.id);
            // this.handleAllChecks();        
            this.selectedInventory = row;
            if (isSelected == false) {

                this.selectedInfo = {};
                this.selectedInventory = {};
            }
            this.selectRowProp.selected = this.selectedIds;
            this.forceUpdate();
        } else {
            this.selectedIds = [];
            this.selectRowProp.selected = this.selectedIds;
            this.forceUpdate();
        }
    }

    onSelectAll = (isSelected, rows) => {
        if (isSelected) {
            for (let i = 0; i < rows.length; i++) {
                this.selectedIds.push(rows[i].sku)
            }
        } else {

            this.selectedIds = [];


        }
        this.selectRowProp.selected = this.selectedIds;


        this.forceUpdate();
    }
    onUpdate() {
        let tempInv = _find(this.inventoryList, { 'id': this.selectedInventory.id });
        this.selectedInventory = tempInv;
        this.openUpdateInventory = true;
        this.isUpdate = true;
        this.isAdjust = false;
        this.isAddnew = false;
        this.method = 'POST';
        this.forceUpdate();
    }
    addNew() {
        this.openUpdateInventory = true;
        this.isUpdate = false;
        this.isAddnew = true;
        this.method = 'POST';
        this.selectedInventory = {};
        const { dispatch, storesReducer } = this.props;
        let retailerId = localStorage.getItem('retailerID');
        if (this.isAdmin)
            dispatch(fetchStore(storesReducer, retailerId));
        else
            _set(this.selectedInventory, 'store', localStorage.getItem('storeID'));
        this.forceUpdate();
    }
    saveInventory(selectedInventory) {
        let data = {
            storeId: this.selectedStore.stores,
            productId: selectedInventory.id,
            deltaQuantity: parseInt(selectedInventory.delta, 10)
            // reason: selectedInventory.reason,
        };
        const { dispatch, inventoriesReducer } = this.props;
        this.saveInventoryFlag = true;
        let url = '/Store/Inventory/Update'
        dispatch(invetoryUpdate('', url, data));
        this.handleClose()

    }
    adjustInventory(selectedInventory) {

        let data = {
            storeId: this.selectedStore.stores,
            productId: selectedInventory.id,
            minQuantity: parseInt(selectedInventory.minQuantity, 10),
            maxQuantity: parseInt(selectedInventory.maxQuantity, 10)
            // reason: selectedInventory.reason,
        };
        if (data.minQuantity > data.maxQuantity) {
            this.showAlert(true, 'Min Quantity cannot be greater than Max Quantity');
            selectedInventory.minQuantity = '';
            selectedInventory.maxQuantity = '';
        }
        else {
            const { dispatch, inventoriesReducer } = this.props;
            this.saveInventoryFlag = true;
            let url = '/Inventory/SetMinMax'
            dispatch(invetoryUpdate('', url, data));
            this.handleClose()
        }
    }

    // handleSelectChange(id, name) {
    //     _set(this.selectedStore, name, id);
    //     if (name === 'store') {
    //         const { dispatch, productsReducer } = this.props;
    //         dispatch(fetchProductLookupData(productsReducer));
    //     }
    //     this.forceUpdate();
    //     console.log(this.selectedStore.stores, 'this.selectedStore.stores')
    // }

    handleInputChange(event) {
        _set(this.selectedInventory, event.target.name, event.target.value);
        this.forceUpdate();
    }
    handleClose = () => {
        this.openUpdateInventory = false;
        this.openAdjustQuantity = false;
        this.isAddnew = false;
        this.isUpdate = false;
        this.forceUpdate();
    }

    adjustQuantity = () => {
        let tempInv = _find(this.inventoryList, { 'id': this.selectedInventory.id });
        this.selectedInventory = tempInv;
        this.openAdjustQuantity = true;
        this.isUpdate = false;
        this.isAdjust = true;
        this.isAddnew = false;
        this.method = 'POST';
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


        return (
            <div className="">
                {/* <span className="glyphicon glyphicon-remove drawer-close" onClick={this.closeDrawer}></span> */}

                <div>
                    <div classNam="col-sm-12">
                        <div className="col-sm-10 form-btn-group">
                            <SaveButton disabled={this.selectedIds.length === 0} buttonDisplayText={'Adjust Quantity'} handlerSearch={() => this.adjustQuantity()} />
                            {/* <SaveButton Class_Name={"btn-info"} buttonDisplayText={'Add new'} handlerSearch={this.addNew} /> */}
                        </div>
                        <div className="col-sm-2 form-btn-group">
                            <SaveButton disabled={this.selectedIds.length === 0} buttonDisplayText={'Update'} handlerSearch={this.onUpdate} />
                            {/* <SaveButton Class_Name={"btn-info"} buttonDisplayText={'Add new'} handlerSearch={this.addNew} /> */}
                        </div>
                    </div>
                    <div>
                        <label>Select Store</label>
                        {/* {
                            !_isEmpty(this.storeList) ?  */}
                        <AutoComplete
                            type="single"
                            data={this.storeList}
                            name="stores"
                            value={_get(this.selectedStore, 'stores', '')}
                            changeHandler={(id) => { this.handleSelectChange(id, 'stores') }}
                        />
                        {/* } */}
                    </div>
                    <div>
                        <BootstrapTable data={this.inventoryList} options={options}
                            selectRow={this.selectRowProp}
                            striped hover
                            pagination={true} exportCSV={true} search={true} searchPlaceholder={'Search'}>
                            <TableHeaderColumn width='50' dataField='id' isKey={true} hidden={true}></TableHeaderColumn>
                            <TableHeaderColumn width='100' dataSort dataField='name'>Product
                            </TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='quantity'>Quantity
                            </TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='minQuantity'>Min Quantity
                            </TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='maxQuantity'>Max Quantity
                            </TableHeaderColumn>
                        </BootstrapTable>

                    </div>
                </div>
                <div>
                    <ReactDrawer
                        open={this.openUpdateInventory}
                        position={'bottom'}
                        // onClose={this.onDrawerClose}
                        noOverlay={true}
                    >
                        <div className="slide-panel">
                            <AddEditInventory
                                storeList={this.storeList}
                                selectedInventory={this.selectedInventory}
                                isUpdate={this.isUpdate}
                                isAdmin={this.isAdmin}
                                open={this.openUpdateInventory}
                                onClose={() => this.handleClose()}
                                saveInventory={(selectedInventory) => this.saveInventory(selectedInventory)}
                            />
                        </div>
                    </ReactDrawer>
                </div>

                <div>
                    <ReactDrawer
                        open={this.openAdjustQuantity}
                        position={'bottom'}
                        // onClose={this.onDrawerClose}
                        noOverlay={true}
                    >
                        <div className="slide-panel">
                            <AdjustInventoryQuantity
                                storeList={this.storeList}
                                selectedInventory={this.selectedInventory}
                                isUpdate={this.isUpdate}
                                isAdmin={this.isAdmin}
                                open={this.openAdjustQuantity}
                                onClose={() => this.handleClose()}
                                adjustInventory={(selectedInventory) => this.adjustInventory(selectedInventory)}
                            />
                        </div>
                    </ReactDrawer>
                </div>
            </div>
        )

    }

}

const mapStateToProps = state => {

    let { inventoriesReducer, userRolesReducer, storesReducer, productsReducer } = state

    let { status } = inventoriesReducer || '';
    let { isFetching } = inventoriesReducer || false;
    let { type, inventoryData, inventorySaveData } = inventoriesReducer || '';
    let { storeData } = storesReducer || {};
    let { productData } = productsReducer || '';


    let { retailerId, userId } = userRolesReducer['userRolesData'] ? userRolesReducer['userRolesData'] : {};



    return {
        status,
        isFetching,
        retailerId,
        userId,
        type,
        inventoryData,
        storeData,
        productData,
        inventorySaveData


    }
}

export default connect(mapStateToProps)(InventoryListContainer);
