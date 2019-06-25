
import { Edit, SimpleForm, Show, DatagridBody, field, SimpleShowLayout, ArrayField, REDUX_FORM_NAME, NumberInput, Datagrid, FormDataConsumer, required, DateField   , aside, FormTab, TextInput, BooleanInput, ReferenceInput, AutocompleteInput, SelectInput, TextField, AutoComplete, FormInput, ArrayInput, SimpleFormIterator, DateInput } from 'react-admin';
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles/withStyles';
import Quantity from './Quantity';
import SplitPackageForm from './SplitPackageForm';
import { Typography, Card, CardContent } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/Add'

import { change } from "redux-form";
import _get from 'lodash/get';
import Button from '@material-ui/core/Button';




const Aside = ({ record, ...props }) => {
    console.log(record, "record");
    return (
        <div style={{ width: 400, margin: "1em" }}>
            {record ?
                <Card>
                    <CardContent>
                        <Typography>Source Package Details</Typography>
                        <div style={{ width: 400, margin: "1em" }} />
                        <div className="mt-10">
                            <Typography variant="caption">Label</Typography>
                            <Typography>{record.packageLabel}</Typography>
                        </div>
                        <div className="mt-10">
                            <Typography variant="caption">METRC Product</Typography>
                            <Typography>{record.productName}</Typography>
                        </div>
                        <div className="mt-10">
                            <Typography variant="caption">Manifest Number</Typography>
                            <Typography>{record.manifestNumber}</Typography>
                        </div>
                        <div className="mt-10">
                            <Typography variant="caption">Quantity</Typography>
                            <Typography>{record.shippedQuantity}</Typography>
                        </div>
                        <div className="mt-10">
                            <Typography variant="caption">UOM</Typography>
                            <Typography>{record.shippedUnitOfMeasureName}</Typography>
                        </div>
                        <div className="mt-10">
                            <Typography variant="caption">Package Type</Typography>
                            <Typography>{record.packageType}</Typography>
                        </div>
                    </CardContent>
                </Card> : null}
        </div>
    );
}

class PackagePendingEdit extends React.Component {
    scan = (e, formData, rest) => {
        debugger;
        if (e.key === 'Enter') {
            debugger;
            console.log('do validate');
            console.log(e, formData, rest);
            let i = _get(formData, 'itemPackages.length', 0);
            rest.dispatch(change(REDUX_FORM_NAME, `itemPackages[${i}].label`, e.target.value))
            rest.dispatch(change(REDUX_FORM_NAME, `itemPackages[${i}].quantity`, formData.quantity))
            rest.dispatch(change(REDUX_FORM_NAME, `scan`, ''))
            rest.dispatch(change(REDUX_FORM_NAME, `quantity`, 1))
        }
    }
    handleDelete = (index, rows, rest) => {
        rows.splice(index, 1)
        rest.dispatch(change(REDUX_FORM_NAME, `itemPackages `, rows))
        this.setState({})

    }
    render() {
        return (
            <Edit
                {...this.props}
                aside={<Aside />}>
                <SimpleForm submitOnEnter={false} >
                    <ReferenceInput
                        source="posProductId"
                        reference="Products"
                        validate={required()}
                    >
                        <AutocompleteInput source="posProductId" optionText="name" />
                    </ReferenceInput>
                    <FormDataConsumer>
                        {({ formData, ...rest }) => {
                            return (
                                <React.Fragment>
                                    <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                                        <TextInput label="Scan Here" source='scan' onKeyDown={(e) => this.scan(e, formData, rest)} />
                                        <NumberInput source='quantity' label='Quantity' defaultValue={1} />
                                        <Button onClick={this.addScan}  variant="contained" color="secondary">
                                        <AddIcon style={{marginRight:'5px'}} /> 
                                            Add
                                        </Button>
                                    </div>
                                    <SplitPackageForm rest={rest} handleDelete={this.handleDelete} itemPackages={formData.itemPackages} />
                                </React.Fragment>


                            )
                        }}
                    </FormDataConsumer>

                    {/* <SplitPackageForm {...props} /> */}
                </SimpleForm>
            </Edit>
        );

    }
}


export default PackagePendingEdit;