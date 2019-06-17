import React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  ReferenceField,
  NumberField,
  FunctionField
} from "react-admin";
import _find from "lodash/find";
import _get from "lodash/get";

const TaxAppliedToChoices = [
  // { id: 0, name: 'Dummy Product' },
  { id: 1, name: "Medical Cannabis" },
  { id: 2, name: "Recreational Cannabis" },
  { id: 3, name: "All Cannabis" },
  { id: 4, name: "Non Cannabis" },
  { id: 5, name: "All Products" }
];

const findTaxApplied = record => {
  let taxApplied = _find(TaxAppliedToChoices, [
    "id",
    _get(record, "appliedTo", 0)
  ]);
  return _get(taxApplied, "name", "");
};

const TaxShowTitle = ({record}) => {
  return <span>Tax {record.name}</span>
}

const TaxShow = props => (
  <Show {...props} title={<TaxShowTitle />}>
    <SimpleShowLayout>
      <ReferenceField label="Store" source="storeId" reference="Store">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="name" />
      <NumberField source="percentage" />
      <FunctionField
        label="Tax Rate Applicable On"
        render={record => findTaxApplied(record)}
      />
      <FunctionField
        label="Active"
        render={record => (_get(record, "active", false) ? "Yes" : "No")}
      />
    </SimpleShowLayout>
  </Show>
);

export default TaxShow;
