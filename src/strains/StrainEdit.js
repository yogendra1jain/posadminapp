
import React from 'react';
import { change } from 'redux-form';
import {
    TextInput,
    NumberInput,
    Edit,
    SimpleForm,
    REDUX_FORM_NAME,
    FormDataConsumer,
    TextField
} from 'react-admin';
import {EditTitle} from '../global/components/Title';

const StrainEdit = props => (
    <Edit title={<EditTitle source="name" />} {...props}>
        <SimpleForm>
            <TextField label="Metrc Id" source="metricId" />
            <TextField label="Genetics" source="genetics" />
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
        </SimpleForm>
    </Edit>
);

export default StrainEdit;