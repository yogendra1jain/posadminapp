import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        height: '65%',
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
};

function SearchBar(props) {

    const { classes } = props;
    var searchInput = document.getElementById("searchInput");
    return (
        <Paper className={classes.root} elevation={1} >
            <InputBase
                autoFocus
                onKeyPress={(e) => props.handleKeyPress(e, document.getElementById('searchInput').value)}
                className={classes.input}
                placeholder={props.placeholder}
                id='searchInput'
            />
            <IconButton className={classes.iconButton} aria-label="Search">
                <SearchIcon
                    onClick={() => props.handleChange(document.getElementById('searchInput').value)}
                />
            </IconButton>
        </Paper>
    );
}

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBar);