import React from 'react';
import _get from 'lodash/get';
import Modal  from 'react-bootstrap/lib/Modal';
import ModalBody  from 'react-bootstrap/lib/ModalBody';
import ModalHeader  from 'react-bootstrap/lib/ModalHeader';
import ModalFooter  from 'react-bootstrap/lib/ModalFooter';
import ModalTitle  from 'react-bootstrap/lib/ModalTitle';

import { findDOMNode } from 'react-dom';
import Button from "react-bootstrap";

import SaveButton from "../components/common/SaveButton.jsx";


class SecurePinModal extends React.Component {
    //   state = {
    //     open: this.props.open,
    //   };
    constructor(props) {
        super(props);       
        this.enteredAmount = '';
        this.isValid = true;
    }

    handleInput = (input) => {
        
            if(isNaN(input)){
                this.enteredAmount = this.enteredAmount.substring(0,(this.enteredAmount.length-1));
            }else{
                // if(this.enteredPin.length<4){
                    this.enteredAmount = input.toString();
                //}
            }
            this.props.getAmount(this.enteredAmount);
            this.forceUpdate();
             
    }

    handleChange = (e) => {
        this.enteredAmount = e.target.value;
        this.forceUpdate();
    }
   

    render() {

        return (
            <div className="secure-pin">
                
                    
                    <div className="m-2 d-flex">
                        <div className="col-sm-4 dialpad-pt">
                            <Button onClick={()=>this.handleInput(1)}>1</Button>
                        </div>
                        <div className="col-sm-4 dialpad-pt">
                            <Button onClick={()=>this.handleInput(2)}>2</Button>
                        </div>
                        <div className="col-sm-4 dialpad-pt">
                            <Button onClick={()=>this.handleInput(3)}>3</Button>
                        </div>
                    </div>
                    <div className="m-2 d-flex">
                        <div className="col-sm-4 dialpad-pt">
                            <Button onClick={()=>this.handleInput(4)}>4</Button>
                        </div>
                        <div className="col-sm-4 dialpad-pt">
                            <Button onClick={()=>this.handleInput(5)}>5</Button>
                        </div>
                        <div className="col-sm-4 dialpad-pt">
                            <Button onClick={()=>this.handleInput(6)}>6</Button>
                        </div>
                    </div>
                    <div className="m-2 d-flex">
                        <div className="col-sm-4 dialpad-pt">
                            <Button onClick={()=>this.handleInput(7)}>7</Button>
                        </div>
                        <div className="col-sm-4 dialpad-pt">
                            <Button onClick={()=>this.handleInput(8)}>8</Button>
                        </div>
                        <div className="col-sm-4 dialpad-pt">
                            <Button onClick={()=>this.handleInput(9)}>9</Button>
                        </div>
                    </div>
                    <div className="m-2 d-flex">
                        <div className="col-sm-4">
                            
                        </div>
                        <div className="col-sm-4 dialpad-pt">
                            <Button onClick={()=>this.handleInput(0)}> 0</Button>
                        </div>
                        <div className="col-sm-4 dialpad-pt last">
                            <Button onClick={()=>this.handleInput('delete')}> {""}</Button>
                        </div>
                    </div>
                        
                {/* <Dialog
                    open={this.props.open}
                    // onClose={this.handleClose}
                    aria-labelledby="secure-pin-modal"
                    transition={Slide}
                    style={{ width: "100%" }}
                >
                    <DialogTitle id="form-dialog-title-customer" style={{ textAlign: "center", paddingBottom: "5px" }}><h2>Confirmation</h2></DialogTitle>
                    <DialogContent>                        
                       
                        <div className="col-sm-12">
                            {!this.isValid && 
                            <h4> Please Enter correct Pin. </h4>
                            }
                            <div className="col-sm-12">
                                <input className="col-sm-12" maxLength="4" type="number" value={this.enteredPin} onChange={this.handleChange} name="pin" />
                            </div>
                            <div className="col-sm-12">
                                <div className="col-sm-4">
                                    <Button onClick={()=>this.handleInput(1)}> 1</Button>
                                </div>
                                <div className="col-sm-4">
                                    <Button onClick={()=>this.handleInput(2)}> 2</Button>
                                </div>
                                <div className="col-sm-4">
                                    <Button onClick={()=>this.handleInput(3)}> 3</Button>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="col-sm-4">
                                    <Button onClick={()=>this.handleInput(4)}> 4</Button>
                                </div>
                                <div className="col-sm-4">
                                    <Button onClick={()=>this.handleInput(5)}> 5</Button>
                                </div>
                                <div className="col-sm-4">
                                    <Button onClick={()=>this.handleInput(6)}> 6</Button>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="col-sm-4">
                                    <Button onClick={()=>this.handleInput(7)}> 7</Button>
                                </div>
                                <div className="col-sm-4">
                                    <Button onClick={()=>this.handleInput(8)}> 8</Button>
                                </div>
                                <div className="col-sm-4">
                                    <Button onClick={()=>this.handleInput(9)}> 9</Button>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="col-sm-4">
                                    
                                </div>
                                <div className="col-sm-4">
                                    <Button onClick={()=>this.handleInput(0)}> 0</Button>
                                </div>
                                <div className="col-sm-4">
                                    <Button onClick={()=>this.handleInput('delete')}> {"<X"}</Button>
                                </div>
                            </div>
                        </div>
                       



                    </DialogContent>
                    <DialogActions>
                       
                        <SaveButton  buttonDisplayText={'Validate'} handlerSearch={()=>this.validateUser()} />
                        <SaveButton  buttonDisplayText={'Logout'} handlerSearch={this.handleClose} />
                      

                    </DialogActions>
                </Dialog> */}
            </div>
        );
    }
}

export default SecurePinModal;