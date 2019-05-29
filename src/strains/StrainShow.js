import React from 'react';
import { Show, SimpleShowLayout, TextField, NumberField , EditButton, RichTextField } from 'react-admin';


 const  StrainShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField label="Metrc Id" source="metricId" />
            <TextField label="Genetics" source="genetics" />
            <TextField label="Strain Name" source="name" />
            <NumberField label="THC Level" source="thcLevel" />
            <NumberField label="CBD Level" source="cbdLevel" />
            <NumberField label="Indica Percentage" source="indicaPercentage" />
            <NumberField
                label="Sativa Percentage"
                source="sativaPercentage" />
        </SimpleShowLayout>
    </Show >
);

export default StrainShow;