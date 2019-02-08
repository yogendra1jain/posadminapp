import React from 'react';
import {Field} from 'redux-form'
import {TextFieldInput, ReactSelectWrapper} from '../common/MaterialUiComponents';

const AddressComponent = (props) => {
    return (
        <div>
            <label class="control-label">Address Line 1</label>
            <Field placeholder="Address Line 1" name="addressLine1" component={TextFieldInput}/>

            <label class="control-label">Address Line 2</label>
            <Field placeholder="Address Line 1" name="addressLine2" component={TextFieldInput}/>

            <label class="control-label">Country</label>
            <Field name='country' hideLabel={true} placeholder='Country *' options={[]} component={ReactSelectWrapper} />

            <label class="control-label">Zip Code</label>
            <Field name='postalCode' hideLabel={true} placeholder='Zip Code *' component={TextFieldInput} />

            <label class="control-label">State</label>
            <Field label="State" name="state"  placeholder='State *' component={TextFieldInput}/>

            <label class="control-label">City</label>
            <Field label="City" name="city" placeholder='City *' component={TextFieldInput}/>
        </div>
    )
}

export default AddressComponent