
// import { TextField, BooleanField, ReferenceField, DateField, NumberField, Datagrid, List, } from 'react-admin';
// import React from 'react';
// export const ProductList = props => (
//     <List {...props}>
//         <Datagrid rowClick="edit">
//             <TextField source="sku" />
//             <TextField source="name" />
//             <TextField source="costPrice.amount" />
//             <TextField source="salePrice.amount" />
//             {/* <TextField source="id" />
//             <TextField source="name" />
//             <TextField source="description" />
//             <TextField source="category1" />
//             <TextField source="category2" />
//             <TextField source="category3" />
//             <TextField source="image" />
//             <BooleanField source="active" />
//             <TextField source="salePrice.currency" />
//             <TextField source="sku" />
//             <TextField source="upcCode" />
//             <BooleanField source="isTaxable" />
//             <ReferenceField source="retailerId" reference="retailers"><TextField source="id" /></ReferenceField>
//             <TextField source="costPrice.currency" />
//             <BooleanField source="discountable" />
//             <NumberField source="createdOn.seconds" />
//             <DateField source="dimensions" />
//             <TextField source="keywords" />
//             <DateField source="extendedSku" />
//             <TextField source="seasonality" />
//             <NumberField source="updatedOn.seconds" />
//             <TextField source="additionalUpcCodes" /> */}
//         </Datagrid>
//     </List>
// );


import React from 'react';
import {
    translate,
    AutocompleteInput,
    BooleanInput,
    DateInput,
    Edit,
    TextInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    SimpleForm,
} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';


const OrderTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.commands.title', { reference: record.reference })}
    </span>
));

const editStyles = {
    root: { alignItems: 'flex-start' },
};

let ProductEdit = props => (
    <Edit title={<OrderTitle />}     {...props}>
        <SimpleForm>
            <TextInput source="name" options={{ fullWidth: true }} />
            <TextInput source="sku" options={{ fullWidth: true }} />
            <TextInput source="description" />


        </SimpleForm>
    </Edit>
);
ProductEdit = withStyles(editStyles)(ProductEdit);
export  {ProductEdit};
