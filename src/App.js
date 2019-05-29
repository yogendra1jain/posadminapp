// in src/App.js
import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';

import authProvider from './authProvider';
import dataProvider from './dataProvider';
import products from './products';
import customers from './customers';
import vendors from './vendors';
import vendorProducts from './vendorProducts'
import stores from './stores';
import employees from './employees';
import packagepending from './packagePending';
import Login from './global/components/LoginPage';
import strains from './strains';
import Layout from './layout/Layout';
import saleReport from './reports/saleReport';
import DashboardContainer from './Dashboard/DashboardContainer';

const App = () => (
  <div>
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      appLayout={Layout}
      loginPage={Login}
      dashboard={DashboardContainer}

     >
      <Resource name="Search/Products" {...products} options={{ label: 'Product List' }} />
      <Resource name="Customers" {...customers} />
      <Resource name="Strain" {...strains} />
      <Resource name="Package" list={ListGuesser} />
      <Resource name="Store" {...stores} />
      <Resource name="PaymentMethods" />
      <Resource name="vendors" {...vendors} options={{ label: 'Vendor List' }} />
      <Resource name="VendorProduct/GetByRetailerId" {...vendorProducts} options={{ label: 'Product List' }} />
      <Resource name="SaleReport" {...saleReport} />
      {/* <Resource name="employees"  {...employees} options={{ label: 'Employees' }} /> */}
      <Resource name="packagePending"  {...packagepending} options={{ label: 'Package Pending' }} />

    </Admin>
  </div>
);
export default App