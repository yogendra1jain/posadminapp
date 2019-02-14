import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
import _find from 'lodash/find';
/* Material import */
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
/* Redux Imports */
import { connect } from 'react-redux';
import FormDialog from '../../../components/common/CommonDialog/index.js';
import AddRequisitionForm from './AddRequisitionComp.jsx';
/* Component Imports */

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class ViewRequisition extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    getRequisitionStatus = (status) => {
        let statusValue = '';
        switch (status) {
            case 0:
                statusValue = 'SCRATCH';
                break
            default:
                statusValue = 'SCRATCH';
                break;
        }
        return statusValue;
    }

    mapProductName = (productId) => {
        let prod = _find(_get(this.props, 'productsFromCache', []), {
            'id': productId
        });
        return _get(prod, 'name', '');
    }
    mapVendorName = (vendorId) => {
        let vendor = _find(_get(this.props, 'cachedVendors', []), {
            'id': vendorId
        });
        return _get(vendor, 'name', '');
    }
    mapStoreName = (id) => {
        let store = _find(_get(this.props, 'storeList', []), {
            'value': id
        });
        return _get(store, 'label', '');
    }
    mapVendorProductName = (id) => {
        let vendor = _find(_get(this.props, 'vendorProductsList', []), {
            'id': id
        });
        return _get(vendor, 'name', '');
    }

    populateRequisitionList = () => {
        let rows = []
        _get(this, 'props.requisitionList', []).map((data, index) => {
            rows.push(
                <div className='box-conversion-row'>
                    <div className='box-conversion-item'>
                        <span className='box-conversion-data'>{this.mapProductName(data.posProductId)}</span>
                        <span className='box-conversion-title'>POS Product</span>
                    </div>
                    <div className='box-conversion-item'>
                        <span className='box-conversion-data'>{this.mapVendorName(data.vendorId)}</span>
                        <span className='box-conversion-title'>Vendor Id</span>
                    </div>
                    <div className='box-conversion-item'>
                        <span className='box-conversion-data'>{this.mapStoreName(data.storeId)}</span>
                        <span className='box-conversion-title'>Store Id</span>
                    </div>
                    {/* <div className='box-conversion-item'>
                        <span className='box-conversion-data'>{data.vendorProductId}</span>
                        <span className='box-conversion-title'>Vendor Product</span>
                    </div> */}
                    <div className='box-conversion-item'>
                        <span className='box-conversion-data'>{data.quantity}</span>
                        <span className='box-conversion-title'>Quantity</span>
                    </div>
                    <div className='box-conversion-item'>
                        <span className='box-conversion-data'>{this.getRequisitionStatus(data.status)}</span>
                        <span className='box-conversion-title'>Status</span>
                    </div>
                    <span className={this.props.classes.icon} onClick={() => this.editRequisition(index)}> Edit</span>
                </div>
            )
        })

        return <div className='box-conversion-container'>{rows}</div>
    }
    editRequisition = (index) => {
        let reqObj = _get(this.props, `requisitionList[${index}]`)

        let initialValues = { ...reqObj }
        this.setState({
            showDialog: true,
            selectedIndex: index,
            initialValues: initialValues,
        });
        this.props.toggleDialog();
        

    }

    toggleDialog = () => {
        this.setState({
            showDialog: !this.state.showDialog,
        });
    }

    render() {
        console.log('requisition list ', this.props.requisitionList);
        const { classes } = this.props;
        const { showDialog, initialValues } = this.state;
        // if (_get(this, 'props.isFetching')) {
        //     return (<div className='loader-wrapper-main'>
        //         <div className="spinner">
        //             <div className="rect1"></div>
        //             <div className="rect2"></div>
        //             <div className="rect3"></div>
        //             <div className="rect4"></div>
        //             <div className="rect5"></div>
        //         </div>
        //     </div>);
        // }
        return (
            <div>
                <FormDialog
                    open={this.props.showDialog}
                    handleClose={this.props.toggleDialog}
                    title={'Add New'}
                    fullScreen={false}
                    fullWidth={true}
                    dialogContent={
                        <AddRequisitionForm
                            storeList={this.props.storeList}
                            handleSubmitHandler={this.props.handleSubmitHandler}
                            classes={classes}
                            initialValues={this.props.addNew ? {} : this.state.initialValues}
                        />
                    }
                />
                {this.populateRequisitionList()}
            </div>
        );
    }
}

const mapStateToProps = state => {

}

export default connect(mapStateToProps)((withStyles(styles)(ViewRequisition)))