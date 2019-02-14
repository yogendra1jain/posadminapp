import React, { PureComponent } from 'react';
/* Material Imports */
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
/* Lodash Imports */
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _set from 'lodash/set';
import _isArray from 'lodash/isArray';
import _uniq from 'lodash/uniq';
/* Redux Imports */
import { showMessage } from '../../actions/common';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, isDirty, isValid } from 'redux-form';
// import asyncValidate from './validate';
/* Component Imports */
import ViewRequisition from './components/ViewRequisition.jsx';
import EditRequisition from './components/EditRequisition.jsx';
import { fetchRequisitionList, saveRequisitionForm } from '../../actions/vendor';
import { fetchVendorProducts, fetchRetailerProducts, fetchProductsFromCache, updateVendorProductsList, updateVendorsList } from '../../actions/products';
import { getVendorData } from '../../actions/vendor';
import { fetchStore } from '../../actions/store';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});


class RequisitionContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            onEditClick: false,
            cachedProducts: [],
            showDialog: false,
        }
    }

    componentDidMount() {
        this.fetchBasicDetails();
        let reqObj = {
            id: localStorage.getItem('retailerID')
        }
        let url = `/Vendor/ByRetailerId`;
        let posProductUrl = `/Product/ByRetailerId`;
        let vendorProdUrl = `/VendorProduct/GetByRetailerId`;
        let storeUrl = '/Store/ByRetailerId';
        this.props.dispatch(getVendorData('', url, reqObj))
        this.props.dispatch(fetchRetailerProducts('', posProductUrl, reqObj))
        const { dispatch, storesReducer } = this.props;
        dispatch(fetchStore(storesReducer, storeUrl, reqObj));

        this.fetchVendorProducts(vendorProdUrl, reqObj);
    }
    fetchVendorProducts = (vendorProdUrl, reqObj) => {
        this.props.dispatch(fetchVendorProducts('', vendorProdUrl, reqObj))
            .then((data) => {
                console.log('came in then of vendorproduct service call.');
                let productIds = [];
                let vendorIds = [];
                !_isEmpty(data) && _isArray(data) && data.map((value) => {
                    productIds.push(value.posProductId);
                    vendorIds.push(value.vendorId);
                })
                this.getProductsFromCache(_uniq(productIds), _uniq(vendorIds));
            }, (err) => {
                console.log('err', err);
                this.props.dispatch(showMessage({ text: `${JSON.stringify(err)}`, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 5000);
            })
    }


    getProductsFromCache = (prodIds, vendorIds) => {
        let productsUrl = `/Product/GetByIds`;
        let data = {
            ids: prodIds,
        };
        this.props.dispatch(fetchProductsFromCache('', productsUrl, data))
            .then((data) => {
                this.setState({
                    cachedProducts: data,
                });
                this.props.dispatch(updateVendorProductsList('', data));
                let vendorsUrl = `/Vendor/GetByIds`;
                let req = {
                    ids: vendorIds,
                };
                this.props.dispatch(fetchProductsFromCache('', vendorsUrl, req))
                    .then((data) => {
                        this.setState({
                            cachedVendors: data,
                        });
                        this.props.dispatch(updateVendorsList('', data));
                    }, (err) => {
                        console.log('err while fetching products from cache', err);
                    })
            }, (err) => {
                console.log('err while fetching products from cache', err);
            })
    }
    fetchBasicDetails = () => {
        let requisitionUrl = `/Requisition/GetByCriteria`;
        let reqObj = {
            statuses: [0],
            id: localStorage.getItem('retailerID'),
        };
        this.props.dispatch(fetchRequisitionList('', requisitionUrl, reqObj))
            .then((data) => {
                console.log('requisition list fetched successfully.');
            }, (err) => {
                console.log('error while fetching requisition list', err);
                this.props.dispatch(showMessage({ text: `${JSON.stringify(err)}`, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 5000);
            })
    }
    toggleEditState = () => {
        this.setState({
            onEditClick: !this.state.onEditClick,
        });
    }
    saveRequisitionChanges = () => {
        let url = `/Requisition/SaveAll`;

        this.props.dispatch(saveRequisitionForm('', url, { requisitions: [...this.props.members] }))
            .then((data) => {
                this.fetchBasicDetails();
                this.setState({ onEditClick: false, showDialog: false })
            }, (err) => {
                this.props.dispatch(showMessage({ text: `${JSON.stringify(err)}`, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 5000);
            });
    }
    handleSubmitHandler = (values, selProd) => {
        let data = { ...values };
        if (this.state.addNew) {
            data.posProductId = selProd.posProductId;
            data.vendorId = selProd.vendorId;
            data.retailerId = selProd.retailerId;
            _set(data, 'createdTime.seconds', new Date().getTime());
        }
        console.log('data to be saved', data);
        let url = `/Requisition/Save`
        this.props.dispatch(saveRequisitionForm('', url, data))
            .then((data) => {
                console.log('requisition is saved successfully.');
                this.fetchBasicDetails();
                this.toggleDialog();
                // this.props.toggleEditState();
            }, (err) => {
                console.log('err while saving requisition form', err);
                this.props.dispatch(showMessage({ text: `${JSON.stringify(err)}`, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 5000);
            })
    }

    toggleDialog = (addNew) => {
        this.setState({
            showDialog: !this.state.showDialog,
            addNew: addNew,
        });
    }

    render() {
        const { classes, initialValues, dirty, valid, requisitionListData, vendorProductsList, storeList } = this.props;
        const { onEditClick, cachedVendors, cachedProducts } = this.state

        return (
            <form>
                <div style={{ padding: "20px" }}>
                    <div className='panel-container'>
                        <span className='panel-heading'>Requisition List</span>
                        {
                            // onEditClick &&
                            <div>
                                {/* <Button color="primary" className={classes.button} onClick={() => this.toggleEditState()}>Cancel</Button> */}
                                <Button variant="outlined" color="primary" className={classes.button} onClick={() => this.toggleDialog(true)}>+ New Requisition</Button>
                            </div>
                            // :
                            // <Button variant="outlined" color="primary" className={classes.button} onClick={() => { this.setState({ onEditClick: true }) }}>Edit</Button>
                        }
                    </div>
                    {
                        // onEditClick ?
                        //     <FieldArray
                        //         name="members"
                        //         component={EditRequisition}
                        //         initialValues={initialValues}
                        //         requisitionList={requisitionListData}
                        //         toggleEditState={this.toggleEditState}
                        //         fetchBasicDetails={this.fetchBasicDetails}
                        //     />
                        //     :
                        <ViewRequisition
                            isFetching={this.props.isFetching}
                            cachedVendors={cachedVendors}
                            handleSubmitHandler={this.handleSubmitHandler}
                            productsFromCache={cachedProducts}
                            vendorProductsList={vendorProductsList}
                            toggleDialog={this.toggleDialog}
                            storeList={storeList}
                            vendorProductsData={this.props.vendorProductsData}
                            addNew={this.state.addNew}
                            showDialog={this.state.showDialog}
                            requisitionList={_get(this.props, 'requisitionListData', [])}
                        />
                    }

                </div>
            </form>
        )
    }
}

const getRequisitionStatus = (status) => {
    let statusValue = '';
    switch (status) {
        case 0:
            statusValue = 'SCRATCH';
            break
        case 1:
            statusValue = 'CAPTURED';
            break
        case 2:
            statusValue = 'REJECTED';
            break
        case 3:
            statusValue = 'COMPLETE';
            break
        default:
            statusValue = 'SCRATCH';
            break;
    }
    return statusValue;
}

RequisitionContainer = reduxForm({
    form: 'RequisitionContainer',
    enableReinitialize: true,
    destroyOnUnmount: true,
    // asyncValidate
})(RequisitionContainer)

const mapStateToProps = state => {
    let { boxReducer, form, vendorsReducer, productsReducer, storesReducer } = state

    let { boxTypeList } = boxReducer || [];
    let { productsFromCache } = productsReducer || [];
    let { boxConversionList } = boxReducer || [];

    let { requisitionListData } = vendorsReducer || [];
    let { vendorProductsData } = productsReducer || [];
    let vendorProductsList = [];
    let { storeData } = storesReducer || [];
    let storeList = [];

    let { isFetching } = vendorsReducer || false;
    let { members } = _get(form, 'fieldArrays.values') || []
    let initialValues = { members: [] };
    let dirty = isDirty('fieldArrays')(state);
    let valid = isValid('fieldArrays')(state);

    // console.log('storeData', storeData, 'prod  data',vendorProductsData);


    (requisitionListData || []).map((values, index) => {
        let obj = {}
        obj = {
            vendorId: values.vendorId,
            posProductId: values.posProductId,
            vendorProductId: values.vendorProductId,
            storeId: values.storeId,
            quantity: values.quantity,
            status: getRequisitionStatus(values.status),
        }
        initialValues = { members: [...initialValues.members, obj] }
    })
    _isArray(storeData) && !_isEmpty(storeData) && storeData.map((data, index) => {
        storeList.push(
            {
                value: data.id,
                label: data.name,
            }
        )
    })

    !_isEmpty(vendorProductsData) && _isArray(vendorProductsData) && vendorProductsData.map((data, index) => {
        vendorProductsList.push(
            {
                value: data.id,
                label: data.productName,
            }
        )
    })
    return {
        boxTypeList,
        boxConversionList,
        initialValues,
        members,
        dirty,
        valid,
        requisitionListData,
        isFetching,
        productsFromCache,
        vendorProductsList,
        storeList,
        vendorProductsData,
    }
}

export default connect(mapStateToProps)((withStyles(styles)(RequisitionContainer)))
