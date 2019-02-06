import React from 'react';
import _get from 'lodash/get';

import { findDOMNode } from 'react-dom';
import Button from "react-bootstrap/lib/Button";

import SaveButton from "../components/common/SaveButton.jsx";
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';



class SessionPrintData extends React.Component {

    render() {
        return (



            <div className="modal-child">
            <div className="row">
                <div className="col-sm-12">
                    <div className="invoice-header">
                        <h3>All On Block </h3>
                        <h4>Session: {this.props.data.id}</h4>
                    </div>
                </div>
            
                <div className="col-sm-12 invoice-table">
                    
                </div>
                <div className="cart-amount-block col-sm-12">
                    <div className="row marg-none style2">
                        <span className="decor1"><span className="inner1"></span></span>
                        <label className="labelmain pull-left" >POS</label>
                        <label className="labelmain pull-right" >{ _get(this.props,'data.terminal','')}</label>
                    </div>
                    <div className="row marg-none style2">
                        <span className="decor1"><span className="inner1"></span></span>
                        <label className="labelmain pull-left" >Opened</label>
                        <label className="labelmain pull-right" >{_get(this.props,'data.openTime','')}</label>
                    </div>

                    <div className="row marg-none style2">
                        <span className="decor1"><span className="inner1"></span></span>
                        <label className="labelmain pull-left" >Closed</label>
                        <label className="labelmain pull-right" >{_get(this.props,'data.closeTime','')}</label>
                    </div>
                    <br/>
                    <h5># Transaction</h5>
                    <div className="row marg-none style2">
                        <span className="decor1"><span className="inner1"></span></span>
                        <label className="labelmain pull-left" >Opening Amount</label>
                        <label className="labelmain pull-right" >{"$ " + _get(this.props,'data.openingAmount',0)}</label>
                    </div>
                    <div className="row marg-none style2">
                        <span className="decor1"><span className="inner1"></span></span>
                        <label className="labelmain pull-left" >Cash Sales</label>
                        <label className="labelmain pull-right" >{"$ " + _get(this.props,'data.cashSales',0)}</label>
                    </div>
              
                    <div className="row marg-none style2">
                        <span className="decor1"><span className="inner1"></span></span>
                        <label className="labelmain pull-left" >Cash Added</label>
                        <label className="labelmain pull-right" >{"$"+ _get(this.props,'data.cashAdded',0)}</label>
                    </div>
                  
                    <div className="row marg-none style2">
                        <span className="decor1"><span className="inner1"></span></span>
                        <label className="labelmain pull-left" >Cash Removed</label>
                        <label className="labelmain pull-right" >{"$ " + _get(this.props,'data.cashRemoved',0)}</label>
                    </div>
                    
                    <div className="row marg-none style2">
                        <span className="decor1"><span className="inner1"></span></span>
                        <label className="labelmain pull-left" >Theoretical Closing Balance</label>
                        <label className="labelmain pull-right" >{"$"+ _get(this.props,'data.thClosingBalance',0)}</label>
                    </div>
                    
                    <div className="row marg-none style2">
                        <span className="decor1"><span className="inner1"></span></span>
                        <label className="labelmain pull-left" >Real Closing Balance</label>
                        <label className="labelmain pull-right" >{"$ " + _get(this.props,'data.realClosingbalance',0)}</label>
                    </div>
                    <div className="row marg-none style2">
                        <span className="decor1"><span className="inner1"></span></span>
                        <label className="labelmain pull-left" >Difference </label>
                        <label className="labelmain pull-right" >{"$ " + _get(this.props,'data.difference',0)}</label>
                    </div>
                    
                    <br/>
                    <h5># Sales </h5>
                    <div className="row marg-none style2">
                        <span className="decor1"><span className="inner1"></span></span>
                        <label className="labelmain pull-left" >Total Sales </label>
                        <label className="labelmain pull-right" >{"$ " + _get(this.props,'data.totalSales',0)}</label>
                    </div>
                    <div className="row marg-none style2">
                        <span className="decor1"><span className="inner1"></span></span>
                        <label className="labelmain pull-left" >Discount </label>
                        <label className="labelmain pull-right" >{"$ " + _get(this.props,'data.discount',0)}</label>
                    </div>
                    <div className="row marg-none style2">
                        <span className="decor1"><span className="inner1"></span></span>
                        <label className="labelmain pull-left" >Refund </label>
                        <label className="labelmain pull-right" >{"$ " + _get(this.props,'data.refund',0)}</label>
                    </div>


                </div>
            </div>
            </div>




        );
    }

}

export default SessionPrintData;