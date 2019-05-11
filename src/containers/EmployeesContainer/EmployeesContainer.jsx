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
import { fetchEmployeesList } from '../../actions/employees';
import { fetchStore } from '../../actions/store';
import FormDialog from '../../components/common/CommonDialog/index';
import AutoComplete from '../../components/Elements/AutoComplete';
import { uploadEmployeesCSV, uploadDocument, requestEmployeesUpdate } from '../../actions/employees';
import FileUploadComp from './components/FileUploadComp.jsx';
import DineroInit from '../../Global/Components/DineroInit';


const options = {
    paginationPosition: 'top',
    defaultSortName: 'id',
    defaultSortOrder: 'asc',
    clearSearch: true,
    withFirstAndLast: true,
    sizePerPageList: [{
        text: '5', value: 5
    }, {
        text: '10', value: 10
    }],


};

const ActiveList = [
    {
        displayText: 'Active',
        value: true,
    },
    {
        displayText: 'InActive',
        value: false,
    },
]

class EmployeesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: '',
            selectedStore: '',
            isActive: true,
            openDialog: false,
            file: {},
        };
        this.employeesList = []
        this.selectRowProp = {
            mode: 'radio',
            clickToSelect: false,
            onSelect: this.onRowSelect,
            // onSelectAll: this.onSelectAll,
            bgColor: '#ffffff',
            // selected : this.selectedIds,
        }
        this.method = 'POST';
        this.storeList = []
    }


    componentDidMount() {
        if(localStorage.getItem('role') == 1) {
            let reqObj = {
                id: localStorage.getItem('retailerID'),
            }
            let storeUrl = '/Store/ByRetailerId';
            const { dispatch, storesReducer } = this.props;
            dispatch(fetchStore(storesReducer, storeUrl, reqObj));
        } else if (localStorage.getItem('role') == 2) {
            this.setState({ selectedStore: localStorage.getItem('storeID') })
            let employeeUrl = `/Employee/ByStore`;
            let reqData = {
                storeId: localStorage.getItem('storeID'),
                active: true
            };
            this.getEmployees(employeeUrl, reqData);
        }
    }

    componentWillReceiveProps(props) {
        if (!_isEmpty(props.storeList)) {
            this.storeList = []
            _get(props, 'storeList', []).map(store => {
                this.storeList.push({ displayText: store.label, value: store.value });
            })
            this.forceUpdate()
        }
    }

    handleChange = (id, type) => {
        if (id == null) {
            this.setState({ selectedStore: '' })
            this.customerList = []
            this.forceUpdate()
        } else {
            if (this.state.isActive == '') {
                this.setState({ isActive: true })
            }
            let employeeUrl = `/Employee/ByStore`;
            let reqData = {
                storeId: id,
                active: this.state.isActive !== '' ? this.state.isActive : true,
            };
            this.setState({
                selectedStore: id,
            })
            this.getEmployees(employeeUrl, reqData);
        }
    }

    handleActiveChange = (id) => {
        if (id == null) {
            this.setState({ isActive: '' })
            this.customerList = []
            this.forceUpdate()
        } else {
            let employeeUrl = `/Employee/ByStore`;
            let reqData = {
                storeId: this.state.selectedStore,
                active: id,
            };

            this.setState({
                isActive: id,
            })
            this.getEmployees(employeeUrl, reqData);
        }
    }

    getEmployees = (url, reqObj) => {
        this.props.dispatch(fetchEmployeesList('', url, reqObj))
            .then((data) => {
                if (data == null) {
                    this.customerList = []
                } else {
                    this.customerList = data
                }
                this.forceUpdate()
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
        this.selectedEmployee = row;
        if (isSelected == false) {
            this.selectedInfo = {};
            this.selectedEmployee = {};
        }
        this.selectRowProp.selected = this.selectedIds;
        this.forceUpdate();
    }

    handleSelectChange = (id, name) => {

    }
    handleChangeStore = (e) => {
        this.setState({
            selectedStoreForAdd: e.value,
        })
    }
    addNewEmployee = () => {
        this.props.history.push('/employees/add');
    }
    updateEmployee = () => {
        if (_get(this, 'selectedIds.length', 0) > 0) {
            let id = this.selectedIds[0];
            let tempProd = _find(this.props.employeesList, { 'id': id });
            tempProd.amount = DineroInit(_get(tempProd,'employeePurchaseLimit.amount',0)).toUnit(2)
            const { dispatch } = this.props;
            dispatch(requestEmployeesUpdate('', tempProd));
            this.props.history.push('/employees/add');
        }

    }
    toggleDialog = () => {
        this.setState({
            openDialog: !this.state.openDialog,
        });
    }
    onDrop = (files) => {
        let url = '/Upload/Employee';
        if (files.length > 0) {
            this.setState({ file: files[0] })
            this.props.dispatch(uploadDocument(files[0], url, '', this.state.selectedStore))
                .then(data => {
                    if(data.status == 200) {
                        let employeeUrl = `/Employee/ByStore`;
                        let reqData = {
                            storeId: this.state.selectedStore,
                            active: this.state.isActive,
                        };
                        this.getEmployees(employeeUrl, reqData);
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

    onCancel = () => {
        this.setState({
            file: {}
        });
    }
    getYesNoValue = (value) => {
        if (value) {
            return 'Yes';
        } else {
            return 'No';
        }
    }
    showActiveValue = (cell, row) => {
        return (
            <div>
                <span>{this.getYesNoValue(cell)}</span>
            </div>
        )
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

        let { customerList } = this.props;
        let { selectedValue, file } = this.state;
        if (this.state.selectedStore == '') {
            this.customerList = []
        }
        console.log(this.storeList, 'this.storeList')
        const role = localStorage.getItem('role')
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
                            storeList={this.props.storeList}
                            selectedStoreForAdd={this.state.selectedStoreForAdd}
                            handleChangeStore={this.handleChangeStore}
                            onDrop={this.onDrop}
                            onCancel={this.onCancel}
                            file={this.state.file}
                        />
                    }
                />
                <div className='panel-container'>
                    <span className='panel-heading'>Employees </span>
                    <div>
                        <SaveButton disabled={_isEmpty(_get(this.state, 'selectedStore'))} Class_Name="m-r-10" buttonDisplayText={'Add New'} handlerSearch={() => this.addNewEmployee()} />
                        <SaveButton disabled={_isEmpty(this.selectedEmployee)} Class_Name="m-r-10" buttonDisplayText={'Update'} handlerSearch={() => this.updateEmployee()} />
                        <SaveButton disabled={_isEmpty(_get(this.state, 'selectedStore'))} Class_Name="btn-info" buttonDisplayText={'Bulk Upload'} handlerSearch={() => this.toggleDialog()} />
                    </div>
                </div>
                <div>
                    <div className="row">
                        {role == 1 ?
                            <div>
                                <div className="col-sm-6">
                                    <label>Select Store</label>
                                    <AutoComplete
                                        type="single"
                                        data={this.storeList}
                                        name="store"
                                        value={this.state.selectedStore}
                                        changeHandler={(id) => { this.handleChange(id, 'store') }}
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <label>Select Active Status</label>
                                    <AutoComplete
                                        type="single"
                                        data={ActiveList}
                                        name="activeFlag"
                                        value={this.state.isActive}
                                        changeHandler={(e) => this.handleActiveChange(e, 'store')}
                                    />
                                </div> 
                            </div> :
                            <div>
                                <div className="col-sm-6">
                                    <label style={{ marginTop: "25px", fontSize: "17px" }} >Store Name: <span>{localStorage.getItem('storeName')}
                                    </span></label>
                                </div>
                                <div className="col-sm-6">
                                    <label>Select Active Status</label>
                                    <AutoComplete
                                        type="single"
                                        data={ActiveList}
                                        name="activeFlag"
                                        value={this.state.isActive}
                                        changeHandler={(e) => this.handleActiveChange(e, 'store')}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                    {/* <div className="form-btn-group">
                        <Button type="button" style={{ marginRight: '10px' }} variant="raised" onClick={() => this.addNewEmployee()}>+ Add New</Button>
                        <Button type="button" style={{ marginRight: '10px' }} variant="raised" onClick={() => this.updateEmployee()}>Update</Button>
                        <Button type="button" variant="raised" onClick={() => this.toggleDialog()}>+ Bulk Upload</Button>
                    </div> */}
                    <div>
                        <BootstrapTable
                            data={this.customerList}
                            options={options}
                            selectRow={this.selectRowProp}
                            striped hover
                            pagination={true}
                            exportCSV={true}
                            search={true}
                            searchPlaceholder={'Search Employee'}>

                            <TableHeaderColumn width='100' dataField='id' isKey={true} hidden={true}>Id</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='email' >Email</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='name'>Name</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='phone' dataSort>Phone Number</TableHeaderColumn>

                            <TableHeaderColumn width='100' dataField='employeeId' dataSort>Employee Id</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='isEmpPayEnabled' dataFormat={this.showActiveValue} dataSort>Employee Pay Enabled</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='active' dataFormat={this.showActiveValue} dataSort>Active</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='employeeDiscount' dataSort>Discount</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>
            </div>
        )

    }

}
const mapStateToProps = state => {

    let { storesReducer, employeesReducer } = state
    let { storeData } = storesReducer || [];
    let { employeesList } = employeesReducer || [];
    let { employeeCsvData } = employeesReducer || [];

    let storeList = [];
    let customerList = [];
    // let cusotmers = _get(employeesList, 'customers', []);
    _isArray(storeData) && !_isEmpty(storeData) && storeData.map((data, index) => {
        storeList.push(
            {
                value: data.id,
                label: data.name,
            }
        )
    })
    _isArray(employeesList) && !_isEmpty(employeesList) && employeesList.map((data, index) => {
        let tempObj = data;

        tempObj.name = `${_get(data, 'customer.firstName', '')} ${_get(data, 'customer.lastName', '')}`;
        tempObj.phone = `${_get(data, 'phoneNumber.countryCode', '')}+ ${_get(data, 'phoneNumber.phoneNumber', '')}`;
        customerList.push(
            tempObj
        )
        console.log(tempObj,"dfdf");
    })
    return {
        storeList,
        employeesList,
        customerList,
        employeeCsvData,
    }
}

export default connect(mapStateToProps)(EmployeesContainer);
