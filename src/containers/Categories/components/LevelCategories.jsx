import React from 'react';
import PropTypes from 'prop-types';
/* Lodash Imports */
import _get from 'lodash/get';
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
  let pannels = []
  debugger
  _get(props, 'categoriesTree', []).map((data, index)=>{
    debugger
    pannels.push(
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          {data.name}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <SubCategories children={data.children}/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  })

  
  return (
    <div className={classes.root}>
      {pannels}
    </div>
  );
}

LevelCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LevelCategories);