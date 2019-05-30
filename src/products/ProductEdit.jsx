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
  BooleanInput
} from "react-admin";
import { change } from "redux-form";
import withStyles from "@material-ui/core/styles/withStyles";
import { CustomerPriceInput } from "./CustomPriceInput";
import dineroObj from "../global/conversion/DineroObj";
import splitDotWithInt from "../global/conversion/SplitDotWithInt";
import CategoryInput from "./CategoryInput.jsx";
import CustomImageInput from "./CustomImageInput";
import MetricCategoryAndUOMInput from './MetricCategoryAndUOMInput';

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

  formDataRenderProp = () => { };

  render() {
    return (
      <Edit title={<ProductTitle />} {...this.props}>
        <SimpleForm>
          <TextField source="metrcId" label="Metrc Id" />
          <TextInput validate={required()} source="name" options={{ fullWidth: true }} />
          <TextInput validate={required()} source="sku" options={{ fullWidth: true }} />
          <LongTextInput validate={required()} source="description" />
          <NumberInput
            validate={required()}
            label="Cost Price"
            format={v => dineroObj(v).toUnit(2)}
            parse={v => splitDotWithInt(v)}
            source={"costPrice.amount"}
          />
          <NumberInput
            validate={required()}
            label="Pos Price"
            format={v => dineroObj(v).toUnit(2)}
            parse={v => splitDotWithInt(v)}
            source={"salePrice.amount"}
          />
          <CategoryInput source={"category1"} />
          <BooleanInput label="Cannabis Product" source="cannabisProduct" />
          <BooleanInput label="Taxable" source="taxable" />
          <BooleanInput label="Discountable" source="discountable" />
          <FormDataConsumer>
            {({ formData, dispatch, ...rest }) => (
              formData.cannabisProduct ?
                <React.Fragment>
                  <BooleanInput label="Medical Only" source="medicalProduct" />
                  <ReferenceInput source="strainId" label="Select Strain" reference="Strain">
                    <SelectInput validate={required()} optionText="name" />
                  </ReferenceInput>
                  <MetricCategoryAndUOMInput />
                  <NumberInput validate={required()} lable="Unit CBD Percent" source="unitCbdPercent" />
                  <NumberInput validate={required()} lable="Unit CBD Content" source="unitCbdContent" />
                  <NumberInput validate={required()} lable="Unit THC Percent" source="unitThcPercent" />
                  <NumberInput validate={required()} lable="Unit THC Content" source="unitThcContent" />
                  <NumberInput validate={required()} label="Unit Volume" source="unitVolume" />
                  <NumberInput validate={required()} label="Unit Weight" source="unitWeight" />
                </React.Fragment>
                : ''
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