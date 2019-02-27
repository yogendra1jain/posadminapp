import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEmpty from 'lodash/isEmpty';
/* Material import */
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

/* Redux Imports */
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import asyncValidate from './validate';
import { saveRetailerData } from '../../../actions/retailer';
import { showMessage } from '../../../actions/common';
import AddEditRetailerComponent from '../components/AddEditRetailerComponent.jsx';
import {
    uploadDocument
} from '../../../actions/products';
import Row from "react-bootstrap/lib/Row";

/* Component Imports */

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: 32,
    },
});



class AddEditRetailerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.imagePreviewUrl = '';
        this.files = [];
        this.fileNames = [];
        this.fileUploadUrl = '';
        this.fileData = {};
        this.fileUrl = '';
        this.hexToBase64 = this.hexToBase64.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.method = 'POST';
    }

    handleFileChange(event) {
        event.preventDefault();
        console.log(event.target.files[0], 'vfyufyfyfy')
        let reader = new FileReader();
        let file = event.target.files[0];
        this.fileNames = (<li> {file.name} </li>)
        reader.onloadend = () => {
            this.fileData = {
                file: file,
                imagePreviewUrl: reader.result
            };
            this.imagePreviewUrl = 'data:image/jpeg;base64,' + this.hexToBase64(this.fileData.imagePreviewUrl);
        }
        reader.readAsDataURL(file)
        this.files = event.target.files;
        let fileNames = [];
        this.fileNames = [];
        Array.prototype.forEach.call(this.files, function (file, index) { fileNames.push(<li key={index}>{file.name}</li>) });
        this.fileNames = fileNames;

        const { dispatch, productsReducer } = this.props;
        let fileUrl = `${process.env.MEDIA_SERVICE_ADDRESS}`
        dispatch(uploadDocument(file, fileUrl, productsReducer));

        // this.props.dispatch(uploadDocument('', '', file))
        //     .then((data) => {
        //         console.log('csv data saved successfully.', data);
        //     }, (err) => {
        //         console.log('err while saving csv data', err);

        //     })
        this.forceUpdate();
    }

    hexToBase64(str) {
        return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
    }

    addRetailer = (values) => {
        let saveUrl = `/Retailer/Create`;
        let data = { ...values };
        data.logo = this.imagePreviewUrl;

        this.props.dispatch(saveRetailerData('', saveUrl, data))
            .then((data) => {
                this.props.dispatch(showMessage({ text: `Saved succeffully.`, isSuccess: true }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 1000);
                this.props.history.push('/retailers')
            }, (err) => {
                console.log('err while saving retailer', err);
                this.props.dispatch(showMessage({ text: `${JSON.stringify(err)}`, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 5000);
            })
    }

    render() {
        const { handleSubmit, initialValues } = this.props
        return (

            <div className="strainBlock">
                <form onSubmit={handleSubmit(this.addRetailer)}>
                    <div className="col-sm-12">
                        <AddEditRetailerComponent
                            {...this.props}
                        />

                        <div className="col-sm-4" style={{ marginTop: '25px' }}>
                            <label className="control-label">Upload Image</label>
                            <div className="" style={{ marginTop: "5px", float: "left", marginRight: "15px" }}>
                                {/* <input type="file" id="files" className="hidden"/> */}
                                <label className="btn btn-default" for="files">Select file</label>
                                <input type="file" title=" " className="hidden" id="files" name="images" multiple={false} onChange={this.handleFileChange} />
                            </div>
                            <div className="pull-left" style={{ marginTop: "5px", padding: "5px 0 0" }}>
                                <ul>{this.fileNames}</ul>
                            </div>
                        </div>
                        <div className="col-sm-3" style={{ marginTop: '25px' }}>
                            <Button type="submit" variant="raised">SAVE</Button>
                        </div>
                    </div>
                    {this.imagePreviewUrl != '' &&
                        <div className="row" style={{ marginTop: "10px" }}>
                            <div className="col-sm-12">
                                <img style={{ width: '100%', maxWidth: "500px", height: '350px' }} src={this.imagePreviewUrl} />
                            </div>
                        </div>
                    }



                </form>

            </div>
        )
    }
}


AddEditRetailerContainer = reduxForm({
    form: 'AddEditRetailer',
    enableReinitialize: true,
    asyncValidate,
})(AddEditRetailerContainer)

const mapStateToProps = state => {
    let { retailerReducer } = state;
    let { selectedRetailer } = retailerReducer || [];

    let initialValues = {}
    if (!_isEmpty(selectedRetailer)) {
        initialValues = { ...selectedRetailer }
    }

    return {
        initialValues,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(AddEditRetailerContainer))