import {
    Create,
    TabbedForm,
    TextInput,
    LongTextInput,
    BooleanInput,
    ImageInput,
    SelectInput,
    NumberInput,
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
    render() {
        return (
            <Create title={<ProductCreateTitle />}  {...this.props}>
                <SimpleForm redirect="list">
                    <TextInput validate={required()} source="name" label="Product Name" />
                    <TextInput validate={required()} source="sku" label="Sku" />
                    <LongTextInput validate={required()} source="description" />
                    <CategoryInput source={"category1"} />
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
                    <BooleanInput label="Taxable" source="isTaxable" />
                    <BooleanInput label="Discountable" source="discountable" />
                    <RadioButtonGroupInput parse={val => parseInt(val, 10)} label="Product Type" source="productType" choices={ProductTypeChoices} />
                    <FormDataConsumer>
                        {({ formData, dispatch, ...rest }) => {
                            return (
                                formData.productType == '1' || formData.productType == '2' ?
                                    <React.Fragment>
                                        <ReferenceInput source="strainId" label="Select Strain" reference="Strain">
                                            <SelectInput validate={required()} optionText="name" />
                                        </ReferenceInput>
                                        <MetricCategoryAndUOMInput />
                                        <NumberInput lable="Unit CBD Percent" source="unitCbdPercent" />
                                        <NumberInput lable="Unit CBD Content" source="unitCbdContent" />
                                        <NumberInput lable="Unit THC Percent" source="unitThcPercent" />
                                        <NumberInput lable="Unit THC Content" source="unitThcContent" />
                                        <NumberInput label="Unit Volume" source="unitVolume" />
                                        <NumberInput label="Unit Weight" source="unitWeight" />
                                    </React.Fragment>
                                    : ''
                            )
                        }}
                    </FormDataConsumer>
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