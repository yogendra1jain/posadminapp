import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function LowInventoryTable(props) {
    const { classes } = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Products</TableCell>
                        <TableCell align="right">Velocity</TableCell>
                        <TableCell align="right">Inventory</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                            <TableCell align="left">
                                <div className='flex-row align-center p-t-10 p-b-10'>
                                    <div className='dash-table-product-img' >
                                        <img src="https://s3.ap-south-1.amazonaws.com/aob-deverp/pos-dev/9d327300-0950-4b30-9d7a-00c83921dc80.jpg" alt="" />
                                    </div>
                                    <div className='flex-column m-l-15'>
                                        <span className='dash-table-main-text'>Product Name</span>
                                        <span className='dash-table-sub-text'>2913847230498123</span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell align="right" className='dash-table-main-text'>0.83</TableCell>
                            <TableCell align="right" className='dash-table-main-text'>0.83</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

LowInventoryTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LowInventoryTable);