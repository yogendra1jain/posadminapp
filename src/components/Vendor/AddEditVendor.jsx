import React from 'react';
import {Field, FormSection} from 'redux-form';
import {TextFieldInput} from '../common/MaterialUiComponents';
import NameComponent from './NameComponent';

const AddEditVendor = (props) => {
    return (
        <div>
            <div className="col-md-12">
                <label class="control-label">ID</label>
                <Field name="id" placeholder="ID" component={TextFieldInput} />
            </div>
            <div className="col-md-12">
                <FormSection name="customer">
                    <NameComponent />
                </FormSection>
            </div>
            <div className="col-md-12">
                <label class="control-label">Email</label>
                <Field name="email" placeholder="Email" component={TextFieldInput}/> 
            </div>
            <div className="col-md-12">
                <label class="control-label">Phone Number</label>
                <Field name="phoneNumber" placeholder="Phone Number" component={TextFieldInput}/> 
            </div>
        </div>
    )
}

export default AddEditVendor;