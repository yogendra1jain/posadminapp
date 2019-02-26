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
import Alert from 'react-s-alert';

import { fetchRetailerList } from '../../actions/retailer';
import { showMessage } from '../../actions/common';
import Select from 'react-select'

const options = {
    paginationPosition: 'top',
    defaultSortName: 'retailerName',
    defaultSortOrder: 'asc',
    clearSearch: true,
    withFirstAndLast: true,
    sizePerPageList: [{
        text: '5', value: 5
    }, {
        text: '10', value: 10
    }],


};
class RetailerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        
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
        let url = `/Retailer/Get`;
        
        this.props.dispatch(fetchRetailerList('', url, {}))
            .then((data) => {
                // this.props.dispatch(showMessage({ text: `Saved succeffully.`, isSuccess: true }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 1000);
                // this.props.history.push('/retailers')
            }, (err) => {
                console.log('err while saving retailer', err);
                this.props.dispatch(showMessage({ text: `${JSON.stringify(err)}`, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 5000);
            })
    }

    addNewRetailer = () => {
        this.props.history.push('/retailers/add');
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

        let { retailerList } = this.props;

        return (
            <div className="">
                <div>
                    <div className="form-btn-group">
                        <Button type="button" variant="raised" onClick={() => this.addNewRetailer()}>Add New</Button>
                    </div>
                    <div>
                        <BootstrapTable
                            data={retailerList}
                            options={options}
                            selectRow={this.selectRowProp}
                            striped hover
                            pagination={true}
                            exportCSV={true}
                            search={true}
                            searchPlaceholder={'Search Retailer'}>

                            <TableHeaderColumn width='100' dataField='id' isKey={true} hidden={true}>Id</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='name' >Name</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='domainLink'>Domain Link</TableHeaderColumn>
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

    let { retailerReducer } = state
    let { isFetching } = retailerReducer || false;
    let { retailerList } = retailerReducer || [];

    return {
        isFetching,
        retailerList
    }
}

export default connect(mapStateToProps)(RetailerContainer);
