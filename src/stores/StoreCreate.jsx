import {
  TextInput,
  Create,
  SimpleForm,
  ImageInput,
  SelectInput,
  NumberInput,
  required
} from "react-admin";
import React from "react";
import ZipCodeInput from "../global/components/ZipCodeInput";
import _get from "lodash/get";
import _find from "lodash/find";
import _isEmpty from "lodash/isEmpty";
import { TimeInput } from "react-admin-date-inputs";
import CustomImageInput from "../products/CustomImageInput";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const StoreCreateTitle = ({ record }) => {
  return <span>Create Store</span>;
};

// let createSource = (paymentMethods, availablePaymentMethods) => {
//     let source = paymentMethods.map(paymentMethod => {
//         return _find(availablePaymentMethods,'id',paymentMethod)
//     })
//     return source
// }

// const PaymentMethods = ({ record = {} }) => {
//     return  <Query type="GET_ONE" resource="PaymentMethods" payload={{}}>
//         {({ data, loading, error }) => {
//             if (loading) { return <Loading />; }
//             if (error) { return <p>Some Error Occured!</p>; }
//             if(!_isEmpty(data)) {
//                 return <SelectArrayInput label="Payment Methods" source="paymentMethods" choices={data} options={{ fullWidth: true }} />
//             }
//         }}
//     </Query>
// }

const UtcDateChoices = [
  { id: "UTC-10", name: "US/Hawaii (GMT -10:00)" },
  { id: "UTC-8", name: "US/Pacific (GMT -8:00)" },
  { id: "UTC-7", name: "US/Arizona (GMT -7:00)" },
  { id: "UTC-6", name: "US/Central (GMT -6:00)" },
  { id: "UTC-5", name: "US/Eastern (GMT -5:00)" }
  // { id: 'UTC-4', name: 'UTC-4' }
];
const StoreCreate = props => (
  <Create title={<StoreCreateTitle />} {...props}>
    <SimpleForm redirect="list">
      <TextInput label="Store Name" source="name" validate={required()} />
      <TextInput label="Address Line 1" source="address.addressLine1" />
      <TextInput label="Address Line 2" source="address.addressLine2" />
      <ZipCodeInput source="address.postalCode" />
      <TextInput label="City" source="address.city" />
      <TextInput label="State" source="address.state" validate={required()} />
      <TextInput label="Country" source="address.country" />
      <div style={{ width: 400, margin: "1em" }} />

      <Card>
        <CardContent>
          <Typography>MED Purchase Limits</Typography>

          <NumberInput
            source="medLimit.weightLimit"
            label="Cannabis Limit (g)"
            validate={required()}
          />
          <NumberInput
            source="medLimit.concentrateLimit"
            label="Concentrate Limit (g)"
            validate={required()}
          />
          <NumberInput
            source="medLimit.plantCountLimit"
            label="Plant Limit (nos.)"
            validate={required()}
          />
        </CardContent>
      </Card>
      <div style={{ width: 400, margin: "1em" }} />
      <Card>
        <CardContent>
          <Typography>REC Purchase Limits</Typography>
          <NumberInput
            source="recLimit.weightLimit"
            label="Cannabis Limit (g)"
            validate={required()}
          />
          <NumberInput
            source="recLimit.concentrateLimit"
            label="Concentrate Limit (g)"
            validate={required()}
          />
          <NumberInput
            source="recLimit.plantCountLimit"
            label="Plant Limit (nos.)"
            validate={required()}
          />
        </CardContent>
      </Card>
      <TimeInput
        source="operatingHoursStart"
        label="Start time"
        options={{ format: "HH:mm" }}
        validate={required()}
      />
      <TimeInput
        source="operatingHoursEnd"
        label="End time"
        options={{ format: "HH:mm" }}
        validate={required()}
      />
      <SelectInput
        label="Time Zone"
        source="operatingTimezone"
        choices={UtcDateChoices}
        validate={required()}
      />
      <ImageInput
        source="newImage"
        label="Upload Store Logo"
        accept="image/*"
        options={{ onAbort: event => console.log(event, "event") }}
      >
        <CustomImageInput source="src" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export default StoreCreate;
