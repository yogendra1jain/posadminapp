import React from 'react';
import { Show, SimpleShowLayout, TextField, BooleanField, DateField, NumberField, ReferenceField, ImageField } from 'react-admin';
import _get from 'lodash/get';
import DineroPrice from "../global/components/DineroPrice";

const ProductTitle = ({ record }) => {
    return (
      <span>
        Product {record ? `${record.name}` : null}
      </span>
    )
};

const ProductShow = props => (
    <Show {...props} title={<ProductTitle />}>
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="description" />
            <ReferenceField label="Category" source="category1" reference="Category" linkType="show">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Sub Category" source="category2" reference="Category" linkType="show">
                <TextField source="name" />
            </ReferenceField>
            <DineroPrice label='Sale Price' source="salePrice.amount" />
            <DineroPrice label='Cost Price' source="costPrice.amount" />
            <TextField source="sku" />
        </SimpleShowLayout>
    </Show>
);

export default ProductShow;