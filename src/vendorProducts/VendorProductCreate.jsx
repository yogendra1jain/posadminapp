import React from "react";
import {
  Create,
  TextInput,
  ReferenceInput,
  NumberInput,
  BooleanInput,
  SimpleForm,
  SelectInput,
  required
} from "react-admin";
import PriceInput from "../global/components/PriceInput";

const VendorProductCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput
        source="vendorId"
        reference="vendors"
        validate={required()}
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput
        source="posProductId"
        reference="Search/Products"
        validate={required()}
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="sku" />
      <PriceInput validate={required()} label="Price" source={"price.amount"} />
      <NumberInput
        source="defaultOrderQty"
        defaultValue={1}
        validate={required()}
      />
      <NumberInput
        source="conversionFactor"
        label="Pack Size"
        defaultValue={1}
        validate={required()}
      />
      <BooleanInput
        source="primary"
        label="Is Vendor Primary Supplier"
        defaultValue={true}
      />
      <TextInput source="upc" />
      <NumberInput source="discountPercent" label="Vendor Discount?" />
      {/* <TextInput source="unitType" /> */}
    </SimpleForm>
  </Create>
);

export default VendorProductCreate;
