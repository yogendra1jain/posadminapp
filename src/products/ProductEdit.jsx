import React from "react";
import {
  translate,
  ImageInput,
  Edit,
  TextInput,
  LongTextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
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
import { CustomerPriceInput } from "./CustomPriceInput";
import dineroObj from "../global/conversion/DineroObj";
import splitDotWithInt from "../global/conversion/SplitDotWithInt";
import CategoryInput from "./CategoryInput.jsx";
import CustomImageInput from "./CustomImageInput";
import MetricCategoryAndUOMInput from './MetricCategoryAndUOMInput';
import PriceInput from "../global/components/PriceInput";

const ProductTypeChoices = [
  { id: 0,  name: 'Non-Cannabis'},
  { id: 1,  name: 'Cannabis Product' },
  { id: 2,  name: 'Cannabis (Medical Only)' }
]

const OrderTitle = translate(({ record, translate }) => (
  <span>
    {translate("resources.commands.title", { reference: record.reference })}
  </span>
));
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
let count = 1;
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
    debugger
    if(val == 0) {
        dispatch(change(REDUX_FORM_NAME, "strainId", null))
        dispatch(change(REDUX_FORM_NAME, "metrcCategory", null))
        dispatch(change(REDUX_FORM_NAME, "metrcUom", null))
        dispatch(change(REDUX_FORM_NAME, "unitCbdPercent", null))
        dispatch(change(REDUX_FORM_NAME, "unitCbdContent", null))
        dispatch(change(REDUX_FORM_NAME, "unitThcPercent", null))
        dispatch(change(REDUX_FORM_NAME, "unitThcContent", null))
        dispatch(change(REDUX_FORM_NAME, "unitVolume", null))
        dispatch(change(REDUX_FORM_NAME, "unitWeight", null))
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
          <PriceInput
            validate={required()}
            label="Cost Price"
            source={"costPrice.amount"}
          />
          <PriceInput
            validate={required()}
            label="POS Price"
            source={"salePrice.amount"}
          />
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
                  <ReferenceInput source="strainId" label="Select Strain" reference="Strain">
                    <SelectInput optionText="name" />
                  </ReferenceInput>
                  <MetricCategoryAndUOMInput />
                  <NumberInput lable="Unit CBD Percent" source="unitCbdPercent" />
                  <NumberInput lable="Unit CBD Content" source="unitCbdContent" />
                  <NumberInput lable="Unit THC Percent" source="unitThcPercent" />
                  <NumberInput lable="Unit THC Content" source="unitThcContent" />
                  <NumberInput label="Unit Volume" source="unitVolume" />
                  <NumberInput label="Unit Weight" source="unitWeight" />
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