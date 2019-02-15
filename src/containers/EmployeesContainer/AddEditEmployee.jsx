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
import { uploadEmployeesCSV } from '../../actions/employees';
import Dropzone from 'react-dropzone'

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
            file: {}
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
        // this.setState({ files });

        let formData;
        let url = '/Employee/ByStore';
        if (files.length > 0) {
            this.setState({ file: files[0] })
            formData = new FormData();
            formData.append('file', files[0])
            formData.append('mediaType', 'customer')
            formData.append('mediaTypeId', '1234567');
            this.props.dispatch(uploadEmployeesCSV('', url, formData))
            .then((data) => {
                console.log('csv data saved successfully.', data);
            }, (err) => {
                console.log('err while saving csv data', err);
            })
        }
    }

    onCancel() {
        this.setState({
            file: {}
        });
    }

    render() {
        const { handleSubmit, initialValues } = this.props;
        const { file } = this.state;
        // const files = this.state.files.map(file => (
        //     <li key={file.name}>
        //         {file.name} - {file.size} bytes
        //     </li>
        // ))
        return (

            <div className="">
                <div className='panel-container'>
                    <span className='panel-heading'>{initialValues.id ? 'Update' : 'New'} Employee </span>
                </div>
                <div className='box-conversion-container'>
                    <form onSubmit={handleSubmit(this.saveEmployee)}>

                        <div className="row" style={{ marginTop: '10px', marginLeft: '10px' }}>
                            <Button type="submit" variant="raised">SAVE</Button>
                        </div>
                        <div className='box-conversion-container'>
                            <section >
                                <Dropzone
                                    onDrop={this.onDrop.bind(this)}
                                    onFileDialogCancel={this.onCancel.bind(this)}
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <span className="dropzone">Drop files here, or click to select files</span>
                                        </div>
                                    )}
                                </Dropzone>
                            </section>
                            <aside>
                                <h4>Files</h4>
                                <ul>
                                    <li key={file.name}>
                                        {file.name} - {file.size} bytes
                                    </li>
                                </ul>
                            </aside>

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
    let { employeesReducer } = state;
    let { employeeCsvData } = employeesReducer || [];

    let initialValues = {};

    return {
        initialValues,
        employeeCsvData
    }
}

export default connect(mapStateToProps)(withStyles(styles)(AddEditEmployee))