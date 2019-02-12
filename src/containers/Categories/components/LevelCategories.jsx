import React from 'react';
import PropTypes from 'prop-types';
/* Material Imports */
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
/* Components Imports */
import SubCategories from './SubCategories'

const styles = theme => ({
  root: {
    width: '100%',
  },
});

function LevelCategories(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          Expansion Panel 1
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <SubCategories />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

LevelCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LevelCategories);