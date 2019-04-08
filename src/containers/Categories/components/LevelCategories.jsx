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
/* Material Icons */
import Create from '@material-ui/icons/Create'
import Add from '@material-ui/icons/Add'
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
  _get(props, 'categoriesTree', []).map((data, index) => {
    pannels.push(
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className='flex-row align-center justify-space-between fwidth'>
            <div className='p-r-10'>
              <label> {data.name}</label>
            </div>
            <div className='flex-row'>
              <div className='p-r-10' onClick={() => props.handleClickOpen(1, data, 'add')}>
                <Add style={{ fontSize: '1.7em' }} />
              </div>
              <div onClick={() => props.handleClickOpen(0, data, 'edit')}>
                <Create style={{ fontSize: '1.5em' }} />
              </div>
            </div>

          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <SubCategories
            children={data.children}
            handleClickOpen={props.handleClickOpen}
          />
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