import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
import _find from 'lodash/find';
/* Material import */
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import SaveIcon from '@material-ui/icons/SaveOutlined'
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import amber from '@material-ui/core/colors/amber';
/* Redux Imports */
import { connect } from 'react-redux';
/* Component Imports */
import SearchBar from './Component/SearchBar';
import HotProducts from './Component/HotProducts';
import SearchResult from './Component/SearchResult'
//Data imports
import genericPostData from '../../Global/DataFetch/genericPostData';
import AutoComplete from '../../components/Elements/AutoComplete';
import ConfirmationDialog from './Component/ConfirmationDialog';
import PaginationComp from './Component/Pagination';





const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        fontSize:'1em !important'
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
    failure: {
        background: 'red',
        fontSize: '1.4rem'
    },
});

class HotProductContainer extends React.Component {

    constructor() {
        super();
        this.state = {
            searchResult: [],
            hotProducts: [],
            storeList: [],
            selectedStore: {},
            offset: 0,
            limit: 10,
            current: 1
        }
        this.draggedHotProductList = []
    }

    componentDidMount() {
        let reqObj = { retailerId: localStorage.getItem('retailerID') }
        genericPostData({
            url: '/Store/ByRetailerId',
            dispatch: this.props.dispatch,
            reqObj: { id: localStorage.getItem('retailerID') },
            identifier: 'STORE_BY_RETAILER_ID_GET',
            dontShowMessage: true,
            successCb: this.stById
        })
    };
    stById = (data) => {
        let storeList = data.map(store => {
            let tempStore = {};
            tempStore.displayText = store.name;
            tempStore.value = store.id;
            return tempStore;
        });
        this.setState({ storeList })
    }
    handleSelectChange = (id, name) => {
        if (id == null) {
            this.selectedStore = {}
            this.inventoryList = []
            return;
        } else {
            let selectedStore = _find(this.state.storeList, { value: id })
            this.setState({ selectedStore, showBar: true })
        }
        genericPostData({
            url: '/HotProducts/ByStore/Get',
            dispatch: this.props.dispatch,
            reqObj: { id },
            identifier: 'HOT_PRODUCT_GET',
            dontShowMessage: true,
            successCb: this.hotProductGetResult
        });
    }
    hotProductGetResult = (data) => {
        this.setState({ hotProducts: _get(data, 'products', []) })
    }

