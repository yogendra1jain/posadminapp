import React from 'react';
import { Create, 
    SimpleForm, 
    TextInput,
    NumberInput
} from 'react-admin';

const StrainCreate = props => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <TextInput label="Strain Name" source="name" />
            <NumberInput label="THC Level" source="thcLevel" />
            <NumberInput label="CBD Level" source="cbdLevel" />
            <NumberInput label="Indica Percentage" source="indicaPercentage" />
            <NumberInput label="Saliva Percentage" source="sahivaPercentage" />
            <TextInput label="Genetics" source="genetics" />
        </SimpleForm>
    </Create>
);

export default StrainCreate;