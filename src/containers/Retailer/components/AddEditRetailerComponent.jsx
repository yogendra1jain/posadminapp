import React from 'react';
import { Field } from 'redux-form';
import { TextFieldInput } from '../../../components/common/MaterialUiComponents';
import _get from 'lodash/get';
import Row from "react-bootstrap/lib/Row";

const AddEditRetailerComponent = () => {
    return (
        <div>
            <div className="col-sm-4" style={{ marginTop: '25px' }}>
                <Field name={`name`} placeholder="Name" id={`name`} label={'Name *'} component={TextFieldInput} />
            </div>
            <div className="col-sm-4" style={{ marginTop: '25px' }}>
                <Field name={`domainLink`} placeholder="Domain Link" id={`domainLink`} label={'Domain Link *'} component={TextFieldInput} />
            </div>
        </div>
    )
}

export default AddEditRetailerComponent;