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
    SimpleForm
} from 'react-admin';
import React, { Component } from 'react';
import dineroObj from "../global/conversion/DineroObj";
import splitDotWithInt from "../global/conversion/SplitDotWithInt";
import CategoryInput from './CategoryInput';
import MetricCategoryAndUOMInput from './MetricCategoryAndUOMInput';
import CustomImageField from './CustomImageInput';
import { FormDataConsumer } from 'ra-core';

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
                    <ImageInput
                        validate={required()}
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