// in src/App.js
import React from 'react';
import { Admin, Resource, ListGuesser,EditGuesser } from 'react-admin';

import authProvider from './authProvider';
import dataProvider from './dataProvider';
import products from './products';
import customers from './customers';
import vendors from './vendors';
import vendorProducts from './vendorProducts'
import stores from './stores';
import employees from './employees';
import packagepending from './packagePending';
const App = () => (
  <div>
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="Search/Products" {...products} options={{ label: 'Product List' }} />
      <Resource name="Customers" {...customers} />
      <Resource name="Store" {...stores} />
      <Resource name="PaymentMethods" />
      <Resource name="vendors" {...vendors}  options={{ label: 'Vendor List' }} />
      <Resource name="VendorProduct/GetByRetailerId" {...vendorProducts}   options={{ label: 'Vendor Product List' }} />
      <Resource name="employees"  {...employees}   options={{ label: 'Employees' }} />
      <Resource name="packagePending"  {...packagepending}  options={{ label: 'Package Pending' }} />

    </Admin>
  </div>
);
export default App