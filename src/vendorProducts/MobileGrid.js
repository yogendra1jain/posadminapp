import React from 'react';
import {
    TextField,
    EditButton,
    ShowButton,
    NumberField,
    BooleanField,
    ReferenceField
} from 'react-admin'
import Card from "@material-ui/core/Card";
import { withStyles } from '@material-ui/core/styles';
import CardContent from "@material-ui/core/CardContent";
import _get from 'lodash/get';
import DineroPrice from '../global/components/DineroPrice';

const listStyles = theme => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: '0.5rem 0',
    },
    cardTitleContent: {
        display: 'flex',
        flexDirection: 'rows',
        justifyContent: 'space-between',
    },
    cardContent: theme.typography.body1,
    cardContentRow: {
        display: 'flex',
        flexDirection: 'rows',
        alignItems: 'center',
        margin: '0.5rem 0',
    },
    SyncStyle: {
        marginLeft: '20px',
        marginTop: '10px'
    },
    address: {
        display: 'flex',
        flexDirection: 'rows'
    }
});

const MobileGrid = ({ classes, ids, data, basePath, translate }) => (
    <div style={{ margin: '1em' }}>
        {ids.map(id => (
            <Card key={id} className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <span className={classes.cardContentRow}>
                        Vendor:&nbsp;
                        <TextField record={data[id]} source="vendorId" />
                        {/* <ReferenceField record={data[id]} source="vendorId" reference="vendors">
                            <TextField source="name" />
                        </ReferenceField> */}
                    </span>
                    <span className={classes.cardContentRow}>
                        Product:&nbsp;
                        <TextField record={data[id]} source="posProductId" />
                    </span>
                    <span className={classes.cardContentRow}>
                        SKU: &nbsp;
                        <TextField record={data[id]} source="sku" />
                    </span>
                    <span className={classes.cardContentRow}>
                        Price:&nbsp;
                        <DineroPrice record={data[id]} source="price.amount" />
                    </span>
                    <span className={classes.cardContentRow}>
                        Pack Size:&nbsp;
                        <NumberField record={data[id]} source="conversionFactor" />
                    </span>
                    <span className={classes.cardContentRow}>
                        Primary Supplier:&nbsp;
                        <BooleanField record={data[id]} source="primary" />
                    </span>
                    <EditButton
                        resource="VendorProduct/GetByRetailerId"
                        basePath={basePath}
                        record={data[id]}
                    />
                    <ShowButton
                        resource="VendorProduct/GetByRetailerId"
                        basePath={basePath}
                        record={data[id]}
                    />
                </CardContent>
            </Card>
        ))}
    </div>
);

export default withStyles(listStyles)(MobileGrid)