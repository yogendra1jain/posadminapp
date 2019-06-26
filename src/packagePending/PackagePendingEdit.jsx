
import { Edit, SimpleForm, Show, DatagridBody, field, SimpleShowLayout, ArrayField, REDUX_FORM_NAME, NumberInput, Datagrid, FormDataConsumer, required, DateField, aside, FormTab, TextInput, BooleanInput, ReferenceInput, AutocompleteInput, SelectInput, TextField, AutoComplete, FormInput, ArrayInput, SimpleFormIterator, DateInput } from 'react-admin';
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
import uuidv1 from "uuid/v1";
import { qtyValidation } from './validations';
const queryString = require('query-string');





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
    constructor(props) {
        super(props);
        this.state = { choices: [], key: uuidv1() };
    }

    weightedQuantity = (formData) => {
        let quantity = 0;
        switch (formData.weightSelection) {
            case 'grams':
                quantity = 1;
                break;
            case 'byEight':
                quantity = 3.5;
                break;
            case 'byFour':
                quantity = 7;

                break;
            case 'byTwo':
                quantity = 14;
                break;
            case 'byOne':
                quantity = 28;
                break;


            default:
                break;
        }
        return quantity
    }
    scan = (e, formData, rest) => {
        debugger;
        if (e.key === 'Enter') {
            debugger;
            if (formData.weightSelection) {

                this.addData(e.target.value, this.weightedQuantity(formData), rest, formData);
            }
            else {
                this.addData(e.target.value, formData.quantity, rest, formData);
            }

        }
    }
    addData = (value, quantity, rest, formData) => {
        if(value=='')
        return;
        if(qtyValidation(formData.quantity,formData)){
            return;
        }
        if(_get(formData, 'itemPackages',[]).find(v=>v.label==value)){
            return;
        }
        let i = _get(formData, 'itemPackages.length', 0);
        rest.dispatch(change(REDUX_FORM_NAME, `itemPackages[${i}].label`, value))
        rest.dispatch(change(REDUX_FORM_NAME, `itemPackages[${i}].quantity`, quantity))
        rest.dispatch(change(REDUX_FORM_NAME, `scan`, ''))
        rest.dispatch(change(REDUX_FORM_NAME, `quantity`, 1))
    }
    handleDelete = (index, rows, rest) => {
        rows.splice(index, 1)
        rest.dispatch(change(REDUX_FORM_NAME, `itemPackages `, rows))
        this.setState({})

    }
    pcsSelection = (weightType, pcs, dispatch) => {
        debugger;
        switch (weightType) {
            case 'grams':
                if (!this.state.choices.find(ch => ch.id == "grams")) {
                    this.state.choices.push({ id: 'grams', name: 'grams' });
                    this.setState({ choices: this.state.choices, key: uuidv1() });
                    // dispatch(change(REDUX_FORM_NAME, `quantity`, 1))
                }

                break;
            case 'byEight':
                if (!this.state.choices.find(ch => ch.id == "byEight")) {
                    this.state.choices.push({ id: 'byEight', name: '1/8 oz' });
                    this.setState({ choices: this.state.choices, key: uuidv1() });
                    // dispatch(change(REDUX_FORM_NAME, `quantity`, 1))
                }
                break;
            case 'byFour':
                if (!this.state.choices.find(ch => ch.id == "byFour")) {
                    this.state.choices.push({ id: 'byFour', name: '1/4 oz' });
                    this.setState({ choices: this.state.choices, key: uuidv1() });
                    // dispatch(change(REDUX_FORM_NAME, `quantity`, 1))
                }
                break;
            case 'byTwo':
                if (!this.state.choices.find(ch => ch.id == "byTwo")) {
                    this.state.choices.push({ id: 'byTwo', name: '1/2 oz' });
                    this.setState({ choices: this.state.choices, key: uuidv1() });
                    // dispatch(change(REDUX_FORM_NAME, `quantity`, 1))
                }
                break;
            case 'byOne':
                if (!this.state.choices.find(ch => ch.id == "byOne")) {
                    this.state.choices.push({ id: 'byOne', name: '1 oz' });
                    this.setState({ choices: this.state.choices, key: uuidv1() });
                    // dispatch(change(REDUX_FORM_NAME, `quantity`, 1))
                }
                break;


            default:
                break;
        }
    }
    render() {
        const parsed = queryString.parse(this.props.location.search);
        console.log(parsed, "parsed");
        return (
            <Edit
                {...this.props}
                undoable={false}
                key={this.state.key}
                aside={<Aside />}>
                <SimpleForm submitOnEnter={false} >
                    <ReferenceInput
                        source="posProductId"
                        reference="Products"
                        validate={required()}
                    >
                        <AutocompleteInput source="posProductId" optionText="name" />
                    </ReferenceInput>
                    {
                        parsed.shippedUnitOfMeasureName == "Each" ?
                            <FormDataConsumer>
                                {({ formData, ...rest }) => {

                                    return (<React.Fragment>
                                        <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                                            <TextInput  label="Scan Here" source='scan' onKeyDown={(e) => this.scan(e, formData, rest)} />
                                            <NumberInput parse={val=>val<=0?1:parseInt(val)}  validate={qtyValidation} source='quantity' label='Quantity' defaultValue={1} />
                                            <Button onClick={() => this.addData(formData.scan, formData.quantity, rest, formData)} variant="contained" color="secondary">
                                                <AddIcon style={{ marginRight: '5px' }} />
                                                Add
                                                </Button>
                                        </div>
                                        <SplitPackageForm rest={rest} handleDelete={this.handleDelete} itemPackages={formData.itemPackages} />
                                    </React.Fragment>)
                                }}
                            </FormDataConsumer> :
                            <React.Fragment>
                                <FormDataConsumer>
                                    {({ formData, ...rest }) => {
                                        return (
                                            <React.Fragment>
                                                <Quantity pcsSelection={this.pcsSelection} rest={rest} />
                                                <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <TextInput label="Scan Here" source='scan' onKeyDown={(e) => this.scan(e, formData, rest)} />
                                                    <SelectInput source='weightSelection' choices={this.state.choices} />
                                                    <Button onClick={() => this.addData(formData.scan, this.weightedQuantity(formData),rest,formData)} variant="contained" color="secondary">
                                                        <AddIcon style={{ marginRight: '5px' }} />
                                                        Add
                                                    </Button>
                                                </div>
                                                <SplitPackageForm rest={rest} handleDelete={this.handleDelete} itemPackages={formData.itemPackages} />
                                            </React.Fragment>
                                        )
                                    }}
                                </FormDataConsumer>

                            </React.Fragment>

                    }

                </SimpleForm>
            </Edit>
        );

    }
}


export default PackagePendingEdit;