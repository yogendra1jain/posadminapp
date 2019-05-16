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
import DineroInit from '../../Global/Components/DineroInit'
import FormDialog from '../../components/common/CommonDialog/index';
import FileUploadComp from './FileUploadComp';
import uploadDocument from '../../actions/Common/uploadDocument';
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
            searchText: ''
        }
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

    // componentWillReceiveProps(props) {
    //     if(!_isEmpty(props.productData) && !props.productData.message){
    //         this.setState({ totalSize: _get(props,'productData.result.count',0)})
    //         this.mapProducts(_get(props,'productData.result.products',[]))
    //     }
    // }

    componentDidMount(){
        this.searchProduct()
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

    // fetchPaginatedProducts = (page, sizePerPage) => {
    //     this.setState({ page, sizePerPage})
    //     const { dispatch, productsReducer } = this.props;
    //     let url = '/Product/Paginated/ByRetailerId';
    //     let reqBody = {
    //         id: localStorage.getItem('retailerID'),
    //         page,
    //         sizePerPage
    //     }
    //     dispatch(fetchProductLookupData(productsReducer,url, reqBody));
    // }

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

    onUpdate(){
        const {dispatch, productsReducer} = this.props;
        let selectedProduct = _filter(this.productList, product => {
            return product.id == this.selectedProduct.id
        })
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

    toggleDialog = () => {
        this.setState({
            openDialog: !this.state.openDialog,
        });
    }

    onDrop = (files) => {
        let url = '/Upload/ImportAll';
        if (files.length > 0) {
            this.setState({ file: files[0] })
            this.props.dispatch(uploadDocument(files[0], url, '', localStorage.getItem('retailerID'),'', 'Products'))
                .then(data => {
                    if(data.status == 200) {
                        this.fetchPaginatedProducts(this.state.page, this.state.sizePerPage)
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

    handleSearchChange = (searchText) => {
        this.setState({ searchText })
    }

    handleSearchbuttonClick = (searchText) => {
        this.setState({page: 1}, () => {
            this.searchProduct()
        })
    }

    handleClearSearchhBox = () => {
        this.setState({ searchText: ''}, () => {
            this.searchProduct()
        })
    }

    handleProductSearchResult = (data) => {
        this.mapProducts(_get(data,'products',[]))
        this.setState({productList: data.products, totalSize: data.total })
    }

    handleProductSearchError = (err) => {
        this.props.dispatch(showMessage({text: 'No Product Found.', isSuccess: false}))
    }

    handleKeyPress = (e, value) => {
        if (e.charCode == 13) {
            this.setState({page: 1}, () => {
                this.searchProduct()
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
            // sizePerPageList: [{
            //     text: '5', value: 5
            // }, {
            //     text: '10', value: 10
            // }]
        };

        return (
            <div className="">
                {/* <span className="glyphicon glyphicon-remove drawer-close" onClick={this.closeDrawer}></span> */}
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
                    <span className='panel-heading'>Product Master</span>
                    <div>
                        <SaveButton Class_Name="m-r-10" disabled={this.selectedIds.length===0} buttonDisplayText={'Update Product'} handlerSearch={this.onUpdate}/>
                        <SaveButton Class_Name="btn-info m-r-10" buttonDisplayText={'Add new'} handlerSearch={this.addNewProduct}/>
                        <SaveButton Class_Name="btn-info" buttonDisplayText={'Bulk Upload'} handlerSearch={() => this.toggleDialog()} />
                    </div>
                </div>
                <SearchBar
                    handleKeyPress={this.handleKeyPress}
                    placeholder="Search Products"                    
                    handleChange={this.handleSearchChange}
                    handleSearchbuttonClick = {this.handleSearchbuttonClick}
                    value={this.state.searchText}
                    onClear={this.handleClearSearchhBox}
                />
                <span style={{paddingTop: '20px',fontSize: '1.6em'}}>Result: {this.state.totalSize}</span>
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
