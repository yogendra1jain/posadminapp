import React from 'react';
import RequisitionList from './RequisitionsList';
import _get from 'lodash/get';

class POPrintView extends React.Component {
    render() {
        return (
            <div className="po-print-container">
                <h1 className="po-print-title">Purchase Order</h1>
                <label className="po-id-date">Purchase Order Id: <span>{this.props.poId}</span></label>
                <label className="po-id-date">Date: <span>{this.props.date}</span></label>
                <div className="store-vendor-row">
                    <div className="sv-col">
                        <div className="sv-box">
                            <div className="sv-head">STORE</div>
                            <div className="sv-body">
                                <div className="sv-row"><label>Store Name: </label><span>{_get(this.props,'storeName','')}</span></div>
                                <div className="sv-row"><label>Store Address:</label> <span>{_get(this.props,'storeAddress','')}</span></div>
                            </div>
                        </div>
                    </div>

                    <div className="sv-col">
                        <div className="sv-box">
                            <div className="sv-head">VENDOR</div>
                            <div className="sv-body">
                                <div className="sv-row"><label>Vendor Name: </label><span>{_get(this.props,'vendorName','')}</span></div>
                                <div className="sv-row"><label>Vendor Email: </label><span>{_get(this.props,'vendorEmail','')}</span></div>
                                <div className="sv-row"><label>Vendor PhoneNumber: </label><span>{_get(this.props,'vendorPhoneNo','')}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
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