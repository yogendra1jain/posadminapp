import React from 'react';
import {Field} from 'redux-form';
import {TextFieldInput} from '../common/MaterialUiComponents';

const NameComponent = (props) => {
    return (
        <div>   
            <label className=''>First Name</label>
            <Field name="firstName" component={TextFieldInput} placeholder="First name" />

            <label className=''>Middle Name</label>
            <Field name="middleName" component={TextFieldInput} placeholder="Middle name" />

            <label className=''>Last Name</label>
            <Field name="lastName" component={TextFieldInput} placeholder="Last name" />
        </div>
    )
}

export default NameComponent;