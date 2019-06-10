import {
  ShowButton,
  FunctionField,
  Datagrid,
  EditButton,
  Filter,
  List,
  TextField,
  TextInput
} from "react-admin";
import React from "react";
import DineroPrice from "../global/components/DineroPrice";
import SyncIcon from "@material-ui/icons/Sync";
import _get from "lodash/get";

const ProductListTitle = ({ record }) => {
  return <span>Unfinished Product List</span>;
};

const choices = [
  { id: 0, name: "Pending Sync" },
  { id: 1, name: "Live" },
  { id: 2, name: "Partial (Metrc Imported)" }
];

const ProductFilter = props => {
  return (
    <Filter {...props}>
      <TextInput label="Search" source="q" alwaysOn />
    </Filter>
  );
};

const ProductList = props => (
  <List {...props} title={<ProductListTitle />} filter={{syncStatus: '2'}} filters={<ProductFilter />}>
    <Datagrid>
      <TextField label="Name" source="name" />
      <TextField label="METRC Id" source="metrcId" />
      <TextField label="SKU" source="sku" />
      <DineroPrice label="Sale Price" source="salePrice.amount" />

      <FunctionField
        text-align="left"
        label="Sync Status"
        render={record =>
          _get(record, "syncStatus", 0) === 0 ? (
            <SyncIcon style={{ color: "orange" }} />
          ) : (
            <SyncIcon style={{ color: "green" }} />
          )
        }
      />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);

export default ProductList;
