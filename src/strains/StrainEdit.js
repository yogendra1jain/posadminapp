import { TextInput,
    NumberInput,
    Edit,
    SimpleForm
} from 'react-admin';
import React from 'react';

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
            <NumberInput label="Indica Percentage" source="indicaPercentage" />
            <NumberInput label="Saliva Percentage" source="sahivaPercentage" />
            <TextInput label="Genetics" source="genetics" />
        </SimpleForm>
    </Edit>
);

export default StrainEdit;