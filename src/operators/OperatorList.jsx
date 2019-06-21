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
  FunctionField,
  Filter,
  ReferenceInput,
  SelectInput,
  CardActions,
  CreateButton,
  BooleanField,
  Link,
  EmailField,
  NumberField,
  ReferenceField,
  TextInput
} from "react-admin";

const FilterActions = ({ basePath, ...rest }) => {
  return (
    <CardActions>
      <CreateButton
        {...rest}
        basePath={basePath}
        to={{
          pathname: "Operator/create",
          search: `?storeId=${localStorage.getItem("storeId")}`
          // state: { record: { storeId: storeId } }
        }}
      />
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

const OperatorFilter = ({ permissions, ...props }) => {
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

const FullNameField = ({ record = {} }) => (
  <div style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}>
    {record.person.firstName} {record.person.lastName}
  </div>
);

const SampleList = ({ permissions, ...props }) => {
  return (
    <List
      {...props}
      filters={<OperatorFilter permissions={permissions} />}
      actions={<FilterActions />}
    >
      <Datagrid>
        <FullNameField label="Name" />
        {permissions === "1" ? (
          <ReferenceField
            label="Store"
            source="storeId"
            reference="Store"
            linkType="show"
          >
            <TextField source="name" />
          </ReferenceField>
        ) : null}
        {/* <TextField label="First Name" source="person.firstName" /> */}
        {/* <TextField label="Last Name" source="person.lastName" /> */}
        <TextField label="Phone Number" source="phoneNumber.phoneNumber" />
        <EmailField source="email" />
        <BooleanField source="active" />
        {/* <NumberField source="loginPin" /> */}
        <FunctionField
          label="Role"
          render={record =>
            _get(record, "role", "cashier") === "cashier"
              ? "Budtender"
              : "Manager"
          }
        />

        <MyEditButton />
        <MyShowButton />
      </Datagrid>
    </List>
  );
};

export default SampleList;
