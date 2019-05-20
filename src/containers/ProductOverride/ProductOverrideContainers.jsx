import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStore} from '../../actions/store';
import {sendSelectedProducts, fetchProductData} from '../../actions/poductOverride';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _pull from 'lodash/pull';
import _isArray from 'lodash/isArray';
import _cloneDeep from 'lodash/cloneDeep';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import SaveButton from '../../components/common/SaveButton';
import AutoComplete from '../../components/Elements/AutoComplete';
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import DineroInit from '../../Global/Components/DineroInit';
import FormDialog from '../../components/common/CommonDialog/index';
import FileUploadComp from './FileUploadComp';
import uploadDocument from '../../actions/Common/uploadDocument';
import { showMessage } from '../../actions/common';
import SearchBar from '../HotProduct/Component/SearchBar';
import genericPostData from '../../Global/DataFetch/genericPostData';
class ProductOverRide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeList: [],
            selectedProducts: [],
            selectedStore: {},
            selectedIds: [],
            isLoading: false,
            totalSize: 0,
            page: 1,
            sizePerPage: 10,
            openDialog: false,
            file: {},
            showStoreDropdown: true,
            searchText:''
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.selectRowProp = {
            mode: 'checkbox',
            clickToSelect: false,
            onSelect: this.onRowSelect,
            bgColor: '#ffffff',
            selected : this.state.selectedIds,
            onSelectAll: this.onSelectAll
        }
        this.productList = []
    }

    componentDidMount() {
        this.fetchStoreByRole()
    }

    fetchStoreByRole = () => {
        if(localStorage.getItem('role') == 1) {
            this.productList = []
            this.forceUpdate()
            if(!_isEmpty(this.props.history.location.state)) {
                let selectedStore = {}
                selectedStore.store = _get(this.props.history,'location.state.storeId','')
                this.setState({ searchText: _get(this.props.history,'location.state.searchText',''), selectedStore, showStoreDropdown: false},() => {
                    this.searchProduct()
                })
            }
            let reqBody = {
                id: localStorage.getItem('retailerID')
            }
            let url = '/Store/ByRetailerId'
            this.props.dispatch(fetchStore('', url, reqBody));
        } else if(localStorage.getItem('role') == 2) {
            let selectedStore = {}
            selectedStore.store= localStorage.getItem('storeID')
            this.setState({selectedStore}, () =>  {
                this.searchProduct()
            })
        }
    }

    searchProduct = ()=>{
        console.log(this.state.selectedStore, 'inside search product')
        let reqObj = {
            "storeId": _get(this.state.selectedStore,'store',''),
            "request": {
                "text": this.state.searchText,
                "offset": (this.state.page - 1) * this.state.sizePerPage,
                "limit": this.state.sizePerPage,
                "filters": [
                    {
                        "field": "retailerId",
                        "value": localStorage.getItem('retailerID')
                    }
                ]
            }
        }
        genericPostData({
            url: '/Search/ProductOverrides',
            dispatch: this.props.dispatch,
            reqObj,
            identifier: 'PRODUCT_OVERRIDE_SEARCH',
            dontShowMessage: true,
            successCb: this.handleProductSearchResult,
            errorCb: this.handleProductSearchError
        })
    }

    handleProductSearchResult = (data) => {
        if(_isEmpty(data)) {
            this.props.dispatch(showMessage({text: 'No Product Found', isSuccess: false}))
        } else {
            this.setState({ isLoading: false })
            this.mapProducts(_get(data,'products',[]))
        }
        this.setState({productList: data.products, totalSize: data.total })
    }

    mapProducts = (data) => {
        if(Array.isArray(data)) {
            let productList = []
            data && data.map(product => {
                let isOverride = _get(product,'override',false)
                let isActive = _get(product,'active', false)
                
                let tempStore = {}
                tempStore.id = _get(product, 'id','');
                tempStore.name = _get(product, 'name', '');
                tempStore.sku = _get(product, 'sku', '');
                tempStore.category1 = _get(product, 'category1','')
                tempStore.category2 = _get(product, 'category2','')
                tempStore.category3 = _get(product, 'category3','')
                tempStore.description = _get(product, 'description','')
                tempStore.retailerId = _get(product, 'retailerId','')
                tempStore.upcCode = _get(product, 'upcCode','')
                tempStore.salePriceFormat = DineroInit(_get(product,'salePrice.amount',0)).toFormat('$0,0.00')
                tempStore.salePrice = DineroInit(_get(product,'salePrice.amount',0)).toUnit(2);
                tempStore.costPriceFormat = DineroInit(_get(product,'costPrice.amount',0)).toFormat('$0,0.00')
                tempStore.costPrice = DineroInit(_get(product,'costPrice.amount',0)).toUnit(2)
                productList.push(tempStore)
                tempStore.isOverriden = isOverride ? 'Yes' : 'No'
                tempStore.active = isActive
                tempStore.activeStatus = isActive ? 'Active' : 'Inactive' 
            })
            this.productList = productList
            this.forceUpdate()
            if(data !== data) {
                this.setState({ isLoading: false })
            }
        }
    }

    handleProductSearchError = (err) => {
        this.props.dispatch(showMessage({text: err, isSuccess: false}))
    }

    handlePageChange = (page, sizePerPage) => {
        this.setState({ page, sizePerPage }, () => {
            this.searchProduct()
        })
    }

    handleSizePerPageChange = (sizePerPage) => {
        this.setState({page:1,  sizePerPage }, () => {
            this.searchProduct();
        })
    }

    handleSearchChange = (searchText) => {
        this.setState({ searchText })
    }

    handleSearchbuttonClick = (searchText) => {
        this.setState({page: 1}, () => {
            this.searchProduct()
        })
    }

    handleClearSearchhBox = () => {
        this.setState({ page: 1, searchText: ''}, () => {
            this.searchProduct()
        })
    }

    handleKeyPress = (e, value) => {
        if (e.charCode == 13) {
            this.setState({page: 1}, () => {
                this.searchProduct()
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if(!_isEmpty(nextProps.storeData)) {
            if(Array.isArray(nextProps.storeData)) {
                let storeList = []
                _get(nextProps,'storeData', []).map(store => {
                    let tempStore = {}
                    tempStore.displayText = store.name
                    tempStore.value = store.id
                    tempStore.code = store.code
                    storeList.push(tempStore)
                })
                this.setState({ storeList })               
            }
        }
    }

    handleSelectChange = (id, name) => {
        if(id == null) {
            this.setState({ selectedStore: {}})
            this.productList= []
            this.forceUpdate()
        } else {
            let selectedStore = {}
            _set(selectedStore, name, id)
            this.setState({ showStoreDropdown: false, isLoading: true, selectedStore }, () => {
                this.searchProduct()
            })
        }  
    }

    onRowSelect = (row, isSelected, e) => {
        isSelected ? this.state.selectedIds.push(row.id) : _pull(this.state.selectedIds, row.id);
        let selectedProducts = _cloneDeep(this.state.selectedProducts);
        if (isSelected) {
            selectedProducts.push(row)
        } else {
            let index = _findIndex(selectedProducts, { 'id': row.id });
            if (index !== -1) {
                selectedProducts.splice(index, 1);
            }
        }
        this.selectRowProp.selected = this.state.selectedIds;
        this.setState({selectedProducts});
    }

    onSelectAll = (isSelected, rows) => {
        let selectedIds = this.state.selectedIds
        let selectedProducts = _cloneDeep(this.state.selectedProducts)
        if(isSelected) {
            rows.map(row => {
                selectedIds.push(row.id)
                selectedProducts.push(row)
            })
        } else {
            rows.map(row => {
                let index = _findIndex(selectedProducts, { 'id': row.id });
                if (index !== -1) {
                    selectedProducts.splice(index, 1);
                }
                _pull(selectedIds, row.id)
            })
        } 
        this.setState({
            selectedProducts, selectedIds
        })
    }

    handleOverrideForStore = () => {
        if(!_isEmpty(this.state.selectedProducts)) {
            let data = {
                selectedProducts: this.state.selectedProducts,
                selectedStoreId: this.state.selectedStore.store,
                selectedIds: this.state.selectedIds,
                searchText: this.state.searchText
            }
            this.props.dispatch(sendSelectedProducts(data))
            this.props.history.push('/productOverride')
        } else {
            alert('Please Select a Product to Override!')
        } 
    }

    toggleDialog = () => {
        this.setState({
            openDialog: !this.state.openDialog,
        });
    }

    onDrop = (files) => {
        let url = '/Upload/ImportAll';
        if (files.length > 0) {
            const selectedStore = _find(this.storeList,['value',_get(this.state.selectedStore,'store','')])
            const storeCode = _get(selectedStore,'code','')
            this.setState({ file: files[0] })
            this.props.dispatch(uploadDocument(files[0], url, '', _get(this.state.selectedStore,'store',''), storeCode, 'StoreProductOverride'))
                .then(data => {
                    if(data.status == 200) {
                        this.fetchStoreByRole()
                        this.toggleDialog();
                        this.props.dispatch(showMessage({ text: `File Uploaded successfully.`, isSuccess: true }));
                        setTimeout(() => {
                            this.props.dispatch(showMessage({}));
                        }, 3000);
                    }
                })
                .catch(err => {
                    this.props.dispatch(showMessage({ text: `${JSON.stringify(err)}`, isSuccess: false }));
                    setTimeout(() => {
                        this.props.dispatch(showMessage({}));
                    }, 5000);
                })
        }
    }

    getSelectedStoreName = () => {
        let storeId = ''
        if(_isEmpty(this.state.selectedStore)) {
            storeId = _get(this.props,'selectedStoreId','')
        } else {
            storeId = _get(this.state,'selectedStore.id','')
        }
        let selectedStore = _find(this.state.storeList, 'value', storeId)
        let selectedStoreName = _get(selectedStore,'displayText','')
        return selectedStoreName
    }

    storeNameClicked = () => {
        this.setState({ showStoreDropdown: true})
    }

    render() {
        if(_isEmpty(this.state.selectedStore)) {
            this.productList = []
        }
        let table = ''
        if(this.state.isLoading) {
            table =  <div className='loader-wrapper-main' style={{marginTop: '50px', marginLeft: "20px"}}>
                        <div className="spinner">
                            <div className="rect1"></div>
                            <div className="rect2"></div>
                            <div className="rect3"></div>
                            <div className="rect4"></div>
                            <div className="rect5"></div>
                        </div>
                    </div>
        } else {
            const options = {
                onPageChange: this.handlePageChange,
                onSizePerPageList: this.handleSizePerPageChange,
                page: this.state.page,
                sizePerPage: this.state.sizePerPage,
                paginationPosition: 'top',
                defaultSortName: 'name',
                defaultSortOrder: 'asc',
                clearSearch: true,
                withFirstAndLast: true,
                // sizePerPageList: [{
                //     text: '5', value: 5
                // }, {
                //     text: '10', value: 10
                // }]
            };
            table = <BootstrapTable 
            height='515' 
            data={this.productList && this.productList} 
            options={options}
            selectRow={this.selectRowProp}
            striped hover
            fetchInfo={{dataTotalSize: this.state.totalSize}}
            remote
            pagination={true} 
            exportCSV={true} 
        >
            <TableHeaderColumn width='100' dataField='id' isKey={true} hidden={true}>Id
            </TableHeaderColumn>

            <TableHeaderColumn width='150' dataField='name'>Name</TableHeaderColumn>

            <TableHeaderColumn width='100' dataField='sku'>SKU
            </TableHeaderColumn>

            <TableHeaderColumn width='100' dataField='costPriceFormat' dataSort searchable={true} >Cost Price</TableHeaderColumn>

            <TableHeaderColumn width='100' dataField='salePriceFormat' dataSort searchable={true} >Selling Price</TableHeaderColumn>

            <TableHeaderColumn width='100' dataField='activeStatus' dataSort searchable={true} >Active</TableHeaderColumn>

            <TableHeaderColumn width='100' dataField='isOverriden' dataSort searchable={true} >Is Overriden</TableHeaderColumn>
        </BootstrapTable>
        }

        const role = localStorage.getItem('role')

        return (    
            <div className=''>
                <FormDialog
                    open={this.state.openDialog}
                    handleClose={this.toggleDialog}
                    title={'Upload CSV'}
                    fullScreen={false}
                    fullWidth={true}
                    dialogContent={
                        <FileUploadComp
                            onDrop={this.onDrop}
                            file={this.state.file}
                        />
                    }
                />
                <div className='panel-container'>
                    <span className='panel-heading'>Product Override</span>
                    <div>
                        <SaveButton disabled={_isEmpty(_get(this.state,'selectedStore', {}))} Class_Name="btn-info m-r-10" buttonDisplayText={'Override for Store'} handlerSearch={this.handleOverrideForStore}/>
                        <SaveButton disabled={_isEmpty(_get(this.state,'selectedStore',{}))} Class_Name="btn-info" buttonDisplayText={'Bulk Upload'} handlerSearch={() => this.toggleDialog()} />
                    </div>
                </div>

                <div>
                <div className="row">
                    {this.state.showStoreDropdown ? 
                        role == 1 ?  
                            <div className="col-sm-4">
                                <label>Select Store</label>
                                <AutoComplete
                                type="single"
                                data={_get(this.state,'storeList',[])}
                                name="store"
                                value={_get(this.state,'selectedStore.store','')} 
                                changeHandler={(id) => {this.handleSelectChange(id, 'store')}} />
                            </div> : 
                            <div className="col-sm-4">
                                <label>Store Name: <span>{localStorage.getItem('storeName')}
                                </span></label>
                            </div> : 
                        <div style={{marginLeft: '20px'}}>
                            <div>
                                <div className="product-search">
                                    <SearchBar
                                        handleKeyPress={this.handleKeyPress}
                                        placeholder="Search Products"                    
                                        handleChange={this.handleSearchChange}
                                        handleSearchbuttonClick = {this.handleSearchbuttonClick}
                                        value={this.state.searchText}
                                        onClear={this.handleClearSearchhBox}
                                    />
                                    <span style={{paddingLeft: '120px',fontSize: '1.6em'}}>Result: {this.state.totalSize}</span>
                                </div>
                            </div>
                            <a onClick={this.storeNameClicked} style={{ fontSize: '1.6rem' }}>
                                <span>{this.getSelectedStoreName()}</span>
                            </a>
                        </div>
                    }
                        
                </div>
                <div>
                    {table}
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {storesReducer, productsReducer, productOverride} = state
    let {productData} = productsReducer || [];
    const {storeData} = storesReducer || {}
    const { productOverrideData, productList, isFetching } = productOverride
    const { selectedProducts, selectedStoreId, selectedIds, searchText } = productOverrideData

    return {
        productData,
        storeData,
        selectedProducts,
        searchText,
        selectedStoreId,
        selectedIds,
        productList,
        isFetching
    }
}

export default connect(mapStateToProps)(ProductOverRide);