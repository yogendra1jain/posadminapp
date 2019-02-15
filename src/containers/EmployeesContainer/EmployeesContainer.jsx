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
import Select from 'react-select';
import FormDialog from '../../components/common/CommonDialog/index';

import { uploadEmployeesCSV, requestEmployeesUpdate } from '../../actions/employees';
import Dropzone from 'react-dropzone';

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
        label: 'Active',
        value: true,
    },
    {
        label: 'InActive',
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
            id: localStorage.getItem('retailerID'),
        }
        let storeUrl = '/Store/ByRetailerId';
        const { dispatch, storesReducer } = this.props;
        dispatch(fetchStore(storesReducer, storeUrl, reqObj));
    }
    handleChange = (e, type) => {
        let value = _get(e, 'value', '');
        let employeeUrl = `/Employee/ByStore`;
        let reqData = {
            storeId: value,
            active: this.state.isActive,
        };
        this.setState({
            selectedStore: value,
        })
        this.getEmployees(employeeUrl, reqData);
    }
    handleActiveChange = (e) => {
        let value = _get(e, 'value', '');
        let employeeUrl = `/Employee/ByStore`;
        let reqData = {
            storeId: this.state.selectedStore,
            active: value,
        };
        this.setState({
            isActive: value,
        })
        this.getEmployees(employeeUrl, reqData);
    }

    getEmployees = (url, reqObj) => {
        this.props.dispatch(fetchEmployeesList('', url, reqObj))
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
    handleChangeStore = (e) => {
        this.setState({
            selectedStoreForAdd: e.value,
        })
    }
    addNewEmployee = () => {
        this.props.history.push('/employees/add');
    }
    updateEmployee = () => {
        if (this.selectedIds.length > 0) {
            let id = this.selectedIds[0];
            let tempProd = _find(this.props.employeesList, { 'id': id });
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
    onDrop(files) {
        // this.setState({ files });

        let formData;
        let url = '/Employee/ByStore';
        if (files.length > 0) {
            this.setState({ file: files[0] })
            formData = new FormData();
            formData.append('file', files[0])
            // formData.append('mediaType', 'customer')
            formData.append('storeId', this.state.selectedStoreForAdd);
            this.props.dispatch(uploadEmployeesCSV('', url, formData))
            .then((data) => {
                console.log('csv data saved successfully.', data);
                this.toggleDialog();
            }, (err) => {
                console.log('err while saving csv data', err);
                
            })
        }
    }

    onCancel() {
        this.setState({
            file: {}
        });
    }
    getYesNoValue = (value) => {
        if(value) {
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
        return (
            <div className="">
                <FormDialog
                    open={this.state.openDialog}
                    handleClose={this.toggleDialog}
                    title={'Upload CSV'}
                    fullScreen={false}
                    fullWidth={true}
                    dialogContent={
                        <div>
                            <div className='panel-container'>
                                <span className='panel-heading'>Create Employees In Bulk </span>
                            </div>
                            <div>
                                <div className="row" style={{ marginBottom: '10px' }}>
                                    <div className="col-sm-6">
                                        <Select placeholder="Select Store" name='store' options={this.props.storeList} value={this.state.selectedStoreForAdd} onChange={(e) => this.handleChangeStore(e)} />
                                    </div>
                                </div>
                                <div className='box-conversion-container'>
                                    <section >
                                        <Dropzone
                                            onDrop={this.onDrop.bind(this)}
                                            onFileDialogCancel={this.onCancel.bind(this)}
                                        >
                                            {({ getRootProps, getInputProps }) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <span className="dropzone">Drop files here, or click to select files</span>
                                                </div>
                                            )}
                                        </Dropzone>
                                    </section>
                                    <aside>
                                        <h4>Files</h4>
                                        <ul>
                                            <li key={file.name}>
                                                {file.name} - {file.size} bytes
                                    </li>
                                        </ul>
                                    </aside>

                                </div>
                            </div>
                        </div>
                    }
                />
                <div className='panel-container'>
                    <span className='panel-heading'>Purchase Orders </span>
                </div>
                <div>
                    <div className="row" style={{ marginBottom: '10px' }}>
                        <div className="col-sm-6">
                            <Select placeholder="Select Store" name='store' options={this.props.storeList} value={this.state.selectedStore} onChange={(e) => this.handleChange(e, 'store')} />
                        </div>
                        <div className="col-sm-6">
                            <Select placeholder="Select Active" name='activeFlag' options={ActiveList} value={this.state.isActive} onChange={(e) => this.handleActiveChange(e, 'store')} />
                        </div>
                    </div>
                    <div className="form-btn-group">
                        <Button type="button" style={{ marginRight: '10px' }} variant="raised" onClick={() => this.addNewEmployee()}>+ Add New</Button>
                        <Button type="button" style={{ marginRight: '10px' }} variant="raised" onClick={() => this.updateEmployee()}>Update</Button>
                        <Button type="button" variant="raised" onClick={() => this.toggleDialog()}>+ Bulk Upload</Button>
                    </div>
                    <div>
                        <BootstrapTable
                            data={customerList}
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
                <div>
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
    })
    return {
        storeList,
        employeesList,
        customerList,
        employeeCsvData,
    }
}

export default connect(mapStateToProps)(EmployeesContainer);
