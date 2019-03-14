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
import logo from './../assets/images/aob-logo.png';
import usericon from './../assets/images/usericon.png';
import bellicon from './../assets/images/bell.png';
import settingicon from './../assets/images/setting.png';
import listicon from './../assets/images/list.png';
import logouticon from './../assets/images/logout.png';
import Overlay from 'react-bootstrap/lib/Overlay';

// import NavBarChild from './NavBarChild.jsx';
//import findDOMNode from 'react-dom/function name(params) {

import { findDOMNode } from "react-dom";
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
        const { pathname } = this.props.location;

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

        if (this.redirectToLogin) {
            return (
                <Redirect push to="/" />
            )
        }

        return (
            <React.Fragment>
            <div className="navbar-collapse collapse ">
                <Link className="nav-link" to="/">
                    <img className="logoimg" src={logo} alt="AllOnBlock Logo" />
                </Link>
                <PanelGroup accordion id="menu-bar" className="menu-bar" defaultActiveKey="0">
                    {/* <NavBarChild /> */}
                    <Panel key={10} eventKey={10} >
                        <Panel.Heading>
                            <div key={10}>

                                <Panel key={5} eventKey={5}>
                                        <Panel.Title toggle>{"Reports"}<i className="fa fa-angle-down pull-right"></i></Panel.Title>
                                    <div>
                                        <div onClick={() => this.changeCurrentPath(6, 1)} key={1}>
                                            <Panel.Body style={{}} className={this.state.activeMenuIndex === 1 && this.state.activeSubMenuIndex === 1 ? 'active' : 'inActive'}
                                                collapsible={this.state.clickedSubIndex !== 1}>

                                                {/* <a href={"/#"+subMenu.link}>{subMenu.displayText}</a> */}
                                                <Link onClick={() => this.changeCurrentPath('/employee_payroll_deduct_details')}  to={"/employee_payroll_deduct_details"}>Employee Payroll Deduct Details </Link>
                                            </Panel.Body>
                                        </div>
                                        {/* <div onClick={() => this.changeCurrentPath(6, 2)} key={2}>
                                            <Panel.Body style={{}} className={this.state.activeMenuIndex === 2 && this.state.activeSubMenuIndex === 2 ? 'active' : 'inActive'}
                                                collapsible={this.state.clickedSubIndex !== 2}>

                                                {/* <a href={"/#"+subMenu.link}>{subMenu.displayText}</a> */}
                                                {/* <Link onClick={() => this.changeCurrentPath('/employee_payroll_deduct_summary')}  to={"/employee_payroll_deduct_summary"}>Employee Payroll Deduct Summary </Link>
                                            </Panel.Body>
                                        </div>  */}
                                        {/* <div onClick={() => this.changeCurrentPath(6, 3)} key={3}>
                                            <Panel.Body style={{}} className={this.state.activeMenuIndex === 3 && this.state.activeSubMenuIndex === 3 ? 'active' : 'inActive'}
                                                collapsible={this.state.clickedSubIndex !== 3}>

                                                {/* <a href={"/#"+subMenu.link}>{subMenu.displayText}</a> */}
                                                {/* <Link onClick={() => this.changeCurrentPath('/employee_discount_report')}  to={"/employee_discount_report"}>Employee Discount Report </Link>
                                            </Panel.Body>
                                        </div>  */}
                                        {/* <div onClick={() => this.changeCurrentPath(6, 4)} key={4}>
                                            <Panel.Body style={{}} className={this.state.activeMenuIndex === 4 && this.state.activeSubMenuIndex === 4 ? 'active' : 'inActive'}
                                                collapsible={this.state.clickedSubIndex !== 4}> */}

                                                {/* <a href={"/#"+subMenu.link}>{subMenu.displayText}</a> */}
                                                {/* <Link onClick={() => this.changeCurrentPath('/employee_details_report')}  to={"/employee_details_report"}>Employee Details Report </Link>
                                            </Panel.Body>
                                        </div> */}
                                        <div onClick={() => this.changeCurrentPath(6, 5)} key={5}>
                                            <Panel.Body style={{}} className={this.state.activeMenuIndex === 5 && this.state.activeSubMenuIndex === 5 ? 'active' : 'inActive'}
                                                collapsible={this.state.clickedSubIndex !== 5}>

                                                {/* <a href={"/#"+subMenu.link}>{subMenu.displayText}</a> */}
                                                <Link onClick={() => this.changeCurrentPath('/z_report')}  to={"/z_report"}>Z Report </Link>
                                            </Panel.Body>
                                        </div>
                                        <div onClick={() => this.changeCurrentPath(6, 6)} key={6}>
                                            <Panel.Body style={{}} className={this.state.activeMenuIndex === 6 && this.state.activeSubMenuIndex === 6 ? 'active' : 'inActive'}
                                                collapsible={this.state.clickedSubIndex !== 6}>

                                                {/* <a href={"/#"+subMenu.link}>{subMenu.displayText}</a> */}
                                                <Link onClick={() => this.changeCurrentPath('/sale_report')} style={{ textDecoration: "none", color: '#FFF' }} to={"/sale_report"}><span style={{ fontSize: "36px", color: '#FFF' }} ></span>Sale Report </Link>
                                            </Panel.Body>
                                        </div>

                                    </div>
                                </Panel>
                                <Panel.Title className={(this.activePath === '/retailers' ? 'active' : 'inactive')} >

                                    <Link onClick={() => this.changeCurrentPath('/retailers')} style={{ textDecoration: "none", color: '#FFF' }} to={"/retailers"}><span style={{ fontSize: "36px", color: '#FFF' }} ></span>Retailer </Link>
                                </Panel.Title>
                                <Panel.Title className={(this.activePath === '/products' ? 'active' : 'inactive')} >

                                    <Link onClick={() => this.changeCurrentPath('/products')}  to={"/products"}>Product Master </Link>
                                </Panel.Title>

                                <Panel.Title className={(this.activePath === '/storeProducts' ? 'active' : 'inactive')} >
                                    <Link onClick={() => this.changeCurrentPath('/storeProducts')}  to={"/storeProducts"}>Product Override </Link>
                                </Panel.Title>

                                <Panel.Title className={(this.activePath === '/purchaseorders' ? 'active' : 'inactive')} >

                                    <Link onClick={() => this.changeCurrentPath('/purchaseorders')}  to={"/purchaseorders"}>Purchase Orders </Link>
                                </Panel.Title>
                                <Panel.Title className={(this.activePath === '/requisitions' ? 'active' : 'inactive')} >

                                    <Link onClick={() => this.changeCurrentPath('/requisitions')}  to={"/requisitions"}>Requisitions </Link>
                                </Panel.Title>

                                <Panel.Title className={(this.activePath === '/rewardPointsRule' ? 'active' : 'inactive')} >

                                    <Link onClick={() => this.changeCurrentPath('/rewardPointsRule')}  to={"/rewardPointsRule"}>Reward Point Rule </Link>
                                </Panel.Title>

                                <Panel.Title className={(this.activePath === '/customers' ? 'active' : 'inactive')} >

                                    <Link onClick={() => this.changeCurrentPath('/customers')}  to={"/customers"}>Customers</Link>
                                </Panel.Title>
                                <Panel.Title className={(this.activePath === '/employees' ? 'active' : 'inactive')} >

                                    <Link onClick={() => this.changeCurrentPath('/employees')}  to={"/employees"}>Employees</Link>
                                </Panel.Title>
                                <Panel.Title className={(this.activePath === '/vendors' ? 'active' : 'inactive')} >

                                    <Link onClick={() => this.changeCurrentPath('/vendors')}  to={"/vendors"}>Vendors </Link>
                                </Panel.Title>

                                {localStorage.getItem('role') !== 'Store Manager' &&
                                    <Panel.Title className={(this.activePath === '/stores' ? 'active' : 'inactive')} >

                                        <Link onClick={() => this.changeCurrentPath('/stores')}  to={"/stores"}>Stores </Link>
                                    </Panel.Title>
                                }
                                <Panel.Title className={(this.activePath === '/staffs' ? 'active' : 'inactive')} >

                                    <Link onClick={() => this.changeCurrentPath('/staffs')}  to={"/staffs"}>Staff Operators</Link>
                                </Panel.Title>

                                <Panel.Title className={(this.activePath === '/categories/add' ? 'active' : 'inactive')} >

                                    <Link onClick={() => this.changeCurrentPath('/categories/add')}  to={"/categories/add"}>Categories</Link>
                                </Panel.Title>

                                <Panel.Title className={(this.activePath === '/inventories' ? 'active' : 'inactive')} >

                                    <Link onClick={() => this.changeCurrentPath('/inventories')}  to={"/inventories"}>Product Inventory </Link>
                                </Panel.Title>
                                <Panel.Title className={(this.activePath === '/posList' ? 'active' : 'inactive')} >

                                    <Link onClick={() => this.changeCurrentPath('/posList')}  to={"/posList"}>POS Terminals </Link>
                                </Panel.Title>
                                <Panel.Title className={(this.activePath === '/vendorproducts' ? 'active' : 'inactive')} >

                                    <Link onClick={() => this.changeCurrentPath('/vendorproducts')}  to={"/vendorproducts"}>Vendor Products </Link>
                                </Panel.Title>
                                

                            </div>
                        </Panel.Heading>


                    </Panel>
                </PanelGroup>

               
            </div>

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
                </React.Fragment>
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