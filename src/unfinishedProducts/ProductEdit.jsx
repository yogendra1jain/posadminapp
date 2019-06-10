import React from "react";
import {
  ImageInput,
  Edit,
  TextInput,
  Labeled,
  ImageField,
  SimpleForm,
  FormDataConsumer,
  Query,
  Loading,
  Error,
  required,
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import CategoryInput from "./CategoryInput.jsx";
import CustomImageInput from "./CustomImageInput";
import PriceInput from "../global/components/PriceInput";
import _get from 'lodash/get';
import _filter from 'lodash/filter';
import _isEmpty from 'lodash/isEmpty';

const ProductTitle = ({ record }) => {
  return (
    <span>
      Edit {record ? `${record.name}` : null}
    </span>
  )
};

const editStyles = {
  root: { alignItems: "flex-start" }
};

const Aside = ({ record }) => {
  if(_isEmpty(record)) {
    return <span></span>
  }
  return (
  <div style={{ width: 400, margin: '1em' }}>
    <Typography>Metrc Id: {_get(record,'metrcId','')}</Typography>
    <Typography>Name: {_get(record, 'name', '')}</Typography>
    <Typography>Discountable: {_get(record, 'discountable', false) ? 'Yes' : 'No'}</Typography>
    <Typography>Taxable: {_get(record, 'isTaxable', false) ? 'Yes' : 'No'}</Typography>
    <Typography>Description: {_get(record, 'description','')}</Typography>
    <Typography>Product Type: {_get(record, 'productType',0) == 0 ? 'Non-Cannabis' :  _get(record, 'productType',0) == 1 ? 'Cannabis Product' : 'Medical Only Cannabis Product'}</Typography>
    <Typography>Metrc Item Type: {_get(record, 'metrcItemType','')}</Typography>
    <Typography>Metrc Category: {_get(record, 'metrcCategory','')}</Typography>
    <Typography>Metrc UOM: {_get(record, 'metrcUom','')}</Typography>
    {_get(record,'unitWeight') ? 
      <span>
      <Typography>Unit Weight: {_get(record,'unitWeight', 0)}</Typography>
      <Typography>Weight UOM: {_get(record, 'unitWeightUnitOfMeasure','')}</Typography>
      </span> : '' 
    }
    {_get(record,'unitVolume') ? 
      <span>
      <Typography>Unit Volume: {_get(record,'unitVolume', 0)}</Typography>
      <Typography>Volume UOM: {_get(record, 'unitVolumeUnitOfMeasure','')}</Typography>
      </span> : '' 
    }
  </div>
)
}

class ProductEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { choices: [], url: "" };
    this.url = "";
  }
  componentDidMount() { }

  getL2Category = ({ formData, ...rest }) => {
    return (
      <Query
        type="GET_ONE"
        resource="Category/GetChildren"
        payload={{ id: formData.category1 }}
      >
        {({ data, loading, error }) =>
          loading ? (
            <Loading />
          ) : error ? (
            <Error />
          ) : (
                <div>User {data.username}</div>
              )
        }
      </Query>
    );
  };

  fetchCategory = ({ data, loading, error }) => {
    return loading ? (
      <Loading />
    ) : error ? (
      <Error />
    ) : (
          <div>User {data.username}</div>
        );
  };

  saveFetchedUrl = url => {
    this.state.url = url;
  };

  render() {
    return (
      <Edit aside={<Aside />} title={<ProductTitle />} {...this.props}>
        <SimpleForm>
          <TextInput validate={required()} source="sku" options={{ fullWidth: true }} />
          <CategoryInput source={"category1"} />
          <PriceInput
            validate={required()}
            label="Cost Price"
            source={"costPrice.amount"}
          />
          <PriceInput
            validate={required()}
            label="POS Sale Price"
            source={"salePrice.amount"}
          />
          <FormDataConsumer>
            {({ formData, dispatch, ...rest }) => {
              if (!formData.newImage) {
                return (
                  <Labeled label="Original image">
                    <ImageField source="image" {...rest} />
                  </Labeled>
                );
              }
            }}
          </FormDataConsumer>
          <ImageInput
            source="newImage"
            label="Change Image"
            accept="image/*"
            options={{ onAbort: event => console.log(event, "event") }}
          >
            <CustomImageInput />
          </ImageInput>
        </SimpleForm>
      </Edit>
    );
  }
}
ProductEdit = withStyles(editStyles)(ProductEdit);
export { ProductEdit };