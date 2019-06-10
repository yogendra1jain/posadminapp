import React from "react";
import {
  ImageInput,
  Edit,
  TextInput,
  LongTextInput,
  AutocompleteInput,
  ReferenceInput,
  Labeled,
  ImageField,
  SimpleForm,
  FormDataConsumer,
  Query,
  Loading,
  Error,
  TextField,
  required,
  BooleanInput,
  RadioButtonGroupInput,
  REDUX_FORM_NAME
} from "react-admin";
import { change } from "redux-form";
import withStyles from "@material-ui/core/styles/withStyles";
import CategoryInput from "./CategoryInput.jsx";
import CustomImageInput from "./CustomImageInput";
import MetricCategoryAndUOMInput from './MetricCategoryAndUOMInput';
import PriceInput from "../global/components/PriceInput";

const ProductTypeChoices = [
  { id: 0, name: 'Non-Cannabis' },
  { id: 1, name: 'Cannabis Product' },
  { id: 2, name: 'Cannabis (Medical Only)' }
]

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

  clearMetrcFields = (e, val, dispatch) => {
    if (val == 0) {
      dispatch(change(REDUX_FORM_NAME, "strainId", null))
      dispatch(change(REDUX_FORM_NAME, "metrcCategory", null))
      dispatch(change(REDUX_FORM_NAME, "metrcUom", null))
      dispatch(change(REDUX_FORM_NAME, "unitCbdPercent", null))
      dispatch(change(REDUX_FORM_NAME, "unitCbdContent", null))
      dispatch(change(REDUX_FORM_NAME, "unitThcPercent", null))
      dispatch(change(REDUX_FORM_NAME, "unitThcContent", null))
      dispatch(change(REDUX_FORM_NAME, "unitVolume", null))
      dispatch(change(REDUX_FORM_NAME, "unitWeight", null))
      dispatch(change(REDUX_FORM_NAME, "metrcItemType", null))
      dispatch(change(REDUX_FORM_NAME, "unitThcContentUnitOfMeasure", null))
      dispatch(change(REDUX_FORM_NAME, "unitCbdContentUnitOfMeasure", null))
    }
  }

  render() {
    return (
      <Edit title={<ProductTitle />} {...this.props}>
        <SimpleForm>
          <TextField source="metrcId" label="Metrc Id" />
          <TextInput validate={required()} source="name" options={{ fullWidth: true }} />
          <TextInput validate={required()} source="sku" options={{ fullWidth: true }} />
          <LongTextInput validate={required()} source="description" />
          <CategoryInput source={"category1"} />
          <BooleanInput label="Taxable" source="isTaxable" />
          <BooleanInput label="Discountable" source="discountable" />
          <FormDataConsumer>
            {({ formData, dispatch, ...rest }) => (
              <RadioButtonGroupInput
                onChange={(e, val) => this.clearMetrcFields(e, val, dispatch)}
                parse={val => parseInt(val, 10)}
                label="Product Type"
                source="productType"
                choices={ProductTypeChoices}
              />
            )}
          </FormDataConsumer>
          <FormDataConsumer>
            {({ formData, dispatch, ...rest }) => (
              formData.productType == '1' || formData.productType == '2' ?
                <React.Fragment>
                  <MetricCategoryAndUOMInput />
                </React.Fragment>
                : null
            )}
          </FormDataConsumer>
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