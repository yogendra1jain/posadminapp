import React from 'react';
import RequisitionList from './RequisitionsList';
import _get from 'lodash/get';

class POPrintView extends React.Component {
    render() {
        return (
            <div className="po-print-container">
                <div className="row" >
                    <h1>Purchase Order</h1>
                </div>
                <div className="row store-vendor-detail">
                    <div className="col-md-6">
                        <label>STORE</label>
                        <label>Store Name: <span>{_get(this.props,'storeName','')}</span></label>
                        <label>Store Address: <span>{_get(this.props,'storeAddress','')}</span></label>
                    </div>
                    <div className="col-md-6">
                        <label>VENDOR</label>
                        <label>Vendor Name: <span>{_get(this.props,'vendorName','')}</span></label>
                        <label>Vendor Email: <span>{_get(this.props,'vendorEmail','')}</span></label>
                        <label>Vendor PhoneNumber: <span>{_get(this.props,'vendorPhoneNo','')}</span></label>
                    </div>
                </div>
                <div className="row">
                    <div className="col=md-12">
                        <h2>Requisition List</h2>
                        <RequisitionList 
                            requisitions={_get(this, 'props.purchaseOrderById.requisitions', [])}
                        />
                    </div>
                </div>
            </div>
         ) 
    }
}
    
 export default POPrintView;