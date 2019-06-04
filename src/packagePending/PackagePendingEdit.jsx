
import { Edit, TabbedForm, FormTab, TextInput, BooleanInput, ReferenceInput, AutocompleteInput, SelectInput, TextField, AutoComplete, FormInput, ArrayInput, SimpleFormIterator, DateInput } from 'react-admin';
import React from 'react';
import { withStyles } from '@material-ui/core/styles/withStyles';
import Quantity from './Quantity';
import SplitPackageForm from './SplitPackageForm';

const Aside = (props)=>{

return(<span>aside is here</span>)
}

const PackagePendingEdit = props => (
    <Edit {...props}  >
        <TabbedForm >
            <FormTab label='Product Details'>
                <TextField source="id" />
                <TextField source="metricProduct" />
                {/* <ReferenceInput source="uId" reference="us"><SelectInput optionText="id" /></ReferenceInput> */}
                {/* <Quantity /> */}
                <ArrayInput source="Split Package" style={{ width: '100%' }} aside={<Aside />}>
                    <SimpleFormIterator>
<ReferenceInput  source="posProductId" reference="Search/Products" label='Product Name'>
                            <AutocompleteInput optionText="name" />
                        </ReferenceInput>
                        <TextInput source="quantity" label='qty' />
                    </SimpleFormIterator>
                </ArrayInput>
                <TextField source="manifest" />
                <TextInput source="facility" />
                <TextInput source="productCategory" />
                <TextInput source="quantity" />
                <TextInput source="vendor" />
                <TextInput source="lastModified" />
                <BooleanInput source="metricApproved" />
            </FormTab>
            <FormTab label="Scans">
                <SplitPackageForm {...props} />
            </FormTab>

        </TabbedForm>
    </Edit>
);

export default PackagePendingEdit;