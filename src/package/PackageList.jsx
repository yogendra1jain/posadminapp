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
  Responsive,
  ReferenceInput,
  SelectInput,
  CardActions,
  CreateButton,
} from "react-admin";
import Button from "@material-ui/core/Button";
import CallSplit from "@material-ui/icons/CallSplit";
import MobileGrid from "./MobileGrid";
import { Link } from "react-router-dom";


const PackageFilter = ({ permissions, ...props }) => {
  return (
    <Filter {...props}>
      <TextInput label="Search" source="q" alwaysOn />
      {permissions === "1" ? (
        <ReferenceInput
          label="Select Store"
          reference="Store"
          alwaysOn
          allowEmpty={false}
          source="storeId"
        >
          <SelectInput source="name" />
        </ReferenceInput>
      ) : null}
    </Filter>
  );
};

const FilterActions = ({ permissions, basePath, ...rest }) => {
  debugger;
  return (
    <CardActions>
      {localStorage.getItem('role') === "1" ? <CreateButton {...rest} basePath={basePath}
        to={{
          pathname: "/Package/create",
        }} /> :
        <CreateButton
          {...rest}
          basePath={basePath}
          to={{
            pathname: "/Package/create",
            search: `?storeId=${localStorage.getItem("storeId")}`
            // state: { record: { storeId: storeId } }
          }}
        />
      }

    </CardActions>
  );
}

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

const PackageList = ({ permissions, ...props }) => (
  <List
    {...props}
    filters={<PackageFilter permissions={permissions} />}
    actions={<FilterActions permissions={permissions} />}
    title={<PackageTitle />}>
    <Responsive 
      small={<MobileGrid />}
      medium={<Datagrid>
        {/* <TextField source="metrcId" reference="metrcs" label="METRC ID" /> */}
        <ReferenceField
          label="Product"
          source="posProductId"
          reference="Search/Products"
          linkType="show"
        >
          <TextField source="name" />
        </ReferenceField>
        <TextField source="label" />
        {/* <TextField source="packageType" /> */}
        <FunctionField
          label="Quantity"
          render={record => `${record.quantity} ${record.uom}`}
        />
  
        {/* <NumberField source="quantity" />
        <TextField source="uom" /> */}
        {/* <TextField source="metrcProduct" /> */}
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
