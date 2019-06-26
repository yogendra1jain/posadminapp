import { Datagrid, EditButton, ShowButton, List, TextField, Responsive } from "react-admin";
import React from "react";
import _get from "lodash/get";
import MobileGrid from './MobileGrid';

const ProductListTitle = ({ record }) => {
  return <span>METRC Imported Items</span>;
};

const ProductList = props => (
  <List {...props} title={<ProductListTitle />} filter={{ syncStatus: "2" }}>
    <Responsive
      small={<MobileGrid />}
      medium={<Datagrid>
        <TextField label="METRC ID" source="id" />
        <TextField label="METRC Item" source="name" />
        <TextField label="Type" source="ProductCategoryType" />
        <TextField label="Category" source="productCategoryName" />
        <TextField label="Unit of Measure" source="unitOfMeasureName" />
        <EditButton label="Import" />
        <ShowButton />
      </Datagrid>}
    />
  </List>
);

export default ProductList;
