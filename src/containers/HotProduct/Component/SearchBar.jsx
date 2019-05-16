import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';

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
                onChange={(event)=>props.handleChange(event.target.value)}
                placeholder={props.placeholder}
                onChange={(e) => props.handleChange(e.target.value)}
                value={props.value}
                id='searchInput'
            />
            {
                props.value == '' ? '' : 
                <Clear onClick={props.onClear}/>
                // <i onClick={props.onClear} class="material-icons">clear</i>
            }
            <IconButton className={classes.iconButton} aria-label="Search">
                <SearchIcon
                    onClick={() => props.handleSearchbuttonClick(document.getElementById('searchInput').value)}
                />
            </IconButton>
        </Paper>
    );
}

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBar);