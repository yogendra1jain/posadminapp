import { TextField, Datagrid, List, EditButton, ShowButton } from "react-admin";
import React from "react";
import { AddressField } from "../global/components/AddressField";

const StoreList = ({ permissions, ...props }) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <AddressField />
      {/* <TextField source="code" /> */}
      {permissions === '1' ? <EditButton /> : null}
      <ShowButton />
    </Datagrid>
  </List>
);

export default StoreList;
