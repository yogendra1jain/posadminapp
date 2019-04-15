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
    let role = localStorage.getItem('role')
    return (
        <div className="profile-dropup">
            <a href="">Name: {role == 1 ? localStorage.getItem('userName') : localStorage.getItem('storeName')}</a>
            <a href=""><span className="iicon"></span>Employee Id: {localStorage.getItem('employeeID')}</a>
            <a href=""><span className="iicon"><img src={logouticon} /></span> Logout</a>
            {/* {localStorage.getItem('retailerID') && <a href=""><span className="iicon"><img src={logouticon} /></span> Logout</a>} */}
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
        let role = localStorage.getItem('role')
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
                                    {role == 1 ? 
                                    <Panel key={1} eventKey={1}>
                                        <Panel.Title toggle>{"Products"}<i className="fa fa-angle-down pull-right">
                                        </i></Panel.Title>
                                        <div>
                                            <div onClick={() => this.changeCurrentPath(1, 11)} key={11}>
                                                <Panel.Body className={this.state.activeMenuIndex === 11 && this.state.activeSubMenuIndex === 11 ? 'active' : 'inActive'} collapsible={this.state.clickedSubIndex !== 11}>
                                                    <Link onClick={() => this.changeCurrentPath('/products')} to={"/products"}>Product Master </Link>
                                                </Panel.Body>
                                            </div>
                                            <div onClick={() => this.changeCurrentPath(1, 12)} key={12}>
                                                <Panel.Body className={this.state.activeMenuIndex === 12 && this.state.activeSubMenuIndex === 12 ? 'active' : 'inActive'} collapsible={this.state.clickedSubIndex !== 12}>
                                                    <Link onClick={() => this.changeCurrentPath('/categories')} to={"/categories"}>Categories</Link>
                                                </Panel.Body>
                                            </div>
                                        </div>
                                    </Panel> : "" }

                                    <Panel key={2} eventKey={2}>
                                        <Panel.Title toggle>{"Stores"}<i className="fa fa-angle-down pull-right"></i></Panel.Title>
                                        <div>
                                            {role ==1 ? 
                                            <div onClick={() => this.changeCurrentPath(2, 21)} key={21}>
                                                <Panel.Body className={this.state.activeMenuIndex === 21 && this.state.activeSubMenuIndex === 21 ? 'active' : 'inActive'} collapsible={this.state.clickedSubIndex !== 21}>
                                                    <Link onClick={() => this.changeCurrentPath('/stores')} to={"/stores"}>Stores </Link>
                                                </Panel.Body>
                                            </div> : ""}
                                            <div onClick={() => this.changeCurrentPath(2, 22)} key={22}>
                                                <Panel.Body className={this.state.activeMenuIndex === 22 && this.state.activeSubMenuIndex === 22 ? 'active' : 'inActive'} collapsible={this.state.clickedSubIndex !== 22}>
                                                    <Link onClick={() => this.changeCurrentPath('/posList')} to={"/posList"}>POS Terminals </Link>
                                                </Panel.Body>
                                            </div>
                                            <div onClick={() => this.changeCurrentPath(2, 23)} key={23}>
                                                <Panel.Body className={this.state.activeMenuIndex === 23 && this.state.activeSubMenuIndex === 23 ? 'active' : 'inActive'} collapsible={this.state.clickedSubIndex !== 23}>
                                                    <Link onClick={() => this.changeCurrentPath('/staffs')} to={"/staffs"}>Staff Operators</Link>
                                                </Panel.Body>
                                            </div>
                                            <div onClick={() => this.changeCurrentPath(2, 24)} key={24}>
                                                <Panel.Body className={this.state.activeMenuIndex === 24 && this.state.activeSubMenuIndex === 24 ? 'active' : 'inActive'} collapsible={this.state.clickedSubIndex !== 24}>
                                                    <Link onClick={() => this.changeCurrentPath('/storeProducts')} to={"/storeProducts"}>Product Override </Link>
                                                </Panel.Body>
                                            </div>
                                        </div>
                                    </Panel>

                                    <Panel key={3} eventKey={3}>
                                        <Panel.Title toggle>{"Vendor Management"}<i className="fa fa-angle-down pull-right"></i></Panel.Title>
                                        <div>
                                            <div onClick={() => this.changeCurrentPath(3, 31)} key={31}>
                                                <Panel.Body className={this.state.activeMenuIndex === 31 && this.state.activeSubMenuIndex === 31 ? 'active' : 'inActive'} collapsible={this.state.clickedSubIndex !== 31}>
                                                    <Link onClick={() => this.changeCurrentPath('/vendors')} to={"/vendors"}>Vendors </Link>
                                                </Panel.Body>
                                            </div>
                                            <div onClick={() => this.changeCurrentPath(3, 32)} key={32}>
                                                <Panel.Body className={this.state.activeMenuIndex === 32 && this.state.activeSubMenuIndex === 32 ? 'active' : 'inActive'} collapsible={this.state.clickedSubIndex !== 32}>
                                                    <Link onClick={() => this.changeCurrentPath('/vendorproducts')} to={"/vendorproducts"}>Vendor Products </Link>
                                                </Panel.Body>
                                            </div>
                                            <div onClick={() => this.changeCurrentPath(3, 33)} key={33}>
                                                <Panel.Body className={this.state.activeMenuIndex === 33 && this.state.activeSubMenuIndex === 33 ? 'active' : 'inActive'} collapsible={this.state.clickedSubIndex !== 33}>
                                                    <Link onClick={() => this.changeCurrentPath('/purchaseorders')} to={"/purchaseorders"}>Purchase Orders </Link>
                                                </Panel.Body>
                                            </div>
                                            <div onClick={() => this.changeCurrentPath(3, 34)} key={34}>
                                                <Panel.Body className={this.state.activeMenuIndex === 34 && this.state.activeSubMenuIndex === 34 ? 'active' : 'inActive'} collapsible={this.state.clickedSubIndex !== 34}>
                                                    <Link onClick={() => this.changeCurrentPath('/requisitions')} to={"/requisitions"}>Requisitions </Link>
                                                </Panel.Body>
                                            </div>
                                        </div>
                                    </Panel>

                                    <Panel key={4} eventKey={4}>
                                        <Panel.Title toggle>{"Customer"}<i className="fa fa-angle-down pull-right"></i></Panel.Title>
                                        <div>
                                            <div onClick={() => this.changeCurrentPath(4, 41)} key={41}>
                                                <Panel.Body className={this.state.activeMenuIndex === 41 && this.state.activeSubMenuIndex === 41 ? 'active' : 'inActive'} collapsible={this.state.clickedSubIndex !== 41}>
                                                    <Link onClick={() => this.changeCurrentPath('/customers')} to={"/customers"}>Customers</Link>
                                                </Panel.Body>
                                            </div>
                                            <div onClick={() => this.changeCurrentPath(4, 42)} key={42}>
                                                <Panel.Body className={this.state.activeMenuIndex === 42 && this.state.activeSubMenuIndex === 42 ? 'active' : 'inActive'} collapsible={this.state.clickedSubIndex !== 42}>
                                                    <Link onClick={() => this.changeCurrentPath('/employees')} to={"/employees"}>Store Customers</Link>
                                                </Panel.Body>
                                            </div>
                                        </div>
                                    </Panel>

                                    <Panel key={5} eventKey={5}>
                                        <Panel.Title toggle>{"Inventory"}<i className="fa fa-angle-down pull-right"></i></Panel.Title>
                                        <div>
                                            <div onClick={() => this.changeCurrentPath(5, 51)} key={51}>
                                                <Panel.Body className={this.state.activeMenuIndex === 51 && this.state.activeSubMenuIndex === 51 ? 'active' : 'inActive'} collapsible={this.state.clickedSubIndex !== 51}>
                                                    <Link onClick={() => this.changeCurrentPath('/inventories')} to={"/inventories"}>Product Inventory </Link>
                                                </Panel.Body>
                                            </div>
                                            {role ==1 ?
                                            <div onClick={() => this.changeCurrentPath(5, 52)} key={52}>
                                                <Panel.Body className={this.state.activeMenuIndex === 52 && this.state.activeSubMenuIndex === 52 ? 'active' : 'inActive'} collapsible={this.state.clickedSubIndex !== 52}>
                                                    <Link onClick={() => this.changeCurrentPath('/rewardPointsRule')} to={"/rewardPointsRule"}>Reward Point Rule </Link>
                                                </Panel.Body>
                                            </div> : ""}
                                        </div>
                                    </Panel>

                                    <Panel key={6} eventKey={6}>
                                        <Panel.Title toggle>{"Reports"}<i className="fa fa-angle-down pull-right"></i></Panel.Title>
                                        <div>
                                            <div onClick={() => this.changeCurrentPath(6, 61)} key={61}>
                                                <Panel.Body className={this.state.activeMenuIndex === 61 && this.state.activeSubMenuIndex === 61 ? 'active' : 'inActive'}
                                                    collapsible={this.state.clickedSubIndex !== 61}>
                                                    <Link onClick={() => this.changeCurrentPath('/employee_payroll_deduct_details')} to={"/employee_payroll_deduct_details"}>Employee Payroll Deduct Details </Link>
                                                </Panel.Body>
                                            </div>
                                            <div onClick={() => this.changeCurrentPath(6, 62)} key={62}>
                                                <Panel.Body className={this.state.activeMenuIndex === 62 && this.state.activeSubMenuIndex === 62 ? 'active' : 'inActive'}
                                                    collapsible={this.state.clickedSubIndex !== 62}>
                                                    <Link onClick={() => this.changeCurrentPath('/z_report')} to={"/z_report"}>Z Report </Link>
                                                </Panel.Body>
                                            </div>
                                            <div onClick={() => this.changeCurrentPath(6, 63)} key={63}>
                                                <Panel.Body className={this.state.activeMenuIndex === 63 && this.state.activeSubMenuIndex === 63 ? 'active' : 'inActive'}
                                                    collapsible={this.state.clickedSubIndex !== 63}>
                                                    <Link onClick={() => this.changeCurrentPath('/sale_report')} style={{ textDecoration: "none", color: '#FFF' }} to={"/sale_report"}><span style={{ fontSize: "36px", color: '#FFF' }} ></span>Sale Report </Link>
                                                </Panel.Body>
                                            </div>
                                            <div onClick={() => this.changeCurrentPath(6, 64)} key={64}>
                                                <Panel.Body className={this.state.activeMenuIndex === 64 && this.state.activeSubMenuIndex === 64 ? 'active' : 'inActive'}
                                                    collapsible={this.state.clickedSubIndex !== 64}>
                                                    <Link onClick={() => this.changeCurrentPath('/sale_by_payment_method_report')} style={{ textDecoration: "none", color: '#FFF' }} to={"/sale_by_payment_method_report"}><span style={{ fontSize: "36px", color: '#FFF' }} ></span>Sale By Payment Method Report </Link>
                                                </Panel.Body>
                                            </div>
                                            <div onClick={() => this.changeCurrentPath(6, 65)} key={65}>
                                                <Panel.Body className={this.state.activeMenuIndex === 65 && this.state.activeSubMenuIndex === 65 ? 'active' : 'inActive'}
                                                    collapsible={this.state.clickedSubIndex !== 65}>
                                                    <Link onClick={() => this.changeCurrentPath('/reward_point_redeemption_report')} style={{ textDecoration: "none", color: '#FFF' }} to={"/reward_point_redeemption_report"}><span style={{ fontSize: "36px", color: '#FFF' }} ></span>Reward Point Redeemption Report</Link>
                                                </Panel.Body>
                                            </div>
                                            <div onClick={() => this.changeCurrentPath(6, 66)} key={66}>
                                                <Panel.Body className={this.state.activeMenuIndex === 66 && this.state.activeSubMenuIndex === 66 ? 'active' : 'inActive'}
                                                    collapsible={this.state.clickedSubIndex !== 66}>
                                                    <Link onClick={() => this.changeCurrentPath('/gift_card_report')} style={{ textDecoration: "none", color: '#FFF' }} to={"/gift_card_report"}><span style={{ fontSize: "36px", color: '#FFF' }} ></span>Gift Card Report</Link>
                                                </Panel.Body>
                                            </div>
                                        </div>
                                    </Panel>
                                    <Panel>
                                        <Panel.Title className={(this.activePath === '/dashboard' ? 'active' : 'inactive')} >
                                            <Link onClick={() => this.changeCurrentPath('/dashboard')} to={"/dashboard"}>Dashboard (Alpha)</Link>
                                        </Panel.Title>
                                    </Panel>
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