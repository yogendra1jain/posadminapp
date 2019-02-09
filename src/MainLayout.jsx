import React, { Component } from 'react';
import "./assets/stylesheets/reset.css";
//import HeaderLayout from './components/common/HeaderNav.jsx';
import NavBar from './containers/NavBar.jsx';
import "./assets/stylesheets/main.css";
import Alert from 'react-s-alert';
// import SaveButton from 'src/components/common/SaveButton.jsx'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';


class MainLayout extends Component {
  render() {
    return (
      <div className="main-container">
        {/* {/ <HeaderLayout /> /} */}
        <div className="content">
          <div className="col-sm-3 col-md-2">
            <div className="row visible-xs">
            </div>

            <NavBar  />

          </div>
          <div className="col-sm-9 col-md-10 right-content" >

            {this.props.children}
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
export default MainLayout;