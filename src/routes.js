import React from 'react';
import { Route } from 'react-router-dom';
import InventoryDashBoardContainer from './dashboard/InventoryDashBoardContainer';
import SalesDashboardContainer from './dashboard/SalesDashboardContainer';
import PackageLabel from './global/components/PackageLabel';

export default [
    <Route exact path="/SalesDashboard" component={SalesDashboardContainer} />,
    <Route exact path="/InventoryDashboard" component={InventoryDashBoardContainer} />,
    <Route exact path="/PackageLabel" component={PackageLabel} />,

];
