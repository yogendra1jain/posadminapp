import React, {Component} from 'react';
import { reduxForm } from 'redux-form'
import AddEditCustomerComponent from '../../../components/Customer/AddEditCustomer';
import SaveButton from '../../../components/common/SaveButton';

class AddEditCustomer extends Component {

    handleAddCustomer = (values) => {
        console.log(values, 'add customer form values')
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <div className="d-flex">
                <form onSubmit={handleSubmit(this.handleAddCustomer)}>
                    <AddEditCustomerComponent />
                    <div className="form-btn-group">
                        <SaveButton ButtonType='submit' Class_Name={"btn-info"} buttonDisplayText={'Save'}/>
                    </div>
                </form>
            </div>
        )
    }
} 

AddEditCustomer = reduxForm({
    form: 'AddCustomer'
  })(AddEditCustomer)

export default AddEditCustomer;