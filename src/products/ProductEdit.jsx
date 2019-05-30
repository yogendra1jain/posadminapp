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
  TextField
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
          Edit {record ? `${record.name}`:null}
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
  componentDidMount() {}
  
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
    console.log(data, loading, error);
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

  formDataRenderProp = () => {};

  render() {
    return (
      <Edit title={<ProductTitle />} {...this.props}>
        <SimpleForm>
          <TextInput source="name" options={{ fullWidth: true }} />
          <TextInput source="sku" options={{ fullWidth: true }} />
          <LongTextInput source="description" />
          <NumberInput
            label="Cost Price"
            format={v => dineroObj(v).toUnit(2)}
            parse={v => splitDotWithInt(v)}
            source={"costPrice.amount"}
          />
          <NumberInput
            label="Pos Price"
            format={v => dineroObj(v).toUnit(2)}
            parse={v => splitDotWithInt(v)}
            source={"salePrice.amount"}
          />
          <CategoryInput source={"category1"} />
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
          <ReferenceInput label="Select Strain" source="strainId" reference="Strain">
            <SelectInput optionText="name" />
          </ReferenceInput>
          <MetricCategoryAndUOMInput />
        </SimpleForm>
      </Edit>
    );
  }
}
ProductEdit = withStyles(editStyles)(ProductEdit);
export { ProductEdit };