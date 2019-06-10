import React from "react";
import SyncIcon from "@material-ui/icons/Sync";
import _get from "lodash/get";
import {
  List,
  Datagrid,
  ReferenceField,
  NumberField,
  TextField,
  Filter,
  TextInput,
  EditButton,
  FunctionField
} from "react-admin";
import Button from '@material-ui/core/Button';
import CallSplit from '@material-ui/icons/CallSplit';
import { Link } from 'react-router-dom';
const PackageFilter = props => {
  return (
    <Filter {...props}>
      <TextInput label="Search" source="q" alwaysOn />
    </Filter>
  );
};

const AddNewSplitButton = ({ record }) => (
  <Button
    title="Split Package"
    color="primary"
    component={Link}
    to={{
      pathname: '/Package/create',
      search: `?sourcePackageId=${record.id}`
    }}
    label="Split Package"
  >
    <CallSplit />
    Split 
  </Button>
);

const PackageList = props => (
  <List {...props} filters={<PackageFilter />}>
    <Datagrid>
      <TextField source="metrcId" reference="metrcs" label="METRC ID" />
      <ReferenceField source="posProductId" reference="Search/Products">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="label" />
      {/* <TextField source="packageType" /> */}
      <NumberField source="quantity" />
      <TextField source="uom" />
      <TextField source="metrcProduct" />
      <FunctionField
        text-align="left"
        label="Sync Status"
        render={record =>
          _get(record, "syncStatus", 0) === 0 ? (
            <SyncIcon style={{ color: "orange" }} />
          ) : _get(record, "syncStatus", 0) === 3 ? (
            <SyncIcon
              style={{ color: "red" }}
              titleAccess={record.metrcError}
            />
          ) : (
                <SyncIcon style={{ color: "green" }} />
              )
        }
      />
      <EditButton label="Edit" />
      <AddNewSplitButton label="Split" />
    </Datagrid>
  </List>
);

export default PackageList;
