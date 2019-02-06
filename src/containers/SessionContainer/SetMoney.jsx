import React from 'react';
import _get from 'lodash/get';
import Modal from 'react-bootstrap/lib/Modal';
import SaveButton from '../../components/common/SaveButton.jsx';
import SecurePinModal from '../../components/SecurePinModal.jsx';
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';
import FormControl from "react-bootstrap/lib/FormControl";
import _set from 'lodash/set';
import _map from 'lodash/map';
import _merge from 'lodash/merge';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const products = [{
    id: 1,
    name: "Pennies",
    sign1: '*',
    noOfCoins: '',
    sign2: '=',
    subTotal: ''
}, {
    id: 2,
    name: "Nickles",
    sign1: '*',
    noOfCoins: '',
    sign2: '=',
    subTotal: ''
},
{
    id: 3,
    name: "Dimes",
    sign1: '*',
    noOfCoins: '',
    sign2: '=',
    subTotal: ''
},
{
    id: 4,
    name: "Quarters",
    sign1: '*',
    noOfCoins: '',
    sign2: '=',
    subTotal: ''
},
{
    id: 5,
    name: "Fifty Cent",
    sign1: '*',
    noOfCoins: '',
    sign2: '=',
    subTotal: ''
},
{
    id: 6,
    name: "1 Dollar Coin",
    sign1: '*',
    noOfCoins: '',
    sign2: '=',
    subTotal: ''
},
{
    id: 7,
    name: "$1 Bill",
    sign1: '*',
    noOfCoins: '',
    sign2: '=',
    subTotal: ''
},
{
    id: 8,
    name: "$2 Bill",
    sign1: '*',
    noOfCoins: '',
    sign2: '=',
    subTotal: ''
}, {
    id: 9,
    name: "$5 Bill",
    sign1: '*',
    noOfCoins: '',
    sign2: '=',
    subTotal: ''
}, {
    id: 10,
    name: "$10 Bill",
    sign1: '*',
    noOfCoins: '',
    sign2: '=',
    subTotal: ''
}, {
    id: 11,
    name: "$20 Bill",
    sign1: '*',
    noOfCoins: '',
    sign2: '=',
    subTotal: ''
}, {
    id: 12,
    name: "$50 Bill",
    sign1: '*',
    noOfCoins: '',
    sign2: '=',
    subTotal: ''
}, {
    id: 13,
    name: "$100 Bill",
    sign1: '*',
    noOfCoins: '',
    sign2: '=',
    subTotal: ''
}];


class SetMoney extends React.Component {
    //   state = {
    //     open: this.props.open,
    //   };
    constructor(props) {
        super(props);
        this.inputValue = '';
        this.totalValue = 0;
        this.handleClose = this.handleClose.bind(this);
        this.enteredAmount = 0;
        this.openSessionBody = {};
        this.closeSessionBody = {};

    }

    onValueChanged = (moneyColumnName, rowKey, event) => {

        if (moneyColumnName == "$1 Bill") {
            this.inputValue = (1 * event);

        }
        else if (moneyColumnName == "$2 Bill") {
            this.inputValue = (2 * event)
        }
        else if (moneyColumnName == "$5 Bill") {
            this.inputValue = (5 * event)
        }
        else if (moneyColumnName == "$10 Bill") {
            this.inputValue = (10 * event)
        }
        else if (moneyColumnName == "$20 Bill") {
            this.inputValue = (20 * event)
        }
        else if (moneyColumnName == "$50 Bill") {
            this.inputValue = (50 * event)
        }
        else if (moneyColumnName == "$100 Bill") {
            this.inputValue = (100 * event)
        }
        _set(products[rowKey], 'subTotal', this.inputValue);
        this.forceUpdate();
        this.totalValue = 0;
    }

    inputMoneyColumn = (cell, row, rowIndex, rowKey) => {
        let moneyColumnName = row.name;
        return (

            <FormControl
                type="text"
                onBlur={() => this.setIndex(rowKey)}
                autoFocus={this.index === rowKey}
                name="value"
                value={row.noOfCoins ? row.noOfCoins : 0}
                onChange={(event) => this.onValueChanged(moneyColumnName, rowKey, event.target.value)}
            />)
    }

    setIndex = (index) => {
        this.index = index;
        this.forceUpdate();
    }

    handleClose() {
        this.props.handleClose();
        this.inputValue = 0;
        products.map(prod => {
            _set(prod, 'subTotal', 0);
        });
        this.totalValue = 0;
    }

