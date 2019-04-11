import React from 'react';
import Redirect from "react-router/Redirect";
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';
import "bootstrap/dist/css/bootstrap.css";
import SaveButton from '../../components/common/SaveButton.jsx';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
import _pull from 'lodash/pull';
import _filter from 'lodash/filter'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { fetchProductLookupData, requestProductUpdate } from '../../actions/products';

class ProductListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalSize: 0,
            page: 1,
            sizePerPage: 10
        }
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
        this.addNewProduct = this.addNewProduct.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this)
        this.productList = [];
        this.selectedIds = [];
        this.selectedInfo = {};
        this.selectedProduct = {};
        this.isAdmin =  localStorage.getItem('role')==='Admin';
    }

    componentWillReceiveProps(props) {
        if(!_isEmpty(props.productData) && !props.productData.message){
            this.setState({ totalSize: _get(props,'productData.result.count',0)})
            this.productList = [];
            _get(props,'productData.result.products',[]).map(product=>{
                let prod = {};
                prod = product
                prod.sellingPrice = _get(product,'salePrice.price',0).toFixed(2);
                prod.cPrice = _get(product,'costPrice.price',0).toFixed(2);
                prod.currencyCode = _get(product,'salePrice.currencyCode','');
                this.productList.push(prod);
            });
            this.forceUpdate();
        }
        
    }

    componentDidMount(){
        this.fetchPaginatedProducts(this.state.page, this.state.sizePerPage)
    }

    fetchPaginatedProducts = (page, sizePerPage) => {
        const { dispatch, productsReducer } = this.props;
        let url = '/Product/Paginated/ByRetailerId';
        let reqBody = {
            id: localStorage.getItem('retailerID'),
            page,
            sizePerPage
        }
        dispatch(fetchProductLookupData(productsReducer,url, reqBody));
    }

    handlePageChange = (page, sizePerPage) => {
        this.setState({ page, sizePerPage})
        this.fetchPaginatedProducts(page, sizePerPage)
    }

    handleSizePerPageChange = (sizePerPage) => {
        this.fetchPaginatedProducts(1, sizePerPage);
    }

    onUpdate(){
        const {dispatch, productsReducer} = this.props;
        let selectedProduct = _filter(this.productList, product => {
            return product.id == this.selectedProduct.id
        })
        console.log(selectedProduct, 'selectedProduct')
        dispatch(requestProductUpdate(productsReducer, selectedProduct[0]));
        this.redirectToNewProduct = true;
    }

    onRowSelect = (row, isSelected, e) => {
        isSelected ? this.selectedIds = [(row.sku)] : _pull(this.selectedIds, row.sku);
        this.selectedProduct = row;
        if (isSelected == false) {

            this.selectedInfo = {};
            this.selectedProduct = {};
        }
        this.selectRowProp.selected = this.selectedIds;
        this.forceUpdate();
    }

    onSelectAll = (isSelected, rows) => {
        this.selectedIds = [];
        this.selectRowProp.selected = this.selectedIds;
        this.forceUpdate();
    }
    addNewProduct() {
        this.redirectToNewProduct = true;
        this.forceUpdate();
    }

    handleInputChange() {

    }
    handleSelectChange = (id, name) => {

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
        if (this.redirectToNewProduct) {
            return (
                <Redirect push to="/product" />
            )
        }

        const options = {
            onPageChange: this.handlePageChange,
            onSizePerPageList: this.handleSizePerPageChange,
            page: this.state.page,
            sizePerPage: this.state.sizePerPage,
            paginationPosition: 'top',
            defaultSortName: 'sku',
            defaultSortOrder: 'desc',
            clearSearch: true,
            withFirstAndLast: true,
            // sizePerPageList: [{
            //     text: '5', value: 5
            // }, {
            //     text: '10', value: 10
            // }]
        };

        return (
            <div className="">
                {/* <span className="glyphicon glyphicon-remove drawer-close" onClick={this.closeDrawer}></span> */}

                <div className='panel-container'>
                    <span className='panel-heading'>Product List</span>
                    <div>
                        <SaveButton Class_Name="m-r-10" disabled={this.selectedIds.length===0} buttonDisplayText={'Update Product'} handlerSearch={this.onUpdate}/>
                        <SaveButton Class_Name="btn-info" buttonDisplayText={'Add new'} handlerSearch={this.addNewProduct}/>
                    </div>
                </div>
                <div>
                    <BootstrapTable 
                        height='515' 
                        data={this.productList} 
                        options={options}
                        fetchInfo={{dataTotalSize: this.state.totalSize}}
                        selectRow={this.selectRowProp}
                        striped hover
                        remote
                        pagination={true} 
                        exportCSV={true} 
                        search={true} 
                        searchPlaceholder={'Search'}
                    >
                        <TableHeaderColumn width='100' dataField='sku' isKey={true} >SKU</TableHeaderColumn>
                        <TableHeaderColumn width='150' dataField='name' dataSort >
                            Product Name
                        </TableHeaderColumn>
                        <TableHeaderColumn width='50' dataField='currencyCode' >Currency Code</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='cPrice' dataSort searchable={true} >Cost Price</TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='sellingPrice' dataSort searchable={true} >Selling Price</TableHeaderColumn>
                        <TableHeaderColumn width='300' dataField='description' >Details</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    let { productsReducer, userRolesReducer } = state
    let { status } = productsReducer || '';
    let { isFetching } = productsReducer || false;
    let { type, productData } = productsReducer || [];
    let { retailerId, userId } = userRolesReducer['userRolesData'] ? userRolesReducer['userRolesData'] : {};
    return {
        status,
        isFetching,
        retailerId,        
        userId,
        type,
        productData
    }
}

export default connect(mapStateToProps)(ProductListContainer);
