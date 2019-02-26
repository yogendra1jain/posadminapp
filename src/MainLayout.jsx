import React, { Component } from 'react';
import "./assets/stylesheets/reset.css";
//import HeaderLayout from './components/common/HeaderNav.jsx';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import NavBar from './containers/NavBar.jsx';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';


import "./assets/stylesheets/main.css";
import Alert from 'react-s-alert';
// import SaveButton from 'src/components/common/SaveButton.jsx'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';


const styles = theme => ({
  failure: {
    background: 'red',
    fontSize: '1rem'
  },
  success: {
    background: 'green',
    fontSize: '1rem'
  },
  close: {
    padding: theme.spacing.unit / 2,
  },
});
class MainLayout extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="main-container">
        {/* {/ <HeaderLayout /> /} */}
        <div className="content">
          <div className="col-sm-3 col-md-2">
            <div className="row visible-xs">
            </div>

            <NavBar />

          </div>
          <div className="col-sm-9 col-md-10 no-gutters " >
          <div className="right-content" >
              {this.props.children}
          </div>
          </div>
          <div>
            {this.props.message.text && <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              open={true}
              autoHideDuration={2000}
              onClose={this.handleClose}
              ContentProps={{
                'aria-describedby': 'message-id',
                classes: {
                  root: this.props.message.isSuccess ? classes.success : classes.failure
                }
              }}
              message={<span id="message-id">{this.props.message.text}</span>}
            />}
          </div>
          <Alert stack={{ limit: 3 }} />
        </div>
        {/* <div className="footer">
            { `Copyright \u00A9 2018 All On Block Inc.` }
      </div> */}
      </div>


    );
  }
}

const mapStateToProps = state => {
  let message = _get(state, 'commonData.message', '');
  return {
    message
  }
}
export default connect(mapStateToProps)(withStyles(styles)(MainLayout));