import {
  TextField,
  Datagrid,
  List,
  EditButton,
  ShowButton,
  Responsive,
  Filter,
  TextInput
} from "react-admin";
import React from "react";
import { AddressField } from "../global/components/AddressField";
import _get from 'lodash/get';
import MobileGrid from './MobileGrid';

const StoreFilter = props => {
  return (
    <Filter {...props}>
      <TextInput label="Search" source="q" alwaysOn />
    </Filter>
  );
};

const StoreList = ({ permissions, ...props }) => (
  <List {...props} filters={<StoreFilter />}>
    <Responsive
      small={<MobileGrid />}
      
      medium={<Datagrid rowClick="edit">
        <TextField source="name" />
        <AddressField />
        {/* <TextField source="code" /> */}
        {permissions === '1' ? <EditButton /> : null}
        <ShowButton />
      </Datagrid>}
    />
  </List>
);

export default StoreList;
