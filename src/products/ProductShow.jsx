import React from 'react';
import { Show, SimpleShowLayout, TextField, BooleanField, DateField, NumberField, ReferenceField, ImageField } from 'react-admin';
import _get from 'lodash/get';
import moment from 'moment';
const DisplayDateField = ({ source, record = {} }) => <span>{moment(_get(record, source) * 1000).format('MM-DD-YYYY')}</span>;


const ProductShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="description" />
            <ReferenceField label="Category" source="category1" reference="Category">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Sub Category" source="category2" reference="Category">
                <TextField source="name" />
            </ReferenceField>
            {/* <TextField source="category1" />
            <TextField source="category2" /> */}
            <ImageField source="image" />
            <BooleanField source="active" />
            <TextField source="unitOfMeasure" />
            <TextField label='Currency' source="salePrice.currency" />
            <TextField source="sku" />
            <TextField source="upcCode" />
            <BooleanField source="isTaxable" />
            <BooleanField source="discountable" />
            <DisplayDateField label='Create On' addLabel={true} source='createdOn.seconds' />
            <DisplayDateField label='Updated On' addLabel={true} source='updatedOn.seconds' />
        </SimpleShowLayout>
    </Show>
);

export default ProductShow;