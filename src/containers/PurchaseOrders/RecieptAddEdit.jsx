import React from 'react';
import "bootstrap/dist/css/bootstrap.css";

import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';
import { withStyles } from '@material-ui/core/styles';

// import Category from './category';
import { showMessage } from '../../actions/common';
import FormDialog from '../../components/common/CommonDialog/index';
import EditRequisition from '../RequisitionContainer/components/EditRequisition.jsx';

import { saveRequisitionForm } from '../../actions/vendor';
import { fetchPurchaseOrderById, requestPORecieptRequisitionUpdate, purchaseOrderSave } from '../../actions/purchaseOrder';
import SaveButton from '../../components/common/SaveButton';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class RecieptAddEdit extends React.Component {
    constructor(props) {
        super(props);
        let { params } = this.props.match;
        this.state = {
            selectedValue: '',
            params: params,
        };
    }


    componentDidMount() {
        let reqObj1 = {
            id: _get(this.state, 'params.id', ''),
        }
        let url1 = `/PurchaseOrder/Bloated`;
        this.props.dispatch(fetchPurchaseOrderById('', url1, reqObj1))
            .then((data) => {
                console.log('data fetched purchaseOrderById', data);
            }, (err) => {
                this.props.dispatch(showMessage({ text: `${JSON.stringify(err)}`, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 5000);

            })
            .catch((err) => {
                this.props.dispatch(showMessage({ text: `${JSON.stringify(err)}`, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 5000);
            })
    }

    handleSelectChange = (id, name) => {

    }

    onApproveReject = (isReject) => {
        let url = `/PurchaseOrder/Approve`;
        if (isReject) {
            url = `/PurchaseOrder/Reject`
        }
        let data = {
            id: _get(this.state, 'params.id', ''),
        }
        this.props.dispatch(purchaseOrderSave('', url, data))
            .then((data) => {
                this.props.history.push('/purchaseorders');
            }, (err) => {
                console.log('err while approving PO', err);
                this.props.dispatch(showMessage({ text: `${JSON.stringify(err)}`, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 5000);
            })
    }
    onReject = (row) => {

    }
    handleChangeInput = (e, index, proposedQuantity) => {
        let value = _get(e, 'target.value', '');
        this.props.dispatch(requestPORecieptRequisitionUpdate('', value, index, proposedQuantity));
    }

    handleSubmitHandler = () => {
        console.log('saved')
    }

    handleSave = () => {
        let values = _get(this, `props.purchaseOrderById.requisitions`, [])
        let data = {}
        data.purchaseOrderId = _get(this, `props.purchaseOrderById.order.id`, '');
        data.requisitions = values;

        console.log('data to be saved', data);
        let url = `/PurchaseOrder/Receipt`
        this.props.dispatch(saveRequisitionForm('', url, data))
            .then((data) => {
                console.log('reciept is saved successfully.');
                this.props.dispatch(showMessage({ text: `Receipt Created.`, isSuccess: true }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 5000);
                this.props.history.push('/purchaseorders');
                // this.props.toggleEditState();
            }, (err) => {
                console.log('err while saving requisition form', err);
                this.props.dispatch(showMessage({ text: `${JSON.stringify(err)}`, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 5000);
            })
    }
    handleCancel = () => {
        this.props.history.push('/purchaseorders');
    }

    toggleDialog = () => {
        this.setState({
            openDialog: !this.state.openDialog,
        });
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
        const { purchaseOrderById, isPOViewFlag, isReceiptFlag } = this.props;
        return (
            <div className="">
                <div className='panel-container'>
                    <span className='panel-heading'>Receipt Details </span>
                </div>
                <FormDialog
                    open={this.state.openDialog}
                    handleClose={this.toggleDialog}
                    title={'Confirm'}
                    fullScreen={false}
                    fullWidth={true}
                    dialogContent={
                        <div>
                            <span>Are You Sure To Reject.</span>
                            <div className="form-btn-group">
                                <SaveButton Class_Name="m-r-10" buttonDisplayText={'Reject'} handlerSearch={() => this.onApproveReject(true)} />
                                <SaveButton Class_Name="m-r-10" buttonDisplayText={'Cancel'} handlerSearch={() => this.toggleDialog()} />
                            </div>
                        </div>
                    }
                />
                <div>
                    {
                        <div className="form-btn-group">
                            
                            <SaveButton Class_Name="m-r-10" buttonDisplayText={'Cancel'} handlerSearch={() => this.handleCancel()} />
                            {
                                !isPOViewFlag &&
                                <SaveButton Class_Name="btn-info" buttonDisplayText={'Save'} handlerSearch={() => this.handleSave()} />
                            }
                            {/* <Button type="button" variant="raised" onClick={() => this.printPDF()}>Export PDF</Button> */}
                        </div>
                    }
                    <div id="divToPrint">
                        <div className="row" style={{ marginTop: '25px' }}>
                            <div className="col-sm-6" style={{ border: 'solid 1px #ddd' }}>
                                <div className='box-conversion-container'>
                                    <div className={'box-conversion-row'} style={{ height: '105px' }}>
                                        <div className='box-conversion-item'>
                                            <span className='box-conversion-data'>{_get(purchaseOrderById, 'order.store.name')}</span>
                                            <span className='box-conversion-title'>Store Name</span>
                                        </div>
                                        <div className='box-conversion-item'>
                                            <span className='box-conversion-data'>{`${_get(purchaseOrderById, 'order.store.address.addressLine1')} ${_get(purchaseOrderById, 'order.store.address.addressLine2')} ${_get(purchaseOrderById, 'order.store.address.city')} ${_get(purchaseOrderById, 'order.store.address.state')} ${_get(purchaseOrderById, 'order.store.address.country')}`}</span>
                                            <span className='box-conversion-title'>Store Address</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6" style={{ border: 'solid 1px #ddd' }}>
                                <div className='box-conversion-container'>
                                    <div className={'box-conversion-row'} style={{ height: '105px' }}>
                                        <div className='box-conversion-item'>
                                            <span className='box-conversion-data'>{_get(purchaseOrderById, 'order.vendor.name')}</span>
                                            <span className='box-conversion-title'>Vendor Name</span>
                                        </div>
                                        <div className='box-conversion-item'>
                                            <span className='box-conversion-data'>{_get(purchaseOrderById, 'order.vendor.email')}</span>
                                            <span className='box-conversion-title'>Vendor Email</span>
                                        </div>
                                        <div className='box-conversion-item'>
                                            <span className='box-conversion-data'>{_get(purchaseOrderById, 'order.vendor.phoneNumber.phoneNumber')}</span>
                                            <span className='box-conversion-title'>Vendor Phone Number</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                            <EditRequisition
                                forEdit={true}
                                handleChangeInput={this.handleChangeInput}
                                handleSubmitHandler={this.handleSubmitHandler}
                                selectRowProp={{}}
                                showReceievedQuantity={true}
                                // handleCancel={}
                                isPOViewFlag={isPOViewFlag}
                                isReceiptFlag={isReceiptFlag}
                                requisitions={_get(this, 'props.purchaseOrderById.requisitions', [])}
                                requisitionListData={_get(this.props, 'requisitionListData', [])}
                            />

                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>
        )

    }

}
const mapStateToProps = state => {

    let { purchaseOrdersReducer, vendorsReducer } = state
    let { requisitionListData } = vendorsReducer || [];

    let { type } = purchaseOrdersReducer || {};
    let { purchaseOrderById } = purchaseOrdersReducer || [];
    let { isFetching, isPOViewFlag, isReceiptFlag } = purchaseOrdersReducer || false;

    return {
        purchaseOrderById,
        isFetching,
        type,
        requisitionListData,
        isPOViewFlag,
        isReceiptFlag
    }
}

export default connect(mapStateToProps)(withStyles(styles)(RecieptAddEdit));
