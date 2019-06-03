import React from "react";
import {
  Datagrid,
  TextField,
  EmailField,
  ArrayField,
  SingleFieldList,
  ChipField,
  List,
  EditButton
} from "react-admin";
import { PhoneNumber } from "../global/components/PhoneNumber";

const VendroListTitle = ({ record }) => {
  return <span>Vendor List</span>;
};

const VendorList = props => (
  <List {...props} title={<VendroListTitle />}>
    <Datagrid rowClick="edit">
      {/* <TextField source="id" /> */}
      <TextField source="name" />
      <EmailField source="email" />
      {/* <BooleanField source="status" />
            <TextField source="code" /> */}
      <PhoneNumber source="phoneNumber" />
      <ArrayField source="licenses">
        <SingleFieldList>
          <ChipField source="type" />
        </SingleFieldList>
      </ArrayField>
      <EditButton />
    </Datagrid>
  </List>
);

export default VendorList;
