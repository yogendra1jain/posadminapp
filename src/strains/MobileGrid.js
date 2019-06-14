import React from 'react';
import {
    TextField,
    EditButton,
    FunctionField,
    ShowButton
} from 'react-admin'
import Card from "@material-ui/core/Card";
import { withStyles } from '@material-ui/core/styles';
import CardContent from "@material-ui/core/CardContent";
import SyncIcon from '@material-ui/icons/Sync';
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
    }
});

const MobileGrid = ({ classes, ids, data, basePath, translate }) => (
    <div style={{ margin: '1em' }}>
        {ids.map(id => (
            <Card key={id} className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <span className={classes.cardContentRow}>
                        Name:&nbsp;
                        <TextField
                            record={data[id]}
                            source="name"
                        />
                        <span className={classes.SyncStyle}>
                        <FunctionField text-align="left" label="Sync Status" render={record => _get(record, 'syncStatus', 0) == 0 ? <SyncIcon style={{ color: 'yellow' }} /> : _get(record, 'syncStatus', 0) == 1 || _get(record, 'syncStatus', 0) == 2 ? <SyncIcon style={{ color: 'green' }} /> : <SyncIcon style={{ color: 'red' }} />} />
                        </span>
                    </span>
                    <span className={classes.cardContentRow}>
                        Genetics:&nbsp;
                        <TextField
                            record={data[id]}
                            source="genetics"
                        />
                    </span>
                   
                    <span className={classes.cardContentRow}>
                        Thc Level:&nbsp;
                        <TextField
                            record={data[id]}
                            source="thcLevel"
                        />
                    </span>
                    <span className={classes.cardContentRow}>
                        Cbd:&nbsp;
                        <TextField
                            record={data[id]}
                            source="cbdLevel"
                        />
                    </span>
                    <span className={classes.cardContentRow}>
                        Indica Percentage:&nbsp;
                        <TextField
                            record={data[id]}
                            source="indicaPercentage"
                        />
                    </span>
                    <span className={classes.cardContentRow}>
                        Sativa Percentage:&nbsp;
                        <TextField
                            record={data[id]}
                            source="sativaPercentage"
                        />
                    </span>
                    <EditButton
                        resource="Strain"
                        basePath={basePath}
                        record={data[id]}
                    />
                    <ShowButton
                        resource="Strain"
                        basePath={basePath}
                        record={data[id]}
                    />
                </CardContent>
            </Card>
        ))}
    </div>
);

export default withStyles(listStyles)(MobileGrid)