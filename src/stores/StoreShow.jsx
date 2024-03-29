import { Show, SimpleShowLayout, TextField, ImageField } from "react-admin";
import { AddressField } from "../global/components/AddressField";
import React from "react";
import moment from "moment";
import _get from "lodash/get";
import Typography from "@material-ui/core/Typography";

const DisplayTimeField = ({ source, record = {} }) => (
  <Typography>{moment(_get(record, source)).format("LT")}</Typography>
);

DisplayTimeField.defaultProps = {
  addLabel: true
};
// import paymentMethods from "../global/conversion/paymentMethods";

// const PaymentMethodMapper = ({ record, source }) => {
//   let liArray = record.paymentMethods.map(pm => {
//     return <span style={{ marginRight: "4px" }}>{paymentMethods(pm)},</span>;
//   });
//   return <div>{liArray}</div>;
// };

const StoreShowTitle = ({ record }) => {
  return <span>Store {record ? `${record.name}` : ""}</span>;
};

const StoreShow = props => (
  <Show {...props} title={<StoreShowTitle />}>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="MetrcLicense" />
      <AddressField addLabel={true} label="Address" />
      {/* <BooleanField source="active" /> */}
      {/* <PaymentMethodMapper label='Payment Methods' addLabel={true} source="paymentMethods" /> */}
      {/* <TextField source="code" /> */}
      <DisplayTimeField source="operatingHoursStart" />
      <DisplayTimeField source="operatingHoursEnd" />
      <ImageField source="image" label="Logo" />
    </SimpleShowLayout>
  </Show>
);

export default StoreShow;
