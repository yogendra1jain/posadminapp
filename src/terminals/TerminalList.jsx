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
  Link,
  BooleanField,
  ReferenceField
} from "react-admin";

const storeId = localStorage.getItem("storeId");

const FilterActions = ({ basePath, ...rest }) => (
  <CardActions>
    <CreateButton
      {...rest}
      basePath={basePath}
      to={{
        pathname: "/Terminal/create",
        search: `?storeId=${localStorage.getItem("storeId")}`
        // state: { record: { storeId: storeId } }
      }}
    />
  </CardActions>
);


const MyEditButton = ({ record, ...props }) => (
  <EditButton
    {...props}
    component={Link}
    to={{ 
      pathname: props.basePath + "/" + record.id,
      state: { record: { storeId:localStorage.getItem("storeId")}}
    }}
  />
);
const MyShowButton = ({ record, ...props }) => (
  <ShowButton
    {...props}
    component={Link}
    to={{
      pathname: props.basePath + "/" + record.id +"/show",
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

const TerminalList = ({ permissions, ...props }) => (
  <List {...props}
    filters={<StoreFilter permissions={permissions} />}
    actions={<FilterActions />}

  >
    <Datagrid>
      <TextField source="id" />
      <ReferenceField
        label="Store"
        source="storeId"
        reference="Store"
        linkType="show"
      >
        <TextField source="name" />
      </ReferenceField>
      ) : null}
      <TextField source="name" />
      <BooleanField source="active" />
      <MyEditButton />
      <MyShowButton />
    </Datagrid>
  </List>
);

export default TerminalList;