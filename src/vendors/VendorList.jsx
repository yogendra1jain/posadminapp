import React from "react";
import {
  Datagrid,
  TextField,
  EmailField,
  ArrayField,
  SingleFieldList,
  ChipField,
  List,
  EditButton,
  Responsive,
  Filter,
  TextInput
} from "react-admin";
import { PhoneNumber } from "../global/components/PhoneNumber";
import MobileGrid from "./MobileGrid";

const VendroListTitle = ({ record }) => {
  return <span>Vendor List</span>;
};

const VendorFilter = (props) => {
  return (
    <Filter {...props}>
      <TextInput label="Search" source="q" alwaysOn />
    </Filter>
  )
}

const VendorList = props => (
  <List {...props} title={<VendroListTitle />} filters={<VendorFilter />}>
    <Responsive
      small={<MobileGrid />}
      medium={
        <Datagrid rowClick="edit">
          <TextField source="name" />
          <EmailField source="email" />
          <TextField source="code" /> */}
          <PhoneNumber source="phoneNumber" />
          <ArrayField source="licenses">
            <SingleFieldList>
              <ChipField source="type" />
            </SingleFieldList>
          </ArrayField>
          <EditButton />
        </Datagrid>
      }
    />
  </List>
);

export default VendorList;
