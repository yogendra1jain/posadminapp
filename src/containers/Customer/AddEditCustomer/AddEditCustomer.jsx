import React, {Component} from 'react';
import { reduxForm } from 'redux-form'
import AddEditCustomerComponent from '../../../components/Customer/AddEditCustomerNew';

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
                </form>
            </div>
        )
    }
} 

AddEditCustomer = reduxForm({
    form: 'AddCustomer'
  })(AddEditCustomer)

export default AddEditCustomer;