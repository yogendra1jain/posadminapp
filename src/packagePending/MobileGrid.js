import React from 'react';
import {
    TextField,
    EditButton,
    ShowButton,
} from 'react-admin'
import Card from "@material-ui/core/Card";
import { withStyles } from '@material-ui/core/styles';
import CardContent from "@material-ui/core/CardContent";
import _get from 'lodash/get';
import InfoOutline from "@material-ui/icons/InfoOutline";

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
                        Manifest:&nbsp;
                        <TextField record={data[id]} source="manifestNumber" />
                    </span>
                    <span className={classes.cardContentRow}>
                        Label:&nbsp;
                    </span>
                    <span className={classes.cardContentRow}>
                        METRC Product:&nbsp;
                        <TextField record={data[id]} source="productName" />
                    </span>
                    <span className={classes.cardContentRow}>
                        Category:&nbsp;
                        <TextField record={data[id]} source="productCategoryName" />
                    </span>
                    <span className={classes.cardContentRow}>
                        Shipment Status:&nbsp;
                        <TextField record={data[id]} source="shipmentPackageState" />
                    </span>
                    <span className={classes.cardContentRow}>
                        Quantity:&nbsp;
                        <TextField record={data[id]} source="shippedQuantity" />
                    </span>
                    <span className={classes.cardContentRow}>
                        UOM:&nbsp;
                        <TextField record={data[id]} source="shippedUnitOfMeasureName" defaultValue={0} />
                    </span>
                    <span className={classes.cardContentRow}>
                        {data[id].shipmentPackageState == 'Shipped' ? <InfoOutline
                            titleAccess="Please Accept Package on METRC UI"
                            color="red"
                        /> : data[id].shipmentPackageState == 'Accepted' ? <EditButton
                            label="Check In"
                            resource="packagePending"
                            basePath={basePath}
                            record={data[id]}
                        /> : ''}
                    </span>
                </CardContent>
            </Card>
        ))}
    </div>
);

export default withStyles(listStyles)(MobileGrid)