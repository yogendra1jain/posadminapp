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
import CardHeader from '@material-ui/core/CardHeader';
import SyncIcon from '@material-ui/icons/Sync';
import Avatar from "@material-ui/core/Avatar";
import _get from 'lodash/get';
import DineroPrice from "../global/components/DineroPrice";

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
                    <CardHeader
                        title={
                            <span>
                                <TextField record={data[id]} source="name" />
                                <TextField record={data[id]} source="sku" />                                
                            </span>
                        }
                        subheader={<FunctionField
                            text-align="left"
                            label="Sync Status"
                            render={record =>
                                _get(record, "productType", 0) === 3 ? (
                                    <span>Non Cannabis</span>
                                ) : _get(record, "syncStatus", 0) === 0 ? (
                                    <SyncIcon style={{ color: "orange" }} />
                                ) : (
                                            <SyncIcon style={{ color: "green" }} />
                                        )
                            }
                        />}
                        avatar={<Avatar src={data[id].image} />}
                    />
                    <span className={classes.cardContentRow}>
                        Metrc Id:&nbsp;
                        <TextField
                            record={data[id]}
                            source="metrcId"
                        />
                    </span>
                    <span className={classes.cardContentRow}>
                        Sale Price:&nbsp;
                        <DineroPrice record={data[id]} source="salePrice.amount" />
                    </span>
                    <EditButton
                        resource="Products"
                        basePath={basePath}
                        record={data[id]}
                    />
                    <ShowButton
                        resource="Products"
                        basePath={basePath}
                        record={data[id]}
                    />
                </CardContent>
            </Card>
        ))}
    </div>
);

export default withStyles(listStyles)(MobileGrid)