import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import SaveButton from '../common/SaveButton.jsx';
import AutoComplete from '../../components/Elements/AutoComplete.jsx';

import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEmpty from 'lodash/isEmpty';

import Slide from 'material-ui/transitions/Slide';
import PropTypes from 'prop-types';

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class AlertDialogSlide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
    };
    this.data = {};
    this.putMoneyBody = {};
    this.takeMoneyBody = {};

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
    if (this.putMoneyBody.transactionType) {
      this.props.handleAlertConfirm(this.data.amount, this.data.reason, this.putMoneyBody.transactionType);
    }
    else {
      this.props.handleAlertConfirm(this.data.amount, this.data.reason, this.takeMoneyBody.transactionTypeTakeMoney);
    }
    this.data = {};
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
    const { content, promptBtnText, title, heading, putMoneyTypes, takeMoneyTypes, handleSelectChange, putMoneyBody, putMoneyorTakeMoney } = this.props;
    return (
      <div>
        <Modal show={this.props.open} className="modal-login">
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h4>{heading}</h4>
              <div className="row">
                <div className="row col-md-12">
                  <input className="col-md-12" style={{ marginLeft: "5px" }} type="text" placeholder="Amount" onChange={this.handleInputChange} value={_get(this.data, 'amount', 0)} name="amount" />
                </div>
                <div className="row col-md-12">
                  <textarea className="col-md-12" style={{ marginLeft: "5px" }} type="text" placeholder="Reason" onChange={this.handleInputChange} value={_get(this.data, 'reason', '')} name="reason" ></textarea>
                </div>
                {putMoneyorTakeMoney == 'put' ?
                  <div className="row col-md-12">
                    <AutoComplete
                      type="single"
                      data={putMoneyTypes ? putMoneyTypes : []}
                      value={this.putMoneyBody.transactionType ? this.putMoneyBody.transactionType : ''}
                      name="transactionType"
                      placeholder="Select Transaction Type"
                      changeHandler={
                        (id) => {
                          this.handleSelectChange(id, "transactionType")
                        }
                      }
                    />
                  </div> :
                  <div className="row col-md-12">
                    <AutoComplete
                      type="single"
                      data={takeMoneyTypes ? takeMoneyTypes : []}
                      value={this.takeMoneyBody.transactionTypeTakeMoney ? this.takeMoneyBody.transactionTypeTakeMoney : ''}
                      name="transactionTypeTakeMoney"
                      placeholder="Select Transaction Type"
                      changeHandler={
                        (id) => {
                          this.handleSelectChange(id, "transactionTypeTakeMoney")
                        }
                      }
                    />
                  </div>
                }
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="col-sm-5 plr-5">
              <SaveButton Class_Name="btn-default btn-gray" buttonDisplayText={'Cancel'} handlerSearch={() => this.handleClose()} />
            </div>
            <div className="col-sm-7 plr-5">
              <SaveButton Class_Name="btn-info btn-green" buttonDisplayText={promptBtnText} handlerSearch={() => this.handleConfirm()} />
            </div>
          </Modal.Footer>
        </Modal>
        {/* <DialogContentText id="alert-dialog-slide-description" style={{fontSize:'1.5em'}}> */}

        {/* </DialogContentText> */}

      </div>
    );
  }
}

AlertDialogSlide.propTypes = {
  content: PropTypes.string.isRequired,
  promptBtnText: PropTypes.string,
}

AlertDialogSlide.defaultProps = { promptBtnText: 'Ok' };
export default AlertDialogSlide;