import {
    Create,
    TabbedForm,
    TextInput,
    LongTextInput,
    BooleanInput,
    ImageInput,
    SelectInput,
    NumberInput,
    REDUX_FORM_NAME,
    ReferenceInput,
    required,
    SimpleForm,
    RadioButtonGroupInput
} from 'react-admin';
import React, { Component } from 'react';
import dineroObj from "../global/conversion/DineroObj";
import splitDotWithInt from "../global/conversion/SplitDotWithInt";
import CategoryInput from './CategoryInput';
import MetricCategoryAndUOMInput from './MetricCategoryAndUOMInput';
import CustomImageField from './CustomImageInput';
import { FormDataConsumer } from 'ra-core';
import PriceInput from "../global/components/PriceInput";
import {change} from 'redux-form';
const ProductTypeChoices = [
    { id: 0, name: 'Non-Cannabis' },
    { id: 1, name: 'Cannabis Product' },
    { id: 2, name: 'Medical Only Cannabis Product' }
]

const ProductCreateTitle = ({ record }) => {
    return (
        <span>Create Product</span>
    )
};

class ProductCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    clearMetrcFields = (e, val, dispatch) => {
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
            <Create title={<ProductCreateTitle />}  {...this.props}>
                <SimpleForm redirect="list">
                    <TextInput validate={required()} source="name" label="Product Name" />
                    <TextInput validate={required()} source="sku" label="Sku" />
                    <LongTextInput validate={required()} source="description" />
                    <CategoryInput source={"category1"} />
                    <BooleanInput defaultValue={true} label="Taxable" source="isTaxable" />
                    <BooleanInput label="Discountable" source="discountable" />
                    <FormDataConsumer>
                        {({ formData, dispatch, ...rest }) => (
                            <RadioButtonGroupInput 
                                onChange={(e, val)=>this.clearMetrcFields(e, val,dispatch)}
                                parse={val => parseInt(val, 10)} 
                                label="Product Type" 
                                source="productType" 
                                choices={ProductTypeChoices} 
                            />   
                        )}
                    </FormDataConsumer>
                    <FormDataConsumer>
                        {({ formData, dispatch, ...rest }) => {
                            return (
                                formData.productType == '1' || formData.productType == '2' ?
                                    <React.Fragment>
                                        <ReferenceInput source="strainId" label="Select Strain" reference="Strain">
                                            <SelectInput validate={required()} optionText="name" />
                                        </ReferenceInput>
                                        <MetricCategoryAndUOMInput />
                                    </React.Fragment>
                                    : null
                            )
                        }}
                    </FormDataConsumer>
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
                    <ImageInput
                        source="newImage"
                        label="Upload Image"
                        accept="image/*"
                        options={{ onAbort: event => console.log(event, "event") }}
                    >
                        <CustomImageField source="src" />
                    </ImageInput>
                </SimpleForm>
            </Create>
        );
    }
}

export default ProductCreate;