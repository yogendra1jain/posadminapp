import React from 'react';
import _get from 'lodash/get';
import Modal from 'react-bootstrap/lib/Modal';
import SaveButton from "../../components/common/SaveButton.jsx";
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import ZReportPrintView from './ZReportPrintView.jsx';
import ReactToPrint from "react-to-print";

class ZReportPrintData extends React.Component {
    //   state = {
    //     open: this.props.open,
    //   };
    constructor(props) {
        super(props);

    }


    shouldComponentUpdate(props){
        if(props.open){
            return true;
        }else{
            return false;
        }
    }


    handleClose = () => {
        this.forceUpdate();
        this.props.closeModal();
    }
    onSendEmail= () =>{

    }




    render() {

        return (
            <div>
                <Modal show={this.props.open} className='modal-invoice' style={{marginTop:'70px'}}>
                    <Modal.Body>
                     <ZReportPrintView 
                        data = {this.props.data}
                        ref={el => (this.componentRef = el)}
                        showHeader = {true}
                     />
                    </Modal.Body>
                    <Modal.Footer>
                         <div className="col-sm-4 plr-5">
                            <SaveButton Class_Name="btn-default btn-gray" buttonDisplayText={'Close'} handlerSearch={this.handleClose} />
                        </div>
                        <div className="col-sm-4 plr-5" >
                            <ReactToPrint
                                trigger={() => <input type="button"  value="Print" className="btn btn-green" />}
                                content={() => this.componentRef}
                                onAfterPrint = {this.handleClose}
                            />
                         </div>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

export default ZReportPrintData;