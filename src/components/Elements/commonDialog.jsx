import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';

import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEmpty from 'lodash/isEmpty';

import Slide from 'material-ui/transitions/Slide';
import PropTypes from 'prop-types';

import SessionPrintData from '../sessionPrint.jsx';
import ReactToPrint from "react-to-print";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class CommonDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
        };
        this.data = {};

        this.handleInputChange = this.handleInputChange.bind(this);
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
        this.props.handleAlertConfirm(this.data.amount, this.data.reason);
        this.data = {};
    }

    render() {
        const { content, promptBtnText, title, heading } = this.props;
        return (
            <div>
                <Modal show={this.props.open} className="modal-login">
                    <Modal.Header>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SessionPrintData
                            data={{}}
                            ref={el => (this.componentRef = el)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="col-sm-5 plr-5">
                         <ReactToPrint
                                trigger={() => <input type="button"  value="Print" className="btn btn-green" />}
                                content={() => this.componentRef}
                                onAfterPrint = {this.handleClose}
                            />
                            {/* <SaveButton Class_Name="btn-default btn-gray" buttonDisplayText={'Cancel'} handlerSearch={() => this.handleClose()} /> */}
                        </div>
                        <div className="col-sm-7 plr-5">
                            {/* <SaveButton Class_Name="btn-info btn-green" buttonDisplayText={promptBtnText} handlerSearch={() => this.handleConfirm()} /> */}
                        </div>
                    </Modal.Footer>
                </Modal>
                {/* <DialogContentText id="alert-dialog-slide-description" style={{fontSize:'1.5em'}}> */}

                {/* </DialogContentText> */}

            </div>
        );
    }
}

CommonDialog.propTypes = {
    content: PropTypes.string.isRequired,
    promptBtnText: PropTypes.string,
}

CommonDialog.defaultProps = { promptBtnText: 'Ok' };
export default CommonDialog;