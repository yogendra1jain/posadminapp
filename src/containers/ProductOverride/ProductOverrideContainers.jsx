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
import _findIndex from 'lodash/findIndex';
import SaveButton from '../../components/common/SaveButton';
import AutoComplete from '../../components/Elements/AutoComplete';
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import CircularProgress from '@material-ui/core/CircularProgress';
class ProductOverRide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeList: [],
            selectedProducts: [],
            selectedStore: {},
            selectedIds: [],
            isLoading: false,
            currencyCode: '',
            totalSize: 0,
            page: 1,
            sizePerPage: 10
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
        if(localStorage.getItem('role') == 1) {
            this.productList = []
            this.forceUpdate()
            if(this.props.selectedStoreId) {
                this.fetchPaginatedProducts(this.state.page, this.state.sizePerPage)
            }
            let reqBody = {
                id: localStorage.getItem('retailerID')
            }
            let url = '/Store/ByRetailerId'
            this.props.dispatch(fetchStore('', url, reqBody));
        } else if(localStorage.getItem('role') == 2) {
            let selectedStore = {}
            selectedStore.store= localStorage.getItem('storeID')
            this.setState({selectedStore})
            let url = '/Product/WithOverride/ByStore';
            let reqBody = {
                id: localStorage.getItem('storeID'),
                page: this.state.page,
                sizePerPage: this.state.sizePerPage
            }
            this.props.dispatch(fetchProductData('', url, reqBody));
        }
    }

    fetchPaginatedProducts = (page, sizePerPage) => {
        this.setState({ page, sizePerPage })
        let reqBody = {}
        if(this.props.selectedStoreId) {
            let selectedStore = {}
            selectedStore.store = this.props.selectedStoreId
            this.setState({ selectedStore, isLoading: true })
            reqBody = {
                id: this.props.selectedStoreId,
                page,
                sizePerPage
            }
        } else {
            reqBody = {
                id: _get(this.state,'selectedStore.store',''),
                page,
                sizePerPage
            }
        }
        let url = '/Product/WithOverride/ByStore';
        this.props.dispatch(fetchProductData('', url, reqBody)); 
    }

    handlePageChange = (page, sizePerPage) => {
        this.fetchPaginatedProducts(page, sizePerPage)
    }
        
    handleSizePerPageChange = (sizePerPage) => {
        this.fetchPaginatedProducts(1, sizePerPage);
    }

    componentWillReceiveProps(nextProps) {
        if(!_isEmpty(nextProps.storeData)) {
            if(Array.isArray(nextProps.storeData)) {
                let storeList = []
                _get(nextProps,'storeData', []).map(store => {
                    let tempStore = {}
                    tempStore.displayText = store.name
                    tempStore.value = store.id
                    storeList.push(tempStore)
                })
                this.setState({ storeList })               
            }
        }

        if(!_isEmpty(nextProps.productList)) {
            this.setState({ totalSize: nextProps.productList.count})
            if(Array.isArray(nextProps.productList.storeProducts)) {
                let productList = []
                _get(nextProps,'productList.storeProducts', []).map(product => {
                    let isOverride = ('override' in product)
                    this.setState({ currencyCode: product.currencyCode})
                    let tempStore = {}
                    tempStore.id = _get(product.product, 'id','');
                    tempStore.name = _get(product.product, 'name', '');
                    tempStore.sku = _get(product.product, 'sku', '');
                    tempStore.category1 = _get(product.product, 'category1','')
                    tempStore.category2 = _get(product.product, 'category2','')
                    tempStore.category3 = _get(product.product, 'category3','')
                    tempStore.description = _get(product.product, 'description','')
                    tempStore.retailerId = _get(product.product, 'retailerId','')
                    tempStore.upcCode = _get(product.product, 'upcCode','')
                    if(isOverride) {
                        tempStore.isOverriden = 'Yes'
                        tempStore.salePrice = _get(product.override,'salePrice.price', '')
                        tempStore.costPrice = _get(product.override,'costPrice.price', '')
                        tempStore.active = _get(product.override,'active', false || false)
                        tempStore.activeStatus = tempStore.active ? 'Active' : 'Inactive' 

                    } else {
                        tempStore.isOverriden = 'No'
                        tempStore.salePrice = _get(product.product,'salePrice.price', '')
                        tempStore.costPrice = _get(product.product,'costPrice.price', '')
                        tempStore.active = _get(product.product,'active', false)
                        tempStore.activeStatus = tempStore.active ? 'Active' : 'Inactive' 

                    }
                    productList.push(tempStore)
                })
                this.productList = productList
                this.forceUpdate()
                if(nextProps.productList.storeProducts !== this.props.productList.storeProducts) {
                    this.setState({ isLoading: false })
                }
            }
        }
    }

    handleSelectChange = (id, name) => {
        if(id == null) {
            this.setState({ selectedStore: {}})
            this.productList= []
            this.forceUpdate()
        } else {
            this.setState({ isLoading: true })
            let selectedStore = {}
            _set(selectedStore, name, id)
            this.setState({ selectedStore })
            let url = '/Product/WithOverride/ByStore';
            let reqBody = {
                id: id,
                page: this.state.page,
                sizePerPage: this.state.sizePerPage
            }
            this.props.dispatch(fetchProductData('', url, reqBody)); 
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
                selectedIds: this.state.selectedIds
            }
            this.props.dispatch(sendSelectedProducts(data))
            this.props.history.push('/productOverride')
        } else {
            alert('Please Select a Product to Override!')
        } 
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

            <TableHeaderColumn width='100' dataField='costPrice' dataSort searchable={true} >Cost Price</TableHeaderColumn>

            <TableHeaderColumn width='100' dataField='salePrice' dataSort searchable={true} >Selling Price</TableHeaderColumn>

            <TableHeaderColumn width='100' dataField='activeStatus' dataSort searchable={true} >Active</TableHeaderColumn>

            <TableHeaderColumn width='100' dataField='isOverriden' dataSort searchable={true} >Is Overriden</TableHeaderColumn>
        </BootstrapTable>
        }

        const role = localStorage.getItem('role')

        return (    
            <div className=''>
                <div className='panel-container'>
                    <span className='panel-heading'>Product Override</span>
                    <div>
                        <SaveButton disabled={_isEmpty(_get(this.state,'selectedStore', {}))} Class_Name={"btn-info"} buttonDisplayText={'Override for Store'} handlerSearch={this.handleOverrideForStore}/>
                    </div>
                </div>

                <div>
                <div className="row">
                    {
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
    const { selectedProducts, selectedStoreId, selectedIds } = productOverrideData

    return {
        productData,
        storeData,
        selectedProducts,
        selectedStoreId,
        selectedIds,
        productList,
        isFetching
    }
}

export default connect(mapStateToProps)(ProductOverRide);