    startSession = () => {
        this.openSession = {};
        _set(this.openSession, 'status', 'OPEN');
        _set(this.openSession, 'terminal', this.props.terminal);
        this.openingBalance = {}
        _set(this.openingBalance, 'currencyCode', '$');
        _set(this.openingBalance, 'price', this.totalValue);
        _set(this.openSession, 'salesAdmin', localStorage.getItem('storeManager'));

        this.openSessionBody = Object.assign({}, this.openSession, { openingBalance: this.openingBalance });
        this.props.startSession(this.openSessionBody);
        this.handleClose();
    }

    closeSessionFunc = () => {
        this.closeSession = {};
        _set(this.closeSession, 'status', 'CLOSE');
        this.realClosingBalance = {}
        _set(this.realClosingBalance, 'currencyCode', '$');
        _set(this.realClosingBalance, 'price', this.totalValue);

        this.closeSessionBody = Object.assign({}, this.closeSession, { realClosingBalance: this.realClosingBalance });
        this.props.closeSession(this.closeSessionBody);
        this.handleClose();
    }

    // subTotalColumn = (cell, row, rowIndex, rowKey) => {
    //     return (            
    //        this.inputValue
    //     )
    // }

    getInputAmount = (amount) => {
        this.enteredAmount = '0';
        this.enteredAmount = amount;
        if (products[this.index].noOfCoins) {
            if (this.enteredAmount == "") {
                products[this.index].noOfCoins = products[this.index].noOfCoins.substring(0, (products[this.index].noOfCoins.length - 1));
            }
            else {
                products[this.index].noOfCoins += this.enteredAmount;
            }
        } else {
            _set(products[this.index], 'noOfCoins', this.enteredAmount);
        }
        this.onValueChanged(products[this.index].name, this.index, products[this.index].noOfCoins);
        this.forceUpdate();
    }

    shouldComponentUpdate(props) {
        if (!props.open) {
            _map(products, (product) => {
                product.noOfCoins = 0;
            })
            return true;
        } else {
            return true;
        }
    }

    render() {

        _map(products, (total) => {
            if (total.subTotal >= 1) {
                let subTotal = parseFloat(total.subTotal);
                this.totalValue += subTotal;
            }
        })

        return (
            <div>
                <Modal show={this.props.open} onHide={this.props.handleClose} className="session-modal">
                    <Modal.Header>
                        {this.props.closeSessionVar ?
                            <div className="modal-hbar">
                                <SaveButton Class_Name="btn-default btn-gray" buttonDisplayText={'Cancel'} handlerSearch={this.handleClose} />
                                <Modal.Title>Close Session</Modal.Title>
                                <SaveButton Class_Name="btn-info btn-green" buttonDisplayText={'Set'} handlerSearch={()=>this.closeSessionFunc()} />
                            </div> :
                            <div className="modal-hbar">
                                <SaveButton Class_Name="btn-default btn-gray" buttonDisplayText={'Cancel'} handlerSearch={this.handleClose} />
                                <Modal.Title>Open Session</Modal.Title>
                                <SaveButton Class_Name="btn-info btn-green" buttonDisplayText={'Start'} handlerSearch={this.startSession} />
                            </div>
                        }
                    </Modal.Header>
                    <Modal.Body>
                        <div className="session-box">
                            <div className="row">
                                <div className="col-sm-7">
                                    <h4 className="ob"> Opening Balance </h4>
                                    <BootstrapTable data={products} className={' '} >
                                        <TableHeaderColumn dataField='id' isKey={true} hidden={true}>id</TableHeaderColumn>
                                        <TableHeaderColumn width='80' dataAlign='center' editable={false} dataField='name' >Coin/Bill Value</TableHeaderColumn>
                                        <TableHeaderColumn width='20' dataAlign='center' editable={false} dataField='sign1'>*</TableHeaderColumn>
                                        <TableHeaderColumn width='80' dataAlign='center' editable={true} dataField='noOfCoins' dataFormat={this.inputMoneyColumn} >Number of Coins/Bills</TableHeaderColumn>
                                        <TableHeaderColumn width='20' dataAlign='center' editable={false} dataField='sign2' >=</TableHeaderColumn>
                                        <TableHeaderColumn width='80' dataAlign='center' editable={false} dataField='subTotal'>SubTotal</TableHeaderColumn>
                                    </BootstrapTable>
                                </div>
                                <div className="col-sm-5 text-center">
                                    <SecurePinModal getAmount={(amount) => this.getInputAmount(amount)} />
                                </div>
                            </div>
                        </div>
                        <div className="session-amount">
                            <h2> Total: ${this.totalValue}</h2>
                        </div>
                    </Modal.Body>
                    {/* <Modal.Footer>
                        
                        
                    </Modal.Footer> */}
                </Modal>
            </div>
        );
    }
}

export default SetMoney;