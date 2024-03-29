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
  Filter,
  ReferenceInput,
  SelectInput,
  CardActions,
  CreateButton,
  Link,
  BooleanField,
  ReferenceField,
  Responsive,
  TextInput
} from "react-admin";
import MobileGrid from "./MobileGrid";

const storeId = localStorage.getItem("storeId");

const FilterActions = ({ permissions, basePath, ...rest }) => {
  return (
    <CardActions>
      {localStorage.getItem("role") === "1" ? (
        <CreateButton
          {...rest}
          basePath={basePath}
          to={{
            pathname: "/Terminal/create"
          }}
        />
      ) : (
        <CreateButton
          {...rest}
          basePath={basePath}
          to={{
            pathname: "/Terminal/create",
            search: `?storeId=${localStorage.getItem("storeId")}`
            // state: { record: { storeId: storeId } }
          }}
        />
      )}
    </CardActions>
  );
};

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

const TerminalFilter = ({ permissions, ...props }) => {
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

const TerminalList = ({ permissions, ...props }) => (
  <List
    {...props}
    filters={<TerminalFilter permissions={permissions} />}
    actions={<FilterActions permissions={permissions} />}
  >
    <Responsive
      small={<MobileGrid />}
      medium={
        <Datagrid>
          <TextField source="name" />
          <ReferenceField
            label="Store"
            source="storeId"
            reference="Store"
            linkType="show"
          >
            <TextField source="name" />
          </ReferenceField>
          ) : null}
          <BooleanField source="active" />
          <MyEditButton />
          <MyShowButton />
        </Datagrid>
      }
    />
  </List>
);

export default TerminalList;
