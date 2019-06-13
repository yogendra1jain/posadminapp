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
  ReferenceField
} from "react-admin";
import React from "react";
import _find from "lodash/find";
import _get from "lodash/get";

const TaxAppliedToChoices = [
  { id: 1, name: "Medical Cannabis" },
  { id: 2, name: "Recreational Cannabis" },
  { id: 3, name: "All Cannabis" },
  { id: 4, name: "Non Cannabis" },
  { id: 5, name: "All Products" }
];
const storeId = localStorage.getItem("storeId");
const TaxActions = ({ basePath, ...rest }) => (
  <CardActions>
    <CreateButton
      {...rest}
      basePath={basePath}
      to={{
        pathname: "/Tax/create",
        state: { record: { storeId: storeId } }
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
      state: { record: { storeId: storeId } }
    }}
  />
);

const TaxFilter = ({ permissions, ...props }) => {
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

const findTaxApplied = record => {
  let taxApplied = _find(TaxAppliedToChoices, [
    "id",
    _get(record, "appliedTo", 0)
  ]);
  return _get(taxApplied, "name", "");
};

const TaxList = ({ permissions, ...props }) => (
  <List
    {...props}
    filters={<TaxFilter permissions={permissions} />}
    actions={<TaxActions />}
  >
    <Datagrid>
      <TextField source="name" />
      <TextField label="Percentage" source="percentage" />
      {permissions == "1" ? (
        <ReferenceField
          label="Store"
          source="storeId"
          reference="Store"
          linkType="show"
        >
          <TextField source="name" />
        </ReferenceField>
      ) : null}
      <FunctionField
        label="Tax Applied To"
        render={record => findTaxApplied(record)}
      />
      <FunctionField
        label="Active"
        render={record => (_get(record, "active", false) ? "Yes" : "No")}
      />
      <MyEditButton />
      <ShowButton />
    </Datagrid>
  </List>
);

export default TaxList;
