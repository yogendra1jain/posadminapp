import React from 'react';
import Redirect from "react-router/Redirect";
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';
import "bootstrap/dist/css/bootstrap.css";
import SaveButton from '../../components/common/SaveButton.jsx'
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
import _pull from 'lodash/pull';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
// import Category from './category';
import 'react-drawer/lib/react-drawer.css';
import Alert from 'react-s-alert';

import { fetchVendorProducts } from '../../actions/products';
import { getVendorData } from '../../actions/vendor';
import vendorReducer from '../../reducers/vendor.js';


const options = {
    paginationPosition: 'top',
    defaultSortName: 'name',
    defaultSortOrder: 'asc',
    clearSearch: true,
    withFirstAndLast: true,
    sizePerPageList: [{
        text: '5', value: 5
    }, {
        text: '10', value: 10
    }],


};
class VendorProductsContainer extends React.Component {
    constructor(props) {
        super(props);
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
    showAlert(error, msg) {
        if (error) {
            Alert.error(msg || '', {
                position: 'bottom-right',
                effect: 'slide',
                timeout: 5000,
                html: true
            });
            this.forceUpdate();
        } else {
            Alert.success(msg || 'successfully saved.', {
                position: 'bottom-right',
                effect: 'slide',
                timeout: 3000,
                html: true
            });
        }

    }

    componentDidMount() {
        let reqObj = {
            id: localStorage.getItem('retailerID')
        }
        let url = `/Vendor/ByRetailerId`;
        let vendorProdUrl = `/VendorProduct/GetByRetailerId`;
        this.props.dispatch(getVendorData('', url, reqObj))
        this.props.dispatch(fetchVendorProducts('', vendorProdUrl, reqObj))
        .then((data) => {
            console.log('came in then of vendorproduct service call.');
        }, (err) => {
            console.log('err', err);
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

        let { vendorProductsList } = this.props
        return (
            <div className="">
                <div>
                    <div className="form-btn-group">
                        <SaveButton disabled={this.isUpdate} buttonDisplayText={'Add new'} Class_Name={"btn-info"} handlerSearch={this.addNewVendorProduct} />
                    </div>
                    <div>
                        <BootstrapTable
                            data={vendorProductsList}
                            options={options}
                            selectRow={this.selectRowProp}
                            striped hover
                            pagination={true}
                            exportCSV={true}
                            search={true}
                            searchPlaceholder={'Search Vendor Products'}>

                            <TableHeaderColumn width='100' dataField='id' isKey={true} >ID</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='name'>Name</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='email' dataSort>Email</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='phoneNumber' dataSort>Phone Number</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>
                <div>
                </div>
            </div>
        )

    }

}

const mapStateToProps = state => {

    let { productsReducer, vendorsReducer } = state

    let { type } = productsReducer || {};
    let { vendorProductsData } = productsReducer || [];
    let { isFetching } = productsReducer || false;
    let vendorList = []
    let vendorProductsList = [];
    let { vendorData } = vendorsReducer || [];
    !_isEmpty(vendorData) && _get(vendorReducer, 'vendorData', []).map((data, index) => {
        let phoneNumber = _get(data, 'phoneNumber.phoneNumber', 0);

        vendorList.push(
            {
                id: data.id,
                name: data.name,
                phoneNumber: phoneNumber,
                email: data.email
            }
        )
    })
    !_isEmpty(vendorProductsData) && _get(productsReducer, 'vendorProductsData', []).map((data, index) => {
        let price = `${_get(data, 'price.currencyCode', '')} ${_get(data, 'price.price', 0)}`;

        vendorProductsList.push(
            {
                id: data.id,
                vendorId: data.vendorId,
                posProductId: data.posProductId,
                retailerId: data.retailerId,
                sku: data.sku,
                price: price,
                defaultOrderQty: data.defaultOrderQty,
                conversionFactor: data.conversionFactor,

            }
        )
    })

    return {
        vendorList,
        isFetching,
        vendorsReducer,
        type,
        vendorProductsList

    }
}

export default connect(mapStateToProps)(VendorProductsContainer);
