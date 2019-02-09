import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import Redirect from "react-router/Redirect";
import Panel from 'react-bootstrap/lib/Panel';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import "bootstrap/dist/css/bootstrap.css";
import _get from 'lodash/get';
import _set from 'lodash/set';
import _map from 'lodash/map';
import { onLogout } from '../../src/actions/userRoles';
import { withRouter } from 'react-router-dom';
import './../assets/stylesheets/navbar.css';
import './../assets/stylesheets/style.css';
import Link from 'react-router-dom/Link';
import logo from './../assets/images/aobLogo.png';
import usericon from './../assets/images/usericon.png';
import bellicon from './../assets/images/bell.png';
import settingicon from './../assets/images/setting.png';
import listicon from './../assets/images/list.png';
import logouticon from './../assets/images/logout.png';
import Overlay from 'react-bootstrap/lib/Overlay';
//import findDOMNode from 'react-dom/function name(params) {

import  {findDOMNode} from "react-dom";
const NavBar = withRouter(props => <NavBarComponent {...props} />);

function CustomPopover({ userName }) {
    return (
        <div className="profile-dropup">
            <a href="">Name: {localStorage.getItem('userName')}</a>
            <a href=""><span className="iicon"></span>Employee Id: {localStorage.getItem('employeeID')}</a>
            {localStorage.getItem('retailerID') && <a href=""><span className="iicon"><img src={logouticon} /></span> Logout</a>}
        </div>
    );
}

class NavBarComponent extends React.Component {

    constructor(props) {
        super(props);

        this.handleToggle = this.handleToggle.bind(this);
        const {pathname} = this.props.location;        

        this.loginCredentials = {
            email: "a@g.com",
            password: "123456"
        };
        this.activePath = pathname;
        this.state = {
            activeKey: '1',
            activeMenuIndex: 0,
            activeSubMenuIndex: 0,
            show: false,
        };

        this.icons = {
            'icon_inventory': 'icon-Inventory',
            'icon_supplier': 'icon-strain',
            'icon_invoices': 'icon-Invoices',
            'icon_orders': 'icon-orders',
            'icon_modules': 'icon-other-modules',
            'icon_purchase_order': 'icon-purchase-order',
            'icon_organic': 'icon-organic',
            'plant': 'icon-plant-management'
        }
        this.redirectTo = false;
        this.redirectPage = "/";


    }

    changeCurrentPath = (path) => {
        this.activePath = path;
        this.forceUpdate();
    }




    handleSelect(activeKey) {
        this.setState({ activeKey });
    }


    componentDidMount() {
        // const { dispatch, userRoleReducer } = this.props;
        // dispatch(fetchUserRole(userRoleReducer,this.loginCredentials));
    }

    getIcon(iconName) {

        return this.icons[iconName];
    }

    handleToggle() {
        this.setState({ show: !this.state.show });
    }
    onLogout() {
        const { dispatch, userRolesReducer } = this.props;
        dispatch(onLogout(userRolesReducer));
        // persistor.pause();

        this.redirectToLogin = true;
        this.forceUpdate();
    }


