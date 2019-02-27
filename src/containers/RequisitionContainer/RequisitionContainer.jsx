import React, { PureComponent } from 'react';
/* Material Imports */
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
/* Lodash Imports */
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _set from 'lodash/set';
import _pull from 'lodash/pull';
import _isArray from 'lodash/isArray';
import _cloneDeep from 'lodash/cloneDeep';
import _findIndex from 'lodash/findIndex';
/* Redux Imports */
import { showMessage } from '../../actions/common';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
// import asyncValidate from './validate';
/* Component Imports */
import AddRequisitionForm from './components/AddRequisitionComp';
import SaveButton from '../../components/common/SaveButton.jsx'
import FormDialog from '../../components/common/CommonDialog/index';
import EditRequisition from './components/EditRequisition.jsx';
import { fetchRequisitionList, saveRequisitionForm } from '../../actions/vendor';


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
            forEdit: false,
            selectedRequisitions: [],
        }
        this.selectRowProp = {
            mode: 'checkbox',
            clickToSelect: false,
            onSelect: this.onRowSelect,
            // onSelectAll: this.onSelectAll,
            bgColor: '#ffffff',
            // selected : this.selectedIds,
        }
        this.selectedIds = [];
    }

    onRowSelect = (row, isSelected, e) => {
        isSelected ? this.selectedIds.push(row.id) : _pull(this.selectedIds, row.id);
        let selectedRequisitions = _cloneDeep(this.state.selectedRequisitions);
        // this.handleAllChecks();        
        if (isSelected) {
            selectedRequisitions.push(row)
        } else {
            let index = _findIndex(selectedRequisitions, { 'id': row.id });
            if (index !== -1) {
                selectedRequisitions.splice(index, 1);
            }
        }
        this.selectRowProp.selected = this.selectedIds;
        this.setState({
            selectedRequisitions,
        });
    }

    handleChangeInput = (e, index, proposedQuantity) => {
        let value = _get(e, 'target.value', '');
        let selectedRequisitions = _cloneDeep(this.state.selectedRequisitions);
        _set(selectedRequisitions[index], 'quantity', value);
        _set(selectedRequisitions[index], 'proposedQuantity', proposedQuantity);
        this.setState({
            selectedRequisitions,
        });
    }

    componentDidMount() {
        this.fetchBasicDetails();
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

    handleSubmitHandler = (index, forAll, selProd) => {
        let data = {};
        let values = {};
        let url = `/Requisition/Save`
        if (forAll) {
            url = `/Requisition/SaveAll`;
            _get(this, `state.selectedRequisitions`, []).map((requ) => {
                requ.quantity = Number(requ.quantity);
                delete requ.proposedQuantity;
            })
            data = { requisitions: [..._get(this, `state.selectedRequisitions`, [])] }
        } else {
            values = _get(this, `state.selectedRequisitions[${index}]`, {})
            data = { ...values };
            data.quantity = Number(data.quantity);
            delete data.proposedQuantity;
        }
        this.saveRequisition(data, url);
    }

    saveRequisition = (data, url) => {
        this.props.dispatch(saveRequisitionForm('', url, data))
            .then((data) => {
                console.log('requisition is saved successfully.');
                this.fetchBasicDetails();
                this.setState({
                    forEdit: false,
                    showDialog: false,
                })
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
    handleEdit = () => {
        this.setState({
            forEdit: true,
        })
    }
    handleCancel = () => {
        this.setState({
            forEdit: false,
        })
    }


    render() {
        const { classes } = this.props;
        const { forEdit, selectedRequisitions } = this.state

        return (
            <form>
                <FormDialog
                    open={this.state.showDialog}
                    handleClose={this.toggleDialog}
                    title={'Add New'}
                    fullScreen={false}
                    fullWidth={true}
                    dialogContent={
                        <AddRequisitionForm
                            storeList={this.props.storeList}
                            handleSubmitHandler={this.saveRequisition}
                            classes={classes}
                        />
                    }
                />
                <div >
                    {
                        !forEdit &&
                        <div className='panel-container'>
                            <span className='panel-heading'>Requisition List</span>

                            <div>
                                
                                <SaveButton Class_Name={"btn-info"} buttonDisplayText={'+ New Requisition'} handlerSearch={this.toggleDialog}/>
                                <SaveButton Class_Name={"btn-info"} buttonDisplayText={'Edit'} handlerSearch={this.handleEdit}/>
                            </div>

                        </div>
                    }
                    <EditRequisition
                        forEdit={forEdit}
                        handleChangeInput={this.handleChangeInput}
                        handleSubmitHandler={this.handleSubmitHandler}
                        selectRowProp={this.selectRowProp}
                        handleCancel={this.handleCancel}
                        requisitions={forEdit ? selectedRequisitions : _get(this.props, 'requisitionListData', [])}
                        requisitionListData={_get(this.props, 'requisitionListData', [])}
                    />

                </div>
            </form>
        )
    }
}

RequisitionContainer = reduxForm({
    form: 'RequisitionContainer',
    enableReinitialize: true,
    destroyOnUnmount: true,
    // asyncValidate
})(RequisitionContainer)

const mapStateToProps = state => {
    let { form, vendorsReducer, productsReducer, storesReducer } = state

    let { productsFromCache } = productsReducer || [];

    let { requisitionListData } = vendorsReducer || [];
    let { vendorProductsData } = productsReducer || [];
    let vendorProductsList = [];

    let { isFetching } = vendorsReducer || false;

    return {
        requisitionListData,
        isFetching,
        productsFromCache,
        vendorProductsList,
        vendorProductsData,
    }
}

export default connect(mapStateToProps)((withStyles(styles)(RequisitionContainer)))
