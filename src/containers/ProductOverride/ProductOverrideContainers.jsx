import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStore} from '../../actions/store';
import {fetchProductLookupData} from '../../actions/products';
import {sendSelectedProducts} from '../../actions/poductOverride';
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
    }]
};

class ProductOverRide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            storeList: [],
            productList: [],
            selectedProducts: [],
            selectedStore: {},
            selectedIds: [],
            isLoading: false,
            currencyCode: ''
        }
        this.selectRowProp = {
            mode: 'checkbox',
            clickToSelect: false,
            onSelect: this.onRowSelect,
            // onSelectAll: this.onSelectAll,
            bgColor: '#ffffff',
            selected : this.state.selectedIds,
        }
    }

    componentDidMount() {
        let reqBody = {
            id: localStorage.getItem('retailerID')
        }
        let url = '/Store/ByRetailerId'
        this.props.dispatch(fetchStore('', url, reqBody));
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

        if(!_isEmpty(nextProps.productData)) {
            if(Array.isArray(nextProps.productData)) {
                let productList = []
                _get(nextProps,'productData', []).map(product => {
                    this.setState({ currencyCode: product.currencyCode})
                    let tempStore = {}
                    tempStore = product.product
                    tempStore.salePrice = _get(product.product,'salePrice.price', 0)
                    tempStore.costPrice = _get(product.product,'costPrice.price', 0)
                    productList.push(tempStore)
                })
                this.setState({ productList, isLoading: false })
            }
        }
    }

    handleSelectChange = (id, name) => {
        this.setState({ isLoading: true })
        let selectedStore = {}
        _set(selectedStore, name, id)
        this.setState({ selectedStore })
        let url = '/Inventory/ByStoreId';
        let reqBody = {
            id: id
        }
        this.props.dispatch(fetchProductLookupData('', url, reqBody)); 
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

    handleOverrideForStore = () => {
        if(!_isEmpty(this.state.selectedProducts)) {
            let data = {
                selectedProducts: this.state.selectedProducts,
                selectedStoreId: this.state.selectedStore.store
            }
            this.props.dispatch(sendSelectedProducts(data))
            this.props.history.push('/overrideProduct')
        } else {
            alert('please select a product!')
        } 
    }

    render() {

        let table = ''
        if(this.state.isLoading) {
            table =  <div style={{ marginLeft: '450px', marginTop: '100px' }}>
                        <CircularProgress
                            className="progress"
                            size={100}
                            value={this.state.isLoading}
                            disableShrink
                            color='primary'
                        />
                    </div>
        } else {
            table = <BootstrapTable 
            height='515' 
            data={this.state.productList} 
            options={options}
            selectRow={this.selectRowProp}
            striped hover
            pagination={true} 
            exportCSV={true} 
            search={true} 
            searchPlaceholder={'Search Products'}
        >
            <TableHeaderColumn width='100' dataField='id' isKey={true} hidden={true}>Id
            </TableHeaderColumn>

            <TableHeaderColumn width='150' dataField='name'>Name</TableHeaderColumn>

            <TableHeaderColumn width='100' dataField='sku'>SKU
            </TableHeaderColumn>

            <TableHeaderColumn width='100' dataField='costPrice' dataSort searchable={true} >Cost Price</TableHeaderColumn>

            <TableHeaderColumn width='100' dataField='salePrice' dataSort searchable={true} >Selling Price</TableHeaderColumn>

            <TableHeaderColumn width='100' dataField='active' dataSort searchable={true} >Active</TableHeaderColumn>
        </BootstrapTable>
        }
        return (    
            <div className=''>
                <div className='panel-container'>
                    <span className='panel-heading'>Product List</span>
                    <div>
                        <SaveButton disabled={_isEmpty(_get(this.state,'selectedStore', {}))} Class_Name={"btn-info"} buttonDisplayText={'Override for Store'} handlerSearch={this.handleOverrideForStore}/>
                    </div>
                </div>

                <div>
                <div className="row">
                    <div className="col-sm-4">
                        <label>Select Store</label>
                        <AutoComplete
                        type="single"
                        data={_get(this.state,'storeList',[])}
                        name="store"
                        value={_get(this.state,'selectedStore.store','')} 
                        changeHandler={(id) => {this.handleSelectChange(id, 'store')}} />
                    </div>
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
    const {storesReducer, productsReducer} = state
    let {productData} = productsReducer || [];
    const {storeData} = storesReducer || {}

    return {
        productData,
        storeData
    }
}

export default connect(mapStateToProps)(ProductOverRide);