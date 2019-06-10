import React from 'react';
import {
    Create,
    SimpleForm,
    NumberInput,
    ReferenceInput,
    AutocompleteInput,
    TextField,
    required,
    Query,
    SelectInput,
    LinearProgress,
    ReferenceField,
    FormDataConsumer
} from 'react-admin';
import _filter from 'lodash/filter';
import TextFieldMaterial from '@material-ui/core/TextField';
import _get from 'lodash/get';

class RequisitionCreate extends React.Component {
    render() {
        return (
            <Create {...this.props}>
                <SimpleForm redirect="list">
                    <ReferenceInput label="Select Vendor Product" source="id" reference="VendorProduct/GetByRetailerId">
                        <SelectInput optionText="id" optionValue="id" />
                    </ReferenceInput>
                    <FormDataConsumer>
                        {({ formData, dispatch, ...rest }) => (
                            formData.vendorId && <Query
                                type="GET_LIST"
                                resource="VendorProduct/GetByRetailerId"
                                payload={{ }}
                            >
                                {({ data, loading, error }) => {
                                    if (loading) {
                                        return <LinearProgress />;
                                    }
                                    if (error) {
                                        return <p>No data found.</p>;
                                    }
                                    let selectedVendor = _filter(data, vendorProduct => {       return vendorProduct.vendorId == formData.vendorId
                                    });
                                    return (
                                        <div>
                                            <TextFieldMaterial name="posProductId" value={_get(selectedVendor,'posProductId','')} />
                                        </div>
                                    );
                                }}
                            </Query>
                        )}
                        </FormDataConsumer>
                    <ReferenceInput label="Select Store" source="storeId" reference="Store">
                        <SelectInput optionText="name" />
                    </ReferenceInput>    
                    <NumberInput source="quantity" />
                </SimpleForm>
            </Create>
        )
    }
}

export default RequisitionCreate;