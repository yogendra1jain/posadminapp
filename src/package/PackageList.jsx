import React from "react";
import SyncIcon from "@material-ui/icons/Sync";
import _get from "lodash/get";
import {
  List,
  Datagrid,
  ReferenceField,
  TextField,
  Filter,
  TextInput,
  EditButton,
  FunctionField,
  Responsive
} from "react-admin";
import Button from "@material-ui/core/Button";
import CallSplit from "@material-ui/icons/CallSplit";
import { Link } from "react-router-dom";
import MobileGrid from "./MobileGrid";

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
      pathname: "/Package/create",
      search: `?sourcePackageId=${record.id}`
    }}
    label="Split Package"
  >
    <CallSplit />
    Split
  </Button>
);

const PackageTitle = () => {
  return <span>In Hand Packages</span>;
};

const PackageList = props => (
  <List {...props} filters={<PackageFilter />} title={<PackageTitle />}>
    <Responsive 
      small={<MobileGrid />}
      medium={<Datagrid>
        <ReferenceField
          label="Product"
          source="posProductId"
          reference="Search/Products"
          linkType="show"
        >
          <TextField source="name" />
        </ReferenceField>
        <TextField source="label" />
        <FunctionField
          label="Quantity"
          render={record => `${record.quantity} ${record.uom}`}
        />
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
      </Datagrid>}
    />
  </List>
);

export default PackageList;
