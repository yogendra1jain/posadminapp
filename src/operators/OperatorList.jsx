
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
  ReferenceField
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

const StoreFilter = ({ permissions, ...props }) => {
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


const SampleList = ({ ...props, permissions }) => {
  return (
    <List {...props}
      filters={<StoreFilter permissions={permissions} />}
      actions={<FilterActions />}
    >
      <Datagrid>
        <ReferenceField source="storeId" reference="Store"><TextField source="name" /></ReferenceField>
        <BooleanField source="active" />
        <TextField label="First Name" source="person.firstName" />
        <TextField label="Last Name" source="person.lastName" />
        <NumberField label="Phone Number" source="phoneNumber.phoneNumber" />
        <EmailField source="email" />
        <NumberField source="loginPin" />
        <TextField source="role" />
        <MyEditButton />
        <MyShowButton />
      </Datagrid>
    </List>
  )
}

export default SampleList
