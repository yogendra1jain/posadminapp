
import { Edit, SimpleForm, aside, FormTab, TextInput, BooleanInput, ReferenceInput, AutocompleteInput, SelectInput, TextField, AutoComplete, FormInput, ArrayInput, SimpleFormIterator, DateInput } from 'react-admin';
import React from 'react';
import { withStyles } from '@material-ui/core/styles/withStyles';
import Quantity from './Quantity';
import SplitPackageForm from './SplitPackageForm';
import { Typography, Card, CardContent } from '@material-ui/core';
import { required } from 'ra-core';

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

const PackagePendingEdit = props => (
    <Edit
        {...props}
        aside={<Aside />}>
        <SimpleForm>
            <ReferenceInput
                source="posProductId"
                reference="Products"
                validate={required()}
            >
                <AutocompleteInput source="posProductId" optionText="name" />
            </ReferenceInput>
            <SplitPackageForm {...props} />
        </SimpleForm>
    </Edit>
);

export default PackagePendingEdit;