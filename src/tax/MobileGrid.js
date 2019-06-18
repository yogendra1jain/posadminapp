import React from 'react';
import {
    TextField,
    EditButton,
    ShowButton,
    FunctionField,
    BooleanField,
    ReferenceField
} from 'react-admin'
import Card from "@material-ui/core/Card";
import { withStyles } from '@material-ui/core/styles';
import CardContent from "@material-ui/core/CardContent";
import _get from 'lodash/get';
import { findTaxApplied } from './taxList';

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
                        Name:&nbsp;
                        <TextField record={data[id]} source="name" />
                    </span>
                    <span className={classes.cardContentRow}>
                        Store:&nbsp;
                        <ReferenceField resource="Store" record={data[id]} source="storeId" reference="Store" basePath={basePath}>
                            <TextField source="name" />
                        </ReferenceField>
                    </span>
                    <span className={classes.cardContentRow}>
                        Tax Applied To:&nbsp;
                        <FunctionField
                            record={data[id]}
                            render={record => findTaxApplied(record)}
                        />
                    </span>
                    <span className={classes.cardContentRow}>
                        Active:&nbsp;
                        <BooleanField record={data[id]} source="active" />
                    </span>
                    <EditButton
                        resource="Tax"
                        basePath={basePath}
                        record={data[id]}
                    />
                    <ShowButton
                        resource="Tax"
                        basePath={basePath}
                        record={data[id]}
                    />
                </CardContent>
            </Card>
        ))}
    </div>
);

export default withStyles(listStyles)(MobileGrid)