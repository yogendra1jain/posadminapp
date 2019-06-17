import React from 'react';
import {
    TextField,
    EditButton,
    ShowButton,
    FunctionField,
} from 'react-admin'
import Card from "@material-ui/core/Card";
import { withStyles } from '@material-ui/core/styles';
import CardContent from "@material-ui/core/CardContent";
import _get from 'lodash/get';
import SyncIcon from "@material-ui/icons/Sync";

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
                        Product:&nbsp;
                        <TextField record={data[id]} source="posProductId" />
                    </span>
                    <span className={classes.cardContentRow}>
                        Sync Status:&nbsp;
                        <FunctionField
                            text-align="left"
                            record={data[id]}
                            render={record =>
                                _get(record, "syncStatus", 0) === 0 ? (
                                    <SyncIcon style={{ color: "orange" }} />
                                ) : _get(record, "syncStatus", 0) === 3 ? (
                                    <SyncIcon
                                        style={{ color: "red" }}
                                        titleAccess={record.metrcError}
                                    />
                                ) : (<SyncIcon style={{ color: "green" }} />)
                            }
                        />
                    </span>
                    <span className={classes.cardContentRow}>
                        Label:&nbsp;
                        <TextField record={data[id]} source="label" />
                    </span>
                    <span className={classes.cardContentRow}>
                        Active:&nbsp;
                        <FunctionField
                            record={data[id]}
                            label="Quantity"
                            render={record => `${record.quantity} ${record.uom}`}
                        />
                    </span>
                    <EditButton
                        resource="Package"
                        basePath={basePath}
                        record={data[id]}
                    />
                    <ShowButton
                        resource="Package"
                        basePath={basePath}
                        record={data[id]}
                    />
                </CardContent>
            </Card>
        ))}
    </div>
);

export default withStyles(listStyles)(MobileGrid)