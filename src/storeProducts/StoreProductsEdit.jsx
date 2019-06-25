import React from "react";
import {
  Edit,
  SimpleForm,
  BooleanInput,
  FormDataConsumer,
  required
} from "react-admin";
import PriceInput from "../global/components/PriceInput";
import ProductReferenceField from "../products/ProductReferenceField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const Aside = props => (
  <div style={{ width: 400, margin: "1em" }}>
    <Card>
      <CardContent>
        <Typography>Source Package Details</Typography>
        <div style={{ width: 400, margin: "1em" }} />
        <div className="mt-10">
          <Typography variant="caption">Label</Typography>
          <Typography>{props.label}</Typography>
        </div>
        <div className="mt-10">
          <Typography variant="caption">Metrc Id</Typography>
          <Typography>{props.metrcId}</Typography>
        </div>
        <div className="mt-10">
          <Typography variant="caption">Product</Typography>
          <Typography>{props.metrcProduct}</Typography>
        </div>
        <div className="mt-10">
          <Typography variant="caption">Quantity</Typography>
          <Typography>{props.quantity}</Typography>
        </div>
        <div className="mt-10">
          <Typography variant="caption">UOM</Typography>
          <Typography>{props.uom}</Typography>
        </div>
        <div className="mt-10">
          <Typography variant="caption">Package Type</Typography>
          <Typography>{props.packageType}</Typography>
        </div>
      </CardContent>
    </Card>
  </div>
);

const StoreProductEdit = props => {
  return (
    <Edit
      title="Override Store Product"
      {...props}
      aside={<Aside {...props} />}
    >
      <SimpleForm redirect="list">
        <ProductReferenceField src="productId" label="Product" />
        <BooleanInput
          label="Override ?"
          source="override"
          defaultValue={false}
        />
        <FormDataConsumer>
          {({ formData, ...rest }) => {
            return (
              <React.Fragment>
                {formData.override ? (
                  <React.Fragment>
                    <PriceInput
                      validate={required()}
                      label="Cost Price"
                      source="overrideInfo.costPrice.amount"
                    />
                    <PriceInput
                      validate={required()}
                      label="Sale Price"
                      source="overrideInfo.salePrice.amount"
                    />
                  </React.Fragment>
                ) : null}
              </React.Fragment>
            );
          }}
        </FormDataConsumer>
      </SimpleForm>
    </Edit>
  );
};

export default StoreProductEdit;
