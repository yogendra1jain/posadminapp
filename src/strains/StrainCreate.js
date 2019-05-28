import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    FormDataConsumer,
    REDUX_FORM_NAME
} from 'react-admin';
import { change } from "redux-form";
import { connect } from 'react-redux';


const StrainCreate = props => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <TextInput label="Strain Name" source="name" />
            <NumberInput label="THC Level" source="thcLevel" />
            <NumberInput label="CBD Level" source="cbdLevel" />
            <FormDataConsumer>
                {({ formData, dispatch, ...rest }) => (<NumberInput
                    format={v => v > 100 ? 100 : (v < 0 ? 0 : v)}
                    parse={v => v > 100 ? 100 : (v < 0 ? 0 : v)}
                    onChange={(e, v) => {
                        v = v > 100 ? 100 : (v < 0 ? 0 : v)
                        dispatch(change(REDUX_FORM_NAME, 'sativaPercentage', 100 - v))
                    }}
                    label="Indica Percentage"
                    source="indicaPercentage" />)}
            </FormDataConsumer>
            <FormDataConsumer>
                {({ formData, dispatch, ...rest }) => (<NumberInput
                    InputLabelProps={{ shrink: true }}
                    parse={v => v > 100 ? 100 : (v < 0 ? 0 : v)}
                    format={v => v > 100 ? 100 : (v < 0 ? 0 : v)}
                    onChange={(e, v) => {
                        v = v > 100 ? 100 : (v < 0 ? 0 : v)
                        dispatch(change(REDUX_FORM_NAME, 'indicaPercentage', 100 - v))
                    }}
                    label="Sativa Percentage"
                    source="sativaPercentage" />)}
            </FormDataConsumer>
            <TextInput label="Genetics" source="genetics" />
        </SimpleForm>
    </Create>
);

export default StrainCreate;