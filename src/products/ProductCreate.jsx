import {
  Create,
  TextInput,
  LongTextInput,
  BooleanInput,
  ImageInput,
  REDUX_FORM_NAME,
  required,
  TabbedForm,
  FormTab,
  RadioButtonGroupInput
} from "react-admin";
import React, { Component } from "react";
import CategoryInput from "./CategoryInput";
import MetricCategoryAndUOMInput from "./MetricCategoryAndUOMInput";
import CustomImageField from "./CustomImageInput";
import { FormDataConsumer } from "ra-core";
import PriceInput from "../global/components/PriceInput";
import { change } from "redux-form";
import withStyles from "@material-ui/core/styles/withStyles";

export const styles = {
  width: { width: "5em" },
  timezone: { width: "10em" },
  widthFormGroup: { display: "inline-block" },
  height: { width: "5em" },
  price: { width: "10em" },
  heightFormGroup: { display: "inline-block", marginLeft: 32 }
};

const ProductTypeChoices = [
  { id: 3, name: "Non-Cannabis" },
  { id: 1, name: "Cannabis" },
  { id: 2, name: "Medical Only Cannabis" }
];

const ProductCreateTitle = ({ record }) => {
  return <span>Create Product</span>;
};

class ProductCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  clearMetrcFields = (e, val, dispatch) => {
    if (val == 0) {
      dispatch(change(REDUX_FORM_NAME, "strainId", null));
      dispatch(change(REDUX_FORM_NAME, "metrcCategory", null));
      dispatch(change(REDUX_FORM_NAME, "metrcUom", null));
      dispatch(change(REDUX_FORM_NAME, "unitCbdPercent", null));
      dispatch(change(REDUX_FORM_NAME, "unitCbdContent", null));
      dispatch(change(REDUX_FORM_NAME, "unitThcPercent", null));
      dispatch(change(REDUX_FORM_NAME, "unitThcContent", null));
      dispatch(change(REDUX_FORM_NAME, "unitVolume", null));
      dispatch(change(REDUX_FORM_NAME, "unitWeight", null));
      dispatch(change(REDUX_FORM_NAME, "metrcItemType", null));
      dispatch(change(REDUX_FORM_NAME, "unitThcContentUnitOfMeasure", null));
      dispatch(change(REDUX_FORM_NAME, "unitCbdContentUnitOfMeasure", null));
    }
  };
  render() {
    return (
      <Create title={<ProductCreateTitle />} {...this.props}>
        <TabbedForm redirect="list">
          <FormTab label="Item Info">
            <TextInput
              validate={required()}
              source="name"
              label="Product Name"
              formClassName={this.props.classes.widthFormGroup}
            />
            <TextInput
              validate={required()}
              source="sku"
              label="Sku"
              formClassName={this.props.classes.heightFormGroup}
            />
            <LongTextInput validate={required()} source="description" />
            <PriceInput
              validate={required()}
              label="Cost Price"
              source={"costPrice.amount"}
              className={this.props.classes.price}
              formClassName={this.props.classes.widthFormGroup}
            />
            <PriceInput
              validate={required()}
              label="Default Sale Price"
              source={"salePrice.amount"}
              className={this.props.classes.price}
              formClassName={this.props.classes.heightFormGroup}
            />
            <CategoryInput source={"category1"} />
            <BooleanInput
              defaultValue={true}
              label="Taxable"
              source="isTaxable"
            />
            <BooleanInput label="Discountable" source="discountable" />
          </FormTab>
          <FormTab label="Canna Info">
            <FormDataConsumer>
              {({ formData, dispatch, ...rest }) => (
                <RadioButtonGroupInput
                  onChange={(e, val) => this.clearMetrcFields(e, val, dispatch)}
                  parse={val => parseInt(val, 10)}
                  label="Product Type"
                  source="productType"
                  choices={ProductTypeChoices}
                  defaultValue={3}
                  validate={required()}
                  formClassName={this.props.classes.widthFormGroup}
                />
              )}
            </FormDataConsumer>

            <FormDataConsumer>
              {({ formData, dispatch, ...rest }) => {
                return formData.productType == "1" ||
                  formData.productType == "2" ? (
                  <React.Fragment>
                    <MetricCategoryAndUOMInput />
                  </React.Fragment>
                ) : null;
              }}
            </FormDataConsumer>
          </FormTab>
          <FormTab label="Image">
            <ImageInput
              source="newImage"
              label="Upload Image"
              accept="image/*"
              options={{ onAbort: event => console.log(event, "event") }}
            >
              <CustomImageField source="src" />
            </ImageInput>
          </FormTab>
        </TabbedForm>
      </Create>
    );
  }
}

export default withStyles(styles)(ProductCreate);
