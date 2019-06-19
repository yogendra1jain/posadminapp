import React from 'react';
/* Material Styles */
// import { splitPackageStyles } from './styles'
/* Lodash Imports */
import _get from 'lodash/get';
/* Material import */
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { TextInput,NumberInput } from 'react-admin';
import Quantity from './Quantity';
/* Admin Imports */

/* Component Imports */

const splitPackageStyles = {
    spiltForm: {

    },
    scanBar: {

    },
    packageListing: {

    },
    packageCard: {
        border: '1px solid black',
        margin: '10px'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    menu: {
        width: 200,
    },
    cardTitle: {
        fontSize: '1.1em',
        color: 'rgba(0,0,0,0.6)',
        padding: '10px',
        width: '90%',
    },
    cardQty: {
        fontSize: '0.9em',
        color: 'rgba(0,0,0,0.8)',
        padding: '10px',
        width: '10%',
    },
    upcList: {
        background: '#ececec',
        display: 'flex',
        flexDirection: 'column',
        margin: '10px',
        height: '50px',
        overflow: 'auto'
    }
};


class SplitPackageForm extends React.Component {

    constructor() {
        super();
        this.state = {
            SearchText: ''
        }
    }

    handleChange = name => event => {
        this.setState(
            { [name]: event.target.value }
        );
    };

    populatePackages = (classes) => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <div className={classes.packageCard}>
                        <div className='flex-column'>
                            <div className='flex-row justify-space-between align-center'>
                                <span className={classes.cardTitle}>Product Name</span>
                                <span className={classes.cardQty}> 0/20 </span>
                            </div>
                            <div className={classes.upcList}>
                                <ol>
                                    <li>234546576877</li>
                                    <li>654324564352</li>
                                    <li>892374987934</li>
                                    <li>546839034522</li>

                                </ol>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className={classes.packageCard}>
                        <div className='flex-column'>
                            <div className='flex-row justify-space-between'>
                                <span className={classes.cardTitle}>Product Name</span>
                                <span className={classes.cardQty}> 0/20 </span>
                            </div>
                            <div className={classes.upcList}>
                                <ol>
                                    <li>234546576877</li>
                                    <li>654324564352</li>
                                    <li>892374987934</li>
                                    <li>546839034522</li>

                                </ol>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className={classes.packageCard}>
                        <div className='flex-column'>
                            <div className='flex-row justify-space-between'>
                                <span className={classes.cardTitle}>Product Name</span>
                                <span className={classes.cardQty}> 0/20 </span>
                            </div>
                            <div className={classes.upcList}>
                                <ol>
                                    <li>234546576877</li>
                                    <li>654324564352</li>
                                    <li>892374987934</li>
                                    <li>546839034522</li>

                                </ol>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className={classes.packageCard}>
                        <div className='flex-column'>
                            <div className='flex-row justify-space-between'>
                                <span className={classes.cardTitle}>Product Name</span>
                                <span className={classes.cardQty}> 0/20 </span>
                            </div>
                            <div className={classes.upcList}>
                                <ol>
                                    <li>234546576877</li>
                                    <li>654324564352</li>
                                    <li>892374987934</li>
                                    <li>546839034522</li>

                                </ol>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        )
    }

    render() {
        debugger;
        const { classes } = this.props;
        let quantity = this.props.record.shippedQuantity;
        let arr = [];
        if (this.props.record.shippedUnitOfMeasureName == "Each") {
            for (let i = 1; i <= quantity; i++) {
                arr.push(
                    <div>
                        <TextInput label={`Scan${i}`} source={`itemPackages[${i-1}].label`} />
                        <NumberInput label='Quantity' defaultValue={1}  source={`itemPackages[${i-1}].quantity`} />

                    </div>)
            }
        }
        if (this.props.record.shippedUnitOfMeasureName == "Grams") {
            arr = <div><Quantity /></div>
        }

        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {arr}
                {/* {this.populatePackages(classes)} */}
            </div>

        );
    }
}


export default withStyles(splitPackageStyles)(SplitPackageForm);