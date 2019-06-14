import React from 'react';
import {
    TextField,
    EditButton,
    FunctionField,
    ShowButton,
    EmailField
} from 'react-admin'
import Card from "@material-ui/core/Card";
import { withStyles } from '@material-ui/core/styles';
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import _get from 'lodash/get';
import { FullNameField } from '../global/components/FullNameField';

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
    }
});

const MobileGrid = ({ classes, ids, data, basePath, translate }) => (
    <div style={{ margin: '1em' }}>
        {ids.map(id => (
            <Card key={id} className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <span className={classes.cardContentRow}>
                        Name:&nbsp;
                        <FullNameField record={data[id]} />
                    </span>
                    <span className={classes.cardContentRow}>
                        {
                            _get(data[id], 'email', false) ? <React.Fragment>Email:&nbsp;
                            <EmailField
                                    record={data[id]}
                                    source="email"
                                /></React.Fragment> : ''
                        }

                    </span>
                    <span className={classes.cardContentRow}>
                        {
                            _get(data[id], 'phone', false) ? <React.Fragment>
                                Phone:&nbsp;
                                <TextField
                                    record={data[id]}
                                    source="phoneNumber.phoneNumber"
                                />
                            </React.Fragment> : ''
                        }

                    </span>
                    <span className={classes.cardContentRow}>
                        Customer Segment:&nbsp;
                        <FunctionField record={data[id]} render={record => _get(record, 'customerType', 0) == 1 ? 'Medical' : 'Recreational'} />
                    </span>
                    <EditButton
                        resource="Customers"
                        basePath={basePath}
                        record={data[id]}
                    />
                    <ShowButton
                        resource="Customers"
                        basePath={basePath}
                        record={data[id]}
                    />
                </CardContent>
            </Card>
        ))}
    </div>
);

export default withStyles(listStyles)(MobileGrid)