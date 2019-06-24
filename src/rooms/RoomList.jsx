
import React from "react";

//lodash imports
import _find from "lodash/find";
import _get from "lodash/get";

//React admin imports
import {
  TextField,
  Datagrid,
  List,
  EditButton,
  ShowButton,
  BooleanField,
  CardActions,
  CreateButton,
  Link,
  ReferenceInput,
  SelectInput,
  Filter,
  Responsive
} from "react-admin";
import MobileGrid from "./MobileGrid";

const FilterActions = ({ permissions, basePath, ...rest }) => {
  return (
    <CardActions>
      {localStorage.getItem('role') === "1" ? <CreateButton {...rest} basePath={basePath}
        to={{
          pathname: "/Rooms/create",
        }} /> :
        <CreateButton
          {...rest}
          basePath={basePath}
          to={{
            pathname: "/Rooms/create",
            search: `?storeId=${localStorage.getItem("storeId")}`
          }}
        />
      }

    </CardActions>
  );
}

const MyEditButton = ({ record, ...props }) => (
  <EditButton
    {...props}
    component={Link}
    to={{
      pathname: props.basePath + "/" + record.id,
      state: { record: { storeId: localStorage.getItem("storeId") } }
    }}
  />
);

const MyShowButton = ({ record, ...props }) => (
  <ShowButton
    {...props}
    component={Link}
    to={{
      pathname: props.basePath + "/" + record.id + "/show",
      search: `?storeId=${localStorage.getItem("storeId")}`
    }}
  />
);

const RoomsFilter = ({ permissions, ...props }) => {
  return (
    <Filter {...props}>
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

const RoomList = ({ ...props, permissions }) => {
  return (
    <List {...props}
      filters={<RoomsFilter permissions={permissions} />}
      actions={<FilterActions permissions={permissions} />}
    >
      <Responsive
        small={<MobileGrid />}
        medium={<Datagrid>
          <TextField label="Location" source="location" />
          <TextField label="Info" source="info" />
          <BooleanField label="Active" source="active" />
          <BooleanField label="Item Avaiable For Sale" source="inventoryForSale" />
          <MyEditButton />
          <MyShowButton />
        </Datagrid>}>
      </Responsive>
    </List>
  )
}

export default RoomList
