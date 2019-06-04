import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Inbox from '@material-ui/icons/Inbox';
import LocalShipping from '@material-ui/icons/LocalShipping';
import { withRouter } from 'react-router-dom';
import {
    translate,
    DashboardMenuItem,
    MenuItemLink,
    Responsive,
} from 'react-admin';

import customers from '../customers';
import saleReport from '../reports/saleReport';
import employees from '../employees';
import packagePending from '../packagePending';
import products from '../products';
import stores from '../stores';
import strains from '../strains';
import vendorProduct from '../vendorProducts';
import vendors from '../vendors';
import SubMenu from './SubMenu';
import categories from '../categories';
import tax from '../tax';

class Menu extends Component {
    state = {
        menuCustomers: false,
        menuProducts: false,
        menuVendors: false,
        menuPackages: false,
        menuStores: false,
        menuReports: false,
        menuTax: false
    };

    static propTypes = {
        onMenuClick: PropTypes.func,
        logout: PropTypes.object,
    };

    handleToggle = menu => {
        this.setState(state => ({ [menu]: !state[menu] }));
    };

    render() {
        const { onMenuClick, open, logout, translate } = this.props;
        return (
            <div>
                {' '}
                <DashboardMenuItem onClick={onMenuClick} />
                <SubMenu
                    handleToggle={() => this.handleToggle('menuProducts')}
                    isOpen={this.state.menuProducts}
                    sidebarIsOpen={open}
                    name="Products"
                    icon={<products.icon />}
                >
                    <MenuItemLink
                        to={`/Search/Products`}
                        primaryText={"Product Profiles"}
                        leftIcon={<products.icon />}
                        onClick={onMenuClick}
                    />
                    <MenuItemLink
                        to={`/Strain`}
                        primaryText={'Strain'}
                        leftIcon={<strains.icon />}
                        onClick={onMenuClick}
                    />
                    <MenuItemLink
                        to={`/Category`}
                        primaryText={"Categories"}
                        leftIcon={<categories.icon />}
                        onClick={onMenuClick}
                    />
                </SubMenu>
                <SubMenu    
                    handleToggle={() => this.handleToggle('menuStores')}
                    isOpen={this.state.menuStores}
                    sidebarIsOpen={open}
                    name="Stores"
                    icon={<stores.icon />}
                >
                    <MenuItemLink
                        to={`/Store`}
                        primaryText={'Stores'}
                        leftIcon={<stores.icon />}
                        onClick={onMenuClick}
                    />
                </SubMenu>
                <SubMenu
                    handleToggle={() => this.handleToggle('menuCustomers')}
                    isOpen={this.state.menuCustomers}
                    sidebarIsOpen={open}
                    name="Customers"
                    icon={<customers.icon />}
                >
                    <MenuItemLink
                        to={`/Customers`}
                        primaryText={'Customers'}
                        leftIcon={<customers.icon />}
                        onClick={onMenuClick}
                    />
                </SubMenu>
                <SubMenu
                    handleToggle={() => this.handleToggle('menuVendors')}
                    isOpen={this.state.menuVendors}
                    sidebarIsOpen={open}
                    name="Vendors"
                    icon={<LocalShipping/>}
                >
                    <MenuItemLink
                        to={`/vendors`}
                        primaryText={'Vendors'}
                        leftIcon={<vendors.icon />}
                        onClick={onMenuClick}
                    />
                    <MenuItemLink
                        to={`/VendorProduct/GetByRetailerId`}
                        primaryText={'Vendor Products'}
                        leftIcon={<vendorProduct.icon />}
                        onClick={onMenuClick}
                    />
                </SubMenu>
                <SubMenu
                    handleToggle={() => this.handleToggle('menuPackages')}
                    isOpen={this.state.menuPackages}
                    sidebarIsOpen={open}
                    name="Inventory"
                    icon={<Inbox/>}
                >
                    <MenuItemLink
                        to={`/Package`}
                        primaryText={'Package'}
                        leftIcon={<packagePending.icon />}
                        onClick={onMenuClick}
                    />
                    <MenuItemLink
                        to={`/PackagePending`}
                        primaryText={'Pending Packages'}
                        leftIcon={<packagePending.icon />}
                        onClick={onMenuClick}
                    />
                </SubMenu>
                <SubMenu
                    handleToggle={() => this.handleToggle('menuReports')}
                    isOpen={this.state.menuReports}
                    sidebarIsOpen={open}
                    name="Reports"
                    icon={<packagePending.icon />}
                >
                    <MenuItemLink
                        to={`/SaleReport`}
                        primaryText={'SaleReport'}
                        leftIcon={<packagePending.icon />}
                        onClick={onMenuClick}
                    />
                </SubMenu>
                <MenuItemLink
                    to={`/Tax`}
                    primaryText={'Tax'}
                    leftIcon={<stores.icon />}
                    onClick={onMenuClick}
                />
                {/* <Responsive
                    xsmall={
                        <MenuItemLink
                            to="/configuration"
                            primaryText={translate('pos.configuration')}
                            leftIcon={<SettingsIcon />}
                            onClick={onMenuClick}
                        />
                    }
                    medium={null}
                />
                <Responsive
                    small={logout}
                    medium={null} // Pass null to render nothing on larger devices 
                /> */}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    open: state.admin.ui.sidebarOpen,
    theme: state.theme,
    locale: state.i18n.locale,
});

const enhance = compose(
    withRouter,
    connect(
        mapStateToProps,
        {}
    ),
    translate
);

export default enhance(Menu);
