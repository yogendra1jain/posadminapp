import React from "react";
import {
  Edit,
  SimpleForm,
  BooleanInput,
  FormDataConsumer,
  required,
  NumberInput,
  ReferenceField,
} from "react-admin";
import PriceInput from "../global/components/PriceInput";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import _get from 'lodash/get';
import DineroPrice from "../global/components/DineroPrice";
import _find from 'lodash/find';
import dineroObj from '../global/conversion/DineroObj';
import splitDotWithInt from '../global/conversion/SplitDotWithInt'

const ProductCard = ({ record = {} }) => {
  const ProductTypeChoices = [
    { id: 3, name: "Non-Cannabis" },
    { id: 1, name: "Cannabis" },
    { id: 2, name: "Medical Only Cannabis" }
  ];

  const productType =  () => {
  let foundProduct =  ProductTypeChoices.find((type)=>{
      return type.id == record.productType
    })
    return <Typography>{_get(foundProduct,'name')}</Typography>
  } 
  
  return (
    <Card>
      <CardContent>
        <div style={{ width: 400, margin: "1em" }} />
        <div className="mt-10">
          <Typography variant="caption">Name</Typography>
          <Typography>{record.name}</Typography>
        </div>
        <div className="mt-10">
          <Typography variant="caption">Default Sale Price</Typography>
          <DineroPrice record={record} source="salePrice.amount" />
        </div>
        <div className="mt-10">
          <Typography variant="caption">Cost Price</Typography>
          <DineroPrice record={record} source="costPrice.amount" />
        </div>
        <div className="mt-10">
          <Typography variant="caption">Sku</Typography>
          <Typography>{record.sku}</Typography>
        </div>
        <div className="mt-10">
          <Typography variant="caption">Product Type</Typography>
          {productType()}
        </div>
      </CardContent>
    </Card>
  )
}

const StoreProductEdit = props => {
  return (
    <Edit
      title="Override Store Product"
      {...props}
    >
      <SimpleForm redirect="list">
        <ReferenceField
          source="productId"
          reference="Products"
          linkType={false}
          {...props}
        >
          <ProductCard />
        </ReferenceField>
        <BooleanInput
          label="Override"
          source="override"
          defaultValue={false}
        />
        <FormDataConsumer>
          {({ formData, ...rest }) => {
            return (
              <React.Fragment>
                {formData.override ? (
                  <React.Fragment>
                    <NumberInput
                      label="Cost Price"
                      format={v => dineroObj(v).toUnit(2)}
                      parse={v => splitDotWithInt(v)}
                      source="overrideInfo.costPrice.amount"
                    />
                    <NumberInput
                      label="Sale Price"
                      format={v => dineroObj(v).toUnit(2)}
                      parse={v => splitDotWithInt(v)}
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
