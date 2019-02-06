import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import SaveButton from '../common/SaveButton.jsx';

import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEmpty from 'lodash/isEmpty';

import Slide from 'material-ui/transitions/Slide';
import PropTypes from 'prop-types';

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class ClosingBalanceDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
    };
    this.data = {};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open
    });
  }
  handleInputChange(event) {
    _set(this.data, event.target.name, event.target.value);
    this.forceUpdate();
  }

  shouldComponentUpdate(nextProps) {
    return this.props.open !== nextProps.open;
  }

  handleClose = () => {
    this.data = {};
    this.props.handleClose();
  };

  handleConfirm = () => {
    this.closeSession = {};
    _set(this.closeSession, 'status', 'CLOSE');
    this.realClosingBalance = {}
    _set(this.realClosingBalance, 'currencyCode', '$');
    _set(this.realClosingBalance, 'price', this.props.realBalance);

    this.closeSessionBody = Object.assign({}, this.closeSession, { realClosingBalance: this.realClosingBalance });
    this.props.closeSession(this.closeSessionBody);
    this.handleClose();
  }

  handleSelectChange = (value, name) => {
    if (name == 'transactionType') {
      _set(this.putMoneyBody, name, value);
    }
    else if (name == 'transactionTypeTakeMoney') {
      _set(this.takeMoneyBody, name, value);
    }
    this.forceUpdate();
  }

  render() {
    const { content, promptBtnText, title, heading, realBalance, theoreticalBalance } = this.props;
    const lossOrProfit = (realBalance - theoreticalBalance);
    return (
      <div>
        <Modal show={this.props.open} className="modal-login">
          <Modal.Header>
            <Modal.Title>Theory is not the same as the real balance. Do you want to continue?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h4>{heading}</h4>
              <div className="row">
                <div className="row col-md-12">
                  <h3> Real Balance: ${realBalance} </h3>
                </div>
                <div className="row col-md-12">
                  <h3> Theory is: ${theoreticalBalance} </h3>
                </div>
                <div className="row col-md-12">
                  <h3> {((lossOrProfit >= 0) ? 'Profit: ' : 'Loss: ') + ("$" + lossOrProfit)} </h3>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="col-sm-5 plr-5">
              <SaveButton Class_Name="btn-default btn-gray" buttonDisplayText={'Cancel'} handlerSearch={() => this.handleClose()} />
            </div>
            <div className="col-sm-7 plr-5">
              <SaveButton Class_Name="btn-info btn-green" buttonDisplayText={'Ok'} handlerSearch={() => this.handleConfirm()} />
            </div>
          </Modal.Footer>
        </Modal>
        {/* <DialogContentText id="alert-dialog-slide-description" style={{fontSize:'1.5em'}}> */}

        {/* </DialogContentText> */}

      </div>
    );
  }
}

ClosingBalanceDialog.propTypes = {
  content: PropTypes.string.isRequired,
  promptBtnText: PropTypes.string,
}

ClosingBalanceDialog.defaultProps = { promptBtnText: 'Ok' };
export default ClosingBalanceDialog;