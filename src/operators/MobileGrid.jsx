import React from 'react';
import {
    TextField,
    EditButton,
    ShowButton,
    FunctionField,
    BooleanField,
    EmailField,
    ReferenceField
} from 'react-admin'
import Card from "@material-ui/core/Card";
import { withStyles } from '@material-ui/core/styles';
import CardContent from "@material-ui/core/CardContent";
import _get from 'lodash/get';

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
        // alignItems: 'center',
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
                        <FunctionField record={data[id]} render={record => _get(record, 'person.firstName', '') +' ' + _get(record, 'person.lastName', '')} />
                    </span>
                    <span className={classes.cardContentRow}>
                        Store Name:&nbsp;
                        <ReferenceField resource="Store" record={data[id]} source="storeId" reference="Store" basePath={basePath} linkType="show">
                            <TextField source="name" />
                        </ReferenceField>
                    </span>
                    <span className={classes.cardContentRow}>
                        Phone Number:&nbsp;
                    <TextField record={data[id]} source="phoneNumber.phoneNumber" />
                    </span>
                    <span className={classes.cardContentRow}>
                        Email:&nbsp;
                    <EmailField record={data[id]} source="email" />
                    </span>
                    <span className={classes.cardContentRow}>
                        Active:&nbsp;
                    <BooleanField record={data[id]} source="active" />
                    </span>
                    <span className={classes.cardContentRow}>
                        Role:&nbsp;
                        <FunctionField
                            record={data[id]}
                            label="Role"
                            render={record =>
                                _get(record, "role", "cashier") === "cashier"
                                    ? "Budtender"
                                    : "Manager"
                            }
                        />
                    </span>
                    <EditButton
                        resource="Operator"
                        basePath={basePath}
                        record={data[id]}
                    />
                    <ShowButton
                        resource="Operator"
                        basePath={basePath}
                        record={data[id]}
                    />
                </CardContent>
            </Card>
        ))}
    </div>
);

export default withStyles(listStyles)(MobileGrid)