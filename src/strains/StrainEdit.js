
import React from 'react';
import { change } from 'redux-form';
import {
    TextInput,
    NumberInput,
    Edit,
    SimpleForm,
    REDUX_FORM_NAME,
    FormDataConsumer
} from 'react-admin';

const StrainTitle = ({ record }) => {
    return (
        <span>
            Strain {record ? `${record.name}` : ''}
        </span>
    )
};

const StrainEdit = props => (
    <Edit title={<StrainTitle />} {...props}>
        <SimpleForm>
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
    </Edit>
);

export default StrainEdit;