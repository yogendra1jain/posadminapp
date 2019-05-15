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





const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
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
            selectedStore: {}
        }
        this.draggedHotProductList = []
    }

    componentDidMount() {
        let reqObj = { retailerId: localStorage.getItem('retailerID') }
        genericPostData({
            url: '/HotProducts/ByRetailer/Get',
            dispatch: this.props.dispatch,
            reqObj,
            identifier: 'HOT_PRODUCT_GET',
            dontShowMessage: true,
            successCb: this.hotProductGetResult
        });
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
        debugger;
        let storeList = data.map(store => {
            let tempStore = {};
            tempStore.displayText = store.name;
            tempStore.value = store.id;
            return tempStore;
        });
        this.setState({ storeList })
    }
    handleSelectChange = (id, name) => {
        debugger;
        if (id == null) {
            this.selectedStore = {}
            this.inventoryList = []
            return;
        } else {
            let selectedStore = _find(this.state.storeList, { value: id })
            this.setState({ selectedStore, showBar: true })
        }
    }
    hotProductGetResult = (data) => {
        debugger;
        this.setState({ hotProducts: _get(data, 'products', []) })
    }
    handleKeyPress = (event) => {
        let reqObj = {
            id: localStorage.getItem('retailerID'),
            page: 1,
            sizePerPage: 10

        }
        genericPostData({
            url: '/Product/Paginated/ByRetailerId',
            dispatch: this.props.dispatch,
            reqObj,
            identifier: 'HOT_PRODUCT_SEARCH',
            dontShowMessage: true,
            successCb: this.hotProductSearchResult
        })
    }

    hotProductSearchResult = (data) => {
        console.log(data, "datadatadata");
        this.setState({ searchResult: _get(data, 'result.products') })
    }
    handleSearchChange = (event) => {

    }

    draggedHotProductListSaveFun = (hotProducts) => {
        this.setState({ hotProducts })
    }
    addToHotProductList = (product, index) => {
        debugger;
        //check wheather product already added or not
        if (_find(this.state.hotProducts, { id: product.id })) {
            this.setState({ open: true });
            return;
        }

        let hotProducts = [...this.state.hotProducts];
        hotProducts.push(product);
        let searchResult = [...this.state.searchResult];
        searchResult.splice(index, 1)
        this.setState({ hotProducts, searchResult })
    }
    handleSaveHotProducts = () => {
        let productIds = this.draggedHotProductList.map((hl) => hl.id)
        let reqObj = { storeId: '31d5952e-619f-4b02-9fd8-0f620e1fa222', productIds };
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj,
            url: '/HotProducts/Save',
            identifier: 'HOT_PRODUCTS_SAVE',
            successCb: (data) => { debugger; }
        })
    }
    aClicked = () => {
        this.setState({ showBar: false })
    }
    render() {
        let { classes } = this.props
        return (
            <div class="container-fluid">
                <div class="row content">
                    {_get(this.state, 'showBar', false) ? <div class="col-sm-6 mbottom20">
                        <SearchBar
                            handleKeyPress={this.handleKeyPress}
                            placeholder={`Search Products For ${_get(this.state, 'selectedStore.displayText', '')}`}
                            onChange={this.handleSearchChange}
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
                        <Button disabled={!this.state.showBar}
                            variant="contained" color="primary" className={classes.button}>
                            Delete All
                         <DeleteIcon className={classes.rightIcon} />
                        </Button>
                    </div>
                </div>
                <div class="row content">

                    <div class="col-sm-6">
                        <SearchResult
                            searchResult={this.state.searchResult}
                            addToHotProductList={this.addToHotProductList}
                        />
                    </div>

                    <div class="col-sm-6">
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
                    message={<span id="message-id">Product Already In The List </span>}
                />
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(withStyles(styles)(HotProductContainer));