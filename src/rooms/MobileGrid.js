import React from 'react';
import {
    TextField,
    EditButton,
    ShowButton,
    BooleanField,
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
                        Location:&nbsp;
                        <TextField record={data[id]} source="location" />
                    </span>
                    <span className={classes.cardContentRow}>
                        Info:&nbsp;
                        <TextField record={data[id]} source="Info" />
                    </span>
                    <span className={classes.cardContentRow}>
                        Item Available For Sale:&nbsp;
                        <BooleanField
                            record={data[id]}
                            source="inventoryForSale"
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
                        resource="Rooms"
                        basePath={basePath}
                        record={data[id]}
                    />
                </CardContent>
            </Card>
        ))}
    </div>
);

export default withStyles(listStyles)(MobileGrid)