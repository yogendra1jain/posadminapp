import React from 'react';

import "bootstrap/dist/css/bootstrap.css";
import SaveButton from '../../components/common/SaveButton.jsx'

// import connect from 'react-redux/lib/connect/connect';

import _find from 'lodash/find';
import "bootstrap/dist/css/bootstrap.css";
import connect from 'react-redux/lib/connect/connect';

import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _map from 'lodash/map';
// import SaveButton from './common/SaveButton.jsx';
import AutoComplete from '../../components/Elements/AutoComplete.jsx';
import AlertDIalog from '../../components/Elements/AlertDIalog.jsx';
import TransactionHistory from '../../components/Elements/TransactionHistory.jsx';
import { takeSessionMoney, putSessionMoney, fetchSessionList, fetchSessionData, fetchSessionAddEdit } from '../../actions/session';
import Alert from 'react-s-alert';
import SetMoney from '../../containers/SessionContainer/SetMoney.jsx';
import CommonDialog from '../../components/Elements/commonDialog.jsx';
import { fetchPosTerminalList } from '../../actions/posTerminal';
import moment from "moment";
import _sortBy from "lodash/sortBy";
import _orderBy from "lodash/orderBy";
import ClosingBalanceDialog from '../../components/Elements/closingBalanceDialog.jsx';

const SessionData = [
    {
        date: '11/1/18',
        status: 'open',
        openTime: '11:26',
        closeTime: '',
        openingBalance: {
            currencyCode: "$",
            price: 25.23
        },
        amount: 25.23,
    },
    {
        date: '10/1/18',
        status: 'close',
        openTime: '10:55',
        closeTime: '20:00',
        openingBalance: {
            currencyCode: "$",
            price: 125.23
        },
        amount: 125.23,
    },
    {
        date: '09/1/18',
        status: 'close',
        openTime: '10:55',
        closeTime: '20:00',
        openingBalance: {
            currencyCode: "$",
            price: 200.23
        },
        amount: 200.23,
    },
]

// const Terminals = [
//     {
//         displayText: "Terminal1",
//         value: '1'
//     },
//     {
//         displayText: "Terminal2",
//         value: '2'
//     },
//     {
//         displayText: "Terminal3",
//         value: '3'
//     },
// ]

const SelectedSession = {
    date: "Monday 23 June,2018",
    terminal: "Terminal1",
    managerName: "MArk",
    openTime: "Sunday 22 June,2018 07:20",
    closeTime: "Sunday 22 June,2018 20:20",
    openingBalance: 100,
    addedTransaction: 50,
    removedTransaction: 0.00,
    theClosingBalance: 150,
    realClosingBalance: 150,
    difference: 0.00,
    status: 'open'

}

const Tab1Content = [
    {
        date: '11/2/18',
    },
    {
        date: '21/2/18',
    },
    {
        date: '30/2/18',
    }
]

const putMoneyTypes = [
    {
        displayText: "SALE",
        value: 'SALE'
    },
    {
        displayText: "CASHIN",
        value: 'CASHIN'
    }
]

const takeMoneyTypes = [
    {
        displayText: "CASHOUT",
        value: 'CASHOUT'
    }
]

class sessionManageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.selectSession = this.selectSession.bind(this);
        this.handleAlertClose = this.handleAlertClose.bind(this);
        this.showTransactions = this.showTransactions.bind(this);
        this.handleSetMoney = this.handleSetMoney.bind(this);
        this.openTransaction = false;
        this.selectedTerminal = {};
        this.posTerminals = [];
        this.sessionData = [];
        this.selectedSessionData = {};
        this.open = false;
        this.alertContent = '';
        this.alertTitle = '';
        this.promptBtnText = 'OK';
        this.alertHeading = '';
        this.selectedDate = '';
        this.method = 'POST';
        this.methodGet = 'GET';
        this.methodPut = 'PUT';
        this.fetchListFlag = false;
        this.fetchSelectedData = false;
        this.openSession = false;
        this.closeSessionTF = false;
        //this.closeSession = this.closeSession.bind(this);
        this.activeKey = 1;
        this.isPrintClicked = false;
        this.fetchTerminalsFlag = false;
        this.isSubmitted = false;
        this.terminalsData = [];
        this.sessionId = '';
        this.moneyDetail = {};
        this.totalPutMoney = 0;
        this.totalTakeMoney = 0;
        this.putMoneyorTakeMoney = '';
        this.fetchSessionDataPutMoney = false;
        this.fetchSessionDataTakeMoney = false;
        this.fetchClosingBalance = false;
        this.validateClosingVar = false;
        this.selectedTerminalValue = '';

    }


    componentWillReceiveProps(props) {

        if (this.fetchListFlag) {
            if (props.sessionList.message) {
                this.fetchListFlag = false;
                this.showAlert(true, props.sessionList.message);
                
            } else if (props.sessionList.length > 0) {
                this.fetchListFlag = false;
                this.sessionList = props.sessionList;
            }
            this.forceUpdate();
        }

        if (this.fetchSelectedData) {
            if (props.sessionData.message) {
                this.fetchSelectedData = false;
                //this.showAlert(true, props.sessionData.message);
            } else if (!_isEmpty(props.sessionData)) {
                this.fetchSelectedData = false;
                this.selectedSessionData = props.sessionData;
            }
            this.forceUpdate();
        }

        if (this.isSubmitted) {
            if (props.sessionAddEdit.message) {
                this.isSubmitted = false;
                this.showAlert(false, props.sessionAddEdit.message);
                this.getUpdatedSessionList();
            } else if (!_isEmpty(props.sessionAddEdit)) {
                this.isSubmitted = false;
                this.sessionAddData = props.sessionAddEdit;
                this.showAlert(false, props.sessionAddEdit);                
            }
            this.forceUpdate();
        }

        if (this.fetchTerminalsFlag && !_isEmpty(props.posListData)) {
            this.fetchTerminalsFlag = false;
            props.posListData.map((terminals) => {
                let terminalData = {};
                _set(terminalData, 'value', terminals.id);
                _set(terminalData, 'displayText', terminals.number);
                this.terminalsData.push(terminalData);
            })
            this.forceUpdate();
        }

        if (!_isEmpty(props.sessionData)) {
            this.totalPutMoney = 0;
            this.totalTakeMoney = 0;

            props.sessionData && props.sessionData.addMoney.map((money) => {
                this.totalPutMoney += money.amount;
            })

            props.sessionData && props.sessionData.takeMoney.map((money) => {
                this.totalTakeMoney += money.amount;
            })
        }

        if(this.fetchSessionDataPutMoney){
            if (!_isEmpty(props.putMoney)){
                this.fetchSessionDataPutMoney = false;
                this.showAlert(false, props.putMoney.message);
                this.getSessionData();
            }
        }

        if(this.fetchSessionDataTakeMoney){
            if (!_isEmpty(props.takeMoney)){
                this.fetchSessionDataPutMoney = false;
                this.showAlert(false, props.takeMoney.message);
                this.getSessionData();
            }
        }

        if(this.fetchClosingBalance){
            if(!_isEmpty(props.sessionAddEdit) && props.status==200){
                this.fetchClosingBalance = false;
                this.showAlert(false, props.sessionAddEdit.message);
                this.getSessionData();
                this.getUpdatedSessionList();
            }
        }

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
            Alert.success(msg || 'successfully subimetted', {
                position: 'bottom-right',
                effect: 'slide',
                timeout: 3000,
                html: true
            });
        }

    }
    componentDidMount() {
        const { dispatch, sessionsReducer, posTerminalReducer } = this.props;
        // let url = '';
        // url = '/session';
        // this.fetchListFlag = true;
        // dispatch(fetchSessionList(sessionsReducer, url));
        this.fetchTerminalsFlag = true;
        this.retailerStore = localStorage.getItem('storeID');
        let terminalurl = '/terminals' + "/" + this.retailerStore;
        dispatch(fetchPosTerminalList(posTerminalReducer, terminalurl));
    }

    selectSession(session) {
        this.selectedDate = session.date;
        const { dispatch, sessionsReducer } = this.props;
        this.sessionId = session.id;
        this.fetchSelectedData = true;
        this.getSessionData();
    }

    getUpdatedSessionList = () => {
        const { dispatch, sessionsReducer, posTerminalReducer } = this.props;
        let url = '/sessions/terminal/' + this.selectedTerminalValue + '?salesAdmin=' + localStorage.getItem('storeManager');
        this.fetchListFlag = true;
        dispatch(fetchSessionList(sessionsReducer, url));
        this.forceUpdate();
    }

    getSessionData=()=>{
        this.fetchSessionDataPutMoney = false;
        this.fetchSessionDataTakeMoney = false;
        this.fetchSelectedData = true;
        const { dispatch, sessionsReducer } = this.props;
        let url = '/sessions/' + this.sessionId;
        dispatch(fetchSessionData(sessionsReducer, url, this.methodGet));
        this.forceUpdate();
    }

    handleInputChange(event) {
        _set(this.searchParameters, event.target.name, event.target.value);
        this.forceUpdate();
    }

    handleSelectChange = (value, name) => {
        _set(this.selectedTerminal, name, value);
        this.selectedTerminalValue = value;
        const { dispatch, sessionsReducer, posTerminalReducer } = this.props;
        let url = '/sessions/terminal/' + value + '?salesAdmin=' + localStorage.getItem('storeManager');
        this.fetchListFlag = true;
        dispatch(fetchSessionList(sessionsReducer, url));
        //this.sessionData = SessionData;
        this.forceUpdate();
    }
    handleMoneyPut = () => {
        this.open = true;
        this.putMoney = true;
        this.putMoneyorTakeMoney = 'put';
        this.alertTitle = 'Put Money In';
        this.alertHeading = 'Fill in this form if you put money in the cash-drawer';
        this.forceUpdate();
    }
    handleTakeMoney = () => {
        this.open = true;
        this.takeMoney = true;
        this.putMoneyorTakeMoney = 'take';
        this.alertTitle = 'Take Money Out';
        this.alertHeading = 'Fill in this form if you take money from the cash-drawer';
        this.forceUpdate();
    }
    handleAlertClose() {
        this.open = false;
        this.openTransaction = false;
        this.putMoney = false;
        this.forceUpdate();
    }
    handleAlertConfirm(amount, reason, transactionType) {
        const { dispatch, sessionsReducer } = this.props;
        // _set(this.moneyDetail, 'amount',
        _set(this.moneyDetail, 'amount', amount);
        _set(this.moneyDetail, 'reason', reason);
        _set(this.moneyDetail, 'transactionType', transactionType);
        let url = '/sessions/' + this.sessionId;
        this.fetchListFlag = true;
        const moneyDetail = {};
        _set(moneyDetail, 'moneyDetail', this.moneyDetail)
        if (!(transactionType == 'CASHOUT')) {
            dispatch(putSessionMoney(sessionsReducer, moneyDetail, url, this.methodPut));
            this.fetchSessionDataPutMoney = true;
        }
        else {
            dispatch(takeSessionMoney(sessionsReducer, moneyDetail, url, this.methodPut));
            this.fetchSessionDataTakeMoney = true;
        }
        this.handleAlertClose();
        this.forceUpdate();
    }

    handleSetMoney = () => {
        this.openSession = true;
        this.closeSessionTF = false;
        this.forceUpdate();
    }

    handleCloseMoney = () => {
        this.openSession = true;
        this.closeSessionTF = true;
        this.setClosingBalanceValue = 0;
        this.forceUpdate();
    }

    validateClosing = () => {
        if (this.closingBalanceSet) {
            //validate here
        } else {
            this.validateClosingVar = true;
        }
        this.forceUpdate();
    }

    showTransactions(isAdded) {
        this.alertTitle = 'Transaction History'
        this.openTransaction = true;
        if (isAdded) {
            this.activeKey = 1;
        } else {
            this.activeKey = 2;
        }
        this.forceUpdate();
    }
    handlecloseSession() {
        this.openSession = false;
        this.validateClosingVar = false;
        this.forceUpdate();
    }
    handleClose = () => {
        this.isPrintClicked = false;
        this.forceUpdate();
    }
    printData = () => {
        this.isPrintClicked = true;
        this.forceUpdate();
    }

    startSession = (openSessionBody) => {
        const { dispatch, sessionsReducer } = this.props;
        let url = '/sessions';
        let data = openSessionBody;
        this.isSubmitted = true;
        dispatch(fetchSessionAddEdit(sessionsReducer, data, url, this.method));
        this.forceUpdate();
    }

    closeSession = (closeSessionBody) => {
        const { dispatch, sessionsReducer } = this.props;
        let url = '/sessions/' + this.sessionId;
        let data = closeSessionBody;
        this.fetchClosingBalance = true;
        dispatch(fetchSessionAddEdit(sessionsReducer, data, url, this.methodPut));
        this.forceUpdate();
    }

    getRealClosingBalance=(closeSessionBody)=>{
        this.setClosingBalanceValue = closeSessionBody.realClosingBalance.price;
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

        //let sortedSessionList = _sortBy(this.props.sessionList, [function (o) { return o.openingTime; }]);

        let sortedSessionList = '';
        sortedSessionList = _orderBy(this.props.sessionList, ['openingTime'], ['desc']);

        const sessionData = !_isEmpty(sortedSessionList) && sortedSessionList.map((session, index) => {

            return (

                <div key={index} className="oh-body">
                    {
                        (
                            <div className={this.selectedDate === session.sessionDate ? "oh-block active" : "oh-block"} key={index} onClick={() => this.selectSession(session)}>
                                <div className="oh-left">
                                    <label>{moment(session.openingTime).format('dddd')} {moment(session.openingTime).format('DD MMM')}</label>
                                    {/* {session.closeTime !== '' && "-" + session.closeTime} */}
                                    <span>{moment(session.openingTime).format("hh:mm:ss a")}</span>
                                    {_get(session, 'status','') === 'OPEN' && <span>{session.status}</span>}
                                </div>
                                <div className="oh-right">
                                    <label>{_get(session.openingBalance, 'currencyCode', "$") + _get(session.openingBalance, 'price', 0.00)}</label>
                                    {/* <span>{order.time}</span> */}
                                </div>
                            </div>
                        )
                    }
                </div>

            )
        });


        return (
            <div className="d-flex">

                <SetMoney
                    open={this.openSession}
                    terminal={this.selectedTerminal.terminal}
                    closeSessionVar={this.closeSessionTF}
                    handleClose={()=>this.handlecloseSession()}
                    closeSession={(closeSessionBody) => this.getRealClosingBalance(closeSessionBody)}
                    startSession={(openSessionBody) => this.startSession(openSessionBody)}
                />

                <ClosingBalanceDialog
                    open={this.validateClosingVar}
                    handleClose={()=>this.handlecloseSession()}
                    realBalance={(this.setClosingBalanceValue ? this.setClosingBalanceValue : 0.00)}
                    theoreticalBalance={((_get(this.props, 'sessionData.openingBalance.price', 0.0) + this.totalPutMoney) - (this.totalTakeMoney))}
                    closeSession={(closeSessionBody) => this.closeSession(closeSessionBody)}
                />

                <AlertDIalog
                    open={this.open}
                    title={this.alertTitle}
                    content={this.alertContent}
                    heading={this.alertHeading}
                    promptBtnText={this.promptBtnText}
                    handleClose={() => this.handleAlertClose()}
                    handleAlertConfirm={(amount, reason, transactionType) => this.handleAlertConfirm(amount, reason, transactionType)}
                    putMoneyTypes={putMoneyTypes}
                    takeMoneyTypes={takeMoneyTypes}
                    putMoneyorTakeMoney={this.putMoneyorTakeMoney}
                />
                <CommonDialog
                    data={{}}
                    open={this.isPrintClicked}
                    handleClose={() => this.handleClose()}
                />
                <TransactionHistory
                    open={this.openTransaction}
                    title={this.alertTitle}
                    content={this.alertContent}
                    activeKey={this.activeKey}
                    heading={this.alertHeading}
                    promptBtnText={this.promptBtnText}
                    handleClose={() => this.handleAlertClose()}
                    tab1Content={Tab1Content}
                    sessionData={this.props.sessionData}
                    handleAlertConfirm={(amount) => this.handleAlertConfirm(amount)}
                />
                <div className="col-sm-4 pad-none"  >
                    <div className="pro-list-section">
                        <div className="sh-heading">
                            Session History
                        </div>
                        <div className="d-flex">
                            {/* <div className="col-flex form-d"> */}
                            <AutoComplete
                                type="single"
                                data={this.terminalsData ? this.terminalsData : []}
                                value={this.selectedTerminal.terminal ? this.selectedTerminal.terminal : ''}
                                name="terminal"
                                placeholder="Select Terminal"
                                changeHandler={
                                    (id) => {
                                        this.handleSelectChange(id, "terminal")
                                    }
                                }
                            />
                            {/* </div> */}

                        </div>
                        <div className="order-section-parent">
                            {sessionData}
                        </div>
                        <SaveButton Class_Name={"btn-info"} buttonDisplayText={'Add new'} disabled={_isEmpty(this.selectedTerminal) ? true : false} handlerSearch={this.handleSetMoney} />
                    </div>
                </div>
                {!_isEmpty(this.props.sessionData) &&
                    <div className="col-sm-8 pad-none cart-div border-left">
                        <div className="cart-top">
                            <div className="oh-heading oh-border">
                                Session Details
                            </div>

                            <h4 className="oh-id"><span> <i className="text-uppercase">{moment(this.props.sessionData.openingTime).format('dddd')} {moment(this.props.sessionData.openingTime).format('DD MMM, YYYY')}</i></span> </h4>

                            <div className="row d-flex order-status">
                                <div className="col-sm-12 od-status">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="status-div"><label>POS:</label><span className="green">{_get(this.selectedSessionData, 'terminal', '')}</span></div>
                                            <div className="status-div"><label>Store Manager:</label><span >{_get(this.props.sessionData, 'salesAdmin', '')}</span></div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="status-div"><label>Opened:</label><span>{moment(this.props.sessionData.openingTime).format("DD MMM, YYYY hh:mm:ss a")}</span></div>
                                            <div className="status-div"><label>Closed:</label><span>{_get(this.selectedSessionData, 'closedTime', '')}</span></div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 od-billpay">
                            <div className="row">
                                <div className="col-sm-6 od-billing">
                                    <div className="odb-address">
                                        <div className="row d-flex">
                                            <div className="col-sm-12 opc">
                                                <label className="label-inline">Opening Balance</label>
                                                <span className="span-inline">{"$" + _get(this.props.sessionData.openingBalance, 'price', 0.00)}</span>
                                            </div>
                                            <div className="col-sm-12 opc">
                                                <label onClick={() => this.showTransactions(true)} className="label-inline">+ Transactions</label>
                                                <span className="span-inline">{"$" + (this.totalPutMoney ? this.totalPutMoney : 0.00)}</span>
                                            </div>
                                            <div className="col-sm-12 opc">
                                                <label onClick={() => this.showTransactions(false)} className="label-inline">- Transactions</label>
                                                <span className="span-inline">{"$" + (this.totalTakeMoney ? this.totalTakeMoney : 0.00)}</span>
                                            </div>
                                            <div className="col-sm-12 opc">
                                                <label className="label-inline">Theoretical Closing Balance</label>
                                                <span className="span-inline">{"$" + ((this.props.sessionData.openingBalance.price + this.totalPutMoney) - (this.totalTakeMoney)) }</span>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                                <div className="col-sm-6 od-payment">

                                    <div className="col-sm-12 opc">
                                        <label className="label-inline">Real Closing Balance</label>
                                        <span className="span-inline">{"$" + (this.setClosingBalanceValue ? this.setClosingBalanceValue : 0.00)}</span>
                                    </div>
                                    <div className="col-sm-12 opc">
                                        <label className="label-inline">Difference</label>
                                        <span className="span-inline">{"$" + (((this.props.sessionData.openingBalance.price + this.totalPutMoney) - (this.totalTakeMoney)) - (this.setClosingBalanceValue ? this.setClosingBalanceValue : 0.00))}</span>
                                    </div>
                                </div>

                            </div>
                            {
                                this.selectedSessionData.status === 'OPEN' &&
                                <div className="row">
                                    <div className="col-sm-4 plr-5 checkout-action">
                                        <SaveButton Class_Name="btn-green text-uppercase btn btn-default" buttonDisplayText={'Put Money In'} handlerSearch={() => this.handleMoneyPut()} />

                                    </div>
                                    <div className="col-sm-4 plr-5 checkout-action">
                                        <SaveButton Class_Name="btn-green text-uppercase btn btn-default" buttonDisplayText={'Take Money Out'} handlerSearch={() => this.handleTakeMoney()} />

                                    </div>
                                    <div className="col-sm-4 plr-5 checkout-action">
                                        <SaveButton Class_Name="btn-green text-uppercase btn btn-default" buttonDisplayText={'Set Closing Balance'} handlerSearch={() => this.handleCloseMoney()} />

                                    </div>
                                </div>
                            }

                            <div className="row">
                                <label className="pull-right">Sale</label>
                            </div>
                            <div className="row">
                                <label className="pull-left">Cash In</label>
                                <label className="pull-right">{"$" + _get(this.selectedSessionData, 'cashIn', 0)}</label>
                            </div>
                            <div className="row">
                                <label className="pull-left">Employee Payroll Deduct</label>
                                <label className="pull-right">{"$" + _get(this.selectedSessionData, 'empPayrollDeduct', 0)}</label>
                            </div>
                        </div>


                        <div className="col-sm-12 plr-30" style={{ background: "#FFF", padding: "5px 10px" }}>

                            <div className="col-sm-6 plr-5 checkout-action">

                                <SaveButton Class_Name="btn-green text-uppercase" handlerSearch={() => this.printData()} buttonDisplayText={'Print'}
                                />
                            </div>
                            {this.selectedSessionData.status === 'OPEN' &&
                                <div className="col-sm-6 plr-5 checkout-action">
                                    <SaveButton Class_Name="btn-green text-uppercase" buttonDisplayText={'Validate Closing'} handlerSearch={() => (this.setClosingBalanceValue==0) ? this.handleCloseMoney() : this.validateClosing()}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                }

            </div>
        )


    }

}

const mapStateToProps = state => {

    let { sessionsReducer, posTerminalReducer } = state

    let { status } = sessionsReducer || '';
    let { isFetching } = sessionsReducer || false;
    let { type } = sessionsReducer || '';
    let { putMoney, takeMoney } = sessionsReducer || '';
    let { sessionData, sessionList, sessionAddEdit } = sessionsReducer || {};
    let { posListData } = posTerminalReducer || '';

    return {
        status,
        isFetching,
        type,
        sessionData,
        sessionList,
        sessionAddEdit,
        posListData,
        putMoney,
        takeMoney
    }
}

export default connect(mapStateToProps)(sessionManageContainer);
