import React from 'react';
import Redirect from "react-router/Redirect";
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';
import "bootstrap/dist/css/bootstrap.css";
import SaveButton from '../../components/common/SaveButton.jsx'
import Button from '@material-ui/core/Button';

import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isArray from 'lodash/isArray';
import _uniq from 'lodash/uniq';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
import _pull from 'lodash/pull';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
// import Category from './category';
import 'react-drawer/lib/react-drawer.css';
import { showMessage } from '../../actions/common';
import { fetchPurchaseOrders, setPOViewFlag } from '../../actions/purchaseOrder';


const options = {
    paginationPosition: 'top',
    defaultSortName: 'vendorName',
    defaultSortOrder: 'asc',
    clearSearch: true,
    withFirstAndLast: true,
    sizePerPageList: [{
        text: '5', value: 5
    }, {
        text: '10', value: 10
    }],


};

const DummyData = [
    {
        id: 'id1',
        store: 'store1',
        vendor: 'vendor1',
        status: 'statusww',
    }
]

class PurchaseOrderContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: '',
        };
        this.selectRowProp = {
            mode: 'radio',
            clickToSelect: false,
            onSelect: this.onRowSelect,
            // onSelectAll: this.onSelectAll,
            bgColor: '#ffffff',
            // selected : this.selectedIds,
        }
        this.method = 'POST';
    }


    componentDidMount() {
        let reqObj = {
            retailerId: localStorage.getItem('retailerID'),
        }
        let url = `/PurchaseOrder/GetByCriteria`;
        // this.props.dispatch(getVendorData('', url, reqObj))
        // this.fetchVendorProducts(vendorProdUrl, reqObj);
        this.props.dispatch(fetchPurchaseOrders('', url, reqObj))
            .then((data) => {
                console.log('data fetched', data);
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
    onRowSelect = (row, isSelected, e) => {
        isSelected ? this.selectedIds = [(row.id)] : _pull(this.selectedIds, row.id);
        // this.handleAllChecks();        
        this.selectedStore = row;
        if (isSelected == false) {

            this.selectedInfo = {};
            this.selectedStore = {};
        }
        this.selectRowProp.selected = this.selectedIds;
        this.forceUpdate();
    }

    handleSelectChange = (id, name) => {

    }
    addNewPO = () => {
        this.props.history.push('/purchaseorders/add');
    }
    updatePO = () => {
        if (this.selectedIds.length > 0) {
            let prodId = this.selectedIds[0];
            let tempProd = _find(this.props.vendorProductsList, { 'id': prodId });
            const { dispatch } = this.props;
            // dispatch(requestVendorProductUpdate('', tempProd));
            this.props.history.push('/purchaseorders/add');
        }

    }

    handleReview = (row, isView) => {
        this.props.history.push(`/purchaseorders/review/${row.id}`);
        this.props.dispatch(setPOViewFlag('', isView))
    }
    handleReciept = (row, isView) => {
        this.props.history.push(`/purchaseorders/reciept/${row.id}`);
        this.props.dispatch(setPOViewFlag('', isView));
    }
    actionColumn = (cell, row) => {
        if (row.status === 'PENDING APPROVAL') {
            return (
                <div>
                    <SaveButton Class_Name="m-r-10" buttonDisplayText={'Review'} handlerSearch={() => this.handleReview(row, false)} />
                </div>
            )
        } else if (row.status === 'APPROVED') {
            return (
                <div>
                    <SaveButton Class_Name="m-r-10" buttonDisplayText={'Receipt'} handlerSearch={() => this.handleReciept(row, false)} />

                    <SaveButton Class_Name="m-r-10" buttonDisplayText={'View'} handlerSearch={() => this.handleReview(row, true)} />
                </div>
            )
        } else if (row.status === 'RECEIVED') {
            return (
                <div>
                    <SaveButton Class_Name="m-r-10" buttonDisplayText={'View'} handlerSearch={() => this.handleReview(row, true)} />

                    <SaveButton Class_Name="m-r-10" buttonDisplayText={'View Receipt'} handlerSearch={() => this.handleReciept(row, true)} />
                </div>
            )
        } else {
            return (
                <div>
                    <Button type="button" style={{ marginRight: '10px' }} variant="raised" onClick={() => this.handleReview(row, true)}>View</Button>
                </div>
            )
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

        let { purchageOrders } = this.props;
        let { selectedValue } = this.state;
        return (
            <div className="">
                <div className='panel-container'>
                    <span className='panel-heading'>Purchase Orders </span>

                    <div className="form-btn-group">
                        {/* <Button type="button" style={{ marginRight: '10px' }} variant="raised" onClick={() => this.updatePO()}>Update</Button> */}
                        
                        <SaveButton Class_Name={"btn-info"} buttonDisplayText={'Add new'} handlerSearch={this.addNewPO}/>
                    </div>
                </div>
               
                  
                    <div>
                        <BootstrapTable
                            data={purchageOrders}
                            options={options}
                            // selectRow={this.selectRowProp}
                            striped hover
                            pagination={true}
                            exportCSV={true}
                            search={true}
                            searchPlaceholder={'Search PO'}>

                            <TableHeaderColumn width='100' dataField='id' isKey={true} hidden={true}>Id</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='vendorName' >Vendor Name</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='storeName'>Store</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='status' dataSort>Status</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='' dataFormat={this.actionColumn} dataSort>Actions</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                
                <div>
                </div>
            </div>
        )

    }

}
const
    getPOStatus = (status) => {
        let statusValue = '';
        switch (status) {
            case 0:
                statusValue = 'PENDING APPROVAL';
                break
            case 1:
                statusValue = 'APPROVED';
                break
            case 2:
                statusValue = 'REJECTED';
                break
            case 3:
                statusValue = 'RECEIVED';
                break
            default:
                statusValue = 'PENDING APPROVAL';
                break;
        }
        return statusValue;
    }

const mapStateToProps = state => {

    let { purchaseOrdersReducer } = state

    let { type } = purchaseOrdersReducer || {};
    let { purchaseOrderList } = purchaseOrdersReducer || [];
    let { isFetching } = purchaseOrdersReducer || false;
    let purchageOrders = [];
    _isArray(purchaseOrderList) && !_isEmpty(purchaseOrderList) && purchaseOrderList.map((pOrder, index) => {
        purchageOrders.push(
            {
                id: pOrder.id,
                storeId: _get(pOrder, 'store.id'),
                storeName: _get(pOrder, 'store.name'),
                vendorId: _get(pOrder, 'vendor.id'),
                vendorName: _get(pOrder, 'vendor.name'),
                status: getPOStatus(_get(pOrder, 'status', '')),
            }
        )
    })

    return {
        purchaseOrderList,
        isFetching,
        type,
        purchageOrders,
    }
}

export default connect(mapStateToProps)(PurchaseOrderContainer);
