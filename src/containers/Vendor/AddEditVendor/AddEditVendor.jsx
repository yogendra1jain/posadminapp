import React, {Component} from 'react';
import { reduxForm } from 'redux-form'
import AddEditVendorComponent from '../../../components/Vendor/AddEditVendor';
import SaveButton from '../../../components/common/SaveButton';

class AddEditVendor extends Component {

    handleAddCustomer = (values) => {
        console.log(values, 'add vendor form values')
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <div className="d-flex">
                <form onSubmit={handleSubmit(this.handleAddCustomer)}>
                    <AddEditVendorComponent />
                    <div className="form-btn-group">
                        <SaveButton ButtonType='submit' Class_Name={"btn-info"} buttonDisplayText={'Save'}/>
                    </div>
                </form>
            </div>
        )
    }
} 

AddEditVendor = reduxForm({
    form: 'AddVendor'
  })(AddEditVendor)

export default AddEditVendor;