    searchProduct = (value) => {
        let reqObj = {
            "text": value,
            "offset": 0,
            "limit": 10,
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
            identifier: 'HOT_PRODUCT_SEARCH',
            dontShowMessage: true,
            successCb: this.spResult
        })
    }
    handleKeyPress = (e, value) => {
        debugger;
        if (e.charCode == 13) {
            this.setState({ searchInput: value })
            let reqObj = {
                "text": value,
                "offset": this.state.offset,
                "limit": this.state.limit,
                "filters": [
                    {
                        "field": "retailerId",
                        "value": localStorage.getItem('retailerID')
                    }
                ]
            }
            this.searchProduct(value);

        }
    }

    spResult = (data) => {
        console.log(data, "datadatadata");
        if (_get(data, 'products', []).length == 0) {
            this.setState({ open: true, message: 'No Product Found' });
        }
        this.setState({ total: data.total, searchResult: _get(data, 'products', []) })
    }
    handleSearchChange = (value) => {
        this.setState({ searchText: value });
        //this.searchProduct(value);

    }

    draggedHotProductListSaveFun = (hotProducts) => {
        this.setState({ hotProducts })
    }
    addToHotProductList = (product, index) => {
        //check wheather product already added or not
        if (_find(this.state.hotProducts, { id: product.id })) {
            this.setState({ open: true, message: 'Product Already In The List' });
            return;
        }

        let hotProducts = [...this.state.hotProducts];
        hotProducts.push(product);
        let searchResult = [...this.state.searchResult];
        searchResult.splice(index, 1)
        this.setState({ hotProducts, searchResult })
    }
    handleSaveHotProducts = () => {
        let productIds = this.state.hotProducts.map((hl) => hl.id)
        let reqObj = { storeId: _get(this.state, 'selectedStore.value'), productIds };
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj,
            url: '/HotProducts/Save',
            identifier: 'HOT_PRODUCTS_SAVE',
            successCb: (data) => { debugger; }
        })
    }
    confirmDelete = () => {
        this.state.hotProducts = []
        this.setState({ hotProducts: this.state.hotProducts, diaOpen: false });
        this.handleSaveHotProducts();
    }
    aClicked = () => {
        this.setState({ showBar: false })
    }

    //pagination action start here
    onShowSizeChange = (current, pageSize) => {
        this.state.offset = ((current - 1) * pageSize)
        this.state.limit = pageSize;
        this.searchProduct(this.state.searchText);
        this.setState({ offset: this.state.offset, limit: this.state.limit, current: current })

    }
    onPageChange = (current, pageSize) => {
        this.state.offset = ((current - 1) * pageSize);
        debugger;
        this.state.limit = pageSize;
        console.log(this.state.searchText,"this.state.searchTextthis.state.searchText")
        this.searchProduct(this.state.searchText);
        this.setState({ offset: this.state.offset, limit: this.state.limit, current: current })
    }
    //pagination action end here
    render() {
        let { classes } = this.props
        return (
            <div class="container-fluid">
                <div class="row content">
                    {_get(this.state, 'showBar', false) ? <div class="col-sm-6 mbottom20">
                        <SearchBar
                            handleKeyPress={this.handleKeyPress}
                            placeholder={`Search Products For ${_get(this.state, 'selectedStore.displayText', '')}`}
                            handleChange={this.handleSearchChange}
                        />
                        <a onClick={this.aClicked} style={{ fontSize: '1.6rem' }}>
                            <span>{_get(this.state, 'selectedStore.displayText', '')}</span>
                        </a>
                    </div> :
                        <div className="col-sm-6 mbotton20">
                            <label>Select Store</label>
                            <AutoComplete
                                type="single"
                                data={this.state.storeList}
                                name="stores"
                                value={_get(this.state, 'selectedStore.value', '')}
                                changeHandler={(id, name) => { this.handleSelectChange(id, name) }}
                            />
                        </div>}
                    <div class="col-sm-6 d-flex justify-flex-end mbottom20">
                        <Button
                            disabled={!this.state.showBar}
                            onClick={this.handleSaveHotProducts} variant="contained" color="primary" className={classes.button}>
                            Save Hot Products
                        <SaveIcon className={classes.rightIcon} />
                        </Button>
                        <Button onClick={() => this.setState({ diaOpen: true })} disabled={!this.state.showBar}
                            variant="contained" color="primary" className={classes.button}>
                            Delete All
                         <DeleteIcon className={classes.rightIcon} />
                        </Button>
                    </div>
                </div>
                <div class="row content">

                    <div class="col-sm-6">
                        <div style={{maxHeight:'450px', overflowY:'scroll'}}>
                            <SearchResult
                                searchResult={this.state.searchResult}
                                addToHotProductList={this.addToHotProductList}
                            />
                        </div>

                       {this.state.total>0 ?<div style={{padding:'7px',fontSize:'1.4rem'}}>
                            <PaginationComp
                                current={this.state.current}
                                onShowSizeChange={this.onShowSizeChange}
                                onChange={this.onPageChange}
                                total={this.state.total}
                            />
                        </div>:null}

                    </div>

                    <div class="col-sm-6"  style={{maxHeight:'450px', overflowY:'scroll'}}>
                        <HotProducts
                            draggedHotProductListSaveFun={this.draggedHotProductListSaveFun}
                            hotProducts={this.state.hotProducts}
                        />
                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={this.state.open}
                    className={classes.error}
                    style={{ fontSize: '1.4rem' }}
                    autoHideDuration={3000}
                    onClose={() => this.setState({ open: false })}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                        classes: {
                            root: classes.failure
                        }
                    }}
                    message={<span id="message-id">{this.state.message}</span>}
                />
                <ConfirmationDialog
                    open={this.state.diaOpen}
                    handleClose={() => this.setState({ diaOpen: false })}
                    handleSubmit={this.confirmDelete}
                    text={'Are You sure You want to delete all the hot products'}
                    title="Confirmation"
                />
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(withStyles(styles)(HotProductContainer));