    render() {

        if(this.redirectToLogin){
            return (
                <Redirect push to="/" />
            )
        }

        return (

            <div className="navbar-collapse collapse ">
                <Link className="nav-link" to="/">
                    <img className="logoimg" src={logo} alt="AllOnBlock Logo" />
                </Link>
                <PanelGroup accordion id="menu-bar" defaultActiveKey="0">
                    <Panel key={10} eventKey={10} >
                        <Panel.Heading>
                            <div key={10}>
                                <Panel.Title className={(this.activePath === '/products' ? 'active' : 'inactive')} >

                                    <Link onClick={() => this.changeCurrentPath('/products')} style={{ textDecoration: "none", color: '#FFF' }} to={"/products"}><span style={{ fontSize: "36px", color: '#FFF' }} ></span>Products </Link>
                                </Panel.Title>
                                <Panel.Title className={(this.activePath === '/inventories' ? 'active' : 'inactive')} >

                                    <Link onClick={() => this.changeCurrentPath('/inventories')} style={{ textDecoration: "none", color: '#FFF' }} to={"/inventories"}><span style={{ fontSize: "36px", color: '#FFF' }} ></span>Inventory </Link>
                                </Panel.Title>
                                {localStorage.getItem('role') !== 'Store Manager' &&
                                    <Panel.Title className={(this.activePath === '/stores' ? 'active' : 'inactive')} >

                                        <Link onClick={() => this.changeCurrentPath('/stores')} style={{ textDecoration: "none", color: '#FFF' }} to={"/stores"}><span style={{ fontSize: "36px", color: '#FFF' }} ></span>Stores </Link>
                                    </Panel.Title>
                                }
                                <Panel.Title className={(this.activePath === '/staffs' ? 'active' : 'inactive')} >

                                    <Link onClick={() => this.changeCurrentPath('/staffs')} style={{ textDecoration: "none", color: '#FFF' }} to={"/staffs"}><span style={{ fontSize: "36px", color: '#FFF' }} ></span>Staff </Link>
                                </Panel.Title>

                                <Panel.Title className={(this.activePath === '/customers' ? 'active' : 'inactive')} >

                                    <Link onClick={() => this.changeCurrentPath('/customers')} style={{ textDecoration: "none", color: '#FFF' }} to={"/customers"}><span style={{ fontSize: "36px", color: '#FFF' }} ></span>Customer</Link>
                                </Panel.Title>
                                <Panel.Title className={(this.activePath === '/vendors' ? 'active' : 'inactive')} >

                                    <Link onClick={() => this.changeCurrentPath('/vendors')} style={{ textDecoration: "none", color: '#FFF' }} to={"/vendors"}><span style={{ fontSize: "36px", color: '#FFF' }} ></span>Vendors </Link>
                                </Panel.Title>
                                <Panel.Title className={(this.activePath === '/posList' ? 'active' : 'inactive')} >

                                    <Link onClick={() => this.changeCurrentPath('/posList')} style={{ textDecoration: "none", color: '#FFF' }} to={"/posList"}><span style={{ fontSize: "36px", color: '#FFF' }} ></span>Pos List </Link>
                                </Panel.Title>
                                <Panel.Title className={(this.activePath === '/productReports' ? 'active' : 'inactive')}  >

                                    <Link onClick={() => this.changeCurrentPath('/productReports')} style={{ textDecoration: "none", color: '#FFF' }} to={"/productReports"}><span style={{ fontSize: "36px", color: '#FFF' }} ></span>Product Reports </Link>
                                </Panel.Title>

                                <Panel.Title className={(this.activePath === '/customerReport' ? 'active' : 'inactive')} >

                                    <Link onClick={() => this.changeCurrentPath('/customerReport')} style={{ textDecoration: "none", color: '#FFF' }} to={"/customerReport"}><span style={{ fontSize: "36px", color: '#FFF' }} ></span>Customer Reports </Link>
                                </Panel.Title>

                                <Panel.Title className={(this.activePath === '/inventoryReport' ? 'active' : 'inactive')} >

                                    <Link onClick={() => this.changeCurrentPath('/inventoryReport')} style={{ textDecoration: "none", color: '#FFF' }} to={"/inventoryReport"}><span style={{ fontSize: "36px", color: '#FFF' }} ></span>Inventory Reports </Link>
                                </Panel.Title>
                                <Panel.Title className={(this.activePath === '/rules' ? 'active' : 'inactive')} >

                                    <Link onClick={() => this.changeCurrentPath('/rules')} style={{ textDecoration: "none", color: '#FFF' }} to={"/rules"}><span style={{ fontSize: "36px", color: '#FFF' }} ></span>Rules </Link>
                                </Panel.Title>
                                <Panel.Title className={(this.activePath === '/session' ? 'active' : 'inactive')} >

                                    <Link onClick={() => this.changeCurrentPath('/session')} style={{ textDecoration: "none", color: '#FFF' }} to={"/session"}><span style={{ fontSize: "36px", color: '#FFF' }} ></span>Session </Link>
                                </Panel.Title>

                            </div>
                        </Panel.Heading>


                    </Panel>
                </PanelGroup>

                   <ul className="h-profile">
                    <li><a ref={button => {
                        this.target = button;
                    }}
                        onClick={this.handleToggle}><img src={usericon} alt="User Icon" /></a>
                        <Overlay
                            show={this.state.show}
                            onHide={() => this.setState({ show: false })}
                            placement="top"
                            container={this}
                            target={() => findDOMNode(this.target)}
                        >
                            <CustomPopover userName={this.props.userName} onLogout={() => this.onLogout()} />
                        </Overlay> </li>

                    <li><a ><img src={bellicon} alt="User Icon" /></a> </li>
                    <li>
                        <a
                           ><img src={settingicon} alt="User Icon" /></a>
                     
                    </li>
                    <li><a ><img src={listicon} alt="User Icon" /></a> </li>
                </ul>


            </div>



            // this.props.menu ?  
            // <Navbar.Collapse>
            // <Nav>
            //     {listItems}
            //     </Nav>
            //             </Navbar.Collapse>:<div>Loading...</div>
        );





    }
}




const mapStateToProps = state => {

    let {
        userRolesReducer, commonLoginReducer, loginReducer
    } = state

    let { menu } = userRolesReducer['userRolesData'] ? userRolesReducer['userRolesData'] : {};
    let { status } = userRolesReducer || '';
    // let { userRoleData } = loginReducer[commonLoginReducer] || [];
    let { userName } = userRolesReducer['userRolesData'] ? userRolesReducer['userRolesData'] : {};

    return {
        menu,
        commonLoginReducer,
        status,
        // userRoleData,
        userName
    }
}

export default connect(mapStateToProps)(NavBar);