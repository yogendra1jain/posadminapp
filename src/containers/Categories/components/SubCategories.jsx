import React from 'react';
/* Material Imports */
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Chip from '@material-ui/core/Chip';
/* Material Icons */
import Create from '@material-ui/icons/Create'
import Add from '@material-ui/icons/Add'
/* Lodash Imports */
import _get from 'lodash/get';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0,0,0,.125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  },
  expanded: {
    margin: 'auto',
  },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0,0,0,.03)',
    borderBottom: '1px solid rgba(0,0,0,.125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
}))(MuiExpansionPanelDetails);

class SubCategories extends React.Component {
  state = {
    expanded: '',
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  populateSubCategories = () => {
    let pannel = []

    _get(this, 'props.children', []).map((data, index) => {
      pannel.push(
        <ExpansionPanel
          square
          expanded={this.state.expanded === `panel${data.id}`}
          onChange={this.handleChange(`panel${data.id}`)}
          style={{ width: '100%' }}
        >
          <ExpansionPanelSummary>
            <div className='flex-row align-center justify-space-between fwidth' >
              <div className='p-r-10'>
                {data.name}
              </div>
              <div className='flex-row'>
                <div className='p-r-10' onClick={() => this.props.handleClickOpen(2, data, 'add')}>
                  <Add style={{ fontSize: '1.7em' }} />
                </div>
                <div onClick={() => this.props.handleClickOpen(1, data, 'edit')}>
                  <Create style={{ fontSize: '1.5em' }} />
                </div>
              </div>
            </div>
          </ExpansionPanelSummary>
          {data.children ? this.populateChips(data.children) : null}
        </ExpansionPanel>
      )
    })

    return (
      <React.Fragment>
        {pannel}
      </React.Fragment>

    )
  }

  populateChips = (children) => {
    let chips = []
    children.map((data, index) => {
      chips.push(
        <Chip
          label={
            <div className='flex-row'>
              <div className='p-r-10'>
                {data.name}
              </div>
              <div className='flex-row'>
                <div onClick={() => this.props.handleClickOpen(2, data, 'edit')}>
                  <Create style={{ fontSize: '1.5em' }} />
                </div>
              </div>
            </div>
          }
          style={{ margin: '10px', fontSize: '0.85em' }} />
      )
    })
    return (
      <ExpansionPanelDetails>
        <div className='flex-row flex-wrap'>
          {chips}
        </div>
      </ExpansionPanelDetails>
    )
  }

  render() {
    const { expanded } = this.state;
    return (
      <div style={{ width: '100%' }}>
        {this.populateSubCategories()}
      </div>
    );
  }
}

export default SubCategories;