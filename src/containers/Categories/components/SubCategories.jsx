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

  populateSubCategories = () => {
    let pannel = []
    
    this.props.children.map((data, index) => {
      pannel.push(
        <ExpansionPanel
          square
          expanded={this.state.expanded === `panel${data.id}`}
          onChange={this.handleChange(`panel${data.id}`)}
          style={{ width: '100%' }}
        >
          <ExpansionPanelSummary>
            {data.name}
          </ExpansionPanelSummary>
            {data.children ? this.populateChips(data.children) : null}
        </ExpansionPanel>
      )
    })

    return(
      <React.Fragment>
        {pannel}
      </React.Fragment>
      
    )
  }

  populateChips = (children) => {
    let chips = []
    children.map((data, index)=>{
      chips.push(
        <Chip label={data.name} style={{ margin: '10px', fontSize: '0.85em' }} />
      )
    })
    return(
      <ExpansionPanelDetails>
        {chips}
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