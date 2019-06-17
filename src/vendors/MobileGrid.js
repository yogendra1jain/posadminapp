import React from 'react';
import {
    TextField,
    EditButton,
    ShowButton,
    EmailField,
    SingleFieldList,
    ArrayField,
    ChipField
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
                        Email:&nbsp;
                        <EmailField record={data[id]} source="email" />
                    </span>
                    <span className={classes.cardContentRow}>
                        {_get(data[id], 'code', false) ? <React.Fragment>Code:&nbsp;
                        <TextField record={data[id]} source="code" /></React.Fragment> : ''}
                    </span>
                    <span className={classes.cardContentRow}>
                        Phone No:&nbsp;
                        <TextField record={data[id]} source="phoneNumber.phoneNumber" />
                    </span>
                    <span className={classes.cardContentRow}>
                        License Type:&nbsp;
                        <ArrayField record={data[id]} source="licenses">
                            <SingleFieldList>
                                <TextField source="type" />
                            </SingleFieldList>
                        </ArrayField>
                    </span>
                    <EditButton
                        resource="vendors"
                        basePath={basePath}
                        record={data[id]}
                    />
                    <ShowButton
                        resource="vendors"
                        basePath={basePath}
                        record={data[id]}
                    />
                </CardContent>
            </Card>
        ))}
    </div>
);

export default withStyles(listStyles)(MobileGrid)