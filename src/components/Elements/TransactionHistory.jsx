import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import ModalBody from 'react-bootstrap/lib/ModalBody';
import ModalHeader from 'react-bootstrap/lib/ModalHeader';
import ModalFooter from 'react-bootstrap/lib/ModalFooter';
import ModalTitle from 'react-bootstrap/lib/ModalTitle';

import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';
import TabPane from 'react-bootstrap/lib/TabPane';


import { findDOMNode } from 'react-dom';
import SaveButton from '../common/SaveButton.jsx';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _find from 'lodash/find';
import _concat from 'lodash/concat';
import _sortBy from 'lodash/sortBy';

import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog/Dialog';
import DialogActions from 'material-ui/Dialog/DialogActions';
import DialogContent from 'material-ui/Dialog/DialogContent';
import DialogContentText from 'material-ui/Dialog/DialogContentText';
import DialogTitle from 'material-ui/Dialog/DialogTitle';

import Slide from 'material-ui/transitions/Slide';
import PropTypes from 'prop-types';
import moment from "moment";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

const history = [
    {
        open: true,
        cashIn: false,
        terminal: 't1',
        date: 'Friday 22 jun, 2018 05:38 PM',
        amount: 200,
    },
    {
        open: false,
        cashIn: true,
        terminal: 't1',
        addedMoney: 48,
        date: 'Friday 22 jun, 2018 05:38 PM',
        amount: 300,
        reason: 'Add cash from order with id= 23232',
    },
    {
        open: false,
        cashOut: true,
        terminal: 't1',
        removedMoney: 5,
        date: 'Friday 22 jun, 2018 05:38 PM',
        amount: 900,
        reason: 'test',
    }
]

class TransactionHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
        };

    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open
        });
    }


    shouldComponentUpdate(nextProps) {
        return this.props.open !== nextProps.open;
    }

    handleClose = () => {
        this.props.handleClose();
    };



    render() {
        const { content, promptBtnText, title, heading, sessionData } = this.props;
        let tab1Content = [];
        let tab2Content = [];
        let tabDefaultContent = [];
        if (!_isEmpty(sessionData)) {
            var arraySorted = _concat(sessionData.addMoney, sessionData.takeMoney);
        }

        // PutMoneyTakeMoneyArr.sort(function compare(a, b) {
        //     var dateA = new Date(a.transactionTime);
        //     var dateB = new Date(b.transactionTime);
        //     return dateA - dateB;
        //   });

        var PutMoneyTakeMoneyArr = _sortBy(arraySorted, [function (o) { return o.transactionTime; }]);


        let totalBalance = _get(sessionData, 'openingBalance.price', 0.0);
        if (!_isEmpty(sessionData.openingBalance)) {
            tabDefaultContent.push(<div className="oh-body">
                {
                    // !_isEmpty(custData.orders) && custData.orders.map((order, index) =>
                    (
                        <div className="oh-block oh-blockpopup" >
                            <div className="oh-left col-sm-3 pad-none">
                                <label>{'OPEN SHIFT'}</label>
                            </div>
                            <div className="oh-middle col-sm-6 pad-none">
                                <label>{'OPENING BALANCE'}</label>
                                <span>{moment(sessionData.openingTime).format("DD MMM, YYYY hh:mm:ss a")}</span>
                            </div>
                            <div className="oh-right col-sm-3 pad-none">
                                <label>{"$" + sessionData.openingBalance.price ? sessionData.openingBalance.price : 0.0}</label>
                                {/* <span>{order.time}</span> */}
                            </div>
                        </div>
                    )
                    // )
                }
            </div>)
        }
        !_isEmpty(PutMoneyTakeMoneyArr) && PutMoneyTakeMoneyArr.map((tab1, index) => {
            if (tab1.transactionType == 'CASHOUT') {
                totalBalance = totalBalance - tab1.amount;
            }
            else {
                totalBalance = totalBalance + tab1.amount;
            }
            tab1Content.push(<div key={index} className="oh-body">
                {
                    // !_isEmpty(custData.orders) && custData.orders.map((order, index) =>
                    (
                        <div className="oh-block oh-blockpopup" key={index} >
                            <div className="oh-left col-sm-3 pad-none">
                                <label>{(tab1.transactionType == 'CASHOUT' ? "-$" : "+$") + (tab1.amount ? tab1.amount : 0.0)}</label>
                            </div>
                            <div className="oh-middle col-sm-6 pad-none">
                                <label>{tab1.transactionType}</label>
                                <span>{moment(tab1.transactionTime).format("DD MMM, YYYY hh:mm:ss a")}</span>
                            </div>
                            <div className="oh-right col-sm-3 pad-none">
                                <label>{"$" + totalBalance ? totalBalance : 0.0}</label>
                                {/* <span>{order.time}</span> */}
                            </div>
                        </div>
                    )
                    // )
                }
            </div>)
        })

        !_isEmpty(sessionData.takeMoney) && sessionData.takeMoney.map((tab1, index) => {

            tab2Content.push(<div key={index} className="oh-body">
                {
                    // !_isEmpty(custData.orders) && custData.orders.map((order, index) =>
                    (
                        <div className="oh-block oh-blockpopup" key={index} >
                            <div className="oh-left col-sm-3 pad-none">
                                <label>{"$" + (tab1.amount ? tab1.amount : 0.0)}</label>
                            </div>
                            <div className="oh-middle col-sm-6 pad-none">
                                <label>{tab1.transactionType}</label>
                                <span>{moment(tab1.transactionTime).format("DD MMM, YYYY hh:mm:ss a")}</span>
                            </div>
                            <div className="oh-right col-sm-3 pad-none">
                                <label>{''}</label>
                                {/* <span>{order.time}</span> */}
                            </div>
                        </div>
                    )
                    // )
                }
            </div>)
        })

        return (
            <div>
                <Modal show={this.props.open} onHide={this.handleClose} className="modal-login">
                    <Modal.Header closeButton>
                        <Modal.Title>Transactions</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <h4>{heading}</h4>
                            <Tabs defaultActiveKey={this.props.activeKey} id="tab-content">
                                <Tab eventKey={1} title="Cash In">
                                    {tabDefaultContent}
                                    {tab1Content}
                                </Tab>
                                <Tab eventKey={2} title="Cash Out">
                                    {tab2Content}
                                </Tab>

                            </Tabs>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="col-sm-5 plr-5">
                            <SaveButton Class_Name="btn-default btn-gray" buttonDisplayText={'Cancel'} handlerSearch={() => this.handleClose()} />
                        </div>
                        {/* <div className="col-sm-7 plr-5">
                            <SaveButton Class_Name="btn-info btn-green" buttonDisplayText={promptBtnText} handlerSearch={() => this.handleConfirm()} />
                        </div> */}
                    </Modal.Footer>
                </Modal>
                {/* <DialogContentText id="alert-dialog-slide-description" style={{fontSize:'1.5em'}}> */}

                {/* </DialogContentText> */}

            </div>
        );
    }
}

TransactionHistory.propTypes = {
    content: PropTypes.string.isRequired,
    promptBtnText: PropTypes.string,
}

TransactionHistory.defaultProps = { promptBtnText: 'Ok' };
export default TransactionHistory;