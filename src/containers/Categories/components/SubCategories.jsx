import React from 'react';
/* Material Imports */
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

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

  render() {
    const { expanded } = this.state;
    return (
      <div style={{width: '100%'}}>
        <ExpansionPanel
          square
          expanded={expanded === 'panel1'}
          onChange={this.handleChange('panel1')}
          style={{width: '100%'}}
        >
          <ExpansionPanelSummary>
            Collapsible Group Item #1
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Chip label="Basic Chip" style={{margin: '10px', fontSize: '0.85em'}}/>
            <Chip label="Basic Chip" style={{margin: '10px', fontSize: '0.85em'}}/>
            <Chip label="Basic Chip" style={{margin: '10px', fontSize: '0.85em'}}/>
            <Chip label="Basic Chip" style={{margin: '10px', fontSize: '0.85em'}}/>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default SubCategories;