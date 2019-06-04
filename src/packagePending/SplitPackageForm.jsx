import React from 'react';
/* Material Styles */
// import { splitPackageStyles } from './styles'
/* Lodash Imports */
import _get from 'lodash/get';
/* Material import */
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
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
        const { classes } = this.props
        return (
            <div>
                <Grid container spacing={3} justify="center">
                    <Grid item xs={3} >
                        <TextField
                            id="outlined-name"
                            label="Search Text"
                            value={this.state.SearchText}
                            onChange={this.handleChange('SearchText')}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
                {this.populatePackages(classes)}
            </div>

        );
    }
}


export default withStyles(splitPackageStyles)(SplitPackageForm);