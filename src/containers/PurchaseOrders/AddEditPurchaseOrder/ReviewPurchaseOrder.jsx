import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import Button from '@material-ui/core/Button';

import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';
import { withStyles } from '@material-ui/core/styles';

// import Category from './category';
import { showMessage } from '../../../actions/common';
import FormDialog from '../../../components/common/CommonDialog/index';
import EditRequisition from '../../RequisitionContainer/components/EditRequisition.jsx';

import { saveRequisitionForm } from '../../../actions/vendor';
import { fetchPurchaseOrderById, requestPORequisitionUpdate, purchaseOrderSave } from '../../../actions/purchaseOrder';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'; 



const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class ReviewPurchaseOrderContainer extends React.Component {
    constructor(props) {
        super(props);
        let { params } = this.props.match;
        this.state = {
            selectedValue: '',
            params: params,
        };
        console.log('params:', params);
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
        this.props.dispatch(requestPORequisitionUpdate('', value, index, proposedQuantity));
    }

    handleSubmitHandler = (index) => {
        let values = _get(this, `props.purchaseOrderById.requisitions[${index}]`, {})
        let data = { ...values };
        data.quantity = Number(data.quantity);
        delete data.proposedQuantity;
        console.log('data to be saved', data);
        let url = `/Requisition/Save`
        this.props.dispatch(saveRequisitionForm('', url, data))
            .then((data) => {
                console.log('requisition is saved successfully.');
                this.props.dispatch(showMessage({ text: `Requisition updated.`, isSuccess: true }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 5000);
                // this.props.toggleEditState();
            }, (err) => {
                console.log('err while saving requisition form', err);
                this.props.dispatch(showMessage({ text: `${JSON.stringify(err)}`, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 5000);
            })
    }

    toggleDialog = () => {
        this.setState({
            openDialog: !this.state.openDialog,
        });
    }

    printPDF = () => {
        this.setState({ applyPdfClass: true }, () => {
            const input = document.getElementById('divToPrint');

            html2canvas(input).then(canvas => {
                // Few necessary setting options

                const contentDataURL = canvas.toDataURL('image/png')
                var imgWidth = 200;
                var pageHeight = 295;
                var imgHeight = canvas.height * imgWidth / canvas.width;
                var heightLeft = imgHeight;

                var doc = new jsPDF('p', 'mm');
                var position = 0;

                doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);

                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    doc.addPage();
                    doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
                doc.save('PO.pdf');

            });
            setTimeout(() => {
                this.setState({ applyPdfClass: false });
            }, 10);
        })
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
        const { purchaseOrderById, isPOViewFlag } = this.props;
        return (
            <div className="">
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
                                <Button type="button" style={{ marginRight: '10px' }} variant="raised" onClick={() => this.onApproveReject(true)}>Reject</Button>
                                <Button type="button" variant="raised" onClick={() => this.toggleDialog()}>Cancel</Button>
                            </div>
                        </div>
                    }
                />
                <div>
                    {
                        !this.props.isPOViewFlag ?
                            <div className="form-btn-group">
                                <Button type="button" style={{ marginRight: '10px' }} variant="raised" onClick={() => this.onApproveReject(false)}>Approve</Button>
                                <Button type="button" style={{ marginRight: '10px' }} variant="raised" onClick={() => this.toggleDialog()}>Reject</Button>
                                <Button type="button" variant="raised" onClick={() => this.printPDF()}>Export PDF</Button>
                            </div>
                            :
                            <div className="form-btn-group">
                                <Button type="button" variant="raised" onClick={() => this.printPDF()}>Export PDF</Button>
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
                        <div className="row" style={{ paddingLeft: '15px', paddingRight: '15px'}}>
                            <EditRequisition
                                forEdit={true}
                                handleChangeInput={this.handleChangeInput}
                                handleSubmitHandler={this.handleSubmitHandler}
                                selectRowProp={{}}
                                // handleCancel={}
                                isPOViewFlag={isPOViewFlag}
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

    let { purchaseOrdersReducer, vendorsReducer, storesReducer } = state
    let { requisitionListData } = vendorsReducer || [];

    let { type } = purchaseOrdersReducer || {};
    let { purchaseOrderById } = purchaseOrdersReducer || [];
    let { isFetching, isPOViewFlag } = purchaseOrdersReducer || false;
    let { storeData } = storesReducer || [];
    let storeList = [];
    let { vendorData } = vendorsReducer || [];
    let vendorList = [];
    _isArray(storeData) && !_isEmpty(storeData) && storeData.map((data, index) => {
        storeList.push(
            {
                value: data.id,
                label: data.name,
            }
        )
    })
    !_isEmpty(vendorData) && _get(vendorsReducer, 'vendorData', []).map((data, index) => {
        vendorList.push(
            {
                value: data.id,
                label: data.name,
            }
        )
    })
    return {
        purchaseOrderById,
        isFetching,
        type,
        requisitionListData,
        storeList,
        vendorList,
        isPOViewFlag
    }
}

export default connect(mapStateToProps)(withStyles(styles)(ReviewPurchaseOrderContainer));
