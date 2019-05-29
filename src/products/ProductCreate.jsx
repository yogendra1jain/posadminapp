import {
    Create,
    TabbedForm,
    TextInput,
    FormTab,
    LongTextInput,
    BooleanInput,
    ImageInput,
    SelectInput,
    NumberInput,
    ReferenceInput
} from 'react-admin';
import React, {Component} from 'react';
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
                <TabbedForm redirect="list">
                    <FormTab label="Product Details">
                        <TextInput source="name" label="Product Name" />
                        <TextInput source="sku" label="Sku" />
                        <CategoryInput source={"category1"} />
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
                        <BooleanInput label="Cannabis Product" source="cannabisProduct"/>
                        <BooleanInput label="Taxable" source="taxable" />
                        <BooleanInput label="Discountable" source="discountable" />
                    </FormTab>

                    <FormTab label="Product Description">
                        <LongTextInput source="description" />
                    </FormTab>

                    <FormTab label="Cannabis Details">
                    <FormDataConsumer>
                        {({ formData, dispatch, ...rest }) => (
                            formData.cannabisProduct ?  
                            <React.Fragment>
                                <BooleanInput label="Medical Only" source="medicalProduct" />
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
                    : ''
                        )}
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

export default ProductCreate;