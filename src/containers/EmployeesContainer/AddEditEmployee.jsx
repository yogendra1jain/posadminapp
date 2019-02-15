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
import { showMessage } from '../../actions/common';

import Dropzone from 'react-dropzone'
import _cloneDeep from 'lodash/cloneDeep';
import _concat from 'lodash/concat';
// import DropzoneArea from '../../components/common/dropzone/dropzoneArea';
// import dropzoneHandler from '../../components/common/dropzone/onDropDecorater';
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

class AddEditEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
        }
    }
    saveEmployee = (values) => {
        let saveUrl = `/VendorProduct/Save`;
        let data = { ...values };

        _set(data, 'price.price', Number(_get(data, 'price.price')));
        _set(data, 'defaultOrderQty', Number(_get(data, 'defaultOrderQty')));
        _set(data, 'conversionFactor', Number(_get(data, 'conversionFactor')));
        _set(data, 'retailerId', localStorage.getItem('retailerID'));

        // this.props.dispatch(vendorProductSave('', saveUrl, data))
        //     .then((data) => {
        //         this.props.dispatch(showMessage({ text: `Saved succeffully.`, isSuccess: true }));
        //         setTimeout(() => {
        //             this.props.dispatch(showMessage({}));
        //         }, 1000);
        //         this.props.history.push('/vendorproducts')
        //     }, (err) => {
        //         console.log('err while saving vendor product', err);
        //         this.props.dispatch(showMessage({ text: `${JSON.stringify(err)}`, isSuccess: false }));
        //         setTimeout(() => {
        //             this.props.dispatch(showMessage({}));
        //         }, 5000);
        //     })

    }
    onDrop(files) {
        let filesArr = _cloneDeep(this.state.files);
        let tempFile = _cloneDeep(files);
        filesArr = _concat(filesArr, tempFile)
        this.setState({ files: filesArr }, () => { console.log('objjjjj', this.state.files) });
        // this.props.dispatch(fetchAwsUrlFromImage(files))
        //     .then((data) => {
        //         this.props.dispatch(showMessage({ text: 'Image Uploaded Successfully.', isSuccess: true }));
        //         setTimeout(() => {
        //             this.props.dispatch(showMessage({}));
        //         }, 1000);
        //     }, (err) => {
        //         console.log('err', err);
        //     })
    }
    onCancel() {
        this.setState({
            files: []
        });
    }
    render() {
        const { handleSubmit, initialValues } = this.props;
        const files = this.state.files.map(file => (
            <li key={file.name}>
                {file.name} - {file.size} bytes
                <img src={file.preview} alt={'preview'} />
            </li>

        ))
        return (

            <div className="d-flex">
                <div className='panel-container'>
                    <span className='panel-heading'>{initialValues.id ? 'Update' : 'New'} Employee </span>
                </div>
                <div className='box-conversion-container'>
                    <form onSubmit={handleSubmit(this.saveEmployee)}>

                        <div className="row" style={{ marginTop: '10px', marginLeft: '10px' }}>
                            <Button type="submit" variant="raised">SAVE</Button>
                        </div>
                        <div className="col-sm-4">
                            <section>
                                <div>
                                    <Dropzone
                                        onDrop={this.onDrop.bind(this)}
                                        onFileDialogCancel={this.onCancel.bind(this)}
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <div>

                                                <p>Drop files here, or click to select files</p>
                                            </div>
                                        )}
                                    </Dropzone>
                                </div>
                                <aside>
                                    <h4>Files</h4>
                                    <ul>{files}</ul>
                                </aside>
                            </section>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


AddEditEmployee = reduxForm({
    form: 'AddEditEmployee',
    enableReinitialize: true,
    // asyncValidate,
})(AddEditEmployee)

const mapStateToProps = state => {
    let { productsReducer } = state;
    let { selectedVendorProduct } = productsReducer || [];

    let initialValues = {}
    if (!_isEmpty(selectedVendorProduct)) {
        initialValues = { ...selectedVendorProduct }
    }

    return {
        initialValues,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(AddEditEmployee))