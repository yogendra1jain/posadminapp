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
import _cloneDeep from 'lodash/cloneDeep';
import _findIndex from 'lodash/findIndex';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { fetchProductLookupData, requestProductUpdate } from '../../actions/products';
import DineroInit from '../../Global/Components/DineroInit'
import FormDialog from '../../components/common/CommonDialog/index';
import FileUploadComp from '../../Global/Components/FileUploadComp';
import { showMessage } from '../../actions/common';
import genericPostData from '../../Global/DataFetch/genericPostData';
import SearchBar from '../HotProduct/Component/SearchBar';
class ProductListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            totalSize: 0,
            page: 1,
            sizePerPage: 10,
            openDialog: false,
            file: {},
            searchText: '',
            isLoading: false,
            isError: false,
            successLines: 0,
            successText: ''
        }
        this.onUpdate = this.onUpdate.bind(this);
        this.selectRowProp = {
            mode: 'checkbox',
            clickToSelect: false,
            onSelect: this.onRowSelect,
            bgColor: '#ffffff',
            selected : this.state.selectedIds,
            onSelectAll: this.onSelectAll
        }
        this.redirectToNewProduct = false;
        this.addNewProduct = this.addNewProduct.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this)
        this.productList = [];
        this.selectedIds = [];
        this.selectedInfo = {};
        this.selectedProduct = [];
        this.isAdmin =  localStorage.getItem('role')==='Admin';
    }

    componentDidMount(){
        this.searchProduct()
    }

    searchProduct = ()=>{
        let reqObj = {
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
        genericPostData({
            url: '/Search/Products',
            dispatch: this.props.dispatch,
            reqObj,
            identifier: 'PRODUCT_SEARCH',
            dontShowMessage: true,
            successCb: this.handleProductSearchResult,
            errorCb: this.handleProductSearchError
        })
    }

    handleProductSearchResult = (data) => {
        if(_isEmpty(data)) {
            this.props.dispatch(showMessage({text: 'No Product Found', isSuccess: false}))
        } else {
            this.mapProducts(_get(data,'products',[]))
        }
        this.setState({productList: data.products, totalSize: data.total })
    }

    mapProducts = (productList) => {
        this.productList = [];
        productList.map(product=>{
            let prod = {};
            prod = product
            prod.sellingPrice = DineroInit(_get(product,'salePrice.amount',0)).toFormat('$0,0.00');
            prod.cPrice = DineroInit(_get(product,'costPrice.amount',0)).toFormat('$0,0.00');
            prod.currencyCode = _get(product,'salePrice.','');
            this.productList.push(prod);
        });
        this.forceUpdate();
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

    onUpdate(){
        const {dispatch, productsReducer} = this.props;
        let selectedProduct = _filter(this.productList, product => {
            return product.id == this.selectedProduct[0].id
        })
        dispatch(requestProductUpdate(productsReducer, selectedProduct[0]));
        this.redirectToNewProduct = true;
    }

    onRowSelect = (row, isSelected, e) => {
        isSelected ? this.selectedIds.push(row.id) : _pull(this.selectedIds, row.id);
        let selectedProducts = _cloneDeep(this.selectedProduct);
        if (isSelected) {
            selectedProducts.push(row)
        } else {
            let index = _findIndex(selectedProducts, { 'id': row.id });
            if (index !== -1) {
                selectedProducts.splice(index, 1);
            }
        }
        this.selectRowProp.selected = this.state.selectedIds;
        this.selectedProduct = selectedProducts;
        this.forceUpdate()
        console.log(this.selectedIds, 'this.selectedIds')
    }

    onSelectAll = (isSelected, rows) => {
        let selectedIds = this.selectedIds
        let selectedProducts = _cloneDeep(this.selectedProduct)
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
        this.selectedProduct = selectedProducts
        this.selectedIds = selectedIds
        this.forceUpdate()
    }

    addNewProduct() {
        this.redirectToNewProduct = true;
        this.forceUpdate();
    }

    toggleDialog = () => {
        this.setState({
            openDialog: !this.state.openDialog,
            successLines: 0,
            errorLines: []
        });
    }

    csvUploadSuccess = (data) => {
        this.setState({ 
            successLines: _get(data,'successLines',0),
            errorLines: _get(data,'errorLines',[]),
            successText: 'Uploaded Successfully!',
            page: 1,
            isLoading: false
        }, () => {
            this.searchProduct()
        })
    }

    csvUploadError = (err) => {
        this.setState({ isLoading: false, isError: true })
    }

    onDrop = (files) => {
        this.setState({ isLoading: true })
        let url = '/Upload/ImportAll';
        if (files.length > 0) {
            this.setState({ file: files[0] })
            const formData = new FormData();
            formData.append('file', files[0]);
            formData.append('retailerId', localStorage.getItem('retailerID'))
            formData.append('createdBy', localStorage.getItem('userName'))
            formData.append('entity', 'Products')
            genericPostData({
                dispatch: this.props.dispatch,
                reqObj: formData,
                url,
                successText: this.state.successText,
                identifier: 'product_csv_upload',
                successCb: this.csvUploadSuccess,
                errorCb: this.csvUploadError,
            })
        }
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
            onSearchChange: this.handleSearchChange,
            onChange: this.onChange,
            onPageChange: this.handlePageChange,
            onSizePerPageList: this.handleSizePerPageChange,
            page: this.state.page,
            sizePerPage: this.state.sizePerPage,
            paginationPosition: 'top',
            defaultSortName: 'sku',
            defaultSortOrder: 'desc',
            clearSearch: true,
            withFirstAndLast: true,
        };

        return (
            <div className="">
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
                            isLoading={this.state.isLoading}
                            isError={this.state.isError}
                            successLines={this.state.successLines}
                            errorLines={this.state.errorLines}
                            entity="Product"
                        />
                    }
                />
                <div className='panel-container'>
                    <span className='panel-heading'>Product Master</span>
                    <div>
                        <SaveButton Class_Name="m-r-10" disabled={this.selectedIds.length===0 ||this.selectedIds.length > 1} buttonDisplayText={'Update Product'} handlerSearch={this.onUpdate}/>
                        <SaveButton Class_Name="btn-info m-r-10" buttonDisplayText={'Add new'} handlerSearch={this.addNewProduct}/>
                        <SaveButton Class_Name="btn-info" buttonDisplayText={'Bulk Upload'} handlerSearch={() => this.toggleDialog()} />
                    </div>
                </div>
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
                        // search={true}
                        multiColumnSearch={ true }
                    >
                        <TableHeaderColumn width='100' dataField='sku' isKey={true} >SKU</TableHeaderColumn>
                        <TableHeaderColumn width='150' dataField='name' dataSort >
                            Product Name
                        </TableHeaderColumn>
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
